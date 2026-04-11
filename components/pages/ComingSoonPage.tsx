"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

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
    <div className="flex min-h-[70vh] items-center py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <SectionReveal>
          <div className="mb-6 inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1 text-sm text-brand">
            Již brzy
          </div>
          <h1 className="font-heading text-4xl md:text-5xl">{headline}</h1>
          <p className="mt-4 text-text-secondary">{description}</p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 text-brand">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-12">
            <p className="mb-4 text-sm text-text-muted">
              Chcete vědět, až spustíme?
            </p>
            <Button href="/kontakt">Dejte nám vědět</Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
