"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "academy", label: "Academy Prototype", tier: "T1" },
  { id: "ftm", label: "FTM Module", tier: "T1" },
  { id: "lms", label: "LMS Matrix", tier: "T2" },
  { id: "listening", label: "First 5 Questions", tier: "T2" },
  { id: "risks", label: "Risk Mitigation", tier: "T3" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "no-print fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-ink text-background font-mono font-bold text-sm tracking-tighter">
              R
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono tracking-widest text-amber uppercase leading-none">
                RZR · L&D
              </div>
              <div className="text-sm font-semibold leading-tight mt-0.5">
                Interview Artifacts
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active === item.id
                    ? "text-amber bg-amber/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNav("cover")}
              className="font-mono text-xs"
            >
              ↑ Top
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border/60 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  active === item.id
                    ? "text-amber bg-amber/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                <span className="text-[10px] font-mono text-amber/70 mr-2">{item.tier}</span>
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
