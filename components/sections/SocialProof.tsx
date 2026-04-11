"use client";

import { Store, Plus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const systems = [
  { name: "Reservio", sub: "Rezervační systém", icon: Store },
  { name: "Reservanto", sub: "Rezervační systém", icon: Store },
  { name: "MyFox", sub: "Rezervační systém", icon: Store },
  { name: "...a další desítky systémů", sub: null, icon: Plus },
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden px-5 pt-8 pb-12 sm:px-8 md:pt-12 md:pb-16">
      <div className="absolute top-0 left-0 h-px w-full bg-white/5" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/5" />

      <div
        className="radial-glow absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.05 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection>
          <h2 className="mb-10 text-center text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl">
            Napojíme se na 90 %
            <br />
            <span className="serif-italic inline-block pt-2 text-primary">systémů v ČR a SR</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex flex-wrap items-stretch justify-center gap-5">
            {systems.map((s) => (
              <div
                key={s.name}
                className="glass-card flex min-w-[220px] items-center gap-4 p-6 opacity-60 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:opacity-100 hover:border-primary/30"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(57,143,255,0.15), rgba(57,143,255,0.06))", border: "1px solid rgba(57,143,255,0.25)" }}
                >
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">{s.name}</p>
                  {s.sub && <p className="text-xs text-text-muted">{s.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
