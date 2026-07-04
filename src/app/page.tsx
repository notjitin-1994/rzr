"use client";

import { TopNav } from "@/components/rzr/TopNav";
import { Cover } from "@/components/rzr/Cover";
import { AcademySection } from "@/components/rzr/AcademySection";
import { FtmSection } from "@/components/rzr/FtmSection";
import { LmsSection } from "@/components/rzr/LmsSection";
import { ListeningSection } from "@/components/rzr/ListeningSection";
import { RisksSection } from "@/components/rzr/RisksSection";
import { Footer } from "@/components/rzr/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <Cover />
        <AcademySection />
        <FtmSection />
        <LmsSection />
        <ListeningSection />
        <RisksSection />
      </main>
      <Footer />
    </div>
  );
}
