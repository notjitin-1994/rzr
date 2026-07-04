// FTM Module 1 of 8 — Feedback Delivery
// A fully-built sample module demonstrating the FTM program's production quality
// Master ID Revamp: Expanded facilitator notes with timing, engagement, debrief, and transfer

export type FtmSlide = {
  id: string;
  index: number;
  type: "title" | "concept" | "framework" | "example" | "practice" | "summary";
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  visual?: {
    kind: "framework" | "matrix" | "timeline" | "quote" | "infographic" | "stats";
    data: Record<string, any>;
  };
  icon?: string;
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

export const ftmSlides: FtmSlide[] = [
  {
    id: "s1",
    index: 1,
    type: "title",
    title: "Feedback Delivery",
    subtitle: "FTM Module 1 of 8 · 90 minutes live + 30 min async practice",
    body: "The single highest-leverage skill a new manager can build. Get this right and 80% of management pain disappears.",
    icon: "MessageSquare",
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
    body: "Feedback is not a periodic event. It is the operating rhythm of management. A manager who gives feedback only in formal reviews is, functionally, a manager who doesn't manage — they administer. The teams with the highest engagement scores at RZR will be the ones where feedback flows daily, in both directions, without ceremony.",
    bullets: [
      "Engagement data (Lattice quarterly pulse) correlates more strongly with feedback frequency than with compensation percentile.",
      "Managers who delay feedback > 7 days after observing behavior report 3x more 'surprise' reactions from direct reports at review time.",
      "The cost of NOT giving feedback compounds — small behaviors become patterns, patterns become reputations, reputations become review scores.",
    ],
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
    facilitatorNotes: {
      timing: "10 minutes",
      engagement: [
        "After bullet 1: 'Think about your own experience. When was the last time feedback actually changed your behavior? What made it land?'",
        "After bullet 2: 'What's the longest you've waited to give feedback? What happened?'",
        "After bullet 3: Pause and let it sink in. Then ask: 'What's a behavior you've observed in a direct report this week that you haven't given feedback on yet?' (They don't have to share — the question primes the next slide)",
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
            tip: "Describe what you saw/heard, not what you think they meant",
          },
          {
            letter: "I",
            word: "Impact",
            question: "What was the consequence?",
            example: "'...and the CTO cut you off at minute 4 to ask about risk, which derailed the rest of your narrative.'",
            tip: "Connect behavior to business or personal outcome",
          },
          {
            letter: "I",
            word: "Inquiry",
            question: "What's your read? What's the context I'm missing?",
            example: "'How did you experience that? Was there a reason to lead with architecture first?'",
            tip: "This is where 90% of managers fail — don't skip it",
          },
        ],
      },
    },
    facilitatorNotes: {
      timing: "15 minutes",
      engagement: [
        "Walk through each letter slowly. After each one, ask: 'What's the difference between this step and the previous one?'",
        "Emphasize Inquiry: 'This is the step that converts feedback from judgment into dialogue. Without it, you're delivering a verdict.'",
        "Ask: 'Which step do you think is hardest? Which do you think you'd skip?'",
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
        "Rushing through Situation/Behavior to get to the 'point'",
        "Using judgment language in Behavior ('you were lazy' vs 'you missed the deadline')",
      ],
      psychologicalSafety:
        "Normalize the difficulty: 'Inquiry feels vulnerable because you're admitting you might be wrong. That's the point — it's a dialogue, not a monologue.'",
    },
  },
  {
    id: "s4",
    index: 4,
    type: "matrix",
    title: "Timing & Channel — When and How",
    subtitle: "The same feedback delivered in the wrong channel or at the wrong time becomes a different message.",
    body: "Match the channel to the emotional weight of the feedback. A mismatch either direction is corrosive — public praise is great; public criticism is a violation. Asynchronous feedback for nuanced performance issues signals you don't want the hard conversation.",
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
            channel: "1:1 sync, in-person or video",
            why: "Tone matters; dialogue matters.",
            color: "yellow",
          },
          {
            weight: "Heavy",
            examples: "Behavior pattern",
            timing: "Within 1 week",
            channel: "1:1 sync, video on, no distractions",
            why: "Eye contact and pacing are non-negotiable.",
            color: "orange",
          },
          {
            weight: "Critical",
            examples: "Values violation",
            timing: "Same day",
            channel: "In-person if at all possible",
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
    id: "s5",
    index: 5,
    type: "example",
    title: "Worked Example — The Missed Deadline",
    subtitle: "Watch for: the four SBI-I steps, the timing choice, and the Inquiry that opens dialogue.",
    body: "Context: Priya, a Senior Engineer in your team, missed a critical deadline for the second sprint in a row. The first miss was discussed in retro; this is the second. You've scheduled a 1:1 for Thursday morning.",
    icon: "FileText",
    bullets: [
      "S: 'Priya, in the sprint that closed Tuesday, the API migration plan was due Monday EOD and came in Wednesday morning.'",
      "B: 'This is the second sprint in a row where the deliverable has slipped by 24-48 hours. The pattern, not just this instance, is what I want to talk about.'",
      "I: 'When the plan slips, downstream teams (QA, Docs) lose a day, and the CTO starts asking me whether we need to re-plan the quarter. That's a credibility cost to you and to me.'",
      "I (Inquiry): 'What's going on from your side? Is the scope wrong, is the estimate wrong, is something else consuming your time? I'd rather know now than guess.'",
    ],
    visual: {
      kind: "timeline",
      data: {
        events: [
          { label: "Sprint 1", detail: "First miss, discussed in retro", status: "past" },
          { label: "Sprint 2", detail: "Second miss, pattern emerging", status: "current" },
          { label: "1:1 Thursday", detail: "Heavy feedback, sync channel", status: "action" },
        ],
      },
    },
    facilitatorNotes: {
      timing: "10 minutes",
      engagement: [
        "Read the example aloud slowly. After each SBI-I step, pause and ask: 'What did you notice about that step?'",
        "After the full example: 'What would Priya most likely say in response?' (List 3-4 possibilities on whiteboard)",
        "Follow-up: 'How does the manager's next move change based on each response?' (This builds adaptive thinking)",
      ],
      debrief: [
        "Notice the timing: 1:1 sync within 1 week (heavy feedback)",
        "Notice the Behavior step: focuses on pattern, not just instance",
        "Notice the Inquiry: opens dialogue, doesn't assume cause",
      ],
      transfer:
        "Think of a real situation from your team. Draft an SBI-I statement for it. We'll use these in practice.",
      commonFailures: [
        "Focusing on the instance instead of the pattern",
        "Skipping Inquiry when the behavior seems 'obvious'",
        "Using judgment language ('you're unreliable') instead of behavior ('the deadline slipped')",
      ],
    },
  },
  {
    id: "s6",
    index: 6,
    type: "practice",
    title: "Practice — AI Persona Role-Play",
    subtitle: "20 minutes · Pairs · One play-through each direction",
    body: "Each pair takes turns playing the manager giving feedback and a 'resistant direct report' AI persona. Use the AI persona simulation tool linked in the Notion FTM workspace. The persona will be one of three archetypes: Deflective (changes subject), Defensive (justifies), or Receptive (over-apologizes).",
    icon: "Users",
    bullets: [
      "Round 1 (10 min): Manager A gives feedback to Manager B playing the 'Deflective' persona. Manager B then gives 60 seconds of peer coaching.",
      "Round 2 (10 min): Switch. Manager B gives feedback to Manager A playing the 'Defensive' persona. Manager A then gives 60 seconds of peer coaching.",
      "Debrief (10 min): In the main room, each pair shares one thing that surprised them. Facilitator captures patterns on the whiteboard.",
    ],
    visual: {
      kind: "infographic",
      data: {
        personas: [
          {
            name: "Deflective",
            behavior: "Changes subject, minimizes issue",
            challenge: "Stay on topic, return to Inquiry",
            icon: "ArrowRightLeft",
          },
          {
            name: "Defensive",
            behavior: "Justifies, explains, pushes back",
            challenge: "Don't repeat yourself, stay curious",
            icon: "Shield",
          },
          {
            name: "Receptive",
            behavior: "Over-apologizes, agrees too quickly",
            challenge: "Probe deeper, ensure genuine understanding",
            icon: "Heart",
          },
        ],
      },
    },
    facilitatorNotes: {
      timing: "30 minutes (20 min practice + 10 min debrief)",
      engagement: [
        "Before practice: 'The goal isn't to 'win' the conversation. The goal is to practice the framework and notice what happens at the Inquiry step.'",
        "During practice: Walk between pairs. Listen for Inquiry. Note common failures.",
        "After each round: 'What surprised you? What felt hard?'",
      ],
      debrief: [
        "Capture patterns on whiteboard: What happened at Inquiry? What personas were hardest?",
        "Key insight: 'Inquiry is most important precisely when the other person is resistant — that's where the real conversation lives.'",
        "Normalize the difficulty: 'If Inquiry felt hard, that's normal. It's a muscle we're building.'",
      ],
      transfer:
        "This week, notice when you skip Inquiry in real conversations. What triggers the skip? What would happen if you stayed in Inquiry?",
      commonFailures: [
        "Skipping Inquiry when persona is resistant (most common)",
        "Repeating the same SBI instead of asking questions",
        "Giving up too quickly when persona pushes back",
      ],
      psychologicalSafety:
        "Frame practice as learning, not performance: 'We're here to try things and get them wrong. The AI persona is a safe space to fail.'",
    },
  },
  {
    id: "s7",
    index: 7,
    type: "summary",
    title: "What You Walk Away With",
    subtitle: "Three commitments before our next session",
    body: "Feedback is a skill, and skills are built through reps. Between now and Module 2 (next week), commit to the following three reps. We'll open Module 2 by hearing how each of these went.",
    icon: "Target",
    bullets: [
      "Rep 1: Give one piece of light-weight praise within 24 hours of observing the behavior. Async is fine.",
      "Rep 2: Give one piece of medium-weight process feedback in a 1:1, using full SBI-I. Note the direct report's response.",
      "Rep 3: Ask one direct report for upward feedback on something you did this week. Use SBI-I yourself when receiving it.",
    ],
    visual: {
      kind: "infographic",
      data: {
        reps: [
          {
            number: 1,
            title: "Light Praise",
            timing: "Within 24h",
            channel: "Async",
            focus: "Speed and specificity",
          },
          {
            number: 2,
            title: "Process Feedback",
            timing: "Within 1 week",
            channel: "1:1 sync",
            focus: "Full SBI-I framework",
          },
          {
            number: 3,
            title: "Upward Feedback",
            timing: "This week",
            channel: "1:1 sync",
            focus: "Receiving with SBI-I",
          },
        ],
      },
    },
    facilitatorNotes: {
      timing: "8 minutes",
      engagement: [
        "Ask: 'Which rep feels easiest? Which feels hardest?' (Acknowledge the answers)",
        "Challenge: 'Rep 3 is the hardest because it requires vulnerability. That's the point — feedback flows both ways.'",
        "Close: 'Next week we'll cover Module 2 — Performance Conversations. The throughline is the same: structure (SBI-I), timing (matched to weight), and Inquiry (always).'",
      ],
      debrief: [
        "Key message: 'If you remember nothing else from today, remember that feedback without Inquiry is a verdict. RZR managers don't deliver verdicts; they have conversations.'",
        "Accountability: 'We'll open Module 2 by hearing how these reps went. Come prepared to share.'",
      ],
      transfer:
        "Complete all three reps before Module 2. Bring notes on what happened, especially at the Inquiry step.",
      psychologicalSafety:
        "Normalize imperfection: 'You won't nail all three. That's fine. The goal is reps, not perfection. We'll debrief what worked and what didn't.'",
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
  { label: "L1 target", value: "≥ 4.0/5", sublabel: "Post-session" },
  { label: "L2 target", value: "≥ 25%", sublabel: "Pre→post uplift" },
];
