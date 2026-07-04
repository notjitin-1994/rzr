"use client";

import { useState } from "react";
import { SectionShell } from "./SectionShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listeningQuestions, listeningTourStats } from "@/data/listening";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Target,
  AlertTriangle,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ListeningSection() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["q1"]));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SectionShell
      id="listening"
      eyebrow="Artifact 04 · Tier 2"
      title="The First 5 Questions I'd Ask"
      description="Listening-tour discipline: 5 questions, each designed to surface a specific signal. Each card includes the audience, why I'm asking, the signal I'm listening for, and red/green flag responses."
      badge="Listening Tour"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {listeningTourStats.map((stat) => (
          <Card key={stat.label} className="bg-card/60">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-semibold text-amber">{stat.value}</div>
              <div className="text-xs font-medium mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Opening framing */}
      <Card className="mb-8 border-amber/30 bg-amber/[0.03]">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Compass className="size-5 text-amber shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber uppercase mb-1">
                Why these 5 questions
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
                Each question is engineered to bypass polite answers and surface a specific
                signal — the gap between what onboarding delivers vs. what the business needs,
                the lived manager-quality reality, where L&D is under-leveraged, what the
                business would prioritize, and what content is worth preserving. The synthesis of
                all 5 becomes the Day-30 insight memo that revises the plan against the 12
                Operating Assumptions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {listeningQuestions.map((q) => {
          const isOpen = expanded.has(q.id);
          return (
            <Card
              key={q.id}
              className={cn(
                "transition-all border-border/80",
                isOpen && "border-amber/40 shadow-sm"
              )}
            >
              <button
                onClick={() => toggle(q.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg shrink-0 font-mono font-bold text-sm transition-colors",
                    isOpen ? "bg-amber text-amber-foreground" : "bg-amber/15 text-amber"
                  )}
                >
                  {q.index}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono border-amber/40 text-amber bg-amber/5"
                    >
                      Question {q.index}
                    </Badge>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold leading-snug text-pretty">
                    &ldquo;{q.question}&rdquo;
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="size-3.5" />
                    <span className="font-medium">Audience:</span>
                    <span>{q.audience}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isOpen ? (
                    <ChevronUp className="size-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/60">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="size-3.5 text-amber" />
                        <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                          Why I&rsquo;m Asking
                        </span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
                        {q.why}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Compass className="size-3.5 text-emerald" />
                        <span className="text-[10px] font-mono tracking-widest text-emerald uppercase">
                          Signal I&rsquo;m Listening For
                        </span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
                        {q.signal}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-rose/30 bg-rose/[0.04]">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="size-3.5 text-rose" />
                        <span className="text-[10px] font-mono tracking-widest text-rose uppercase">
                          Red Flag
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed">{q.redFlag}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-emerald/30 bg-emerald/[0.04]">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="size-3.5 text-emerald" />
                        <span className="text-[10px] font-mono tracking-widest text-emerald uppercase">
                          Green Flag
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed">{q.greenFlag}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <Card className="mt-8 bg-muted/30 border-dashed">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Target className="size-5 text-amber shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold mb-1">
                What happens with the answers
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each interview is 30 minutes, recorded with consent, and synthesized into a
                Day-30 insight memo. The memo validates (or revises) each of the 12 Operating
                Assumptions from the Implementation Plan. Any assumption that breaks triggers a
                plan-revision memo to the Head of People within 5 business days. The memo is also
                the basis for the Q1 ELT readout at Day 90.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
