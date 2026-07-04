"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Clock,
  Check,
  ArrowRight,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { academy, academyStats, onboardingModules } from "@/data/academy";
import { TrackHero } from "./academy/TrackHero";
import { ModuleExperience } from "./academy/ModuleExperience";

export function AcademySection() {
  const reduce = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState("onboarding");
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const activeTrack = academy.tracks.find((t) => t.id === activeTrackId);
  const modules = activeTrack?.modules || [];
  const activeModule = activeModuleIndex !== null ? modules[activeModuleIndex] : null;

  const progressPct = modules.length > 0 ? (completedModules.size / modules.length) * 100 : 0;

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set(prev).add(moduleId));
  };

  const handleBackToModules = () => {
    setActiveModuleIndex(null);
  };

  return (
    <SectionShell
      id="academy"
      eyebrow="Artifact 01 · RZR Academy"
      title="RZR Academy — the full learning ecosystem"
      description="RZR Academy is the umbrella learning platform covering the entire 30/60/90 journey. The Onboarding Foundation track (Day 1–7) is the first track every new hire walks through — five modules that build shared context before moving into Function and Role-Readiness layers."
      strategicFrame="RZR has no formal onboarding today. A 30-day global relaunch of RZR Academy is the first urgent mandate in the JD. This prototype demonstrates the architecture is real — not slideware."
      outcomeChip="30-day global relaunch"
      badge="Live Prototype"
    >
      {/* Academy hierarchy + track selector */}
      <TrackHero
        academy={academy}
        tracks={academy.tracks}
        activeTrackId={activeTrackId}
        onTrackChange={setActiveTrackId}
      />

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 mb-8">
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

      {/* Progress bar (only for onboarding track) */}
      {activeTrackId === "onboarding" && (
        <Card className="mb-8 border-mint/30 bg-mint/[0.03]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-4 text-mint" />
                <span className="text-sm font-semibold">Your progress</span>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {completedModules.size} / {modules.length} modules completed
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
      )}

      {/* Module selector or Module experience */}
      {activeModule ? (
        <div className="space-y-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToModules}
            className="gap-1"
          >
            ← Back to modules
          </Button>

          <ModuleExperience
            module={activeModule}
            onComplete={() => handleModuleComplete(activeModule.id)}
            isCompleted={completedModules.has(activeModule.id)}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
            {activeTrackId === "onboarding"
              ? "Foundation Modules · Day 1–7"
              : activeTrackId === "function"
              ? "Function Layer · Day 8–30"
              : "Role-Readiness · Day 15–90"}
          </div>

          {modules.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module, idx) => {
                const isComplete = completedModules.has(module.id);

                return (
                  <motion.div
                    key={module.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Card
                      className={cn(
                        "group cursor-pointer transition-all hover:shadow-card-hover",
                        isComplete && "border-mint/40 bg-mint/[0.03]"
                      )}
                      onClick={() => setActiveModuleIndex(idx)}
                    >
                      <CardContent className="p-5 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold",
                                isComplete
                                  ? "bg-mint text-background"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {isComplete ? <Check className="size-4" /> : module.index}
                            </div>
                            <Badge variant="outline" className="font-mono text-[10px]">
                              <Clock className="size-2.5 mr-1" />
                              {module.duration}
                            </Badge>
                          </div>
                          {isComplete && (
                            <Badge className="font-mono text-[10px] bg-mint text-background">
                              Done
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-semibold tracking-tight text-foreground group-hover:text-mint transition-colors">
                          {module.shortTitle}
                        </h4>

                        {/* Tagline */}
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {module.tagline}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/60">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {module.scenes.length} scenes
                          </span>
                          <div className="flex items-center gap-1 text-xs text-mint font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="size-3" />
                            Start
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Card className="border-dashed border-border bg-muted/20">
              <CardContent className="p-8 text-center space-y-3">
                <div className="text-4xl">🚧</div>
                <h4 className="text-lg font-semibold text-foreground">
                  {activeTrack?.name} — Coming Soon
                </h4>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {activeTrack?.description}
                </p>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {activeTrack?.status}
                </Badge>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Architecture note */}
      <div className="mt-10 p-4 rounded-lg border border-dashed border-border bg-muted/30">
        <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">
          Architecture
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          RZR Academy uses a three-layer model:{" "}
          <span className="font-semibold text-foreground">Foundation</span> (Day 1–7, onboarding),{" "}
          <span className="font-semibold text-foreground">Function</span> (Day 8–30, role-specific depth), and{" "}
          <span className="font-semibold text-foreground">Role-Readiness</span> (Day 15–90, customer-facing prep).
          This prototype shows the Foundation layer only. Function and Role-Readiness layers ship in succession.
        </p>
      </div>
    </SectionShell>
  );
}