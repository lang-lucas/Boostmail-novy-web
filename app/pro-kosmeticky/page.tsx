import type { Metadata } from "next";
import { comingSoonPages } from "@/lib/data";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Pro kosmetičky",
  description: comingSoonPages.kosmeticky.description,
};

export default function ProKosmeticky() {
  const data = comingSoonPages.kosmeticky;
  return (
    <ComingSoonPage
      headline={data.headline}
      description={data.description}
      features={data.features}
    />
  );
}
