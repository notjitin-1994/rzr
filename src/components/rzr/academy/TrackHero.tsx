"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AcademyTrack } from "@/data/academy";

type TrackHeroProps = {
  academy: {
    name: string;
    tagline: string;
    description: string;
  };
  tracks: AcademyTrack[];
  activeTrackId: string;
  onTrackChange: (trackId: string) => void;
};

export function TrackHero({ academy, tracks, activeTrackId, onTrackChange }: TrackHeroProps) {
  const reduce = useReducedMotion();
  const activeTrack = tracks.find((t) => t.id === activeTrackId);

  return (
    <div className="space-y-8">
      {/* Academy header */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-mint/40 text-mint bg-mint/5 font-mono text-[10px] tracking-[0.2em] uppercase"
          >
            Learning Ecosystem
          </Badge>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-mint to-transparent" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-foreground leading-[1.1]">
          {academy.name}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl text-pretty leading-relaxed">
          {academy.description}
        </p>
      </motion.div>

      {/* Track selector */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        <div className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
          Three tracks · 30/60/90 journey
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {tracks.map((track) => {
            const isActive = track.id === activeTrackId;
            const isLive = track.status === "Live";

            return (
              <button
                key={track.id}
                onClick={() => onTrackChange(track.id)}
                className={cn(
                  "relative p-4 rounded-lg border text-left transition-all",
                  isActive
                    ? "border-mint bg-mint/10 shadow-sm"
                    : "border-border hover:border-mint/30 hover:bg-accent/40"
                )}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-mono text-[10px]",
                      isLive
                        ? "border-mint/40 text-mint bg-mint/5"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {track.status}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {track.window}
                  </span>
                </div>

                {/* Track name */}
                <div
                  className={cn(
                    "text-sm font-semibold mb-1",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {track.name}
                </div>

                {/* Layer */}
                <div className="text-xs text-muted-foreground">{track.layer} Layer</div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="track-indicator"
                    className="absolute inset-0 rounded-lg border-2 border-mint pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active track description */}
        {activeTrack && (
          <motion.div
            key={activeTrack.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 rounded-lg border-l-2 border-mint bg-mint/[0.04]"
          >
            <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase mb-1.5">
              {activeTrack.name}
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
              {activeTrack.description}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}