import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { calculateChart } from './hd/calculate.js';
import { CENTERS, CHANNELS } from './hd/structure.js';
import { TYPES, AUTHORITIES, CENTERS_INFO, GATES, CHANNEL_THEMES, DEFINITION_INFO, PROFILE_LINES, profileDescription } from './hd/content.js';
import { buildReportHtml } from './hd/pdfTemplate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(
  express.static(path.join(__dirname, '..', 'public'), {
    // This app changes frequently during development; never let a stale
    // cached copy of the HTML/JS/CSS mask a deployed fix. Images can still
    // cache normally.
    setHeaders: (res, filePath) => {
      if (/\.(html|js|css)$/.test(filePath)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  })
);

app.get('/api/timezones', (req, res) => {
  res.json(Intl.supportedValuesOf('timeZone'));
});

/**
 * Convert a local wall-clock date/time in a given IANA timezone to a UTC
 * Date, correctly handling historical DST via ICU tz data bundled in Node.
 */
function localToUTC(dateStr, timeStr, timeZone) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  // Initial guess: treat the wall clock as if it were UTC, then correct
  // for the zone's offset by comparing how that instant renders back in
  // the target zone (handles DST transitions correctly via iteration).
  let guess = Date.UTC(year, month - 1, day, hour, minute, 0);

  for (let i = 0; i < 3; i++) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date(guess));
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const renderedUTC = Date.UTC(
      Number(map.year),
      Number(map.month) - 1,
      Number(map.day),
      Number(map.hour),
      Number(map.minute),
      Number(map.second)
    );
    const target = Date.UTC(year, month - 1, day, hour, minute, 0);
    const diff = target - renderedUTC;
    if (diff === 0) break;
    guess += diff;
  }
  return new Date(guess);
}

async function buildChartAndContent(birthUTC) {
  const chart = await calculateChart(birthUTC);
  const content = {
    types: TYPES,
    authorities: AUTHORITIES,
    centers: CENTERS_INFO,
    gates: GATES,
    channelThemes: CHANNEL_THEMES,
    definitionInfo: DEFINITION_INFO,
    profileLines: PROFILE_LINES,
    typeInfo: TYPES[chart.type],
    authorityInfo: AUTHORITIES[chart.authority],
    definitionInfoForChart: DEFINITION_INFO[chart.definition],
    profileNarrative: profileDescription(
      chart.personality.find((a) => a.body === 'Sun').line,
      chart.designActivations.find((a) => a.body === 'Sun').line
    ),
  };
  return { chart, content };
}

app.post('/api/chart', async (req, res) => {
  try {
    const { date, time, timeZone } = req.body;
    if (!date || !time || !timeZone) {
      return res.status(400).json({ error: 'date, time, and timeZone are required' });
    }
    const birthUTC = localToUTC(date, time, timeZone);
    if (Number.isNaN(birthUTC.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time/timeZone' });
    }

    const { chart, content } = await buildChartAndContent(birthUTC);

    res.json({
      chart,
      content,
      structure: { centers: CENTERS, channels: CHANNELS },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate chart', detail: String(err) });
  }
});

// Server-rendered PDF: a real headless Chromium (Puppeteer) renders the
// same paginated report HTML and produces an actual PDF file, served as a
// normal download. This sidesteps every client-side quirk we hit with
// html2canvas rasterization and window.print() (browser support, iframe
// embedding permissions, etc.) — the browser on the visitor's end only
// ever has to follow a link to a file.
const styleCssPath = path.join(__dirname, '..', 'public', 'style.css');

app.get('/api/report.pdf', async (req, res) => {
  let browser;
  try {
    const { date, time, timeZone, name } = req.query;
    if (!date || !time || !timeZone) {
      return res.status(400).json({ error: 'date, time, and timeZone are required' });
    }
    const birthUTC = localToUTC(String(date), String(time), String(timeZone));
    if (Number.isNaN(birthUTC.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time/timeZone' });
    }

    const { chart, content } = await buildChartAndContent(birthUTC);
    const structure = { centers: CENTERS, channels: CHANNELS };
    const inlineCss = fs.readFileSync(styleCssPath, 'utf8');
    const logoUrl = `${req.protocol}://${req.get('host')}/assets/logo-horizontal-color.png`;

    const html = buildReportHtml(
      chart,
      content,
      structure,
      name ? String(name) : '',
      { date: String(date), time: String(time), timeZone: String(timeZone) },
      inlineCss,
      logoUrl
    );

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // 'domcontentloaded' resolves as soon as our own inline HTML/CSS is
    // parsed — it doesn't wait on the external Google Fonts request, which
    // was timing out 'networkidle0' entirely. Instead, wait specifically
    // for font loading (with its own short timeout, since this is a nice-
    // to-have: the fallback serif font is perfectly readable if Google
    // Fonts is ever slow or unreachable from Render's network).
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await Promise.race([
      page.evaluateHandle('document.fonts.ready'),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
    const pdfBuffer = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    });
    await browser.close();

    const safeName = name ? `-${String(name).replace(/[^a-z0-9]+/gi, '-')}` : '';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Human-Design-Report${safeName}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF', detail: String(err) });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Human Design app listening on http://localhost:${PORT}`));
