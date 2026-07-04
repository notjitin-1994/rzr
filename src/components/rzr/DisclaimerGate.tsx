"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RzrLogo } from "./RzrLogo";
import {
  ArrowRight,
  FileText,
  Globe,
  Clock,
  Layers,
  ShieldAlert,
} from "lucide-react";

const STORAGE_KEY = "rzr-portfolio-disclaimer-accepted-v1";

// useSyncExternalStore pattern: read sessionStorage as an external store.
// SSR returns true (content visible); client checks actual value post-hydration.
const emptySubscribe = () => () => {};
function readAccepted(): boolean {
  if (typeof window === "undefined") return true; // SSR
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return true; // privacy mode — show content
  }
}

const SOURCES = [
  {
    icon: Globe,
    label: "Public RZR website",
    detail: "rzr.com — brand, business model, offices, Encore platform",
  },
  {
    icon: FileText,
    label: "Job description",
    detail: "Senior L&D Lead role requirements and scope",
  },
  {
    icon: Layers,
    label: "Implementation plan PDF",
    detail: "24-page strategy document accompanying this portfolio",
  },
];

export function DisclaimerGate({ children }: { children: React.ReactNode }) {
  // SSR snapshot = true (content visible). Client snapshot after hydration
  // checks actual sessionStorage value, which may differ — handled by
  // useSyncExternalStore's re-render on store change.
  const accepted = useSyncExternalStore(emptySubscribe, readAccepted, () => true);
  const [, setForce] = useState(0);

  const handleAccept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore — sessionStorage unavailable
    }
    // Force a re-render so useSyncExternalStore re-reads the store.
    setForce((n) => n + 1);
  };

  return (
    <>
      <AnimatePresence>
        {!accepted && (
          <DialogPrimitive.Root open onOpenChange={() => {}}>
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-md"
                  aria-hidden
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content
                asChild
                aria-describedby={undefined}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100vw-2rem)] max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin rounded-2xl bg-background border border-border shadow-2xl focus:outline-none"
                >
                  {/* Brand strip */}
                  <div className="h-1.5 w-full bg-brand-gradient rounded-t-2xl" />

                  <div className="p-6 sm:p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <RzrLogo className="h-7" />
                      <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
                        Please read first
                      </span>
                    </div>

                    {/* Title */}
                    <DialogPrimitive.Title className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance leading-tight">
                      A note before you explore.
                    </DialogPrimitive.Title>

                    <DialogPrimitive.Description className="sr-only">
                      This portfolio is a demo built from publicly available research
                      and the job description. Please acknowledge to continue.
                    </DialogPrimitive.Description>

                    {/* Body */}
                    <div className="mt-5 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <p className="text-pretty">
                        This demo was assembled in{" "}
                        <span className="font-semibold text-foreground">two days</span> based
                        on my research and the available data — not on internal RZR
                        information. It is a starting point for our conversation, not a
                        finalized plan.
                      </p>
                      <p className="text-pretty">
                        After we discuss, I will replace this with a properly functional
                        plan reflecting actual context, validated assumptions, and agreed
                        priorities. For now, please treat what follows as a{" "}
                        <span className="font-semibold text-foreground">demonstration of
                        approach</span> — not a commitment.
                      </p>
                    </div>

                    {/* Sources */}
                    <div className="mt-6 p-4 sm:p-5 rounded-lg border border-border bg-muted/40">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="size-3.5 text-mint" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase">
                          Sources used
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {SOURCES.map((s) => (
                          <li key={s.label} className="flex items-start gap-3">
                            <s.icon className="size-4 text-ink/70 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-foreground">
                                {s.label}
                              </div>
                              <div className="text-[11px] text-muted-foreground leading-snug">
                                {s.detail}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Caveats */}
                    <div className="mt-4 flex items-start gap-2.5 p-3 rounded-md bg-ink/[0.03] border border-ink/10">
                      <ShieldAlert className="size-4 text-ink shrink-0 mt-0.5" />
                      <p className="text-[11px] text-ink/80 leading-relaxed">
                        Numbers, names, and timelines shown here are illustrative — they
                        reflect public information and my read of the role, not internal
                        RZR data. Every operating assumption is flagged for validation in
                        the first 30 days.
                      </p>
                    </div>

                    {/* Meta row */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-mono tracking-[0.15em] text-muted-foreground uppercase">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        Built in 2 days
                      </span>
                      <span className="text-border">·</span>
                      <span>Demo purpose only</span>
                      <span className="text-border">·</span>
                      <span>For discussion</span>
                    </div>

                    {/* CTA */}
                    <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Button
                        onClick={handleAccept}
                        size="lg"
                        className="bg-ink text-background hover:bg-ink/85 gap-2 flex-1 sm:flex-initial"
                      >
                        I understand
                        <ArrowRight className="size-4" />
                      </Button>
                      <p className="text-[11px] text-muted-foreground leading-snug flex-1">
                        Clicking &ldquo;I understand&rdquo; acknowledges this is a
                        demo. The acknowledgment lasts for this browser session.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        )}
      </AnimatePresence>

      {/* Lock body scroll while modal is open */}
      <BodyScrollLock locked={!accepted} />

      {/* Render children always (so animations don't have to re-mount on accept);
          visually hidden + aria-hidden while disclaimer is open */}
      <div
        aria-hidden={!accepted}
        style={{
          filter: !accepted ? "blur(6px) brightness(0.7)" : "none",
          transition: "filter 0.4s ease",
          pointerEvents: !accepted ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}

function BodyScrollLock({ locked }: { locked: boolean }) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
  return null;
}
