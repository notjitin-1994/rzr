"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { InfographicKind } from "@/data/academy";

type InfographicProps = {
  kind: InfographicKind;
  title: string;
  data: Record<string, unknown>;
};

export function Infographic({ kind, title, data }: InfographicProps) {
  switch (kind) {
    case "timeline":
      return <TimelineInfographic title={title} data={data} />;
    case "scale":
      return <ScaleInfographic title={title} data={data} />;
    case "map":
      return <MapInfographic title={title} data={data} />;
    case "tower-stack":
      return <TowerStackInfographic title={title} data={data} />;
    case "comparison":
      return <ComparisonInfographic title={title} data={data} />;
    case "raci":
      return <RaciInfographic title={title} data={data} />;
    default:
      return <div className="text-muted-foreground text-sm">Infographic not available</div>;
  }
}

// ============================================================================
// Timeline Infographic (rebrand evolution)
// ============================================================================
function TimelineInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const points = (data.points as Array<{ year: string; label: string; detail: string }>) || [];

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="relative pt-12 pb-24">
        {/* Timeline line — passes through center, aligned with dots */}
        <div className="absolute left-0 right-0 top-[84px] h-0.5 bg-gradient-to-r from-mint/20 via-mint to-mint/20" />

        {/* Points */}
        <div className="relative flex justify-between items-start">
          {points.map((point, idx) => {
            const isCurrent = idx === points.length - 1;
            return (
              <motion.div
                key={idx}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center w-[110px]"
              >
                {/* Year — above the line */}
                <div
                  className={cn(
                    "text-xs font-mono font-semibold mb-3 h-4 flex items-center",
                    isCurrent ? "text-mint" : "text-muted-foreground"
                  )}
                >
                  {point.year}
                </div>

                {/* Dot — sits ON the line */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 relative z-10 bg-background",
                    isCurrent
                      ? "bg-mint border-mint shadow-[0_0_12px_rgba(0,189,165,0.5)]"
                      : "border-mint/40"
                  )}
                />

                {/* Label — below the line */}
                <div className="mt-3 text-sm font-semibold text-foreground text-center leading-tight">
                  {point.label}
                </div>

                {/* Detail */}
                <div className="mt-1 text-xs text-muted-foreground text-center leading-snug">
                  {point.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Scale Infographic (Encore numbers)
// ============================================================================
function ScaleInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const metrics =
    (data.metrics as Array<{ value: string; unit: string; detail: string }>) || [];

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="p-4 rounded-lg border border-border bg-card/60 hover:border-mint/40 transition-colors"
          >
            <div className="text-3xl font-bold text-mint font-mono">{metric.value}</div>
            <div className="text-xs font-mono text-muted-foreground mt-1">{metric.unit}</div>
            <div className="text-xs text-foreground/70 mt-2">{metric.detail}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Map Infographic (8 offices)
// ============================================================================
function MapInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const offices =
    (data.offices as Array<{ city: string; role: string; region: string }>) || [];

  // Simplified world map SVG path (continents outline)
  const worldPath =
    "M 100 150 Q 120 140 140 145 L 160 150 Q 180 155 200 150 L 220 145 Q 240 140 260 145 L 280 150 Q 300 155 320 150 L 340 145 Q 360 140 380 145 L 400 150 Q 420 155 440 150 L 460 145 Q 480 140 500 145 L 520 150 Q 540 155 560 150 L 580 145 Q 600 140 620 145 L 640 150 Q 660 155 680 150 L 700 145 Q 720 140 740 145 L 760 150";

  // Office positions (simplified x,y coordinates)
  const positions = [
    { x: 120, y: 160, city: "San Francisco" },
    { x: 180, y: 155, city: "New York" },
    { x: 340, y: 140, city: "London" },
    { x: 400, y: 145, city: "Tel Aviv" },
    { x: 520, y: 150, city: "Bangalore" },
    { x: 580, y: 145, city: "Beijing" },
    { x: 620, y: 155, city: "Manila" },
    { x: 660, y: 150, city: "Seoul" },
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="relative aspect-[16/9] rounded-lg border border-border bg-card/40 overflow-hidden">
        <svg viewBox="0 0 800 300" className="w-full h-full">
          {/* Simplified world outline */}
          <path
            d={worldPath}
            fill="none"
            stroke="rgba(0, 189, 165, 0.15)"
            strokeWidth="2"
          />

          {/* Office dots */}
          {positions.map((pos, idx) => (
            <motion.g
              key={idx}
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Pulse ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill="rgba(0, 189, 165, 0.1)"
                className="animate-pulse"
              />
              {/* Dot */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#00BDA5" />
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 20}
                textAnchor="middle"
                className="text-[10px] fill-foreground font-mono"
              >
                {pos.city}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Office list */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {offices.map((office, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="text-xs"
          >
            <div className="font-semibold text-foreground">{office.city}</div>
            <div className="text-muted-foreground">{office.role}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Tower Stack Infographic (subsystems / revenue engines)
// ============================================================================
function TowerStackInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const levels = (data.levels as Array<{ label: string; sub: string }>) || [];
  const base = (data.base as string) || "";

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="flex flex-col items-center gap-2">
        {/* Levels (top to bottom) */}
        {levels.map((level, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-md p-4 rounded-lg border border-border bg-card/60 text-center"
          >
            <div className="text-sm font-semibold text-foreground">{level.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{level.sub}</div>
          </motion.div>
        ))}

        {/* Base */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: levels.length * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-md p-4 rounded-lg border-2 border-mint bg-mint/10 text-center"
        >
          <div className="text-sm font-semibold text-mint">{base}</div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// Comparison Infographic (brand vs performance, record vs collaboration)
// ============================================================================
function ComparisonInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const left =
    (data.left as { title: string; points: string[]; muted: boolean }) ||
    ({} as { title: string; points: string[]; muted: boolean });
  const right =
    (data.right as { title: string; points: string[]; muted: boolean }) ||
    ({} as { title: string; points: string[]; muted: boolean });

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "p-4 rounded-lg border",
            left.muted ? "border-border/60 bg-muted/30" : "border-border bg-card/60"
          )}
        >
          <div className="text-sm font-semibold text-foreground mb-3">{left.title}</div>
          <ul className="space-y-2">
            {left.points?.map((point, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-muted-foreground/60">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "p-4 rounded-lg border",
            right.muted ? "border-border/60 bg-muted/30" : "border-mint/40 bg-mint/5"
          )}
        >
          <div className="text-sm font-semibold text-foreground mb-3">{right.title}</div>
          <ul className="space-y-2">
            {right.points?.map((point, idx) => (
              <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                <span className="text-mint">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// RACI Infographic (decision roles)
// ============================================================================
function RaciInfographic({ title, data }: { title: string; data: Record<string, unknown> }) {
  const reduce = useReducedMotion();
  const roles =
    (data.roles as Array<{ letter: string; word: string; detail: string; multi: boolean }>) ||
    [];

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-mono tracking-widest text-mint uppercase">{title}</h4>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {roles.map((role, idx) => {
          const isAccountable = role.letter === "A";
          return (
            <motion.div
              key={idx}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "p-4 rounded-lg border text-center",
                isAccountable
                  ? "border-mint bg-mint/10 shadow-[0_0_16px_rgba(0,189,165,0.2)]"
                  : "border-border bg-card/60"
              )}
            >
              <div
                className={cn(
                  "text-3xl font-bold font-mono",
                  isAccountable ? "text-mint" : "text-foreground"
                )}
              >
                {role.letter}
              </div>
              <div className="text-xs font-semibold text-foreground mt-2">{role.word}</div>
              <div className="text-xs text-muted-foreground mt-1">{role.detail}</div>
              {role.multi && (
                <div className="text-[10px] text-muted-foreground mt-2 italic">
                  (can be multiple)
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}