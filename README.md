# RZR · Senior L&D Lead — Interview Artifacts

A single-page Next.js portfolio of five buildable artifacts that accompany the
Senior L&D Lead implementation plan. Each artifact is interactive — clickable,
scoreable, and ready to walk into an interview with.

> **Confidential · For Discussion · 2026 Edition**
> Companion to the RZR Senior L&D Lead Implementation Plan.

## Live Demo

Once deployed, the app is available at the root URL (`/`). It's a single-page
scrollable experience with sticky top navigation.

## Artifacts Included

| # | Tier | Artifact | What it proves |
|---|------|----------|----------------|
| 1 | T1 | **RZR Academy Prototype** | A clickable 5-module Day-1 onboarding experience with embedded knowledge checks. Builder mindset is real, not aspirational. |
| 2 | T1 | **FTM Feedback Delivery Module** | A fully-built sample module: 7-slide deck with facilitator notes, L1 reaction survey, L2 knowledge check. Production-quality template. |
| 3 | T2 | **LMS Comparison Matrix** | 5 vendors × 10 weighted criteria, ranked scoring, vendor drill-downs, 8-week procurement timeline, primary recommendation. |
| 4 | T2 | **First 5 Questions** | Listening-tour discipline: 5 questions with audiences, signals, and red/green flag responses. |
| 5 | T3 | **Risk Mitigation One-Pager** | Top 3 risks from the register with Day-1 and Day-30 mitigations, escalation paths, plus the full 8-risk heat map. |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Icons**: lucide-react
- **Fonts**: Geist Sans / Geist Mono

## Local Development

```bash
bun install
bun run dev
# App runs at http://localhost:3000
```

## Deployment

This is a standard Next.js app — deployable to **Vercel**, **Netlify**, or any
static host with Next.js support. For GitHub Pages, use the
`@nextjs/nextjs-static-html-export` configuration.

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no config needed.
4. Deploy. Your link is live in ~60 seconds.

### GitHub Pages

1. Add `output: 'export'` to `next.config.ts`.
2. Run `bun run build` — produces `out/` directory.
3. Push the contents of `out/` to your `gh-pages` branch (or use a GitHub Action).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with RZR branding metadata
│   ├── page.tsx            # Main page — composes all 5 artifact sections
│   └── globals.css         # Tailwind + RZR brand palette (ink/amber/emerald)
├── components/
│   ├── rzr/
│   │   ├── TopNav.tsx          # Sticky nav with scroll-spy
│   │   ├── Cover.tsx           # Hero / cover section
│   │   ├── SectionShell.tsx    # Reusable section wrapper
│   │   ├── AcademySection.tsx  # T1.1 — RZR Academy prototype
│   │   ├── FtmSection.tsx      # T1.2 — FTM Feedback Delivery module
│   │   ├── LmsSection.tsx      # T2.6 — LMS comparison matrix
│   │   ├── ListeningSection.tsx # T2.8 — First 5 Questions
│   │   ├── RisksSection.tsx    # T3.12 — Risk mitigation one-pager
│   │   └── Footer.tsx
│   └── ui/                  # shadcn/ui components
└── data/
    ├── academy.ts           # 5-module Academy content
    ├── ftm.ts               # FTM slides + L1 survey + L2 knowledge check
    ├── lms.ts               # 5 vendors × 10 criteria + recommendation
    ├── listening.ts         # 5 listening-tour questions
    └── risks.ts             # Top 3 risks + heat-map positioning
```

## Design Notes

- **Color palette**: Editorial ink (`oklch(0.18 0.018 260)`) as primary, with
  amber (`oklch(0.78 0.155 70)`) as the RZR accent. Emerald and rose for
  positive/negative signals in the LMS and risk artifacts.
- **Typography**: Geist Sans for body, Geist Mono for metadata/labels. Strong
  contrast between display headlines and metadata micro-type.
- **Responsive**: Mobile-first with sticky nav collapsing to a hamburger menu
  below `md`. All interactive elements meet 44px touch target minimum.
- **Accessibility**: Semantic HTML (`<main>`, `<section>`, `<nav>`), ARIA labels
  on icon buttons, keyboard-navigable tabs and accordions.

## Companion Document

This portfolio is the **buildable companion** to the 24-page
*RZR Senior L&D Lead Implementation Plan*. Where the plan describes strategy,
this portfolio demonstrates execution.

---

*Confidential · For Discussion · 2026 Edition · Companion to Implementation Plan*
