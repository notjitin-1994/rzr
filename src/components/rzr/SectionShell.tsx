"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  badge,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-nav py-16 sm:py-24 border-t border-border/60 first:border-t-0",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-widest text-amber uppercase">
              {eyebrow}
            </span>
            {badge && (
              <Badge
                variant="outline"
                className="border-amber/40 text-amber bg-amber/5 text-[10px] font-mono"
              >
                {badge}
              </Badge>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl text-pretty">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
