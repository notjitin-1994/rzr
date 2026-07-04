"use client";

import { cn } from "@/lib/utils";

type RzrLogoProps = {
  className?: string;
  variant?: "black" | "white";
  showWordmark?: boolean;
};

/**
 * Official RZR logo — uses the brand asset downloaded from rzr.com.
 * Horizontal black wordmark with TM, used in the site header and footer.
 */
export function RzrLogo({ className, variant = "black", showWordmark = true }: RzrLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src="/brand/rzr-logo-black.svg"
        alt="RZR — Where Intelligence Makes Impact"
        className="h-auto w-auto"
        loading="eager"
        style={{
          filter: variant === "white" ? "brightness(0) invert(1)" : undefined,
          maxHeight: "28px",
        }}
      />
      {!showWordmark && (
        <span className="sr-only">RZR — Where Intelligence Makes Impact</span>
      )}
    </span>
  );
}
