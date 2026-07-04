"use client";
import { RisksSection } from "@/components/rzr/RisksSection";
import { PageLayout } from "@/components/rzr/PageLayout";

export default function RiskMitigationPage() {
  return (
    <PageLayout>
      <div className="pt-12 pb-8">
        <RisksSection />
      </div>
    </PageLayout>
  );
}
