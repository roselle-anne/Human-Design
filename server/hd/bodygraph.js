import fs from 'node:fs';

// Fixed artwork coordinates match the supplied 1024 x 1536 reference.
// Gates and connections remain structural data, never copied from its labels.
const figure = 'data:image/png;base64,' + fs.readFileSync(new URL('../../public/assets/bodygraph-silhouette-v2.png', import.meta.url)).toString('base64');
const CENTERS = {
  Head: [512,233,164,154,'up','#faead7','#ead0b6'],
  Ajna: [512,421,164,152,'down','#e8b3a2','#f3d1c4'],
  Throat: [512,645,164,162,'square','#edc9ab','#dfb997'],
  G: [512,873,212,220,'diamond','#fae8ce','#e8c8a7'],
  Heart: [694,954,158,122,'heart','#e7ad99','#f4d5c8'],
  Sacral: [512,1135,164,158,'square','#e3a092','#f3d3c8'],
  Spleen: [232,1120,160,204,'right','#edc6a5','#f5deca'],
  SolarPlexus: [794,1120,160,204,'left','#edc6a5','#f5deca'],
  Root: [512,1342,164,158,'square','#edc9ab','#dfb997'],
};
const GATES = {
  Head: [[64,470,287],[61,512,287],[63,554,287]],
  Ajna: [[47,470,365],[24,512,365],[4,554,365],[17,487,422],[11,537,422],[43,512,462]],
  Throat: [[62,471,586],[23,512,586],[56,553,586],[16,456,625],[35,569,625],[20,456,668],[12,569,668],[45,512,645],[31,472,704],[8,512,704],[33,552,704]],
  G: [[1,512,793],[7,475,828],[13,549,828],[10,439,873],[25,585,873],[15,478,919],[46,548,919],[2,512,956]],
  Heart: [[21,711,925],[51,685,956],[26,656,993],[40,737,993]],
  Sacral: [[5,473,1078],[14,512,1078],[29,553,1078],[34,456,1114],[27,456,1160],[59,568,1160],[42,473,1194],[3,512,1194],[9,552,1194]],
  Spleen: [[48,174,1048],[57,205,1073],[44,242,1095],[50,282,1117],[32,242,1145],[28,206,1171],[18,174,1198]],
  SolarPlexus: [[36,852,1048],[22,819,1073],[37,785,1095],[6,742,1117],[49,785,1145],[55,819,1171],[30,852,1198]],
  Root: [[53,471,1284],[60,512,1284],[52,552,1284],[54,456,1321],[38,456,1360],[58,456,1397],[19,569,1321],[39,569,1360],[41,569,1397]],
};
const POINT = Object.fromEntries(Object.values(GATES).flat().map(([g,x,y])=>[g,[x,y]]));
// Every channel has its own route. Straight central tracks and nested
// outer arcs are intentional; a generic center-to-center bow cannot
// reproduce the reference's arrangement.
const ROUTES = [
  [64,47,[]],[61,24,[]],[63,4,[]],
  [17,62,[474,455,474,535]],[43,23,[512,495,512,546]],[11,56,[550,455,550,535]],
  [31,7,[474,742,474,781]],[8,1,[]],[33,13,[550,742,550,781]],
  [15,5,[474,972,474,1020]],[2,14,[]],[46,29,[550,972,550,1020]],
  [42,53,[474,1225,474,1250]],[3,60,[]],[9,52,[550,1225,550,1250]],
  [16,48,[308,735,224,923]],
  [20,57,[323,765,281,942]],
  [20,10,[414,747,415,818]],
  [20,34,[382,820,360,1037]],
  [10,34,[333,936,311,1053]],
  [10,57,[348,846,265,941]],
  [57,34,[251,1017,330,1086]],
  [50,27,[319,1149,373,1175]],
  [44,26,[363,988,534,990]],
  [28,38,[242,1288,350,1348]],
  [18,58,[220,1348,339,1400]],
  [32,54,[278,1258,356,1305]],
  [35,36,[716,734,778,914]],
  [12,22,[705,788,735,932]],
  [45,21,[650,718,725,826]],
  [25,51,[626,885,660,918]],
  [40,37,[765,1036,786,1062]],
  [6,59,[699,1162,635,1186]],
  [49,19,[750,1258,671,1305]],
  [55,39,[787,1293,673,1349]],
  [30,41,[786,1368,670,1400]],
];
function rounded(points, radius=18) {
  const n=points.length;
  return points.map((p,i)=>{
    const a=points[(i+n-1)%n], b=points[(i+1)%n];
    const da=Math.hypot(a[0]-p[0],a[1]-p[1]), db=Math.hypot(b[0]-p[0],b[1]-p[1]);
    const ra=Math.min(radius,da/2), rb=Math.min(radius,db/2);
    const q=[p[0]+(a[0]-p[0])*ra/da,p[1]+(a[1]-p[1])*ra/da];
    const r=[p[0]+(b[0]-p[0])*rb/db,p[1]+(b[1]-p[1])*rb/db];
    return (i?'L':'M')+q.join(' ')+' Q'+p.join(' ')+' '+r.join(' ');
  }).join(' ')+'Z';
}
function centerPath([x,y,w,h,shape]) {
  const l=x-w/2,r=x+w/2,t=y-h/2,b=y+h/2;
  if(shape==='square') return 'M'+(l+24)+' '+t+' H'+(r-24)+' Q'+r+' '+t+' '+r+' '+(t+24)+' V'+(b-24)+' Q'+r+' '+b+' '+(r-24)+' '+b+' H'+(l+24)+' Q'+l+' '+b+' '+l+' '+(b-24)+' V'+(t+24)+' Q'+l+' '+t+' '+(l+24)+' '+t+'Z';
  const points=shape==='heart'?[[x+18,t],[r,b],[l,b]]:shape==='up'?[[x,t],[r,b],[l,b]]:shape==='down'?[[l,t],[r,t],[x,b]]:shape==='diamond'?[[x,t],[r,y],[x,b],[l,y]]:shape==='left'?[[r,t],[r,b],[l,y]]:[[l,t],[r,y],[l,b]];
  return rounded(points);
}
const PALETTE={personality:'#426963',design:'#c2817e',both:'#958980',inactive:'#fae7d9'};
function tint(color, amount) {
  const rgb=color.slice(1).match(/../g).map(v=>Math.round(parseInt(v,16)*(1-amount)+255*amount));
  return '#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('');
}
function activationColor(sides) {
  const p=sides?.includes('personality'),d=sides?.includes('design');
  return p&&d?PALETTE.both:p?PALETTE.personality:d?PALETTE.design:PALETTE.inactive;
}

function channelPaths(a,b,c) {
  const A=POINT[a], B=POINT[b];
  if(!c.length) {
    const M=[(A[0]+B[0])/2,(A[1]+B[1])/2];
    return ['M'+A.join(' ')+' L'+B.join(' '),'M'+A.join(' ')+' L'+M.join(' '),'M'+M.join(' ')+' L'+B.join(' ')];
  }
  const C=[c[0],c[1]],D=[c[2],c[3]];
  const mix=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
  const at=t=>mix(mix(mix(A,C,t),mix(C,D,t),t),mix(mix(C,D,t),mix(D,B,t),t),t);
  const points=Array.from({length:101},(_,i)=>at(i/100));
  const lengths=points.map((p,i)=>i?Math.hypot(p[0]-points[i-1][0],p[1]-points[i-1][1]):0);
  const half=lengths.reduce((x,y)=>x+y,0)/2;
  let distance=0,t=0.5;
  for(let i=1;i<lengths.length;i++){if(distance+lengths[i]>=half){t=(i-1+(half-distance)/lengths[i])/100;break;}distance+=lengths[i];}
  const E=mix(A,C,t),F=mix(C,D,t),H=mix(D,B,t),I=mix(E,F,t),J=mix(F,H,t),M=mix(I,J,t);
  const path=(p,q,r,s)=>'M'+p.join(' ')+' C'+[...q,...r,...s].join(' ');
  return [path(A,C,D,B),path(A,E,I,M),path(M,J,H,B)];
}

// Shared by the full chart and by a cropped single-channel/center excerpt,
// so every rendering of the graph — the main chart or a small page icon —
// draws centers, channels and gate labels the exact same way. Pass
// `onlyChannelGates` (a [gateA, gateB] pair) to isolate just that one
// channel — its own line and its own two gate numbers — with every other
// channel and gate omitted entirely, for a focused single-channel crop.
function chartElements(chart, structure, onlyChannelGates) {
  const active=Object.fromEntries(chart.activeGates.map(g=>[g.gate,g.sides]));
  // Reject a stale route table instead of silently displaying a wrong graph.
  const expected=new Set(structure.channels.map(c=>c.gates.slice().sort((a,b)=>a-b).join('-')));
  if(ROUTES.length!==expected.size || ROUTES.some(([a,b])=>!expected.has([a,b].sort((a,b)=>a-b).join('-')))) throw new Error('Bodygraph channel routes do not match structural data');
  const onlyKey = onlyChannelGates && onlyChannelGates.slice().sort((a,b)=>a-b).join('-');
  const gradients=Object.entries(CENTERS).map(([name,p])=>{
    const color=chart.centers[name]?p[5]:tint(p[5],0.2);
    return '<linearGradient id="bodygraph-v2-'+name+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+color+'"/><stop offset="1" stop-color="'+tint(color,0.12)+'"/></linearGradient>';
  }).join('');
  const channels=ROUTES.filter(([a,b])=>!onlyKey || [a,b].sort((a,b)=>a-b).join('-')===onlyKey).map(([a,b,c])=>{
    const [d,first,last]=channelPaths(a,b,c);
    const path=(d,color,width)=>'<path d="'+d+'" fill="none" stroke-linecap="butt" stroke="'+color+'" stroke-width="'+width+'"/>';
    return '<g data-channel="'+[a,b].sort((a,b)=>a-b).join('-')+'">'+path(d,'#f0ccbb',16)+path(d,PALETTE.inactive,13)+
      (active[a]?path(first,activationColor(active[a]),13):'')+
      (active[b]?path(last,activationColor(active[b]),13):'')+'</g>';
  }).join('');
  const centers=Object.entries(CENTERS).map(([name,p])=>'<path data-center="'+name+'" data-defined="'+Boolean(chart.centers[name])+'" d="'+centerPath(p)+'" fill="url(#bodygraph-v2-'+name+')" stroke="'+p[6]+'" stroke-width="2.5"/>').join('');
  const labels=Object.entries(GATES).map(([center,gates])=>{
    if(gates.some(([gate])=>!structure.centers[center].gates.includes(gate))) throw new Error('Incorrect bodygraph gate placement');
    return gates.filter(([g])=>!onlyChannelGates || onlyChannelGates.includes(g)).map(([g,x,y])=>{
      const color=activationColor(active[g]);
      // Only a gate that's actually on an active (personality/design)
      // channel keeps the white-on-color treatment; every other gate's
      // number is plain black, not white-on-pale, which was barely legible.
      const textColor=active[g]?'#fff':'#000';
      return '<circle data-gate="'+g+'" data-active="'+Boolean(active[g])+'" cx="'+x+'" cy="'+y+'" r="15" fill="'+color+'"/>'
        + '<text x="'+x+'" y="'+y+'" fill="'+textColor+'" font-size="20" font-weight="'+(active[g]?'600':'400')+'" text-anchor="middle" dominant-baseline="central">'+g+'</text>';
    }).join('');
  }).join('');
  return { gradients, channels, centers, labels };
}

export function buildBodygraph(chart, structure) {
  const { gradients, channels, centers, labels } = chartElements(chart, structure);
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="75 70 875 1400" width="517" height="827" role="img" aria-label="Human Design chart with flowing human silhouette and individually routed channels" style="font-family:Arial,sans-serif"><defs>'+gradients+'</defs><image href="'+figure+'" x="0" y="0" width="1024" height="1536"/>'+channels+centers+labels+'</svg>';
}

// A tight crop around one or two centers — same gradient-filled shapes,
// routed channel ribbons and white-on-color gate circles as the main
// chart, viewBox-cropped to just the relevant area. The background
// silhouette photo is deliberately left out here: it's a ~1.4MB asset, and
// inlining it again on every one of dozens of channel pages would bloat
// the PDF response by tens of megabytes for no visible benefit at this
// crop size.
export function buildBodygraphCrop(chart, structure, centerNames, channelGates, { maxWidth = 230, maxHeight = 260, pad = 55 } = {}) {
  const { gradients, channels, centers, labels } = chartElements(chart, structure, channelGates);
  const boxes = centerNames.map((name) => {
    const [x, y, w, h] = CENTERS[name];
    return [x - w / 2 - pad, y - h / 2 - pad, x + w / 2 + pad, y + h / 2 + pad];
  });
  const minX = Math.min(...boxes.map((b) => b[0]));
  const minY = Math.min(...boxes.map((b) => b[1]));
  const maxX = Math.max(...boxes.map((b) => b[2]));
  const maxY = Math.max(...boxes.map((b) => b[3]));
  const w = maxX - minX, h = maxY - minY;
  const scale = Math.min(maxWidth / w, maxHeight / h);
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+minX+' '+minY+' '+w+' '+h+'" width="'+Math.round(w*scale)+'" height="'+Math.round(h*scale)+'" style="font-family:Arial,sans-serif"><defs>'+gradients+'</defs>'+channels+centers+labels+'</svg>';
}

// A generic, unpersonalized orientation map of all 9 centers over the same
// silhouette — no chart data, no gates, no channel activations — used once
// as a "where things sit" page before the report walks through centers
// individually.
// No background photo here — this is a plain, transparent orientation
// graphic (it sits directly on the page's own sky-photo background), so
// each center shape gets a white outline instead of its own subtle tan
// one, which would otherwise disappear against a busy photo background.
export function buildBodygraphMap() {
  const gradients=Object.entries(CENTERS).map(([name,p])=>
    '<linearGradient id="bodygraph-map-'+name+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+p[5]+'"/><stop offset="1" stop-color="'+tint(p[5],0.12)+'"/></linearGradient>'
  ).join('');
  const channels=ROUTES.map(([a,b,c])=>{
    const [d]=channelPaths(a,b,c);
    return '<path d="'+d+'" fill="none" stroke-linecap="butt" stroke="'+PALETTE.inactive+'" stroke-width="13"/>';
  }).join('');
  const MAP_LABELS={Head:'Head',Ajna:'Ajna',Throat:'Throat',G:'Self / G',Heart:'Ego / Heart',Sacral:'Sacral',Spleen:'Spleen',SolarPlexus:'Solar Plexus',Root:'Root'};
  const centers=Object.entries(CENTERS).map(([name,p])=>{
    const [x,y]=[p[0],p[1]];
    const label=MAP_LABELS[name];
    return '<path d="'+centerPath(p)+'" fill="url(#bodygraph-map-'+name+')" stroke="#fff" stroke-width="3"/>'
      + '<text x="'+x+'" y="'+y+'" fill="#4a362f" font-size="22" font-weight="600" text-anchor="middle" dominant-baseline="central">'+label+'</text>';
  }).join('');
  // Cropped tight to just the centers/channels (no silhouette to size the
  // canvas around anymore), with modest padding on every side.
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="112 116 802 1345" width="340" height="570" role="img" aria-label="Map of the nine Human Design centers" style="font-family:Arial,sans-serif"><defs>'+gradients+'</defs>'+channels+centers+'</svg>';
}
