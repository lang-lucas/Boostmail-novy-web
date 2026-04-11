"use client";

import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function DashboardPreview() {
  const m = caseStudy.metrics;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            Reálné výsledky
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
            {caseStudy.client} — {caseStudy.period}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="rounded-2xl border border-white/5 bg-surface-card p-8 md:p-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <Stat value={m.conversions.toString()} label="Konverzí" />
              <Stat
                value={`${m.revenue.toLocaleString("cs-CZ")} Kč`}
                label="Extra tržby"
              />
              <Stat value={m.reactivated.toString()} label="Vrácených zákazníků" />
              <Stat value={m.savedSlots.toString()} label="Zachráněných termínů" />
            </div>

            <div className="mt-8 text-center">
              <Button href="/pripadova-studie" variant="outline">
                Celá případová studie
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-medium text-brand md:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}
