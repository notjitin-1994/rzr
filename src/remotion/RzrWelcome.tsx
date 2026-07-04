"use client";

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Audio,
  staticFile,
  Sequence,
} from "remotion";

// RZR brand tokens
const INK = "#0F0A14";
const MINT = "#00BDA5";
const GRAD_START = "#FF7A00";
const GRAD_MID = "#DC1A14";
const GRAD_END = "#E63E6D";
const WHITE = "#FFFFFF";

/**
 * RZR Welcome Video — 30 second cinematic intro
 * 30fps · 900 frames · 30s
 *
 * Storyboard:
 * Act 1 (0-90f / 0-3s):    Black screen fades in. Ambient music starts. RZR mark reveals.
 * Act 2 (90-270f / 3-9s):  "Where Intelligence Makes Impact" tagline animates in.
 *                          Gradient orb blooms. Voiceover: "Welcome to RZR."
 * Act 3 (270-540f / 9-18s): 8 office locations pulse around a world wireframe.
 *                          Voiceover: "Eight offices. One async-first culture."
 * Act 4 (540-750f / 18-25s): Encore platform stats animate: 5M+ req/sec.
 *                          Voiceover: "Five million decisions. Every second."
 * Act 5 (750-900f / 25-30s): Tagline returns. "Where intelligence makes impact."
 *                          Fade to RZR mark. Hold.
 *
 * Audio layers:
 * - Background music: ambient pad + subtle pulse (loops entire duration)
 * - Voiceover: timed sequences for each act
 */
export const RzrWelcomeVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- ACT 1: RZR mark reveal (0-90f) ----
  const markOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const markTranslateY = interpolate(markScale, [0, 1], [32, 0]);

  // Mint accent line draws under mark
  const accentLineScale = interpolate(frame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // ---- ACT 2: Tagline reveal (90-270f) ----
  const taglineY = spring({
    frame: frame - 100,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const taglineOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineTranslateY = interpolate(taglineY, [0, 1], [40, 0]);

  // Gradient orb blooms
  const orbScale = interpolate(frame, [90, 250], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const orbOpacity = interpolate(frame, [90, 160, 720, 900], [0, 0.45, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- ACT 3: Office dots (270-540f) ----
  const officeOpacity = interpolate(frame, [270, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const officeScale = spring({
    frame: frame - 270,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  // ---- ACT 4: Stats (540-750f) ----
  const statsOpacity = interpolate(frame, [540, 580], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statsScale = spring({
    frame: frame - 540,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  // Number counter for "5M+"
  const countValue = Math.floor(
    interpolate(frame, [560, 660], [0, 5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // ---- ACT 5: Closing tagline (750-900f) ----
  const closingOpacity = interpolate(frame, [750, 780, 870, 900], [0, 1, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markFinalOpacity = interpolate(frame, [800, 830, 880, 900], [0, 1, 1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 8 office positions (simplified world map coords, normalized to 1200x720)
  const offices = [
    { x: 260, y: 260, name: "San Francisco" },
    { x: 340, y: 250, name: "New York" },
    { x: 620, y: 240, name: "London" },
    { x: 700, y: 250, name: "Tel Aviv" },
    { x: 880, y: 270, name: "Bangalore" },
    { x: 950, y: 260, name: "Beijing" },
    { x: 980, y: 320, name: "Manila" },
    { x: 1020, y: 290, name: "Seoul" },
  ];

  return (
    <AbsoluteFill style={{ background: INK, fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* === Background music — ambient pad, loops entire duration === */}
      <Audio
        src={staticFile("audio/ambient.wav")}
        volume={(f) => {
          // Fade in over first 2s, hold, fade out over last 2s
          const fadeIn = interpolate(f, [0, 60], [0, 0.35], { extrapolateRight: "clamp" });
          const fadeOut = interpolate(f, [840, 900], [0.35, 0], { extrapolateLeft: "clamp" });
          return Math.min(fadeIn, fadeOut);
        }}
      />

      {/* === Voiceover — timed sequences === */}
      <Sequence from={120} durationInFrames={60}>
        <Audio
          src={staticFile("audio/voiceover-act2.mp3")}
          volume={1}
        />
      </Sequence>
      <Sequence from={300} durationInFrames={120}>
        <Audio
          src={staticFile("audio/voiceover-act3.mp3")}
          volume={1}
        />
      </Sequence>
      <Sequence from={540} durationInFrames={120}>
        <Audio
          src={staticFile("audio/voiceover-act4.mp3")}
          volume={1}
        />
      </Sequence>
      <Sequence from={760} durationInFrames={90}>
        <Audio
          src={staticFile("audio/voiceover-act5.mp3")}
          volume={1}
        />
      </Sequence>

      {/* === Visual layers === */}

      {/* Brand gradient orb — always present as ambient layer */}
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
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GRAD_START} 0%, ${GRAD_MID} 40%, ${GRAD_END} 80%, transparent 100%)`,
            opacity: orbOpacity,
            transform: `scale(${orbScale})`,
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Subtle dot grid backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `radial-gradient(${WHITE} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* === Center stack === */}
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
        {/* ACT 1: RZR wordmark (0-90f) */}
        <div
          style={{
            opacity: markOpacity,
            transform: `translateY(${markTranslateY}px) scale(${interpolate(markScale, [0, 1], [0.9, 1])})`,
            fontSize: 120,
            fontWeight: 800,
            color: WHITE,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textShadow: "0 4px 32px rgba(0, 189, 165, 0.3)",
          }}
        >
          RZR
        </div>

        {/* Mint accent underline */}
        <div
          style={{
            width: 280,
            height: 4,
            marginTop: 24,
            background: MINT,
            transformOrigin: "left",
            transform: `scaleX(${accentLineScale})`,
            borderRadius: 2,
          }}
        />

        {/* ACT 2: Tagline "Where intelligence makes impact" (100-270f) */}
        {frame > 100 && frame < 750 && (
          <div
            style={{
              marginTop: 48,
              opacity: taglineOpacity,
              transform: `translateY(${taglineTranslateY}px)`,
            }}
          >
            <div
              style={{
                fontSize: 36,
                color: MINT,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Where intelligence
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 56,
                fontWeight: 700,
                color: WHITE,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                background: `linear-gradient(135deg, ${GRAD_START} 0%, ${GRAD_MID} 50%, ${GRAD_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              makes impact
            </div>
          </div>
        )}

        {/* ACT 3: Office dots (270-540f) */}
        {frame >= 270 && frame < 540 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: officeOpacity,
              transform: `scale(${officeScale})`,
            }}
          >
            {offices.map((office, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: office.x,
                  top: office.y,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: MINT,
                  boxShadow: `0 0 ${20 + (frame % 30) * 0.5}px rgba(0, 189, 165, 0.8)`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        )}

        {/* ACT 4: Encore stats (540-750f) */}
        {frame >= 540 && frame < 750 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: statsOpacity,
              transform: `scale(${statsScale})`,
            }}
          >
            <div
              style={{
                fontSize: 140,
                fontWeight: 800,
                color: MINT,
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(0, 189, 165, 0.4)",
              }}
            >
              {countValue}M+
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "30%",
                fontSize: 22,
                color: WHITE,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.7,
                fontWeight: 400,
              }}
            >
              ad requests per second
            </div>
          </div>
        )}

        {/* ACT 5: Closing tagline (750-900f) */}
        {frame >= 750 && (
          <div
            style={{
              marginTop: 48,
              opacity: closingOpacity,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: WHITE,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                background: `linear-gradient(135deg, ${GRAD_START} 0%, ${GRAD_MID} 50%, ${GRAD_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              where intelligence makes impact
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 18,
                color: MINT,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              RZR Academy · Onboarding Day 1
            </div>
          </div>
        )}

        {/* Final RZR mark on closing */}
        {frame >= 800 && (
          <div
            style={{
              position: "absolute",
              bottom: 80,
              opacity: markFinalOpacity,
              fontSize: 24,
              fontWeight: 700,
              color: MINT,
              letterSpacing: "0.4em",
            }}
          >
            RZR
          </div>
        )}
      </div>

      {/* Bottom gradient accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${GRAD_START} 0%, ${GRAD_MID} 50%, ${GRAD_END} 100%)`,
          transform: `scaleX(${interpolate(frame, [0, 900], [0, 1])})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};

export const RZR_WELCOME_DURATION_FRAMES = 900; // 30s @ 30fps
export const RZR_WELCOME_FPS = 30;
export const RZR_WELCOME_WIDTH = 1280;
export const RZR_WELCOME_HEIGHT = 720;