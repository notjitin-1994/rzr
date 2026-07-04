// First 5 Questions I'd Ask in My First Week
// Listening-tour discipline artifact

export type ListeningQuestion = {
  id: string;
  index: number;
  question: string;
  audience: string;
  why: string;
  signal: string;
  redFlag: string;
  greenFlag: string;
};

export const listeningQuestions: ListeningQuestion[] = [
  {
    id: "q1",
    index: 1,
    question:
      "What's the #1 thing a new hire still doesn't know at Day 30 — that you wish they knew by Day 7?",
    audience: "Recent hires (last 6 months), their managers, HRBPs",
    why: "Surfaces the gap between what onboarding delivers and what the business actually needs. This question bypasses polite 'onboarding was fine' answers because it forces the respondent to name a specific knowledge gap.",
    signal: "If 3+ respondents name the same gap, that's the first module to rebuild in RZR Academy v2. If everyone names a different gap, the problem is structural — the architecture itself doesn't reflect business priorities.",
    redFlag: "Respondents can't answer because 'onboarding is mostly HR paperwork.' Indicates the Academy relaunch is starting from zero, not from a redesign.",
    greenFlag: "Respondents name concrete, fixable gaps (e.g., 'Encore architecture basics', 'how to file an expense report', 'who owns the advertiser relationship'). These become Module 6-10 in the Academy v2 backlog.",
  },
  {
    id: "q2",
    index: 2,
    question:
      "Which manager at RZR would you never promote again, and why — and which one would you clone if you could?",
    audience: "HRBPs, ELT members, function heads",
    why: "Surfaces the lived manager-quality reality in 90 seconds. Bypasses Likert-scale manager surveys because it forces a binary judgment. The 'why' is where the data lives — patterns across multiple respondents reveal whether RZR's manager problem is about feedback, hiring, strategic thinking, or operational discipline.",
    signal: "Look for the pattern in the 'why' answers. If 5 respondents independently cite the same skill gap (e.g., 'avoids hard conversations'), that becomes Module 1 of the FTM program. If the gaps are scattered, the FTM curriculum needs to be broader.",
    redFlag: "No one is willing to name a 'never promote again' manager. Indicates either low psychological safety or that the question is being asked in a context where respondents fear consequences. Adjust by asking 1:1 only.",
    greenFlag: "Respondents name the same 'would clone' manager 3+ times. That manager becomes a case study in the FTM program — their behaviors become the model the cohort learns to emulate.",
  },
  {
    id: "q3",
    index: 3,
    question:
      "What's the one decision in the last 6 months that you wish L&D had been consulted on — but wasn't?",
    audience: "Head of People, ELT, function heads, HRBPs",
    why: "Surfaces the gap between L&D's current perceived scope and the scope the business actually needs. Reveals where L&D is being under-leveraged AND where the function could create outsized value if expanded.",
    signal: "If respondents cite strategic decisions (reorg, market entry, leadership change) where L&D wasn't consulted, that signals L&D should be at the strategic table — not just the program-delivery table. If they cite tactical decisions (tool rollout, policy change), L&D is being underused at the execution layer.",
    redFlag: "Respondents can't name any decision where L&D would have been useful. Indicates L&D is perceived as a content-production function, not a strategic partner. This perception has to change for the role to succeed.",
    greenFlag: "Respondents name specific, high-stakes decisions (e.g., 'the Bangalore team reorg', 'the post-acquisition integration', 'the manager promotion cycle'). Each becomes a case study for where L&D should have a seat — and a proof point for the Year-2 vision.",
  },
  {
    id: "q4",
    index: 4,
    question:
      "If you had to ship one L&D program in the next 30 days that would meaningfully move the business — what would it be?",
    audience: "ELT, function heads, HRBPs",
    why: "Surfaces the business's actual L&D priorities — not the priorities the L&D team assumes. Cross-references the answer against the 7 workstreams in the Implementation Plan; misalignment is itself a critical finding.",
    signal: "If 3+ ELT members name a program NOT in the Implementation Plan's 7 workstreams, the plan needs a revision memo within 5 business days (per the Operating Assumptions protocol). If they name programs IN the plan but in a different priority order, the sequencing should shift.",
    redFlag: "ELT members name 'general leadership training' or 'communication skills' without specifics. Indicates the L&D mandate isn't well-understood at the top — and that the Year-1 ELT readouts need to do real education work, not just report metrics.",
    greenFlag: "ELT members name specific, business-linked programs (e.g., 'FTM program because we just promoted 8 ICs to manager', 'Sales enablement because we missed Q1 quota', 'POSH refresh because of an incident'). Each becomes a prioritization data point.",
  },
  {
    id: "q5",
    index: 5,
    question:
      "What's the one piece of L&D content RZR already has that's actually good — that I should NOT throw away in the rebuild?",
    audience: "Recent hires, HRBPs, function heads, long-tenured employees (3+ yrs)",
    why: "Prevents the new L&D Lead from throwing out the baby with the bathwater. Even at companies with weak L&D functions, there are usually 2-3 artifacts that have organically earned credibility. Preserving them signals respect for what came before — and avoids the political cost of a 'scorched earth' rebuild.",
    signal: "If multiple respondents name the same artifact (a specific deck, a specific training session, a specific facilitator), preserve it. If no one can name anything, the rebuild is genuinely starting from zero — and that's important context for the team's morale and the ELT's expectations.",
    redFlag: "Long-tenured employees can't name a single good L&D artifact. Indicates the function has historically been so under-resourced that there's no institutional memory to preserve. The Year-1 plan becomes the foundation — there's nothing to build on.",
    greenFlag: "Respondents name specific, credibly-sourced artifacts (e.g., 'the Aarki-era sales playbook', 'the onboarding session Priya runs for Engineering', 'the Encore whitepaper'). Each becomes a candidate for preservation, refresh, or formalization in the new Academy.",
  },
];

export const listeningTourStats = [
  { label: "Interviews", value: "15–20", sublabel: "Across 7 offices" },
  { label: "Duration", value: "30 min", sublabel: "Each, recorded w/ consent" },
  { label: "Window", value: "Day 1–20", sublabel: "Synthesis Day 21–30" },
  { label: "Output", value: "Insight memo", sublabel: "+ assumption validation" },
];
