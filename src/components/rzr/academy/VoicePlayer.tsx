"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoicePlayerProps = {
  text: string[];
  className?: string;
};

export function VoicePlayer({ text, className }: VoicePlayerProps) {
  const [speaking, setSpeaking] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const fullText = text.join(". ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current = utterance;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Natural")
    ) || voices.find((v) => v.lang.startsWith("en")) || voices[0];

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setSpeaking(true);
      setCurrentLine(0);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setCurrentLine(0);
    };

    // Boundary event to track which line is being spoken
    utterance.onboundary = (event) => {
      const spokenSoFar = fullText.substring(0, event.charIndex);
      const linesSpoken = spokenSoFar.split(". ").length - 1;
      setCurrentLine(Math.min(linesSpoken, text.length - 1));
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setCurrentLine(0);
  };

  const toggle = () => {
    if (speaking) {
      stop();
    } else {
      speak();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggle}
        className={cn(
          "gap-2 transition-all",
          speaking && "border-mint bg-mint/10 text-mint"
        )}
      >
        {speaking ? (
          <>
            <VolumeX className="size-3.5" />
            Stop
          </>
        ) : (
          <>
            <Volume2 className="size-3.5" />
            Play narration
          </>
        )}
      </Button>

      {speaking && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-mint rounded-full animate-pulse"
                style={{
                  height: `${12 + Math.random() * 8}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Line {currentLine + 1} of {text.length}
          </span>
        </div>
      )}
    </div>
  );
}