import type { Metadata } from "next";
import { BarberHero } from "@/components/pages/BarberHero";
import { PainPoints } from "@/components/pages/PainPoints";
import { CampaignGrid } from "@/components/pages/CampaignGrid";
import { CaseStudyTeaser } from "@/components/pages/CaseStudyTeaser";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Pro barbershopy",
  description:
    "Plný kalendář bez reklam. Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a personalizujeme emaily za každého barbera.",
};

export default function ProBarbershopy() {
  return (
    <>
      <BarberHero />
      <PainPoints />
      <CampaignGrid />
      <CaseStudyTeaser />
      <CTASection />
    </>
  );
}
