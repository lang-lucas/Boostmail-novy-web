import type { Metadata } from "next";
import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Případová studie — Nextlevel Barbershop",
  description: `${caseStudy.metrics.conversions} konverzí, ${caseStudy.metrics.revenue.toLocaleString("cs-CZ")} Kč extra tržby za ${caseStudy.period}. Reálná data z automatického retenčního marketingu.`,
};

export default function CaseStudyPage() {
  const m = caseStudy.metrics;

  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <SectionReveal>
          <p className="mb-2 text-sm text-brand">Případová studie</p>
          <h1 className="font-heading text-4xl md:text-5xl">
            {caseStudy.client}
          </h1>
          <p className="mt-4 text-text-secondary">
            Výsledky za {caseStudy.period} automatického retenčního marketingu.
          </p>
        </SectionReveal>

        {/* Top metrics */}
        <SectionReveal delay={0.2}>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            <MetricCard value={m.emailsSent.toString()} label="Odeslaných emailů" />
            <MetricCard value={`${m.openRate}%`} label="Open rate" />
            <MetricCard value={m.conversions.toString()} label="Konverzí" />
            <MetricCard
              value={`${m.revenue.toLocaleString("cs-CZ")} Kč`}
              label="True ROI"
              highlight
            />
          </div>
        </SectionReveal>

        {/* Secondary metrics */}
        <SectionReveal delay={0.3}>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            <MetricCard value={m.reactivated.toString()} label="Vrácených neaktivních" />
            <MetricCard value={m.savedSlots.toString()} label="Zachráněných termínů" />
            <MetricCard value={`${m.clickRate}%`} label="Click rate" />
          </div>
        </SectionReveal>

        {/* Campaign breakdown */}
        <SectionReveal delay={0.2}>
          <h2 className="mb-6 mt-16 font-heading text-2xl">
            Výkon podle kampaní
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  <th className="px-6 py-3 text-text-muted">Kampaň</th>
                  <th className="px-6 py-3 text-text-muted">Odesláno</th>
                  <th className="px-6 py-3 text-text-muted">Open rate</th>
                  <th className="px-6 py-3 text-text-muted">Click rate</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.campaignBreakdown.map((row) => (
                  <tr key={row.name} className="border-b border-white/5">
                    <td className="px-6 py-3 text-text-primary">{row.name}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.sent}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.openRate}%</td>
                    <td className="px-6 py-3 text-text-secondary">{row.clickRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>

        {/* Per-barber breakdown */}
        <SectionReveal delay={0.2}>
          <h2 className="mb-6 mt-16 font-heading text-2xl">
            Přehled barberů
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  <th className="px-6 py-3 text-text-muted">Barber</th>
                  <th className="px-6 py-3 text-text-muted">Konverze</th>
                  <th className="px-6 py-3 text-text-muted">Tržby</th>
                  <th className="px-6 py-3 text-text-muted">Emaily</th>
                  <th className="px-6 py-3 text-text-muted">Open</th>
                  <th className="px-6 py-3 text-text-muted">Click</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.barbers.map((barber) => (
                  <tr key={barber.name} className="border-b border-white/5">
                    <td className="px-6 py-3 font-medium text-text-primary">
                      {barber.name}
                    </td>
                    <td className="px-6 py-3 text-brand">{barber.conversions}</td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.revenue.toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-3 text-text-secondary">{barber.emails}</td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.openRate}%
                    </td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.clickRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal delay={0.2}>
          <div className="mt-16 text-center">
            <p className="mb-6 text-text-secondary">
              Chcete podobné výsledky pro svůj barbershop?
            </p>
            <Button href="/kontakt" size="lg">
              Chci konzultaci zdarma
            </Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

function MetricCard({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 text-center ${
        highlight
          ? "border-brand/30 bg-brand/5"
          : "border-white/5 bg-surface-card"
      }`}
    >
      <div
        className={`text-2xl font-medium ${highlight ? "text-brand" : "text-text-primary"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}
