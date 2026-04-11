"use client";

import { comparisonData } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Comparison() {
  return (
    <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Proč ne
            <br />
            <span className="serif-italic inline-block pt-2 text-primary md:pt-3">Mailchimp?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {comparisonData.headers.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-primary">✓</td>
                    <td className="px-6 py-4 text-white/20">✕</td>
                    <td className="px-6 py-4 text-white/20">✕</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
