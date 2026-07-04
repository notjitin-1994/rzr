"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowUpRight, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-ink text-background font-mono font-bold">
                R
              </div>
              <div>
                <div className="text-xs font-mono tracking-widest text-amber uppercase leading-none">
                  RZR · L&D
                </div>
                <div className="text-sm font-semibold leading-tight mt-0.5">
                  Interview Artifacts Portfolio
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md text-pretty">
              Five buildable artifacts accompanying the Senior L&D Lead implementation plan.
              Each is a proof of execution, not a promise. Deployed as a single Next.js app —
              deployable to GitHub Pages, Vercel, or any static host.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
              Artifacts
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { id: "academy", label: "Academy Prototype", tier: "T1" },
                { id: "ftm", label: "FTM Feedback Module", tier: "T1" },
                { id: "lms", label: "LMS Comparison Matrix", tier: "T2" },
                { id: "listening", label: "First 5 Questions", tier: "T2" },
                { id: "risks", label: "Risk Mitigation", tier: "T3" },
              ].map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() =>
                      document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-muted-foreground hover:text-amber transition-colors flex items-center gap-2"
                  >
                    <span className="text-[9px] font-mono text-amber/60 w-5">{a.tier}</span>
                    {a.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
              Built With
            </div>
            <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <li>Next.js 16 · App Router</li>
              <li>TypeScript 5</li>
              <li>Tailwind CSS 4 · shadcn/ui</li>
              <li>Framer Motion</li>
              <li>Deploy: Vercel / GitHub Pages</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="font-mono">Confidential · For Discussion</span>
            <span className="text-border">·</span>
            <span className="font-mono">2026 Edition</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono">
              <FileText className="size-2.5 mr-1" />
              Companion to Implementation Plan
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
