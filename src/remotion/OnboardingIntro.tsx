"use client";

import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, spring, Easing, Audio, staticFile } from "remotion";

// RZR brand tokens (mirrored from globals.css for Remotion's isolated render context)
const INK = "#0F0A14";
const INK_SOFT = "#2A2530";
const MINT = "#00BDA5";
const MINT_SOFT = "#E6FAF7";
const GRAD_START = "#FF7A00";
const GRAD_MID = "#DC1A14";
const GRAD_END = "#E63E6D";
const WHITE = "#FFFFFF";

/**
 * Onboarding Intro Composition
 * ~30s · 30fps · 900 frames
 *
 * Act 1 (0-120): Lower-third RZR wordmark animates in from darkness. Mint accent line draws.
 * Act 2 (120-360): Brand gradient orb blooms from center. Tagline reveals underneath.
 * Act 3 (360-540): "Where intelligence makes impact" prints letter-by-letter.
 * Act 4 (540-900): Welcome line + "starting on Day 1" + slow fade to black.
 *
 * Built to loop seamlessly — the player will repeat it.
 */
export const OnboardingIntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1 — RZR wordmark
  const rzrOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rzrY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 110 },
  });
  const rzrTranslate = interpolate(rzrY, [0, 1], [24, 0]);

  // Mint accent underline draws across act 1
  const underlineScale = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Act 2 — gradient orb blooms (radial)
  const orbScale = interpolate(frame, [120, 240], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const orbOpacity = interpolate(frame, [120, 200, 720, 900], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 3 — tagline tease
  const taglineOpacity = interpolate(frame, [260, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = spring({ frame: frame - 260, fps, config: { damping: 22 } });
  const taglineTranslate = interpolate(taglineY, [0, 1], [16, 0]);

  // Act 4 — operative words ("intelligence makes impact") count up
  const wordCount = Math.floor(
    interpolate(frame, [380, 540], [0, 4], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const words = ["intelligence", "makes", "impact", "—"];
  const wordLine = words
    .map((w, i) => (i < wordCount ? w : ""))
    .filter(Boolean)
    .join(" ");

  // Closing line
  const closeOpacity = interpolate(frame, [580, 640, 820, 900], [0, 1, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Footer micro-text
  const footerOpacity = interpolate(frame, [640, 700, 820, 900], [0, 1, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Background score and voiceover */}
      <Audio src={staticFile("audio/ambient.mp3")} loop />
      <Audio src={staticFile("audio/voiceover.mp3")} />
      
      {/* Brand gradient orb radial (act 2 onwards) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GRAD_START} 0%, ${GRAD_MID} 40%, ${GRAD_END} 80%, transparent 100%)`,
            opacity: orbOpacity,
            transform: `scale(${orbScale})`,
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Subtle dot grid backdrop, fades in early */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `radial-gradient(${WHITE} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Center stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* RZR wordmark */}
        <div
          style={{
            opacity: rzrOpacity,
            transform: `translateY(${rzrTranslate}px)`,
            fontSize: 96,
            fontWeight: 700,
            color: WHITE,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          RZR
        </div>

        {/* Mint underline */}
        <div
          style={{
            width: 240,
            height: 3,
            marginTop: 18,
            background: MINT,
            transformOrigin: "left",
            transform: `scaleX(${underlineScale})`,
          }}
        />

        {/* Tagline tease */}
        <div
          style={{
            marginTop: 36,
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslate}px)`,
            fontSize: 28,
            color: MINT,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Where
        </div>

        {/* Operative words count up */}
        <div
          style={{
            marginTop: 14,
            fontSize: 60,
            fontWeight: 700,
            color: WHITE,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            width: 900,
            minHeight: 76,
          }}
        >
          {wordLine.length > 0 && (
            <span
              style={{
                background: `linear-gradient(135deg, ${GRAD_START} 0%, ${GRAD_MID} 50%, ${GRAD_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {wordLine}
            </span>
          )}
          {wordCount < words.length && <span style={{ color: INK_SOFT }}>…</span>}
        </div>

        {/* Closing line */}
        <div
          style={{
            marginTop: 40,
            opacity: closeOpacity,
            fontSize: 22,
            color: "rgba(255,255,255,0.62)",
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          Welcome to Day 1.
        </div>

        {/* Footer micro-text */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            opacity: footerOpacity,
            fontSize: 11,
            color: "rgba(0, 189, 165, 0.65)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          RZR Academy · Onboarding Foundation
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ONBOARDING_INTRO_DURATION_FRAMES = 900; // 30s @ 30fps
export const ONBOARDING_INTRO_FPS = 30;
export const ONBOARDING_INTRO_WIDTH = 1280;
export const ONBOARDING_INTRO_HEIGHT = 720;