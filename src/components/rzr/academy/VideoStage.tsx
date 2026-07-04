"use client";

import { Player, PlayerRef } from "@remotion/player";
import {
  OnboardingIntroVideo,
  ONBOARDING_INTRO_DURATION_FRAMES,
  ONBOARDING_INTRO_FPS,
  ONBOARDING_INTRO_WIDTH,
  ONBOARDING_INTRO_HEIGHT,
} from "@/remotion/OnboardingIntro";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const COMPOSITIONS: Record<string, React.FC> = {
  "onboarding-intro": OnboardingIntroVideo,
};

type VideoStageProps = {
  videoId: string;
  headline?: string;
};

export function VideoStage({ videoId, headline }: VideoStageProps) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const Component = COMPOSITIONS[videoId];

  if (!Component) {
    return (
      <div className="aspect-video rounded-xl bg-ink flex items-center justify-center text-muted-foreground text-sm">
        Video not available
      </div>
    );
  }

  const togglePlay = () => {
    if (!playerRef.current) return;
    
    if (playing) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  return (
    <div className="relative group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-ink shadow-card">
        <Player
          ref={playerRef}
          component={Component}
          durationInFrames={ONBOARDING_INTRO_DURATION_FRAMES}
          fps={ONBOARDING_INTRO_FPS}
          compositionWidth={ONBOARDING_INTRO_WIDTH}
          compositionHeight={ONBOARDING_INTRO_HEIGHT}
          controls={true}
          loop
          autoPlay={false}
          style={{ width: "100%", height: "100%" }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>

      {headline && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-foreground">{headline}</h3>
        </div>
      )}
    </div>
  );
}