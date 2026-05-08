import type { Metadata } from "next";
import { Mail, TrendingUp, Users, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import statsData from "@/lib/soul-up-stats.json";

export const metadata: Metadata = {
  title: "SOUL UP — výsledky",
  description: "Přehled výkonu email funnelu pro SOUL UP. Růst leadů, distribuce archetypů, výkon emailů po verzích šablon.",
  robots: { index: false, follow: false },
};

const ARCH_NAME: Record<string, string> = {
  b: "Budovatelka",
  v: "Vizionářka",
  g: "Průvodkyně",
  i: "Iniciátorka",
  m: "Zrcadlo",
};

const EMAIL_LABELS = {
  E1: "E1 Výsledek",
  E2: "E2 Hloubka",
  E3: "E3 Prodej",
  E4: "E4 Final",
} as const;

const pct = (n: number, d: number, places = 1): string =>
  d ? `${Math.round((n / d) * Math.pow(10, places + 2)) / Math.pow(10, places)} %` : "—";

type Stats = typeof statsData;

export default function SoulUpStatsPage() {
  const data = statsData as Stats;
  const generated = new Date(data.generatedAt).toLocaleString("cs-CZ", {
    timeZone: "Europe/Prague",
    dateStyle: "long",
    timeStyle: "short",
  });

  // Sort days, get last 30
  const sortedDays = Object.entries(data.byDay).sort(([a], [b]) => a.localeCompare(b));
  const last30 = sortedDays.slice(-30);
  const maxDay = last30.length ? Math.max(...last30.map(([, c]) => c)) : 1;

  // Sort archetypes by count desc
  const sortedArch = Object.entries(data.arch).sort(([, a], [, b]) => b - a);

  return (
    <div className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <AnimatedSection className="text-center">
          <div className="mb-5 flex items-center justify-center gap-2 md:mb-7">
            <Mail className="h-3 w-3 fill-primary/20 text-primary md:h-3.5 md:w-3.5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-label md:text-sm">
              SOUL UP · interní report
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Výsledky email <span className="serif-italic text-primary">funnelu</span>
          </h1>
          <p className="mt-4 text-text-body">
            Přehled výkonu po verzích šablon. Generováno {generated}.
          </p>
        </AnimatedSection>

        {/* KPI Hero */}
        <AnimatedSection delay={150}>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <KpiCard
              icon={<Users className="h-5 w-5 text-primary" />}
              value={data.scans.toString()}
              label="leadů ze Soul Scanu"
              sub={`${data.withName} se jménem (${
                data.scans ? Math.round((data.withName / data.scans) * 100) : 0
              } %)`}
            />
            <KpiCard
              icon={<Mail className="h-5 w-5 text-primary" />}
              value={data.totalSent.toLocaleString("cs-CZ")}
              label="odeslaných emailů"
              sub={`OR ${pct(data.totalOp, data.totalSent)} · CTR ${pct(data.totalCl, data.totalSent)}`}
            />
            <KpiCard
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
              value={data.inCart.toString()}
              label="v košíku"
              sub={`${data.paid} zaplacených · ${pct(data.inCart, data.scans, 2)} konverze`}
            />
          </div>
        </AnimatedSection>

        {/* Daily growth */}
        <AnimatedSection delay={250}>
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Růst leadů (posledních 30 dnů)</h2>
            <div className="glass-card p-6">
              <div className="flex h-52 items-end gap-1.5 pt-6">
                {last30.map(([d, c]) => {
                  const h = Math.max(4, Math.round((c / maxDay) * 100));
                  const dayLabel = d.substring(5).replace("-", "/");
                  return (
                    <div
                      key={d}
                      className="group relative flex-1 rounded-t bg-primary/40 transition-colors hover:bg-primary"
                      style={{ height: `${h}%` }}
                      title={`${d}: ${c} leadů`}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-primary">
                        {c}
                      </span>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-text-muted">
                        {dayLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Archetypes */}
        <AnimatedSection delay={300}>
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Distribuce archetypů</h2>
            <div className="glass-card space-y-3.5 p-6">
              {sortedArch.map(([k, v]) => {
                const p = data.scans ? Math.round((v / data.scans) * 100) : 0;
                return (
                  <div key={k} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-text-secondary">{ARCH_NAME[k]}</div>
                    <div className="h-7 flex-1 overflow-hidden rounded-md bg-primary/10">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light transition-all"
                        style={{ width: `${p}%` }}
                      />
                    </div>
                    <div className="w-24 text-right text-sm text-text-muted">
                      {v} ({p} %)
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* Email × version table */}
        <AnimatedSection delay={350}>
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Email metriky podle verze šablon</h2>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 text-left">
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-label">
                        Verze
                      </th>
                      {(["E1", "E2", "E3", "E4"] as const).map((e) => (
                        <th
                          key={e}
                          className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-text-label"
                        >
                          {EMAIL_LABELS[e]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.versions.map((v) => (
                      <tr key={v.name} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-4">
                          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-light">
                            {v.name}
                          </span>
                          <div className="mt-1.5 text-[11px] text-text-muted">
                            {v.from.substring(0, 10)} → {v.to.startsWith("2099") ? "dnes" : v.to.substring(0, 10)}
                          </div>
                        </td>
                        {(["E1", "E2", "E3", "E4"] as const).map((e) => {
                          const ev = data.emailVersion as Record<string, { sent: number; op: number; cl: number }>;
                          const d = ev[`${v.name}|${e}`] || { sent: 0, op: 0, cl: 0 };
                          if (d.sent === 0) {
                            return (
                              <td key={e} className="px-4 py-4 text-text-dimmed">
                                —
                              </td>
                            );
                          }
                          return (
                            <td key={e} className="px-4 py-4">
                              <div className="font-semibold text-text-primary">{d.sent}</div>
                              <div className="mt-0.5 text-xs text-text-muted">
                                OR {pct(d.op, d.sent)} · CTR {pct(d.cl, d.sent)}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection delay={400}>
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Timeline změn</h2>
            <div className="space-y-2.5">
              {data.timeline.slice(0, 10).map((t) => (
                <div
                  key={t.hash}
                  className="glass-pill flex items-start gap-5 border-l-2 border-primary/60"
                  style={{ padding: "1rem 1.25rem" }}
                >
                  <div className="min-w-[100px] font-mono text-xs text-text-muted">{t.date}</div>
                  <div className="flex-1 text-sm text-text-secondary">{t.msg}</div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Insights */}
        <AnimatedSection delay={450}>
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Klíčová zjištění</h2>
            <div className="space-y-3">
              <Insight>
                <strong className="text-primary-light">E1 Výsledek funguje</strong> — Open Rate stabilně kolem 45 %
                napříč verzemi. Předmět emailu ženy zaujme.
              </Insight>
              <Insight>
                <strong className="text-primary-light">CTR propad mezi verzemi</strong> — z ~12 % (Pre-rewrite) na ~1 %
                (V1 rewrite). Hypotéza: CTA tlačítko (tmavé pozadí + bílé písmo) se nerenderovalo v některých klientech
                (Outlook, Seznam.cz). V4 vrátilo textový link.
              </Insight>
              <Insight>
                <strong className="text-primary-light">E3 Prodej</strong> má minimum reálných kliků na CTA. Otevírá se
                kolem 17 %, ale lidé na nákup neklikají. Hrdlem není email — je v copy/UX prodejní stránky nebo v
                ceně.
              </Insight>
              <Insight>
                <strong className="text-primary-light">Konverze do košíku {data.inCart}/{data.scans}</strong> ={" "}
                {pct(data.inCart, data.scans, 2)}. Průmyslový benchmark cold-traffic je 1–3 %. Hrdlem je přechod email
                → checkout.
              </Insight>
              <Insight>
                <strong className="text-primary-light">
                  Budovatelka {Math.round((data.arch.b / data.scans) * 100)} % leadů
                </strong>{" "}
                — copy laděný na ní má největší pákový efekt. Iniciátorka a Průvodkyně (~3 % každá) mají vysoký
                engagement, ale objem je malý.
              </Insight>
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <div className="mt-16 border-t border-white/5 pt-8 text-sm text-text-muted">
          <p>
            Data se generují manuálně pomocí <code className="rounded bg-white/5 px-2 py-0.5 text-text-secondary">node reports/generate.mjs</code> v repu{" "}
            <code className="rounded bg-white/5 px-2 py-0.5 text-text-secondary">soulup-triggers</code>. Pro aktualizaci stránky aktualizovat{" "}
            <code className="rounded bg-white/5 px-2 py-0.5 text-text-secondary">lib/soul-up-stats.json</code> v tomto repu a redeployovat.
          </p>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="glass-card relative overflow-hidden p-6 sm:p-8">
      <div className="mb-3 flex items-center gap-2">{icon}</div>
      <div className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">{value}</div>
      <div className="mt-2 text-text-secondary">{label}</div>
      <div className="mt-1 text-xs text-text-muted">{sub}</div>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-pill border-l-2 border-primary/60 text-sm leading-relaxed text-text-body">
      {children}
    </div>
  );
}
