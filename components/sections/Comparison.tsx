"use client";

import { comparisonData } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Comparison() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal>
          <h2 className="mb-12 text-center font-heading text-3xl md:text-4xl">
            Proč ne Mailchimp?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  {comparisonData.headers.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 font-medium text-text-secondary"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="px-6 py-4 text-text-primary">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-brand">&#10003;</td>
                    <td className="px-6 py-4 text-text-muted">&#10005;</td>
                    <td className="px-6 py-4 text-text-muted">&#10005;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
