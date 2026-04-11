"use client";

import { campaigns } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Zap } from "lucide-react";

export function CampaignGrid() {
  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="radial-glow absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.06 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <div className="mb-5 flex items-center justify-center gap-2 md:mb-7">
            <Zap className="h-3 w-3 fill-primary/20 text-primary md:h-3.5 md:w-3.5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              Automatizace
            </span>
          </div>
          <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:mb-4 md:text-4xl lg:text-5xl">
            9 kampaní, co běží
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">za vás</span>
          </h2>
          <p className="mt-2 text-base text-text-muted md:mt-4 md:text-lg">
            Každá reaguje na jinou situaci. Všechny běží automaticky.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {campaigns.map((campaign, i) => (
            <AnimatedSection key={campaign.name} delay={i * 50}>
              <div className="glass-card group flex h-full flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-primary"
                  style={{ background: "rgba(57,143,255,0.12)", border: "1px solid rgba(57,143,255,0.25)" }}
                >
                  {campaign.trigger}
                </span>
                <h3 className="font-bold text-white">{campaign.name}</h3>
                <p className="text-sm text-white/75">{campaign.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
