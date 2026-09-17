import {
  julianDayFromUTCDate,
  bodyLongitudesAtJD,
  findDesignJD,
} from './ephemeris.js';
import { longitudeToGateLine } from './wheel.js';
import { CENTERS, CHANNELS, MOTOR_CENTERS, GATE_TO_CENTER } from './structure.js';

const BODY_ORDER = [
  'Sun',
  'Earth',
  'Moon',
  'NorthNode',
  'SouthNode',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
];

async function activationsForJD(jd, side) {
  const longitudes = await bodyLongitudesAtJD(jd);
  return BODY_ORDER.map((body) => {
    const lon = longitudes[body];
    const { gate, line } = longitudeToGateLine(lon);
    return { body, side, longitude: lon, gate, line };
  });
}

function connectedComponents(definedCenters, definedEdges) {
  const adjacency = new Map([...definedCenters].map((c) => [c, new Set()]));
  for (const [a, b] of definedEdges) {
    adjacency.get(a).add(b);
    adjacency.get(b).add(a);
  }
  const seen = new Set();
  const components = [];
  for (const center of definedCenters) {
    if (seen.has(center)) continue;
    const stack = [center];
    const component = new Set();
    while (stack.length) {
      const c = stack.pop();
      if (component.has(c)) continue;
      component.add(c);
      seen.add(c);
      for (const n of adjacency.get(c)) if (!component.has(n)) stack.push(n);
    }
    components.push(component);
  }
  return components;
}

function determineAuthority(definedCenters) {
  if (definedCenters.has('SolarPlexus')) return 'Emotional';
  if (definedCenters.has('Sacral')) return 'Sacral';
  if (definedCenters.has('Spleen')) return 'Splenic';
  if (definedCenters.has('Heart')) return 'Ego';
  if (definedCenters.has('G')) return 'Self-Projected';
  if (definedCenters.size === 0) return 'Lunar';
  return 'Mental (Environmental)';
}

function determineType(definedCenters, components) {
  if (definedCenters.size === 0) return 'Reflector';

  const sacralDefined = definedCenters.has('Sacral');
  const throatComponent = components.find((c) => c.has('Throat'));
  const motorToThroat = throatComponent
    ? MOTOR_CENTERS.some((m) => throatComponent.has(m))
    : false;

  if (sacralDefined && motorToThroat) return 'Manifesting Generator';
  if (sacralDefined) return 'Generator';
  if (motorToThroat) return 'Manifestor';
  return 'Projector';
}

const DEFINITION_NAMES = {
  0: 'No Definition',
  1: 'Single Definition',
  2: 'Split Definition',
  3: 'Triple Split Definition',
  4: 'Quadruple Split Definition',
};

/**
 * Compute a full Human Design chart from a birth moment expressed in UTC.
 * @param {Date} birthUTCDate - exact birth instant, already converted to UTC.
 */
export async function calculateChart(birthUTCDate) {
  const birthJD = await julianDayFromUTCDate(birthUTCDate);
  const designJD = await findDesignJD(birthJD, 88);

  const personality = await activationsForJD(birthJD, 'personality');
  const design = await activationsForJD(designJD, 'design');

  const allGates = new Set(
    [...personality, ...design].map((a) => a.gate)
  );

  const definedEdges = CHANNELS.filter(
    (ch) => allGates.has(ch.gates[0]) && allGates.has(ch.gates[1])
  ).map((ch) => ch.centers);

  const definedCenters = new Set(definedEdges.flat());
  const components = connectedComponents(definedCenters, definedEdges);

  const centerStates = Object.fromEntries(
    Object.keys(CENTERS).map((c) => [c, definedCenters.has(c)])
  );

  const definedChannels = CHANNELS.filter(
    (ch) => allGates.has(ch.gates[0]) && allGates.has(ch.gates[1])
  );

  const type = determineType(definedCenters, components);
  const authority = determineAuthority(definedCenters);

  const personalitySun = personality.find((a) => a.body === 'Sun');
  const personalityEarth = personality.find((a) => a.body === 'Earth');
  const designSun = design.find((a) => a.body === 'Sun');
  const designEarth = design.find((a) => a.body === 'Earth');

  const profile = `${personalitySun.line}/${designSun.line}`;

  // Gates with only one side active are "hanging gates" (open, seeking
  // their partner); gates active on both sides are fully "your own".
  const gateSides = new Map();
  for (const a of [...personality, ...design]) {
    if (!gateSides.has(a.gate)) gateSides.set(a.gate, new Set());
    gateSides.get(a.gate).add(a.side);
  }
  const activeGates = [...gateSides.entries()]
    .map(([gate, sides]) => ({
      gate,
      center: GATE_TO_CENTER[gate],
      sides: [...sides],
    }))
    .sort((a, b) => a.gate - b.gate);

  return {
    birth: { utc: birthUTCDate.toISOString(), julianDay: birthJD },
    design: { utc: jdToISO(designJD), julianDay: designJD },
    personality,
    designActivations: design,
    type,
    authority,
    profile,
    definition: DEFINITION_NAMES[Math.min(components.length, 4)],
    definitionSplitCount: components.length,
    centers: centerStates,
    definedChannels,
    activeGates,
    incarnationCross: {
      personalitySunGate: personalitySun.gate,
      personalityEarthGate: personalityEarth.gate,
      designSunGate: designSun.gate,
      designEarthGate: designEarth.gate,
    },
  };
}

function jdToISO(jd) {
  // JD 2440587.5 = 1970-01-01T00:00:00Z
  const ms = (jd - 2440587.5) * 86400000;
  return new Date(Math.round(ms)).toISOString();
}
