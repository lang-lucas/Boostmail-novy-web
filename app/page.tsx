import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Timeline } from "@/components/sections/Timeline";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Comparison } from "@/components/sections/Comparison";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Timeline />
      <DashboardPreview />
      <Comparison />
      <CTASection />
    </>
  );
}
