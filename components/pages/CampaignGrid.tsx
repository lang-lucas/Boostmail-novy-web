"use client";

import { campaigns } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CampaignGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            9 kampaní, co běží za vás
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-text-secondary">
            Každá reaguje na jinou situaci. Všechny běží automaticky.
          </p>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {campaigns.map((campaign, i) => (
            <SectionReveal key={campaign.name} delay={i * 0.05}>
              <div className="rounded-xl border border-white/5 bg-surface-card p-6">
                <div className="mb-2 text-xs text-brand">{campaign.trigger}</div>
                <h3 className="mb-1 font-medium text-text-primary">
                  {campaign.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {campaign.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
