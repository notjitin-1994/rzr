// FTM Module 1 of 8 — Feedback Delivery
// Master ID Revamp: Expanded facilitator notes, split dense slides, stock imagery support

export type FtmSlide = {
  id: string;
  index: number;
  type: "title" | "concept" | "framework" | "example" | "practice" | "summary" | "deep-dive";
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  visual?: {
    kind: "framework" | "matrix" | "timeline" | "quote" | "infographic" | "stats";
    data: Record<string, any>;
  };
  icon?: string;
  /** Optional stock photo background for visual richness */
  backgroundImage?: string;
  facilitatorNotes: {
    opening?: string;
    timing: string;
    engagement: string[];
    debrief?: string[];
    transfer?: string;
    psychologicalSafety?: string;
    commonFailures?: string[];
  };
};

const MINT = "#00BDA5";
const INK = "#0F0A14";

export const ftmSlides: FtmSlide[] = [
  {
    id: "s1",
    index: 1,
    type: "title",
    title: "Feedback Delivery",
    subtitle: "FTM Module 1 of 8 · 90 minutes live + 30 min async practice",
    body: "The single highest-leverage skill a new manager can build. Get this right and 80% of management pain disappears.",
    icon: "MessageSquare",
    backgroundImage: "https://picsum.photos/seed/leadership-feedback/1920/1080",
    facilitatorNotes: {
      opening:
        "Welcome to Module 1 of the First-Time Manager program. Before we dive in, I want to ground us in why this matters. Feedback isn't a 'nice to have' — it's the operating system of management.",
      timing: "5 minutes",
      engagement: [
        "Ask: 'Raise your hand if you've received feedback in the last 30 days that actually changed how you work.' (Count hands, acknowledge the number)",
        "Follow-up: 'Now raise your hand if you've given feedback that changed someone's behavior.' (Count again)",
        "Bridge: 'Notice the gap? That gap is what we're here to close. By the end of today, you'll have a framework and practice that closes it.'",
      ],
      psychologicalSafety:
        "Set the tone early: 'This is a practice space. We're going to try things, get them wrong, and learn. There's no judgment here — only reps.'",
    },
  },
  {
    id: "s2",
    index: 2,
    type: "concept",
    title: "Why Feedback Is the Manager's Job",
    subtitle: "If you take one thing from this module, take this.",
    body: "Feedback is not a periodic event. It is the operating rhythm of management. A manager who gives feedback only in formal reviews is, functionally, a manager who doesn't manage.",
    icon: "TrendingUp",
    visual: {
      kind: "stats",
      data: {
        metrics: [
          { value: "3x", label: "More surprise reactions", context: "when feedback delayed >7 days" },
          { value: "80%", label: "Management pain solved", context: "with strong feedback skills" },
          { value: "24h", label: "Ideal feedback window", context: "for lightweight praise" },
        ],
      },
    },
    backgroundImage: "https://picsum.photos/seed/manager-growth/1920/1080",
    facilitatorNotes: {
      timing: "10 minutes",
      engagement: [
        "After bullet 1: 'Think about your own experience. When was the last time feedback actually changed your behavior? What made it land?'",
        "After bullet 2: 'What's the longest you've waited to give feedback? What happened?'",
        "After bullet 3: Pause and let it sink. Then ask: 'What's a behavior you've observed in a direct report this week that you haven't given feedback on yet?'",
      ],
      debrief: [
        "Key insight: Feedback frequency beats compensation as an engagement driver",
        "Common myth busted: 'I don't want to micromanage' — feedback isn't micromanagement, it's management",
      ],
      transfer:
        "Before our next session, identify one behavior you've been avoiding giving feedback on. We'll use it in practice.",
      psychologicalSafety:
        "Acknowledge the fear: 'Giving feedback feels risky. We're going to build the muscle so it feels less risky over time.'",
    },
  },
  {
    id: "s3",
    index: 3,
    type: "framework",
    title: "The SBI-I Framework",
    subtitle: "Situation · Behavior · Impact · Inquiry",
    body: "Adapted from the Center for Creative Leadership's SBI model, with a fourth step (Inquiry) added because feedback that doesn't invite a response isn't feedback — it's a verdict.",
    icon: "Layers",
    visual: {
      kind: "framework",
      data: {
        steps: [
          {
            letter: "S",
            word: "Situation",
            question: "When and where did this happen?",
            example: "'In yesterday's sprint review, when you presented the API migration plan...'",
            tip: "Be specific about time and context",
          },
          {
            letter: "B",
            word: "Behavior",
            question: "What specifically did you observe?",
            example: "'...you opened with three slides of architectural context before showing the timeline...'",
            tip: "Describe what you saw/heard, not intent",
          },
          {
            letter: "I",
            word: "Impact",
            question: "What was the consequence?",
            example: "'...the CTO cut you off at minute 4 to ask about risk, which derailed the rest of your narrative.'",
            tip: "Connect behavior to business outcome",
          },
          {
            letter: "I",
            word: "Inquiry",
            question: "What's your read? What's the context I'm missing?",
            example: "'How did you experience that? Is there a reason you led with architecture first?'",
            tip: "This is where 90% of managers fail — don't skip it",
          },
        ],
      },
    },
    facilitatorNotes: {
      timing: "15 minutes",
      engagement: [
        "Walk through each letter slowly. After each one, ask: 'What's the difference between this step and the previous one?'",
        "Emphasize Inquiry: 'This is the step that converts feedback from judgment into dialogue.'",
        "Ask: 'Which step do you think is hardest? Which would you skip?'",
      ],
      debrief: [
        "SBI without I = verdict (tells them what to think)",
        "SBI-I = dialogue (invites their perspective)",
        "The Inquiry step is where learning happens — for both of you",
      ],
      transfer:
        "This week, use SBI-I for at least one piece of feedback. Write down what happened at the Inquiry step.",
      commonFailures: [
        "Skipping Inquiry entirely (most common)",
        "Using judgment language in Behavior ('you were lazy' vs 'you missed the deadline')",
      ],
      psychologicalSafety:
        "Normalize the difficulty: 'Inquiry feels vulnerable because you're admitting you might be wrong. That's the point.'",
    },
  },
  {
    id: "s4",
    index: 4,
    type: "deep-dive",
    title: "Inquiry: The Step Most Managers Skip",
    subtitle: "Without Inquiry, SBI is a verdict. With it, it's a conversation.",
    icon: "MessageCircle",
    visual: {
      kind: "stats",
      data: {
        metrics: [
          { value: "90%", label: "Skip Inquiry", context: "on first attempt" },
          { value: "40%", label: "Fewer defensive reactions", context: "when Inquiry is used" },
          { value: "1", label: "Question changes everything", context: "'What's your read?'" },
        ],
      },
    },
    backgroundImage: "https://picsum.photos/seed/conversation-dialogue/1920/1080",
    facilitatorNotes: {
      timing: "8 minutes",
      engagement: [
        "Ask: 'What's the risk of skipping Inquiry? What message does it send?'",
        "Share: 'The hardest Inquiry moments are when you're SURE you're right. That's when you need it most.'",
        "Ask: 'Has anyone experienced feedback without Inquiry? What did that feel like?'",
      ],
      debrief: [
        "Inquiry is not weakness — it's curiosity",
        "Resistance is a signal, not a barrier",
        "If you remember only one thing: feedback without Inquiry is a verdict",
      ],
      psychologicalSafety:
        "Validate the fear: 'Inquiry feels vulnerable because you're admitting there might be context you don't have. That vulnerability builds trust.'",
    },
  },
  {
    id: "s5",
    index: 5,
    type: "matrix",
    title: "Timing & Channel — When and How",
    subtitle: "Match the channel to the emotional weight of the feedback.",
    body: "The same feedback delivered in the wrong channel becomes a different message. Public praise is great — public criticism is a violation. Async for nuanced performance issues signals you don't want the hard conversation.",
    icon: "Clock",
    visual: {
      kind: "matrix",
      data: {
        rows: [
          {
            weight: "Light",
            examples: "Praise, small wins",
            timing: "Within 24 hrs",
            channel: "Async (Slack/Notion)",
            why: "Velocity > ceremony. Public praise amplifies.",
            color: "mint",
          },
          {
            weight: "Medium",
            examples: "Process correction",
            timing: "Within 48 hrs",
            channel: "1:1 sync, video/IRL",
            why: "Tone matters; dialogue matters.",
            color: "yellow",
          },
          {
            weight: "Heavy",
            examples: "Behavior pattern",
            timing: "Within 1 week",
            channel: "1:1 sync, video on",
            why: "Eye contact and pacing are non-negotiable.",
            color: "orange",
          },
          {
            weight: "Critical",
            examples: "Values violation",
            timing: "Same day",
            channel: "In-person if possible",
            why: "Severity must be felt, not read.",
            color: "red",
          },
        ],
      },
    },
    facilitatorNotes: {
      timing: "12 minutes",
      engagement: [
        "Ask: 'What's the worst channel mismatch you've experienced?' (Let 2-3 people share)",
        "Probe: 'Why do managers default to async for heavy feedback?' (Answer: it feels safer, but it's not)",
        "Challenge: 'If you're avoiding the hard conversation by going async, what are you really saying to your direct report?'",
      ],
      debrief: [
        "Light feedback = speed matters (async is fine)",
        "Heavy feedback = dialogue matters (sync is required)",
        "Critical feedback = presence matters (in-person if possible)",
      ],
      transfer:
        "Audit your last 5 pieces of feedback. Were the channels matched to the weight? What would you do differently?",
      commonFailures: [
        "Defaulting to async for medium/heavy feedback (avoidance)",
        "Giving critical feedback in public (violation of trust)",
        "Waiting too long for heavy feedback (letting it compound)",
      ],
    },
  },
  {
    id: "s6",
    index: 6,
    type: "example",
    title: "Worked Example — The Missed Deadline",
    subtitle: "SBI-I in action. Priya, Senior Engineer, missed a critical deadline for the second sprint.",
    body: "Context: You're the manager. Priya missed the same deadline type for the second sprint running. You've scheduled a 1:1 for Thursday morning — matching the weight (heavy) to the channel (sync).",
    icon: "FileText",
    backgroundImage: "https://picsum.photos/seed/presentation-meeting/1920/1080",
    visual: {
      kind: "timeline",
      data: {
        events: [
          { label: "Sprint 1", detail: "First miss, discussed in retro — treated as one-off", status: "past" },
          { label: "Sprint 2", detail: "Second miss — pattern emerges, needs structured feedback", status: "current" },
          { label: "1:1 Thursday", detail: "Heavy feedback using full SBI-I framework", status: "action" },
        ],
      },
    },
    facilitatorNotes: {
      timing: "12 minutes",
      engagement: [
        "Read the SBI-I example aloud slowly. After each step, ask: 'What did you notice about that step?'",
        "After: 'What would Priya most likely say in response?' (List 3-4 possibilities on whiteboard)",
        "Follow-up: 'How does the manager's next move change based on each response?'",
      ],
      debrief: [
        "Notice the timing: 1:1 sync within 1 week — correctly matched to weight",
        "Behavior step focuses on pattern ('second sprint'), not just the instance",
        "Inquiry opens dialogue rather than assuming cause",
      ],
      transfer:
        "Think of a real situation from your team. Draft an SBI-I statement for it.",
      commonFailures: [
        "Focusing on the instance instead of the pattern",
        "Skipping Inquiry when the behavior seems 'obvious'",
        "Using judgment language ('you're unreliable') instead of behavior ('the deadline slipped')",
      ],
    },
  },
  {
    id: "s7",
    index: 7,
    type: "practice",
    title: "Practice — AI Persona Role-Play",
    subtitle: "20 minutes · Pairs · One play-through each direction",
    body: "Each pair takes turns playing manager and direct report. Use the AI persona simulation tool linked in Notion. Three archetypes challenge different muscle groups.",
    icon: "Users",
    visual: {
      kind: "infographic",
      data: {
        personas: [
          { name: "Deflective", behavior: "Changes subject, minimizes", challenge: "Stay on topic, return to Inquiry", icon: "ArrowRightLeft" },
          { name: "Defensive", behavior: "Justifies, pushes back", challenge: "Don't repeat yourself, stay curious", icon: "Shield" },
          { name: "Receptive", behavior: "Over-apologizes, agrees fast", challenge: "Probe deeper, ensure genuine understanding", icon: "Heart" },
        ],
      },
    },
    backgroundImage: "https://picsum.photos/seed/team-practice/1920/1080",
    facilitatorNotes: {
      timing: "30 minutes (20 min practice + 10 min debrief)",
      engagement: [
        "Before practice: 'The goal isn't to 'win.' The goal is to practice the framework and notice what happens at the Inquiry step.'",
        "During practice: Walk between pairs. Listen for Inquiry. Note common failures.",
        "After each round: 'What surprised you? What felt hard?'",
      ],
      debrief: [
        "Capture patterns on whiteboard: What happened at Inquiry?",
        "Key insight: 'Inquiry is most important precisely when the other person is resistant.'",
      ],
      transfer:
        "This week, notice when you skip Inquiry in real conversations. What triggers the skip?",
      commonFailures: [
        "Skipping Inquiry when persona is resistant (most common)",
        "Repeating the same SBI instead of asking questions",
      ],
      psychologicalSafety:
        "Frame practice as learning, not performance: 'The AI persona is a safe space to fail.'",
    },
  },
  {
    id: "s8",
    index: 8,
    type: "summary",
    title: "What You Walk Away With",
    subtitle: "Three commitments before our next session",
    body: "Feedback is a skill. Skills are built through reps. Complete these three between now and Module 2.",
    icon: "Target",
    visual: {
      kind: "infographic",
      data: {
        reps: [
          { number: 1, title: "Light Praise", timing: "Within 24h", channel: "Async", focus: "Speed and specificity" },
          { number: 2, title: "Process Feedback", timing: "Within 1 week", channel: "1:1 sync", focus: "Full SBI-I framework" },
          { number: 3, title: "Upward Feedback", timing: "This week", channel: "1:1 sync", focus: "Receiving with SBI-I" },
        ],
      },
    },
    backgroundImage: "https://picsum.photos/seed/commitment/1920/1080",
    facilitatorNotes: {
      timing: "8 minutes",
      engagement: [
        "Ask: 'Which rep feels easiest? Which feels hardest?'",
        "Challenge: 'Rep 3 is the hardest — it requires vulnerability. That's the point — feedback flows both ways.'",
        "Close: 'Next week: Performance Conversations. Same structure: SBI-I, timing, Inquiry. Always negotiate.'",
      ],
      debrief: [
        "Final message: 'If you remember nothing else: feedback without Inquiry is a verdict. RZR managers don't deliver verdicts — they have conversations.'",
        "Accountability: 'We'll open Module 2 by hearing how these reps went.'",
      ],
      transfer:
        "Complete all three reps before Module 2. Bring notes on what happened at the Inquiry step.",
      psychologicalSafety:
        "Normalize imperfection: 'You won't nail all three. That's fine. The goal is reps, not perfection.'",
    },
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
  { label: "Slides", value: "8", sublabel: "Expanded deck" },
  { label: "L2 target", value: "≥ 25%", sublabel: "Pre→post uplift" },
];