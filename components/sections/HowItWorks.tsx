"use client";

import { Heart, Settings, Users } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { howItWorksSteps } from "@/lib/data";

const icons = [Heart, Settings, Users];

export function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="radial-glow absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.08 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:mb-4 md:text-4xl lg:text-5xl">
            Tři kroky k plnému
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">kalendáři</span>
          </h2>
          <p className="mt-2 text-base text-text-muted md:mt-4 md:text-xl">
            Žádné složité nastavování — vše vyřešíme za vás
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3 md:gap-5 lg:gap-6">
          {howItWorksSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={step.step} delay={200 + i * 100}>
                <div className="glass-card group flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 md:gap-5 md:p-10">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 md:h-11 md:w-11"
                    style={{ background: "linear-gradient(135deg, rgba(57,143,255,0.15), rgba(57,143,255,0.06))", border: "1px solid rgba(57,143,255,0.25)" }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/80 md:text-lg">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
