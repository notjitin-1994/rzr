"use client";

import { useState } from "react";
import { SectionShell } from "./SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AcademyModule,
  academyModules,
  academyStats,
} from "@/data/academy";
import {
  CircleCheck,
  Clock,
  Globe,
  GraduationCap,
  Layers,
  Lock,
  Unlock,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AcademySection() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const activeModule = academyModules[activeModuleIndex];
  const isAnswered = answers[activeModule.id] !== undefined;
  const isRevealed = revealed[activeModule.id];
  const isCorrect = isAnswered && answers[activeModule.id] === activeModule.checkpointQuestion.correctIndex;

  const handleAnswer = (optionIndex: number) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [activeModule.id]: optionIndex }));
    setRevealed((prev) => ({ ...prev, [activeModule.id]: true }));

    if (optionIndex === activeModule.checkpointQuestion.correctIndex) {
      setCompletedModules((prev) => new Set(prev).add(activeModule.id));
    }
  };

  const progressPct = (completedModules.size / academyModules.length) * 100;

  const goNext = () => {
    if (activeModuleIndex < academyModules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    }
  };

  const goPrev = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  return (
    <SectionShell
      id="academy"
      eyebrow="Artifact 01 · Onboarding"
      title="RZR Academy — Day 1, built."
      description="A clickable, five-module Foundation-layer prototype for new-hire onboarding. Each module has learning outcomes, content sections, and an embedded knowledge check. Complete all five to see the progress bar fill — this is the experience a new RZR hire would actually walk through on Day 1."
      strategicFrame="RZR has no formal onboarding today. A 30-day global relaunch of RZR Academy is the first urgent mandate in the JD. This prototype demonstrates the architecture is real — not slideware."
      outcomeChip="30-day global relaunch"
      badge="Live Prototype"
    >
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {academyStats.map((stat) => (
          <Card key={stat.label} className="bg-card/60">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-semibold text-mint">{stat.value}</div>
              <div className="text-xs font-medium mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <Card className="mb-8 border-mint/30 bg-mint/[0.03]">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-mint" />
              <span className="text-sm font-semibold">Your progress</span>
            </div>
            <div className="text-sm font-mono text-muted-foreground">
              {completedModules.size} / {academyModules.length} modules completed
            </div>
          </div>
          <Progress value={progressPct} className="h-2 bg-mint/15" />
          <div className="mt-3 text-xs text-muted-foreground">
            {progressPct === 100
              ? "✓ All Foundation modules complete. Ready for Function-layer track (Day 8+)."
              : "Complete the knowledge check at the end of each module to mark it done."}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Module sidebar */}
        <div className="lg:col-span-3">
          <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
            Foundation Modules
          </div>
          <ol className="space-y-1">
            {academyModules.map((m, idx) => {
              const done = completedModules.has(m.id);
              const active = idx === activeModuleIndex;
              return (
                <li key={m.id}>
                  <button
                    onClick={() => setActiveModuleIndex(idx)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3",
                      active
                        ? "border-mint/50 bg-mint/10 shadow-sm"
                        : "border-border hover:border-mint/30 hover:bg-accent/40"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-xs font-mono font-semibold",
                        done
                          ? "bg-mint text-background"
                          : active
                          ? "bg-mint text-background"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : m.index}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "text-xs font-semibold leading-snug",
                          active ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {m.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground font-mono">
                        <Clock className="size-2.5" />
                        {m.duration}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 p-4 rounded-lg border border-dashed border-border bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="size-3.5 text-mint" />
              <span className="text-[10px] font-mono tracking-widest text-mint uppercase">
                Architecture
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              3-layer model. This prototype shows the{" "}
              <span className="font-semibold text-foreground">Foundation</span> layer only.
              Function and Role-Readiness layers ship Day 8–30.
            </p>
          </div>
        </div>

        {/* Active module content */}
        <div className="lg:col-span-9">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="font-mono text-[10px] border-mint/40 text-mint bg-mint/5">
                  Module {activeModule.index} of {academyModules.length}
                </Badge>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  <Clock className="size-2.5 mr-1" />
                  {activeModule.duration}
                </Badge>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {activeModule.format}
                </Badge>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  <Globe className="size-2.5 mr-1" />
                  EN · ZH · KO · ES (Q2)
                </Badge>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
                {activeModule.title}
              </CardTitle>
              <p className="text-base text-muted-foreground mt-2 text-pretty">
                {activeModule.tagline}
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <Tabs defaultValue="learn" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="learn" className="text-xs sm:text-sm">
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="outcomes" className="text-xs sm:text-sm">
                    Outcomes
                  </TabsTrigger>
                  <TabsTrigger value="check" className="text-xs sm:text-sm">
                    Knowledge Check
                  </TabsTrigger>
                </TabsList>

                {/* LEARN TAB */}
                <TabsContent value="learn" className="space-y-6 mt-0">
                  {activeModule.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[10px] font-mono text-mint font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-base font-semibold tracking-tight">
                          {section.heading}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                        {section.body}
                      </p>
                      {section.callout && (
                        <div className="ml-7 mt-2 p-3 rounded-md border-l-2 border-mint bg-mint/[0.04]">
                          <div className="flex items-start gap-2">
                            <BookOpen className="size-3.5 text-mint shrink-0 mt-0.5" />
                            <p className="text-xs text-foreground/80 italic leading-relaxed">
                              {section.callout}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>

                {/* OUTCOMES TAB */}
                <TabsContent value="outcomes" className="space-y-4 mt-0">
                  <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">
                    By the end of this module, you will be able to:
                  </div>
                  <ul className="space-y-3">
                    {activeModule.learningOutcomes.map((outcome, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/60"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-mint/15 text-mint text-xs font-mono font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{outcome}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 rounded-lg border border-dashed border-border bg-card/40">
                    <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">
                      Manager touch-point (Day 7)
                    </div>
                    <p className="text-sm text-foreground/80 italic">
                      &ldquo;Which of these outcomes feels most relevant to your first 30 days,
                      and which feels least relevant? Let&rsquo;s spend 10 minutes on this in our
                      next 1:1.&rdquo;
                    </p>
                  </div>
                </TabsContent>

                {/* KNOWLEDGE CHECK TAB */}
                <TabsContent value="check" className="space-y-5 mt-0">
                  <div className="p-4 rounded-lg border border-mint/30 bg-mint/[0.04]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
                        L2 Knowledge Check
                      </div>
                      {isRevealed && (
                        <Badge
                          variant={isCorrect ? "default" : "destructive"}
                          className="text-[10px] font-mono"
                        >
                          {isCorrect ? (
                            <>
                              <Check className="size-2.5 mr-1" /> Correct
                            </>
                          ) : (
                            <>
                              <X className="size-2.5 mr-1" /> Try again
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-pretty">
                      {activeModule.checkpointQuestion.question}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {activeModule.checkpointQuestion.options.map((option, idx) => {
                      const isSelected = answers[activeModule.id] === idx;
                      const isCorrectOption =
                        idx === activeModule.checkpointQuestion.correctIndex;
                      const showCorrect = isRevealed && isCorrectOption;
                      const showIncorrect = isRevealed && isSelected && !isCorrectOption;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          disabled={isRevealed}
                          className={cn(
                            "w-full text-left p-3.5 rounded-lg border-2 transition-all flex items-start gap-3",
                            showCorrect && "border-mint bg-mint/10",
                            showIncorrect && "border-ink bg-ink/10",
                            !isRevealed &&
                              "border-border hover:border-mint/50 hover:bg-mint/[0.04] cursor-pointer",
                            isRevealed && !showCorrect && !showIncorrect && "border-border opacity-60"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs font-mono font-bold border-2",
                              showCorrect && "border-mint bg-mint text-background",
                              showIncorrect && "border-ink bg-ink text-ink-foreground",
                              !showCorrect && !showIncorrect && "border-border text-muted-foreground"
                            )}
                          >
                            {showCorrect ? (
                              <Check className="size-3.5" />
                            ) : showIncorrect ? (
                              <X className="size-3.5" />
                            ) : (
                              String.fromCharCode(65 + idx)
                            )}
                          </div>
                          <p className="text-sm text-foreground leading-relaxed flex-1">
                            {option}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {isRevealed && (
                    <div
                      className={cn(
                        "p-4 rounded-lg border",
                        isCorrect
                          ? "border-mint/40 bg-mint/[0.06]"
                          : "border-mint/40 bg-mint/[0.06]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CircleCheck className="size-4 text-mint" />
                        ) : (
                          <BookOpen className="size-4 text-mint" />
                        )}
                        <span
                          className={cn(
                            "text-xs font-mono uppercase tracking-widest",
                            isCorrect ? "text-mint" : "text-mint"
                          )}
                        >
                          {isCorrect ? "Well done" : "Explanation"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {activeModule.checkpointQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {!isRevealed && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="size-3" />
                      Complete the check to unlock the next module.
                    </div>
                  )}
                  {isRevealed && (
                    <div className="flex items-center gap-2 text-xs text-mint">
                      <Unlock className="size-3" />
                      {isCorrect
                        ? "Module complete — next module unlocked."
                        : "Review the explanation, then proceed when ready."}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>

            {/* Footer nav */}
            <div className="border-t border-border/60 px-6 py-4 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={goPrev}
                disabled={activeModuleIndex === 0}
                className="gap-1"
              >
                <ArrowLeft className="size-3.5" />
                Prev
              </Button>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                {activeModule.layer} Layer
              </div>
              <Button
                size="sm"
                onClick={goNext}
                disabled={activeModuleIndex === academyModules.length - 1}
                className="gap-1 bg-ink text-background hover:bg-ink/85/85"
              >
                Next
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
