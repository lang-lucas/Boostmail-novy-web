"use client";

import { caseStudy } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

export function CaseStudyTeaser() {
  const m = caseStudy.metrics;

  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="glass-card relative overflow-hidden p-6 text-center sm:p-8 md:p-12">
            <div
              className="radial-glow absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: 0.1 }}
            />
            <p className="relative z-10 mb-2 text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              Případová studie — {caseStudy.client}
            </p>
            <p className="relative z-10 mt-4 text-3xl font-extrabold text-primary sm:text-5xl">
              {m.revenue.toLocaleString("cs-CZ")} Kč
            </p>
            <p className="relative z-10 mt-2 text-lg font-semibold sm:text-2xl">extra tržby za {caseStudy.period}</p>

            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-xl font-bold md:text-2xl">{m.conversions}</div>
                <div className="mt-1 text-xs text-text-muted">konverzí</div>
              </div>
              <div>
                <div className="text-xl font-bold md:text-2xl">{m.savedSlots}</div>
                <div className="mt-1 text-xs text-text-muted">zachráněných termínů</div>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <a href="/pripadova-studie" className="ghost-button text-sm md:text-base">
                <span>Celá případová studie</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
