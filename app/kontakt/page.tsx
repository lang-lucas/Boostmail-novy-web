import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvte si nezávaznou konzultaci zdarma. Zjistíme, kolik zákazníků vám leží v databázi.",
};

export default function KontaktPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-xl px-6">
        <SectionReveal>
          <h1 className="font-heading text-4xl md:text-5xl">
            Zjistěte potenciál vaší{" "}
            <span className="text-brand">databáze</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Nezávazná konzultace zdarma. Nebo nám napište na{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
