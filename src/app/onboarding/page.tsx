"use client";
import { AcademySection } from "@/components/rzr/AcademySection";
import { PageLayout } from "@/components/rzr/PageLayout";

export default function OnboardingPage() {
  return (
    <PageLayout>
      <div className="pt-12 pb-8">
        <AcademySection />
      </div>
    </PageLayout>
  );
}
