// Server-side HTML template for the paginated PDF report, rendered by a
// real headless Chromium (Puppeteer) rather than any client-side browser
// API. Ported directly from the client's public/app.js page builders —
// these are pure string functions with no DOM dependency, so they run
// identically in Node.

const CENTER_POS = {
  Head: { x: 260, y: 52, shape: 'triangle-down', w: 90, h: 55 },
  Ajna: { x: 260, y: 143, shape: 'triangle-up', w: 90, h: 65 },
  Throat: { x: 260, y: 258, shape: 'square', w: 115, h: 90 },
  G: { x: 260, y: 375, shape: 'diamond', w: 105, h: 105 },
  Heart: { x: 386, y: 325, shape: 'triangle-left', w: 65, h: 55 },
  Sacral: { x: 260, y: 500, shape: 'square', w: 115, h: 90 },
  Spleen: { x: 117, y: 430, shape: 'triangle-right', w: 80, h: 100 },
  SolarPlexus: { x: 403, y: 449, shape: 'triangle-left', w: 80, h: 100 },
  Root: { x: 260, y: 615, shape: 'square', w: 115, h: 90 },
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

// Every gate belonging to a center is printed inside/around that center's
// shape, laid out in a centered grid of up to 3 columns — matching the
// reference chart layout, which always prints a center's full fixed gate
// list (not just the active ones).
function gateGrid(gates, cx, cy, colsMax = 3, rowGap = 26, colGap = 32) {
  const cols = Math.min(colsMax, gates.length);
  const rows = [];
  for (let i = 0; i < gates.length; i += cols) rows.push(gates.slice(i, i + cols));
  const startY = cy - ((rows.length - 1) * rowGap) / 2;
  const cells = [];
  rows.forEach((row, ri) => {
    const y = startY + ri * rowGap;
    const startX = cx - ((row.length - 1) * colGap) / 2;
    row.forEach((gate, ci) => {
      cells.push({ gate, x: startX + ci * colGap, y });
    });
  });
  return cells;
}

// An activated gate's number is stamped in a solid circle badge, colored by
// which side(s) activated it: teal for Personality (conscious) only, dark
// navy for Design (unconscious) only, charcoal when both sides activate it —
// echoing the teal/navy split used for the planetary columns beside the chart.
function badgeColor(sides) {
  const hasPersonality = sides.includes('personality');
  const hasDesign = sides.includes('design');
  if (hasPersonality && hasDesign) return '#222222';
  if (hasPersonality) return '#158EA4';
  return '#2C3E66';
}

function gateLabel(gate, x, y, sides) {
  if (!sides) {
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="#5B4F48">${gate}</text>`;
  }
  return `<circle cx="${x}" cy="${y}" r="11" fill="${badgeColor(sides)}" />
    <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#FFFFFF" font-weight="600">${gate}</text>`;
}

function buildBodygraph(chart, structure) {
  const definedGatePairKeys = new Set(
    chart.definedChannels.map((c) => c.centers.slice().sort().join('|'))
  );
  const activeGateSides = Object.fromEntries(chart.activeGates.map((g) => [g.gate, g.sides]));

  const lines = CENTER_PAIRS.map(([a, b]) => {
    const A = CENTER_POS[a], B = CENTER_POS[b];
    const defined = definedGatePairKeys.has([a, b].sort().join('|'));
    return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${defined ? '#222222' : '#EAD3C8'}" stroke-width="${defined ? 5 : 2}" />`;
  }).join('\n');

  const shapes = Object.keys(CENTER_POS).map((name) => {
    const pos = CENTER_POS[name];
    return `<path d="${shapePath(pos)}" fill="#F4CEBF" stroke="#E6B1A1" stroke-width="1.5" />`;
  }).join('\n');

  const gateNumbers = Object.entries(CENTER_POS).map(([name, pos]) => {
    const gates = structure.centers[name].gates;
    return gateGrid(gates, pos.x, pos.y)
      .map(({ gate, x, y }) => gateLabel(gate, x, y, activeGateSides[gate]))
      .join('\n');
  }).join('\n');

  return `<svg viewBox="0 0 500 700" width="500" height="700">
    ${lines}
    ${shapes}
    ${gateNumbers}
  </svg>`;
}

// A small standalone icon of a single center's own shape, dusty-peach
// outlined, with its fixed gate numbers inside — used in each center
// page's header banner as a compact "which shape is this" reference.
function miniCenterIcon(centerName, gates) {
  const shape = CENTER_POS[centerName].shape;
  const pos = { x: 60, y: 45, shape, w: 92, h: 64 };
  const numbers = gateGrid(gates, pos.x, pos.y, 3, 15, 20)
    .map(({ gate, x, y }) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="10" fill="#FFFFFF">${gate}</text>`)
    .join('\n');
  return `<svg viewBox="0 0 120 90" class="center-hero-icon-svg">
    <path d="${shapePath(pos)}" fill="none" stroke="#E6B1A1" stroke-width="3" />
    ${numbers}
  </svg>`;
}

// A location map of all 9 centers on the bodygraph, labeled but without any
// gate numbers — an orientation page shown once before the individual
// center-by-center pages.
const MAP_LABELS = {
  Head: 'Head', Ajna: 'Ajna', Throat: 'Throat', G: 'Self / G', Heart: 'Ego / Heart',
  Sacral: 'Sacral', Spleen: 'Spleen', SolarPlexus: 'Solar Plexus', Root: 'Root',
};

function buildCentersMapPage() {
  const lines = CENTER_PAIRS.map(([a, b]) => {
    const A = CENTER_POS[a], B = CENTER_POS[b];
    return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#158EA4" stroke-width="3" opacity="0.75" />`;
  }).join('\n');

  const shapes = Object.entries(CENTER_POS).map(([name, pos]) => {
    const label = MAP_LABELS[name];
    const fontSize = label.length > 8 ? 10.5 : 13;
    return `<path d="${shapePath(pos)}" fill="#158EA4" stroke="#FFFFFF" stroke-width="1.5" />
      <text x="${pos.x}" y="${pos.y + 4}" text-anchor="middle" font-size="${fontSize}" font-weight="600" fill="#2A1E14">${label}</text>`;
  }).join('\n');

  return `<div class="report-page cover-page centers-map-page">
    <div class="page-eyebrow">Your Centers</div>
    <h1 class="report-title">Where the Centers Sit</h1>
    <p class="report-subject">A map of the bodygraph before we go center by center</p>
    <svg viewBox="0 0 500 700" width="420" height="588" class="centers-map-svg">
      ${lines}
      ${shapes}
    </svg>
  </div>`;
}

// A general explainer of what "defined" versus "undefined/open" means
// before the report walks through each of the user's 9 centers individually.
function buildCentersConceptPage() {
  return `<div class="report-page">
    <div class="page-eyebrow" style="text-align:center">Before You Begin</div>
    <h1 class="page-title" style="text-align:center">Defined vs. Undefined Centers</h1>
    <div class="two-col">
      <div class="two-col-item">
        <h2>Undefined / Open</h2>
        <p>An open center is not "broken" or "missing" — it's a place in your design built for taking in and amplifying the energy of whoever is around you, rather than generating a fixed version of that energy on your own.</p>
        <p>Because it shifts with your environment, an open center can feel inconsistent day to day, and it's where conditioning from other people tends to settle in the deepest.</p>
      </div>
      <div class="two-col-divider"></div>
      <div class="two-col-item">
        <h2>Defined</h2>
        <p>A defined center is a fixed, reliable part of your energetic makeup — always "on," regardless of who you're with or where you are. It's a consistent trait others can count on from you.</p>
        <p>Because it's constant, you can mistake a defined center's output for "just how everyone is," when it's actually a specific, non-negotiable part of your own design.</p>
      </div>
    </div>
    <div class="affirmations-box">
      <h3>Reading Your Centers</h3>
      <ul class="affirmations">
        <li>Open centers are where you learn the most about yourself, precisely because they're less fixed.</li>
        <li>Defined centers are where your consistency lives — traits you can trust are truly, reliably yours.</li>
        <li>Neither is better: a fully defined chart isn't "more evolved," and a very open chart isn't "less developed."</li>
        <li>The following pages walk through each of your 9 centers and what its state means specifically for you.</li>
      </ul>
    </div>
  </div>`;
}

// Hand-drawn SVG glyphs, not Unicode astrological symbol characters —
// Unicode glyphs rendered inconsistently across environments (Chromium
// substituted colorful emoji-style symbols for several of them in
// testing), which defeats a clean, consistent chart. These are simple
// white-stroke line icons in a shared 0-100 viewBox, styled to sit inside
// a solid-color circle.
const STROKE = 'stroke="white" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const PLANET_SVG = {
  Sun: `<circle cx="50" cy="50" r="30" ${STROKE}/><circle cx="50" cy="50" r="5" fill="white" stroke="none"/>`,
  Earth: `<circle cx="50" cy="50" r="30" ${STROKE}/><line x1="50" y1="20" x2="50" y2="80" ${STROKE}/><line x1="20" y1="50" x2="80" y2="50" ${STROKE}/>`,
  Moon: `<path d="M68,18 A34,34 0 1 0 68,82 A26,26 0 0 1 68,18 Z" fill="white" stroke="none"/>`,
  NorthNode: `<path d="M28,32 A22,22 0 1 1 72,32" ${STROKE}/><circle cx="28" cy="32" r="6" fill="white" stroke="none"/><circle cx="72" cy="32" r="6" fill="white" stroke="none"/>`,
  SouthNode: `<path d="M28,68 A22,22 0 1 0 72,68" ${STROKE}/><circle cx="28" cy="68" r="6" fill="white" stroke="none"/><circle cx="72" cy="68" r="6" fill="white" stroke="none"/>`,
  Mercury: `<path d="M35,20 A15,14 0 0 1 65,20" ${STROKE}/><circle cx="50" cy="45" r="20" ${STROKE}/><line x1="50" y1="65" x2="50" y2="85" ${STROKE}/><line x1="38" y1="78" x2="62" y2="78" ${STROKE}/>`,
  Venus: `<circle cx="50" cy="38" r="20" ${STROKE}/><line x1="50" y1="58" x2="50" y2="85" ${STROKE}/><line x1="36" y1="75" x2="64" y2="75" ${STROKE}/>`,
  Mars: `<circle cx="42" cy="58" r="20" ${STROKE}/><line x1="57" y1="43" x2="80" y2="20" ${STROKE}/><path d="M60,20 L80,20 L80,40" ${STROKE}/>`,
  Jupiter: `<path d="M28,25 Q16,45 38,45 L78,45" ${STROKE}/><line x1="63" y1="20" x2="63" y2="80" ${STROKE}/>`,
  Saturn: `<line x1="28" y1="22" x2="55" y2="22" ${STROKE}/><line x1="42" y1="15" x2="42" y2="58" ${STROKE}/><path d="M42,58 Q42,88 68,78" ${STROKE}/>`,
  Uranus: `<line x1="25" y1="18" x2="25" y2="52" ${STROKE}/><line x1="75" y1="18" x2="75" y2="52" ${STROKE}/><line x1="25" y1="38" x2="75" y2="38" ${STROKE}/><line x1="50" y1="52" x2="50" y2="62" ${STROKE}/><circle cx="50" cy="76" r="13" ${STROKE}/>`,
  Neptune: `<path d="M28,18 Q28,42 50,32 Q72,42 72,18" ${STROKE}/><line x1="50" y1="30" x2="50" y2="85" ${STROKE}/><line x1="34" y1="63" x2="66" y2="63" ${STROKE}/>`,
  Pluto: `<circle cx="50" cy="28" r="14" ${STROKE}/><path d="M30,52 Q50,74 70,52" ${STROKE}/><line x1="50" y1="55" x2="50" y2="82" ${STROKE}/>`,
};
const BODY_ORDER = [
  'Sun', 'Earth', 'Moon', 'NorthNode', 'SouthNode', 'Mercury', 'Venus',
  'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];

function planetColumn(activations, sideClass) {
  const rows = BODY_ORDER.map((body) => {
    const a = activations.find((x) => x.body === body);
    if (!a) return '';
    const degreeInSign = (a.longitude % 30).toFixed(1);
    return `<div class="planet-row ${sideClass}">
      <span class="planet-icon-lg ${sideClass}"><svg viewBox="0 0 100 100">${PLANET_SVG[body]}</svg></span>
      <span class="planet-degree-lg">${degreeInSign}</span>
    </div>`;
  });
  return `<div class="planet-column">${rows.join('')}</div>`;
}

function buildCoverPage(name, birthInputs, logoUrl) {
  const preparedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const birthDateFormatted = new Date(`${birthInputs.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<div class="report-page cover-page">
    <img src="${logoUrl}" alt="Embodiance" class="title-logo" />
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

function buildIntroPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">An Introduction</div>
    <h1 class="page-title">Human Design</h1>
    <div class="page-body intro-body">
      ${content.hdIntroParagraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildChartPage(chart, structure, name, birthInputs) {
  const birthDateFormatted = new Date(`${birthInputs.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return `<div class="report-page chart-page">
    <h1 class="page-title chart-title">Human Design Chart</h1>
    <div class="chart-layout">
      ${planetColumn(chart.personality, 'personality')}
      <div class="chart-center">${buildBodygraph(chart, structure)}</div>
      ${planetColumn(chart.designActivations, 'design')}
    </div>
    <div class="chart-footer">
      ${name ? `<div class="chart-name">${name}</div>` : ''}
      <div class="chart-date">${birthDateFormatted}${birthInputs.time ? ` @ ${birthInputs.time}` : ''}</div>
    </div>
  </div>`;
}

function buildUserDetailsPage(chart, content, name, birthInputs) {
  const birthDateFormatted = new Date(`${birthInputs.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const cross = chart.incarnationCross;
  const rows = [
    ['Birth date', `${birthDateFormatted} @ ${birthInputs.time}`],
    ['Type', chart.type],
    ['Signature', content.typeInfo.signature],
    ['Not-Self', content.typeInfo.notSelf],
    ['Strategy', content.typeInfo.strategy],
    ['Authority', chart.authority],
    ['Profile', chart.profile],
    ['Definition', chart.definition],
  ];
  return `<div class="report-page center-text">
    <h1 class="page-title">${name || 'Your'}${name ? "'s" : ''} Details</h1>
    <div class="details-list">
      ${rows.map(([label, value]) => `
        <div class="detail-row">
          <span class="detail-label">${label}</span>
          <span class="detail-value">${value}</span>
        </div>`).join('')}
      <div class="detail-row detail-row-cross">
        <span class="detail-label">Incarnation Cross</span>
        <span class="detail-value">Gates ${cross.personalitySunGate}/${cross.personalityEarthGate} | ${cross.designSunGate}/${cross.designEarthGate}</span>
      </div>
    </div>
  </div>`;
}

function buildFiveTypesOverviewPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Overview</div>
    <h1 class="page-title">The Five Energy Types</h1>
    <div class="types-list">
      ${Object.entries(content.types).map(([typeName, info]) => `
        <div class="type-row">
          <div class="type-row-header">
            <span class="type-name">${typeName}</span>
            <span class="type-pop">${info.population}</span>
          </div>
          <p>${info.shortSummary}</p>
        </div>`).join('')}
    </div>
  </div>`;
}

// Section title/divider pages reuse the cover page's exact gradient
// background, title, and subtitle styling (report-title / report-subject),
// just without the logo — per the requested "same layout and design".
function buildChapterPage(eyebrow, title, body) {
  return `<div class="report-page cover-page">
    <div class="page-eyebrow">${eyebrow}</div>
    <h1 class="report-title">${title}</h1>
    <p class="report-subject">${body}</p>
  </div>`;
}

function buildTypeHeroPage(chart, content) {
  const detail = content.typeDetailForChart;
  return `<div class="report-page center-text">
    <div class="type-badge">${chart.type}</div>
    <p class="type-subtitle">${detail.subtitle}</p>
    <div class="page-body">
      ${detail.overview.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildAuraPage(chart, content) {
  const detail = content.typeDetailForChart;
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${chart.type}</div>
    <h1 class="page-title">Your Aura</h1>
    <div class="page-body">
      ${detail.aura.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildStrategyPage(chart, content) {
  const detail = content.typeDetailForChart;
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${chart.type}</div>
    <h1 class="page-title">Your Strategy</h1>
    <p class="page-stats">${content.typeInfo.strategy}</p>
    <div class="page-body">
      ${detail.strategyParagraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildNotSelfSignaturePage(chart, content) {
  const detail = content.typeDetailForChart;
  return `<div class="report-page">
    <div class="two-col">
      <div class="two-col-item">
        <h2>${content.typeInfo.notSelf}</h2>
        ${detail.notSelfParagraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <div class="two-col-divider"></div>
      <div class="two-col-item">
        <h2>${content.typeInfo.signature}</h2>
        ${detail.signatureParagraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
    </div>
    <div class="affirmations-box">
      <h3>Affirmations</h3>
      <ul class="affirmations">
        ${detail.affirmations.map((a) => `<li>${a}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

function buildAuthorityPage(chart, content) {
  const detail = content.authorityDetailForChart;
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Your Decision Compass</div>
    <h1 class="page-title">${detail.pageTitle}</h1>
    <div class="page-body">
      ${detail.paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildProfilePage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Profile</div>
    <div class="type-badge">${chart.profile}</div>
    <p class="page-body">${content.profileNarrative}</p>
  </div>`;
}

function buildProfileLinePage(lineNumber, eyebrow, content) {
  const line = content.profileLines[lineNumber];
  const detail = content.profileLineDetail[lineNumber];
  return `<div class="report-page">
    <div class="page-eyebrow line-eyebrow" style="text-align:center">${eyebrow}</div>
    <h1 class="page-title" style="text-align:center">Line ${lineNumber}</h1>
    <div class="page-body line-body">
      ${detail.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      <h2>Potentials</h2>
      <p>${detail.potentials}</p>
      <h2>Challenges</h2>
      <p>${detail.challenges}</p>
    </div>
  </div>`;
}

function buildDefinitionPage(chart, content) {
  const info = content.definitionInfoForChart;
  const paragraphs = info?.paragraphs?.length ? info.paragraphs : (info ? [info.summary] : []);
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Definition</div>
    <h1 class="page-title">${chart.definition}</h1>
    <div class="page-body">
      ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </div>`;
}

function buildCenterPage(key, info, defined, content, structure) {
  const state = defined ? 'defined' : 'undefined';
  const deepDive = content.centerDeepDive[key]?.[state];
  const baseName = info.label.split(' (')[0];
  return `<div class="report-page center-text">
    <div class="center-hero">
      <span class="center-hero-icon">${miniCenterIcon(key, structure.centers[key].gates)}</span>
      <div class="center-hero-text">
        <h1>${baseName} Center</h1>
        <p class="center-hero-state">${state}</p>
      </div>
    </div>
    <p class="page-stats">${info.theme}</p>
    <p class="page-body">${defined ? info.defined : info.undefined}</p>
    ${deepDive ? `
    <div class="deep-dive">
      <div class="deep-dive-block">
        <div class="deep-dive-label">Challenges</div>
        <p>${deepDive.challenges}</p>
      </div>
      <div class="deep-dive-block">
        <div class="deep-dive-label">Potentials</div>
        <p>${deepDive.potentials}</p>
      </div>
      <div class="deep-dive-block">
        <div class="deep-dive-label">Affirmations</div>
        <ul class="affirmations">
          ${deepDive.affirmations.map((a) => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>` : ''}
  </div>`;
}

function sparkleIcon(size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="sparkle-icon"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#158EA4"/></svg>`;
}

function shapeBBox(pos) {
  return [pos.x - pos.w / 2, pos.y - pos.h / 2, pos.x + pos.w / 2, pos.y + pos.h / 2];
}

// A compact "symbol" for a channel's report page: just the two centers it
// connects (with their own full gate lists, badged the same way as the main
// chart) and the connecting line — a focused crop of the full bodygraph.
function miniChannelDiagram(ch, chart, structure) {
  const [nameA, nameB] = ch.centers;
  const posA = CENTER_POS[nameA];
  const posB = CENTER_POS[nameB];
  const activeGateSides = Object.fromEntries(chart.activeGates.map((g) => [g.gate, g.sides]));

  const cellsA = gateGrid(structure.centers[nameA].gates, posA.x, posA.y, 3, 22, 28);
  const cellsB = gateGrid(structure.centers[nameB].gates, posB.x, posB.y, 3, 22, 28);
  const allCells = [...cellsA, ...cellsB];

  const [ax0, ay0, ax1, ay1] = shapeBBox(posA);
  const [bx0, by0, bx1, by1] = shapeBBox(posB);
  const pad = 20;
  const minX = Math.min(ax0, bx0, ...allCells.map((c) => c.x)) - pad;
  const maxX = Math.max(ax1, bx1, ...allCells.map((c) => c.x)) + pad;
  const minY = Math.min(ay0, by0, ...allCells.map((c) => c.y)) - pad;
  const maxY = Math.max(ay1, by1, ...allCells.map((c) => c.y)) + pad;
  const w = maxX - minX;
  const h = maxY - minY;

  const line = `<line x1="${posA.x}" y1="${posA.y}" x2="${posB.x}" y2="${posB.y}" stroke="#222222" stroke-width="5" />`;
  const shapes = [posA, posB]
    .map((pos) => `<path d="${shapePath(pos)}" fill="#F4CEBF" stroke="#E6B1A1" stroke-width="1.5" />`)
    .join('\n');
  const labels = allCells.map(({ gate, x, y }) => gateLabel(gate, x, y, activeGateSides[gate])).join('\n');

  // Some channel pairs (e.g. Throat-Sacral) sit far apart vertically on the
  // full chart, which would otherwise stretch this crop into a very tall
  // image and push the page footer onto a second physical PDF page. Fit the
  // crop inside a fixed box instead of scaling a fixed width by aspect ratio.
  const maxW = 230;
  const maxH = 260;
  const scale = Math.min(maxW / w, maxH / h);
  return `<svg viewBox="${minX} ${minY} ${w} ${h}" width="${Math.round(w * scale)}" height="${Math.round(h * scale)}">
    ${line}
    ${shapes}
    ${labels}
  </svg>`;
}

function buildChannelPage(ch, content, chart, structure) {
  const key = `${ch.gates[0]}-${ch.gates[1]}`;
  const detail = content.channelDetail[key];
  const paragraphs = detail?.paragraphs?.length ? detail.paragraphs : [content.channelThemes[key] || ''];
  const quote = detail?.quote || content.channelThemes[key] || '';
  return `<div class="report-page channel-page">
    <div class="channel-eyebrow-row">
      ${sparkleIcon()}
      <div class="page-eyebrow">Channel ${ch.gates[0]}&ndash;${ch.gates[1]}</div>
      ${sparkleIcon()}
    </div>
    <h1 class="page-title channel-title">${ch.name}</h1>
    <div class="channel-sparkle-divider">${sparkleIcon(20)}</div>
    <div class="page-body channel-body">
      ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <div class="channel-footer">
      <div class="channel-diagram">${miniChannelDiagram(ch, chart, structure)}</div>
      <div class="channel-quote">
        <p>${quote}</p>
        <div class="channel-quote-mark">&rdquo;</div>
      </div>
    </div>
  </div>`;
}

// A gate's own "symbol" for its hero banner: a mini icon of the shape of
// the center it belongs to (verified, drawn straight from our own gate/
// center data), with this specific gate picked out among its neighbors —
// deliberately not an I Ching hexagram glyph, since we can't independently
// verify a hexagram line-pattern dataset for all 64 gates with confidence,
// the same reasoning that keeps the Incarnation Cross page from asserting
// an unverified named cross.
function miniGateIcon(centerName, gates, highlightGate) {
  const shape = CENTER_POS[centerName].shape;
  const pos = { x: 60, y: 45, shape, w: 92, h: 64 };
  const numbers = gateGrid(gates, pos.x, pos.y, 3, 15, 20)
    .map(({ gate, x, y }) => {
      if (gate === highlightGate) {
        return `<circle cx="${x}" cy="${y}" r="9" fill="#E6B1A1" /><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#FFFFFF" font-weight="600">${gate}</text>`;
      }
      return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="10" fill="#FFFFFF" opacity="0.55">${gate}</text>`;
    })
    .join('\n');
  return `<svg viewBox="0 0 120 90" class="center-hero-icon-svg">
    <path d="${shapePath(pos)}" fill="none" stroke="#E6B1A1" stroke-width="3" />
    ${numbers}
  </svg>`;
}

function buildGatePage(g, content, structure) {
  const info = content.gates[g.gate];
  const deepDive = content.gateDeepDive[g.gate];
  const detail = content.gateDetail[g.gate];
  return `<div class="report-page center-text gate-page">
    <div class="center-hero">
      <span class="center-hero-icon">${miniGateIcon(g.center, structure.centers[g.center].gates, g.gate)}</span>
      <div class="center-hero-text">
        <h1>${info.name}</h1>
        <p class="center-hero-state">Gate ${g.gate} &middot; ${g.center}</p>
      </div>
    </div>
    <p class="page-stats">
      ${g.sides.map((s) => `<span class="side-badge ${s}">${s === 'personality' ? 'Personality' : 'Design'}</span>`).join(' ')}
    </p>
    <p class="page-body"><strong>${info.keynote}</strong></p>
    ${deepDive ? `<p class="page-body">${deepDive}</p>` : ''}
    ${detail?.affirmations?.length ? `
    <div class="deep-dive">
      <div class="deep-dive-block">
        <div class="deep-dive-label">Affirmations</div>
        <ul class="affirmations">
          ${detail.affirmations.map((a) => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>` : ''}
  </div>`;
}

// The Incarnation Cross is interpreted from the four gates it's actually
// built from (each already backed by a verified name/keynote elsewhere in
// this report), rather than asserting one of the traditional named crosses
// (e.g. "Right Angle Cross of..."). That naming system depends on an
// angle/profile classification rule we can't independently verify as
// correct across every profile combination, so — as with the rest of this
// report — we interpret only what we can calculate and confirm.
function buildCrossPage(chart, content) {
  const cross = chart.incarnationCross;
  const pSun = content.gates[cross.personalitySunGate];
  const pEarth = content.gates[cross.personalityEarthGate];
  const dSun = content.gates[cross.designSunGate];
  const dEarth = content.gates[cross.designEarthGate];
  const trim = (s) => s.replace(/\.$/, '').toLowerCase();
  return `<div class="report-page cross-page">
    <div class="cross-hero">
      <div class="page-eyebrow">Incarnation Cross</div>
      <h1 class="report-title">Your Life's Work</h1>
      <p class="report-subject">Gates ${cross.personalitySunGate}/${cross.personalityEarthGate} &middot; ${cross.designSunGate}/${cross.designEarthGate}</p>
    </div>
    <div class="page-body cross-body">
      <p>Your Incarnation Cross is carried by four gates: consciously, the Sun in Gate ${cross.personalitySunGate} (${pSun.name}) opposite the Earth in Gate ${cross.personalityEarthGate} (${pEarth.name}); unconsciously, the Sun in Gate ${cross.designSunGate} (${dSun.name}) opposite the Earth in Gate ${cross.designEarthGate} (${dEarth.name}).</p>
      <p>Consciously, you are here to work with the theme of ${trim(pSun.keynote)}, grounded and made practical through ${trim(pEarth.keynote)}. This is the half of your life's work you can name for yourself and speak to directly.</p>
      <p>Underneath, your unconscious design carries ${trim(dSun.keynote)}, balanced by ${trim(dEarth.keynote)}. This half runs quietly in the background — other people often notice it in you well before you notice it yourself, and it shapes your life's work just as much as the conscious half does.</p>
      <p>Together, shaped by your ${chart.profile} profile, these four gates describe a specific, non-repeatable role: not a job title, but a current running through everything you do, whether or not you ever put a name to it.</p>
    </div>
    <table class="gates-table centered-table">
      <tr><th></th><th>Sun Gate</th><th>Earth Gate</th></tr>
      <tr><td>Personality (conscious)</td><td>${cross.personalitySunGate} — ${pSun.name}</td><td>${cross.personalityEarthGate} — ${pEarth.name}</td></tr>
      <tr><td>Design (unconscious)</td><td>${cross.designSunGate} — ${dSun.name}</td><td>${cross.designEarthGate} — ${dEarth.name}</td></tr>
    </table>
  </div>`;
}

function buildDetailsPage(chart) {
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

/**
 * Build the full standalone HTML document for the paginated PDF report.
 * @param {string} inlineCss - the app's style.css content, embedded directly
 *   so Puppeteer never depends on a network round-trip back to this server.
 * @param {string} logoUrl - absolute URL to the Embodiance logo image.
 */
export function buildReportHtml(chart, content, structure, name, birthInputs, inlineCss, logoUrl) {
  const pages = [
    buildCoverPage(name, birthInputs, logoUrl),
    buildIntroPage(content),
    buildChartPage(chart, structure, name, birthInputs),
    buildUserDetailsPage(chart, content, name, birthInputs),
    buildChapterPage('Section', 'Type', content.sectionIntros.Type),
    buildFiveTypesOverviewPage(content),
    buildTypeHeroPage(chart, content),
    buildAuraPage(chart, content),
    buildStrategyPage(chart, content),
    buildNotSelfSignaturePage(chart, content),
    buildChapterPage('Section', 'Authority', content.sectionIntros.Authority),
    buildAuthorityPage(chart, content),
    buildChapterPage('Section', 'Profile', content.sectionIntros.Profile),
    buildProfilePage(chart, content),
    buildProfileLinePage(Number(chart.profile.split('/')[0]), 'How You Perceive Yourself', content),
    buildProfileLinePage(Number(chart.profile.split('/')[1]), 'How Others Perceive You', content),
    buildChapterPage('Section', 'Definition', content.sectionIntros.Definition),
    buildDefinitionPage(chart, content),
    buildChapterPage(
      'Your Centers',
      'Understanding the Centers',
      'The bodygraph is made up of 9 centers. A defined center is a consistent, reliable part of who you are — always "on," regardless of who you\'re with. An undefined center is where you take in and amplify the energy of others, which can be a source of wisdom or of conditioning depending on how aware of it you are. The following pages walk through each of your 9 centers.'
    ),
    buildCentersMapPage(),
    buildCentersConceptPage(),
    ...Object.entries(content.centers).map(([key, info]) => buildCenterPage(key, info, chart.centers[key], content, structure)),
    buildChapterPage(
      'Your Channels',
      'Understanding the Channels',
      'A channel forms when both gates at its two ends are activated, connecting two centers into a single, consistently defined circuit. Each channel carries its own theme — a fixed life-force current running through your design. The following pages cover each channel currently defined in your chart.'
    ),
    ...chart.definedChannels.map((ch) => buildChannelPage(ch, content, chart, structure)),
    buildChapterPage(
      'Your Gates',
      'Understanding the Gates',
      "The 64 gates are the building blocks beneath every center and channel — each one a specific theme activated by a planet's position at your exact birth moment (conscious/Personality) or roughly 88 days earlier (unconscious/Design). The following pages cover every gate activated anywhere in your chart."
    ),
    ...chart.activeGates.map((g) => buildGatePage(g, content, structure)),
    buildChapterPage(
      'Your Incarnation Cross',
      "The Cross of Your Life's Work",
      'Your Incarnation Cross is formed by four gates: the Sun and Earth of your conscious Personality, and the Sun and Earth of your unconscious Design. Together, shaped by your profile, they describe a purpose that runs through your entire life — the role you are here to play.'
    ),
    buildCrossPage(chart, content),
    buildDetailsPage(chart),
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
<style>${inlineCss}</style>
<style>
  /* PDF-specific overrides: everything here is always "print" — no
     on-screen chrome (header/form/nav) exists in this document at all. */
  body { padding: 0; }
  .report-page:last-child { break-after: auto; page-break-after: auto; }
  /* Blurred box-shadows are expensive to rasterize and repeated on every
     one of 56 pages measurably slowed rendering on Render's constrained
     CPU (page.pdf() alone took 45 of 54 total seconds) - a shadow also
     adds nothing meaningful to a printed page the way it does as a
     screen-UI affordance, so it's dropped here rather than tuned. */
  .report-page { box-shadow: none !important; }
</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>`;
}
