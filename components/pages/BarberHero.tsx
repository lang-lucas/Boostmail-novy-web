"use client";

import { ArrowRight, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BarberHero() {
  return (
    <section className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-16 sm:px-8 md:pt-40">
      <div
        className="radial-glow absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.12 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <AnimatedSection className="w-full">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:mb-12 md:text-5xl lg:text-[80px]">
            Plný kalendář.
            <br />
            <span className="serif-italic inline-block pt-2 text-3xl text-primary md:pt-3 md:text-6xl">
              Bez reklam. Automaticky.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-text-body md:mb-12 md:text-lg">
            Napojíme se na váš Reservio a automaticky vracíme zákazníky, kteří by
            jinak nepřišli. Vy stříháte, my plníme kalendář.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
            Pro CZ/SK barbershopy
          </span>
        </AnimatedSection>

        <AnimatedSection delay={300} className="flex flex-col items-center gap-4 sm:flex-row">
          <a href="/kontakt" className="neon-button px-6 py-3 text-sm md:px-8 md:py-4 md:text-base">
            <span>Napojte svůj barbershop</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/pripadova-studie" className="ghost-button text-sm md:text-base">
            Případová studie
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
