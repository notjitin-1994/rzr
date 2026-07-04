"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  GraduationCap,
  Users,
  MessagesSquare,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { RzrLogo } from "./RzrLogo";

const PILLARS = [
  {
    id: "academy",
    label: "Onboarding",
    headline: "30 days to a globally consistent Day-1",
    desc: "A clickable RZR Academy prototype — 5 Foundation modules with embedded knowledge checks. Proves the builder mindset is real, not aspirational.",
    metric: "30-day relaunch",
    icon: GraduationCap,
  },
  {
    id: "ftm",
    label: "Manager Capability",
    headline: "90 days to a measured manager cohort",
    desc: "A fully-built sample FTM module — Feedback Delivery — with a 7-slide deck, facilitator notes, L1 reaction survey, and L2 knowledge check. The production template every FTM module follows.",
    metric: "Manager as multiplier",
    icon: Users,
  },
  {
    id: "lms",
    label: "LMS Decision",
    headline: "A Q2 decision, ready to make",
    desc: "Five vendors scored against ten weighted criteria — with a primary recommendation, vendor drill-downs, and an eight-week procurement timeline. The decision is rehearsed, not deferred.",
    metric: "Q2 contract",
    icon: Layers,
  },
  {
    id: "listening",
    label: "Listening Tour",
    headline: "Five questions that surface signal, not politeness",
    desc: "Each question is engineered to bypass polite answers and surface a specific business signal — the gap between what onboarding delivers and what the business actually needs.",
    metric: "Day-30 insight memo",
    icon: MessagesSquare,
  },
  {
    id: "risks",
    label: "Risk Mitigation",
    headline: "The top three risks, named and mitigated",
    desc: "Each risk has a Day-1 mitigation, a Day-30 mitigation, a named escalation path, and a RACI owner. Risks are surfaced before they're felt — not after.",
    metric: "5-day revision SLA",
    icon: ShieldAlert,
  },
];

export function Cover() {
  const reduced = useReducedMotion();

  return (
    <section
      id="cover"
      className="relative scroll-mt-nav min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      {/* Brand gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none opacity-30"
           style={{ background: "radial-gradient(circle, #ff7a00 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none opacity-25"
           style={{ background: "radial-gradient(circle, #00bda5 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none opacity-15"
           style={{ background: "radial-gradient(circle, #e63e6d 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Brand lockup */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mb-12"
        >
          <RzrLogo className="h-10 sm:h-12" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <Badge
                variant="outline"
                className="border-mint/40 text-mint bg-mint/5 font-mono text-[10px] tracking-[0.2em] uppercase"
              >
                For Discussion · Confidential
              </Badge>
              <span className="text-[11px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                Senior L&amp;D Lead · Strategy &amp; Build
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance leading-[1.04]"
            >
              Where intelligence{" "}
              <span className="text-brand-gradient">makes impact</span> —
              <br className="hidden sm:block" /> starting on Day 1.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
            >
              A strategy-and-build portfolio for the Senior L&amp;D Lead role — five artifacts
              that translate the implementation plan from <span className="text-foreground font-medium">strategy memo</span> to{" "}
              <span className="text-foreground font-medium">proof of execution</span>. Each one is
              built, not promised.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("academy")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-ink text-background hover:bg-ink/85 gap-2"
              >
                <ArrowRight className="size-4" />
                Explore the portfolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("risks")?.scrollIntoView({ behavior: "smooth" })
                }
                className="gap-2"
              >
                See the risk plan
                <ArrowDown className="size-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-muted-foreground tracking-[0.15em] uppercase"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mint" />
                5 buildable artifacts
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mint" />
                12-month roadmap
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mint" />
                8-office global scope
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-40 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #ff7a00 0%, #dc1a14 50%, #e63e6d 100%)",
                }}
              />
              <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur p-5 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
                    What's in the portfolio
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground tracking-widest">
                    5 / 5
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {PILLARS.map((p, idx) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.55 + idx * 0.06 }}
                    >
                      <button
                        onClick={() =>
                          document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="group w-full text-left p-3 rounded-lg hover:bg-accent/80 transition-colors flex items-start gap-3"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-mint/15 to-mint/5 text-mint shrink-0">
                          <p.icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground group-hover:text-mint transition-colors">
                              {p.label}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                              {p.metric}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">
                            {p.headline}
                          </p>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 lg:mt-24 flex flex-col items-center gap-3"
        >
          <button
            onClick={() =>
              document.getElementById("academy")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-[11px] font-mono text-muted-foreground hover:text-mint transition-colors flex items-center gap-2 tracking-[0.2em] uppercase"
          >
            <ArrowDown className={`size-3 ${reduced ? "" : "animate-bounce"}`} />
            Scroll to explore
          </button>
        </motion.div>
      </div>
    </section>
  );
}
