"use client";

import { painPoints } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function PainPoints() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-12 text-center font-heading text-3xl md:text-4xl">
            Znáte to?
          </h2>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {painPoints.map((point, i) => (
            <SectionReveal key={point.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/5 bg-surface-card p-8">
                <h3 className="mb-2 text-lg font-medium text-text-primary">
                  {point.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {point.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
