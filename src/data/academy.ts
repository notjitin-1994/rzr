// RZR Academy — Day 1 Experience prototype content
// 5 modules: Foundation Layer only (per Implementation Plan)

export type AcademyModule = {
  id: string;
  index: number;
  title: string;
  duration: string;
  format: "Async" | "Live" | "Blended";
  layer: "Foundation" | "Function" | "Role-Readiness";
  tagline: string;
  learningOutcomes: string[];
  sections: {
    heading: string;
    body: string;
    callout?: string;
  }[];
  checkpointQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
};

export const academyModules: AcademyModule[] = [
  {
    id: "m1",
    index: 1,
    title: "Welcome to RZR — Where Intelligence Makes Impact",
    duration: "20 min",
    format: "Async",
    layer: "Foundation",
    tagline:
      "Your Day-1 orientation: the rebrand story from Aarki, RZR's mission, and how Encore powers it all.",
    learningOutcomes: [
      "Articulate the RZR mission and the meaning behind 'Where Intelligence Makes Impact'",
      "Explain the Aarki → RZR rebrand and what it signals about the company's evolution",
      "Describe Encore at a high level — RZR's proprietary AI-supervised ML platform",
      "Locate the 8 global offices and identify your regional HRBP partner",
    ],
    sections: [
      {
        heading: "The Rebrand Story",
        body: "RZR is the new identity of Aarki, a performance marketing platform with more than a decade of mobile advertising experience. The rebrand reflects an evolution from mobile-first to a unified, cross-screen performance system spanning User Acquisition, Retargeting, Connected TV, and Influencer. The shift isn't cosmetic — it signals a more ambitious thesis: intelligence (not inventory) is what makes advertising impact. As a new hire, you'll be expected to embody this narrative in how you communicate internally and externally.",
        callout:
          "Spend 5 minutes reading the public rebrand announcement linked in your Notion welcome page before your Day-2 sync.",
      },
      {
        heading: "Encore — The Engine",
        body: "Encore is RZR's proprietary AI-supervised machine learning platform. It processes 5M+ ad requests per second across 10B+ devices, served from four owned-and-operated data centers running 6M+ queries per second. You don't need to understand the math on Day 1 — but you do need to understand that every team at RZR (Engineering, Sales, Product, Ops) is in some way touching or influenced by Encore. That shared technical substrate is why cross-functional fluency matters more here than at most companies.",
      },
      {
        heading: "Your Place in the Map",
        body: "RZR operates across 8 offices: San Francisco (HQ), New York, London, Tel Aviv, Bangalore, Beijing, Manila, and Seoul. You'll be paired with a regional HRBP within your first 24 hours. If you haven't received that introduction by end of Day 1, escalate to the People team via #rzr-people on Slack. The 30/60/90 experience you'll start tomorrow is co-owned by L&D and your HRBP — your HRBP is your first port of call for any localized question your manager can't answer.",
      },
      {
        heading: "What Success Looks Like at Day 30",
        body: "By Day 30, you should: (1) have completed the full RZR Academy Foundation layer, (2) have met your manager's expectations for your role's Function-layer track, (3) have completed your first 30-day check-in with your manager using the structured template, and (4) be able to explain RZR's business model to a friend in under 90 seconds. If any of these four are at risk, raise it in your Day-7 check-in — early signal is treated as strength, not weakness, at RZR.",
      },
    ],
    checkpointQuestion: {
      question:
        "A new hire asks you on Day 2: 'What's the difference between Aarki and RZR?' Which response best reflects the company line?",
      options: [
        "It's just a new name — same business, same product, fresh logo.",
        "RZR is the new identity of Aarki, reflecting a shift from mobile-first to a unified, cross-screen performance system powered by Encore, where intelligence is what makes advertising impact.",
        "Aarki was acquired and RZR is the parent company's brand.",
        "RZR is the enterprise tier of Aarki's consumer product.",
      ],
      correctIndex: 1,
      explanation:
        "The rebrand signals an evolution from mobile-first to cross-screen, with Encore (the AI/ML platform) as the unifying engine. 'Where Intelligence Makes Impact' is the operative narrative.",
    },
  },
  {
    id: "m2",
    index: 2,
    title: "The Business Model — How RZR Makes Impact",
    duration: "25 min",
    format: "Async",
    layer: "Foundation",
    tagline:
      "UA, Retargeting, CTV, Influencer — the four revenue engines, and how each one creates value for advertisers.",
    learningOutcomes: [
      "Map RZR's four primary revenue surfaces (UA, Retargeting, CTV, Influencer)",
      "Explain why performance marketing is different from brand marketing",
      "Identify the advertiser KPIs RZR is judged on (CPI, CPA, ROAS)",
      "Connect your role to at least one of the four revenue engines",
    ],
    sections: [
      {
        heading: "Four Engines, One Platform",
        body: "RZR runs four primary advertiser surfaces: User Acquisition (driving app installs at scale), Retargeting (re-engaging users who installed but didn't convert), Connected TV (cross-screen video performance), and Influencer (data-driven creator partnerships). All four sit on top of Encore, which means creative, bidding, and optimization decisions can be coordinated across surfaces — that orchestration is RZR's structural advantage over single-surface competitors.",
      },
      {
        heading: "Performance Marketing 101",
        body: "Unlike brand marketing (which optimizes for awareness or recall), performance marketing optimizes for measurable downstream outcomes — installs, signups, purchases. RZR gets paid when those outcomes happen. This means every team at RZR is, directly or indirectly, judged on a few hard metrics: CPI (cost per install), CPA (cost per action), and ROAS (return on ad spend). If you're in Engineering, your work affects the bidding latency that affects CPI. If you're in Sales, your work affects which advertisers are in the platform at all. Every role ladders up to performance.",
        callout:
          "Write down the one metric your team most directly influences. You'll be asked this in your Day-30 manager check-in.",
      },
      {
        heading: "Where You Fit",
        body: "Take 2 minutes to map your role to one of the four engines. If you're in Engineering or ML, you're enabling all four via Encore. If you're in Sales or CS, you're likely closest to UA or Retargeting revenue. If you're in Finance or Ops, you're the substrate that lets the engines scale. There's no wrong answer — but being able to articulate the connection is what separates a hired contributor from a hired contributor who gets promoted.",
      },
    ],
    checkpointQuestion: {
      question:
        "An advertiser says: 'We don't care about installs — we care about paying users.' Which RZR metric is most directly relevant?",
      options: [
        "CPI (Cost Per Install)",
        "CPM (Cost Per Thousand Impressions)",
        "CPA (Cost Per Action) — specifically, cost per paying user",
        "CTR (Click-Through Rate)",
      ],
      correctIndex: 2,
      explanation:
        "CPA is the action-level cost. When the action is 'became a paying user,' CPA is the right metric. CPI only captures install, not downstream conversion.",
    },
  },
  {
    id: "m3",
    index: 3,
    title: "The Encore Platform — A 10-Minute Mental Model",
    duration: "15 min",
    format: "Async",
    layer: "Foundation",
    tagline:
      "No math, no architecture diagrams — just enough context to ask good questions in your first sprint.",
    learningOutcomes: [
      "Describe Encore at a 5-year-old's level of explanation",
      "Identify the three subsystems: bidding, creative, and optimization",
      "Explain why owned data centers (vs. cloud) is a strategic choice",
      "List three questions you should ask your team lead about how you'll interact with Encore",
    ],
    sections: [
      {
        heading: "Encore in One Sentence",
        body: "Encore is RZR's proprietary AI-supervised machine learning platform that decides, in real time, which ad to show to which user at what price — across 5M+ ad requests per second. 'AI-supervised' means the system learns from human-labeled outcomes (good vs. bad installs, high vs. low LTV users) rather than operating as a pure black box. This is why RZR's ML and Operations teams work so closely together — operator judgment is a training signal.",
      },
      {
        heading: "Three Subsystems You'll Hear About",
        body: "(1) Bidding — how much RZR offers to pay for a given impression, in milliseconds. (2) Creative — which ad variant is shown, chosen from a library the advertiser has uploaded. (3) Optimization — the loop that adjusts bidding and creative selection based on observed performance. Every engineer, PM, or ops hire will spend time inside at least one of these three subsystems. Knowing which one is yours is the first step.",
        callout:
          "If you're not sure which subsystem your role touches, that's the single most important question to ask in your Day-3 manager sync.",
      },
      {
        heading: "Why Owned Data Centers",
        body: "RZR operates four owned-and-operated data centers running 6M+ queries per second. At this scale, cloud economics break down — the marginal cost of a cloud query would dominate the marginal revenue from the ad. Owning the infrastructure is a strategic moat: competitors on cloud cannot match RZR's unit economics. The trade-off is operational complexity (more SREs, more capital expenditure) — which is why infrastructure hires are so highly valued here.",
      },
    ],
    checkpointQuestion: {
      question:
        "Why does RZR operate owned data centers instead of running on AWS/GCP?",
      options: [
        "Because cloud providers don't serve the geographies RZR operates in.",
        "Because at 6M+ queries per second, cloud unit economics make the marginal query unprofitable — owned infrastructure is a structural margin advantage.",
        "Because of regulatory data residency requirements.",
        "Because cloud latency is too high for ad serving.",
      ],
      correctIndex: 1,
      explanation:
        "At RZR's scale, cloud per-query cost would exceed marginal revenue. Owned infrastructure is a deliberate strategic moat, not a technical preference.",
    },
  },
  {
    id: "m4",
    index: 4,
    title: "Your Tools Stack — Greenhouse, BambooHR, Lattice, Jira, Notion",
    duration: "30 min",
    format: "Blended",
    layer: "Foundation",
    tagline:
      "The 5 systems you'll touch weekly. Each card includes a 2-minute walkthrough and your first action item.",
    learningOutcomes: [
      "Identify the purpose of each of the 5 core tools and when to use each",
      "Complete your Day-1 setup checklist for each tool",
      "Know where to file a question, request, or incident in each system",
      "Identify the difference between 'system of record' (BambooHR) and 'system of collaboration' (Notion)",
    ],
    sections: [
      {
        heading: "Greenhouse — ATS (Applicant Tracking)",
        body: "Greenhouse is the system of record for hiring. If you're not a hiring manager or interviewer, you'll mostly interact with it via interview-scheduling emails. If you ARE going to interview candidates, you'll receive an onboarding from Talent in Week 2. Day-1 action: confirm your Greenhouse account is active; if not, file a ticket via #rzr-talent-ops.",
      },
      {
        heading: "BambooHR — HRIS (HR Information System)",
        body: "BambooHR is the system of record for you as an employee: your profile, your time-off, your start-date, your manager chain. BambooHR is also the trigger system for RZR Academy — your start date in BambooHR is what auto-enrolls you in the new-hire workflow. Day-1 action: verify your profile (legal name, emergency contact, manager relationship). This sounds trivial; it isn't — errors here propagate into payroll, benefits, and access provisioning.",
      },
      {
        heading: "Lattice — Performance & Engagement",
        body: "Lattice is where goal-setting, 1:1 notes, performance reviews, and engagement pulses live. Your first 30/60/90 check-in template will appear in Lattice. You'll also receive a quarterly engagement pulse — your manager sees aggregated team results, not your individual responses. Day-1 action: log in, confirm your manager relationship is correctly mapped, and complete the 'first impressions' pulse if it's been sent.",
      },
      {
        heading: "Jira — Work Management",
        body: "Jira is the system of record for engineering-adjacent work — bugs, features, sprint tickets. Even if you're not in Engineering, you may receive a Jira ticket for things like 'review this policy doc' or 'complete this compliance training.' Day-1 action: confirm your team's Jira project(s) are visible to you. If you're non-Eng, you don't need to learn Jira deeply — just know how to find a ticket you've been assigned.",
        callout:
          "Engineering hires: Jira is your daily surface. Ops/Finance/CS hires: Jira is occasional. Sales/GTM hires: you may never touch Jira — that's OK.",
      },
      {
        heading: "Notion — Knowledge & Documentation",
        body: "Notion is RZR's system of collaboration: wikis, project docs, meeting notes, decision logs. The RZR Academy itself lives in Notion until the LMS goes live (Q4). Day-1 action: bookmark your team's Notion home page and the RZR Academy home page. The single most common new-hire mistake is treating Notion like a place to 'find' things — it's actually a place to 'navigate' things. Spend 10 minutes clicking through your team's wiki structure today.",
      },
    ],
    checkpointQuestion: {
      question:
        "Your manager assigns you a task to 'update your emergency contact.' Which system do you use?",
      options: [
        "Notion — it's the documentation system.",
        "Lattice — it's the people system.",
        "BambooHR — it's the HRIS and system of record for employee profile data.",
        "Jira — file a ticket and assign to HR.",
      ],
      correctIndex: 2,
      explanation:
        "BambooHR is the system of record for employee profile data, including emergency contacts. Notion is for collaboration; Lattice is for performance; Jira is for work tickets.",
    },
  },
  {
    id: "m5",
    index: 5,
    title: "People Policies, POSH Fundamentals & Cultural Norms",
    duration: "35 min",
    format: "Blended",
    layer: "Foundation",
    tagline:
      "The non-negotiables: POSH compliance, working norms across 8 time zones, and how decisions get made at RZR.",
    learningOutcomes: [
      "Define POSH (Prevention of Sexual Harassment) and your reporting obligations",
      "Identify the cultural norms that govern cross-time-zone collaboration at RZR",
      "Locate the three policy documents every employee must read in Week 1",
      "Know how decisions are made (RACI basics) and where to escalate",
    ],
    sections: [
      {
        heading: "POSH — Non-Negotiable",
        body: "POSH (Prevention of Sexual Harassment) compliance is mandatory for every RZR employee globally, with additional legal requirements in India. The headline: any employee who witnesses or is told about conduct that could constitute harassment has a reporting obligation — you cannot 'sit on' information. RZR's POSH policy is linked in your Notion welcome page; you must complete the POSH e-learning module by end of Week 1. The POSH committee (composed and named per legal requirement) is your first escalation point. Retaliation against anyone reporting in good faith is itself a terminable offense.",
        callout:
          "POSH is the only training at RZR that is universally mandatory and has zero flexibility on the Week-1 deadline. Don't let it slip.",
      },
      {
        heading: "Cross-Time-Zone Norms",
        body: "With 8 offices spanning SF to Seoul, RZR's working day has roughly 16 hours of overlap somewhere. The cultural norm: async-first by default, sync when judgment is required. Practical implications: (1) default to written (Notion or Slack message) for status updates; (2) record meetings that span 3+ time zones; (3) your 'end of day' update should be readable by your colleagues starting their day. The worst cross-time-zone sin is blocking a decision by being unreachable during another region's working hours without prior notice.",
      },
      {
        heading: "How Decisions Get Made",
        body: "RZR uses a lightweight RACI model: every meaningful decision has one Accountable owner (the person who decides), one or more Responsible contributors (people who do the work), Consulted stakeholders (people whose input is required before the decision), and Informed observers (people who are told after the decision). If you don't know who is Accountable for a decision you're working on, ask. The most common dysfunction at fast-scaling companies is diffuse accountability — multiple people think someone else is deciding. Naming the Accountable owner is everyone's job.",
      },
      {
        heading: "Three Documents to Read in Week 1",
        body: "By end of Day 7, you should have read: (1) the RZR Code of Conduct (in BambooHR, requires e-signature), (2) the POSH Policy and e-learning module (in Notion / Academy), and (3) your team's Operating Doc (in Notion — ask your manager for the link if you can't find it). These three documents together give you the floor of what 'good RZR citizen' looks like. Everything else is layered on top.",
      },
    ],
    checkpointQuestion: {
      question:
        "A colleague in another office tells you, in confidence, about an interaction that 'might have crossed a line.' What's your obligation under RZR's POSH policy?",
      options: [
        "Keep the confidence — it's their story to tell, not yours.",
        "Wait to see if it happens again before escalating.",
        "You have a reporting obligation — POSH committee is the first escalation point. Retaliation is itself a terminable offense.",
        "Confront the alleged offender directly to get their side.",
      ],
      correctIndex: 2,
      explanation:
        "POSH at RZR is structured so that any employee who witnesses or is told about potential harassment has a reporting obligation. Confidentiality is preserved through the committee process, not through individual silence.",
    },
  },
];

export const academyStats = [
  { label: "Modules", value: "5", sublabel: "Foundation Layer" },
  { label: "Total time", value: "~2 hrs", sublabel: "Self-paced" },
  { label: "Format", value: "Async + Blended", sublabel: "Mobile-friendly" },
  { label: "Languages (Year-1)", value: "4", sublabel: "EN, ZH, KO, ES" },
];
