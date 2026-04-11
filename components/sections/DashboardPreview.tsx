"use client";

import { CalendarCheck, DollarSign, Clock, ArrowRight, Zap } from "lucide-react";
import { caseStudy } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function DashboardPreview() {
  const m = caseStudy.metrics;

  const stats = [
    { icon: CalendarCheck, value: m.savedSlots.toString(), label: "zachráněných termínů" },
    { icon: DollarSign, value: `${m.revenue.toLocaleString("cs-CZ")} Kč`, label: "extra tržby za 30 dní" },
    { icon: Clock, value: "0 hodin", label: "stráveného času nastavováním" },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="mb-12 text-center sm:mb-20 md:mb-24">
          <div className="mb-5 flex items-center justify-center gap-2 md:mb-7">
            <Zap className="h-3 w-3 fill-primary/20 text-primary md:h-3.5 md:w-3.5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              Případová studie
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Jak to vypadalo v praxi u
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">{caseStudy.client}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-body md:text-lg">
            Výsledky za {caseStudy.period} automatického retenčního marketingu.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200} className="mb-6 md:mb-10">
          <div className="glass-card relative overflow-hidden p-6 text-center sm:p-8 md:p-12">
            <div
              className="radial-glow absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: 0.1 }}
            />
            <p className="relative z-10 text-3xl font-extrabold text-primary sm:text-5xl lg:text-6xl">
              {m.revenue.toLocaleString("cs-CZ")} Kč
            </p>
            <p className="relative z-10 mt-2 text-lg font-semibold sm:text-2xl">navíc v tržbách.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mb-16 md:gap-5 lg:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center md:p-6">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary md:mb-3 md:h-6 md:w-6" />
              <p className="text-xl font-bold md:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs text-text-body md:text-sm">{stat.label}</p>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={500} className="flex flex-col items-center">
          <a href="/pripadova-studie" className="neon-button max-w-xs px-6 py-3 text-sm md:max-w-none md:px-8 md:py-4 md:text-base">
            <span>Celá případová studie</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
