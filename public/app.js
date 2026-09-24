const placeSearch = document.getElementById('place-search');
const placeSelect = document.getElementById('place-select');
let placeMatches = [];
let chosenPlace = null; // { displayName, lat, lon, timeZone }
let placeSearchController = null;
let placeSearchDebounce = null;

// Geocoding happens directly from the browser (not proxied through our own
// server — see the /api/timezone-from-coords comment in server/index.js for
// why) via OpenStreetMap's free Nominatim API, which explicitly supports
// and expects this kind of client-side usage.
async function searchPlaces(query) {
  if (placeSearchController) placeSearchController.abort();
  placeSearchController = new AbortController();
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1`;
    const res = await fetch(url, { signal: placeSearchController.signal });
    const results = res.ok ? await res.json() : [];
    placeMatches = results.map((r) => ({ displayName: r.display_name, lat: Number(r.lat), lon: Number(r.lon) }));
  } catch (err) {
    if (err.name !== 'AbortError') placeMatches = [];
    else return;
  }
  renderPlaceOptions();
}

function renderPlaceOptions() {
  placeSelect.innerHTML = placeMatches
    .map((p, i) => `<option value="${i}">${p.displayName}</option>`)
    .join('');
  // A <select size="1"> renders as a closed native combobox that needs its
  // own extra click to open — with exactly one match that silently broke
  // selecting it. Forcing a minimum of 2 keeps this an always-open inline
  // listbox regardless of match count.
  placeSelect.size = Math.max(2, Math.min(placeMatches.length, 6));
  placeSelect.style.display = placeMatches.length && document.activeElement === placeSearch ? 'block' : 'none';
}

placeSearch.addEventListener('input', () => {
  chosenPlace = null;
  clearTimeout(placeSearchDebounce);
  const query = placeSearch.value.trim();
  if (query.length < 2) {
    placeMatches = [];
    renderPlaceOptions();
    return;
  }
  // Debounced so we don't hammer the free geocoding service on every
  // keystroke — Nominatim's usage policy expects modest request rates.
  placeSearchDebounce = setTimeout(() => searchPlaces(query), 400);
});
placeSelect.addEventListener('change', async () => {
  const picked = placeMatches[Number(placeSelect.value)] || null;
  placeSelect.style.display = 'none';
  chosenPlace = null;
  if (!picked) return;
  placeSearch.value = picked.displayName;

  const status = document.getElementById('status');
  status.textContent = 'Resolving timezone for that place…';
  try {
    const res = await fetch(`/api/timezone-from-coords?lat=${picked.lat}&lon=${picked.lon}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not resolve a timezone');
    chosenPlace = { ...picked, timeZone: data.timeZone };
    status.textContent = '';
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
});
document.addEventListener('click', (e) => {
  // .contains (not strict equality) so a click on an <option> — a
  // descendant of placeSelect, not placeSelect itself — doesn't get
  // treated as "clicked outside" and hide the list before it can register.
  if (!placeSearch.contains(e.target) && !placeSelect.contains(e.target)) placeSelect.style.display = 'none';
});

// ---- Bodygraph layout (schematic, not pixel-exact to any single source) ----
const CENTER_POS = {
  Head: { x: 200, y: 40, shape: 'triangle-down', w: 60, h: 40 },
  Ajna: { x: 200, y: 110, shape: 'triangle-up', w: 60, h: 45 },
  Throat: { x: 200, y: 195, shape: 'square', w: 70, h: 55 },
  G: { x: 200, y: 285, shape: 'diamond', w: 70, h: 70 },
  Heart: { x: 295, y: 250, shape: 'triangle-left', w: 45, h: 35 },
  Sacral: { x: 200, y: 385, shape: 'square', w: 70, h: 55 },
  Spleen: { x: 90, y: 320, shape: 'triangle-right', w: 55, h: 70 },
  SolarPlexus: { x: 310, y: 345, shape: 'triangle-left', w: 55, h: 70 },
  Root: { x: 200, y: 470, shape: 'square', w: 70, h: 55 },
};

const CENTER_PAIRS = [
  ['G', 'Throat'], ['G', 'Sacral'], ['Sacral', 'Root'], ['Ajna', 'Head'],
  ['SolarPlexus', 'Sacral'], ['G', 'Spleen'], ['Ajna', 'Throat'],
  ['Throat', 'SolarPlexus'], ['Throat', 'Spleen'], ['Spleen', 'Root'],
  ['Root', 'SolarPlexus'], ['Throat', 'Sacral'], ['Heart', 'Throat'],
  ['G', 'Heart'], ['Heart', 'Spleen'], ['Sacral', 'Spleen'], ['Heart', 'SolarPlexus'],
];

function shapePath({ x, y, shape, w, h }) {
  const hw = w / 2, hh = h / 2;
  switch (shape) {
    case 'triangle-down':
      return `M${x - hw},${y - hh} L${x + hw},${y - hh} L${x},${y + hh} Z`;
    case 'triangle-up':
      return `M${x - hw},${y + hh} L${x + hw},${y + hh} L${x},${y - hh} Z`;
    case 'triangle-left':
      return `M${x + hw},${y - hh} L${x + hw},${y + hh} L${x - hw},${y} Z`;
    case 'triangle-right':
      return `M${x - hw},${y - hh} L${x - hw},${y + hh} L${x + hw},${y} Z`;
    case 'diamond':
      return `M${x},${y - hh} L${x + hw},${y} L${x},${y + hh} L${x - hw},${y} Z`;
    default:
      return `M${x - hw},${y - hh} L${x + hw},${y - hh} L${x + hw},${y + hh} L${x - hw},${y + hh} Z`;
  }
}

function buildBodygraph(chart, structure) {
  const definedGatePairKeys = new Set(
    chart.definedChannels.map((c) => c.centers.slice().sort().join('|'))
  );

  const lines = CENTER_PAIRS.map(([a, b]) => {
    const A = CENTER_POS[a], B = CENTER_POS[b];
    const defined = definedGatePairKeys.has([a, b].sort().join('|'));
    return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${defined ? '#158EA4' : '#E4D6CE'}" stroke-width="${defined ? 4 : 2}" />`;
  }).join('\n');

  const shapes = Object.entries(CENTER_POS).map(([name, pos]) => {
    const defined = chart.centers[name];
    const label = name === 'SolarPlexus' ? 'Solar Plexus' : name;
    return `<path d="${shapePath(pos)}" fill="${defined ? '#158EA4' : '#FBF3EF'}" stroke="#E6B1A1" stroke-width="1.5" opacity="${defined ? 0.95 : 0.9}" />
      <text x="${pos.x}" y="${pos.y + 3}" text-anchor="middle" font-size="${label.length > 6 ? 8 : 10}" fill="${defined ? '#FFFFFF' : '#8A7A72'}">${label}</text>`;
  }).join('\n');

  return `<svg viewBox="0 0 400 540" width="380" height="513">
    ${lines}
    ${shapes}
  </svg>`;
}

// ---- Report rendering ----
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function ordinalSuffix(n) {
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Birth date/time are already the exact local wall-clock values the visitor
// typed, so this formats them directly with no timezone conversion needed.
function formatOrdinalLocal(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const monthName = new Date(2000, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
  return `${day}${ordinalSuffix(day)} ${monthName} ${year}${timeStr ? ` @ ${timeStr}` : ''}`;
}

// The Design moment is stored as a UTC instant and needs converting into the
// birth location's local time (unlike birth date/time, which the visitor
// already entered in local terms).
function formatOrdinalInTimeZone(isoUTC, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(isoUTC));
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const day = Number(map.day);
  return `${day}${ordinalSuffix(day)} ${map.month} ${map.year} @ ${map.hour}:${map.minute}`;
}

function computeAge(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const hadBirthdayThisYear = (today.getMonth() + 1 > month) || (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

// A concise, single-screen overview — one line of context per topic, no
// deep-dive paragraphs (those live in the sections and PDF below/beyond
// this). Six Human Design "Variables" fields (Digestion, Sense, Design
// Sense, Motivation, Perspective, Environment) are intentionally left out:
// that subsystem depends on a Color/Tone lookup table we could not source
// and verify accurately, so rather than risk showing a wrong personal
// result, it's omitted until we have a verified data source for it.
function buildOverviewSection(name, birthInputs, chart, content) {
  const rows = [
    ['Name', name || '—'],
    ['Birth Date', formatOrdinalLocal(birthInputs.date, birthInputs.time)],
    ['Age', String(computeAge(birthInputs.date))],
    ['Design Date', formatOrdinalInTimeZone(chart.design.utc, birthInputs.timeZone)],
    ['Type', chart.type, content.typeInfo.shortSummary],
    ['Strategy', content.typeInfo.strategy, content.typeDetailForChart.strategyParagraphs[0]],
    ['Inner Authority', chart.authority, content.authorityInfo.description],
    ['Definition', chart.definition, content.definitionInfoForChart.summary],
    ['Profile', chart.profile, content.profileNarrative],
    ['Incarnation Cross', `${content.crossReading.title} (${chart.incarnationCross.personalitySunGate}/${chart.incarnationCross.personalityEarthGate} | ${chart.incarnationCross.designSunGate}/${chart.incarnationCross.designEarthGate})`, content.crossReading.paragraphs[0].split(' For you specifically')[0]],
    ['Signature', content.typeInfo.signature, content.typeDetailForChart.signatureParagraphs[0]],
    ['Not-Self Theme', content.typeInfo.notSelf, content.typeDetailForChart.notSelfParagraphs[0]],
  ];
  return `<section class="panel overview-panel">
    <h2>Overview</h2>
    ${rows.map(([label, value, desc]) => `
      <div class="overview-row">
        <div class="overview-label">${label}</div>
        <div class="overview-value">${value}</div>
        ${desc ? `<p class="overview-desc">${desc}</p>` : ''}
      </div>`).join('')}
  </section>`;
}

function buildTitlePage(name, birthInputs) {
  const preparedDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const birthDateFormatted = new Date(`${birthInputs.date}T00:00:00`).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<div class="title-page">
    <img src="assets/logo-horizontal-color.png" alt="Embodiance" class="title-logo" />
    <div class="title-eyebrow">Human Design Report</div>
    <h1 class="report-title">Your Bodygraph &amp; Chart Analysis</h1>
    ${name ? `<p class="report-subject">Prepared for ${name}</p>` : ''}
    <div class="title-meta">
      <span><strong>Birth date:</strong> ${birthDateFormatted} at ${birthInputs.time}</span>
      <span><strong>Place of birth:</strong> ${birthInputs.place || birthInputs.timeZone}</span>
      <span><strong>Report prepared:</strong> ${preparedDate}</span>
    </div>
  </div>`;
}

function renderReport(name, birthInputs, data) {
  const { chart, content, structure } = data;
  const result = document.getElementById('result');
  result.innerHTML = '';
  result.hidden = false;

  const reportContent = el(`<div id="report-content"></div>`);
  result.appendChild(reportContent);

  reportContent.appendChild(el(buildTitlePage(name, birthInputs)));

  reportContent.appendChild(el(buildOverviewSection(name, birthInputs, chart, content)));

  const bodygraphSection = el(`<section class="panel">
    <h2>Bodygraph</h2>
    <div class="bodygraph-wrap">
      <div>${buildBodygraph(chart, structure)}</div>
      <div>
        <div class="legend">
          <div><span class="dot" style="background:#158EA4"></span>Defined</div>
          <div><span class="dot" style="background:#E4D6CE"></span>Undefined</div>
        </div>
        <p style="max-width:280px">Schematic bodygraph: centers and connecting channels colored by definition. Exact gate numbers and which specific channel(s) connect each pair are listed in the tables below.</p>
      </div>
    </div>
  </section>`);
  reportContent.appendChild(bodygraphSection);

  const gatesSection = el(`<section class="panel">
    <h2>Activated Gates</h2>
    <p class="legend"><span class="side-badge personality">Personality</span> conscious, from your exact birth moment &nbsp;&nbsp; <span class="side-badge design">Design</span> unconscious, from ~88° of solar arc before birth</p>
    <div class="table-scroll">
      <table class="gates-table">
        <tr><th>Gate</th><th>Name</th><th>Center</th><th>Side(s)</th><th>Keynote</th></tr>
        ${chart.activeGates.map((g) => {
          const info = content.gates[g.gate];
          return `<tr>
            <td>${g.gate}</td>
            <td>${info.name}</td>
            <td>${g.center}</td>
            <td>${g.sides.map((s) => `<span class="side-badge ${s}">${s === 'personality' ? 'P' : 'D'}</span>`).join('')}</td>
            <td>${info.keynote}</td>
          </tr>`;
        }).join('')}
      </table>
    </div>
  </section>`);
  reportContent.appendChild(gatesSection);

  const downloadSection = el(`<section class="panel download-section">
    <button type="button" class="btn-download" id="download-pdf-btn">
      <span class="btn-download-icon">&#8595;</span>
      <span class="btn-download-label">Download Report (PDF)</span>
    </button>
    <div class="download-progress-track" id="download-progress-track" hidden>
      <div class="download-progress-fill" id="download-progress-fill"></div>
    </div>
    <p class="actions-hint" id="download-hint">Takes a few seconds to generate the full report.</p>
  </section>`);
  reportContent.appendChild(downloadSection);

  const timesSection = el(`<section class="panel">
    <h2>Calculation Details</h2>
    <p><strong>Personality (birth) moment, UTC:</strong> ${chart.birth.utc}</p>
    <p><strong>Design moment, UTC:</strong> ${chart.design.utc} (88° of solar arc before birth)</p>
    <p style="color:var(--muted); font-size: 13px;">Planetary positions computed via Swiss Ephemeris. Gate boundaries verified against the standard 5.625°-per-gate mandala (e.g. Gate 41 begins at exactly 302.000° tropical longitude).</p>
  </section>`);
  reportContent.appendChild(timesSection);

  document.getElementById('download-pdf-btn').addEventListener('click', () => {
    downloadReportPDF(name, birthInputs);
  });

  result.scrollIntoView({ behavior: 'smooth' });
}

// The paginated PDF is rendered server-side by a real headless Chromium
// (see server/hd/pdfTemplate.js). We fetch it (rather than a plain
// navigation) so we can show a progress indicator while the ~56-page
// document is generated, then hand the browser the finished file as a
// Blob download once it arrives. No client-side rendering (canvas
// rasterization, window.print()) involved, so it isn't subject to browser
// quirks or iframe-embedding permission restrictions.
const DEFAULT_HINT = 'Takes a few seconds to generate the full report.';

async function downloadReportPDF(name, birthInputs) {
  const btn = document.getElementById('download-pdf-btn');
  const track = document.getElementById('download-progress-track');
  const fill = document.getElementById('download-progress-fill');
  const hint = document.getElementById('download-hint');

  btn.disabled = true;
  btn.classList.add('is-loading');
  track.hidden = false;
  fill.style.width = '0%';
  hint.textContent = 'Generating your report…';

  // There's no real progress feed from a server-rendered PDF, so this
  // eases toward — but never quite reaches — 90%, then snaps to 100% the
  // moment the actual response arrives.
  let pct = 0;
  const ticker = setInterval(() => {
    pct += (90 - pct) * 0.08;
    fill.style.width = `${Math.min(pct, 90)}%`;
  }, 200);

  try {
    const params = new URLSearchParams({
      date: birthInputs.date,
      time: birthInputs.time,
      timeZone: birthInputs.timeZone,
    });
    if (name) params.set('name', name);
    if (birthInputs.place) params.set('place', birthInputs.place);

    const res = await fetch(`/api/report.pdf?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to generate the report.');
    const blob = await res.blob();

    clearInterval(ticker);
    fill.style.width = '100%';

    const disposition = res.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'Human-Design-Report.pdf';

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);

    setTimeout(() => {
      track.hidden = true;
      fill.style.width = '0%';
      btn.disabled = false;
      btn.classList.remove('is-loading');
      hint.textContent = DEFAULT_HINT;
    }, 700);
  } catch (err) {
    clearInterval(ticker);
    track.hidden = true;
    fill.style.width = '0%';
    btn.disabled = false;
    btn.classList.remove('is-loading');
    hint.textContent = 'Something went wrong generating the report — please try again.';
  }
}

document.getElementById('birth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!date || !time || !chosenPlace) {
    status.textContent = 'Please fill in date, time, and select your place of birth from the list.';
    return;
  }
  const timeZone = chosenPlace.timeZone;
  const place = chosenPlace.displayName;

  status.textContent = 'Calculating planetary positions...';
  document.getElementById('result').hidden = true;

  try {
    const res = await fetch('/api/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, time, timeZone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to calculate chart');
    status.textContent = '';
    renderReport(name, { date, time, timeZone, place }, data);
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
});
