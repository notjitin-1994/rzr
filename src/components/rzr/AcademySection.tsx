"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Trophy,
  Star,
  Compass,
  Headphones,
  Video,
  Layers,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { academy, academyStats, onboardingModules } from "@/data/academy";
import { TrackHero } from "./academy/TrackHero";
import { ModuleExperience } from "./academy/ModuleExperience";

// ============================================================================
// Gamification — Achievement Definitions
// ============================================================================
type Badge = {
  id: string;
  name: string;
  description: string;
  icon: any;
  check: (state: GamificationState) => boolean;
  category: "milestone" | "exploration" | "mastery" | "engagement";
};

type GamificationState = {
  completedModules: Set<string>;
  correctChecks: number;
  totalChecks: number;
  viewedTypes: Set<string>;
  voiceoverUsed: boolean;
  videoWatched: boolean;
};

const BADGES: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first module",
    icon: Star,
    category: "milestone",
    check: (s) => s.completedModules.size >= 1,
  },
  {
    id: "foundation-builder",
    name: "Foundation Builder",
    description: "Complete all 5 Onboarding modules",
    icon: Trophy,
    category: "milestone",
    check: (s) => s.completedModules.size >= 5,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Answer all knowledge checks correctly",
    icon: GraduationCap,
    category: "mastery",
    check: (s) => s.totalChecks >= 5 && s.correctChecks === s.totalChecks,
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "View all infographic types",
    icon: Compass,
    category: "exploration",
    check: (s) => s.viewedTypes.size >= 6,
  },
  {
    id: "voice-explorer",
    name: "Voice Explorer",
    description: "Use voiceover narration",
    icon: Headphones,
    category: "engagement",
    check: (s) => s.voiceoverUsed,
  },
  {
    id: "video-viewer",
    name: "Video Watcher",
    description: "Watch the Onboarding intro video",
    icon: Video,
    category: "engagement",
    check: (s) => s.videoWatched,
  },
  {
    id: "fast-track",
    name: "Fast Track",
    description: "Perfect score on all knowledge checks",
    icon: Zap,
    category: "mastery",
    check: (s) => s.totalChecks >= 5 && s.correctChecks >= 5,
  },
];

// ============================================================================
// AcademySection
// ============================================================================
export function AcademySection() {
  const reduce = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState("onboarding");
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [showAchievements, setShowAchievements] = useState(false);
  const [newBadge, setNewBadge] = useState<string | null>(null);

  // Gamification state
  const [gState, setGState] = useState<GamificationState>({
    completedModules: new Set(),
    correctChecks: 0,
    totalChecks: 0,
    viewedTypes: new Set(),
    voiceoverUsed: false,
    videoWatched: false,
  });

  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());

  const activeTrack = academy.tracks.find((t) => t.id === activeTrackId);
  const modules = activeTrack?.modules || [];
  const activeModule = activeModuleIndex !== null ? modules[activeModuleIndex] : null;

  const progressPct = modules.length > 0 ? (completedModules.size / modules.length) * 100 : 0;

  // Check for new badge unlocks whenever gamification state changes
  useEffect(() => {
    for (const badge of BADGES) {
      if (!earnedBadges.has(badge.id) && badge.check(gState)) {
        setEarnedBadges((prev) => new Set(prev).add(badge.id));
        setNewBadge(badge.id);
        setTimeout(() => setNewBadge(null), 4000);
      }
    }
  }, [gState]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set(prev).add(moduleId));
    setGState((prev) => {
      const next = new Set(prev.completedModules);
      next.add(moduleId);
      return { ...prev, completedModules: next };
    });
  };

  const handleBackToModules = () => {
    setActiveModuleIndex(null);
  };

  const handleNextModule = () => {
    if (activeModuleIndex !== null && activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex !== null && activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  const handleSceneView = (_sceneId: string, sceneType: string) => {
    setGState((prev) => {
      const next = new Set(prev.viewedTypes);
      next.add(sceneType);
      return { ...prev, viewedTypes: next };
    });
  };

  const handleKnowledgeCheck = (correct: boolean) => {
    setGState((prev) => ({
      ...prev,
      totalChecks: prev.totalChecks + 1,
      correctChecks: prev.correctChecks + (correct ? 1 : 0),
    }));
  };

  const handleVideoWatch = () => {
    setGState((prev) => ({ ...prev, videoWatched: true }));
  };

  const earnedIds = earnedBadges;
  const earnedCount = earnedIds.size;
  const totalBadges = BADGES.length;

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

      {/* Progress + badges row */}
      <div className="flex items-start gap-4 mb-8">
        {/* Progress bar */}
        {activeTrackId === "onboarding" && (
          <Card className="flex-1 border-mint/30 bg-mint/[0.03]">
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

        {/* Badges summary */}
        <button
          onClick={() => setShowAchievements(!showAchievements)}
          className="shrink-0 p-4 rounded-lg border border-border hover:border-mint/40 hover:bg-mint/[0.03] transition-all text-left"
        >
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="size-4 text-mint" />
            <span className="text-xs font-semibold">Achievements</span>
          </div>
          <div className="text-lg font-bold text-mint font-mono">
            {earnedCount}
            <span className="text-xs text-muted-foreground font-normal"> / {totalBadges}</span>
          </div>
        </button>
      </div>

      {/* Achievements panel */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <Card className="border-mint/20 bg-mint/[0.02]">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="size-4 text-mint" />
                  <span className="text-xs font-mono tracking-widest text-mint uppercase">
                    Badges & Achievements
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {earnedCount} / {totalBadges} earned
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {BADGES.map((badge) => {
                    const earned = earnedBadges.has(badge.id);
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={badge.id}
                        initial={false}
                        animate={{ scale: earned ? 1 : 0.95 }}
                        className={cn(
                          "p-3 rounded-lg border text-center transition-all",
                          earned
                            ? "border-mint/40 bg-mint/10"
                            : "border-border/60 bg-muted/20 opacity-60"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full mx-auto mb-2",
                            earned
                              ? "bg-mint text-background shadow-[0_0_12px_rgba(0,189,165,0.3)]"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div className="text-xs font-semibold text-foreground">{badge.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {badge.description}
                        </div>
                        {earned && (
                          <Badge className="mt-2 text-[8px] bg-mint text-background font-mono">
                            Earned
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module selector or Module experience */}
      {activeModule ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToModules}
              className="gap-1"
            >
              ← Back to modules
            </Button>
          </div>

          <ModuleExperience
            key={activeModule.id}
            module={activeModule}
            onComplete={() => handleModuleComplete(activeModule.id)}
            isCompleted={completedModules.has(activeModule.id)}
            moduleIndex={activeModuleIndex ?? 0}
            modulesCount={modules.length}
            onPrevModule={handlePrevModule}
            onNextModule={handleNextModule}
            onSceneView={handleSceneView}
            onKnowledgeCheckResult={handleKnowledgeCheck}
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
              {modules.map((mod, idx) => {
                const isComplete = completedModules.has(mod.id);
                const moduleBadgeCount = BADGES.filter((b) => {
                  if (b.id === "foundation-builder" && earnedBadges.has(b.id)) return true;
                  if (b.id === "knowledge-seeker" && earnedBadges.has(b.id) && idx === 0) return true;
                  return false;
                }).length;

                return (
                  <motion.div
                    key={mod.id}
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
                              {isComplete ? <Check className="size-4" /> : mod.index}
                            </div>
                            <Badge variant="outline" className="font-mono text-[10px]">
                              <Clock className="size-2.5 mr-1" />
                              {mod.duration}
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
                          {mod.shortTitle}
                        </h4>

                        {/* Tagline */}
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {mod.tagline}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/60">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {mod.scenes.length} scenes
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
                <Trophy className="size-10 text-muted-foreground mx-auto" />
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

      {/* Badge unlocked notification */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50"
          >
            {(() => {
              const badge = BADGES.find((b) => b.id === newBadge);
              if (!badge) return null;
              const Icon = badge.icon;
              return (
                <Card className="border-mint bg-mint/10 shadow-[0_8px_32px_rgba(0,189,165,0.3)] backdrop-blur">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mint text-background animate-pulse">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="text-xs font-mono tracking-widest text-mint uppercase">
                        Badge Unlocked
                      </div>
                      <div className="text-sm font-semibold text-foreground">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

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