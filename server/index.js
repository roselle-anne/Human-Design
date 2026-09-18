import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateChart } from './hd/calculate.js';
import { CENTERS, CHANNELS } from './hd/structure.js';
import { TYPES, AUTHORITIES, CENTERS_INFO, GATES, CHANNEL_THEMES, DEFINITION_INFO, PROFILE_LINES, profileDescription } from './hd/content.js';

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

    const chart = await calculateChart(birthUTC);

    res.json({
      chart,
      content: {
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
      },
      structure: { centers: CENTERS, channels: CHANNELS },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate chart', detail: String(err) });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Human Design app listening on http://localhost:${PORT}`));
