"use client";

import { metrics } from "@/lib/data";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function SocialProof() {
  return (
    <section className="border-y border-white/5 py-16">
      <SectionReveal>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
