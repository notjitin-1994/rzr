// Risk Mitigation One-Pager
// Top 3 risks from the Implementation Plan's Risk Register + Day-1 mitigations

export type Risk = {
  id: string;
  index: number;
  title: string;
  likelihood: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  description: string;
  earlySignal: string;
  day1Mitigation: string;
  day30Mitigation: string;
  escalationPath: string;
  owner: string;
};

export const topRisks: Risk[] = [
  {
    id: "r2",
    index: 1,
    title: "Manager bandwidth for training time — managers resist 4 hrs/month",
    likelihood: "High",
    impact: "High",
    description:
      "The FTM program requires ~4 hours/manager/month (90-min live session + 30-min async + 1:1 application). Managers — especially in revenue-generating functions — may resist, deprioritizing L&D for billable work. This is the single highest-likelihood, highest-impact risk in the Year-1 plan.",
    earlySignal:
      "Day 7-14: cohort recruitment for FTM cohort #1 is slow (< 60% confirmed by Day 14) OR HRBPs report manager pushback in 1:1s. Day 21-30: attendance at the soft-launched Academy modules drops below 80%.",
    day1Mitigation:
      "In the Day 1 listening tour, ask every ELT member and function head: 'Will you personally commit to 4 hours/month for your managers' development, and will you publicly endorse it at the next all-hands?' Capture the answer in writing. Share the consolidated commitments with the Head of People by Day 14.",
    day30Mitigation:
      "By Day 30, secure ELT-level written endorsement that manager dev time is non-negotiable — communicated via a CEO/Head-of-People joint Slack message and in the next all-hands. Modular design (90-min sessions) reduces friction. Async-first where possible. HRBPs partner on holdouts. Bottom-decile managers who skip become a Head-of-People escalation, not an L&D-only problem.",
    escalationPath:
      "Manager → HRBP (Day 14 if pushed back) → Head of People (Day 30 if pattern) → ELT (Q1 readout if systemic). The MEI readout creates social pressure — bottom-decile managers are visible to skip-level leaders.",
    owner: "Senior L&D Lead (R), Head of People (A), HRBPs (C), ELT (I)",
  },
  {
    id: "r1",
    index: 2,
    title: "LMS procurement delay — vendor selection, IT security review, contract negotiation slips",
    likelihood: "Medium",
    impact: "High",
    description:
      "The LMS is the Year-1 keystone infrastructure. If selection, security review, or contract negotiation slips beyond Q2, the Q4 go-live slips, content migration from Notion/Slides gets delayed, and Year-2 AI personalization plans degrade. Procurement delays are the single most common cause of L&D tech roadmap failures.",
    earlySignal:
      "Day 45-60: vendor demos slip beyond Week 4 of the procurement timeline. Day 60-75: IT security review takes > 2 weeks per vendor. Day 75-90: legal redlines require > 2 rounds of negotiation. Any of these three signals triggers the interim-stack extension plan.",
    day1Mitigation:
      "Day 1: pre-write the RFP using the 10-criteria matrix already drafted. Day 7: identify IT security reviewer and book their calendar for Week 5-6. Day 14: brief Procurement on the timeline and pre-clear the contract template. Day 30: have the interim stack (Notion + Google Slides + BambooHR workflow) documented as a fallback — not just as a bridge.",
    day30Mitigation:
      "By Day 30, RFP is issued. By Day 60, demos complete and POC scoped. By Day 75, IT security review complete for top 2 vendors. By Day 90, contract signed. If any milestone slips by > 2 weeks, activate the interim-stack-to-Q4 plan: extend Notion-based delivery, push LMS go-live to Q1 Year-2, and reframe the Year-1 measurement framework around Notion-sourced data.",
    escalationPath:
      "Senior L&D Lead (R) → IT (R for security review) → Procurement (R for contract) → Head of People (A) → ELT (I, via Q1 readout). If slip > 4 weeks, escalate to ELT-level decision: accept Q1 Year-2 go-live OR descope LMS features.",
    owner: "Senior L&D Lead (A/R), IT (R), Procurement (R), Head of People (A)",
  },
  {
    id: "r7",
    index: 3,
    title: "ID/CD hiring market competitiveness — India tech L&D market is hot",
    likelihood: "High",
    impact: "Medium",
    description:
      "The 3-person team plan (Lead + ID + CD) assumes both hires are productive by Day 45. India's tech L&D market is currently very competitive — ID/CD candidates with AI-assisted content experience are scarce. If hiring slips beyond Day 60, the 30-day Academy relaunch degrades to a soft-launch and the 90-day FTM cohort #1 slips to Day 120.",
    earlySignal:
      "Day 14: < 5 qualified applicants for the ID requisition. Day 21: < 3 qualified applicants for the CD requisition. Day 30: no offer accepted for either role. Day 45: hired ID/CD not yet productive (still onboarding).",
    day1Mitigation:
      "Day 1: open both requisitions with Talent. Day 7: brief the Talent partner on the role pitch (builder from zero, AI-native, top of India market comp). Day 14: activate referral incentives (existing RZR employees get a bonus for referred hires). Day 21: if pipeline is thin, expand search to remote-first candidates outside Bangalore.",
    day30Mitigation:
      "By Day 30, both requisitions should have shortlists of 3+ candidates. By Day 45, offers accepted. By Day 60, both productive. If Day 30 shortlists are thin: (1) increase comp band to top of India market, (2) expand to remote candidates, (3) activate 3 search firms in parallel. If Day 60 productivity slips: soft-launch Academy with 1 cohort only (per the Implementation Plan's contingency) and push FTM cohort #1 to Day 120 with a written plan-revision memo to Head of People.",
    escalationPath:
      "Senior L&D Lead (R) → Talent partner (R) → Head of People (A) → ELT (I, if 30-day milestone at risk). Plan-revision memo to Head of People within 5 business days of any confirmed slip (per Operating Assumptions protocol).",
    owner: "Senior L&D Lead (R), Talent (R), Head of People (A)",
  },
];

export const riskMatrixPositioning = {
  // likelihood (1-3) x impact (1-3) — for the visual matrix
  r1: { likelihood: 2, impact: 3 }, // M, H
  r2: { likelihood: 3, impact: 3 }, // H, H
  r3: { likelihood: 2, impact: 2 }, // M, M
  r4: { likelihood: 2, impact: 2 }, // M, M
  r5: { likelihood: 1, impact: 3 }, // L, H
  r6: { likelihood: 2, impact: 3 }, // M, H
  r7: { likelihood: 3, impact: 2 }, // H, M
  r8: { likelihood: 2, impact: 2 }, // M, M
};

export const riskStats = [
  { label: "Top risks", value: "3", sublabel: "Of 8 in register" },
  { label: "Day-1 actions", value: "9", sublabel: "Concrete, named" },
  { label: "Owners", value: "Cross-functional", sublabel: "L&D + IT + People + ELT" },
  { label: "Escalation", value: "5-day SLA", sublabel: "Plan-revision memo" },
];
