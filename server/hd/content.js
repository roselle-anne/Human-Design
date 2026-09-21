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
    shortSummary:
      'Generators are the sustainable life-force of the population, built to work steadily and see things through once truly engaged. Their strategy is to respond rather than initiate, and their growth edge is learning to trust that response before committing to anything.',
  },
  'Manifesting Generator': {
    population: '~33%',
    strategy: 'Respond, then inform',
    signature: 'Satisfaction',
    notSelf: 'Frustration',
    aura: 'Open, enveloping',
    summary:
      'Manifesting Generators are Generators with an additional direct channel from a motor to the throat, giving them a faster, multi-track way of moving through life. They still need to respond before acting, but once they respond they often move quickly, skip steps, and juggle several things at once. Informing the people affected before acting smooths the path, since their speed can otherwise catch others off guard.',
    shortSummary:
      "Manifesting Generators combine a Generator's sacral energy with a Manifestor's speed, often moving through multiple things at once. They respond first, then move quickly — and do best when they inform others before changing course.",
  },
  Manifestor: {
    population: '~9%',
    strategy: 'Inform before acting',
    signature: 'Peace',
    notSelf: 'Anger',
    aura: 'Closed, repelling',
    summary:
      'Manifestors are built to initiate — to start things that ripple out and involve other people, without waiting for an invitation. Their aura is naturally closed and can feel unpredictable to others, which is exactly why informing the people an action will affect, before taking it, is their strategy: it lowers resistance and clears the path for their impact to land as peace rather than conflict.',
    shortSummary:
      'Manifestors are here to initiate and act independently, often without waiting for permission. Their edge is learning to inform the people affected before they act, which turns resistance into ease.',
  },
  Projector: {
    population: '~20%',
    strategy: 'Wait for the invitation',
    signature: 'Success',
    notSelf: 'Bitterness',
    aura: 'Focused, absorbing',
    summary:
      "Projectors are here to guide, direct, and see systems and people clearly — not to generate constant output. Their aura absorbs and focuses the energy of others rather than sustaining its own, so working like a Generator tends to exhaust them. Recognition and invitation — into conversation, work, or relationship — are what let a Projector's insight actually be heard, turning potential bitterness at being overlooked into real success.",
    shortSummary:
      "Projectors are natural guides who see systems and people clearly, but aren't built to generate constant output. Their success depends on being recognized and invited, rather than pushing their insight forward uninvited.",
  },
  Reflector: {
    population: '~1%',
    strategy: 'Wait a full lunar cycle',
    signature: 'Surprise',
    notSelf: 'Disappointment',
    aura: 'Sampling, resistant',
    summary:
      'Reflectors have no centers consistently defined, so they sample and mirror the energy of whoever and wherever they are, making them uniquely sensitive barometers of the people and environments around them. Because their own sense of self shifts with the ~28-day lunar cycle, decisions deserve that much time to settle before acting, rather than being made in the moment.',
    shortSummary:
      'Reflectors mirror the health of whatever environment they\'re in, with no fixed energy type of their own. Their wisdom lies in giving big decisions a full lunar cycle before acting on them.',
  },
};

// Deep-dive content for each type's full-page treatment: a one-line
// subtitle, three overview paragraphs, two paragraphs each on the aura
// and strategy, a two-paragraph not-self/signature contrast, and four
// affirmations. Original writing for this tool.
export const TYPE_DETAIL = {
  Generator: {
    subtitle: 'You build a sustainable life through the work that truly lights you up.',
    overview: [
      "As a Generator, you carry a steady, renewable well of life-force energy. When you're doing work that genuinely engages you, that energy seems almost inexhaustible — you can work for hours and come away more energized than when you started. The catch is that this fuel only ignites in response to something real in front of you; it rarely shows up on command for a task you've simply decided you should want.",
      "Your gift is mastery through repetition. Because you're built to sustain effort over time, you're the one who actually finishes what others start, refining a craft or a role until it becomes genuinely yours. This isn't glamorous, but it's how real skill and real satisfaction are built — slowly, through showing up for the work your body has already said yes to.",
      "The trap for a Generator is initiating from the head instead of responding from the gut: chasing a goal because it looks right on paper, rather than because your body actually lit up at the invitation. Pushed forward on willpower alone, that same tireless energy turns into frustration and burnout. Followed from a real gut response, it becomes the quiet, durable satisfaction of a life built one honest yes at a time.",
    ],
    aura: [
      "Your aura is open and enveloping — it doesn't broadcast outward so much as draw the world in. People often feel comfortable and unguarded around you without quite knowing why; your energy field absorbs and amplifies whatever's near it, for better or worse.",
      "Because that openness works both ways, you can just as easily pick up other people's tension or urgency as their warmth. Protecting your energy isn't about closing off — it's about staying selective, letting in what you genuinely want more of, and giving yourself permission to step back from environments that drain rather than feed you.",
    ],
    strategyParagraphs: [
      "Your strategy is to respond — to let the world bring things to you and let your sacral center answer honestly, rather than going out and initiating from an idea of what should happen next. That response is often wordless: a felt pull toward something, or a flat, unmistakable lack of interest.",
      "In practice, this means resisting the urge to chase or force. When something is presented to you — a question, an opportunity, a person — your body will register a genuine charge or a genuine absence of one, well before your mind has finished building a case for or against it.",
      "This can feel counterintuitive if you've been taught that success requires relentless self-starting. For you, the opposite is usually true: the more you wait for a real response and act from it, the less resistance you meet, and the more your effort actually lands somewhere satisfying instead of dissipating into busywork.",
    ],
    notSelfParagraphs: [
      "Frustration shows up when you're moving on willpower instead of response — pushing through tasks that never actually got a yes from your body, just because they seemed necessary or expected. Energy spent this way rarely feels like progress, no matter how much of it you produce.",
      "Left unchecked, this pattern compounds: you feel busy but not fulfilled, tired but not satisfied, and it becomes tempting to blame the work itself rather than the mismatch between the work and your actual response to it.",
    ],
    signatureParagraphs: [
      "Satisfaction is the feeling that tells you you're using your energy correctly — a sense of rightness that shows up when the work you're doing actually came from a genuine sacral yes, not just a good argument for why you should be doing it.",
      "It doesn't require the work to be easy or without effort; it just needs to be real. When satisfaction is present, even hard, tiring days feel worthwhile, because the energy spent is energy that was actually yours to spend.",
    ],
    affirmations: [
      'I let the right work come to me instead of chasing it.',
      'My energy is a resource I get to spend on purpose, not on obligation.',
      "A clear no protects the yes that's actually mine.",
      "Satisfaction, not exhaustion, is how I know I'm on track.",
    ],
  },
  'Manifesting Generator': {
    subtitle: 'You move fast, juggle freely, and bring your own shortcuts to everything you touch.',
    overview: [
      "As a Manifesting Generator, you carry a Generator's sustainable sacral energy alongside a direct link to action that lets you move at real speed. Once something has your genuine yes, you rarely proceed one careful step at a time — you're often several steps ahead, having already sensed the shortcut past the parts that don't matter.",
      "This makes you a natural multi-tasker. You can hold several threads at once and switch between them without losing momentum, which can look chaotic to people who work more linearly but is often exactly how you get the most done. Boredom, for you, is a real signal — if a single task stops moving, your attention is right to look for what's next.",
      "Your particular challenge is that your speed can leave people behind. Skipping steps works beautifully when it's just you, but when others are involved and haven't been told what's changing, your quick pivots read as unpredictable or even inconsiderate. Informing people before you shift direction isn't a formality — it's what turns your speed into an asset instead of a source of friction.",
    ],
    aura: [
      "Like a Generator, your aura is open and enveloping, drawing in the energy of your environment rather than projecting outward. It's warm and easy to be around when you're engaged in something real, and noticeably flatter when you're not.",
      "Because you move quickly, your aura can also feel like a lot to keep up with — people sense your momentum before they understand where it's headed. Giving others a quick heads-up about your direction lets them enjoy your pace instead of scrambling to catch up to it.",
    ],
    strategyParagraphs: [
      "Your strategy has two parts: respond, then inform. Like any Generator, you need a real sacral response before committing to something — a felt pull, not a good argument. But once you've responded and started moving, the second half matters just as much: telling the people affected what you're doing and where you're headed.",
      "Informing isn't about asking permission — it's about clearing the path. Because you move fast and skip steps naturally, the people around you are often still catching up to where you were five minutes ago. A quick heads-up before you pivot saves everyone, including you, from unnecessary resistance.",
      "Skipping the \"inform\" step is the single most common way your speed turns into conflict. It costs you almost nothing to say what you're doing before you do it, and it's often the difference between people experiencing your quickness as exciting rather than disruptive.",
    ],
    notSelfParagraphs: [
      "Frustration hits you the same way it hits any Generator — through energy spent on something that never had a real yes behind it — but it can also show up as impatience when your natural speed gets forced to slow down to match everyone else's pace.",
      "It can also arrive when you skip the \"inform\" step and meet resistance you didn't expect. What feels to you like simple efficiency can land, to others, as having been left out of the loop — and that friction loops back as your own frustration.",
    ],
    signatureParagraphs: [
      "Satisfaction arrives when your speed and your instincts are actually being used — when you've responded to something real, moved through it efficiently, and kept the people around you in the loop along the way.",
      "It often comes paired with a sense of having found the shortcut nobody else saw: the fastest real path through a problem, taken because your body said yes and your instincts trusted the quicker route.",
    ],
    affirmations: [
      'My speed is a gift when I let people in on where I\'m headed.',
      "I don't need to finish one thing before I'm excited about the next.",
      'A quick word before I pivot saves everyone friction, including me.',
      "Efficiency isn't corner-cutting when it's the shortcut my body actually found.",
    ],
  },
  Manifestor: {
    subtitle: "You're built to start things, move independently, and let your impact ripple outward.",
    overview: [
      "As a Manifestor, you carry a rare capacity to initiate — to start things from nothing, without waiting for an invitation or a green light from anyone else. Where most people are built to respond to what's already in motion, you're built to be the one who sets things moving in the first place.",
      "This independence is real, not stylistic. You genuinely think and move best without needing to consult a committee first, and trying to force yourself into a more collaborative, wait-for-consensus mode of operating tends to leave you feeling stifled rather than supported.",
      "The friction you sometimes meet isn't a flaw in your design — it's a natural response to impact that arrives without warning. People aren't usually upset that you acted; they're startled that they didn't see it coming. That single detail — being told, not asked — is almost always what determines whether your action lands as leadership or as a threat.",
    ],
    aura: [
      "Your aura is closed and naturally repelling — not cold, but self-contained in a way that doesn't invite input the way an open aura does. It's part of what lets you move independently; it's also part of why people can find you hard to read.",
      "Because your energy doesn't broadcast an invitation the way other types' auras do, people often approach you more cautiously, or not at all, unless you make the first move. That's not something to fix — it's simply the medium you initiate through.",
    ],
    strategyParagraphs: [
      "Your strategy is to inform before you act — not to ask permission, but to give the people your action will touch a moment's notice before it happens. This single habit changes how your impact is received almost every time.",
      "Without that heads-up, even a good decision can trigger resistance, simply because it arrived as a surprise. People don't need to agree with what you're doing; they mostly need to not be blindsided by it.",
      "Informing can feel unnecessary to you, since your instinct is simply to act. But it costs little and buys a great deal: the same action, announced a moment ahead of time, tends to land as confident leadership instead of an ambush.",
    ],
    notSelfParagraphs: [
      "Anger tends to surface when your independence is blocked — when you're made to wait for permission you don't actually need, or when someone tries to control a decision that was always going to be yours to make.",
      "It can also show up as the backlash you receive after acting without informing anyone first: resistance you didn't expect, arriving right when you thought the matter was already settled.",
    ],
    signatureParagraphs: [
      "Peace is the feeling that tells you your impact landed cleanly — that you initiated, informed the right people, and moved forward without triggering the resistance that comes from being misunderstood.",
      "It's a quieter signature than it might sound: not the absence of action, but the absence of friction around it. When you consistently inform before you act, peace becomes less of an occasional relief and more of a baseline.",
    ],
    affirmations: [
      "A moment's notice turns my impact into leadership, not a surprise.",
      "I don't need permission to start what's mine to start.",
      'Resistance I meet is information about timing, not a verdict on the idea.',
      "Peace is the sign I'm using my independence well.",
    ],
  },
  Projector: {
    subtitle: 'You see what others miss, and guide best when your insight is actually invited.',
    overview: [
      "As a Projector, you're built to see — systems, people, and the gaps between potential and what's actually happening — with a clarity that types built for constant doing simply don't have the bandwidth for. Your value was never meant to come from output; it comes from insight.",
      "Because you don't have the Sacral's sustainable engine, working like a Generator — grinding through hours of undirected effort — tends to exhaust you far faster than it would someone built for that kind of stamina. Your energy is better spent studying, observing, and directing than producing at volume.",
      "The piece that makes or breaks a Projector's experience is recognition. Insight offered before anyone has asked for it, however accurate, tends to be resisted; the same insight offered once you've been invited in is often received as exactly what someone needed to hear. Waiting for that invitation isn't passivity — it's how your guidance actually gets heard instead of deflected.",
    ],
    aura: [
      "Your aura is focused and absorbing rather than expansive — it takes in and concentrates the energy of whoever and whatever you're paying attention to, which is part of why you read people and situations so accurately.",
      "That same focus means you're easily overwhelmed in large groups or unfiltered environments, since you're absorbing far more than most people register consciously. Protecting your energy by curating who and what you spend it on isn't precious — it's necessary.",
    ],
    strategyParagraphs: [
      "Your strategy is to wait for the invitation — not just any invitation, but genuine recognition in the areas that matter most: work, relationships, and important conversations. This isn't about waiting passively for life to happen; you're free to prepare, study, and position yourself the whole time.",
      "The distinction is subtle but real: pursuing an opportunity uninvited tends to meet quiet resistance, even when your read on the situation is completely correct. The same insight, offered once someone has actually asked for your perspective, tends to open doors instead of closing them.",
      "This can feel like a strange thing to trust, especially in a culture that rewards self-promotion. For a Projector, the wait is rarely wasted time — it's the difference between insight that lands and insight that bounces off someone who wasn't ready to receive it.",
    ],
    notSelfParagraphs: [
      "Bitterness tends to build when your insight keeps going unrecognized — when you can see clearly what needs to happen but nobody has invited you to say so, or when you've pushed your perspective forward and watched it get brushed aside.",
      "Over time, uninvited effort that goes unseen can curdle into a quiet resentment toward the people or systems that didn't make room for you, even when the deeper issue was reaching out before being asked.",
    ],
    signatureParagraphs: [
      "Success, for a Projector, isn't about how much you produced — it's the feeling of being truly seen and valued for what you actually offer: your perception, your guidance, your ability to make sense of a system that confuses everyone else.",
      "It shows up most clearly in moments of genuine recognition — being asked for your take, being invited into the room, being trusted with the kind of decision that only someone with your vantage point could make well.",
    ],
    affirmations: [
      'My value comes from what I see, not how much I produce.',
      'The right invitation is worth waiting for.',
      "Rest is part of my strategy, not a departure from it.",
      'Being truly seen is success, however it arrives.',
    ],
  },
  Reflector: {
    subtitle: 'You mirror the world around you, and your wisdom unfolds one lunar cycle at a time.',
    overview: [
      "As a Reflector, you carry no centers consistently defined, which makes you a uniquely sensitive mirror for whatever community or environment you're part of. What you feel is often less about you personally and more an accurate reading of the health of the people and places around you.",
      "This makes you rare — roughly one in a hundred people share your design — and often means your experience doesn't map neatly onto advice built for the other four types. You're not meant to have a fixed, consistent way of being; you're meant to sample, reflect, and shift with real discernment.",
      "Because your entire design moves with the ~28-day lunar cycle, the single most important thing you can do for yourself is give big decisions that much room to breathe before committing. What looks like indecision from the outside is actually the exact process your design needs to arrive at something true.",
    ],
    aura: [
      "Your aura is sampling and resistant — it takes in the qualities of an environment fully, but doesn't easily let any one influence take permanent hold. This is what allows you to move between very different settings and genuinely register what each one is like from the inside.",
      "Because you absorb so completely, the people and places you spend the most time with matter enormously — you'll tend to feel, quite literally, like a reflection of whatever community surrounds you, for better or worse.",
    ],
    strategyParagraphs: [
      "Your strategy is to wait a full lunar cycle — about 28 days — before committing to anything significant. This isn't caution for its own sake; because your own sense of things shifts as the moon moves through your chart, a decision that feels obviously right on day three can look completely different by day twenty.",
      "In practice, this means talking a big decision through with several different people, in several different moods and moments, over that stretch of time, rather than locking in an answer from any single one of those moments.",
      "This pace can feel at odds with a world that expects fast answers, but rushing tends to produce decisions that don't actually hold up once the cycle has finished moving through your design. The wait isn't a workaround — it's the actual mechanism by which your clarity arrives.",
    ],
    notSelfParagraphs: [
      "Disappointment tends to surface when a decision made too quickly turns out to be wrong once the fuller picture — the one your lunar cycle would have eventually revealed — finally comes into view.",
      "It can also arise from spending prolonged time in an environment or community that isn't actually healthy, since your design will faithfully reflect that back to you as your own felt experience, whether or not it started out as yours.",
    ],
    signatureParagraphs: [
      "Surprise, delightfully, is your signature — the sense of genuine wonder that comes from a life lived with enough openness and enough patience that things keep revealing themselves in ways you didn't (and weren't meant to) predict in advance.",
      "It tends to show up most when you've given a decision its full cycle and let the answer arrive on its own schedule, rather than forcing a conclusion before your design was actually ready to offer one.",
    ],
    affirmations: [
      'A full month is not too long to wait for the truth of a big decision.',
      'What I feel often belongs to my environment, not just to me.',
      'My openness is a form of wisdom, not indecision.',
      "Surprise is a sign I've let life unfold instead of forcing it.",
    ],
  },
};
// page, and the general (not chart-specific) intro to Human Design shown
// before the chart itself. Original writing for this tool.
export const SECTION_INTROS = {
  Type: 'How you engage with your environment and interact with others, based on your specific energetic signature and strategy.',
  Authority: 'How you make good decisions, based on the wisdom of your body.',
  Profile: 'The role you play and the lens you see through, shaped by the two lines that describe your conscious and unconscious approach to life.',
  Definition: 'How the defined parts of your chart connect to each other — and how open you are to being completed by other people.',
};

export const HD_INTRO_PARAGRAPHS = [
  'Human Design is a synthesis system that combines Western astrology, the I Ching, the Kabbalistic Tree of Life, the Hindu-Brahmin chakra system, and concepts from modern genetics and quantum physics into a single framework for understanding individual difference. It was brought forward by Ra Uru Hu in 1987, and has since grown into a widely used tool for self-knowledge.',
  'At its center is the idea that each person is born with a unique energetic blueprint, calculated from the exact date, time, and place of birth — the same information astrology uses, read through a different lens. That blueprint, called a bodygraph, maps out a specific Type, Strategy, Authority, Profile, and set of defined and undefined centers unique to that person.',
  "Rather than offering generic advice, Human Design describes how an individual is specifically built to make decisions, use energy, and interact with others — and where they're prone to picking up conditioning that isn't really their own. Working with a chart is less about following new rules and more about noticing the difference between what comes naturally and what has been learned or absorbed from other people.",
  'This report walks through your own chart in detail: your Type and Strategy, your decision-making Authority, your Profile, the definition running through your centers, and the specific gates and channels activated in your design.',
];

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

// Full-page deep dives for each authority: an eyebrow, a clean page title,
// and four paragraphs walking through the mechanic, the common way it
// gets overridden, how to actually trust it, and what following it
// produces. Original writing for this tool.
export const AUTHORITY_DETAIL = {
  Emotional: {
    pageTitle: 'Emotional Authority',
    paragraphs: [
      "With Emotional Authority, there is no true \"now\" for you to decide from — clarity arrives as a wave, rising and falling over time, rather than as a single fixed answer available in the moment. Whatever you feel right now is real, but it isn't yet the whole picture.",
      "This is why the classic advice for Emotional Authority is to sleep on it: big decisions made at an emotional high or a low tend to be regretted once the wave passes and a fuller, calmer picture comes into view. Neither the peak nor the trough is more \"true\" than the other — the truth is somewhere in the pattern across both.",
      'Learning to trust this authority means resisting the pressure — your own or other people\'s — to answer immediately. A simple "let me get back to you" is often the most powerful sentence available to you, buying the time your emotional wave needs to actually complete itself.',
      "When you follow this rhythm consistently, decisions stop feeling like gambles made in a single charged moment and start feeling like conclusions you've genuinely arrived at — settled, considered, and far less likely to be second-guessed once the feeling that prompted them has moved on.",
    ],
  },
  Sacral: {
    pageTitle: 'Sacral Authority',
    paragraphs: [
      'With Sacral Authority, your body answers before your mind has finished forming the question. That response is often wordless — a spontaneous, gut-level charge that shows up as an audible "mmm-hmm" or "uh-uh" as much as it does a thought, telling you plainly whether you have the energy for something right now.',
      "The most common way people override this authority is by letting the mind step in to explain, justify, or second-guess what the gut already made clear. Your Sacral response isn't looking for permission from your reasoning — it's simply reporting, honestly and immediately, what's true for your energy in this moment.",
      "Because that response is tied to the present moment, it's allowed to change: something your body said yes to yesterday might get a flat no today, and that isn't inconsistency — it's your energy accurately reporting on itself in real time. Yes/no questions tend to produce the clearest signal, so it often helps to frame a decision that way when you're unsure.",
      'Following this response consistently means your energy only goes toward things that genuinely have your body\'s yes behind them — which is exactly what keeps a Sacral response sustainable rather than depleting, and what eventually produces the deep, specific satisfaction that comes from work you were actually built to do.',
    ],
  },
  Splenic: {
    pageTitle: 'Splenic Authority',
    paragraphs: [
      "Splenic Authority speaks quietly, instantly, and only once. It doesn't announce itself with drama or repeat itself for emphasis — it's a single, subtle flash of instinctive knowing about health, safety, or timing, gone almost as soon as it arrives.",
      "The biggest challenge with this authority isn't hearing it — it's trusting it before the moment passes. Because it doesn't repeat or build a case for itself the way an emotional wave does, waiting for a second confirmation usually just means the original, accurate signal gets missed entirely.",
      'This kind of knowing often shows up as an instinct to move toward or away from something, a subtle unease, or a fleeting sense that this is the moment — arriving in real time, tied to the present, rather than as a conclusion you reasoned your way toward.',
      "Trusting your Splenic hits, even when you can't fully explain them, tends to keep you a step ahead of situations before they've fully developed — and over time, a track record of those quiet, accurate instincts becomes hard to argue with, even for your own doubting mind.",
    ],
  },
  Ego: {
    pageTitle: 'Ego Authority',
    paragraphs: [
      'Ego Authority makes decisions by testing them against willpower and material worth: is this something you genuinely want enough to commit real effort and resources to, right now? It\'s less about feeling and more about a kind of embodied conviction.',
      'This authority is famously well-suited to being spoken aloud. Saying a decision out loud, ideally to another person, tends to reveal instantly whether your will is actually behind it — the words either come out with real weight and confidence, or they visibly fall flat, even to your own ear.',
      "The trap here is making promises or commitments your willpower isn't actually behind, just because they sound reasonable or expected. An Ego \"yes\" that isn't backed by genuine desire tends to become a resentful obligation fairly quickly.",
      'When you only commit to what your will genuinely stands behind, your word becomes reliably strong — you follow through because you meant it, not because you feel obligated to, and that consistency becomes one of your most trusted qualities.',
    ],
  },
  'Self-Projected': {
    pageTitle: 'Self-Projected Authority',
    paragraphs: [
      "Self-Projected Authority finds clarity through your own spoken voice — specifically, through hearing yourself talk a decision out loud, usually to a trusted listener who isn't there to advise you, just to listen.",
      "The insight isn't really coming from the other person; it's already inside you, and speaking is simply how it surfaces. You'll often notice your own voice grow more energized and certain as you talk toward the direction that's actually right, and flatter or more hesitant as you talk toward the one that isn't.",
      "This means the choice of who you talk to matters less than the act of talking itself — though a patient, non-directive listener helps far more than someone eager to jump in with their own opinion, since their input can drown out the very voice you're trying to hear.",
      "Trusting this process means resisting the urge to think a big decision through silently, in your head, where the clarifying effect of your own voice never gets the chance to work. Said out loud, your direction tends to become obvious to you even when it wasn't a moment before you started speaking.",
    ],
  },
  'Mental (Environmental)': {
    pageTitle: 'Mental Authority',
    paragraphs: [
      'With no defined inner authority to consult, your clarity is meant to be found out loud and out in the world — specifically, through the effect that different environments and different people have on your thinking as you talk a decision through.',
      "This isn't indecision; it's simply how your particular design processes big choices. The same question can land completely differently depending on where you are and who you're talking to, and that variation is useful information rather than a problem to solve.",
      'The most effective approach is deliberately varying both: talk the decision through in more than one place, and with more than one kind of person, rather than settling for the first environment or conversation that happens to be convenient.',
      'Over time, a pattern tends to emerge — certain environments and certain people consistently help your thinking sharpen, while others consistently muddy it. Learning which is which turns "no fixed authority" into one of the more reliable processes available to any type.',
    ],
  },
  Lunar: {
    pageTitle: 'Lunar Authority',
    paragraphs: [
      "As a Reflector, no center is ever consistently defined, so there's no fixed inner organ to consult for a fast answer the way other types have. Instead, your authority is time itself — specifically, a full lunar cycle of roughly 28 days.",
      'Over that cycle, the moon moves through every gate in your chart, and your felt sense of a decision will genuinely shift along with it — clear on one day, murky on another, energized on a third. No single day in that cycle has more claim to the truth than any other.',
      'In practice, this means discussing a significant decision with a range of trusted people across the full stretch of the cycle, rather than locking in an answer from any one conversation or any one mood. Journaling your shifting impressions day to day can make the eventual pattern much easier to see.',
      "Honoring this pace, even when it feels slow next to how quickly other people decide, tends to produce a clarity that actually holds up — because it was given time to be tested against every angle your design has to offer, rather than settled on before the picture was complete.",
    ],
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

// Deeper, standalone material for each of the 6 profile lines — used on
// their own report pages (framed as "How you perceive yourself" for the
// conscious/Personality line, or "How others perceive you" for the
// unconscious/Design line), independent of the short keyword/summary pairs
// above used inline elsewhere in the report.
export const PROFILE_LINE_DETAIL = {
  1: {
    paragraphs: [
      'Line 1 is characterized by a need for a firm, well-researched foundation before stepping into anything new. You feel most secure when you have genuinely investigated a subject, a person, or a situation from the ground up, rather than taking someone else\'s word for it.',
      'This isn\'t caution for its own sake — it\'s a way of building real, lasting confidence. Once you\'ve done the digging yourself, you carry an unshakeable authority on the subject, and that groundedness is something other people can feel and lean on.',
    ],
    potentials:
      'Your depth of study makes you a genuine expert over time, and a trustworthy source of information for others who haven\'t done the legwork themselves. That security also frees you to explore niche or overlooked subjects fearlessly, since you\'re not chasing approval — you\'re chasing understanding.',
    challenges:
      'Without enough foundational research, insecurity can creep in and masquerade as indecision or over-preparation that never quite ends. There\'s also a risk of feeling threatened by not knowing something, when the healthier move is simply admitting the gap and going to investigate it.',
  },
  2: {
    paragraphs: [
      'Line 2 carries a natural, often hidden gift — a talent that unfolds best in solitude, away from an audience. You do your best work when nobody is watching, refining an ability quietly until it\'s ready to be seen.',
      'Because the gift feels so effortless from the inside, it can be hard to recognize as special until someone else notices and calls it out. Being "called" — invited out of solitude by the right person or opportunity — matters more for you than for most other lines.',
    ],
    potentials:
      'Left to your own rhythm, you develop real mastery, because your growth isn\'t performative — it\'s private and genuine. When you are called out at the right moment, you can step forward with a level of skill that looks effortless to everyone else.',
    challenges:
      'Being pushed or projected onto before you\'re ready can trigger a strong urge to retreat, sometimes just when an opportunity is at its best. The lesson is discerning between a genuine, well-timed call and outside pressure that\'s simply impatient with your natural need for space.',
  },
  3: {
    paragraphs: [
      'Line 3 moves through the world by doing, not by planning from the sidelines. You find out what actually works — in relationships, methods, or plans — by trying it directly and course-correcting along the way, and a stumble here is rarely a real failure; it\'s data. Bouncing back quickly after things don\'t go as expected is practically a signature trait.',
      'Because your knowledge comes from lived trial and error rather than borrowed advice, you tend to trust your own tested experience over theory, even when that means bending or ignoring convention. That independence is what lets you find workable paths nobody else has mapped out yet.',
    ],
    potentials:
      'All that hands-on experimenting builds a genuinely practical wisdom — you know what breaks and what holds up, because you\'ve actually tested it. That makes you a valuable guide for anyone else facing a similar trial, since your advice comes from experience rather than theory, and your comfort with risk can give others permission to try, fail, and try again themselves.',
    challenges:
      'Constantly adapting to new experiences can blur into losing your own footing, especially inside close relationships, if you\'re not careful to keep checking back in with what you actually want. A fear of the next misstep can also quietly stall you out of trying anything at all — which defeats the entire purpose of this line. Watch, too, for slipping into a "why does this always happen to me" story; the corrective isn\'t luck, it\'s recognizing you chose the experiment.',
  },
  4: {
    paragraphs: [
      'Line 4 builds its foundation through a close, existing network of friends and contacts rather than through strangers or open opportunity. Your influence in the world moves outward from fixed, established relationships — the people who already know and trust you.',
      'This makes your closest bonds unusually important: a healthy, stable network of friendships is not a nice-to-have for you, it\'s the actual mechanism through which opportunities and change arrive in your life.',
    ],
    potentials:
      'You can become a warm, reliable hub within your community, someone whose network genuinely opens doors — for yourself and for the people in it. Change that comes through a trusted friend tends to land well and last, because it arrives with a foundation of relationship already in place.',
    challenges:
      'Clinging to a friendship or network out of fear of losing your foundation can keep you stuck in situations that no longer serve you. There\'s also a risk of over-identifying with your social circle, mistaking its opinions and comfort for your own genuine direction.',
  },
  5: {
    paragraphs: [
      'Line 5 gets projected onto by others — seen as a practical problem-solver, a fixer, or even a savior, often before you\'ve said or done anything to earn that reputation. People bring you their expectations, and how you handle that projection shapes your whole path.',
      'Living up to a projection when it\'s accurate can bring real influence and impact on a wide scale. But when the projection is wrong, correcting it — clearly and without apology — becomes just as important as fulfilling it, since an unmet expectation from a Line 5 tends to turn into a very public reputation swing.',
    ],
    potentials:
      'You have an unusual capacity to solve problems at scale and to be trusted with responsibility others wouldn\'t be handed. When you deliver, your impact and reputation can spread far beyond your immediate circle.',
    challenges:
      'The weight of constant projection can feel heavy and impersonal, as if people relate to an idea of you rather than who you actually are. Reputation can swing quickly from savior to scapegoat, which makes transparency and correcting false projections early an essential, ongoing practice.',
  },
  6: {
    paragraphs: [
      'Line 6 moves through three distinct life phases: an early trial-and-error period much like Line 3, a withdrawn observation phase around age 30 where you step back from the intensity of direct experience, and finally a settled, exemplary role later in life.',
      'In that final phase, you become a model others watch from a distance and learn from — living an example rather than actively teaching or intervening. The rooftop, as it\'s often described, is where you get the vantage point to see life clearly, both your own and everyone else\'s.',
    ],
    potentials:
      'Your lived experience across all three phases gives you a rare, hard-won credibility — you\'ve actually been in the trenches, then risen above them. As a model, you can inspire simply by living well and visibly, without needing to say a word.',
    challenges:
      'The early trial-and-error phase can feel confusing if you expect the composure of your later years too soon — that phase has its own timeline and can\'t be rushed. During the observation phase, isolation can tip into disconnection if you forget that stepping back is temporary, not permanent.',
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
// Two short affirmations per gate, grounded in that gate's own keynote
// above — used on each gate's report page, in the same "Affirmations"
// format already used on the center pages.
export const GATE_DETAIL = {
  1: { affirmations: ['My creative expression doesn\'t need anyone\'s permission.', 'Being unmistakably myself is enough of a contribution.'] },
  2: { affirmations: ['I trust the direction I sense before I can explain it.', 'I don\'t need to force a path — I can let it reveal itself.'] },
  3: { affirmations: ['Chaos before order is part of my process, not a failure of it.', 'Every new form I build starts from something imperfect.'] },
  4: { affirmations: ['My mind is allowed to answer, even when the answer is "I don\'t know yet."', 'A logical answer is worth the time it takes to actually find it.'] },
  5: { affirmations: ['My rhythm doesn\'t need to match anyone else\'s.', 'Consistency is one of my quiet strengths.'] },
  6: { affirmations: ['A little friction doesn\'t mean the bond is wrong.', 'I get to decide who and what gets close, and when.'] },
  7: { affirmations: ['I can lead by example without needing to be in charge.', 'My influence is real even when it\'s quiet.'] },
  8: { affirmations: ['My individual way of contributing is valuable exactly as it is.', 'Showing up as myself is its own kind of leadership.'] },
  9: { affirmations: ['Small details are worth my full attention.', 'Staying focused is a strength, not a limitation.'] },
  10: { affirmations: ['Loving myself is the foundation everything else is built on.', 'I\'m allowed to behave according to my own nature.'] },
  11: { affirmations: ['Not every idea I have needs to become an action.', 'My ideas are worth gathering, even before I know what to do with them.'] },
  12: { affirmations: ['I can wait for the right mood before I speak.', 'My caution about timing is wisdom, not hesitation.'] },
  13: { affirmations: ['People trust me with their stories for a reason.', 'What I\'ve listened to becomes wisdom once I\'ve had time to reflect.'] },
  14: { affirmations: ['My resourcefulness is real power in service of a direction.', 'I don\'t need to know the whole plan to keep moving skillfully.'] },
  15: { affirmations: ['Every rhythm and way of living deserves room, including mine.', 'I don\'t need to judge a pace just because it\'s different from mine.'] },
  16: { affirmations: ['Practice is how my enthusiasm becomes real skill.', 'It\'s okay to be a beginner at the thing I\'m excited about.'] },
  17: { affirmations: ['My opinions are worth forming, even if I hold them loosely.', 'I can offer my perspective without needing everyone to agree.'] },
  18: { affirmations: ['Wanting to improve something doesn\'t mean I think it\'s worthless.', 'My eye for what\'s flawed can come from care, not criticism.'] },
  19: { affirmations: ['Noticing what others need is a real gift, not just sensitivity.', 'I\'m allowed to ask for what I need to feel resourced too.'] },
  20: { affirmations: ['This present moment is enough to act from.', 'I don\'t need a rehearsed version of myself to show up honestly.'] },
  21: { affirmations: ['Wanting control over my own domain is healthy, not controlling.', 'I can manage what\'s mine without needing to manage everyone else\'s.'] },
  22: { affirmations: ['My emotional openness, well-timed, is a gift to the people around me.', 'Grace and honesty can coexist in how I express myself.'] },
  23: { affirmations: ['My insight is worth the effort it takes to explain simply.', 'I can wait for the right moment to share what I understand.'] },
  24: { affirmations: ['Circling back to a question isn\'t getting stuck — it\'s how I get clear.', 'The answer is allowed to take a few passes to arrive.'] },
  25: { affirmations: ['My capacity to love isn\'t reserved for people who\'ve earned it.', 'I can offer unconditional care without losing myself in it.'] },
  26: { affirmations: ['I can speak confidently about the value of what I\'ve done.', 'Trusting my read on people and patterns serves me well.'] },
  27: { affirmations: ['Caring for others is one of my genuine strengths.', 'I can nourish others without abandoning my own needs.'] },
  28: { affirmations: ['A worthwhile risk is one I get to choose for myself.', 'Meaning is often found on the other side of a real risk.'] },
  29: { affirmations: ['My yes is worth something because I mean it fully.', 'I don\'t have to say yes to everything to know my commitment is real.'] },
  30: { affirmations: ['My desires are information, not something to be ashamed of.', 'I can feel a longing fully without needing to act on it right away.'] },
  31: { affirmations: ['My voice carries the most weight when I\'ve genuinely been asked to use it.', 'Being chosen to lead means more than appointing myself.'] },
  32: { affirmations: ['My instinct for what will last is worth trusting.', 'Not everything needs to be preserved — only what\'s actually built to endure.'] },
  33: { affirmations: ['Withdrawing to reflect isn\'t avoidance — it\'s preparation.', 'What I eventually share is worth more for having been considered first.'] },
  34: { affirmations: ['My power is most effective when I respond rather than force it.', 'I don\'t need to justify the energy I naturally have.'] },
  35: { affirmations: ['Wanting something new doesn\'t mean I\'m ungrateful for what I have.', 'Progress, even messy progress, is still progress.'] },
  36: { affirmations: ['A turbulent experience can still be one worth having.', 'My emotional appetite for change is part of how I grow.'] },
  37: { affirmations: ['Loyalty I give and loyalty I receive should feel balanced.', 'Warmth and reciprocity are things I\'m allowed to expect from my people.'] },
  38: { affirmations: ['I get to choose what\'s actually worth fighting for.', 'My tenacity has a real purpose behind it.'] },
  39: { affirmations: ['Testing the waters isn\'t the same as causing trouble.', 'I can provoke a real response without needing to apologize for it.'] },
  40: { affirmations: ['I\'ve earned my rest through the work I\'ve actually done.', 'Needing time alone doesn\'t make me any less reliable.'] },
  41: { affirmations: ['A new cycle is allowed to start as just a feeling, before it\'s a plan.', 'My imagination is the beginning of something, not a distraction from it.'] },
  42: { affirmations: ['Letting a cycle finish fully is worth the patience it takes.', 'Completion is its own kind of growth.'] },
  43: { affirmations: ['My insight doesn\'t need to make sense to everyone right away.', 'I can find simple words for what arrived to me all at once.'] },
  44: { affirmations: ['My alertness to patterns from the past is useful, not paranoid.', 'I can trust what my instincts have already learned.'] },
  45: { affirmations: ['I can hold responsibility for shared resources without apologizing for it.', 'Gathering people around a shared goal is a real skill.'] },
  46: { affirmations: ['Being in this body, right here, is worth loving.', 'The right place tends to find me when I stay present.'] },
  47: { affirmations: ['Confusion is just understanding that hasn\'t arrived yet.', 'I don\'t need every piece to make sense before I trust the process.'] },
  48: { affirmations: ['My depth of knowledge is real, even when I doubt it.', 'Not feeling ready yet doesn\'t mean I\'m not capable.'] },
  49: { affirmations: ['My sense of what\'s fair is worth honoring in every relationship.', 'Belonging that costs me my principles isn\'t belonging I need to keep.'] },
  50: { affirmations: ['Holding a group to healthy values is a form of care.', 'My sense of responsibility helps keep the people around me safe.'] },
  51: { affirmations: ['A jolt can be the exact thing that gets me moving.', 'I can meet a challenge on my own terms, first.'] },
  52: { affirmations: ['Stillness isn\'t empty — it\'s where my clearest focus comes from.', 'I don\'t have to be in motion to be productive.'] },
  53: { affirmations: ['Starting something is valuable, even if I\'m not the one who finishes it.', 'A new beginning doesn\'t need to be perfect to be worth starting.'] },
  54: { affirmations: ['Wanting to rise and improve my circumstances is a healthy drive.', 'My ambition can be in service of something meaningful, not just status.'] },
  55: { affirmations: ['My sense of abundance is allowed to rise and fall like a mood.', 'A low mood today doesn\'t erase what\'s actually true about my life.'] },
  56: { affirmations: ['A good story is one of the most generous things I can offer.', 'My gift for stimulating others through experience is real.'] },
  57: { affirmations: ['My instant intuitive read is worth trusting.', 'I don\'t need to overthink what I already know in the moment.'] },
  58: { affirmations: ['My critical eye comes from real joy in things working well.', 'Wanting to improve something is a form of vitality, not negativity.'] },
  59: { affirmations: ['Breaking down a barrier to real intimacy is worth the vulnerability.', 'Bonding, for me, is a genuine drive worth honoring.'] },
  60: { affirmations: ['A limitation can be exactly what makes real innovation possible.', 'I don\'t need unlimited resources to create something new.'] },
  61: { affirmations: ['Not every mystery needs to be solved right away.', 'My restless curiosity about the unexplainable is part of who I am.'] },
  62: { affirmations: ['Getting the details right is a genuine skill, not just pickiness.', 'I can organize what I know into something clear and useful.'] },
  63: { affirmations: ['My doubt is often what makes an answer trustworthy.', 'Questioning a pattern is how I make sure it actually holds up.'] },
  64: { affirmations: ['My unprocessed impressions are the raw material for real understanding.', 'The pattern doesn\'t have to be obvious yet for it to eventually come.'] },
};

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

// Fuller, original two-paragraph treatments of each of the 36 channels,
// plus a short pull-quote for the bottom of each channel's report page —
// deeper than the one-line CHANNEL_THEMES above, used on the channel pages.
export const CHANNEL_DETAIL = {
  '1-8': {
    paragraphs: [
      'The channel of Inspiration connects a highly individual, creative self-expression (Gate 1) to a talent for modeling that expression in a way others can actually witness (Gate 8). Together they form a circuit built to influence purely by being visible — not by convincing anyone of anything.',
      'You are not here to follow a crowd or to lead one through argument; you\'re here to do your own thing, distinctly and openly, and let the example itself do the work. People are moved by watching you be unmistakably yourself, which only works if you resist diluting your creative direction to fit in.',
    ],
    quote: 'Your example speaks louder than your explanation ever could.',
  },
  '2-14': {
    paragraphs: [
      'The channel of The Beat pairs a natural sense of direction (Gate 2) with the resourcefulness and drive to actually get there (Gate 14). It\'s a keynote circuit for the G Center and Sacral working together — knowing where to go, and having the fuel to move.',
      'This combination makes you someone others quietly look to for orientation, even when you\'re not consciously offering guidance. The direction you sense isn\'t abstract; it\'s meant to be lived out through real, sustained work, which is where the Sacral energy of Gate 14 comes in to power the whole thing.',
    ],
    quote: 'You carry both the compass and the fuel to follow it.',
  },
  '3-60': {
    paragraphs: [
      'The channel of Mutation connects the drive toward innovation (Gate 3) with the discipline of working within real limits (Gate 60). Rather than fighting constraints, this circuit is built to transform through them — genuine newness tends to emerge only once a boundary forces a different approach.',
      'Because both gates sit in motor centers, this energy isn\'t theoretical — it wants to be tested, tried, and refined in the real world, often through trial and error. Periods that feel restrictive are frequently the exact setup your design needs before the next mutation can land.',
    ],
    quote: 'Your limits are the pressure that makes the breakthrough possible.',
  },
  '4-63': {
    paragraphs: [
      'The channel of Logic joins a mind built to answer questions with a formula (Gate 4) to a mind built to doubt and re-examine existing patterns (Gate 63). Together they create a rigorous, mentally restless circuit that isn\'t satisfied until an answer has actually been tested against doubt.',
      'This is thinking as a process of confident hypothesis followed by healthy suspicion — not anxiety, but genuine intellectual mutation. Your logical conclusions are usually sound, but they get sharper specifically because you\'re willing to question them rather than settle too early.',
    ],
    quote: 'A good answer is one that has survived being doubted.',
  },
  '5-15': {
    paragraphs: [
      'The channel of Rhythm links a fixed, personal sense of timing (Gate 5) with an extreme flexibility toward different rhythms and ways of living (Gate 15). The result is a steady internal beat that is nonetheless able to include and harmonize a wide range of people.',
      'You operate best with routines and rituals that anchor your day, and that consistency becomes something others can set their own pace against. This channel\'s gift is bringing very different rhythms into a shared harmony without forcing everyone into a single timeline.',
    ],
    quote: 'Your steady rhythm gives everyone else room to find theirs.',
  },
  '6-59': {
    paragraphs: [
      'The channel of Mating connects emotional friction and boundary-testing (Gate 6) with a drive to break down barriers to real intimacy (Gate 59). It\'s a circuit built for bonding — but bonding that requires some friction first, not instant closeness.',
      'The push and pull this channel creates isn\'t a flaw to fix; it\'s the actual mechanism by which trust gets tested and real intimacy becomes possible. Once the friction has done its work, the connection that remains tends to be genuinely durable.',
    ],
    quote: 'The friction isn\'t in the way of intimacy — it clears the path to it.',
  },
  '7-31': {
    paragraphs: [
      'The channel of the Alpha combines a role tied to the direction of a group or era (Gate 7) with an influential voice built to lead once genuinely recognized (Gate 31). This is a leadership circuit, but one that depends entirely on being chosen rather than self-appointed.',
      'You carry a natural sense for the direction things ought to go, and the presence to speak to it — but only when the timing and recognition are actually there. Stepping forward before being invited tends to undercut the very authority this channel is built to carry.',
    ],
    quote: 'Real leadership here waits to be recognized before it speaks.',
  },
  '9-52': {
    paragraphs: [
      'The channel of Concentration pairs the ability to focus on fine detail (Gate 9) with a stillness that can hold that focus without fidgeting (Gate 52). Together they form a circuit built for sustained, quiet application to a single task.',
      'This is patience with substance behind it — not passivity, but the discipline to stay with something small and specific until it\'s genuinely mastered. Environments or expectations that demand constant motion tend to work against this channel\'s real strength.',
    ],
    quote: 'Staying still on one thing is how you actually get it right.',
  },
  '10-20': {
    paragraphs: [
      'The channel of Awakening connects self-love and personal integrity (Gate 10) with the pressure to act and speak entirely in the present moment (Gate 20). It\'s a circuit for living your values out loud, right now, without waiting for permission or a better time.',
      'There\'s no room here for rehearsal — this energy expresses itself instantly, which means your behavior in the moment is usually a direct, honest readout of who you actually are. That immediacy can be confronting to people who expect more filtering, but it\'s also deeply authentic.',
    ],
    quote: 'Right now is the only moment this channel knows how to live in.',
  },
  '10-34': {
    paragraphs: [
      'The channel of Exploration joins self-love and personal conviction (Gate 10) with raw, unstoppable Sacral power (Gate 34). This combination is often described as the "channel of the individual" — a strong, self-directed force that follows its own conviction independent of outside approval.',
      'The power behind this channel is real, but it isn\'t random momentum; it\'s momentum in service of living according to your own values. When those two line up, very little can slow you down, and your independence tends to inspire rather than isolate you.',
    ],
    quote: 'Your power and your convictions move as one thing.',
  },
  '10-57': {
    paragraphs: [
      'The channel of Perfected Form links self-love (Gate 10) with instinctive, in-the-moment survival intuition (Gate 57). This pairing produces a refined sense for what genuinely belongs in your life and what to walk away from, guided by both values and instinct at once.',
      'Because both gates deal with an authentic relationship to the present, this channel tends to sharpen with age — the more you trust it, the more precisely it separates what\'s actually good for you from what merely looks good.',
    ],
    quote: 'What belongs in your life reveals itself the moment you stop overthinking it.',
  },
  '11-56': {
    paragraphs: [
      'The channel of Curiosity connects a mind full of ideas and possibilities (Gate 11) with a gift for turning those ideas into stories others want to hear (Gate 56). It\'s a circuit built for sharing perspective — through narrative, teaching, or simply good conversation.',
      'The ideas themselves matter less than the way they travel; this channel\'s real strength is translation, taking something conceptual and giving it a shape that holds someone else\'s attention. You\'re a natural collector and re-teller of experience.',
    ],
    quote: 'A good idea only really lands once it becomes a good story.',
  },
  '12-22': {
    paragraphs: [
      'The channel of Openness pairs a cautious, emotionally aware voice (Gate 12) with social grace and warmth (Gate 22). Together they create a circuit capable of real emotional expression — but only when the timing and mood genuinely feel right.',
      'This isn\'t inconsistency; it\'s emotional intelligence. You sense exactly when a room is ready to hear something vulnerable or meaningful, and that discernment is what makes your openness, when it does show up, land so well.',
    ],
    quote: 'Your honesty is powerful because you know exactly when to offer it.',
  },
  '13-33': {
    paragraphs: [
      'The channel of the Prodigal connects a gift for listening and holding others\' confidences (Gate 13) with a need for periods of withdrawal before sharing what\'s been learned (Gate 33). This is a circuit built around retreat, reflection, and eventual disclosure.',
      'People naturally confide in you, and over time you accumulate a wide, often quiet understanding of human experience. The retreat this channel needs isn\'t avoidance — it\'s processing time, and what eventually gets shared afterward tends to carry real, earned insight.',
    ],
    quote: 'What you eventually say is worth more for the silence that came before it.',
  },
  '16-48': {
    paragraphs: [
      'The channel of the Wavelength links enthusiastic, skill-building energy (Gate 16) with a deep well of natural talent and knowledge (Gate 48). It\'s the classic pairing of passion and depth — the drive to practice something combined with an instinct for when it\'s actually good enough.',
      'The tension in this channel is real: enthusiasm wants to move fast, while the depth underneath knows mastery takes time. Respecting both sides — practicing with genuine excitement while trusting the slower process of true skill-building — is where this channel performs best.',
    ],
    quote: 'Enthusiasm gets you started; depth is what makes it last.',
  },
  '17-62': {
    paragraphs: [
      'The channel of Acceptance connects strong, organized opinions (Gate 17) with a gift for precise, detailed expression (Gate 62). Together they form a circuit built to turn a general viewpoint into something specific, well-supported, and genuinely useful to a group.',
      'Your opinions carry weight because you back them with real detail rather than vague assertion, which is why others often turn to you for a clear read on a confusing situation. The key is timing that input for when it\'s actually been asked for.',
    ],
    quote: 'A well-organized opinion earns the trust a loud one never does.',
  },
  '18-58': {
    paragraphs: [
      'The channel of Judgment pairs a drive to identify and correct what\'s flawed (Gate 18) with a genuine, energetic joy in improvement itself (Gate 58). This circuit critiques not out of negativity but out of real delight in making something better.',
      'When this channel is healthy, correction feels generous rather than harsh — you\'re pointing at a flaw because you can see exactly how good the fixed version could be. Without that joy attached, the same instinct can tip into criticism that lands as simply negative.',
    ],
    quote: 'You correct things because you can already see how good they could be.',
  },
  '19-49': {
    paragraphs: [
      'The channel of Synthesis connects sensitivity to what others need (Gate 19) with a strong sense of principle about what\'s fair and acceptable (Gate 49). It\'s a circuit for belonging — tuning into a group\'s needs while holding a real standard for how those needs get met.',
      'You\'re genuinely attuned to the emotional and material needs of the people close to you, but that sensitivity is filtered through principle: needs get honored when the terms feel right, not automatically. This combination makes for meaningful, values-based belonging rather than people-pleasing.',
    ],
    quote: 'Belonging, for you, is built on fairness — not just closeness.',
  },
  '20-34': {
    paragraphs: [
      'The channel of Charisma joins present-moment awareness and expression (Gate 20) with raw Sacral power (Gate 34). This is one of the most immediately magnetic combinations in the bodygraph — action and presence fused together with no delay between the two.',
      'What you do speaks for itself here, often before you\'ve consciously decided to make a statement. This channel doesn\'t need to explain its power; the power is visible in how you show up and respond, in real time, to whatever is happening around you.',
    ],
    quote: 'You don\'t announce your power — people simply notice it.',
  },
  '20-57': {
    paragraphs: [
      'The channel of the Brainwave connects present-moment awareness (Gate 20) with instinctive, in-the-moment intuition (Gate 57). Together they produce a kind of knowing that arrives instantly, almost like premonition, and is meant to be acted on immediately rather than analyzed.',
      'This isn\'t a channel built for long deliberation; its gift is speed. The instinctive read you get in the moment is usually more accurate than anything you\'d arrive at by thinking it through slowly, which can make patience with your own snap judgments genuinely worthwhile.',
    ],
    quote: 'What you sense in the instant is often more reliable than what you\'d reason out later.',
  },
  '21-45': {
    paragraphs: [
      'The channel of Money links a drive for control over one\'s own domain (Gate 21) with a natural authority to gather people and resources around a shared material goal (Gate 45). It\'s a circuit for management — organizing what belongs to a group and directing it well.',
      'This channel works best when you\'re given (or you claim) a clear area of responsibility to run, rather than being micromanaged inside someone else\'s territory. When that autonomy is respected, you\'re a genuinely capable steward of resources, whether financial, material, or organizational.',
    ],
    quote: 'Give this channel a domain to run, and it will run it well.',
  },
  '23-43': {
    paragraphs: [
      'The channel of Structuring pairs a sudden, individual flash of insight (Gate 43) with the ability to translate that insight into language others can actually follow (Gate 23). The insight itself can feel obvious to you and completely foreign to everyone else — this channel bridges that gap.',
      'The real skill here is patience in translation: waiting until you\'ve found words simple and clear enough that your insight can actually land, rather than delivering it in a form only you understand. Done well, this channel turns individual genius into shared understanding.',
    ],
    quote: 'An insight only matters once someone else can understand it too.',
  },
  '24-61': {
    paragraphs: [
      'The channel of Awareness connects a mind that circles a question rationally (Gate 24) with a deep, internal pressure to know the unknowable (Gate 61). Together they form a circuit of genuine, repeated mental digging — returning to the same mystery until it finally resolves.',
      'This isn\'t idle overthinking; it\'s a real process of rational thought slowly catching up to an intuitive inner truth. Give yourself permission to sit with a question across multiple passes rather than expecting instant clarity — the answer tends to arrive on its own schedule.',
    ],
    quote: 'The mystery isn\'t rushed — it resolves on its own timeline.',
  },
  '25-51': {
    paragraphs: [
      'The channel of Initiation pairs universal, unconditional love (Gate 25) with the shock and challenge that spark real growth (Gate 51). This circuit suggests that love, for you, is tested and proven through hardship rather than shielded from it.',
      'Difficult, even shocking experiences aren\'t simply obstacles in this channel — they\'re initiations, moments that ask you to meet challenge directly and come out the other side more fully yourself. That resilience, once built, becomes a genuine source of inspiration for others facing their own trials.',
    ],
    quote: 'What nearly knocks you down is often what wakes you up.',
  },
  '26-44': {
    paragraphs: [
      'The channel of Surrender connects a talent for confident, persuasive presentation (Gate 26) with an instinctive sense for what has worked before and who can be trusted with it (Gate 44). It\'s a circuit built for marketing, sales, and preserving what\'s proven — not through pressure, but through quiet trust.',
      'You\'re skilled at reading a person or a pattern and knowing what to do with that information, often before you can fully explain why. The "surrender" in this channel\'s name points to trusting that instinct rather than over-engineering the pitch.',
    ],
    quote: 'Trust what has already proven itself — and trust your read on who to share it with.',
  },
  '27-50': {
    paragraphs: [
      'The channel of Preservation links instinctive caretaking (Gate 27) with a strong sense of the values and principles that keep a community healthy (Gate 50). Together they form a circuit built around responsible nurturing — care that is genuinely accountable, not just generous.',
      'You feel a real pull to look after others, but this channel also holds you (and the people you care for) to a standard: care that violates a core principle isn\'t actually care. That balance of warmth and accountability is what makes your support trustworthy.',
    ],
    quote: 'Real care holds a standard — it doesn\'t just give unconditionally.',
  },
  '28-38': {
    paragraphs: [
      'The channel of Struggle connects a search for what makes life worth the risk (Gate 28) with the willpower to fight for what genuinely matters (Gate 38). Struggle, in this channel, isn\'t a sign something has gone wrong — it\'s where purpose actually gets found.',
      'You\'re built to test whether something is worth committing to by seeing what you\'re willing to fight for. A life with no resistance at all can leave this channel feeling adrift; a cause or commitment worth real effort is what brings it fully alive.',
    ],
    quote: 'You find out what matters by discovering what you\'re willing to fight for.',
  },
  '29-46': {
    paragraphs: [
      'The channel of Discovery pairs a capacity for total commitment (Gate 29) with a deep, embodied love of simply being alive in a physical form (Gate 46). This circuit is built for saying yes to experience fully, then discovering along the way — sometimes unexpectedly — that it was worth it.',
      'Commitment here isn\'t calculated in advance; it\'s given first, and the payoff is often found in the actual living of it rather than in any guarantee beforehand. Being in the right place, physically and literally, tends to matter more for you than most other gates.',
    ],
    quote: 'Say yes first — the discovery of why comes later.',
  },
  '30-41': {
    paragraphs: [
      'The channel of Recognition connects a desire for new, intense experience (Gate 30) with the initial, quiet spark of imagination that starts every new cycle (Gate 41). Together they generate a steady stream of feeling and fantasy about what could be — the fuel for the next chapter before it exists.',
      'This channel can generate genuine restlessness if the desires it produces aren\'t eventually given somewhere real to go. Recognizing which longings are worth acting on — and which are simply part of this circuit\'s natural churn — is the ongoing work.',
    ],
    quote: 'Not every longing needs to be chased — but every longing deserves to be noticed.',
  },
  '32-54': {
    paragraphs: [
      'The channel of Transformation links an instinct for what will actually last (Gate 32) with fierce ambition and drive (Gate 54). This circuit senses which efforts are built to endure and pushes hard to reach the position needed to make that lasting thing real.',
      'Status and advancement matter here, but not for their own sake — they matter because reaching the right position is often what\'s required to transform an idea into something durable. This channel is uncomfortable with stagnation and genuinely motivated by upward movement.',
    ],
    quote: 'Ambition, for you, is in service of something built to last.',
  },
  '34-57': {
    paragraphs: [
      'The channel of Power connects raw Sacral life-force (Gate 34) with instinctive, in-the-moment clarity (Gate 57). This is one of the most physically powerful combinations in the bodygraph — strength that is also precisely guided, rather than blind momentum.',
      'When your instinct and your energy are aligned, very little can outpace you, and your presence alone often has an effect on a room. The discipline this channel asks for is trusting the instinctive guidance rather than overriding it with force alone.',
    ],
    quote: 'Real power isn\'t just strength — it\'s strength that already knows where to go.',
  },
  '35-36': {
    paragraphs: [
      'The channel of Transitoriness pairs a hunger for new, varied experience (Gate 35) with an emotional willingness to go through turbulent or crisis moments in pursuit of it (Gate 36). This is a circuit built for change — even change that comes with some emotional weather attached.',
      'Novelty and variety genuinely feed you, and a certain amount of emotional intensity along the way isn\'t a red flag so much as part of the process. The lesson this channel often teaches is that experience itself is the reward, regardless of how smoothly it goes.',
    ],
    quote: 'The experience was worth having, even the turbulent parts.',
  },
  '37-40': {
    paragraphs: [
      'The channel of Community connects a need for warmth, agreement, and belonging (Gate 37) with the willpower to work hard for the people you\'ve committed to (Gate 40). Together they form a circuit built on reciprocity — loyalty and effort exchanged in both directions within family or community.',
      'This bond works best when the give-and-take stays balanced; resentment tends to creep in if one side is doing all the giving. When the exchange is mutual, though, this channel produces some of the most genuinely loyal, dependable relationships in the whole bodygraph.',
    ],
    quote: 'Belonging here is a trade — loyalty given, and loyalty returned.',
  },
  '39-55': {
    paragraphs: [
      'The channel of Emoting pairs a provocative energy that tests others\' spirits (Gate 39) with a wide emotional wave capable of real depth, including sorrow (Gate 55). This circuit isn\'t about staying comfortable — it\'s about stirring genuine feeling, in yourself and in others.',
      'Emotional highs and lows are simply part of how this channel operates, and trying to flatten them out usually backfires. What this circuit is actually looking for is spirit — an authentic emotional response that proves something real is being felt, not performed.',
    ],
    quote: 'The mood swings aren\'t the problem — numbness would be.',
  },
  '42-53': {
    paragraphs: [
      'The channel of Maturation connects the drive to complete a cycle fully (Gate 42) with the initial spark and pressure to begin a new one (Gate 53). Together they describe a rhythm of starting, growing, and finishing — over and over, each cycle building real, cumulative experience.',
      'Cutting a cycle short before it\'s matured tends to leave you with restless, unfinished energy; letting a cycle run its full course, on the other hand, produces genuine growth you carry into the next beginning. Patience with process is this channel\'s real lesson.',
    ],
    quote: 'Every ending here is really just the maturity the next beginning needed.',
  },
  '47-64': {
    paragraphs: [
      'The channel of Abstraction pairs a mind full of impressions from the past (Gate 64) with the pressure to make sense of them and answer the questions they raise (Gate 47). It\'s a circuit built for working through confusion until it resolves — often suddenly — into genuine understanding.',
      'The mental static this channel produces isn\'t a malfunction; it\'s the raw material of insight, and it typically needs time and a bit of mental wandering before it clicks into place. Trying to force clarity too early usually just prolongs the confusion.',
    ],
    quote: 'Confusion here isn\'t the opposite of insight — it\'s the beginning of it.',
  },
};

// Short original blurbs for the 5 definition types.
export const DEFINITION_INFO = {
  'No Definition': {
    summary:
      'With no centers consistently defined, energy and identity move with whoever and wherever you are, rather than from a fixed internal pattern. This is the Reflector signature — a life built around sampling and reflecting the world, on the timing of the lunar cycle rather than any inner constant.',
    paragraphs: [
      'With No Definition, none of your nine centers are consistently "on" — every one of them is open, taking in and amplifying whatever is present in your environment and the people around you. Rather than a fixed internal engine, you move through the world as a highly sensitive mirror, and your experience of yourself can shift dramatically depending on where you are and who you\'re with.',
      'This makes you unusually good at reading the health of a group, a relationship, or an environment, since you register it directly rather than filtering it through a fixed identity. The trade-off is that big decisions rarely feel clear in the moment — they genuinely need time, often a full lunar cycle of about 28 days, to be tested against different people and places before the right answer settles. Surrounding yourself with the right environment matters more for you than for any other definition type.',
    ],
  },
  'Single Definition': {
    summary:
      'All of your defined centers connect into one continuous circuit. There is a consistent, self-contained way you operate — what you feel and know internally is reliably available to you without needing another person present to complete it.',
    paragraphs: [
      'A Single Definition means every one of your defined centers connects into one unbroken circuit — your whole system functions as a single unit. Energy moves freely from one part of your design to another without interruption, which gives you unusually direct access to your own knowing: what you feel, sense, or decide internally tends to be reliably available on your own, without needing someone else present to complete the picture.',
      'Because your circuitry is already whole, you\'re naturally more self-contained than other definition types, and you can usually work through a challenge using your own internal resources rather than needing to borrow someone else\'s energy to feel settled. The flip side is that cooperation can be an acquired taste — since you rarely feel incomplete on your own, seeking others out doesn\'t always come automatically, even in situations where collaborating would genuinely add something you couldn\'t reach alone.',
    ],
  },
  'Split Definition': {
    summary:
      'Your defined centers form two separate circuits that are not directly connected to each other. There can be a felt sense of something missing or a bridge to find — often satisfied by certain other people whose own design happens to connect the gap, which is part of why some relationships feel unusually easy.',
    paragraphs: [
      'A Split Definition means your defined centers form two separate circuits with a genuine gap between them — nothing in your own design directly bridges the two. Energy and awareness flow smoothly within each circuit, but not across the divide, which often shows up as a subtle, hard-to-name sense that something is missing, even though both halves of your design are fully functional on their own.',
      'This gap is exactly what makes certain people feel unusually easy to be around: someone whose own gates happen to bridge your split can complete the circuit temporarily, and the resulting sense of "click" is a real, mechanical effect rather than just chemistry. It\'s worth remembering that the bridge is a bonus, not a requirement — you\'re whole and functional without it, but it explains why some connections feel disproportionately significant.',
    ],
  },
  'Triple Split Definition': {
    summary:
      'Your defined centers form three separate circuits. More connecting points are open, which can mean more variability in who and what completes you, and a wider range of people who can bridge the gaps between your circuits.',
    paragraphs: [
      'A Triple Split Definition spreads your defined centers across three separate circuits instead of one or two, which means there are more open connection points where outside energy can bridge the gaps. This tends to bring a broader, more varied set of interests and capabilities, since each circuit can develop somewhat independently of the others.',
      'With three circuits to potentially bridge, you may find that different people complete different parts of you — one relationship bridges one gap, another relationship bridges a different one — rather than any single person needing to complete the whole picture. That variety can be enriching, but it also means your sense of "who completes me" is genuinely more complex, and it\'s worth not expecting any one relationship to close every gap at once.',
    ],
  },
  'Quadruple Split Definition': {
    summary:
      'Your defined centers form four separate circuits — the most distributed definition pattern. This tends to come with a wide range of interests and capabilities, along with a real need for a diverse circle of people to bridge the several gaps in the design.',
    paragraphs: [
      'A Quadruple Split Definition is the most distributed pattern possible — your defined centers form four completely separate circuits, each functioning on its own. This is a rare configuration, and it tends to come with a genuinely wide range of interests, skills, and even personas, since each circuit can express itself somewhat independently of the others.',
      'Because there are four separate circuits with gaps between them, no single relationship is ever likely to bridge everything — you\'re built for a diverse circle of people rather than one completing partner. A varied social and professional network isn\'t just enjoyable for you, it\'s closer to a genuine structural need, since different people will naturally end up bridging different parts of your design.',
    ],
  },
};
