"use client";

import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function CaseStudyTeaser() {
  const m = caseStudy.metrics;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal>
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center md:p-12">
            <p className="mb-2 text-sm text-brand">{caseStudy.client}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.conversions}
                </div>
                <div className="text-xs text-text-muted">konverzí</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.revenue.toLocaleString("cs-CZ")} Kč
                </div>
                <div className="text-xs text-text-muted">extra tržby</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.savedSlots}
                </div>
                <div className="text-xs text-text-muted">zachráněných termínů</div>
              </div>
            </div>
            <Button href="/pripadova-studie">Celá případová studie</Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
