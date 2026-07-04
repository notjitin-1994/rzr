"use client";

import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, spring, Easing, Audio, staticFile, Video, Img } from "remotion";
import { RzrLogo } from "@/components/rzr/RzrLogo";

const INK = "#0F0A14";
const MINT = "#00BDA5";
const WHITE = "#FFFFFF";
const GRAD_START = "#FF7A00";
const GRAD_MID = "#DC1A14";
const GRAD_END = "#E63E6D";

export const OnboardingIntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1 (0 - 120)
  const act1Opacity = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  // Act 2 (120 - 270)
  const act2Opacity = interpolate(frame, [120, 140, 250, 270], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 3 (270 - 450)
  const act3Opacity = interpolate(frame, [270, 290, 430, 450], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Act 4 (450 - 690)
  const act4Opacity = interpolate(frame, [450, 480, 650, 690], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Brand gradient orb blooms (radial)
  const orbScale = interpolate(frame, [0, 150], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const orbOpacity = interpolate(frame, [0, 100, 500, 690], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden", fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>
      {/* Stock Video Background (Blurred) */}
      <AbsoluteFill>
        <Video 
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
          startFrom={600} 
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(30px) brightness(0.4)" }} 
        />
      </AbsoluteFill>

      {/* Background score and voiceover */}
      <Audio src={staticFile("audio/ambient.wav")} loop />
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
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GRAD_START} 0%, ${GRAD_MID} 40%, ${GRAD_END} 80%, transparent 100%)`,
            opacity: orbOpacity,
            transform: `scale(${orbScale})`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <AbsoluteFill style={{ padding: 40 }}>
        {/* Brand Logo in top corner */}
        <div style={{ position: "absolute", top: 40, left: 40, transform: `scale(${logoScale})` }}>
          <RzrLogo className="h-10 text-white" />
        </div>

        {/* Acts Container */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Act 1 */}
          {frame < 120 && (
            <div style={{ opacity: act1Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 100, fontWeight: 800, color: WHITE, letterSpacing: "-0.04em" }}>
                RZR Academy
              </div>
              <div style={{ width: 200, height: 6, background: MINT, marginTop: 20, borderRadius: 4 }} />
            </div>
          )}

          {/* Act 2 */}
          {frame >= 120 && frame < 270 && (
            <div style={{ opacity: act2Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 40, color: MINT, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>Three Learning Tracks</div>
              <div style={{ fontSize: 60, fontWeight: 700, color: WHITE }}>
                Foundation, Function & <br/>Role-Readiness
              </div>
            </div>
          )}

          {/* Act 3 */}
          {frame >= 270 && frame < 450 && (
            <div style={{ opacity: act3Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 40, color: MINT, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>Your Journey Begins Here</div>
              <div style={{ fontSize: 70, fontWeight: 800, color: WHITE }}>
                5 Foundation Modules
              </div>
            </div>
          )}

          {/* Act 4 */}
          {frame >= 450 && (
            <div style={{ opacity: act4Opacity, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 32, color: MINT, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.2em" }}>Current Module</div>
              <div style={{ fontSize: 80, fontWeight: 900, color: WHITE, marginBottom: 16, letterSpacing: "-0.02em" }}>
                Welcome to RZR
              </div>
              <div style={{ fontSize: 40, color: "rgba(255,255,255,0.8)" }}>
                Day-1 Orientation
              </div>
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ONBOARDING_INTRO_DURATION_FRAMES = 690; // ~23s @ 30fps
export const ONBOARDING_INTRO_FPS = 30;
export const ONBOARDING_INTRO_WIDTH = 1280;
export const ONBOARDING_INTRO_HEIGHT = 720;
