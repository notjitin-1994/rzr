"use client";
import { RisksSection } from "@/components/rzr/RisksSection";
import { PageLayout } from "@/components/rzr/PageLayout";

export default function RiskMitigationPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <RisksSection />
      </div>
    </PageLayout>
  );
}
