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

// Deep-dive content for each center's defined/undefined state: original
// Challenges/Potentials/Affirmations, written independently for this tool.
export const CENTER_DEEP_DIVE = {
  Head: {
    defined: {
      challenges:
        'Can fixate on the same handful of questions or worries on repeat, sometimes pressuring yourself — or the people around you — to have answers before they\'re actually ready.',
      potentials:
        'A steady, reliable source of inspiration and mental drive that others can lean on, and a genuine ability to hold a question open until real clarity arrives.',
      affirmations: [
        "My mind's pressure is fuel, not an emergency.",
        "I don't owe anyone an instant answer.",
        'My curiosity is a gift I can trust.',
      ],
    },
    undefined: {
      challenges:
        "Can pick up and run with questions, worries, or \"shoulds\" that were never actually yours, mistaking someone else's mental pressure for your own.",
      potentials:
        "A flexible, amplifying mind that can hold many people's inspiration and curiosity at once, and knows how to set down a question that isn't its own.",
      affirmations: [
        'Not every question in the room is mine to answer.',
        'I can enjoy inspiration without needing to hold onto it.',
        "My peace of mind doesn't depend on having it all figured out.",
      ],
    },
  },
  Ajna: {
    defined: {
      challenges:
        'Can get attached to its own conclusions and struggle to update them, even once new information arrives.',
      potentials:
        'A dependable, confident way of processing information that others can trust as a fixed, reliable point of view.',
      affirmations: [
        'My opinions are useful, not unchangeable.',
        'I can hold my perspective and still stay curious.',
        'Certainty is one of my gifts, not a cage.',
      ],
    },
    undefined: {
      challenges:
        'Can feel pressure to sound certain or "figured out" in order to be taken seriously, even when genuinely unsure.',
      potentials:
        'A naturally open, multi-perspective mind that can see an issue from many angles and adapt its thinking with real ease.',
      affirmations: [
        '"I don\'t know" is a complete and honest answer.',
        'My flexibility of mind is a strength.',
        "I don't need certainty to be credible.",
      ],
    },
  },
  Throat: {
    defined: {
      challenges:
        'Can talk or act just to fill space, or feel pressure to always be the one who speaks or does.',
      potentials:
        'A consistent, recognizable voice and way of getting things done that people can genuinely count on.',
      affirmations: [
        "I don't have to fill every silence.",
        'My way of expressing myself is reliable and enough.',
        'I can act from readiness, not obligation.',
      ],
    },
    undefined: {
      challenges:
        "Can feel a persistent pull to speak or perform in order to be seen, adapting expression to whoever's around.",
      potentials:
        'A genuinely versatile communicator who can meet many different people and contexts, and who knows the power of well-timed words.',
      affirmations: [
        "I don't need to be seen to be worthy.",
        'The right moment to speak will come.',
        'My silence is not disappearing.',
      ],
    },
  },
  G: {
    defined: {
      challenges:
        'Can feel resistant to change, even change that would genuinely serve growth, because identity feels fixed.',
      potentials:
        "A stable, unwavering sense of self and direction that holds steady no matter who's around or what's happening.",
      affirmations: [
        'I know who I am, independent of circumstance.',
        'My direction is mine to trust.',
        'Stability is one of my quiet strengths.',
      ],
    },
    undefined: {
      challenges:
        'Can feel lost, rootless, or unsure "who am I really" when moving between different people and environments.',
      potentials:
        'A rich, adaptable sense of identity that can take on real depth and range across relationships and settings.',
      affirmations: [
        'The right people and places reveal my direction.',
        "I don't need a fixed identity to know my worth.",
        'My adaptability is not the same as being lost.',
      ],
    },
  },
  Heart: {
    defined: {
      challenges:
        'Can over-compete or over-promise, trying to prove worth through output, willpower, or winning.',
      potentials:
        'Genuinely reliable willpower and a natural skill for negotiating, providing, and following through on commitments.',
      affirmations: [
        'My worth was never up for negotiation.',
        'I keep my word because I choose to, not to prove myself.',
        "Rest doesn't cancel my value.",
      ],
    },
    undefined: {
      challenges:
        'Can feel a need to prove self-worth through achievement, competition, or promises made under pressure.',
      potentials:
        'Freedom from needing to constantly perform value — the quiet knowing that worth was never tied to winning.',
      affirmations: [
        "I don't have to earn my worth.",
        "I can say no to a promise that isn't mine to make.",
        "My value isn't measured in output.",
      ],
    },
  },
  SolarPlexus: {
    defined: {
      challenges:
        'Can act or decide at an emotional peak or trough, and regret it once the wave has passed.',
      potentials:
        'A built-in emotional depth and honesty that, given time, produces real clarity nothing else can offer.',
      affirmations: [
        'Nothing is true in this exact moment of feeling.',
        'Clarity is worth waiting for.',
        'My emotions are information, not instructions.',
      ],
    },
    undefined: {
      challenges:
        "Can absorb and get swept up in other people's moods and emotional intensity as if they were its own.",
      potentials:
        "A finely tuned emotional awareness of others, and the ability to step back from intensity that isn't personally its own.",
      affirmations: [
        'Not every feeling in the room belongs to me.',
        'I can care about someone\'s emotion without absorbing it.',
        'My own calm is available to me.',
      ],
    },
  },
  Sacral: {
    defined: {
      challenges:
        "Can push past its own limits, since the engine rarely announces when it's had enough.",
      potentials:
        'A genuinely sustainable, renewable source of life-force energy for work that lights it up.',
      affirmations: [
        'My energy for this is real, and so is my limit.',
        'Stopping when I\'m done is not failure.',
        'My gut response is trustworthy.',
      ],
    },
    undefined: {
      challenges:
        "Can borrow and run on other people's energy without a built-in signal for when to stop.",
      potentials:
        "An amplifying presence that reflects and energizes the work and life-force of the Sacral-defined people around it.",
      affirmations: [
        'Knowing when to stop is wisdom, not weakness.',
        "I don't have to keep pace with everyone else's energy.",
        'Rest is always mine to take.',
      ],
    },
  },
  Spleen: {
    defined: {
      challenges:
        "Can dismiss its own instinctive knowing, because it arrives quietly, without drama or repetition.",
      potentials:
        'A steady, reliable stream of in-the-moment instinct about health, safety, and what truly belongs.',
      affirmations: [
        "My instinct doesn't need to repeat itself to be true.",
        'I trust the quiet knowing.',
        'My well-being is generally sound.',
      ],
    },
    undefined: {
      challenges:
        'Can hold onto fears, health worries, or warnings that were never really its own to carry.',
      potentials:
        'A sensitivity that can pick up real, useful signals from others and the environment once it learns to sort the noise.',
      affirmations: [
        'Not every fear I feel is mine to keep.',
        "I can let go of a worry that isn't really mine.",
        "My safety doesn't depend on constant vigilance.",
      ],
    },
  },
  Root: {
    defined: {
      challenges:
        "Can mistake its own steady hum of pressure for urgency that needs to be acted on immediately.",
      potentials:
        'A consistent, manageable drive that fuels action without needing outside pressure to get moving.',
      affirmations: [
        'Pressure is fuel, not an emergency.',
        'I move at a pace I can sustain.',
        'My drive is steady and mine to trust.',
      ],
    },
    undefined: {
      challenges:
        "Can feel rushed, stressed, or under deadline pressure that actually belongs to the environment, not to it.",
      potentials:
        'A sensitivity to timing and urgency that, once sorted from noise, can be a genuinely useful read on when to act.',
      affirmations: [
        'Not every deadline in the room is mine to carry.',
        'I can release pressure that was never really mine.',
        "I'm allowed to move at my own pace.",
      ],
    },
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

// Paragraph-length deep dives for each of the 64 gates, expanding on the
// one-line keynotes above. Original writing for this tool.
export const GATE_DEEP_DIVE = {
  1: "Gate 1 carries a need for genuine self-expression — not performance for approval, but putting something real and personally authored into the world. When this gate is active, creative output, in whatever form that takes, isn't optional self-indulgence; it's how identity actually gets metabolized and shared. Left unexpressed, it can curdle into a quiet frustration of feeling unseen; expressed, it becomes a magnetic, original signature that others recognize as unmistakably yours.",
  2: "This gate doesn't need to see the whole road to know it's headed the right way; it has a quiet, receptive certainty about direction that arrives before logic can explain it. That knowing works best when it isn't second-guessed into a five-year plan — direction here reveals itself one step at a time, trusted rather than mapped out in advance.",
  3: "Gate 3 thrives at the messy start of something new, where nothing is settled yet and old structures no longer fit. It's genuinely good at innovating through that chaos rather than avoiding it, though it benefits from patience — real order takes several attempts to find, and the first form rarely survives contact with reality.",
  4: "This is a mind that wants an answer, and trusts logic to eventually produce one, even when the question is genuinely unanswerable in the moment. Its gift is confident, structured problem-solving; its trap is treating \"I don't know yet\" as a personal failure instead of an honest, temporary state.",
  5: "Gate 5 finds real strength in rhythm — consistent sleep, consistent pacing, a predictable cadence to the day — and tends to feel destabilized when that rhythm is interrupted by other people's urgency. Waiting, for this gate, isn't passive; it's an active, disciplined patience that trusts the right timing will arrive.",
  6: "This gate governs the emotional gate-keeping of closeness: when to open up, when to hold back, when friction is actually the necessary clearing-of-the-air before real intimacy can happen. It isn't about avoiding conflict, but about sensing the right moment for it — timing that, when honored, deepens connection rather than damaging it.",
  7: "Gate 7 leads by the quality of its example and the role it steps into, not by asserting authority. Its influence is real but understated — a steadying presence that shapes direction for others without needing to be loudly in charge of it.",
  8: "This gate wants its individual way of doing things to matter to the group — to be a genuine contribution, not a copy of what's already been done. It's most alive when its particular style of expression gives other people something real to follow or build on.",
  9: "Gate 9 has the patience to stay with the small, unglamorous details that most people skip past, and the discipline to keep at them until they resolve into something larger. Its power is in the follow-through others often lack.",
  10: "This gate treats authentic behavior as an act of self-respect: living according to your own nature, even when it doesn't match what's expected. Its deepest lesson is that self-love isn't a feeling to wait for — it's a way of behaving, moment to moment.",
  11: "Gate 11 generates ideas prolifically, more as material for reflection than as a queue of things that must be acted on. Not every idea needs a follow-through; some are simply meant to be thought, felt, and let go.",
  12: "This gate is discerning about when to speak, waiting for the right emotional mood rather than forcing words out on schedule. What looks like hesitation from the outside is often exactly the caution that keeps its expression meaningful when it finally arrives.",
  13: "People confide in Gate 13 — it has a genuine gift for listening without judgment and holding what's shared with real discretion. Over time, that gathered store of human experience often becomes wisdom worth passing on, once the right moment and audience arrive.",
  14: "This gate brings real, sacral-fueled competence and resourcefulness to whatever it's aimed at, generating the material means to support a larger sense of direction. Its skill is genuine, but works best in service of something bigger than skill for its own sake.",
  15: "Gate 15 has room for the full range of human extremes — different rhythms, different paces, different ways of living — without needing to judge which is right. That breadth of acceptance is a genuine gift, though it can look inconsistent to people expecting one fixed way of doing things.",
  16: "Enthusiasm alone isn't enough for this gate — it wants to practice a talent repeatedly until it becomes real, demonstrable skill. That combination of passion and repetition is what turns natural aptitude into something masterful.",
  17: "This gate forms opinions quickly, spotting logical patterns in available information almost automatically. Those opinions are genuinely useful when offered as one perspective among others, not necessarily when treated as final verdicts.",
  18: "Gate 18 has a sharp eye for what's flawed or not working, and a real drive to correct it toward something better. Used well, this is invaluable quality-control; used carelessly, it can tip into criticism that lands harder than intended.",
  19: "This gate is attuned to what people need in order to feel like they belong and have enough — practically and emotionally. Its gift is genuine attentiveness to others' basic needs, best offered without over-extending its own.",
  20: "Gate 20 lives and speaks from exactly what's happening right now, without needing to reference the past or plan for the future to make sense of the moment. Its clarity is immediate — sometimes uncomfortably so for anyone still processing what already happened.",
  21: "This gate wants a firm, capable hand on its own domain — its resources, its territory, its decisions. That will to control is healthy when it stays within what's actually its to manage, and strained when it reaches for control over things, or people, beyond that.",
  22: "Gate 22 has real social grace — an emotional attunement that can open a room and make people feel comfortable being open in return. That grace moves in cycles though, and isn't always available on demand; forcing it when the mood isn't right tends to fall flat.",
  23: "This gate often arrives at genuinely individual insight, but that insight only lands if it's translated simply and offered at the right moment — otherwise it reads as strange or gets dismissed. Patience with the translation is what makes the insight usable to anyone else.",
  24: "Gate 24 doesn't let an idea go until it's been turned over enough times to finally make rational sense. That circling can look repetitive from outside, but it's the actual mechanism by which this mind reaches real, settled understanding.",
  25: "This gate carries a kind of universal, unconditional love that isn't really about any one person or thing — closer to a spiritual orientation than a personal attachment. It's most itself when that love is allowed to be broad rather than narrowed into obligation.",
  26: "Gate 26 is a natural at persuading others of the value of what's already been accomplished — marketing, negotiating, making the case. Its edge is in confident salesmanship; its shadow is overselling or reshaping the story past what actually happened.",
  27: "This gate's instinct is to care for and nourish the people, and resources, around it, often before its own needs. That caring is a genuine strength as long as it includes caring for itself too, rather than running on empty in service of everyone else.",
  28: "Gate 28 finds meaning through risk — not risk for its own sake, but the kind worth struggling for because the stakes actually matter. A life with nothing worth risking tends to feel meaningless to this gate, regardless of how safe or comfortable it looks.",
  29: "Once this gate says yes, it commits completely — perseverance is its real strength. The catch is upstream: without a genuine sacral yes to begin with, that same persistence gets poured into commitments that were never actually right, at real cost.",
  30: "Gate 30 feels desire deeply and restlessly, always reaching toward the next meaningful experience. That intensity is fuel for a rich, felt life, but benefits from the Solar Plexus wave's patience — desire in the moment isn't always desire that holds up over time.",
  31: "This gate has real leadership presence, but its influence only lands cleanly when it's actually been recognized and elected by others — not simply claimed. Waiting for that genuine mandate, rather than assuming it, is what makes the leadership land as welcome rather than imposed.",
  32: "Gate 32 has an instinctive read on what will actually last — which ventures, relationships, or traditions are worth preserving versus letting go. That foresight can also tip into a fear of failure or change if it isn't given room to trust its own read.",
  33: "This gate needs real, unhurried privacy to process experience before it's ready to be shared — retreat isn't avoidance, it's preparation. What eventually gets shared, once that reflection has happened, tends to carry real, earned depth.",
  34: "Gate 34 carries enormous raw power and momentum, but that power is meant to be a response to what's already in motion, not a launch point of its own. Used as a response, it's an unstoppable force; used to initiate, it tends to overpower situations that weren't ready for it.",
  35: "This gate is hungry for new experience and restless with anything that's gone stale, always pulled toward the next stage of progress. Its challenge is staying present long enough to actually integrate one experience before chasing the next.",
  36: "Gate 36 has real appetite for new, even turbulent, experience — the kind that comes with emotional weather attached. Those crises aren't a design flaw; they're often exactly how this gate grows, once the emotional wave is allowed to move through rather than being rushed.",
  37: "This gate's currency is loyalty and warmth — the reciprocal give-and-take that holds a family or community together over time. Its gift is genuine belonging; its risk is transactional resentment when the give-and-take feels one-sided.",
  38: "Gate 38 has real tenacity, and it activates fully once there's something genuinely worth the fight — a value, a person, a principle. Without a worthy cause, that same fighting energy can turn into stubbornness over things that don't actually matter.",
  39: "This gate provokes — sometimes lightly, sometimes sharply — as a way of testing whether someone's spirit is really available and ready to engage. It's not provocation for cruelty's sake; it's a probe for genuine connection, even if it can land as irritating in the moment.",
  40: "Gate 40 works hard and delivers on its commitments, but that willpower depletes and genuinely needs real aloneness to recover, not performative rest, actual solitude. Skipping that recovery tends to show up later as resentment toward the very commitments it chose.",
  41: "This gate is the first pressure of a new cycle — imagination and desire compressing into a spark before anything has actually happened yet. That pressure can feel like restlessness or vague longing until it finds a real experience to move toward.",
  42: "Gate 42 is built to see a cycle through to its natural completion, growing whatever's been started toward full maturity. Its discomfort is with things left unfinished — closure matters here more than most.",
  43: "This gate's insight arrives suddenly and completely formed, often without a clear step-by-step explanation for how it got there. That can be genuinely disorienting for others until they catch up — patience with the gap is part of using this gift well.",
  44: "Gate 44 has a near-instant instinctive read on whether a pattern, a person, a situation, a way of doing things, is worth continuing or should be avoided, based on what's worked or failed before. That alertness is most useful when it's checked against present reality, not just old history.",
  45: "This gate has a natural authority when it comes to resources and gathering people around a shared table, literally or figuratively. Used generously, it builds real community; used possessively, it can tip into hoarding what should be shared.",
  46: "Gate 46 has a genuine love of embodiment — being physically present, in the right place, at the right time, often through what looks like good luck but is really a body-led sense of timing. Trusting that physical instinct tends to put it exactly where it needs to be.",
  47: "This gate gathers dense, seemingly unrelated information and mental impressions, trusting that they'll eventually resolve into real understanding. The realization can't be rushed — it needs the backlog of gathered material before the pattern actually becomes clear.",
  48: "Gate 48 holds a genuinely deep well of talent and wisdom, but often doubts whether that depth is actually adequate for what's being asked of it. The fear rarely matches reality — the depth is usually already there, waiting to be trusted.",
  49: "This gate feels strongly about the principles that hold a relationship or group together, and is quick to sense when those principles have been violated. That clarity can support real reform, or tip into rejecting a bond too quickly if the emotional wave hasn't been given time to settle.",
  50: "Gate 50 instinctively senses the values and unwritten rules that keep a group functioning responsibly, and often ends up in the role of upholding them. That sense of responsibility is a real strength, best balanced with compassion for people still learning the values it already holds clearly.",
  51: "This gate is stirred by shocks and competition — jolts that push it out of complacency and into genuine, individual initiative. What looks like chaos-seeking is often this gate's way of finding out what it's actually capable of.",
  52: "Gate 52 can drop into real stillness and concentration, and that quiet isn't idleness — it's the necessary precursor to genuinely focused action. Rushing past the stillness tends to produce scattered effort instead of the depth this gate is actually capable of.",
  53: "This gate is genuinely gifted at starting new cycles and ventures, though it isn't always built to see them through to the end — that part often needs a partner. Recognizing that starting is its real strength, rather than a personal failure to finish, frees it to keep starting well.",
  54: "Gate 54 has real, driving ambition to rise and improve its circumstances, materially and spiritually both. That drive works best when it's transparent about what it's climbing toward, rather than pursued through backdoor maneuvering.",
  55: "This gate's felt sense of abundance moves with its emotional wave, not with actual circumstance — plenty can feel like scarcity on a low day, and vice versa. Recognizing that the feeling is a mood, not a fact, is what keeps this gate from making decisions based on a temporary low.",
  56: "Gate 56 has a natural storyteller's gift, stimulating others through narrative, travel, and shared experience. Its restlessness for new material to tell is part of what makes the stories worth listening to.",
  57: "This gate's clarity arrives instantly, in the moment, through a finely tuned awareness that doesn't need to reason its way there. It rarely repeats itself, so trusting the first, quiet hit of clarity, rather than waiting for confirmation, is the real skill.",
  58: "Gate 58 has a genuinely joyful vitality that fuels ongoing correction and improvement — it doesn't see \"good enough\" as the end point. That same critical eye needs to include real joy in the process, or the drive to improve can curdle into perpetual dissatisfaction.",
  59: "This gate's sacral energy is aimed at breaking down the barriers between people, in service of real bonding and intimacy. That drive is at its healthiest in relationships that actually want the closeness being offered, rather than pursued indiscriminately.",
  60: "Gate 60 understands that limitation isn't the enemy of innovation — it's the actual condition that makes real mutation possible, the way a scale gives music its structure. Working within real limits, rather than resenting them, is where this gate's creativity actually gets sharpened.",
  61: "This gate carries a restless inner certainty that there's something worth understanding beneath the surface of things, even when it can't yet be explained. That pursuit of inner truth is genuine, though it benefits from patience with mysteries that may never fully resolve into words.",
  62: "Gate 62 excels at organizing facts and details into precise, communicable form, turning something vague into something that can actually be said clearly. That precision is a real gift, best offered without losing sight of the larger meaning the details are in service of.",
  63: "This gate's mind doubts by default, testing patterns against logic until they've genuinely earned trust. That skepticism is a real safeguard against false certainty, though it works best when it eventually allows some conclusions to actually be settled.",
  64: "Gate 64 holds a head full of unprocessed impressions from the past, waiting for the pattern that will finally make sense of them. That confusion isn't a malfunction — it's the raw material this gate needs before genuine understanding can click into place.",
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
