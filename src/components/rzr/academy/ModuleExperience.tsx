"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Check,
  X,
  CircleCheck,
  BookOpen,
  Video,
  FileText,
  BarChart3,
  ClipboardCheck,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcademyModule, Scene } from "@/data/academy";
import { VideoStage } from "./VideoStage";
import { VoicePlayer } from "./VoicePlayer";
import { Infographic } from "./Infographics";

type ModuleExperienceProps = {
  module: AcademyModule;
  onComplete: () => void;
  isCompleted: boolean;
};

export function ModuleExperience({ module, onComplete, isCompleted }: ModuleExperienceProps) {
  const reduce = useReducedMotion();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const currentScene = module.scenes[currentSceneIndex];
  const isFirst = currentSceneIndex === 0;
  const isLast = currentSceneIndex === module.scenes.length - 1;

  const goNext = () => {
    if (!isLast) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const handleAnswer = (sceneId: string, optionIndex: number) => {
    if (revealed[sceneId]) return;
    setAnswers((prev) => ({ ...prev, [sceneId]: optionIndex }));
    setRevealed((prev) => ({ ...prev, [sceneId]: true }));

    // Check if correct and mark module complete
    if (currentScene.check && optionIndex === currentScene.check.correctIndex) {
      onComplete();
    }
  };

  const sceneIcon = (type: Scene["type"]) => {
    switch (type) {
      case "video":
        return Video;
      case "narration":
        return FileText;
      case "infographic":
        return BarChart3;
      case "check":
        return ClipboardCheck;
      case "transfer":
        return Rocket;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-[10px] border-mint/40 text-mint bg-mint/5">
            Module {module.index}
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            <Clock className="size-2.5 mr-1" />
            {module.duration}
          </Badge>
          {isCompleted && (
            <Badge variant="default" className="font-mono text-[10px] bg-mint text-background">
              <Check className="size-2.5 mr-1" />
              Complete
            </Badge>
          )}
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
        {module.title}
      </h3>

      <p className="text-base text-muted-foreground">{module.tagline}</p>

      {/* Scene strip */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {module.scenes.map((scene, idx) => {
          const Icon = sceneIcon(scene.type);
          const isCurrent = idx === currentSceneIndex;
          const isPast = idx < currentSceneIndex;

          return (
            <button
              key={scene.id}
              onClick={() => setCurrentSceneIndex(idx)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                isCurrent
                  ? "bg-mint text-background shadow-sm"
                  : isPast
                  ? "bg-mint/20 text-mint"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              <Icon className="size-3" />
              <span>{scene.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scene content */}
      <Card className="border-border/80 shadow-sm">
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? false : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <SceneRenderer
                scene={currentScene}
                answers={answers}
                revealed={revealed}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-1"
        >
          <ArrowLeft className="size-3.5" />
          Previous
        </Button>

        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
          Scene {currentSceneIndex + 1} of {module.scenes.length}
        </div>

        <Button
          size="sm"
          onClick={goNext}
          disabled={isLast}
          className="gap-1 bg-ink text-background hover:bg-ink/85"
        >
          Next
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// Scene Renderer
// ============================================================================
type SceneRendererProps = {
  scene: Scene;
  answers: Record<string, number>;
  revealed: Record<string, boolean>;
  onAnswer: (sceneId: string, optionIndex: number) => void;
};

function SceneRenderer({ scene, answers, revealed, onAnswer }: SceneRendererProps) {
  switch (scene.type) {
    case "video":
      return <VideoScene scene={scene} />;
    case "narration":
      return <NarrationScene scene={scene} />;
    case "infographic":
      return <InfographicScene scene={scene} />;
    case "check":
      return <CheckScene scene={scene} answers={answers} revealed={revealed} onAnswer={onAnswer} />;
    case "transfer":
      return <TransferScene scene={scene} />;
    default:
      return <div className="text-muted-foreground">Scene not available</div>;
  }
}

// ============================================================================
// Video Scene
// ============================================================================
function VideoScene({ scene }: { scene: Scene }) {
  return (
    <div className="space-y-4">
      {scene.videoId && <VideoStage videoId={scene.videoId} headline={scene.headline} />}
      {scene.narration && (
        <div className="text-sm text-muted-foreground text-center italic">
          {scene.narration.join(" ")}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Narration Scene
// ============================================================================
function NarrationScene({ scene }: { scene: Scene }) {
  return (
    <div className="space-y-6">
      {/* Eyebrow + Headline */}
      {scene.eyebrow && (
        <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
          {scene.eyebrow}
        </div>
      )}

      {scene.headline && (
        <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-balance">
          {scene.headline}
        </h4>
      )}

      {/* Voice player */}
      {scene.narration && <VoicePlayer text={scene.narration} />}

      {/* Narration text */}
      {scene.narration && (
        <div className="space-y-3">
          {scene.narration.map((line, idx) => (
            <p key={idx} className="text-sm text-foreground/85 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Callout */}
      {scene.callout && (
        <div className="p-4 rounded-lg border-l-2 border-mint bg-mint/[0.04]">
          <div className="flex items-start gap-2">
            <BookOpen className="size-4 text-mint shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 italic leading-relaxed">{scene.callout}</p>
          </div>
        </div>
      )}

      {/* Infographic (if present in narration scene) */}
      {scene.infographic && (
        <div className="pt-4">
          <Infographic
            kind={scene.infographic.kind}
            title={scene.infographic.title}
            data={scene.infographic.data}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Infographic Scene
// ============================================================================
function InfographicScene({ scene }: { scene: Scene }) {
  return (
    <div className="space-y-6">
      {/* Eyebrow + Headline */}
      {scene.eyebrow && (
        <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
          {scene.eyebrow}
        </div>
      )}

      {scene.headline && (
        <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-balance">
          {scene.headline}
        </h4>
      )}

      {/* Voice player */}
      {scene.narration && <VoicePlayer text={scene.narration} />}

      {/* Infographic */}
      {scene.infographic && (
        <Infographic
          kind={scene.infographic.kind}
          title={scene.infographic.title}
          data={scene.infographic.data}
        />
      )}

      {/* Narration text */}
      {scene.narration && (
        <div className="space-y-3 pt-4">
          {scene.narration.map((line, idx) => (
            <p key={idx} className="text-sm text-foreground/85 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Callout */}
      {scene.callout && (
        <div className="p-4 rounded-lg border-l-2 border-mint bg-mint/[0.04]">
          <div className="flex items-start gap-2">
            <BookOpen className="size-4 text-mint shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 italic leading-relaxed">{scene.callout}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Check Scene (Knowledge Check)
// ============================================================================
function CheckScene({
  scene,
  answers,
  revealed,
  onAnswer,
}: {
  scene: Scene;
  answers: Record<string, number>;
  revealed: Record<string, boolean>;
  onAnswer: (sceneId: string, optionIndex: number) => void;
}) {
  const check = scene.check;
  if (!check) return null;

  const isAnswered = answers[scene.id] !== undefined;
  const isRevealed = revealed[scene.id];
  const isCorrect = isAnswered && answers[scene.id] === check.correctIndex;

  return (
    <div className="space-y-6">
      <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
        Knowledge Check
      </div>

      {/* Question */}
      <div className="p-4 rounded-lg border border-mint/30 bg-mint/[0.04]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono tracking-widest text-mint uppercase">
            L2 Retrieval Practice
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
        <p className="text-sm font-medium leading-relaxed text-pretty">{check.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {check.options.map((option, idx) => {
          const isSelected = answers[scene.id] === idx;
          const isCorrectOption = idx === check.correctIndex;
          const showCorrect = isRevealed && isCorrectOption;
          const showIncorrect = isRevealed && isSelected && !isCorrectOption;

          return (
            <button
              key={idx}
              onClick={() => onAnswer(scene.id, idx)}
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
              <p className="text-sm text-foreground leading-relaxed flex-1">{option}</p>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-lg border",
            isCorrect ? "border-mint/40 bg-mint/[0.06]" : "border-mint/40 bg-mint/[0.06]"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CircleCheck className="size-4 text-mint" />
            ) : (
              <BookOpen className="size-4 text-mint" />
            )}
            <span className="text-xs font-mono uppercase tracking-widest text-mint">
              {isCorrect ? "Well done" : "Explanation"}
            </span>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed">{check.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// Transfer Scene (On-the-job prompt)
// ============================================================================
function TransferScene({ scene }: { scene: Scene }) {
  const transfer = scene.transfer;
  if (!transfer) return null;

  return (
    <div className="space-y-6">
      {/* Eyebrow + Headline */}
      {scene.eyebrow && (
        <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
          {scene.eyebrow}
        </div>
      )}

      {scene.headline && (
        <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-balance">
          {scene.headline}
        </h4>
      )}

      {/* Voice player */}
      {scene.narration && <VoicePlayer text={scene.narration} />}

      {/* Narration text */}
      {scene.narration && (
        <div className="space-y-3">
          {scene.narration.map((line, idx) => (
            <p key={idx} className="text-sm text-foreground/85 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Transfer prompt */}
      <div className="p-5 rounded-lg border-2 border-mint bg-mint/10 space-y-3">
        <div className="flex items-center gap-2">
          <Rocket className="size-4 text-mint" />
          <span className="text-xs font-mono uppercase tracking-widest text-mint">
            Transfer to the job
          </span>
        </div>
        <p className="text-sm font-medium text-foreground leading-relaxed">{transfer.prompt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{transfer.when}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="size-3" />
            <span>{transfer.where}</span>
          </div>
        </div>
      </div>
    </div>
  );
}