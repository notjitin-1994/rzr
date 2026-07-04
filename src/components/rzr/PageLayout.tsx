"use client";

import { TopNav } from "@/components/rzr/TopNav";
import { Footer } from "@/components/rzr/Footer";
import { DisclaimerGate } from "@/components/rzr/DisclaimerGate";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <DisclaimerGate>
      <div className="min-h-screen flex flex-col bg-background">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DisclaimerGate>
  );
}
