# Senior L&D Lead · RZR — Strategy & Build Portfolio

A builder-grade strategy-and-execution portfolio for the Senior L&D Lead role at RZR.
Five buildable artifacts that translate the implementation plan from strategy memo
to proof of execution.

> **Confidential · For Discussion · 2026 Edition**
> Companion to the RZR Senior L&D Lead Implementation Plan.

## Artifacts

1. **RZR Academy Prototype** — A clickable 5-module Day-1 onboarding experience
   with embedded knowledge checks. Proves the 30-day relaunch is real.
2. **FTM Feedback Delivery Module** — A fully-built sample module: 7-slide deck
   with facilitator notes, L1 reaction survey, and L2 knowledge check.
3. **LMS Comparison Matrix** — 5 vendors × 10 weighted criteria, ranked scoring,
   vendor drill-downs, and an 8-week procurement timeline.
4. **First 5 Questions** — Listening-tour discipline with audience, signal, and
   red/green flag responses per question.
5. **Risk Mitigation One-Pager** — Top 3 risks from the register with Day-1 and
   Day-30 mitigations, escalation paths, and the full 8-risk heat map.

## Brand

This portfolio uses RZR's official brand assets:
- Official RZR horizontal wordmark logo
- Inter font family (300–700), matching rzr.com
- Brand palette: ink `#0F0A14`, mint `#00BDA5`, and the signature
  orange→red→pink gradient (`#FF7A00` → `#DC1A14` → `#E63E6D`)
- Tagline: *Where Intelligence Makes Impact*

## Local Development

```bash
bun install
bun run dev
```

The portfolio runs at `http://localhost:3000`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Inter font, RZR favicon, metadata
│   ├── page.tsx            # Main page — composes all 5 artifact sections
│   └── globals.css         # Tailwind + RZR brand palette
├── components/
│   ├── rzr/
│   │   ├── TopNav.tsx          # Sticky nav with scroll-spy + RZR logo
│   │   ├── Cover.tsx           # Hero / cover with strategic positioning
│   │   ├── SectionShell.tsx    # Reusable section wrapper with "Why this matters"
│   │   ├── RzrLogo.tsx         # Official RZR logo component
│   │   ├── Motion.tsx          # Framer Motion fade-in-up + stagger helpers
│   │   ├── LazySection.tsx     # IntersectionObserver-based lazy section loader
│   │   ├── AcademySection.tsx  # Artifact 01 — RZR Academy prototype
│   │   ├── FtmSection.tsx      # Artifact 02 — FTM Feedback Delivery module
│   │   ├── LmsSection.tsx      # Artifact 03 — LMS comparison matrix
│   │   ├── ListeningSection.tsx # Artifact 04 — First 5 Questions
│   │   ├── RisksSection.tsx    # Artifact 05 — Risk mitigation one-pager
│   │   └── Footer.tsx
│   └── ui/                  # shadcn/ui components
├── data/
│   ├── academy.ts           # 5-module Academy content
│   ├── ftm.ts               # FTM slides + L1 survey + L2 knowledge check
│   ├── lms.ts               # 5 vendors × 10 criteria + recommendation
│   ├── listening.ts         # 5 listening-tour questions
│   └── risks.ts             # Top 3 risks + heat-map positioning
└── public/
    └── brand/
        ├── rzr-logo-black.svg   # Official RZR horizontal wordmark (TM)
        ├── rzr-favicon.png      # Official RZR favicon
        └── rzr-og.png           # Official RZR Open Graph image
```

## Performance & Accessibility

- **Lazy loading** — Heavy interactive sections (Academy, FTM, LMS, Listening, Risks)
  defer rendering until they scroll near the viewport, keeping initial paint fast.
- **Smooth animations** — Framer Motion fade-in-up on scroll for section reveals,
  staggered children for card lists. Respects `prefers-reduced-motion`.
- **Mobile-first responsive** — Sticky nav collapses to hamburger below `md`.
  All interactive elements meet 44px touch target minimum.
- **Accessibility** — Semantic HTML (`<main>`, `<section>`, `<nav>`, `<footer>`),
  ARIA labels on icon buttons, keyboard-navigable tabs and accordions.

---

*Confidential · For Discussion · 2026 Edition · Companion to Implementation Plan*
*Where Intelligence Makes Impact*
