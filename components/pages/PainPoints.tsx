"use client";

import { painPoints } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AlertTriangle, CalendarX, Clock, MailX } from "lucide-react";

const icons = [AlertTriangle, CalendarX, Clock, MailX];

export function PainPoints() {
  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:mb-4 md:text-4xl lg:text-5xl">
            Znáte to?
          </h2>
          <p className="text-base text-text-muted md:text-xl">
            Problémy, které řešíme za vás
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {painPoints.map((point, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={point.title} delay={200 + i * 100}>
                <div className="glass-card group flex h-full gap-4 p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl md:h-11 md:w-11"
                    style={{ background: "linear-gradient(135deg, rgba(57,143,255,0.15), rgba(57,143,255,0.06))", border: "1px solid rgba(57,143,255,0.25)" }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white md:text-xl">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75 md:text-base">
                      {point.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
