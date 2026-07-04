import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const FtmIntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const frameworkScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const lettersOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [75, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Brand colors
  const ink = "#0F0A14";
  const mint = "#00BDA5";
  const gradient = "linear-gradient(135deg, #FF7A00 0%, #DC1A14 50%, #E63E6D 100%)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: ink,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Background gradient orb */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: gradient,
          opacity: 0.15,
          filter: "blur(120px)",
          transform: `scale(${interpolate(frame, [0, 120], [0.8, 1.2])})`,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: "72px",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        Feedback Delivery
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: "24px",
          color: mint,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "48px",
        }}
      >
        FTM Module 1 of 8
      </div>

      {/* SBI-I Framework Letters */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          transform: `scale(${frameworkScale})`,
          marginBottom: "48px",
        }}
      >
        {["S", "B", "I", "I"].map((letter, i) => (
          <div
            key={letter}
            style={{
              opacity: lettersOpacity,
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              background: i === 3 ? gradient : mint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: 700,
              color: ink,
              boxShadow: "0 8px 32px rgba(0, 189, 165, 0.3)",
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          fontSize: "20px",
          color: "rgba(255, 255, 255, 0.7)",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        The single highest-leverage skill a new manager can build
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "4px",
          background: gradient,
          transform: `scaleX(${interpolate(frame, [0, 120], [0, 1])})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
