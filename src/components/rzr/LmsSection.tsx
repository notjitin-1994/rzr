"use client";

import { useState, useMemo } from "react";
import { SectionShell } from "./SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  lmsVendors,
  lmsCriteria,
  computeWeightedScore,
  lmsRecommendation,
} from "@/data/lms";
import { Award, TrendingUp, Calendar, Check, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

function ScoreCell({ score }: { score: number }) {
  // Brand-only color discipline: mint for strong, neutral for mid, ink for weak.
  // Severity is reinforced by the number itself, not by hue.
  const color =
    score >= 5
      ? "bg-mint text-background border-mint"
      : score >= 4
      ? "bg-mint/15 text-mint border-mint/30"
      : score >= 3
      ? "bg-muted text-foreground border-border"
      : "bg-ink/8 text-ink/70 border-ink/20";

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded-md border text-xs font-mono font-bold",
        color
      )}
    >
      {score}
    </div>
  );
}

export function LmsSection() {
  const [activeVendor, setActiveVendor] = useState<string>("disprz");

  const sortedVendors = useMemo(
    () =>
      [...lmsVendors]
        .map((v) => ({ vendor: v, score: computeWeightedScore(v) }))
        .sort((a, b) => b.score - a.score),
    []
  );

  const topVendor = sortedVendors[0];
  const activeVendorData = lmsVendors.find((v) => v.id === activeVendor)!;

  return (
    <SectionShell
      id="lms"
      eyebrow="Artifact 03 · Technology Decision"
      title="The LMS decision, ready to make."
      description="Five vendors scored against ten weighted criteria — a joint L&D + IT + Procurement decision sequenced for Q2. Below: ranked scoring matrix, drill-down on each vendor, the primary recommendation, and the eight-week procurement timeline."
      strategicFrame="RZR has no LMS today. Year-1 includes LMS evaluation, selection, and rollout — and a slip here cascades into Year-2 AI personalization. This matrix rehearses the decision so the Q2 contract milestone holds."
      outcomeChip="Q2 contract · Q4 go-live"
      badge="Decision-Ready"
    >
      {/* Top-line recommendation */}
      <Card className="mb-10 border-mint/40 bg-gradient-to-br from-mint/[0.06] via-transparent to-mint/[0.04]">
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <Award className="size-4 text-mint" />
                <span className="text-[10px] font-mono tracking-widest text-mint uppercase">
                  Primary Recommendation
                </span>
              </div>
              <h3 className="text-3xl font-semibold tracking-tight">
                {lmsRecommendation.primary}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty">
                {lmsRecommendation.primaryReason}
              </p>
              <div className="mt-4 p-3 rounded-md border border-border/60 bg-card/60">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="size-3.5 text-mint" />
                  <span className="text-[10px] font-mono tracking-widest text-mint uppercase">
                    Secondary / Year-2 Re-evaluation
                  </span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  <span className="font-semibold">{lmsRecommendation.secondary}</span>:{" "}
                  {lmsRecommendation.secondaryReason}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
                  Ranked Scores (Weighted)
                </div>
                <ul className="space-y-2">
                  {sortedVendors.map((entry, idx) => (
                    <li key={entry.vendor.id}>
                      <button
                        onClick={() => setActiveVendor(entry.vendor.id)}
                        className={cn(
                          "w-full text-left p-2.5 rounded-md border transition-all flex items-center justify-between gap-2",
                          activeVendor === entry.vendor.id
                            ? "border-mint/50 bg-mint/10"
                            : "border-border hover:border-mint/30 bg-card/40"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-mono font-bold",
                              idx === 0
                                ? "bg-mint text-background"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-sm font-semibold">{entry.vendor.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                idx === 0 ? "bg-mint" : "bg-mint/70"
                              )}
                              style={{ width: `${entry.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold w-9 text-right">
                            {entry.score}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scoring matrix table */}
      <Card className="mb-10 overflow-hidden">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-lg">Weighted Scoring Matrix</CardTitle>
          <p className="text-sm text-muted-foreground">
            Hover any criterion for its description · Click any vendor name for the drill-down
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-thin">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="sticky left-0 bg-card min-w-[260px] z-10">
                    Criterion
                  </TableHead>
                  <TableHead className="text-center w-16">Weight</TableHead>
                  {lmsVendors.map((v) => (
                    <TableHead
                      key={v.id}
                      className="text-center min-w-[100px] p-0"
                    >
                      <button
                        onClick={() => setActiveVendor(v.id)}
                        className={cn(
                          "w-full p-3 cursor-pointer transition-colors hover:bg-accent/60",
                          activeVendor === v.id && "bg-mint/10"
                        )}
                      >
                        <div className="font-semibold">{v.name}</div>
                        <div className="text-[10px] font-normal text-muted-foreground mt-0.5">
                          {v.hq}
                        </div>
                      </button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {lmsCriteria.map((criterion) => (
                  <TableRow key={criterion.id} className="hover:bg-muted/30">
                    <TableCell className="sticky left-0 bg-card z-10">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help text-sm font-medium">
                              {criterion.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-xs">{criterion.description}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              Category: {criterion.category}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-xs font-mono text-mint font-bold">
                        {criterion.weight}
                      </span>
                    </TableCell>
                    {lmsVendors.map((vendor) => (
                      <TableCell key={vendor.id} className="text-center">
                        <ScoreCell score={vendor.scores[criterion.id]} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {/* Weighted total row */}
                <TableRow className="border-t-2 border-mint/30 bg-mint/[0.04] hover:bg-mint/[0.06]">
                  <TableCell className="sticky left-0 bg-mint/[0.04] z-10 font-bold text-sm">
                    Weighted Score (out of 100)
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-[10px] text-muted-foreground">—</span>
                  </TableCell>
                  {lmsVendors.map((vendor) => {
                    const score = computeWeightedScore(vendor);
                    const isTop = vendor.id === topVendor.vendor.id;
                    return (
                      <TableCell key={vendor.id} className="text-center">
                        <div
                          className={cn(
                            "inline-flex items-center justify-center px-3 py-1.5 rounded-md font-mono font-bold text-sm",
                            isTop
                              ? "bg-mint text-background"
                              : "bg-muted text-foreground"
                          )}
                        >
                          {score}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Indicative cost row */}
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="sticky left-0 bg-card z-10 text-sm font-medium">
                    Indicative Annual Cost
                  </TableCell>
                  <TableCell className="text-center text-[10px] text-muted-foreground">—</TableCell>
                  {lmsVendors.map((v) => (
                    <TableCell key={v.id} className="text-center text-xs font-mono">
                      {v.indicativeCost}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Implementation row */}
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="sticky left-0 bg-card z-10 text-sm font-medium">
                    Implementation
                  </TableCell>
                  <TableCell className="text-center text-[10px] text-muted-foreground">—</TableCell>
                  {lmsVendors.map((v) => (
                    <TableCell key={v.id} className="text-center text-xs font-mono">
                      {v.implementationWeeks}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Active vendor drill-down */}
      <Card className="mb-10 border-mint/30">
        <CardHeader className="border-b border-border/60">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-mono tracking-widest text-mint uppercase">
                  Vendor Drill-down
                </span>
                {activeVendorData.id === topVendor.vendor.id && (
                  <Badge className="bg-mint text-background text-[10px] font-mono gap-1">
                    <Award className="size-2.5" />
                    Recommended
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{activeVendorData.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                HQ: {activeVendorData.hq} · Founded: {activeVendorData.founded} ·{" "}
                {activeVendorData.positioning}
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-mint">
                {computeWeightedScore(activeVendorData)}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                Weighted Score
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Check className="size-4 text-mint" />
                <h4 className="text-sm font-semibold text-mint uppercase tracking-wider font-mono">
                  Strengths
                </h4>
              </div>
              <ul className="space-y-2">
                {activeVendorData.strengths.map((s, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-foreground/85 leading-relaxed pl-4 border-l-2 border-mint/40"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TriangleAlert className="size-4 text-mint" />
                <h4 className="text-sm font-semibold text-mint uppercase tracking-wider font-mono">
                  Weaknesses
                </h4>
              </div>
              <ul className="space-y-2">
                {activeVendorData.weaknesses.map((w, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-foreground/85 leading-relaxed pl-4 border-l-2 border-mint/40"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-md border border-mint/30 bg-mint/[0.04]">
            <div className="flex items-start gap-3">
              <Info className="size-4 text-mint shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-mono tracking-widest text-mint uppercase mb-1">
                  Best Fit
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {activeVendorData.bestFit}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procurement timeline */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-mint" />
            <div>
              <CardTitle className="text-lg">8-Week Procurement Timeline</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {lmsRecommendation.decisionProcess}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ol className="relative border-l-2 border-mint/30 ml-3 space-y-6">
            {lmsRecommendation.timeline.map((step, idx) => (
              <li key={idx} className="ml-6 relative">
                <span className="absolute -left-[39px] flex items-center justify-center w-7 h-7 rounded-full bg-mint text-background text-[10px] font-mono font-bold border-2 border-background">
                  {idx + 1}
                </span>
                <div className="text-[10px] font-mono tracking-widest text-mint uppercase mb-1">
                  {step.week}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{step.activity}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
