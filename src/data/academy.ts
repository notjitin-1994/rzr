// RZR Academy — Three-track learning ecosystem
// Academy → Track → Module → Scene (scene-types: video | narration | infographic | check | transfer)
//
// Master Instructional Design revamp:
// - Cognitive Load: chunked into micro-scenes (~60-90s each), no long text walls
// - Dual Coding: every scene has a visual representation, not just text
// - ARCS: video attention hook → relevance via "your role" → confidence via low-stakes checks → satisfaction via layered completion
// - Retrieval practice: spaced checks per module, not just end-of-module
// - Transfer: explicit on-the-job prompts at end of each module

export type SceneType =
  | "video"
  | "narration"
  | "infographic"
  | "check"
  | "transfer";

export type InfographicKind =
  | "timeline"
  | "scale"
  | "map"
  | "tower-stack"
  | "comparison"
  | "raci";

export type Scene = {
  id: string;
  type: SceneType;
  /** Short title for the scene (used in scene strip / progress dots). */
  label: string;
  /** Pedagogical purpose — what the learner should walk away with. */
  purpose: string;
  /** Estimate in seconds — used for pacing & scene strip. */
  seconds: number;
  /** Body copy split into short sentences for narration + reading. Chunked for CLT. */
  narration?: string[];
  /** Optional callout (italic annotation under narration). */
  callout?: string;
  /** For narration scenes: the framing / "what to look for" eyebrow. */
  eyebrow?: string;
  /** Headline shown prominently over narration. */
  headline?: string;
  /** For infographic scenes. */
  infographic?: {
    kind: InfographicKind;
    title: string;
    /** Generic data payload — interpreted by Infographic components. */
    data: Record<string, unknown>;
  };
  /** For `video` scenes — the Remotion composition id to render. */
  videoId?: string;
  /** For `check` scenes — the formative or summative knowledge check. */
  check?: {
    question: string;
    options: string[];
    correctIndex: number;
    /** Instructional feedback (not correct/incorrect feedback — explain the why). */
    explanation: string;
  };
  /** For `transfer` scenes — the on-the-job transfer prompt. */
  transfer?: {
    prompt: string;
    /** When the learner should do this (Day 3, Day 7, etc.). */
    when: string;
    /** Suggested place/method (Slack channel, Notion doc, 1:1). */
    where: string;
  };
};

export type AcademyModule = {
  id: string;
  index: number;
  title: string;
  shortTitle: string;
  duration: string;
  format: "Async" | "Live" | "Blended";
  tagline: string;
  /** Complex output targets — what the learner can DO after the module. */
  outcomes: string[];
  scenes: Scene[];
};

export type AcademyTrack = {
  id: string;
  name: string;
  /** Foundation | Function | Role-Readiness — used in the architecture diagram. */
  layer: "Foundation" | "Function" | "Role-Readiness";
  /** Day-window in the 30/60/90 plan. */
  window: string;
  status: "Live" | "Ships Day 8" | "Ships Day 15" | "Roadmap";
  /** What learners do in this track. */
  description: string;
  modules: AcademyModule[];
};

export const academy = {
  name: "RZR Academy",
  tagline: "Where intelligence makes impact — at every step of the learner journey.",
  description:
    "RZR Academy is the umbrella learning ecosystem covering the full 30/60/90 journey. The Onboarding Foundation track (Day 1–7) is the first track a new hire walks through; Function and Role-Readiness ship in succession.",

  tracks: [
    {
      id: "onboarding",
      name: "Onboarding Foundation",
      layer: "Foundation",
      window: "Day 1 – Day 7",
      status: "Live",
      description:
        "The Day-1 experience every new RZR hire walks through. Five foundation modules that build shared context: mission, business model, technology, tools, and people norms.",
      modules: [
        {
          id: "m1",
          index: 1,
          title: "Welcome to RZR — Where Intelligence Makes Impact",
          shortTitle: "Welcome to RZR",
          duration: "20 min",
          format: "Async",
          tagline:
            "Your Day-1 orientation: rebrand story, mission, Encore at a glance, and where you sit on the global map.",
          outcomes: [
            "Articulate the RZR mission and the meaning behind 'Where Intelligence Makes Impact'",
            "Explain the Aarki → RZR rebrand and what it signals about the company's evolution",
            "Describe Encore at a high level — RZR's proprietary AI-supervised ML platform",
            "Locate the 8 global offices and identify your regional HRBP partner",
          ],
          scenes: [
            {
              id: "s1",
              type: "video",
              label: "Welcome",
              purpose: "Hook attention; signal this is a premium, post-rebrand onboarding.",
              seconds: 30,
              videoId: "onboarding-intro",
              headline: "Welcome to RZR",
              narration: [
                "Welcome to RZR.",
                "Where intelligence makes impact — starting on Day 1.",
              ],
            },
            {
              id: "s2",
              type: "infographic",
              label: "The rebrand",
              purpose:
                "Establish the Aarki → RZR narrative as evolution, not a name change.",
              seconds: 75,
              eyebrow: "The story",
              headline: "Aarki became RZR. The story is evolution, not a logo swap.",
              narration: [
                "RZR is the new identity of Aarki.",
                "A decade of mobile advertising experience, evolved.",
                "From mobile-first — to a unified cross-screen performance system.",
                "User Acquisition, Retargeting, Connected TV, Influencer.",
                "All coordinated by Encore — the intelligence engine.",
                "The shift signals one thesis: intelligence, not inventory, makes advertising impact.",
              ],
              callout:
                "Read the public rebrand announcement in your Notion welcome page before your Day-2 sync.",
              infographic: {
                kind: "timeline",
                title: "The Evolution",
                data: {
                  points: [
                    { year: "2010", label: "Aarki founded", detail: "Mobile-first performance" },
                    { year: "2018", label: "Scale milestone", detail: "Cross-screen expansion begins" },
                    { year: "2024", label: "Rebrand to RZR", detail: "Unified cross-screen, intelligence-led" },
                    { year: "2026", label: "You arrive", detail: "Onboarding Day 1" },
                  ],
                },
              },
            },
            {
              id: "s3",
              type: "infographic",
              label: "Encore at scale",
              purpose:
                "Give scale intuition without maths — every team touches Encore, so the scale matters to everyone.",
              seconds: 60,
              eyebrow: "The engine",
              headline: "Encore is the shared technical substrate for every team.",
              narration: [
                "Encore is RZR's proprietary AI-supervised machine learning platform.",
                "It decides, in real time, which ad to show, to which user, at what price.",
                "Across more than five million ad requests per second.",
                "Ten billion-plus devices. Four owned-and-operated data centers.",
                "Six million queries per second.",
                "You won't need the maths on Day 1 — you will need to know that every team touches Encore.",
              ],
              infographic: {
                kind: "scale",
                title: "Encore by the numbers",
                data: {
                  metrics: [
                    { value: "5M+", unit: "ad req/sec", detail: "real-time bidding load" },
                    { value: "10B+", unit: "devices", detail: "global reach" },
                    { value: "6M+", unit: "queries/sec", detail: "across 4 data centers" },
                    { value: "AI", unit: "supervised", detail: "operator judgment is a training signal" },
                  ],
                },
              },
            },
            {
              id: "s4",
              type: "infographic",
              label: "Your global map",
              purpose:
                "Make it concrete where your regional HRBP sits — empathy for the global shape of the team.",
              seconds: 60,
              eyebrow: "Your place in the map",
              headline: "Eight offices. One async-first culture.",
              narration: [
                "RZR operates across eight offices, San Francisco to Seoul.",
                "You'll be paired with a regional HRBP within your first 24 hours.",
                "If that introduction hasn't arrived by end of Day 1, escalate to #rzr-people on Slack.",
                "Your 30/60/90 experience is co-owned by L&D and your HRBP.",
                "HRBP is your first port of call for any localized question your manager can't answer.",
              ],
              infographic: {
                kind: "map",
                title: "8 Offices · 16 Hours of Overlap",
                data: {
                  offices: [
                    { city: "San Francisco", role: "HQ", region: "North America" },
                    { city: "New York", role: "Sales hub", region: "North America" },
                    { city: "London", role: "EMEA", region: "Europe" },
                    { city: "Tel Aviv", role: "Engineering", region: "EMEA" },
                    { city: "Bangalore", role: "Engineering", region: "APAC" },
                    { city: "Beijing", role: "Commercial", region: "APAC" },
                    { city: "Manila", role: "Operations", region: "APAC" },
                    { city: "Seoul", role: "Commercial", region: "APAC" },
                  ],
                },
              },
            },
            {
              id: "s5",
              type: "transfer",
              label: "Your Day-30 lens",
              purpose: "Anchor success criteria — what 'good' looks like at the 30-day mark.",
              seconds: 90,
              eyebrow: "What success looks like at Day 30",
              headline: "Four things you should be able to say at Day 30.",
              narration: [
                "By Day 30, you should be able to say four things:",
                "I completed the Academy Foundation layer.",
                "I met my manager's expectations for my Function-layer track.",
                "I had my structured Day-30 check-in.",
                "I can explain RZR's business model to a friend in under 90 seconds.",
                "If any of these are at risk, raise it at your Day-7 check-in.",
                "At RZR, an early signal is treated as strength — not weakness.",
              ],
              transfer: {
                prompt:
                  "Bookmark this checklist. Before your Day-7 sync, write one sentence on each of the four items and bring it to the meeting.",
                when: "Day 7",
                where: "1:1 with manager",
              },
            },
            {
              id: "s6",
              type: "check",
              label: "Knowledge check",
              purpose:
                "L2 retrieval practice — verify the narrative stuck, not just words-recognized.",
              seconds: 60,
              check: {
                question:
                  "A new hire asks on Day 2: 'What's the difference between Aarki and RZR?' Which response best reflects the company line?",
                options: [
                  "It's just a new name — same business, same product, fresh logo.",
                  "RZR is the new identity of Aarki, reflecting a shift from mobile-first to a unified cross-screen performance system powered by Encore — intelligence is what makes advertising impact.",
                  "Aarki was acquired and RZR is the parent company's brand.",
                  "RZR is the enterprise tier of Aarki's consumer product.",
                ],
                correctIndex: 1,
                explanation:
                  "The rebrand signals an evolution from mobile-first to cross-screen, with Encore as the unifying engine. 'Where Intelligence Makes Impact' is the operative narrative.",
              },
            },
          ],
        },
        {
          id: "m2",
          index: 2,
          title: "The Business Model — How RZR Makes Impact",
          shortTitle: "Business Model",
          duration: "25 min",
          format: "Async",
          tagline:
            "UA, Retargeting, CTV, Influencer — the four revenue engines, and how each one creates value for advertisers.",
          outcomes: [
            "Map RZR's four primary revenue surfaces (UA, Retargeting, CTV, Influencer)",
            "Explain why performance marketing is different from brand marketing",
            "Identify the advertiser KPIs RZR is judged on (CPI, CPA, ROAS)",
            "Connect your role to at least one of the four revenue engines",
          ],
          scenes: [
            {
              id: "s1",
              type: "narration",
              label: "Four engines, one platform",
              purpose: "Establish the four revenue surfaces and the structural advantage of one platform.",
              seconds: 75,
              eyebrow: "The revenue map",
              headline: "Four engines. One Encore platform. That's the structural advantage.",
              narration: [
                "RZR runs four primary advertiser surfaces.",
                "User Acquisition — driving app installs at scale.",
                "Retargeting — re-engaging users who installed but didn't convert.",
                "Connected TV — cross-screen video performance.",
                "Influencer — data-driven creator partnerships.",
                "All four sit on top of Encore, so creative, bidding, and optimization can be coordinated across surfaces.",
                "That orchestration is RZR's structural advantage over single-surface competitors.",
              ],
              infographic: {
                kind: "tower-stack",
                title: "Four surfaces · One Encore backbone",
                data: {
                  levels: [
                    { label: "User Acquisition", sub: "App installs at scale" },
                    { label: "Retargeting", sub: "Re-engage the maybe-installers" },
                    { label: "Connected TV", sub: "Cross-screen video performance" },
                    { label: "Influencer", sub: "Data-driven creator partnerships" },
                  ],
                  base: "Encore — coordinated bidding, creative, optimization",
                },
              },
            },
            {
              id: "s2",
              type: "infographic",
              label: "Performance vs brand",
              purpose: "Set the mental model — performance = downstream outcomes, not awareness.",
              seconds: 60,
              eyebrow: "Performance marketing 101",
              headline: "RZR gets paid when outcomes happen — not when impressions happen.",
              narration: [
                "Brand marketing optimizes for awareness or recall.",
                "Performance marketing optimizes for measurable downstream outcomes — installs, signups, purchases.",
                "Three metrics judge every team at RZR:",
                "CPI — cost per install.",
                "CPA — cost per action, like a signup or purchase.",
                "ROAS — return on ad spend.",
                "Engineering work affects bidding latency, which affects CPI.",
                "Sales work affects which advertisers are in the platform at all.",
                "Every role ladders up to performance.",
              ],
              infographic: {
                kind: "comparison",
                title: "Brand vs Performance",
                data: {
                  left: { title: "Brand marketing", points: ["Awareness", "Recall", "Reach", "Impressions"], muted: true },
                  right: { title: "Performance marketing", points: ["Installs (CPI)", "Signups (CPA)", "Purchases (CPA)", "Return (ROAS)"], muted: false },
                },
              },
              callout:
                "Write down the one metric your team most directly influences. You'll be asked this in your Day-30 manager check-in.",
            },
            {
              id: "s3",
              type: "transfer",
              label: "Where you fit",
              purpose: "Personalize — connect role to engine to metric.",
              seconds: 90,
              eyebrow: "Where you fit",
              headline: "Take two minutes. Map your role to one of the four engines.",
              narration: [
                "If you're in Engineering or ML — you're enabling all four via Encore.",
                "If you're in Sales or CS — you're closest to UA or Retargeting revenue.",
                "If you're in Finance or Ops — you're the substrate that lets the engines scale.",
                "There's no wrong answer. But being able to articulate the connection separates a contributor from a contributor who gets promoted.",
              ],
              transfer: {
                prompt:
                  "Write one sentence connecting your role to one engine and one metric. Bring it to your Day-7 sync.",
                when: "Day 7",
                where: "1:1 with manager",
              },
            },
            {
              id: "s4",
              type: "check",
              label: "Knowledge check",
              purpose: "Apply CPA vs CPI correctly — the most-common confusion in performance marketing.",
              seconds: 60,
              check: {
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
          ],
        },
        {
          id: "m3",
          index: 3,
          title: "The Encore Platform — A 10-Minute Mental Model",
          shortTitle: "Encore Platform",
          duration: "15 min",
          format: "Async",
          tagline:
            "No math, no architecture diagrams — just enough context to ask good questions in your first sprint.",
          outcomes: [
            "Describe Encore at a five-year-old's level of explanation",
            "Identify the three subsystems — bidding, creative, optimization",
            "Explain why owned data centers is a strategic choice",
            "List three questions to ask your team lead about how you'll interact with Encore",
          ],
          scenes: [
            {
              id: "s1",
              type: "narration",
              label: "Encore in one sentence",
              purpose: "Give a one-sentence mental model — everything else extends it.",
              seconds: 75,
              eyebrow: "Encore in one sentence",
              headline: "Encore decides — in real time, in milliseconds — which ad wins.",
              narration: [
                "Encore is RZR's proprietary AI-supervised machine learning platform.",
                "It decides, in real time, which ad to show, to which user, at what price.",
                "Across more than five million ad requests per second.",
                "'AI-supervised' means the system learns from human-labeled outcomes.",
                "Good installs vs bad installs. High-LTV users vs low.",
                "Not a pure black box. That's why RZR's ML and Operations teams work so closely — operator judgment is a training signal.",
              ],
            },
            {
              id: "s2",
              type: "infographic",
              label: "Three subsystems",
              purpose: "Name the three subsystems so learners know which one is theirs.",
              seconds: 75,
              eyebrow: "Three subsystems you'll hear about",
              headline: "Bidding. Creative. Optimization. Every engineer, PM, or ops hire lives in at least one.",
              narration: [
                "Bidding — how much RZR offers to pay for a given impression, in milliseconds.",
                "Creative — which ad variant is shown, from a library the advertiser uploaded.",
                "Optimization — the loop that adjusts bidding and creative based on observed performance.",
                "Every engineer, PM, or ops hire will spend time in at least one of these three subsystems.",
                "Knowing which one is yours is the first step.",
              ],
              callout:
                "If you're not sure which subsystem your role touches, that's the single most important question to ask in your Day-3 manager sync.",
              infographic: {
                kind: "tower-stack",
                title: "The three subsystems",
                data: {
                  levels: [
                    { label: "Optimization", sub: "The learning loop" },
                    { label: "Creative", sub: "Which ad variant wins" },
                    { label: "Bidding", sub: "How much to pay, in ms" },
                  ],
                  base: "Encore — real-time ML serving",
                },
              },
            },
            {
              id: "s3",
              type: "narration",
              label: "Why owned data centers",
              purpose: "Frame infrastructure ownership as a strategic moat — not a tech preference.",
              seconds: 60,
              eyebrow: "Why owned data centers",
              headline: "At this scale, cloud economics break. Owned infrastructure is the moat.",
              narration: [
                "RZR operates four owned-and-operated data centers running six million-plus queries per second.",
                "At this scale, cloud economics break down.",
                "The marginal cost of a cloud query would dominate the marginal revenue from the ad.",
                "Owning the infrastructure is a strategic moat — competitors on cloud cannot match RZR's unit economics.",
                "The trade-off is operational complexity — which is why infrastructure hires are so highly valued here.",
              ],
            },
            {
              id: "s4",
              type: "check",
              label: "Knowledge check",
              purpose: "Ensure 'owned infra = strategic moat' rather than 'cloud bad' as the takeaway.",
              seconds: 45,
              check: {
                question: "Why does RZR operate owned data centers instead of running on AWS/GCP?",
                options: [
                  "Cloud providers don't serve the geographies RZR operates in.",
                  "At 6M+ queries per second, cloud unit economics make the marginal query unprofitable — owned infrastructure is a structural margin advantage.",
                  "Regulatory data residency requirements.",
                  "Cloud latency is too high for ad serving.",
                ],
                correctIndex: 1,
                explanation:
                  "At RZR's scale, cloud per-query cost would exceed marginal revenue. Owned infrastructure is a deliberate strategic moat, not a technical preference.",
              },
            },
          ],
        },
        {
          id: "m4",
          index: 4,
          title: "Your Tools Stack — Greenhouse, BambooHR, Lattice, Jira, Notion",
          shortTitle: "Tools Stack",
          duration: "30 min",
          format: "Blended",
          tagline:
            "The five systems you'll touch weekly. Each card includes a 2-minute walkthrough and your first Day-1 action item.",
          outcomes: [
            "Identify the purpose of each of the five core tools and when to use each",
            "Complete your Day-1 setup checklist for each tool",
            "Know where to file a question, request, or incident in each system",
            "Identify the difference between 'system of record' (BambooHR) and 'system of collaboration' (Notion)",
          ],
          scenes: [
            {
              id: "s1",
              type: "narration",
              label: "Five tools, five jobs",
              purpose:
                "Establish the system-of-record vs system-of-collaboration distinction early — most new-hire tool confusion traces back to this.",
              seconds: 60,
              eyebrow: "Five tools, five jobs",
              headline: "Two are systems of record. Three are systems of collaboration.",
              narration: [
                "RZR has five core tools.",
                "Greenhouse — the system of record for hiring.",
                "BambooHR — the system of record for you as an employee.",
                "Lattice — performance, 1:1s, engagement pulses.",
                "Jira — work tickets, especially engineering-adjacent.",
                "Notion — the system of collaboration: wikis, docs, meeting notes.",
                "The most common new-hire mistake is treating Notion as a place to 'find' things — it's a place to 'navigate' things.",
              ],
            },
            {
              id: "s2",
              type: "infographic",
              label: "Tool layer map",
              purpose: "Show which tool owns what — visual hierarchy reinforces the distinction.",
              seconds: 75,
              eyebrow: "Tool layer map",
              headline: "Record vs collaboration — and where you file what.",
              narration: [
                "Systems of record: BambooHR owns your employee profile. Greenhouse owns hiring.",
                "Systems of collaboration: Notion owns knowledge. Lattice owns performance. Jira owns tickets.",
                "Most cross-tool confusion is one of these mis-assigned.",
              ],
              infographic: {
                kind: "comparison",
                title: "Where to file what",
                data: {
                  left: { title: "Systems of record", points: ["BambooHR — employee profile", "Greenhouse — candidates"], muted: false },
                  right: { title: "Systems of collaboration", points: ["Notion — knowledge", "Lattice — performance", "Jira — work tickets"], muted: false },
                },
              },
            },
            {
              id: "s3",
              type: "narration",
              label: "Day-1 actions",
              purpose: "Concrete first action per tool — application, not exposition.",
              seconds: 75,
              eyebrow: "Day-1 actions",
              headline: "Five tools. Five Day-1 actions. Each takes a minute.",
              narration: [
                "Greenhouse — confirm your account is active. If not, file a ticket via #rzr-talent-ops.",
                "BambooHR — verify your legal name, emergency contact, and manager relationship.",
                "Lattice — confirm your manager relationship is mapped. Take the first-impressions pulse.",
                "Jira — confirm your team's projects are visible. You don't need Jira deeply if you're non-Eng.",
                "Notion — bookmark your team's wiki home and the RZR Academy home.",
              ],
              callout:
                "BambooHR errors propagate into payroll, benefits, and access provisioning. Don't let the profile slide.",
            },
            {
              id: "s4",
              type: "check",
              label: "Knowledge check",
              purpose: "Where do I update my emergency contact — the canonical 'which system?' check.",
              seconds: 45,
              check: {
                question:
                  "Your manager assigns you a task to 'update your emergency contact.' Which system do you use?",
                options: [
                  "Notion — the documentation system.",
                  "Lattice — the people system.",
                  "BambooHR — the HRIS and system of record for employee profile data.",
                  "Jira — file a ticket and assign to HR.",
                ],
                correctIndex: 2,
                explanation:
                  "BambooHR is the system of record for employee profile data, including emergency contacts. Notion is for collaboration; Lattice is for performance; Jira is for work tickets.",
              },
            },
          ],
        },
        {
          id: "m5",
          index: 5,
          title: "People Policies, POSH Fundamentals & Cultural Norms",
          shortTitle: "People & POSH",
          duration: "35 min",
          format: "Blended",
          tagline:
            "The non-negotiables: POSH compliance, working norms across eight time zones, and how decisions get made at RZR.",
          outcomes: [
            "Define POSH (Prevention of Sexual Harassment) and your reporting obligations",
            "Identify the cultural norms that govern cross-time-zone collaboration at RZR",
            "Locate the three policy documents every employee must read in Week 1",
            "Know how decisions are made (RACI basics) and where to escalate",
          ],
          scenes: [
            {
              id: "s1",
              type: "narration",
              label: "POSH — non-negotiable",
              purpose: "Frame POSH as both safety infrastructure and Week-1 deadline — not punitive language, design language.",
              seconds: 90,
              eyebrow: "POSH — non-negotiable",
              headline: "You cannot 'sit on' information. Reporting is an obligation — and retaliation is itself a terminable offense.",
              narration: [
                "POSH — Prevention of Sexual Harassment — is mandatory for every RZR employee globally, with additional legal requirements in India.",
                "The headline: any employee who witnesses or is told about conduct that could constitute harassment has a reporting obligation.",
                "You cannot 'sit on' information.",
                "The POSH committee — composed and named per legal requirement — is your first escalation point.",
                "Retaliation against anyone reporting in good faith is itself a terminable offense.",
                "Confidentiality is preserved through the committee process — not through individual silence.",
              ],
              callout:
                "POSH is the only training at RZR with zero flexibility on the Week-1 deadline. Don't let it slip.",
            },
            {
              id: "s2",
              type: "narration",
              label: "Cross-time-zone norms",
              purpose: "Operationalize async-first — name the three soft sins that block global teams.",
              seconds: 75,
              eyebrow: "Cross-time-zone norms",
              headline: "Async-first by default. Sync when judgment is required.",
              narration: [
                "With eight offices, San Francisco to Seoul, RZR's working day has roughly sixteen hours of overlap somewhere.",
                "The norm: async-first by default. Sync when judgment is required.",
                "One: default to written for status updates.",
                "Two: record meetings that span three or more time zones.",
                "Three: your end-of-day update should be readable by colleagues starting their day.",
                "The worst cross-time-zone sin is blocking a decision by being unreachable during another region's working hours without prior notice.",
              ],
            },
            {
              id: "s3",
              type: "infographic",
              label: "RACI basics",
              purpose: "Visualize RACI — diffuse accountability is the most common fast-scaling dysfunction.",
              seconds: 75,
              eyebrow: "How decisions get made",
              headline: "Every meaningful decision has exactly one Accountable owner. Naming them is everyone's job.",
              narration: [
                "RZR uses a lightweight RACI model.",
                "Accountable — one person, owns the decision.",
                "Responsible — one or more, do the work.",
                "Consulted — input required before the decision.",
                "Informed — told after the decision.",
                "If you don't know who is Accountable for a decision you're working on, ask.",
                "Naming the Accountable owner is everyone's job — not just the manager's.",
              ],
              infographic: {
                kind: "raci",
                title: "RACI — who owns what",
                data: {
                  roles: [
                    { letter: "R", word: "Responsible", detail: "Do the work", multi: true },
                    { letter: "A", word: "Accountable", detail: "Owns the decision", multi: false },
                    { letter: "C", word: "Consulted", detail: "Input first", multi: true },
                    { letter: "I", word: "Informed", detail: "Told after", multi: true },
                  ],
                },
              },
            },
            {
              id: "s4",
              type: "transfer",
              label: "Three documents, Week 1",
              purpose: "Concrete Week-1 action — read these three documents.",
              seconds: 60,
              eyebrow: "Three documents to read in Week 1",
              headline: "These three documents together give you the floor of what 'good RZR citizen' looks like.",
              narration: [
                "By end of Day 7, you should have read three documents.",
                "The RZR Code of Conduct — in BambooHR, requires e-signature.",
                "The POSH Policy and e-learning module — in Notion / Academy.",
                "Your team's Operating Doc — in Notion. Ask your manager for the link if you can't find it.",
                "Everything else is layered on top.",
              ],
              transfer: {
                prompt:
                  "Read all three documents. Bring any 'I don't understand this' questions to your Day-7 sync with your HRBP.",
                when: "Day 7",
                where: "#rzr-people on Slack / Notion",
              },
            },
            {
              id: "s5",
              type: "check",
              label: "Knowledge check",
              purpose: "Reporting obligation is the single most important POSH behaviour.",
              seconds: 45,
              check: {
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
          ],
        },
      ],
    },
    {
      id: "function",
      name: "Function Layer",
      layer: "Function",
      window: "Day 8 – Day 30",
      status: "Ships Day 8",
      description:
        "Role-specific depth. New hires leave the Foundation layer and enter track-specific work — Engineering track, Sales track, Ops track, etc. Each is built off the Function-layer blueprint.",
      modules: [],
    },
    {
      id: "role-readiness",
      name: "Role-Readiness",
      layer: "Role-Readiness",
      window: "Day 15 – Day 90",
      status: "Ships Day 15",
      description:
        "The third layer — readiness for customer-facing, partner-facing, and leadership-facing moments. Includes the FTM (Feedback Delivery) track surfaced later in this portfolio.",
      modules: [],
    },
  ],
};

export const academyStats = [
  { label: "Tracks", value: "3", sublabel: "Foundation · Function · Role-Readiness" },
  { label: "Foundation modules", value: "5", sublabel: "20–35 min each" },
  { label: "Total time", value: "~2 hrs", sublabel: "Self-paced" },
  { label: "Languages (Year-1)", value: "4", sublabel: "EN, ZH, KO, ES" },
];

export const onboardingTrack = academy.tracks[0];
export const onboardingModules = onboardingTrack.modules;