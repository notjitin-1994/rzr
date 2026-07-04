import { registerRoot, Composition } from "remotion";
import { OnboardingIntroVideo, ONBOARDING_INTRO_DURATION_FRAMES, ONBOARDING_INTRO_FPS, ONBOARDING_INTRO_WIDTH, ONBOARDING_INTRO_HEIGHT } from "./OnboardingIntro";
import { RzrWelcome, RZR_WELCOME_DURATION_FRAMES, RZR_WELCOME_FPS, RZR_WELCOME_WIDTH, RZR_WELCOME_HEIGHT } from "./RzrWelcome";
import { FtmIntroVideo, FTM_INTRO_DURATION_FRAMES, FTM_INTRO_FPS, FTM_INTRO_WIDTH, FTM_INTRO_HEIGHT } from "./FtmIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Root"
        component={OnboardingIntroVideo}
        durationInFrames={ONBOARDING_INTRO_DURATION_FRAMES}
        fps={ONBOARDING_INTRO_FPS}
        width={ONBOARDING_INTRO_WIDTH}
        height={ONBOARDING_INTRO_HEIGHT}
      />
      <Composition
        id="RzrWelcome"
        component={RzrWelcome}
        durationInFrames={RZR_WELCOME_DURATION_FRAMES}
        fps={RZR_WELCOME_FPS}
        width={RZR_WELCOME_WIDTH}
        height={RZR_WELCOME_HEIGHT}
      />
      <Composition
        id="FtmIntro"
        component={FtmIntroVideo}
        durationInFrames={FTM_INTRO_DURATION_FRAMES}
        fps={FTM_INTRO_FPS}
        width={FTM_INTRO_WIDTH}
        height={FTM_INTRO_HEIGHT}
      />
    </>
  );
};

registerRoot(RemotionRoot);
