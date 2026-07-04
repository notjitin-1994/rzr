"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, FileText } from "lucide-react";
import { RzrLogo } from "./RzrLogo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <RzrLogo className="h-9 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md text-pretty">
              Five buildable artifacts accompanying the Senior L&amp;D Lead strategy. Each one
              is a proof of execution, not a promise — designed to translate the implementation
              plan into decisions a hiring manager can validate.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/30">
              <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-[11px] font-mono text-mint tracking-[0.15em] uppercase">
                Where intelligence makes impact
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-3">
              Portfolio
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { id: "academy", label: "Onboarding Prototype" },
                { id: "ftm", label: "Manager Capability Module" },
                { id: "lms", label: "LMS Decision Matrix" },
                { id: "listening", label: "Listening Tour Questions" },
                { id: "risks", label: "Risk Mitigation Plan" },
              ].map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() =>
                      document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-muted-foreground hover:text-mint transition-colors flex items-center gap-1.5 group"
                  >
                    {a.label}
                    <ArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-3">
              Strategic Anchors
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <li>· 30 / 60 / 90-day quick-win plan</li>
              <li>· 12-month implementation roadmap</li>
              <li>· Year-2 strategic vision</li>
              <li>· Kirkpatrick L1–L3 measurement</li>
              <li>· AI-native operating model</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="font-mono tracking-wider">Confidential · For Discussion</span>
            <span className="text-border">·</span>
            <span className="font-mono tracking-wider">2026 Edition</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono border-border text-muted-foreground">
            <FileText className="size-2.5 mr-1" />
            Companion to Implementation Plan
          </Badge>
        </div>
      </div>
    </footer>
  );
}
