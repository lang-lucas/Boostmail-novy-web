"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionReveal>
          <h2 className="font-heading text-3xl md:text-5xl">
            Zjistěte kolik peněz vám leží{" "}
            <span className="text-brand">v databázi</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-text-secondary">
            Nezávazná konzultace zdarma. Podíváme se na váš rezervační systém a
            řekneme vám, kolik zákazníků můžete vrátit.
          </p>
          <div className="mt-10">
            <Button href="/kontakt" size="lg">
              Chci konzultaci zdarma
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
