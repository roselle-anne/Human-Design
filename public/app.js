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

  const actions = el(`<div class="report-actions">
    <button type="button" class="btn btn-outline" id="download-pdf-btn">Download Report (PDF)</button>
    <span class="actions-hint">Opens the print dialog — choose "Save as PDF" as the destination.</span>
  </div>`);
  result.appendChild(actions);

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

  const timesSection = el(`<section class="panel">
    <h2>Calculation Details</h2>
    <p><strong>Personality (birth) moment, UTC:</strong> ${chart.birth.utc}</p>
    <p><strong>Design moment, UTC:</strong> ${chart.design.utc} (88° of solar arc before birth)</p>
    <p style="color:var(--muted); font-size: 13px;">Planetary positions computed via Swiss Ephemeris. Gate boundaries verified against the standard 5.625°-per-gate mandala (e.g. Gate 41 begins at exactly 302.000° tropical longitude).</p>
  </section>`);
  reportContent.appendChild(timesSection);

  document.getElementById('download-pdf-btn').addEventListener('click', () => {
    downloadReportPDF(name, birthInputs, chart, content, structure);
  });

  result.scrollIntoView({ behavior: 'smooth' });
}

// ---- PDF-only rendering: a paginated, one-topic-per-page layout used just
// for the downloadable PDF. The on-screen report above stays a single
// continuous page; this builds a separate, detached tree fed to html2pdf. ----
function buildPdfCoverPage(name, birthInputs) {
  const preparedDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const birthDateFormatted = new Date(`${birthInputs.date}T00:00:00`).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<div class="report-page cover-page">
    <img src="assets/logo-horizontal-color.png" alt="Embodiance" class="title-logo" />
    <div class="page-eyebrow">Human Design Report</div>
    <h1 class="report-title">Your Bodygraph &amp; Chart Analysis</h1>
    ${name ? `<p class="report-subject">Prepared for ${name}</p>` : ''}
    <div class="title-meta">
      <span><strong>Birth date:</strong> ${birthDateFormatted} at ${birthInputs.time}</span>
      <span><strong>Timezone:</strong> ${birthInputs.timeZone}</span>
      <span><strong>Report prepared:</strong> ${preparedDate}</span>
    </div>
  </div>`;
}

function buildPdfSummaryPage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">At a Glance</div>
    <h1 class="page-title">Your Chart Summary</h1>
    <div class="summary-grid">
      ${['Type', 'Profile', 'Authority', 'Definition'].map((label) => `
        <div class="summary-card">
          <div class="label">${label}</div>
          <div class="value">${chart[label.toLowerCase()]}</div>
        </div>`).join('')}
      <div class="summary-card"><div class="label">Strategy</div><div class="value">${content.typeInfo.strategy}</div></div>
      <div class="summary-card"><div class="label">Signature / Not-Self</div><div class="value">${content.typeInfo.signature} / ${content.typeInfo.notSelf}</div></div>
    </div>
  </div>`;
}

function buildPdfBodygraphPage(chart, structure) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Your Bodygraph</div>
    <h1 class="page-title">The Chart</h1>
    <div class="bodygraph-wrap centered">
      <div>${buildBodygraph(chart, structure)}</div>
    </div>
    <div class="legend centered">
      <div><span class="dot" style="background:#158EA4"></span>Defined</div>
      <div><span class="dot" style="background:#E4D6CE"></span>Undefined</div>
    </div>
    <p class="page-footnote">Centers and connecting channels are colored by definition. Exact gate numbers and channel names follow in this report.</p>
  </div>`;
}

function buildPdfChapterPage(eyebrow, title, body) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${eyebrow}</div>
    <h1 class="page-title">${title}</h1>
    <p class="page-body">${body}</p>
  </div>`;
}

function buildPdfTypeOverviewPage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Type &middot; ${content.typeInfo.population} of people</div>
    <h1 class="page-title">${chart.type}</h1>
    <p class="page-stats">Aura: ${content.typeInfo.aura}</p>
    <p class="page-body">${content.typeInfo.summary}</p>
  </div>`;
}

function buildPdfStrategyPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Your Strategy</div>
    <h1 class="page-title">${content.typeInfo.strategy}</h1>
    <p class="page-body">Living by your strategy is what moves you toward your <strong>Signature</strong> feeling of ${content.typeInfo.signature.toLowerCase()}, rather than the <strong>Not-Self</strong> theme of ${content.typeInfo.notSelf.toLowerCase()} that shows up when it's overridden.</p>
  </div>`;
}

function buildPdfSignatureQuotePage(content) {
  return `<div class="report-page center-text quote-page">
    <div class="quote-mark">&ldquo;</div>
    <div class="page-eyebrow">Signature vs. Not-Self</div>
    <h1 class="page-title">${content.typeInfo.signature} / ${content.typeInfo.notSelf}</h1>
    <p class="page-body">${content.typeInfo.signature} is the feeling that lets you know you're living correctly for your type; ${content.typeInfo.notSelf.toLowerCase()} is the signal that something was overridden along the way.</p>
  </div>`;
}

function buildPdfAuthorityPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Inner Authority</div>
    <h1 class="page-title">${content.authorityInfo.title}</h1>
    <p class="page-body">${content.authorityInfo.description}</p>
  </div>`;
}

function buildPdfProfilePage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Profile</div>
    <h1 class="page-title">${chart.profile}</h1>
    <p class="page-body">${content.profileNarrative}</p>
  </div>`;
}

function buildPdfProfileLinePage(lineNumber, roleLabel, content) {
  const line = content.profileLines[lineNumber];
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${roleLabel}</div>
    <h1 class="page-title">Line ${lineNumber}: The ${line.keyword}</h1>
    <p class="page-body">This ${roleLabel.toLowerCase()} line ${line.summary}</p>
  </div>`;
}

function buildPdfDefinitionPage(chart, content) {
  const info = content.definitionInfoForChart;
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Definition</div>
    <h1 class="page-title">${chart.definition}</h1>
    <p class="page-body">${info ? info.summary : ''}</p>
  </div>`;
}

function buildPdfCenterPage(info, defined) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${defined ? 'Defined Center' : 'Undefined / Open Center'}</div>
    <h1 class="page-title">${info.label}</h1>
    <p class="page-stats">${info.theme}</p>
    <p class="page-body">${defined ? info.defined : info.undefined}</p>
  </div>`;
}

function buildPdfChannelPage(ch, content) {
  const theme = content.channelThemes[`${ch.gates[0]}-${ch.gates[1]}`] || '';
  return `<div class="report-page center-text quote-page">
    <div class="quote-mark">&ldquo;</div>
    <div class="page-eyebrow">Channel ${ch.gates[0]}&ndash;${ch.gates[1]}</div>
    <h1 class="page-title">${ch.name}</h1>
    <p class="page-stats">${ch.centers[0]} &harr; ${ch.centers[1]}</p>
    <p class="page-body">${theme}</p>
  </div>`;
}

function buildPdfGatePage(g, content) {
  const info = content.gates[g.gate];
  return `<div class="report-page center-text gate-page">
    <div class="page-eyebrow">Gate ${g.gate} &middot; ${g.center}</div>
    <h1 class="page-title">${info.name}</h1>
    <p class="page-stats">
      ${g.sides.map((s) => `<span class="side-badge ${s}">${s === 'personality' ? 'Personality' : 'Design'}</span>`).join(' ')}
    </p>
    <p class="page-body">${info.keynote}</p>
  </div>`;
}

function buildPdfCrossPage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Incarnation Cross</div>
    <h1 class="page-title">Your Life's Work</h1>
    <p class="page-body">Formed by the Sun and Earth gates of your Personality and Design, shaped by your ${chart.profile} profile.</p>
    <table class="gates-table centered-table">
      <tr><th></th><th>Sun Gate</th><th>Earth Gate</th></tr>
      <tr><td>Personality (conscious)</td><td>${chart.incarnationCross.personalitySunGate} — ${content.gates[chart.incarnationCross.personalitySunGate].name}</td><td>${chart.incarnationCross.personalityEarthGate} — ${content.gates[chart.incarnationCross.personalityEarthGate].name}</td></tr>
      <tr><td>Design (unconscious)</td><td>${chart.incarnationCross.designSunGate} — ${content.gates[chart.incarnationCross.designSunGate].name}</td><td>${chart.incarnationCross.designEarthGate} — ${content.gates[chart.incarnationCross.designEarthGate].name}</td></tr>
    </table>
  </div>`;
}

function buildPdfDetailsPage(chart) {
  return `<div class="report-page center-text last-page">
    <div class="page-eyebrow">Calculation Details</div>
    <h1 class="page-title">Thank You</h1>
    <p class="page-body">
      Personality (birth) moment, UTC: ${chart.birth.utc}<br />
      Design moment, UTC: ${chart.design.utc} (88° of solar arc before birth)
    </p>
    <p class="page-footnote">Planetary positions computed via Swiss Ephemeris. Gate boundaries verified against the standard 5.625°-per-gate mandala.</p>
  </div>`;
}

function downloadReportPDF(name, birthInputs, chart, content, structure) {
  const printRoot = document.getElementById('print-root');
  printRoot.innerHTML = '';

  const pages = [
    buildPdfCoverPage(name, birthInputs),
    buildPdfSummaryPage(chart, content),
    buildPdfBodygraphPage(chart, structure),
    buildPdfTypeOverviewPage(chart, content),
    buildPdfStrategyPage(content),
    buildPdfSignatureQuotePage(content),
    buildPdfAuthorityPage(content),
    buildPdfProfilePage(chart, content),
    buildPdfProfileLinePage(Number(chart.profile.split('/')[0]), 'Conscious Line', content),
    buildPdfProfileLinePage(Number(chart.profile.split('/')[1]), 'Unconscious Line', content),
    buildPdfDefinitionPage(chart, content),
    buildPdfChapterPage(
      'Your Centers',
      'Understanding the Centers',
      'The bodygraph is made up of 9 centers. A defined center is a consistent, reliable part of who you are — always "on," regardless of who you\'re with. An undefined center is where you take in and amplify the energy of others, which can be a source of wisdom or of conditioning depending on how aware of it you are. The following pages walk through each of your 9 centers.'
    ),
    ...Object.entries(content.centers).map(([key, info]) =>
      buildPdfCenterPage(info, chart.centers[key])
    ),
    buildPdfChapterPage(
      'Your Channels',
      'Understanding the Channels',
      'A channel forms when both gates at its two ends are activated, connecting two centers into a single, consistently defined circuit. Each channel carries its own theme — a fixed life-force current running through your design. The following pages cover each channel currently defined in your chart.'
    ),
    ...chart.definedChannels.map((ch) => buildPdfChannelPage(ch, content)),
    buildPdfChapterPage(
      'Your Gates',
      'Understanding the Gates',
      "The 64 gates are the building blocks beneath every center and channel — each one a specific theme activated by a planet's position at your exact birth moment (conscious/Personality) or roughly 88 days earlier (unconscious/Design). The following pages cover every gate activated anywhere in your chart."
    ),
    ...chart.activeGates.map((g) => buildPdfGatePage(g, content)),
    buildPdfChapterPage(
      'Your Incarnation Cross',
      'The Cross of Your Life\'s Work',
      'Your Incarnation Cross is formed by four gates: the Sun and Earth of your conscious Personality, and the Sun and Earth of your unconscious Design. Together, shaped by your profile, they describe a purpose that runs through your entire life — the role you are here to play.'
    ),
    buildPdfCrossPage(chart, content),
    buildPdfDetailsPage(chart),
  ];
  for (const html of pages) printRoot.appendChild(el(html));

  // Give the printed document a sensible default filename in "Save as PDF".
  const originalTitle = document.title;
  document.title = `Human Design Report${name ? ' - ' + name : ''}`;

  window.print();

  // restore right away; most browsers block script execution while the
  // print dialog is open, so this runs once it closes either way.
  document.title = originalTitle;
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
