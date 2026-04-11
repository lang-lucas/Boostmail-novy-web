import type { Metadata } from "next";
import { caseStudy } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Případová studie — Nextlevel Barbershop",
  description: `${caseStudy.metrics.conversions} konverzí, ${caseStudy.metrics.revenue.toLocaleString("cs-CZ")} Kč extra tržby za ${caseStudy.period}. Reálná data z automatického retenčního marketingu.`,
};

export default function CaseStudyPage() {
  const m = caseStudy.metrics;

  return (
    <div className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="text-center">
          <div className="mb-5 flex items-center justify-center gap-2 md:mb-7">
            <Zap className="h-3 w-3 fill-primary/20 text-primary md:h-3.5 md:w-3.5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              Případová studie
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {caseStudy.client}
          </h1>
          <p className="mt-4 text-text-body">
            Výsledky za {caseStudy.period} automatického retenčního marketingu.
          </p>
        </AnimatedSection>

        {/* Main revenue card */}
        <AnimatedSection delay={200}>
          <div className="glass-card relative mt-12 overflow-hidden p-6 text-center sm:p-8 md:p-12">
            <div
              className="radial-glow absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: 0.1 }}
            />
            <p className="relative z-10 text-3xl font-extrabold text-primary sm:text-5xl lg:text-6xl">
              {m.revenue.toLocaleString("cs-CZ")} Kč
            </p>
            <p className="relative z-10 mt-2 text-lg font-semibold sm:text-2xl">navíc v tržbách.</p>
          </div>
        </AnimatedSection>

        {/* Metric grid */}
        <AnimatedSection delay={300}>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <MetricCard value={m.emailsSent.toString()} label="Odeslaných emailů" />
            <MetricCard value={`${m.openRate}%`} label="Open rate" />
            <MetricCard value={m.conversions.toString()} label="Konverzí" />
            <MetricCard value={m.savedSlots.toString()} label="Zachráněných termínů" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            <MetricCard value={m.reactivated.toString()} label="Vrácených neaktivních" />
            <MetricCard value={`${m.clickRate}%`} label="Click rate" />
          </div>
        </AnimatedSection>

        {/* Campaign breakdown */}
        <AnimatedSection delay={200}>
          <h2 className="mb-6 mt-16 text-center text-2xl font-bold tracking-tight md:text-3xl">
            Výkon podle <span className="serif-italic text-primary">kampaní</span>
          </h2>
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Kampaň</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Odesláno</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Open rate</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Click rate</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.campaignBreakdown.map((row) => (
                  <tr key={row.name} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-6 py-4 text-white/75">{row.sent}</td>
                    <td className="px-6 py-4 text-white/75">{row.openRate}%</td>
                    <td className="px-6 py-4 text-white/75">{row.clickRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Per-barber breakdown */}
        <AnimatedSection delay={200}>
          <h2 className="mb-6 mt-16 text-center text-2xl font-bold tracking-tight md:text-3xl">
            Přehled <span className="serif-italic text-primary">barberů</span>
          </h2>
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Barber</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Konverze</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Tržby</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Emaily</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Open</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-text-muted">Click</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.barbers.map((barber) => (
                  <tr key={barber.name} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <td className="px-6 py-4 font-medium text-white">{barber.name}</td>
                    <td className="px-6 py-4 text-primary">{barber.conversions}</td>
                    <td className="px-6 py-4 text-white/75">{barber.revenue.toLocaleString("cs-CZ")} Kč</td>
                    <td className="px-6 py-4 text-white/75">{barber.emails}</td>
                    <td className="px-6 py-4 text-white/75">{barber.openRate}%</td>
                    <td className="px-6 py-4 text-white/75">{barber.clickRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={200} className="mt-16 flex flex-col items-center text-center">
          <p className="mb-6 text-lg font-medium">
            Chcete podobné výsledky? <span className="serif-italic text-primary">Teď je řada na vás.</span>
          </p>
          <a href="/kontakt" className="neon-button px-6 py-3 text-sm md:px-8 md:py-4 md:text-base">
            <span>Chci konzultaci zdarma</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-2 text-sm text-primary/80 md:mt-3">
            (rezervujte si 15minutový videohovor zdarma)
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}

function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="glass-card p-5 text-center md:p-6">
      <div className="text-xl font-bold md:text-2xl">{value}</div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}
