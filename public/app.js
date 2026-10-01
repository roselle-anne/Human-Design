const placeSearch = document.getElementById('place-search');
const placeSelect = document.getElementById('place-select');
let placeMatches = [];
let chosenPlace = null; // { displayName, lat, lon, timeZone }
let placeSearchController = null;
let placeSearchDebounce = null;
// Tracked explicitly rather than checked via `document.activeElement` at
// render time — on mobile, the async fetch in searchPlaces can complete
// after the input has briefly lost focus (keyboard/viewport adjustments),
// which made the dropdown silently never appear even though there were
// valid matches.
let placeDropdownOpen = false;

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
  placeSelect.style.display = placeMatches.length && placeDropdownOpen ? 'block' : 'none';
}

placeSearch.addEventListener('input', () => {
  chosenPlace = null;
  placeDropdownOpen = true;
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
  placeDropdownOpen = false;
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
placeSearch.addEventListener('focus', () => {
  if (placeMatches.length) {
    placeDropdownOpen = true;
    renderPlaceOptions();
  }
});
document.addEventListener('click', (e) => {
  // .contains (not strict equality) so a click on an <option> — a
  // descendant of placeSelect, not placeSelect itself — doesn't get
  // treated as "clicked outside" and hide the list before it can register.
  if (!placeSearch.contains(e.target) && !placeSelect.contains(e.target)) {
    placeDropdownOpen = false;
    placeSelect.style.display = 'none';
  }
});

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
// this).
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
    ${buildVariablesSubsection(content)}
  </section>`;
}

// The six Human Design "Variables" (PHS) fields. Real per-person values
// require Color/Tone arc-subdivision math and a verified Color-to-category
// lookup table this app doesn't have a trustworthy source for yet, so this
// shows a fixed illustrative example (same for every visitor) rather than a
// computed personal result — clearly labeled as such so it's never mistaken
// for this person's actual reading.
function buildVariablesSubsection(content) {
  return `<div class="variables-subsection">
    <div class="overview-row">
      <div class="overview-label">Your Variables (Example)</div>
      <p class="overview-desc">Digestion, Sense, Design Sense, Motivation, Perspective, and Environment come from a further Color/Tone breakdown of your chart that isn't yet computed here. The fields below illustrate what this section will look like once that's added — they are <strong>not</strong> calculated from your birth data.</p>
    </div>
    ${content.variablesTemplate.map(({ label, value, description }) => `
      <div class="overview-row">
        <div class="overview-label">${label}</div>
        <div class="overview-value">${value}</div>
        <p class="overview-desc">${description}</p>
      </div>`).join('')}
  </div>`;
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
  const { chart, content, bodygraphSvg } = data;
  const result = document.getElementById('result');
  result.innerHTML = '';
  result.hidden = false;

  const reportContent = el(`<div id="report-content"></div>`);
  result.appendChild(reportContent);

  reportContent.appendChild(el(buildTitlePage(name, birthInputs)));

  const bodygraphSection = el(`<section class="panel bodygraph-panel">
    <h2>Bodygraph</h2>
    <div class="bodygraph-wrap centered">${bodygraphSvg}</div>
  </section>`);
  reportContent.appendChild(bodygraphSection);

  reportContent.appendChild(el(buildOverviewSection(name, birthInputs, chart, content)));

  const downloadSection = el(`<section class="panel download-section">
    <button type="button" class="btn-download" id="download-pdf-btn">
      <span class="btn-download-icon">&#8595;</span>
      <span class="btn-download-label">Download Report (PDF)</span>
    </button>
    <div class="download-progress-track" id="download-progress-track" hidden>
      <div class="download-progress-fill" id="download-progress-fill"></div>
    </div>
    <p class="actions-hint" id="download-hint">Takes a few seconds to generate the full report.</p>
    <button type="button" class="btn-download btn-download-secondary" id="download-overview-btn">
      <span class="btn-download-icon">&#8595;</span>
      <span class="btn-download-label">Download Overview (PDF)</span>
    </button>
    <div class="download-progress-track" id="overview-progress-track" hidden>
      <div class="download-progress-fill" id="overview-progress-fill"></div>
    </div>
    <p class="actions-hint" id="overview-hint">A one-page summary of the Overview above.</p>
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
    downloadPDF('/api/report.pdf', name, birthInputs, {
      btnId: 'download-pdf-btn',
      trackId: 'download-progress-track',
      fillId: 'download-progress-fill',
      hintId: 'download-hint',
      defaultHint: 'Takes a few seconds to generate the full report.',
      loadingHint: 'Generating your report…',
      fallbackFilename: 'Human-Design-Report.pdf',
    });
  });

  document.getElementById('download-overview-btn').addEventListener('click', () => {
    downloadPDF('/api/overview.pdf', name, birthInputs, {
      btnId: 'download-overview-btn',
      trackId: 'overview-progress-track',
      fillId: 'overview-progress-fill',
      hintId: 'overview-hint',
      defaultHint: 'A one-page summary of the Overview above.',
      loadingHint: 'Generating your overview…',
      fallbackFilename: 'Human-Design-Overview.pdf',
    });
  });

  result.scrollIntoView({ behavior: 'smooth' });
}

// The paginated PDF is rendered server-side by a real headless Chromium
// (see server/hd/pdfTemplate.js). We fetch it (rather than a plain
// navigation) so we can show a progress indicator while the document is
// generated, then hand the browser the finished file as a Blob download
// once it arrives. No client-side rendering (canvas rasterization,
// window.print()) involved, so it isn't subject to browser quirks or
// iframe-embedding permission restrictions. Shared by both the full report
// and the shorter one-page overview download.
async function downloadPDF(endpoint, name, birthInputs, ui) {
  const btn = document.getElementById(ui.btnId);
  const track = document.getElementById(ui.trackId);
  const fill = document.getElementById(ui.fillId);
  const hint = document.getElementById(ui.hintId);

  btn.disabled = true;
  btn.classList.add('is-loading');
  track.hidden = false;
  fill.style.width = '0%';
  hint.textContent = ui.loadingHint;

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

    const res = await fetch(`${endpoint}?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to generate the PDF.');
    const blob = await res.blob();

    clearInterval(ticker);
    fill.style.width = '100%';

    const disposition = res.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : ui.fallbackFilename;

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
      hint.textContent = ui.defaultHint;
    }, 700);
  } catch (err) {
    clearInterval(ticker);
    track.hidden = true;
    fill.style.width = '0%';
    btn.disabled = false;
    btn.classList.remove('is-loading');
    hint.textContent = 'Something went wrong generating the PDF — please try again.';
  }
}

document.getElementById('birth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!name || !date || !time || !chosenPlace) {
    status.textContent = 'Please fill in your full name, date, time, and select your place of birth from the list.';
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
