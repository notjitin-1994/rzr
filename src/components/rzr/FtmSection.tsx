"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@remotion/player";
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
import { FtmIntroVideo } from "@/remotion/FtmIntro";
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  ClipboardList,
  CircleCheck,
  CircleX,
  Info,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Layers,
  Clock,
  FileText,
  Users,
  Target,
  ArrowRightLeft,
  Shield,
  Heart,
  Play,
  Video,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  MessageSquare,
  TrendingUp,
  Layers,
  Clock,
  FileText,
  Users,
  Target,
  ArrowRightLeft,
  Shield,
  Heart,
};

export function FtmSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

  const Icon = slide.icon ? iconMap[slide.icon] : null;

  return (
    <SectionShell
      id="ftm"
      eyebrow="Artifact 02 · Manager Capability"
      title="First-Time Manager · Module 1, fully built."
      description="Module 1 of the 8-module First-Time Manager program: Feedback Delivery. A complete production artifact — 7-slide deck with comprehensive facilitator notes, an L1 reaction survey, and an L2 knowledge check. This is the template every FTM module follows."
      strategicFrame="Manager capability is the highest-leverage L&D investment. A great manager improves the performance of 6–10 ICs; a poor one destroys it. The 90-day FTM cohort #1 is the second urgent mandate in the JD — and this module proves the production system is ready to ship."
      outcomeChip="90-day FTM cohort live"
      badge="Production-Quality Sample"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {ftmModuleStats.map((stat) => (
          <Card key={stat.label} className="bg-card/60 hover:bg-card/80 transition-colors">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-semibold text-mint">{stat.value}</div>
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
            <CircleCheck className="size-3.5" />
            <span className="hidden sm:inline">L2 Check</span>
          </TabsTrigger>
        </TabsList>

        {/* DECK TAB */}
        <TabsContent value="deck" className="mt-0">
          <Card className="overflow-hidden border-border/80">
            {/* Slide viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-ink text-background overflow-hidden">
              {/* Background image with overlay */}
              {slide.backgroundImage && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/60" />
                </>
              )}
              {!slide.backgroundImage && (
                <>
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-mint/20 rounded-full blur-3xl" />
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full flex flex-col p-6 sm:p-10 lg:p-14"
                >
                  {/* Slide header */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    {Icon && (
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/20 text-mint">
                        <Icon className="size-5" />
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-mint tracking-widest uppercase">
                        Slide {slide.index} / {ftmSlides.length}
                      </span>
                      <span className="text-[10px] font-mono text-background/40 tracking-widest uppercase ml-2">
                        · {slide.type} · {slide.facilitatorNotes.timing}
                      </span>
                    </div>
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

                    {/* Visual assets */}
                    {slide.visual?.kind === "stats" && (
                      <div className="mt-6 grid grid-cols-3 gap-4 max-w-3xl">
                        {slide.visual.data.metrics.map((metric: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-lg border border-mint/30 bg-mint/5"
                          >
                            <div className="text-3xl font-bold text-mint">{metric.value}</div>
                            <div className="text-xs font-medium mt-1">{metric.label}</div>
                            <div className="text-[10px] text-background/60 mt-0.5">{metric.context}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {slide.visual?.kind === "framework" && (
                      <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
                        {slide.visual.data.steps.map((step: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-3 sm:p-4 rounded-lg border border-mint/30 bg-mint/5"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint text-ink font-mono font-bold text-sm">
                                {step.letter}
                              </div>
                              <div className="text-sm font-semibold text-mint">{step.word}</div>
                            </div>
                            <div className="text-[10px] font-mono text-background/50 uppercase tracking-wider mb-1">
                              {step.question}
                            </div>
                            <p className="text-[11px] sm:text-xs text-background/75 italic leading-relaxed">
                              {step.example}
                            </p>
                            {step.tip && (
                              <div className="mt-2 text-[10px] text-mint/80 font-medium">
                                💡 {step.tip}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {slide.visual?.kind === "matrix" && (
                      <div className="mt-6 max-w-4xl overflow-hidden rounded-lg border border-mint/20">
                        <div className="grid grid-cols-5 bg-mint/10 text-[10px] font-mono uppercase tracking-wider text-mint">
                          <div className="p-2 sm:p-3">Weight</div>
                          <div className="p-2 sm:p-3">Examples</div>
                          <div className="p-2 sm:p-3">Timing</div>
                          <div className="p-2 sm:p-3">Channel</div>
                          <div className="p-2 sm:p-3 hidden sm:block">Why</div>
                        </div>
                        {slide.visual.data.rows.map((row: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="grid grid-cols-5 border-t border-mint/15 text-[11px] sm:text-xs"
                          >
                            <div className="p-2 sm:p-3 font-medium text-background/90">
                              <Badge variant="outline" className={cn(
                                "text-[9px] font-mono",
                                row.color === "mint" && "border-mint/40 text-mint",
                                row.color === "yellow" && "border-yellow-500/40 text-yellow-500",
                                row.color === "orange" && "border-orange-500/40 text-orange-500",
                                row.color === "red" && "border-red-500/40 text-red-500",
                              )}>
                                {row.weight}
                              </Badge>
                            </div>
                            <div className="p-2 sm:p-3 text-background/75">{row.examples}</div>
                            <div className="p-2 sm:p-3 text-background/75">{row.timing}</div>
                            <div className="p-2 sm:p-3 text-background/75">{row.channel}</div>
                            <div className="p-2 sm:p-3 text-background/65 leading-snug hidden sm:block">
                              {row.why}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {slide.visual?.kind === "timeline" && (
                      <div className="mt-6 max-w-3xl">
                        <div className="relative">
                          {slide.visual.data.events.map((event: any, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.15 }}
                              className="flex gap-4 mb-4 last:mb-0"
                            >
                              <div className="flex flex-col items-center">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border-2",
                                  event.status === "past" && "bg-background/40 border-background/40",
                                  event.status === "current" && "bg-mint border-mint",
                                  event.status === "action" && "bg-orange-500 border-orange-500",
                                )} />
                                {idx < slide.visual!.data.events.length - 1 && (
                                  <div className="w-0.5 h-12 bg-background/20 mt-1" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="text-sm font-semibold text-background/90">{event.label}</div>
                                <div className="text-xs text-background/70 mt-0.5">{event.detail}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.visual?.kind === "infographic" && slide.visual.data.personas && (
                      <div className="mt-6 grid grid-cols-3 gap-4 max-w-3xl">
                        {slide.visual.data.personas.map((persona: any, idx: number) => {
                          const PersonaIcon = iconMap[persona.icon] || Users;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-4 rounded-lg border border-mint/30 bg-mint/5"
                            >
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mint/20 text-mint mb-3">
                                <PersonaIcon className="size-5" />
                              </div>
                              <div className="text-sm font-semibold text-background/90 mb-1">{persona.name}</div>
                              <div className="text-[11px] text-background/70 mb-2">{persona.behavior}</div>
                              <div className="text-[10px] text-mint font-medium">Challenge: {persona.challenge}</div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {slide.visual?.kind === "infographic" && slide.visual.data.reps && (
                      <div className="mt-6 grid grid-cols-3 gap-4 max-w-3xl">
                        {slide.visual.data.reps.map((rep: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-lg border border-mint/30 bg-mint/5"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mint text-ink font-bold text-lg mb-3">
                              {rep.number}
                            </div>
                            <div className="text-sm font-semibold text-background/90 mb-1">{rep.title}</div>
                            <div className="text-[11px] text-background/70 mb-1">{rep.timing}</div>
                            <div className="text-[10px] text-mint font-medium">{rep.channel}</div>
                            <div className="text-[10px] text-background/60 mt-1">{rep.focus}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {slide.bullets && (
                      <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 max-w-3xl">
                        {slide.bullets.map((b, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 text-xs sm:text-sm lg:text-base text-background/85 leading-relaxed"
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-mint/20 text-mint text-[10px] font-mono font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Bottom row */}
                  <div className="mt-4 sm:mt-6 flex items-center justify-between text-[10px] font-mono text-background/40 tracking-widest uppercase">
                    <span>RZR · FTM Module 1 · Feedback Delivery</span>
                    <span>Where Intelligence Makes Impact</span>
                  </div>
                </motion.div>
              </AnimatePresence>
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

              <div className="flex items-center gap-2">
                {activeSlide === 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowVideo(true)}
                    className="gap-1.5"
                  >
                    <Video className="size-3.5" />
                    Watch Intro
                  </Button>
                )}
                <Button
                  size="sm"
                  variant={showNotes ? "default" : "ghost"}
                  onClick={() => setShowNotes((v) => !v)}
                  className="gap-1.5"
                >
                  <BookOpen className="size-3.5" />
                  Facilitator Guide
                </Button>
              </div>
            </div>

            {/* Facilitator notes panel */}
            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border/60 bg-mint/[0.04] overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint/15 text-mint shrink-0">
                        <BookOpen className="size-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Facilitator Guide · Slide {slide.index}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {slide.facilitatorNotes.timing}
                        </div>
                      </div>
                    </div>

                    {slide.facilitatorNotes.opening && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Opening
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed italic">
                          {slide.facilitatorNotes.opening}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                        Engagement Strategies
                      </div>
                      <ul className="space-y-2">
                        {slide.facilitatorNotes.engagement.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                            <span className="text-mint mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {slide.facilitatorNotes.debrief && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Debrief Points
                        </div>
                        <ul className="space-y-1">
                          {slide.facilitatorNotes.debrief.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                              <span className="text-mint">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slide.facilitatorNotes.transfer && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Transfer Activity
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {slide.facilitatorNotes.transfer}
                        </p>
                      </div>
                    )}

                    {slide.facilitatorNotes.commonFailures && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Common Failures
                        </div>
                        <ul className="space-y-1">
                          {slide.facilitatorNotes.commonFailures.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                              <span className="text-orange-500">⚠</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slide.facilitatorNotes.psychologicalSafety && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                          Psychological Safety
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed italic">
                          {slide.facilitatorNotes.psychologicalSafety}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Slide thumbnails */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {ftmSlides.map((s, idx) => {
              const SlideIcon = s.icon ? iconMap[s.icon] : null;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className={cn(
                    "aspect-[16/10] rounded-md border-2 p-2 text-left transition-all",
                    idx === activeSlide
                      ? "border-mint bg-mint/10"
                      : "border-border hover:border-mint/40 bg-card/40"
                  )}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {SlideIcon && <SlideIcon className="size-3 text-muted-foreground" />}
                    <div className="text-[8px] font-mono text-muted-foreground">
                      {String(s.index).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold leading-tight line-clamp-3">
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>
        </TabsContent>

        {/* L1 SURVEY TAB */}
        <TabsContent value="l1" className="mt-0">
          <Card>
            <CardHeader className="border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/15 text-mint">
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
                    <span className="text-[10px] font-mono text-mint font-bold">
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
                              className="text-xs font-mono cursor-pointer w-7 h-7 flex items-center justify-center rounded border border-border peer-data-[state=checked]:bg-mint peer-data-[state=checked]:text-background peer-data-[state=checked]:border-mint"
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
                  className="bg-ink text-background hover:bg-ink/85"
                >
                  Submit survey
                </Button>
              ) : (
                <div className="p-4 rounded-lg border border-mint/40 bg-mint/[0.06] flex items-start gap-3">
                  <CircleCheck className="size-5 text-mint shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-mint">Survey captured</div>
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/15 text-mint">
                    <CircleCheck className="size-5" />
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
                      <span className="text-[10px] font-mono text-mint font-bold">
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
                              showCorrect && "border-mint bg-mint/10",
                              showIncorrect && "border-ink bg-ink/10",
                              !submitted &&
                                "border-border hover:border-mint/50 hover:bg-mint/[0.04] cursor-pointer",
                              submitted &&
                                !showCorrect &&
                                !showIncorrect &&
                                "border-border opacity-60"
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center w-5 h-5 rounded-full shrink-0 text-[10px] font-mono font-bold border-2 mt-0.5",
                                showCorrect && "border-mint bg-mint text-background",
                                showIncorrect && "border-ink bg-ink text-ink-foreground",
                                !showCorrect &&
                                  !showIncorrect &&
                                  "border-border text-muted-foreground"
                              )}
                            >
                              {showCorrect ? (
                                <CircleCheck className="size-3" />
                              ) : showIncorrect ? (
                                <CircleX className="size-3" />
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
                        <Info className="size-3.5 text-mint shrink-0 mt-0.5" />
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
                  className="bg-ink text-background hover:bg-ink/85"
                >
                  Submit answers
                </Button>
              ) : (
                <div
                  className={cn(
                    "p-4 rounded-lg border flex items-start gap-3",
                    l2Pct >= 80
                      ? "border-mint/40 bg-mint/[0.06]"
                      : "border-mint/40 bg-mint/[0.06]"
                  )}
                >
                  {l2Pct >= 80 ? (
                    <CircleCheck className="size-5 text-mint shrink-0 mt-0.5" />
                  ) : (
                    <MessageSquare className="size-5 text-mint shrink-0 mt-0.5" />
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

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Player
                component={FtmIntroVideo}
                durationInFrames={120}
                fps={30}
                compositionWidth={1280}
                compositionHeight={720}
                controls
                autoPlay
                style={{ width: "100%", height: "100%" }}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 bg-background/90 backdrop-blur"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
