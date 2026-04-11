"use client";

import { howItWorksSteps } from "@/lib/data";
import { StepCard } from "@/components/ui/StepCard";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            Jak to funguje
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-text-secondary">
            Tři kroky k plnému kalendáři. Žádné složité nastavování.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.15}>
              <StepCard
                step={step.step}
                title={step.title}
                description={step.description}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
