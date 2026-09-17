// The Human Design "mandala": 64 gates of 5.625 degrees each (360 / 64),
// each split into 6 lines of 0.9375 degrees, wrapped around the tropical
// zodiac. Gate 25 line 1 begins at 358.25 degrees (28 15' Pisces / -1 45'
// Aries). Verified against multiple independent published gate/degree
// tables (e.g. Gate 41 begins at exactly 302.000 degrees = 2 00' Aquarius).
export const WHEEL_START = 358.25;
export const GATE_SIZE = 360 / 64; // 5.625
export const LINE_SIZE = GATE_SIZE / 6; // 0.9375

export const GATE_ORDER = [
  25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53,
  62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44,
  1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30, 55,
  37, 63, 22, 36,
];

/**
 * Convert a tropical ecliptic longitude (0-360) to a { gate, line } position
 * on the Human Design wheel.
 */
export function longitudeToGateLine(longitudeDeg) {
  let lon = longitudeDeg % 360;
  if (lon < 0) lon += 360;

  let offset = lon - WHEEL_START;
  if (offset < 0) offset += 360;

  const gateIndex = Math.floor(offset / GATE_SIZE);
  const withinGate = offset - gateIndex * GATE_SIZE;
  const line = Math.floor(withinGate / LINE_SIZE) + 1;

  return { gate: GATE_ORDER[gateIndex % 64], line: Math.min(line, 6) };
}
