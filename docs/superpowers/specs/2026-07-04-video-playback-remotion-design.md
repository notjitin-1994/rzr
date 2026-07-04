# RZR Welcome Video & Timeline Fix Design Spec

## Overview
Rebuild the "Welcome to RZR" introductory video using Remotion and ElevenLabs, add a custom Play/Pause HTML5 video playback UI, and fix a visual alignment bug in the timeline infographic.

## Architecture & Data Flow
1. **Video Generation (Remotion)**
   - Create a Remotion composition for a 30-second intro video.
   - Use the ElevenLabs Node SDK (with provided API key) to generate a male American voiceover script.
   - Compose the video with motion graphics matching RZR's brand palette (mint, ink, orange→red→pink gradient).
   - Use a background score alongside the voiceover.
   - Pre-render the composition to an `.mp4` file in `public/onboarding-intro.mp4`.

2. **Video Playback UI**
   - Use standard HTML5 `<video>` element instead of third-party libraries.
   - Build a custom React overlay containing a Play/Pause button that is centrally positioned over the video.
   - The button fades out when the video plays and fades in when hovered or paused.

3. **Timeline Alignment Fix**
   - The timeline line in `Infographics.tsx` currently sits at `top-[88px]`, aligning with the bottom of the timeline circles.
   - The CSS offset will be adjusted (e.g. `top-[84px]`) so the timeline line passes directly through the absolute center of the dots.

## Subsystems / Components
- **Remotion Video (`src/remotion/*`)**: Remotion composition and data fetching scripts for audio.
- **`package.json`**: New scripts `build:video` to invoke Remotion and generate the MP4.
- **`AcademySection.tsx` or similar component**: Refactored to include the custom `<video>` player overlay.
- **`Infographics.tsx`**: Updated timeline component styles for correct alignment.

## Error Handling & Edge Cases
- If the ElevenLabs API fails, the script should fail loudly so the build stops.
- Video playback should degrade gracefully (e.g., provide native controls as a fallback if custom overlay JS fails).

## Testing
- Ensure the video plays smoothly on desktop and mobile.
- Verify the Play/Pause button fades correctly based on video state.
- Verify the timeline line perfectly bisects the circles in both desktop and mobile viewports.
