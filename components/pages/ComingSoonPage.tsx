"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";

type ComingSoonPageProps = {
  headline: string;
  description: string;
  features: readonly string[];
};

export function ComingSoonPage({
  headline,
  description,
  features,
}: ComingSoonPageProps) {
  return (
    <div className="flex min-h-[70vh] items-center px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <span
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-primary"
            style={{ background: "rgba(57,143,255,0.12)", border: "1px solid rgba(57,143,255,0.25)" }}
          >
            Již brzy
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 text-text-body">{description}</p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {features.map((feature) => (
              <li
                key={feature}
                className="glass-card flex items-start gap-3 px-5 py-3.5 text-sm text-white/80"
              >
                <div
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
                  style={{ background: "rgba(57,143,255,0.12)", border: "1px solid rgba(57,143,255,0.25)" }}
                >
                  <Check className="h-3 w-3 text-primary" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div className="mt-12">
            <p className="mb-4 text-sm text-text-muted">
              Chcete vědět, až spustíme?
            </p>
            <a href="/kontakt" className="neon-button text-sm md:text-base">
              <span>Dejte nám vědět</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
