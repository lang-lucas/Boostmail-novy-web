"use client";

import { Check, ArrowRight, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { heroContent, metrics } from "@/lib/data";

const badges = [
  "Přímé napojení na váš rezervační systém",
  "Dokazatelný ROI — každou korunu měříme",
  "Plný autopilot — vy stříháte, my posíláme",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pb-32 md:pt-40">
      <div
        className="radial-glow absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.12 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <AnimatedSection className="w-full">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:mb-12 md:text-5xl lg:text-[80px]">
            {heroContent.headline}
            <br />
            <span className="serif-italic inline-block pt-2 text-3xl text-primary md:pt-3 md:text-6xl">
              {heroContent.headlineAccent}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-text-body md:mb-12 md:text-lg">
            {heroContent.subheadline}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="mb-6 flex flex-col items-center justify-center gap-4 md:mb-8 md:flex-row">
          <div className="mb-2 flex items-center gap-0.5 md:mb-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary md:h-4 md:w-4" />
            ))}
          </div>
          <span className="text-center text-xs font-medium uppercase tracking-widest text-primary/80">
            Prověřené řešení pro CZ/SK barbershopy
          </span>
        </AnimatedSection>

        <AnimatedSection delay={200} className="mb-8 w-full md:mb-12">
          <div className="glass-card grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:p-8 md:p-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                  {metric.value.toLocaleString("cs-CZ")}{metric.suffix}
                </div>
                <div className="mt-1 text-sm text-text-muted">{metric.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400} className="flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row md:mb-6">
            <a href="#jak-to-funguje" className="neon-button max-w-xs px-6 py-3 text-sm md:px-8 md:py-4 md:text-base">
              <span>{heroContent.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0 md:divide-x md:divide-border">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 first:md:pl-0 last:md:pr-0 md:gap-3 md:px-8">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg md:h-7 md:w-7"
                    style={{ background: "rgba(57,143,255,0.12)", border: "1px solid rgba(57,143,255,0.25)" }}
                  >
                    <Check className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                  </div>
                  <span className="text-sm font-medium text-white/90 md:text-base">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
