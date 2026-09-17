// Structural bodygraph data: the 9 centers, their gates, and the 36
// channels that connect them. Cross-validated: each center's gate count
// (Head 3, Ajna 6, Throat 11, G 8, Heart 4, Solar Plexus 7, Sacral 9,
// Spleen 7, Root 9) sums to 64, and matches the channel-derived membership.

export const CENTERS = {
  Head: { gates: [64, 61, 63], motor: false },
  Ajna: { gates: [47, 24, 4, 17, 43, 11], motor: false },
  Throat: { gates: [8, 31, 20, 33, 16, 62, 45, 23, 56, 35, 12], motor: false },
  G: { gates: [1, 2, 7, 10, 13, 15, 25, 46], motor: false },
  Heart: { gates: [21, 51, 26, 40], motor: true },
  SolarPlexus: { gates: [6, 22, 30, 36, 37, 49, 55], motor: true },
  Sacral: { gates: [5, 14, 29, 59, 9, 3, 42, 27, 34], motor: true },
  Spleen: { gates: [57, 48, 18, 44, 50, 28, 32], motor: true },
  Root: { gates: [60, 52, 58, 19, 39, 41, 38, 54, 53], motor: true },
};

export const MOTOR_CENTERS = Object.keys(CENTERS).filter(
  (c) => CENTERS[c].motor
);

export const GATE_TO_CENTER = Object.fromEntries(
  Object.entries(CENTERS).flatMap(([center, { gates }]) =>
    gates.map((g) => [g, center])
  )
);

// [gateA, gateB, name]
export const CHANNELS = [
  [1, 8, 'Inspiration'],
  [2, 14, 'The Beat'],
  [3, 60, 'Mutation'],
  [4, 63, 'Logic'],
  [5, 15, 'Rhythm'],
  [6, 59, 'Mating'],
  [7, 31, 'The Alpha'],
  [9, 52, 'Concentration'],
  [10, 20, 'Awakening'],
  [10, 34, 'Exploration'],
  [10, 57, 'Perfected Form'],
  [11, 56, 'Curiosity'],
  [12, 22, 'Openness'],
  [13, 33, 'The Prodigal'],
  [16, 48, 'The Wavelength'],
  [17, 62, 'Acceptance'],
  [18, 58, 'Judgment'],
  [19, 49, 'Synthesis'],
  [20, 34, 'Charisma'],
  [20, 57, 'The Brainwave'],
  [21, 45, 'Money'],
  [23, 43, 'Structuring'],
  [24, 61, 'Awareness'],
  [25, 51, 'Initiation'],
  [26, 44, 'Surrender'],
  [27, 50, 'Preservation'],
  [28, 38, 'Struggle'],
  [29, 46, 'Discovery'],
  [30, 41, 'Recognition'],
  [32, 54, 'Transformation'],
  [34, 57, 'Power'],
  [35, 36, 'Transitoriness'],
  [37, 40, 'Community'],
  [39, 55, 'Emoting'],
  [42, 53, 'Maturation'],
  [47, 64, 'Abstraction'],
].map(([a, b, name]) => ({
  gates: [a, b],
  centers: [GATE_TO_CENTER[a], GATE_TO_CENTER[b]],
  name,
}));
