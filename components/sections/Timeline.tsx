"use client";

import { timelineEvents } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Zap } from "lucide-react";

export function Timeline() {
  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="mb-12 text-center sm:mb-20 md:mb-24">
          <div className="mb-5 flex items-center justify-center gap-2 md:mb-7">
            <Zap className="h-3 w-3 fill-primary/20 text-primary md:h-3.5 md:w-3.5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              Reálný scénář
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Co se stane, když zákazník
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">zruší termín</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="glass-card overflow-hidden p-6 sm:p-8 md:p-12">
            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <div key={event.time} className="flex items-center gap-6">
                  <div className="w-16 shrink-0 text-right font-mono text-lg font-bold text-primary md:w-20 md:text-xl">
                    {event.time}
                  </div>
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{
                      background: "#398fff",
                      boxShadow: "0 0 12px rgba(57,143,255,0.4)",
                    }}
                  />
                  <div className="text-sm text-white/80 md:text-base">{event.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
