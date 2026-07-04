"use client";

import { useState } from "react";
import { SectionShell } from "./SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ftmSlides,
  ftmModuleStats,
  l1Survey,
  l2KnowledgeCheck,
} from "@/data/ftm";
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Info,
  Lightbulb,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FtmSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  // L1 survey state
  const [l1Ratings, setL1Ratings] = useState<Record<string, number>>({});
  const [l1Text, setL1Text] = useState<Record<string, string>>({});
  const [l1Submitted, setL1Submitted] = useState(false);

  // L2 state
  const [l2Answers, setL2Answers] = useState<Record<string, number>>({});
  const [l2Submitted, setL2Submitted] = useState(false);

  const slide = ftmSlides[activeSlide];
  const slidePct = ((activeSlide + 1) / ftmSlides.length) * 100;

  const l2Score = l2KnowledgeCheck.filter(
    (q) => l2Answers[q.id] === q.correctIndex
  ).length;
  const l2Pct = (l2Score / l2KnowledgeCheck.length) * 100;

  return (
    <SectionShell
      id="ftm"
      eyebrow="Artifact 02 · Tier 1"
      title="FTM Module — Feedback Delivery"
      description="Module 1 of the 8-module First-Time Manager program. Fully built: 7-slide deck with speaker notes, an L1 reaction survey, and an L2 knowledge check. This is the production-quality template every FTM module will follow."
      badge="Fully Built Sample"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {ftmModuleStats.map((stat) => (
          <Card key={stat.label} className="bg-card/60">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-semibold text-amber">{stat.value}</div>
              <div className="text-xs font-medium mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="deck" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 w-full max-w-md">
          <TabsTrigger value="deck" className="text-xs sm:text-sm gap-1.5">
            <Presentation className="size-3.5" />
            <span className="hidden sm:inline">Deck</span>
          </TabsTrigger>
          <TabsTrigger value="l1" className="text-xs sm:text-sm gap-1.5">
            <ClipboardList className="size-3.5" />
            <span className="hidden sm:inline">L1 Survey</span>
          </TabsTrigger>
          <TabsTrigger value="l2" className="text-xs sm:text-sm gap-1.5">
            <CheckCircle2 className="size-3.5" />
            <span className="hidden sm:inline">L2 Check</span>
          </TabsTrigger>
        </TabsList>

        {/* DECK TAB */}
        <TabsContent value="deck" className="mt-0">
          <Card className="overflow-hidden border-border/80">
            {/* Slide viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-ink text-background overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber/20 rounded-full blur-3xl" />

              <div className="relative h-full flex flex-col p-6 sm:p-10 lg:p-14">
                {/* Slide header */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-[10px] font-mono text-amber tracking-widest uppercase">
                    Slide {slide.index} / {ftmSlides.length}
                  </span>
                  <span className="text-[10px] font-mono text-background/40 tracking-widest uppercase">
                    · {slide.type}
                  </span>
                </div>

                {/* Slide content */}
                <div className="flex-1 flex flex-col justify-center max-w-4xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance leading-tight">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-background/70 text-pretty">
                      {slide.subtitle}
                    </p>
                  )}

                  {slide.body && (
                    <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-base text-background/80 leading-relaxed max-w-3xl">
                      {slide.body}
                    </p>
                  )}

                  {slide.bullets && (
                    <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 max-w-3xl">
                      {slide.bullets.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm lg:text-base text-background/85 leading-relaxed"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber/20 text-amber text-[10px] font-mono font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.visual?.kind === "framework" && (
                    <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
                      {slide.visual.data.steps.map((step: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 sm:p-4 rounded-lg border border-amber/30 bg-amber/5"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber text-ink font-mono font-bold text-sm">
                              {step.letter}
                            </div>
                            <div className="text-sm font-semibold text-amber">{step.word}</div>
                          </div>
                          <div className="text-[10px] font-mono text-background/50 uppercase tracking-wider mb-1">
                            {step.question}
                          </div>
                          <p className="text-[11px] sm:text-xs text-background/75 italic leading-relaxed">
                            {step.example}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.visual?.kind === "matrix" && (
                    <div className="mt-6 max-w-4xl overflow-hidden rounded-lg border border-amber/20">
                      <div className="grid grid-cols-4 bg-amber/10 text-[10px] font-mono uppercase tracking-wider text-amber">
                        <div className="p-2 sm:p-3">Weight</div>
                        <div className="p-2 sm:p-3">Timing</div>
                        <div className="p-2 sm:p-3">Channel</div>
                        <div className="p-2 sm:p-3 hidden sm:block">Why</div>
                      </div>
                      {slide.visual.data.rows.map((row: any, idx: number) => (
                        <div
                          key={idx}
                          className="grid grid-cols-4 border-t border-amber/15 text-[11px] sm:text-xs"
                        >
                          <div className="p-2 sm:p-3 font-medium text-background/90">{row.weight}</div>
                          <div className="p-2 sm:p-3 text-background/75">{row.timing}</div>
                          <div className="p-2 sm:p-3 text-background/75">{row.channel}</div>
                          <div className="p-2 sm:p-3 text-background/65 leading-snug hidden sm:block">
                            {row.why}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom row */}
                <div className="mt-4 sm:mt-6 flex items-center justify-between text-[10px] font-mono text-background/40 tracking-widest uppercase">
                  <span>RZR · FTM Module 1 · Feedback Delivery</span>
                  <span>Where Intelligence Makes Impact</span>
                </div>
              </div>
            </div>

            {/* Slide controls */}
            <div className="border-t border-border/60 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveSlide((s) => Math.max(0, s - 1))}
                  disabled={activeSlide === 0}
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveSlide((s) => Math.min(ftmSlides.length - 1, s + 1))}
                  disabled={activeSlide === ftmSlides.length - 1}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <Progress value={slidePct} className="h-1.5 flex-1" />
                <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                  {activeSlide + 1} / {ftmSlides.length}
                </span>
              </div>

              <Button
                size="sm"
                variant={showNotes ? "default" : "ghost"}
                onClick={() => setShowNotes((v) => !v)}
                className="gap-1.5"
              >
                <Lightbulb className="size-3.5" />
                Facilitator notes
              </Button>
            </div>

            {/* Speaker notes panel */}
            {showNotes && (
              <div className="border-t border-border/60 p-4 sm:p-5 bg-amber/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/15 text-amber shrink-0">
                    <Lightbulb className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono tracking-widest text-amber uppercase mb-1">
                      Facilitator Notes · Slide {slide.index}
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed italic">
                      {slide.speakerNotes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Slide thumbnails */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {ftmSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={cn(
                  "aspect-[16/10] rounded-md border-2 p-2 text-left transition-all",
                  idx === activeSlide
                    ? "border-amber bg-amber/10"
                    : "border-border hover:border-amber/40 bg-card/40"
                )}
              >
                <div className="text-[8px] font-mono text-muted-foreground mb-1">
                  {String(s.index).padStart(2, "0")}
                </div>
                <div className="text-[10px] font-semibold leading-tight line-clamp-3">
                  {s.title}
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* L1 SURVEY TAB */}
        <TabsContent value="l1" className="mt-0">
          <Card>
            <CardHeader className="border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber/15 text-amber">
                  <ClipboardList className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">L1 Reaction Survey</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post-session · 24-hour window · Year-1 target: ≥ 4.0 / 5.0 average
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {l1Survey.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono text-amber font-bold">
                      Q{idx + 1}
                    </span>
                    <p className="text-sm font-medium text-pretty">{q.text}</p>
                  </div>

                  {q.type === "rating" && q.scale && (
                    <div className="pl-7">
                      <RadioGroup
                        value={l1Ratings[q.id]?.toString() || ""}
                        onValueChange={(v) =>
                          setL1Ratings((prev) => ({ ...prev, [q.id]: parseInt(v) }))
                        }
                        className="flex flex-wrap items-center gap-2"
                        disabled={l1Submitted}
                      >
                        {Array.from(
                          { length: q.scale.max - q.scale.min + 1 },
                          (_, i) => q.scale!.min + i
                        ).map((n) => (
                          <div key={n} className="flex items-center gap-1.5">
                            <RadioGroupItem
                              value={n.toString()}
                              id={`${q.id}-${n}`}
                              className="peer"
                            />
                            <Label
                              htmlFor={`${q.id}-${n}`}
                              className="text-xs font-mono cursor-pointer w-7 h-7 flex items-center justify-center rounded border border-border peer-data-[state=checked]:bg-amber peer-data-[state=checked]:text-amber-foreground peer-data-[state=checked]:border-amber"
                            >
                              {n}
                            </Label>
                          </div>
                        ))}
                        <span className="text-[10px] text-muted-foreground font-mono ml-2">
                          {q.scale.labels[0]} → {q.scale.labels[1]}
                        </span>
                      </RadioGroup>
                    </div>
                  )}

                  {q.type === "open" && (
                    <div className="pl-7">
                      <Textarea
                        value={l1Text[q.id] || ""}
                        onChange={(e) =>
                          setL1Text((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        disabled={l1Submitted}
                        placeholder="Type your response..."
                        className="min-h-[80px] resize-y"
                      />
                    </div>
                  )}
                </div>
              ))}

              {!l1Submitted ? (
                <Button
                  onClick={() => setL1Submitted(true)}
                  className="bg-ink text-background hover:bg-ink-soft"
                >
                  Submit survey
                </Button>
              ) : (
                <div className="p-4 rounded-lg border border-emerald/40 bg-emerald/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-emerald">Survey captured</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      In production: response logged to LMS, aggregated to cohort dashboard,
                      visible to facilitator within 24 hours. Triggers L3 30/60/90 follow-up
                      schedule.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* L2 KNOWLEDGE CHECK TAB */}
        <TabsContent value="l2" className="mt-0">
          <Card>
            <CardHeader className="border-b border-border/60">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber/15 text-amber">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">L2 Knowledge Check</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pre / post · Year-1 target: ≥ 25% uplift pre→post
                    </p>
                  </div>
                </div>
                {l2Submitted && (
                  <Badge
                    variant={l2Pct >= 80 ? "default" : "destructive"}
                    className="font-mono text-xs"
                  >
                    Score: {l2Score} / {l2KnowledgeCheck.length} ({Math.round(l2Pct)}%)
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {l2KnowledgeCheck.map((q, idx) => {
                const selected = l2Answers[q.id];
                const submitted = l2Submitted;
                const isCorrect = submitted && selected === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-amber font-bold">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm font-medium text-pretty">{q.question}</p>
                    </div>
                    <div className="pl-7 space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selected === oIdx;
                        const isCorrectOption = oIdx === q.correctIndex;
                        const showCorrect = submitted && isCorrectOption;
                        const showIncorrect = submitted && isSelected && !isCorrectOption;

                        return (
                          <button
                            key={oIdx}
                            onClick={() =>
                              !submitted &&
                              setL2Answers((prev) => ({ ...prev, [q.id]: oIdx }))
                            }
                            disabled={submitted}
                            className={cn(
                              "w-full text-left p-3 rounded-md border-2 transition-all flex items-start gap-3",
                              showCorrect && "border-emerald bg-emerald/10",
                              showIncorrect && "border-rose bg-rose/10",
                              !submitted &&
                                "border-border hover:border-amber/50 hover:bg-amber/[0.04] cursor-pointer",
                              submitted &&
                                !showCorrect &&
                                !showIncorrect &&
                                "border-border opacity-60"
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center w-5 h-5 rounded-full shrink-0 text-[10px] font-mono font-bold border-2 mt-0.5",
                                showCorrect && "border-emerald bg-emerald text-emerald-foreground",
                                showIncorrect && "border-rose bg-rose text-rose-foreground",
                                !showCorrect &&
                                  !showIncorrect &&
                                  "border-border text-muted-foreground"
                              )}
                            >
                              {showCorrect ? (
                                <CheckCircle2 className="size-3" />
                              ) : showIncorrect ? (
                                <XCircle className="size-3" />
                              ) : (
                                String.fromCharCode(65 + oIdx)
                              )}
                            </div>
                            <span className="text-sm text-foreground leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div className="pl-7 p-3 rounded-md border border-border bg-muted/40 flex items-start gap-2">
                        <Info className="size-3.5 text-amber shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground/75 leading-relaxed">
                          <span className="font-semibold">Explanation: </span>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {!l2Submitted ? (
                <Button
                  onClick={() => setL2Submitted(true)}
                  disabled={Object.keys(l2Answers).length < l2KnowledgeCheck.length}
                  className="bg-ink text-background hover:bg-ink-soft"
                >
                  Submit answers
                </Button>
              ) : (
                <div
                  className={cn(
                    "p-4 rounded-lg border flex items-start gap-3",
                    l2Pct >= 80
                      ? "border-emerald/40 bg-emerald/[0.06]"
                      : "border-amber/40 bg-amber/[0.06]"
                  )}
                >
                  {l2Pct >= 80 ? (
                    <CheckCircle2 className="size-5 text-emerald shrink-0 mt-0.5" />
                  ) : (
                    <Quote className="size-5 text-amber shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-semibold">
                      {l2Pct >= 80
                        ? "Above Year-1 target threshold"
                        : "Below target — review explanations and retake"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score: {l2Score} / {l2KnowledgeCheck.length} ({Math.round(l2Pct)}%). In
                      production, this would be compared against the pre-session baseline to
                      compute uplift. Year-1 target: ≥ 25% pre→post uplift.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SectionShell>
  );
}
