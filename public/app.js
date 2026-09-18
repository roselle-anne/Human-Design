const tzSearch = document.getElementById('tz-search');
const tzSelect = document.getElementById('timeZone');
let allZones = [];
let chosenZone = null;

async function loadZones() {
  const res = await fetch('/api/timezones');
  allZones = await res.json();
  // Deliberately no pre-filled default: this app supports all 400+ IANA
  // timezones worldwide, and pre-filling one (even the visitor's own) risked
  // looking like the tool was limited to a single region.
}
loadZones();

function renderZoneOptions(filter) {
  const matches = allZones
    .filter((z) => z.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 50);
  tzSelect.innerHTML = matches
    .map((z) => `<option value="${z}">${z}</option>`)
    .join('');
  // Size the listbox to the actual match count (capped at 6) so it never
  // reserves empty rows that visually overlap the elements below it.
  tzSelect.size = Math.max(1, Math.min(matches.length, 6));
  tzSelect.style.display = matches.length && document.activeElement === tzSearch ? 'block' : 'none';
}

tzSearch.addEventListener('input', () => {
  chosenZone = null;
  renderZoneOptions(tzSearch.value);
});
tzSearch.addEventListener('focus', () => {
  tzSearch.select();
  renderZoneOptions(tzSearch.value);
});
tzSelect.addEventListener('change', () => {
  chosenZone = tzSelect.value;
  tzSearch.value = chosenZone;
  tzSelect.style.display = 'none';
});
document.addEventListener('click', (e) => {
  if (e.target !== tzSearch && e.target !== tzSelect) tzSelect.style.display = 'none';
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
      <span><strong>Timezone:</strong> ${birthInputs.timeZone}</span>
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

  const summary = el(`<div class="summary-grid">
    ${['Type', 'Profile', 'Authority', 'Definition'].map((label) => `
      <div class="summary-card">
        <div class="label">${label}</div>
        <div class="value">${chart[label.toLowerCase()]}</div>
      </div>`).join('')}
    <div class="summary-card"><div class="label">Strategy</div><div class="value">${content.typeInfo.strategy}</div></div>
    <div class="summary-card"><div class="label">Signature / Not-Self</div><div class="value">${content.typeInfo.signature} / ${content.typeInfo.notSelf}</div></div>
  </div>`);
  reportContent.appendChild(summary);

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

  const typeSection = el(`<section class="panel">
    <h2>${chart.type}</h2>
    <p><strong>Strategy:</strong> ${content.typeInfo.strategy} &nbsp; | &nbsp; <strong>Signature:</strong> ${content.typeInfo.signature} &nbsp; | &nbsp; <strong>Not-Self Theme:</strong> ${content.typeInfo.notSelf} &nbsp; | &nbsp; <strong>Population:</strong> ${content.typeInfo.population}</p>
    <p>${content.typeInfo.summary}</p>
  </section>`);
  reportContent.appendChild(typeSection);

  const authoritySection = el(`<section class="panel">
    <h2>${content.authorityInfo.title}</h2>
    <p>${content.authorityInfo.description}</p>
  </section>`);
  reportContent.appendChild(authoritySection);

  const profileSection = el(`<section class="panel">
    <h2>Profile ${chart.profile}</h2>
    <p>${content.profileNarrative}</p>
  </section>`);
  reportContent.appendChild(profileSection);

  const crossSection = el(`<section class="panel">
    <h2>Incarnation Cross</h2>
    <p>Your Incarnation Cross is formed by the Sun and Earth gates of your Personality and Design, and is further shaped by your ${chart.profile} profile.</p>
    <table class="gates-table">
      <tr><th></th><th>Sun Gate</th><th>Earth Gate</th></tr>
      <tr><td>Personality (conscious)</td><td>${chart.incarnationCross.personalitySunGate} — ${content.gates[chart.incarnationCross.personalitySunGate].name}</td><td>${chart.incarnationCross.personalityEarthGate} — ${content.gates[chart.incarnationCross.personalityEarthGate].name}</td></tr>
      <tr><td>Design (unconscious)</td><td>${chart.incarnationCross.designSunGate} — ${content.gates[chart.incarnationCross.designSunGate].name}</td><td>${chart.incarnationCross.designEarthGate} — ${content.gates[chart.incarnationCross.designEarthGate].name}</td></tr>
    </table>
  </section>`);
  reportContent.appendChild(crossSection);

  const centersSection = el(`<section class="panel">
    <h2>Centers</h2>
    <div class="center-list">
      ${Object.entries(content.centers).map(([key, info]) => {
        const defined = chart.centers[key];
        return `<div class="center-item ${defined ? 'defined' : ''}">
          <div class="name">${info.label}</div>
          <div class="state">${defined ? 'Defined' : 'Undefined/Open'} — ${info.theme}</div>
          <p>${defined ? info.defined : info.undefined}</p>
        </div>`;
      }).join('')}
    </div>
  </section>`);
  reportContent.appendChild(centersSection);

  const gatesSection = el(`<section class="panel">
    <h2>Activated Gates</h2>
    <p class="legend"><span class="side-badge personality">Personality</span> conscious, from your exact birth moment &nbsp;&nbsp; <span class="side-badge design">Design</span> unconscious, from ~88° of solar arc before birth</p>
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
  const timeZone = chosenZone || tzSearch.value.trim();

  if (!date || !time || !timeZone || !allZones.includes(timeZone)) {
    status.textContent = 'Please fill in date, time, and pick a valid timezone from the list.';
    return;
  }

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
    renderReport(name, { date, time, timeZone }, data);
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
});
