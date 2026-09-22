import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import tzLookup from 'tz-lookup';
import { calculateChart } from './hd/calculate.js';
import { CENTERS, CHANNELS } from './hd/structure.js';
import { TYPES, TYPE_DETAIL, AUTHORITIES, AUTHORITY_DETAIL, CENTERS_INFO, CENTER_DEEP_DIVE, GATES, GATE_DEEP_DIVE, GATE_DETAIL, CHANNEL_THEMES, CHANNEL_DETAIL, DEFINITION_INFO, PROFILE_LINES, PROFILE_LINE_DETAIL, SECTION_INTROS, HD_INTRO_PARAGRAPHS, profileDescription, buildIncarnationCrossReading } from './hd/content.js';
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

// Resolves a typed place name (e.g. "Singapore" or "Austin, Texas") to
// candidate places with coordinates, each already resolved to its exact
// IANA timezone — so the birth-details form can ask for an actual place of
// birth instead of a raw timezone string. Geocoding via OpenStreetMap's free
// Nominatim API (no key required); the timezone itself is then resolved
// fully offline via tz-lookup's bundled timezone-boundary data, so no
// external timezone service or API key is needed for that part.
app.get('/api/place-search', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    if (q.length < 2) return res.json([]);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=8&addressdetails=1`;
    const nominatimRes = await fetch(url, {
      headers: {
        // Nominatim's usage policy requires a descriptive User-Agent
        // identifying the application making requests.
        'User-Agent': 'EmbodianceHumanDesignApp/1.0 (https://embodiance.com)',
      },
    });
    if (!nominatimRes.ok) {
      return res.status(502).json({ error: 'Place lookup service unavailable' });
    }
    const results = await nominatimRes.json();

    const places = results
      .map((r) => {
        const lat = Number(r.lat);
        const lon = Number(r.lon);
        let timeZone;
        try {
          timeZone = tzLookup(lat, lon);
        } catch {
          return null;
        }
        return { displayName: r.display_name, lat, lon, timeZone };
      })
      .filter(Boolean);

    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search for that place' });
  }
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
    centerDeepDive: CENTER_DEEP_DIVE,
    gates: GATES,
    gateDeepDive: GATE_DEEP_DIVE,
    gateDetail: GATE_DETAIL,
    channelThemes: CHANNEL_THEMES,
    channelDetail: CHANNEL_DETAIL,
    definitionInfo: DEFINITION_INFO,
    profileLines: PROFILE_LINES,
    profileLineDetail: PROFILE_LINE_DETAIL,
    sectionIntros: SECTION_INTROS,
    hdIntroParagraphs: HD_INTRO_PARAGRAPHS,
    typeInfo: TYPES[chart.type],
    typeDetailForChart: TYPE_DETAIL[chart.type],
    authorityInfo: AUTHORITIES[chart.authority],
    authorityDetailForChart: AUTHORITY_DETAIL[chart.authority],
    definitionInfoForChart: DEFINITION_INFO[chart.definition],
    profileNarrative: profileDescription(
      chart.personality.find((a) => a.body === 'Sun').line,
      chart.designActivations.find((a) => a.body === 'Sun').line
    ),
    crossReading: buildIncarnationCrossReading(chart.incarnationCross, chart.profile, GATES),
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

// Embedding the logo as a data URI (read once at startup) means Puppeteer
// never has to make a real network round-trip back to this same server to
// fetch it while rendering the PDF — that self-request (through Render's
// public hostname, not a local file read) was the slow part of "loading
// the logo," not image decoding itself.
const logoPath = path.join(__dirname, '..', 'public', 'assets', 'logo-horizontal-color.png');
const logoDataUri = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;

// Launching a fresh Chromium process per request measured at ~60s on
// Render's free tier (0.5 CPU) — most of that is browser startup, not
// actual rendering (56 pages renders in ~7s locally). Keeping one browser
// alive across requests and only opening/closing a page per request
// avoids paying that startup cost every single time.
let browserPromise = null;
async function getBrowser() {
  if (browserPromise) {
    const existing = await browserPromise;
    if (existing.connected) return existing;
    browserPromise = null; // crashed or was closed; relaunch below
  }
  browserPromise = puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 120000,
  });
  return browserPromise;
}

app.get('/api/report.pdf', async (req, res) => {
  let page;
  try {
    const { date, time, timeZone, name, place } = req.query;
    if (!date || !time || !timeZone) {
      return res.status(400).json({ error: 'date, time, and timeZone are required' });
    }
    const birthUTC = localToUTC(String(date), String(time), String(timeZone));
    if (Number.isNaN(birthUTC.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time/timeZone' });
    }

    // A lightweight, visible record of who has generated a report — viewable
    // via Render's dashboard Logs tab. Not a database (no permanent storage
    // or guaranteed retention), just a way to actually see this activity at
    // all, since nothing about a report generation was recorded anywhere
    // before this.
    console.log(`[report generated] name="${name || ''}" date=${date} time=${time} timeZone=${timeZone} at=${new Date().toISOString()}`);

    const { chart, content } = await buildChartAndContent(birthUTC);
    const structure = { centers: CENTERS, channels: CHANNELS };
    const inlineCss = fs.readFileSync(styleCssPath, 'utf8');

    const html = buildReportHtml(
      chart,
      content,
      structure,
      name ? String(name) : '',
      { date: String(date), time: String(time), timeZone: String(timeZone), place: place ? String(place) : '' },
      inlineCss,
      logoDataUri
    );

    // Temporary timing instrumentation: two "warm" production requests
    // showed no improvement from browser reuse (~53-58s both), meaning
    // browser launch isn't the actual bottleneck as assumed — this will
    // show exactly which stage (browser acquisition, content load, or PDF
    // rendering) is actually slow on Render's hardware.
    const t0 = Date.now();
    const browser = await getBrowser();
    const t1 = Date.now();
    page = await browser.newPage();
    // Puppeteer's default per-operation timeout is 30s, which a 56-page
    // document with gradients and web fonts can exceed on Render's free
    // tier under load. Give both the content load and the PDF render
    // generous headroom rather than failing a request that just needed
    // more time.
    page.setDefaultTimeout(90000);
    // 'domcontentloaded' resolves as soon as our own inline HTML/CSS is
    // parsed — it doesn't wait on the external Google Fonts request, which
    // was timing out 'networkidle0' entirely. Instead, wait specifically
    // for font loading (with its own short timeout, since this is a nice-
    // to-have: the fallback serif font is perfectly readable if Google
    // Fonts is ever slow or unreachable from Render's network).
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 90000 });
    const t2 = Date.now();
    await Promise.race([
      page.evaluateHandle('document.fonts.ready'),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
    const t3 = Date.now();
    const pdfBuffer = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      timeout: 90000,
    });
    const t4 = Date.now();
    await page.close();
    console.log(
      `[report.pdf timing] getBrowser=${t1 - t0}ms setContent=${t2 - t1}ms fontsWait=${t3 - t2}ms pdfRender=${t4 - t3}ms total=${t4 - t0}ms`
    );

    const safeName = name ? `-${String(name).replace(/[^a-z0-9]+/gi, '-')}` : '';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Human-Design-Report${safeName}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    if (page) await page.close().catch(() => {});
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF', detail: String(err) });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Human Design app listening on http://localhost:${PORT}`));
