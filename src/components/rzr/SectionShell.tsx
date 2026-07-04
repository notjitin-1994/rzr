"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "./Motion";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Strategic framing — answers "why this matters to the business" (hiring manager lens). */
  strategicFrame?: string;
  /** Optional business outcome chip — quantified impact. */
  outcomeChip?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  strategicFrame,
  outcomeChip,
  children,
  className,
  badge,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-nav py-20 sm:py-28 border-t border-border/60 first:border-t-0",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-[0.2em] text-mint uppercase font-medium">
              {eyebrow}
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-mint to-transparent" />
            {badge && (
              <Badge
                variant="outline"
                className="border-mint/40 text-mint bg-mint/5 text-[10px] font-mono uppercase tracking-wider"
              >
                {badge}
              </Badge>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-foreground leading-[1.1]">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-3xl text-pretty leading-relaxed">
              {description}
            </p>
          )}
          {(strategicFrame || outcomeChip) && (
            <div className="mt-6 flex flex-wrap items-stretch gap-3">
              {strategicFrame && (
                <div className="flex-1 min-w-[280px] p-4 rounded-lg border-l-2 border-mint bg-mint/[0.04]">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-mint uppercase mb-1.5">
                    Why this matters
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
                    {strategicFrame}
                  </p>
                </div>
              )}
              {outcomeChip && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-ink/15 bg-ink/[0.03]">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-ink/60 uppercase">
                    Outcome
                  </span>
                  <span className="text-sm font-semibold text-ink">{outcomeChip}</span>
                </div>
              )}
            </div>
          )}
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
