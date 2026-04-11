"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-5 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-20 md:pb-28">
      <div
        className="radial-glow absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.1 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="mb-8 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
            Zjistěte, kolik peněz
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">vám leží v databázi.</span>
          </h2>
          <div className="mt-5 flex flex-col items-center gap-3 md:mt-8 md:mb-12 md:flex-row md:justify-center md:gap-10">
            <div className="flex items-center gap-2 text-sm font-medium text-white md:text-lg">
              <CircleCheck className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span>Nezávazná konzultace</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white md:text-lg">
              <CircleCheck className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span>Žádná smlouva</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white md:text-lg">
              <CircleCheck className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span>Žádný závazek</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200} className="flex flex-col items-center">
          <a href="/kontakt" className="neon-button px-6 py-3 text-sm md:px-8 md:py-4 md:text-base">
            <span>Chci konzultaci zdarma</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-2 text-sm text-primary/80 md:mt-3 md:text-base">
            Odpovídáme do 24 hodin
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
