# RZR Welcome Video & Timeline Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Remotion integration, generate ElevenLabs audio, build a custom Play/Pause HTML5 video component, and align the timeline line.

**Architecture:** We will use `bun` to run scripts. ElevenLabs audio will be generated via a local Node script into `public/`. Remotion will bundle the audio and some minimal motion graphics into `onboarding-intro.mp4`. A custom React component will wrap the HTML5 `<video>` element in the UI.

**Tech Stack:** Next.js, Tailwind, Remotion, ElevenLabs SDK, React.

## Global Constraints
- Use exact API key provided for ElevenLabs.
- Do not break existing Next.js build.
- Use `bun` as the package manager since `bun.lock` exists.

---

### Task 1: Fix Timeline Alignment

**Files:**
- Modify: `src/components/rzr/academy/Infographics.tsx`

**Interfaces:**
- Consumes: N/A
- Produces: Visual alignment fix

- [ ] **Step 1: Write the minimal implementation**
Modify `Infographics.tsx` around line 45. The line should be aligned to `top-[84px]` instead of `top-[88px]` to pass directly through the center of the `16px` dot (which starts at `28px` inside a `48px` padding container).

```tsx
// src/components/rzr/academy/Infographics.tsx
// Find the TimelineInfographic component and replace:
// <div className="absolute left-0 right-0 top-[88px] h-0.5 bg-gradient-to-r from-mint/20 via-mint to-mint/20" />
// with:
<div className="absolute left-0 right-0 top-[84px] h-0.5 bg-gradient-to-r from-mint/20 via-mint to-mint/20" />
```

- [ ] **Step 2: Commit**
```bash
git add src/components/rzr/academy/Infographics.tsx
git commit -m "fix(ui): align timeline line through center of dots"
```

---

### Task 2: Install Remotion & ElevenLabs Dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: N/A
- Produces: Installed dependencies

- [ ] **Step 1: Run installation commands**
```bash
bun add remotion @remotion/cli @remotion/player elevenlabs dotenv
npx skills add remotion-dev/skills
```

- [ ] **Step 2: Add build scripts**
```bash
# Add script to package.json
# We'll use a temporary Node script or sed to add: "build:video": "remotion render src/remotion/index.ts Root public/onboarding-intro.mp4"
node -e 'const fs = require("fs"); const pkg = JSON.parse(fs.readFileSync("package.json")); pkg.scripts["build:video"] = "remotion render src/remotion/index.ts Root public/onboarding-intro.mp4"; fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));'
```

- [ ] **Step 3: Commit**
```bash
git add package.json bun.lock
git commit -m "chore: install remotion and elevenlabs dependencies"
```

---

### Task 3: Generate Voiceover via ElevenLabs

**Files:**
- Create: `scripts/generate-audio.js`

**Interfaces:**
- Consumes: ElevenLabs API Key
- Produces: `public/audio/voiceover.mp3`

- [ ] **Step 1: Write the audio generation script**

```javascript
// scripts/generate-audio.js
const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

const API_KEY = "sk_8a515b19323593468e570962f7ec693cf2e1513b53fa54f2";
const client = new ElevenLabsClient({ apiKey: API_KEY });

async function generateAudio() {
  const text = "Welcome to RZR. Where intelligence makes impact — starting on Day 1.";
  console.log("Generating audio...");
  // 21m00Tcm4TlvDq8ikWAM is "Rachel" - standard, let's use "pNInz6obpgDQGcFmaJcg" (Adam) or any male voice.
  const audioStream = await client.textToSpeech.convert("pNInz6obpgDQGcFmaJcg", {
    text: text,
    model_id: "eleven_monolingual_v1",
    voice_settings: { stability: 0.5, similarity_boost: 0.5 }
  });

  const dir = path.join(__dirname, "../public/audio");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const dest = path.join(dir, "voiceover.mp3");
  const fileStream = fs.createWriteStream(dest);
  
  audioStream.pipe(fileStream);
  
  return new Promise((resolve, reject) => {
    fileStream.on("finish", () => {
      console.log("Audio saved to", dest);
      resolve();
    });
    fileStream.on("error", reject);
  });
}

generateAudio().catch(console.error);
```

- [ ] **Step 2: Run the script to verify**
```bash
node scripts/generate-audio.js
# Expected: "Audio saved to .../public/audio/voiceover.mp3"
```

- [ ] **Step 3: Commit**
```bash
git add scripts/generate-audio.js public/audio/voiceover.mp3
git commit -m "feat(audio): generate elevenlabs voiceover for intro"
```

---

### Task 4: Create Remotion Composition

**Files:**
- Create: `src/remotion/index.ts`
- Create: `src/remotion/Root.tsx`

**Interfaces:**
- Consumes: `public/audio/voiceover.mp3`
- Produces: The `build:video` target MP4

- [ ] **Step 1: Write Remotion Root component**

```tsx
// src/remotion/Root.tsx
import { Composition, staticFile, Audio, AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

export const WelcomeVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0A14", justifyContent: "center", alignItems: "center" }}>
      <Audio src={staticFile("audio/voiceover.mp3")} />
      <h1 style={{ color: "#00BDA5", fontFamily: "Inter, sans-serif", fontSize: "80px", opacity }}>
        Welcome to RZR
      </h1>
      <h2 style={{ color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "40px", opacity: opacity * 0.8, marginTop: 20 }}>
        Where Intelligence Makes Impact
      </h2>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Write Remotion index**

```tsx
// src/remotion/index.ts
import { registerRoot } from "remotion";
import { WelcomeVideo } from "./Root";
import React from "react";

export const RemotionRoot = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      require("remotion").Composition,
      {
        id: "Root",
        component: WelcomeVideo,
        durationInFrames: 300,
        fps: 30,
        width: 1920,
        height: 1080,
      }
    )
  );
};

registerRoot(RemotionRoot);
```

- [ ] **Step 3: Build the video to test**
```bash
bun run build:video
# Expected: creates public/onboarding-intro.mp4
```

- [ ] **Step 4: Commit**
```bash
git add src/remotion package.json public/onboarding-intro.mp4
git commit -m "feat(video): add remotion composition and pre-render video"
```

---

### Task 5: Custom HTML5 Video Player UI

**Files:**
- Modify: `src/components/rzr/AcademySection.tsx` (or where the video is)

**Interfaces:**
- Consumes: `public/onboarding-intro.mp4`
- Produces: Custom video UI overlay

- [ ] **Step 1: Find Video Scene and replace with Custom Video Player**
Create a new component `CustomVideoPlayer.tsx`

```tsx
// src/components/rzr/CustomVideoPlayer.tsx
"use client";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const showControls = !isPlaying || isHovered;

  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden group cursor-pointer border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover aspect-video"
        playsInline
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Play/Pause Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <button 
          className="w-16 h-16 rounded-full bg-mint text-ink flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Use in AcademySection.tsx**
```bash
# We need to find how AcademySection renders "video" scenes.
# It probably has a switch case for scene.type === "video".
```

- [ ] **Step 3: Modify AcademySection.tsx to use CustomVideoPlayer**
(Will be done via `multi_replace_file_content` during execution)

- [ ] **Step 4: Commit**
```bash
git add src/components/rzr/CustomVideoPlayer.tsx src/components/rzr/AcademySection.tsx
git commit -m "feat(ui): add custom html5 video player with play pause overlay"
```

---
