"use client";

import { TopNav } from "@/components/rzr/TopNav";
import { Cover } from "@/components/rzr/Cover";
import { AcademySection } from "@/components/rzr/AcademySection";
import { FtmSection } from "@/components/rzr/FtmSection";
import { LmsSection } from "@/components/rzr/LmsSection";
import { ListeningSection } from "@/components/rzr/ListeningSection";
import { RisksSection } from "@/components/rzr/RisksSection";
import { Footer } from "@/components/rzr/Footer";
import { LazySection, SectionSkeleton } from "@/components/rzr/LazySection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <Cover />

        <LazySection fallback={<SectionSkeleton minHeight={800} />} minHeight={800}>
          <AcademySection />
        </LazySection>

        <LazySection fallback={<SectionSkeleton minHeight={800} />} minHeight={800}>
          <FtmSection />
        </LazySection>

        <LazySection fallback={<SectionSkeleton minHeight={800} />} minHeight={800}>
          <LmsSection />
        </LazySection>

        <LazySection fallback={<SectionSkeleton minHeight={600} />} minHeight={600}>
          <ListeningSection />
        </LazySection>

        <LazySection fallback={<SectionSkeleton minHeight={600} />} minHeight={600}>
          <RisksSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
