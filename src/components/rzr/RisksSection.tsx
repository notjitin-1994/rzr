"use client";

import { useState } from "react";
import { SectionShell } from "./SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { topRisks, riskStats, riskMatrixPositioning } from "@/data/risks";
import {
  Shield,
  AlertTriangle,
  Activity,
  ArrowUp,
  ArrowRight,
  Calendar,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

function LikelihoodImpactBadge({ likelihood, impact }: { likelihood: string; impact: string }) {
  const colors = {
    High: "bg-rose/15 text-rose border-rose/30",
    Medium: "bg-amber/15 text-amber border-amber/30",
    Low: "bg-emerald/15 text-emerald border-emerald/30",
  } as const;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-mono text-muted-foreground uppercase">L:</span>
      <Badge
        variant="outline"
        className={cn("text-[10px] font-mono", colors[likelihood as keyof typeof colors])}
      >
        {likelihood}
      </Badge>
      <span className="text-[10px] font-mono text-muted-foreground uppercase ml-1">I:</span>
      <Badge
        variant="outline"
        className={cn("text-[10px] font-mono", colors[impact as keyof typeof colors])}
      >
        {impact}
      </Badge>
    </div>
  );
}

function RiskMatrix() {
  // 3x3 grid: rows = impact (high top → low bottom), cols = likelihood (low left → high right)
  const cellRisks: Record<string, typeof topRisks[0] | undefined> = {};
  Object.entries(riskMatrixPositioning).forEach(([rid, pos]) => {
    const risk = topRisks.find((r) => r.id === rid);
    if (risk) cellRisks[`${pos.impact}-${pos.likelihood}`] = risk;
  });

  const rows = [
    { impact: "High", label: "High Impact" },
    { impact: "Medium", label: "Medium Impact" },
    { impact: "Low", label: "Low Impact" },
  ];
  const cols = [
    { likelihood: "Low", label: "Low Likelihood" },
    { likelihood: "Medium", label: "Medium Likelihood" },
    { likelihood: "High", label: "High Likelihood" },
  ];

  const cellColor = (impact: string, likelihood: string) => {
    const score =
      (impact === "High" ? 3 : impact === "Medium" ? 2 : 1) +
      (likelihood === "High" ? 3 : likelihood === "Medium" ? 2 : 1);
    if (score >= 5) return "bg-rose/10 hover:bg-rose/20 border-rose/30";
    if (score >= 4) return "bg-amber/10 hover:bg-amber/20 border-amber/30";
    return "bg-emerald/10 hover:bg-emerald/20 border-emerald/30";
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <Activity className="size-5 text-amber" />
          <div>
            <CardTitle className="text-lg">Risk Heat Map</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              All 8 risks from the register, plotted by likelihood × impact. Top 3 (the highest
              priority) are detailed below.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2">
          {/* Empty top-left */}
          <div></div>
          {cols.map((c) => (
            <div key={c.likelihood} className="text-center">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                {c.label}
              </div>
            </div>
          ))}

          {rows.map((r) => (
            <div key={r.impact} className="contents">
              <div className="flex items-center">
                <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase rotate-180 [writing-mode:vertical-rl]">
                  {r.label}
                </div>
              </div>
              {cols.map((c) => {
                const cellKey = `${r.impact}-${c.likelihood}`;
                const risk = cellRisks[cellKey];
                const isTopRisk = risk && topRisks.some((tr) => tr.id === risk.id);
                return (
                  <div
                    key={cellKey}
                    className={cn(
                      "aspect-square sm:aspect-[4/3] rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-colors",
                      cellColor(r.impact, c.likelihood)
                    )}
                  >
                    {risk && (
                      <div className="text-center">
                        <div
                          className={cn(
                            "inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono font-bold",
                            isTopRisk
                              ? "bg-ink text-background"
                              : "bg-card text-foreground border border-border"
                          )}
                        >
                          {risk.index}
                        </div>
                        <div className="text-[9px] text-muted-foreground mt-1 line-clamp-2 leading-tight">
                          {risk.title.split("—")[0].trim()}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RisksSection() {
  const [activeRiskIndex, setActiveRiskIndex] = useState(0);
  const [showDay30, setShowDay30] = useState<Record<string, boolean>>({});

  const activeRisk = topRisks[activeRiskIndex];

  return (
    <SectionShell
      id="risks"
      eyebrow="Artifact 05 · Tier 3"
      title="Risk Mitigation One-Pager"
      description="The top 3 risks from the Implementation Plan's Risk Register (R2, R1, R7), each with a Day-1 mitigation, a Day-30 mitigation, and a named escalation path. Plus the full 8-risk heat map for context."
      badge="Day-1 Ready"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {riskStats.map((stat) => (
          <Card key={stat.label} className="bg-card/60">
            <CardContent className="p-4">
              <div className="text-xl sm:text-2xl font-semibold text-amber">{stat.value}</div>
              <div className="text-xs font-medium mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Heat map */}
      <div className="mb-10">
        <RiskMatrix />
      </div>

      {/* Risk selector tabs */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {topRisks.map((r, idx) => (
          <button
            key={r.id}
            onClick={() => setActiveRiskIndex(idx)}
            className={cn(
              "text-left p-4 rounded-lg border-2 transition-all",
              idx === activeRiskIndex
                ? "border-amber bg-amber/[0.06] shadow-sm"
                : "border-border hover:border-amber/30 bg-card/40"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold",
                  idx === activeRiskIndex
                    ? "bg-amber text-amber-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                R{r.id.replace("r", "")}
              </div>
              <LikelihoodImpactBadge likelihood={r.likelihood} impact={r.impact} />
            </div>
            <h3 className="text-sm font-semibold leading-snug line-clamp-2">{r.title}</h3>
          </button>
        ))}
      </div>

      {/* Active risk detail */}
      <Card className="border-amber/30 overflow-hidden">
        <CardHeader className="border-b border-border/60">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                  Risk R{activeRisk.id.replace("r", "")} · Priority {activeRisk.index} of 3
                </span>
                <LikelihoodImpactBadge likelihood={activeRisk.likelihood} impact={activeRisk.impact} />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-balance">
                {activeRisk.title}
              </CardTitle>
            </div>
            <div className="shrink-0 p-3 rounded-lg bg-rose/10 border border-rose/30">
              <AlertTriangle className="size-6 text-rose" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {/* Description */}
          <div>
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">
              Description
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
              {activeRisk.description}
            </p>
          </div>

          {/* Early signal */}
          <div className="p-4 rounded-lg border border-amber/30 bg-amber/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="size-4 text-amber" />
              <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                Early Signal — When to Worry
              </span>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{activeRisk.earlySignal}</p>
          </div>

          {/* Day 1 mitigation */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-emerald/30 bg-emerald/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-emerald" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald uppercase">
                    Day 1 Mitigation
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{activeRisk.day1Mitigation}</p>
            </div>

            {/* Day 30 mitigation (expandable on mobile, always visible on lg) */}
            <div className="p-4 rounded-lg border border-amber/30 bg-amber/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-amber" />
                  <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                    Day 30 Mitigation
                  </span>
                </div>
                <button
                  onClick={() =>
                    setShowDay30((prev) => ({
                      ...prev,
                      [activeRisk.id]: !prev[activeRisk.id],
                    }))
                  }
                  className="lg:hidden text-xs text-amber font-mono"
                >
                  {showDay30[activeRisk.id] ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
              </div>
              <p
                className={cn(
                  "text-sm text-foreground/85 leading-relaxed",
                  !showDay30[activeRisk.id] && "hidden lg:block"
                )}
              >
                {activeRisk.day30Mitigation}
              </p>
            </div>
          </div>

          {/* Escalation path */}
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="size-4 text-amber" />
              <span className="text-[10px] font-mono tracking-widest text-amber uppercase">
                Escalation Path
              </span>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              {activeRisk.escalationPath}
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-border/60">
              <UserCheck className="size-3.5 text-muted-foreground" />
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                Owner (RACI)
              </span>
            </div>
            <p className="text-xs text-foreground/80 mt-1 font-mono">{activeRisk.owner}</p>
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <Card className="mt-8 border-dashed bg-muted/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Shield className="size-5 text-amber shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold mb-1">
                What the other 5 risks look like
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The full risk register (R3–R8) covers: regional cultural resistance to US-centric
                content, AI translation quality drift, AI data privacy (PII leakage), manager
                sponsorship gaps from function heads, and rebrand-related culture drift. Each has
                its own Day-1 mitigation in the Implementation Plan. The 3 risks above are the
                highest-priority ones to walk into the interview ready to discuss.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
