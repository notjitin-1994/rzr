"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LazySectionProps = {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  /** Min height to reserve while waiting — prevents layout jank. */
  minHeight?: number | string;
};

/**
 * Defers rendering of children until the section is within ~200px of the viewport.
 * Useful for heavy interactive sections so the initial page paint stays fast.
 *
 * SSR-safe: server renders children by default. After hydration, if the element
 * is below the lazy threshold, it switches to the fallback until it scrolls near.
 */
export function LazySection({
  children,
  fallback,
  className,
  rootMargin = "200px",
  minHeight,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Quick check: if the element is already in or near the viewport, render.
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 800;
    if (rect.top < viewportHeight + 200) return;

    // Otherwise: defer rendering until near viewport.
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    observer.observe(el);

    // Hide immediately AFTER first paint to avoid hydration mismatch flash.
    // Using requestAnimationFrame defers to next frame, post-hydration.
    const raf = requestAnimationFrame(() => {
      if (active) setShouldRender(false);
    });

    return () => {
      active = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={cn(className)} style={minHeight ? { minHeight } : undefined}>
      {shouldRender ? children : fallback ?? null}
    </div>
  );
}

/** Lightweight skeleton fallback used by lazy sections. */
export function SectionSkeleton({ minHeight = 400 }: { minHeight?: number }) {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ minHeight }}
      aria-hidden
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
        <div className="h-2 w-2 rounded-full bg-mint animate-pulse [animation-delay:200ms]" />
        <div className="h-2 w-2 rounded-full bg-mint animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
}
