// Server-side HTML template for the paginated PDF report, rendered by a
// real headless Chromium (Puppeteer) rather than any client-side browser
// API. Ported directly from the client's public/app.js page builders —
// these are pure string functions with no DOM dependency, so they run
// identically in Node.

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

function buildSummaryPage(chart, content) {
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

function buildBodygraphPage(chart, structure) {
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

function buildChapterPage(eyebrow, title, body) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${eyebrow}</div>
    <h1 class="page-title">${title}</h1>
    <p class="page-body">${body}</p>
  </div>`;
}

function buildTypeOverviewPage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Type &middot; ${content.typeInfo.population} of people</div>
    <h1 class="page-title">${chart.type}</h1>
    <p class="page-stats">Aura: ${content.typeInfo.aura}</p>
    <p class="page-body">${content.typeInfo.summary}</p>
  </div>`;
}

function buildStrategyPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Your Strategy</div>
    <h1 class="page-title">${content.typeInfo.strategy}</h1>
    <p class="page-body">Living by your strategy is what moves you toward your <strong>Signature</strong> feeling of ${content.typeInfo.signature.toLowerCase()}, rather than the <strong>Not-Self</strong> theme of ${content.typeInfo.notSelf.toLowerCase()} that shows up when it's overridden.</p>
  </div>`;
}

function buildSignatureQuotePage(content) {
  return `<div class="report-page center-text quote-page">
    <div class="quote-mark">&ldquo;</div>
    <div class="page-eyebrow">Signature vs. Not-Self</div>
    <h1 class="page-title">${content.typeInfo.signature} / ${content.typeInfo.notSelf}</h1>
    <p class="page-body">${content.typeInfo.signature} is the feeling that lets you know you're living correctly for your type; ${content.typeInfo.notSelf.toLowerCase()} is the signal that something was overridden along the way.</p>
  </div>`;
}

function buildAuthorityPage(content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Inner Authority</div>
    <h1 class="page-title">${content.authorityInfo.title}</h1>
    <p class="page-body">${content.authorityInfo.description}</p>
  </div>`;
}

function buildProfilePage(chart, content) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Profile</div>
    <h1 class="page-title">${chart.profile}</h1>
    <p class="page-body">${content.profileNarrative}</p>
  </div>`;
}

function buildProfileLinePage(lineNumber, roleLabel, content) {
  const line = content.profileLines[lineNumber];
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${roleLabel}</div>
    <h1 class="page-title">Line ${lineNumber}: The ${line.keyword}</h1>
    <p class="page-body">This ${roleLabel.toLowerCase()} line ${line.summary}</p>
  </div>`;
}

function buildDefinitionPage(chart, content) {
  const info = content.definitionInfoForChart;
  return `<div class="report-page center-text">
    <div class="page-eyebrow">Definition</div>
    <h1 class="page-title">${chart.definition}</h1>
    <p class="page-body">${info ? info.summary : ''}</p>
  </div>`;
}

function buildCenterPage(info, defined) {
  return `<div class="report-page center-text">
    <div class="page-eyebrow">${defined ? 'Defined Center' : 'Undefined / Open Center'}</div>
    <h1 class="page-title">${info.label}</h1>
    <p class="page-stats">${info.theme}</p>
    <p class="page-body">${defined ? info.defined : info.undefined}</p>
  </div>`;
}

function buildChannelPage(ch, content) {
  const theme = content.channelThemes[`${ch.gates[0]}-${ch.gates[1]}`] || '';
  return `<div class="report-page center-text quote-page">
    <div class="quote-mark">&ldquo;</div>
    <div class="page-eyebrow">Channel ${ch.gates[0]}&ndash;${ch.gates[1]}</div>
    <h1 class="page-title">${ch.name}</h1>
    <p class="page-stats">${ch.centers[0]} &harr; ${ch.centers[1]}</p>
    <p class="page-body">${theme}</p>
  </div>`;
}

function buildGatePage(g, content) {
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

function buildCrossPage(chart, content) {
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
    buildSummaryPage(chart, content),
    buildBodygraphPage(chart, structure),
    buildTypeOverviewPage(chart, content),
    buildStrategyPage(content),
    buildSignatureQuotePage(content),
    buildAuthorityPage(content),
    buildProfilePage(chart, content),
    buildProfileLinePage(Number(chart.profile.split('/')[0]), 'Conscious Line', content),
    buildProfileLinePage(Number(chart.profile.split('/')[1]), 'Unconscious Line', content),
    buildDefinitionPage(chart, content),
    buildChapterPage(
      'Your Centers',
      'Understanding the Centers',
      'The bodygraph is made up of 9 centers. A defined center is a consistent, reliable part of who you are — always "on," regardless of who you\'re with. An undefined center is where you take in and amplify the energy of others, which can be a source of wisdom or of conditioning depending on how aware of it you are. The following pages walk through each of your 9 centers.'
    ),
    ...Object.entries(content.centers).map(([key, info]) => buildCenterPage(info, chart.centers[key])),
    buildChapterPage(
      'Your Channels',
      'Understanding the Channels',
      'A channel forms when both gates at its two ends are activated, connecting two centers into a single, consistently defined circuit. Each channel carries its own theme — a fixed life-force current running through your design. The following pages cover each channel currently defined in your chart.'
    ),
    ...chart.definedChannels.map((ch) => buildChannelPage(ch, content)),
    buildChapterPage(
      'Your Gates',
      'Understanding the Gates',
      "The 64 gates are the building blocks beneath every center and channel — each one a specific theme activated by a planet's position at your exact birth moment (conscious/Personality) or roughly 88 days earlier (unconscious/Design). The following pages cover every gate activated anywhere in your chart."
    ),
    ...chart.activeGates.map((g) => buildGatePage(g, content)),
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
</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>`;
}
