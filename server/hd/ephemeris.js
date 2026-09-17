import { createSwissEph, Body } from '@kuntay/swisseph';

let swePromise = null;
function getSwe() {
  if (!swePromise) swePromise = createSwissEph();
  return swePromise;
}

// The 13 bodies Human Design activates directly from the ephemeris.
// Earth and South Node are derived (opposite Sun / opposite North Node).
const DIRECT_BODIES = [
  ['Sun', Body.Sun],
  ['Moon', Body.Moon],
  ['Mercury', Body.Mercury],
  ['Venus', Body.Venus],
  ['Mars', Body.Mars],
  ['Jupiter', Body.Jupiter],
  ['Saturn', Body.Saturn],
  ['Uranus', Body.Uranus],
  ['Neptune', Body.Neptune],
  ['Pluto', Body.Pluto],
  ['NorthNode', Body.TrueNode],
];

function normalize(deg) {
  const d = deg % 360;
  return d < 0 ? d + 360 : d;
}

/** Julian Day (UT) from a UTC Date object. */
export async function julianDayFromUTCDate(date) {
  const swe = await getSwe();
  const hourUT =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600;
  return swe.julianDay(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    hourUT
  );
}

/** Ecliptic longitudes (deg) of all 13 HD bodies at a given Julian Day (UT). */
export async function bodyLongitudesAtJD(jd) {
  const swe = await getSwe();
  const longitudes = {};
  for (const [name, id] of DIRECT_BODIES) {
    longitudes[name] = normalize(swe.calcWithSign(jd, id).longitude);
  }
  longitudes.Earth = normalize(longitudes.Sun + 180);
  longitudes.SouthNode = normalize(longitudes.NorthNode + 180);
  return longitudes;
}

/** Sun's ecliptic longitude (deg) at a given Julian Day (UT). */
export async function sunLongitudeAtJD(jd) {
  const swe = await getSwe();
  return normalize(swe.calcWithSign(jd, Body.Sun).longitude);
}

function angleDelta(target, current) {
  // Smallest signed difference target - current, in (-180, 180].
  let d = (target - current) % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return d;
}

/**
 * Solve for the Julian Day at which the Sun's ecliptic longitude was
 * exactly `arcDegrees` earlier than at `birthJD` — the "Design" moment
 * in Human Design (traditionally 88 degrees of solar arc before birth).
 * Uses Newton-style iteration against the Sun's actual (non-uniform)
 * daily motion, converging to sub-second precision in a few steps.
 */
export async function findDesignJD(birthJD, arcDegrees = 88) {
  const birthSunLon = await sunLongitudeAtJD(birthJD);
  const targetLon = normalize(birthSunLon - arcDegrees);

  const AVG_DAILY_MOTION = 0.9856; // deg/day, first guess only
  let jd = birthJD - arcDegrees / AVG_DAILY_MOTION;

  for (let i = 0; i < 12; i++) {
    const lon = await sunLongitudeAtJD(jd);
    const diff = angleDelta(targetLon, lon); // degrees to move forward
    if (Math.abs(diff) < 1e-7) break;
    jd += diff / AVG_DAILY_MOTION;
  }
  return jd;
}
