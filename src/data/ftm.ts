// FTM Module 1 of 8 — Feedback Delivery
// A fully-built sample module demonstrating the FTM program's production quality

export type FtmSlide = {
  id: string;
  index: number;
  type: "title" | "concept" | "framework" | "example" | "practice" | "summary";
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  visual?: {
    kind: "framework" | "matrix" | "timeline" | "quote";
    data: Record<string, any>;
  };
  speakerNotes: string;
};

export const ftmSlides: FtmSlide[] = [
  {
    id: "s1",
    index: 1,
    type: "title",
    title: "Feedback Delivery",
    subtitle: "FTM Module 1 of 8 · 90 minutes live + 30 min async practice",
    body: "The single highest-leverage skill a new manager can build. Get this right and 80% of management pain disappears.",
    speakerNotes:
      "Open with: 'How many of you have received feedback in the last 30 days that changed your behavior?' Count hands. Then: 'How many of you have given feedback that changed someone's behavior?' Count hands. The gap is what we're here to close.",
  },
  {
    id: "s2",
    index: 2,
    type: "concept",
    title: "Why Feedback Is the Manager's Job",
    subtitle: "If you take one thing from this module, take this.",
    body: "Feedback is not a periodic event. It is the operating rhythm of management. A manager who gives feedback only in formal reviews is, functionally, a manager who doesn't manage — they administer. The teams with the highest engagement scores at RZR will be the ones where feedback flows daily, in both directions, without ceremony.",
    bullets: [
      "Engagement data (Lattice quarterly pulse) correlates more strongly with feedback frequency than with compensation percentile.",
      "Managers who delay feedback > 7 days after observing behavior report 3x more 'surprise' reactions from direct reports at review time.",
      "The cost of NOT giving feedback compounds — small behaviors become patterns, patterns become reputations, reputations become review scores.",
    ],
    speakerNotes:
      "Pause after the third bullet. Ask: 'What's a behavior you've observed in a report this week that you haven't given feedback on yet?' They don't have to share — but the question primes the next slide.",
  },
  {
    id: "s3",
    index: 3,
    type: "framework",
    title: "The SBI-I Framework",
    subtitle: "Situation · Behavior · Impact · Inquiry",
    body: "Adapted from the Center for Creative Leadership's SBI model, with a fourth step (Inquiry) added because feedback that doesn't invite a response isn't feedback — it's a verdict.",
    visual: {
      kind: "framework",
      data: {
        steps: [
          {
            letter: "S",
            word: "Situation",
            question: "When and where did this happen?",
            example: "'In yesterday's sprint review, when you presented the API migration plan...'",
          },
          {
            letter: "B",
            word: "Behavior",
            question: "What specifically did you observe?",
            example: "'...you opened with three slides of architectural context before showing the timeline...'",
          },
          {
            letter: "I",
            word: "Impact",
            question: "What was the consequence?",
            example: "'...and the CTO cut you off at minute 4 to ask about risk, which derailed the rest of your narrative.'",
          },
          {
            letter: "I",
            word: "Inquiry",
            question: "What's your read? What's the context I'm missing?",
            example: "'How did you experience that? Was there a reason to lead with architecture first?'",
          },
        ],
      },
    },
    speakerNotes:
      "The Inquiry step is where 90% of new managers fail. They deliver SBI as a verdict and stop. The Inquiry is what converts feedback from judgment into dialogue — and dialogue is what makes feedback land.",
  },
  {
    id: "s4",
    index: 4,
    type: "matrix",
    title: "Timing & Channel — When and How",
    subtitle: "The same feedback delivered in the wrong channel or at the wrong time becomes a different message.",
    body: "Match the channel to the emotional weight of the feedback. A mismatch either direction is corrosive — public praise is great; public criticism is a violation. Asynchronous feedback for nuanced performance issues signals you don't want the hard conversation.",
    visual: {
      kind: "matrix",
      data: {
        rows: [
          { weight: "Light (praise, small wins)", timing: "Within 24 hrs", channel: "Async (Slack/Notion)", why: "Velocity > ceremony. Public praise amplifies." },
          { weight: "Medium (process correction)", timing: "Within 48 hrs", channel: "1:1 sync, in-person or video", why: "Tone matters; dialogue matters." },
          { weight: "Heavy (behavior pattern)", timing: "Within 1 week", channel: "1:1 sync, video on, no distractions", why: "Eye contact and pacing are non-negotiable." },
          { weight: "Critical (values violation)", timing: "Same day", channel: "In-person if at all possible", why: "Severity must be felt, not read." },
        ],
      },
    },
    speakerNotes:
      "Common failure mode: new managers default to async for medium-weight feedback because it feels safer. It isn't — it just delays the conflict and signals avoidance. Practice saying the hard thing out loud in 1:1.",
  },
  {
    id: "s5",
    index: 5,
    type: "example",
    title: "Worked Example — The Missed Deadline",
    subtitle: "Watch for: the four SBI-I steps, the timing choice, and the Inquiry that opens dialogue.",
    body: "Context: Priya, a Senior Engineer in your team, missed a critical deadline for the second sprint in a row. The first miss was discussed in retro; this is the second. You've scheduled a 1:1 for Thursday morning.",
    bullets: [
      "S: 'Priya, in the sprint that closed Tuesday, the API migration plan was due Monday EOD and came in Wednesday morning.'",
      "B: 'This is the second sprint in a row where the deliverable has slipped by 24-48 hours. The pattern, not just this instance, is what I want to talk about.'",
      "I: 'When the plan slips, downstream teams (QA, Docs) lose a day, and the CTO starts asking me whether we need to re-plan the quarter. That's a credibility cost to you and to me.'",
      "I (Inquiry): 'What's going on from your side? Is the scope wrong, is the estimate wrong, is something else consuming your time? I'd rather know now than guess.'",
    ],
    speakerNotes:
      "After reading the example aloud, ask the cohort: 'What would Priya most likely say in response?' List 3-4 possibilities on the whiteboard. Then ask: 'How does the manager's next move change based on each response?' This is the muscle we're building.",
  },
  {
    id: "s6",
    index: 6,
    type: "practice",
    title: "Practice — AI Persona Role-Play",
    subtitle: "20 minutes · Pairs · One play-through each direction",
    body: "Each pair takes turns playing the manager giving feedback and a 'resistant direct report' AI persona. Use the AI persona simulation tool linked in the Notion FTM workspace. The persona will be one of three archetypes: Deflective (changes subject), Defensive (justifies), or Receptive (over-apologizes).",
    bullets: [
      "Round 1 (10 min): Manager A gives feedback to Manager B playing the 'Deflective' persona. Manager B then gives 60 seconds of peer coaching.",
      "Round 2 (10 min): Switch. Manager B gives feedback to Manager A playing the 'Defensive' persona. Manager A then gives 60 seconds of peer coaching.",
      "Debrief (10 min): In the main room, each pair shares one thing that surprised them. Facilitator captures patterns on the whiteboard.",
    ],
    speakerNotes:
      "Walk between pairs during practice. The most common failure: managers skip the Inquiry step entirely because the persona's resistance feels like a 'no.' Inquiry is most important precisely when the other person is resistant — that's where the real conversation lives.",
  },
  {
    id: "s7",
    index: 7,
    type: "summary",
    title: "What You Walk Away With",
    subtitle: "Three commitments before our next session",
    body: "Feedback is a skill, and skills are built through reps. Between now and Module 2 (next week), commit to the following three reps. We'll open Module 2 by hearing how each of these went.",
    bullets: [
      "Rep 1: Give one piece of light-weight praise within 24 hours of observing the behavior. Async is fine.",
      "Rep 2: Give one piece of medium-weight process feedback in a 1:1, using full SBI-I. Note the direct report's response.",
      "Rep 3: Ask one direct report for upward feedback on something you did this week. Use SBI-I yourself when receiving it.",
    ],
    speakerNotes:
      "Close with: 'Next week we'll cover Module 2 — Performance Conversations. The throughline is the same: structure (SBI-I), timing (matched to weight), and Inquiry (always). If you remember nothing else from today, remember that feedback without Inquiry is a verdict. RZR managers don't deliver verdicts; they have conversations.'",
  },
];

// L1 Reaction Survey — post-session
export type L1Question = {
  id: string;
  text: string;
  type: "rating" | "open";
  scale?: { min: number; max: number; labels: [string, string] };
};

export const l1Survey: L1Question[] = [
  {
    id: "l1_q1",
    text: "The session met my expectations.",
    type: "rating",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Strongly agree"] },
  },
  {
    id: "l1_q2",
    text: "The SBI-I framework is something I can apply this week.",
    type: "rating",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Strongly agree"] },
  },
  {
    id: "l1_q3",
    text: "The AI persona practice was a useful use of time.",
    type: "rating",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Strongly agree"] },
  },
  {
    id: "l1_q4",
    text: "The facilitator created psychological safety for practice.",
    type: "rating",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Strongly agree"] },
  },
  {
    id: "l1_q5",
    text: "What's one thing from today you'll apply in the next 7 days?",
    type: "open",
  },
  {
    id: "l1_q6",
    text: "What's one thing that would have made this session better?",
    type: "open",
  },
];

// L2 Knowledge Check — pre/post
export type L2Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const l2KnowledgeCheck: L2Question[] = [
  {
    id: "l2_q1",
    question: "In the SBI-I framework, what does the second 'I' (Inquiry) specifically refer to?",
    options: [
      "Issuing an instruction to the direct report about what to fix.",
      "Asking the direct report for their read on the situation and what context you might be missing.",
      "Indicating the timeline by which the behavior must change.",
      "Inventorying the direct report's past instances of the same behavior.",
    ],
    correctIndex: 1,
    explanation:
      "Inquiry is the fourth step — asking the direct report for their perspective. This converts feedback from a verdict into a dialogue.",
  },
  {
    id: "l2_q2",
    question:
      "A direct report missed a deadline for the second sprint in a row. What's the appropriate channel and timing for the feedback?",
    options: [
      "Async Slack message within 24 hours — keeps it lightweight.",
      "1:1 sync within 1 week — this is a behavior pattern (heavy), and tone + dialogue matter.",
      "Wait until the quarterly review — patterns are best addressed formally.",
      "Public Slack channel within 24 hours — transparency is important.",
    ],
    correctIndex: 1,
    explanation:
      "A repeated behavior pattern is 'heavy' feedback. It warrants a 1:1 sync (video on, no distractions) within 1 week. Async is for light-weight praise; public channels are never appropriate for correction.",
  },
  {
    id: "l2_q3",
    question:
      "Which of the following is the most common failure mode for new managers using SBI-I?",
    options: [
      "Spending too much time on the Situation step.",
      "Skipping the Inquiry step and treating the feedback as a verdict.",
      "Using too many specific examples in the Behavior step.",
      "Waiting too long after the behavior to deliver feedback.",
    ],
    correctIndex: 1,
    explanation:
      "90% of new managers fail at the Inquiry step. They deliver SBI as a verdict and stop. Inquiry is what makes feedback land.",
  },
  {
    id: "l2_q4",
    question:
      "A direct report reacts defensively to your feedback. What's the most effective response?",
    options: [
      "Repeat your original point more firmly to ensure they heard it.",
      "End the conversation — defensiveness means they're not ready to receive feedback.",
      "Stay in Inquiry: 'Help me understand what feels unfair about what I just said.' Defense often signals missing context.",
      "Escalate to HR — defensive reactions are a conduct issue.",
    ],
    correctIndex: 2,
    explanation:
      "Defense usually signals missing context or a felt unfairness. Staying in Inquiry surfaces that context. Repeating yourself or escalating will shut down the conversation permanently.",
  },
  {
    id: "l2_q5",
    question: "What's the relationship between feedback frequency and engagement?",
    options: [
      "No relationship — engagement is driven by compensation.",
      "Negative relationship — frequent feedback feels like micromanagement and lowers engagement.",
      "Positive correlation — engagement correlates more strongly with feedback frequency than with compensation percentile.",
      "Inverted-U — engagement peaks at quarterly feedback, lower on either side.",
    ],
    correctIndex: 2,
    explanation:
      "Engagement data correlates more strongly with feedback frequency than with compensation percentile. Feedback is the operating rhythm of management.",
  },
];

export const ftmModuleStats = [
  { label: "Duration", value: "90 min", sublabel: "+ 30 min async" },
  { label: "Cohort size", value: "8–12", sublabel: "First-time managers" },
  { label: "L1 target", value: "≥ 4.0/5", sublabel: "Post-session" },
  { label: "L2 target", value: "≥ 25%", sublabel: "Pre→post uplift" },
];
