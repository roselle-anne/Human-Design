// Original narrative content for the report: type/strategy, authority,
// centers, profile lines, and short gate keynotes. Written independently
// for this tool — not a reproduction of any single author's proprietary
// text.

export const TYPES = {
  Generator: {
    population: '~37%',
    strategy: 'Respond',
    signature: 'Satisfaction',
    notSelf: 'Frustration',
    aura: 'Open, enveloping',
    summary:
      "Generators carry the life-force energy of the design and are built to do work that lights them up. Rather than initiating from the head, a Generator's sacral center responds — a gut-level yes or no — to what shows up in front of them. Following that response, moment to moment, leads toward satisfying work; overriding it and pushing forward on willpower alone breeds frustration.",
  },
  'Manifesting Generator': {
    population: '~33%',
    strategy: 'Respond, then inform',
    signature: 'Satisfaction',
    notSelf: 'Frustration',
    aura: 'Open, enveloping',
    summary:
      'Manifesting Generators are Generators with an additional direct channel from a motor to the throat, giving them a faster, multi-track way of moving through life. They still need to respond before acting, but once they respond they often move quickly, skip steps, and juggle several things at once. Informing the people affected before acting smooths the path, since their speed can otherwise catch others off guard.',
  },
  Manifestor: {
    population: '~9%',
    strategy: 'Inform before acting',
    signature: 'Peace',
    notSelf: 'Anger',
    aura: 'Closed, repelling',
    summary:
      'Manifestors are built to initiate — to start things that ripple out and involve other people, without waiting for an invitation. Their aura is naturally closed and can feel unpredictable to others, which is exactly why informing the people an action will affect, before taking it, is their strategy: it lowers resistance and clears the path for their impact to land as peace rather than conflict.',
  },
  Projector: {
    population: '~20%',
    strategy: 'Wait for the invitation',
    signature: 'Success',
    notSelf: 'Bitterness',
    aura: 'Focused, absorbing',
    summary:
      "Projectors are here to guide, direct, and see systems and people clearly — not to generate constant output. Their aura absorbs and focuses the energy of others rather than sustaining its own, so working like a Generator tends to exhaust them. Recognition and invitation — into conversation, work, or relationship — are what let a Projector's insight actually be heard, turning potential bitterness at being overlooked into real success.",
  },
  Reflector: {
    population: '~1%',
    strategy: 'Wait a full lunar cycle',
    signature: 'Surprise',
    notSelf: 'Disappointment',
    aura: 'Sampling, resistant',
    summary:
      'Reflectors have no centers consistently defined, so they sample and mirror the energy of whoever and wherever they are, making them uniquely sensitive barometers of the people and environments around them. Because their own sense of self shifts with the ~28-day lunar cycle, decisions deserve that much time to settle before acting, rather than being made in the moment.',
  },
};

export const AUTHORITIES = {
  Emotional: {
    title: 'Emotional — Solar Plexus Authority',
    description:
      "There is no 'now' truth for an Emotional authority — clarity arrives as a wave, over time. Big decisions made at an emotional peak or trough tend to be regretted; the reliable move is to sleep on it and let the wave settle before committing, so the decision reflects the whole cycle rather than one moment of it.",
  },
  Sacral: {
    title: 'Sacral Authority',
    description:
      "The sacral responds in the moment with a gut-level charge — expansive and energized, or flat and withdrawing. It doesn't reason or explain itself; it just knows, right now, in response to a direct question or situation. Trusting that immediate response, rather than the mind's commentary on it, is the whole practice.",
  },
  Splenic: {
    title: 'Splenic Authority',
    description:
      "Spleen-based knowing is quiet, instantaneous, and easy to miss — a single flash of intuitive certainty about health, safety, or timing, rather than a repeating gut punch. It doesn't repeat itself, so the discipline is noticing it the first time and acting, rather than waiting for confirmation that never comes.",
  },
  Ego: {
    title: 'Ego (Heart) Authority',
    description:
      "Decisions get tested against willpower and material resources: is this something worth the effort, the promise, the resource commitment, right now? Ego authority works best spoken aloud to another person — the words either carry conviction or visibly don't, and that's the tell.",
  },
  'Self-Projected': {
    title: 'Self-Projected (G Center) Authority',
    description:
      'Clarity comes through hearing your own voice — talking a decision out loud, ideally to a trusted listener, and noticing which direction the words flow toward with ease and which feel forced or hollow. The answer is already known internally; speaking is how it surfaces.',
  },
  'Mental (Environmental)': {
    title: 'Mental (Environmental) Authority',
    description:
      "With no defined inner authority to consult, thinking is naturally external — decisions clarify by talking them through in different environments and with different sounding-board people, rather than in a fixed place or with a fixed voice. The environment itself, and who's in it, meaningfully shapes what becomes clear.",
  },
  Lunar: {
    title: 'Lunar Authority (Reflectors)',
    description:
      'As a Reflector, no center is consistently defined, so there is no fixed decision-making organ to consult moment to moment. Instead, major decisions are given a full ~28-day lunar cycle to be discussed, revisited, and felt out across the different transits that move through the chart, before acting.',
  },
};

export const CENTERS_INFO = {
  Head: {
    label: 'Head',
    theme: 'Inspiration & mental pressure',
    defined:
      'A consistent, personal source of questions, curiosity, and inspiration — a mind that is naturally pressured to think about specific things and generally comfortable with that pressure.',
    undefined:
      'Open to and amplifying the questions and inspiration in the environment. Wisdom here comes from noticing which questions are actually your own versus which are being absorbed from others — there is no need to always have an answer.',
  },
  Ajna: {
    label: 'Ajna',
    theme: 'Conceptualizing & certainty of thought',
    defined:
      'A fixed way of processing and making sense of information, and a natural confidence in your own opinions and mental conclusions once formed.',
    undefined:
      'Flexible, open-minded processing that can see an issue from many angles and adopt other viewpoints with ease. The trap is feeling pressure to sound certain — real wisdom here is comfort with "I don\'t know."',
  },
  Throat: {
    label: 'Throat',
    theme: 'Communication & manifestation',
    defined:
      'A reliable, consistent way of expressing yourself and getting things done in the world — action and voice that others can count on showing up the same way.',
    undefined:
      "Communication style flexes with whoever's around, and there can be real pressure to speak or act just to be seen. The healthiest move is often to wait until something is truly worth saying, rather than talking to fill the silence.",
  },
  G: {
    label: 'G (Identity)',
    theme: 'Identity, direction & love',
    defined:
      'A stable, consistent sense of who you are and where you are headed in life, largely independent of circumstance.',
    undefined:
      'Identity and direction can shift with environment and relationships, which can look like a rich, adaptable sense of self or feel like drifting without a fixed answer to "who am I." The wisdom is trusting that the right direction shows up through the right people and places, rather than forcing a fixed identity.',
  },
  Heart: {
    label: 'Heart (Ego/Will)',
    theme: 'Willpower, ego & material value',
    defined:
      'Reliable willpower and a natural instinct for negotiating, competing, and following through on commitments — self-worth is not usually in question.',
    undefined:
      "No consistent point to prove. The trap is over-promising or over-competing to prove self-worth to yourself or others; the wisdom is knowing your value was never actually tied to output or winning.",
  },
  SolarPlexus: {
    label: 'Solar Plexus (Emotional)',
    theme: 'Emotions, feeling & spiritual awareness',
    defined:
      'A built-in emotional wave that colors experience over time and is the true source of clarity for decisions — nothing is true in a single moment.',
    undefined:
      "Emotions from others are absorbed and amplified without an internal wave of your own to buffer them, which can make other people's moods feel confusingly like your own. The wisdom is stepping back from emotional intensity — yours or others' — before responding.",
  },
  Sacral: {
    label: 'Sacral',
    theme: 'Life-force, work energy & response',
    defined:
      'A sustainable, renewable engine of life-force energy for work and doing — and, along with it, a gut response that knows what it does and doesn\'t have energy for.',
    undefined:
      "No fixed reservoir of life-force energy of your own, so it's borrowed and amplified from Sacral-defined people nearby. Knowing when to stop is the key lesson, since this center doesn't naturally signal its own limits.",
  },
  Spleen: {
    label: 'Spleen',
    theme: 'Instinct, intuition, health & fear',
    defined:
      'A quiet, steady stream of instinctive knowing about health, safety, and what belongs in your life — well-being is generally consistent.',
    undefined:
      "Sensitive to and amplifying the fears and health concerns of others and the environment, sometimes holding onto worries that were never really yours to carry. The wisdom is recognizing which fear is actually useful information versus inherited noise.",
  },
  Root: {
    label: 'Root',
    theme: 'Pressure, stress & drive',
    defined:
      'A consistent, manageable hum of pressure that drives action and adrenaline — generally at ease operating under a steady low level of stress.',
    undefined:
      "Amplifies the pressure and urgency in the environment, which can create a felt sense of stress or rush that isn't actually your own. The wisdom is knowing that not every deadline or pressure in the room needs to be carried personally.",
  },
};

export const PROFILE_LINES = {
  1: {
    keyword: 'Investigator',
    summary:
      'builds a foundation of security through research and going deep before acting or speaking with authority.',
  },
  2: {
    keyword: 'Hermit',
    summary:
      'has a natural gift that unfolds best in periods of solitude, and needs to be called out by others rather than pushed forward.',
  },
  3: {
    keyword: 'Martyr',
    summary:
      'learns what works through direct trial and error — bonds, methods, and relationships get tested and refined through lived experience.',
  },
  4: {
    keyword: 'Opportunist',
    summary:
      'builds a foundation through their existing network of friends and contacts, and influences the world through fixed, close relationships.',
  },
  5: {
    keyword: 'Heretic',
    summary:
      'gets projected onto by others as a practical problem-solver or savior, and carries the responsibility of living up to — or correcting — that projection.',
  },
  6: {
    keyword: 'Role Model',
    summary:
      'moves through three life phases — trial-and-error, a withdrawn observation phase, and finally a settled, exemplary role — becoming a model for others to observe from a distance.',
  },
};

function ordinal(n) {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return `${n}th`;
}

export function profileDescription(personalityLine, designLine) {
  const p = PROFILE_LINES[personalityLine];
  const d = PROFILE_LINES[designLine];
  return `As a ${personalityLine}/${designLine} profile, the conscious ${ordinal(personalityLine)}-line "${p.keyword}" nature — someone who ${p.summary} — combines with an unconscious ${ordinal(designLine)}-line "${d.keyword}" undertone — someone who ${d.summary}`;
}

// Short original keynotes for the 64 gates. Names reflect the commonly
// used, publicly documented gate themes (rooted in the classical I Ching
// hexagrams they derive from); descriptions are written independently.
export const GATES = {
  1: { name: 'Self-Expression', keynote: 'The drive to express a unique, creative individuality outward into the world.' },
  2: { name: 'The Direction of the Self', keynote: 'A receptive knowing of direction — sensing the path before the steps to it are visible.' },
  3: { name: 'Ordering', keynote: 'The energy to bring order out of initial chaos, mutating old forms into new ones.' },
  4: { name: 'Formulization', keynote: 'The mind\'s drive to formulate logical answers and solutions to life\'s questions.' },
  5: { name: 'Fixed Rhythms', keynote: 'Comfort in routine and steady, waiting patterns that create a natural rhythm for living.' },
  6: { name: 'Friction', keynote: 'The emotional gateway that determines intimacy — who and what is let close, and when.' },
  7: { name: 'The Role of the Self', keynote: 'A quiet capacity for leadership through role and example rather than force.' },
  8: { name: 'Contribution', keynote: 'The urge to contribute a unique individual expression that others can follow.' },
  9: { name: 'Focus', keynote: 'The capacity for sustained focus on small but essential details until they add up.' },
  10: { name: 'Behavior of the Self', keynote: 'Self-love expressed through behavior — living authentically according to one\'s own nature.' },
  11: { name: 'Ideas', keynote: 'A fountain of ideas and possibilities, gathered for reflection and, sometimes, for sharing.' },
  12: { name: 'Caution', keynote: 'Selective, emotionally-toned expression — knowing when the mood is right to speak.' },
  13: { name: 'The Listener', keynote: 'A gift for listening to others\' experiences and holding the secrets and stories entrusted.' },
  14: { name: 'Power Skills', keynote: 'Sacral-driven competence and resourcefulness in the service of a larger direction.' },
  15: { name: 'Extremes', keynote: 'An acceptance of the full range of human rhythms and behaviors, without judgment.' },
  16: { name: 'Skills', keynote: 'Enthusiasm and talent honed through repetition into genuine skill.' },
  17: { name: 'Opinions', keynote: 'A mind quick to form logical opinions and patterns from available information.' },
  18: { name: 'Correction', keynote: 'An instinct to spot what is flawed and correct it toward a better standard.' },
  19: { name: 'Approach', keynote: 'A sensitivity to what others need in order to belong and feel resourced.' },
  20: { name: 'The Now', keynote: 'Awareness and expression rooted entirely in the present moment.' },
  21: { name: 'Control', keynote: 'The will to take control of one\'s own domain and resources.' },
  22: { name: 'Openness', keynote: 'Emotionally graceful, socially attuned expression that opens others up.' },
  23: { name: 'Assimilation', keynote: 'Individual insight that needs the right timing and simplicity to be understood by others.' },
  24: { name: 'Rationalization', keynote: 'A returning, rationalizing mind that circles back to make sense of an idea until it clicks.' },
  25: { name: 'The Spirit of Self', keynote: 'An innocent, universal love that is unconditional and not aimed at any one target.' },
  26: { name: 'The Egoist', keynote: 'The persuasive drive to market, trade on, and prove the value of what has been done.' },
  27: { name: 'Caring', keynote: 'An instinct to nourish and care for others\' wellbeing and resources.' },
  28: { name: 'The Game Player', keynote: 'A search for meaning that comes from taking risks worth the struggle.' },
  29: { name: 'Perseverance', keynote: 'The sacral capacity to commit fully, once a genuine yes has been given.' },
  30: { name: 'Recognition of Feelings', keynote: 'Deep, restless desires and feelings seeking meaningful experience.' },
  31: { name: 'Influence', keynote: 'A voice built to lead when it has genuinely been elected to by others.' },
  32: { name: 'Continuity', keynote: 'An instinct to sense what will endure and what deserves to be preserved.' },
  33: { name: 'Retreat', keynote: 'The need for privacy and reflection in order to later share genuine experience.' },
  34: { name: 'Power', keynote: 'Raw sacral power and momentum, most effective when responding rather than initiating.' },
  35: { name: 'Progress', keynote: 'A hunger for new experience and forward movement through change.' },
  36: { name: 'Crisis', keynote: 'Emotional appetite for new, sometimes turbulent experience that leads to growth.' },
  37: { name: 'The Family', keynote: 'A drive toward warmth, loyalty, and reciprocal bonds that hold a community together.' },
  38: { name: 'The Fighter', keynote: 'The tenacity to struggle for what feels genuinely worth fighting for.' },
  39: { name: 'Provocation', keynote: 'An instinct to provoke, testing others\' spirit and readiness to engage.' },
  40: { name: 'Deliverance', keynote: 'Willpower earned through work, followed by a need for real rest and aloneness.' },
  41: { name: 'Contraction', keynote: 'The initial pressure of imagination and desire — the spark before a new cycle of experience.' },
  42: { name: 'Increase', keynote: 'The energy that completes and closes out a cycle, growing it toward maturity.' },
  43: { name: 'Insight', keynote: 'Sudden, individual insight that arrives fully formed but is hard to explain until others catch up.' },
  44: { name: 'Alertness', keynote: 'An instinctive alertness to patterns from the past worth continuing or avoiding.' },
  45: { name: 'The Gatherer', keynote: 'A natural authority over resources and the gathering of a community around them.' },
  46: { name: 'Determination', keynote: 'A love of being in the body and in the right place at the right time.' },
  47: { name: 'Realization', keynote: 'A mind that gathers and eventually makes sense of dense, seemingly unrelated information.' },
  48: { name: 'Depth', keynote: 'A deep well of natural talent and wisdom, together with the fear of not being adequate.' },
  49: { name: 'Principles', keynote: 'A strong emotional sense of the principles that hold relationships and groups together — or break them.' },
  50: { name: 'Values', keynote: 'An instinct for the values and laws that keep a group healthy and responsible.' },
  51: { name: 'Shock', keynote: 'A need for jolts and competition that push toward genuine individual initiative.' },
  52: { name: 'Stillness', keynote: 'The capacity for deep stillness and concentration that precedes focused action.' },
  53: { name: 'Beginnings', keynote: 'An urge to start new cycles and ventures, needing follow-through from others to complete them.' },
  54: { name: 'Ambition', keynote: 'A drive to rise, transform circumstances, and improve one\'s material and spiritual standing.' },
  55: { name: 'Abundance', keynote: 'An emotional spirit whose sense of abundance rises and falls with mood rather than circumstance.' },
  56: { name: 'Stimulation', keynote: 'A storyteller\'s gift for stimulating others through narrative and experience.' },
  57: { name: 'Intuitive Clarity', keynote: 'Instantaneous, in-the-moment intuitive clarity, heard through a finely tuned awareness.' },
  58: { name: 'Vitality', keynote: 'A joyful, critical vitality that pushes continual correction and improvement.' },
  59: { name: 'Intimacy', keynote: 'A sacral drive to break down barriers between people in the service of bonding and intimacy.' },
  60: { name: 'Limitation', keynote: 'The acceptance of limitation as the very condition that allows mutation and innovation.' },
  61: { name: 'Inner Truth', keynote: 'A restless inner knowing, seeking to understand the unexplainable mysteries of life.' },
  62: { name: 'Details', keynote: 'A talent for organizing facts and details into precise, expressible form.' },
  63: { name: 'Doubt', keynote: 'A questioning mind that doubts patterns until they are logically proven.' },
  64: { name: 'Confusion', keynote: 'A mind full of unprocessed impressions, seeking the patterns that will make sense of the past.' },
};

// Short original themes for the 36 channels, keyed "gateA-gateB" matching
// the gate order in structure.js's CHANNELS list.
export const CHANNEL_THEMES = {
  '1-8': 'A creative individual voice that inspires others by example, not persuasion.',
  '2-14': 'Direction meets resourcefulness — a keen sense of where to go paired with the drive to get there.',
  '3-60': 'Innovation born from working within real limits, turning constraint into something new.',
  '4-63': 'A logical mind that questions patterns until it can answer them with confidence.',
  '5-15': 'A natural, unforced rhythm that makes room for every kind of pace and season.',
  '6-59': 'The push and pull of intimacy — friction that clears the way for real bonding.',
  '7-31': 'Quiet leadership that steps forward only once it has genuinely been chosen.',
  '9-52': 'Focused stillness — the concentration to stay with small details until they matter.',
  '10-20': 'Awareness lived out loud, in the present moment, without apology.',
  '10-34': 'Personal integrity backed by unmistakable power and momentum.',
  '10-57': 'Survival instinct refined into perfected, authentic form.',
  '11-56': 'Ideas turned into stories — curiosity shared through narrative.',
  '12-22': 'Emotional openness expressed with grace, at exactly the right moment.',
  '13-33': 'Personal experience held in confidence, then released as insight worth sharing.',
  '16-48': 'Enthusiasm paired with depth — talent practiced until it becomes real skill.',
  '17-62': 'Opinions organized into precise, well-supported detail.',
  '18-58': 'A drive to correct what is flawed, fueled by real joy in the process.',
  '19-49': 'Sensitivity to what others need, tested against principle before it is given.',
  '20-34': 'Instinctive charisma — power that speaks for itself in the moment.',
  '20-57': 'Awareness so immediate it borders on premonition.',
  '21-45': 'Material control paired with the authority to gather and direct resources.',
  '23-43': 'A flash of individual insight, translated into language others can finally follow.',
  '24-61': 'A mind that circles a mystery until rational thought can finally land on it.',
  '25-51': 'Unconditional love tested by the shocks that initiate real growth.',
  '26-44': 'Trust in what has already worked, marketed with quiet persuasion.',
  '27-50': 'Care for others held accountable to the values that keep a group well.',
  '28-38': 'A struggle worth having — purpose found through resistance, not around it.',
  '29-46': 'Commitment to the experience of being in the body, wherever it leads.',
  '30-41': 'Desire for new experience recognized and given form.',
  '32-54': 'Ambition that senses what will last, and transforms to reach it.',
  '34-57': 'Raw power guided by instinctive, in-the-moment clarity.',
  '35-36': 'An appetite for new experience, even the turbulent kind, in service of change.',
  '37-40': 'Loyalty and belonging earned through real, reciprocal work.',
  '39-55': 'Emotional provocation that tests spirit and awakens genuine feeling.',
  '42-53': 'Cycles that start, grow, and complete themselves in due time.',
  '47-64': 'Confusion worked through until it resolves into sudden understanding.',
};

// Short original blurbs for the 5 definition types.
export const DEFINITION_INFO = {
  'No Definition': {
    summary:
      'With no centers consistently defined, energy and identity move with whoever and wherever you are, rather than from a fixed internal pattern. This is the Reflector signature — a life built around sampling and reflecting the world, on the timing of the lunar cycle rather than any inner constant.',
  },
  'Single Definition': {
    summary:
      'All of your defined centers connect into one continuous circuit. There is a consistent, self-contained way you operate — what you feel and know internally is reliably available to you without needing another person present to complete it.',
  },
  'Split Definition': {
    summary:
      'Your defined centers form two separate circuits that are not directly connected to each other. There can be a felt sense of something missing or a bridge to find — often satisfied by certain other people whose own design happens to connect the gap, which is part of why some relationships feel unusually easy.',
  },
  'Triple Split Definition': {
    summary:
      'Your defined centers form three separate circuits. More connecting points are open, which can mean more variability in who and what completes you, and a wider range of people who can bridge the gaps between your circuits.',
  },
  'Quadruple Split Definition': {
    summary:
      'Your defined centers form four separate circuits — the most distributed definition pattern. This tends to come with a wide range of interests and capabilities, along with a real need for a diverse circle of people to bridge the several gaps in the design.',
  },
};
