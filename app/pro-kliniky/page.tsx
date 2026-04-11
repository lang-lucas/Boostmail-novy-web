import type { Metadata } from "next";
import { comingSoonPages } from "@/lib/data";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Pro kliniky",
  description: comingSoonPages.kliniky.description,
};

export default function ProKliniky() {
  const data = comingSoonPages.kliniky;
  return (
    <ComingSoonPage
      headline={data.headline}
      description={data.description}
      features={data.features}
    />
  );
}
