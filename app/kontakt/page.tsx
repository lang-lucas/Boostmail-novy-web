import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvte si nezávaznou konzultaci zdarma. Zjistíme, kolik zákazníků vám leží v databázi.",
};

export default function KontaktPage() {
  return (
    <div className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <AnimatedSection>
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Zjistěte potenciál vaší{" "}
            <span className="serif-italic text-primary">databáze</span>
          </h1>
          <p className="mt-4 text-center text-text-body">
            Nezávazná konzultace zdarma. Nebo nám napište na{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
