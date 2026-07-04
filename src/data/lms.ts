// LMS Vendor Comparison Matrix
// Shortlist from the Implementation Plan: Docebo, Disprz, 360Learning, Cornerstone, LearnUpon

export type LmsCriterion = {
  id: string;
  name: string;
  description: string;
  weight: number; // 1-5 importance
  category: "Scale" | "Integration" | "Delivery" | "AI" | "Mobile" | "Authoring" | "Cost";
};

export const lmsCriteria: LmsCriterion[] = [
  {
    id: "c1",
    name: "Global scale (8+ offices, 4+ languages)",
    description: "Multi-region deployment, native localization, regional admin delegation.",
    weight: 5,
    category: "Scale",
  },
  {
    id: "c2",
    name: "HRIS integration (BambooHR first, Lattice second)",
    description: "Native BambooHR connector with field-level mapping; Lattice via API or middleware.",
    weight: 5,
    category: "Integration",
  },
  {
    id: "c3",
    name: "Async + live delivery support",
    description: "Self-paced modules, ILT/vILT scheduling, blended cohort management.",
    weight: 4,
    category: "Delivery",
  },
  {
    id: "c4",
    name: "AI-assisted personalization",
    description: "Role/level-based content recommendation; skills graph; adaptive paths.",
    weight: 4,
    category: "AI",
  },
  {
    id: "c5",
    name: "Mobile-friendly for field teams",
    description: "Native iOS/Android app, offline mode, mobile-first content rendering.",
    weight: 3,
    category: "Mobile",
  },
  {
    id: "c6",
    name: "Content authoring integration",
    description: "Built-in authoring (Rise/Storyline-compatible), SCORM/xAPI, external LMS-CMS sync.",
    weight: 4,
    category: "Authoring",
  },
  {
    id: "c7",
    name: "Annual cost (mid-tier, 200-500 active learners)",
    description: "All-in subscription + implementation; per-seat economics at RZR's scale.",
    weight: 5,
    category: "Cost",
  },
  {
    id: "c8",
    name: "Implementation timeline",
    description: "From contract to first cohort onboarded. RZR target: go-live by Q4.",
    weight: 4,
    category: "Delivery",
  },
  {
    id: "c9",
    name: "Analytics & reporting depth",
    description: "L1/L2/L3 dashboards, cohort analytics, manager-level visibility, custom report builder.",
    weight: 4,
    category: "Delivery",
  },
  {
    id: "c10",
    name: "Vendor stability & roadmap",
    description: "Public/private, funding, recent product velocity, AI roadmap credibility.",
    weight: 3,
    category: "Scale",
  },
];

export type LmsVendor = {
  id: string;
  name: string;
  hq: string;
  founded: string;
  positioning: string;
  strengths: string[];
  weaknesses: string[];
  bestFit: string;
  scores: Record<string, number>; // criterionId -> 1-5 score
  indicativeCost: string; // USD/yr at RZR scale
  implementationWeeks: string;
};

export const lmsVendors: LmsVendor[] = [
  {
    id: "docebo",
    name: "Docebo",
    hq: "Toronto, Canada",
    founded: "2005",
    positioning: "Enterprise-grade AI-powered LMS. Strongest AI personalization (Shape AI). Premium tier.",
    strengths: [
      "Shape AI for content recommendation — most mature in category",
      "Multi-domain, multi-language out of the box",
      "BambooHR integration available via marketplace connector",
      "Robust analytics + custom report builder",
    ],
    weaknesses: [
      "Premium pricing — high end of mid-market",
      "Authoring tool is adequate but not best-in-class (Rise still preferred)",
      "Implementation typically 10-14 weeks — needs early Q2 contract",
    ],
    bestFit: "Best fit if RZR wants AI personalization to be the Year-2 differentiator.",
    scores: {
      c1: 5,
      c2: 4,
      c3: 5,
      c4: 5,
      c5: 4,
      c6: 3,
      c7: 2,
      c8: 3,
      c9: 5,
      c10: 5,
    },
    indicativeCost: "$70K – $110K / yr",
    implementationWeeks: "10–14 weeks",
  },
  {
    id: "disprz",
    name: "Disprz",
    hq: "Chennai, India",
    founded: "2015",
    positioning: "Skill-building platform with strong APAC presence. Strong in capability development, not just content delivery.",
    strengths: [
      "Native multi-language including Mandarin, Korean, Hindi, Tamil",
      "Strong India/APAC support — proximity to Bangalore office",
      "Built-in skill taxonomy and capability benchmarks",
      "Mobile-first design, strong offline mode",
    ],
    weaknesses: [
      "Smaller North American footprint — may need to verify NY/SF support",
      "BambooHR integration exists but is less battle-tested than Docebo",
      "AI personalization is good but narrower than Docebo Shape",
      "Smaller ecosystem of pre-built content partners",
    ],
    bestFit: "Best fit if RZR's India/APAC presence is the primary driver and skill-building (not just content delivery) is the Year-2 priority.",
    scores: {
      c1: 5,
      c2: 4,
      c3: 4,
      c4: 4,
      c5: 5,
      c6: 5,
      c7: 4,
      c8: 5,
      c9: 4,
      c10: 4,
    },
    indicativeCost: "$45K – $80K / yr",
    implementationWeeks: "8–10 weeks",
  },
  {
    id: "360learning",
    name: "360Learning",
    hq: "Paris, France",
    founded: "2013",
    positioning: "Collaborative learning platform. Strongest in peer-authored content and in-product collaboration.",
    strengths: [
      "Best-in-class collaborative authoring — SMEs can build courses directly",
      "Strong ILT/vILT + async blend",
      "Modern UI, mobile-friendly, fast onboarding",
      "Pricing competitive at 200-500 learner tier",
    ],
    weaknesses: [
      "Less depth on enterprise AI personalization vs Docebo",
      "BambooHR integration via middleware (Workato/Zapier), not native",
      "Localization available but not as turnkey as Disprz for APAC",
      "Analytics adequate but not as deep as Docebo or Cornerstone",
    ],
    bestFit: "Best fit if RZR wants distributed SME authoring (Engineering, ML leads building their own tracks) to be the operating model.",
    scores: {
      c1: 4,
      c2: 3,
      c3: 5,
      c4: 3,
      c5: 4,
      c6: 5,
      c7: 4,
      c8: 5,
      c9: 3,
      c10: 4,
    },
    indicativeCost: "$40K – $70K / yr",
    implementationWeeks: "6–8 weeks",
  },
  {
    id: "cornerstone",
    name: "Cornerstone OnDemand",
    hq: "Santa Monica, CA",
    founded: "1999",
    positioning: "Legacy enterprise LMS. Broadest feature set but heaviest implementation. Best for very large orgs.",
    strengths: [
      "Most comprehensive enterprise feature set in the category",
      "Native integrations with virtually every HRIS including BambooHR",
      "Deep analytics, compliance reporting, certification management",
      "Vendor stability — public company, 20+ year track record",
    ],
    weaknesses: [
      "Implementation is the longest in this shortlist (16+ weeks typical)",
      "UI feels dated compared to 360Learning or Disprz",
      "AI features bolted on rather than native — less compelling than Docebo",
      "Overkill for 200-500 learner tier; pricing favors 5K+ seat deals",
    ],
    bestFit: "Best fit only if RZR is on a path to 1000+ employees in 18 months AND compliance/certification complexity is high.",
    scores: {
      c1: 5,
      c2: 5,
      c3: 4,
      c4: 3,
      c5: 3,
      c6: 4,
      c7: 2,
      c8: 2,
      c9: 5,
      c10: 5,
    },
    indicativeCost: "$80K – $130K / yr",
    implementationWeeks: "16+ weeks",
  },
  {
    id: "learnupon",
    name: "LearnUpon",
    hq: "Dublin, Ireland",
    founded: "2012",
    positioning: "Mid-market LMS with strong emphasis on customer + partner training alongside employee L&D. Clean UX, fast implementation.",
    strengths: [
      "Fastest implementation in this shortlist — 4-6 weeks typical",
      "Clean, modern UI, mobile app well-reviewed",
      "BambooHR integration available and well-documented",
      "Multi-audience support (employees + partners + customers) if RZR ever extends L&D to advertiser enablement",
    ],
    weaknesses: [
      "AI personalization is the least mature in this shortlist",
      "Authoring tool is basic — Rise/Storyline still needed for serious content",
      "Localization available but reviewer workflow less mature than Disprz",
      "Analytics adequate for L1/L2 but L3 behavior transfer requires custom work",
    ],
    bestFit: "Best fit if RZR prioritizes fast go-live and clean UX over AI sophistication, and wants optionality on customer/partner training later.",
    scores: {
      c1: 4,
      c2: 4,
      c3: 4,
      c4: 2,
      c5: 4,
      c6: 3,
      c7: 5,
      c8: 5,
      c9: 3,
      c10: 4,
    },
    indicativeCost: "$35K – $60K / yr",
    implementationWeeks: "4–6 weeks",
  },
];

// Recommendation logic
export function computeWeightedScore(vendor: LmsVendor): number {
  let weighted = 0;
  let maxPossible = 0;
  for (const criterion of lmsCriteria) {
    weighted += vendor.scores[criterion.id] * criterion.weight;
    maxPossible += 5 * criterion.weight;
  }
  return Math.round((weighted / maxPossible) * 100);
}

export const lmsRecommendation = {
  primary: "Disprz",
  primaryReason:
    "Best fit for RZR's India-heavy hiring plan, multi-language needs (Mandarin, Korean, Russian, Spanish), and 8-office global scale. Strong mobile for field teams, faster implementation than Docebo/Cornerstone, and AI personalization is 'good enough' for Year 1 with a clear path to upgrade in Year 2 if needed.",
  secondary: "Docebo",
  secondaryReason:
    "If AI personalization becomes a Year-2 strategic priority (per the Year-2 vision), Docebo's Shape AI is the most mature in the category. Re-evaluate at Q3 MEI readout — Disprz→Docebo migration is feasible if Year-2 needs evolve.",
  decisionProcess:
    "Joint L&D + IT + Procurement decision in Q2. Run a 2-week proof-of-concept with each of the top 2 (Disprz, Docebo) using 3 Academy modules. Score against the 10-criteria matrix. Final selection by end of Q2; contract signed within 2 weeks of selection.",
  timeline: [
    { week: "Week 1-2", activity: "RFP issued to top 3 (Disprz, Docebo, 360Learning)" },
    { week: "Week 3-4", activity: "Vendor demos + reference calls with 2 customers each" },
    { week: "Week 5-6", activity: "POC with each vendor: 3 modules, BambooHR integration test" },
    { week: "Week 7", activity: "Score against matrix; IT security review of top 2" },
    { week: "Week 8", activity: "Procurement negotiation; contract signed" },
    { week: "Week 9-22", activity: "Implementation (Q3); content migration from Notion + Slides" },
    { week: "Week 23+", activity: "LMS go-live (Q4); first LMS-onboarded cohort" },
  ],
};
