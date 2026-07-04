"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, FileText, Sparkles, Shield, Compass } from "lucide-react";

const ARTIFACTS = [
  {
    id: "academy",
    tier: "T1",
    title: "RZR Academy Prototype",
    desc: "5-module Day-1 experience — clickable, branded, with embedded knowledge checks.",
    icon: Sparkles,
  },
  {
    id: "ftm",
    tier: "T1",
    title: "FTM Feedback Delivery Module",
    desc: "Full module: 7 slides + facilitation guide + L1 survey + L2 knowledge check.",
    icon: FileText,
  },
  {
    id: "lms",
    tier: "T2",
    title: "LMS Comparison Matrix",
    desc: "5 vendors × 10 criteria, weighted scoring, recommendation, 8-week procurement timeline.",
    icon: Compass,
  },
  {
    id: "listening",
    tier: "T2",
    title: "First 5 Questions",
    desc: "The 5 questions I'd ask in Week 1 — with audiences, signals, red/green flags.",
    icon: Compass,
  },
  {
    id: "risks",
    tier: "T3",
    title: "Risk Mitigation One-Pager",
    desc: "Top 3 risks from the register, each with Day-1 and Day-30 mitigations + escalation paths.",
    icon: Shield,
  },
];

export function Cover() {
  return (
    <section
      id="cover"
      className="relative scroll-mt-nav min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-amber/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-emerald/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <Badge
                variant="outline"
                className="border-amber/40 text-amber bg-amber/5 font-mono text-[10px] tracking-widest uppercase"
              >
                For Discussion · Confidential
              </Badge>
              <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                2026 · Strategy Discussion
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance leading-[1.05]">
              The plan, made{" "}
              <span className="relative">
                <span className="text-amber">buildable</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2,6 Q50,2 100,5 T198,4"
                    stroke="currentColor"
                    className="text-amber/60"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              Five artifacts that turn the Senior L&amp;D Lead implementation plan from a
              strategy memo into a portfolio. Each one is built, not promised — clickable,
              scoreable, and ready to walk into the interview with.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("academy")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-ink text-background hover:bg-ink-soft"
              >
                Start with the Academy →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("risks")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-mono"
              >
                Jump to risk mitigations
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-muted-foreground tracking-wider uppercase">
              <span>5 artifacts</span>
              <span className="text-border">/</span>
              <span>1 codebase</span>
              <span className="text-border">/</span>
              <span>deployable to GitHub</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber/20 via-transparent to-emerald/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur p-5 shadow-xl">
                <div className="text-[10px] font-mono tracking-widest text-amber uppercase mb-3">
                  Artifacts in this portfolio
                </div>
                <ul className="space-y-2">
                  {ARTIFACTS.map((a) => (
                    <li key={a.id}>
                      <button
                        onClick={() =>
                          document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="group w-full text-left p-3 rounded-lg hover:bg-accent/60 transition-colors flex items-start gap-3"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber/10 text-amber shrink-0">
                          <a.icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber/15 text-amber">
                              {a.tier}
                            </span>
                            <span className="text-sm font-semibold text-foreground group-hover:text-amber transition-colors">
                              {a.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">
                            {a.desc}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 flex flex-col items-center gap-3">
          <button
            onClick={() =>
              document.getElementById("academy")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-xs font-mono text-muted-foreground hover:text-amber transition-colors flex items-center gap-2 tracking-widest uppercase"
          >
            <ArrowDown className="size-3 animate-bounce" />
            Scroll to explore
          </button>
        </div>
      </div>
    </section>
  );
}
