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

  // Act 1 — RZR Academy (0 - 150)
  const act1Opacity = interpolate(frame, [10, 40, 120, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  // Act 2 — Tracks (150 - 360)
  const act2Opacity = interpolate(frame, [150, 180, 330, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 3 — Modules (360 - 540)
  const act3Opacity = interpolate(frame, [360, 390, 510, 540], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 4 — Current Module (540 - 900)
  const act4Opacity = interpolate(frame, [540, 570, 850, 900], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand gradient orb blooms (radial)
  const orbScale = interpolate(frame, [0, 150], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const orbOpacity = interpolate(frame, [0, 100, 720, 900], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Background score and voiceover */}
      <Audio src={staticFile("audio/ambient.mp3")} loop />
      <Audio src={staticFile("audio/voiceover.mp3")} />
      
      {/* Brand gradient orb radial */}
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
        {/* Act 1 */}
        {frame < 150 && (
          <div style={{ opacity: act1Opacity, fontSize: 80, fontWeight: 700, color: WHITE }}>
            RZR Academy
          </div>
        )}

        {/* Act 2 */}
        {frame >= 150 && frame < 360 && (
          <div style={{ opacity: act2Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 40, color: MINT, marginBottom: 20 }}>Three Learning Tracks</div>
            <div style={{ fontSize: 50, fontWeight: 700, color: WHITE }}>
              Foundation, Function & Role-Readiness
            </div>
          </div>
        )}

        {/* Act 3 */}
        {frame >= 360 && frame < 540 && (
          <div style={{ opacity: act3Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 40, color: MINT, marginBottom: 20 }}>Your Journey Begins Here</div>
            <div style={{ fontSize: 50, fontWeight: 700, color: WHITE }}>
              5 Foundation Modules
            </div>
          </div>
        )}

        {/* Act 4 */}
        {frame >= 540 && (
          <div style={{ opacity: act4Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 32, color: MINT, marginBottom: 16 }}>Current Module</div>
            <div style={{ fontSize: 60, fontWeight: 700, color: WHITE, marginBottom: 16 }}>
              Welcome to RZR
            </div>
            <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)" }}>
              Day-1 Orientation
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const ONBOARDING_INTRO_DURATION_FRAMES = 900; // 30s @ 30fps
export const ONBOARDING_INTRO_FPS = 30;
export const ONBOARDING_INTRO_WIDTH = 1280;
export const ONBOARDING_INTRO_HEIGHT = 720;