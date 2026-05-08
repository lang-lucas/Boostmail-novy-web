import type { Metadata } from "next";
import Image from "next/image";
import statsData from "@/lib/soul-up-stats.json";

export const metadata: Metadata = {
  title: "SOUL UP — výsledky",
  description:
    "Přehled výkonu email funnelu pro SOUL UP. Růst leadů, distribuce archetypů, výkon emailů po verzích šablon.",
  robots: { index: false, follow: false },
};

const BM_ACCENT = "#1a5ada";
const BM_BG = "#f4f4f4";
const BM_INK = "#0a0a0a";

const FONT_SANS = "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif";
const FONT_MONO = "var(--font-jetbrains-mono), 'JetBrains Mono', monospace";
const FONT_SERIF = "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif";

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

  const sortedDays = Object.entries(data.byDay).sort(([a], [b]) => a.localeCompare(b));
  const last30 = sortedDays.slice(-30);
  const maxDay = last30.length ? Math.max(...last30.map(([, c]) => c)) : 1;

  const sortedArch = Object.entries(data.arch).sort(([, a], [, b]) => b - a);

  return (
    <div
      style={{
        background: BM_BG,
        color: BM_INK,
        fontFamily: FONT_SANS,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* HEADER — minimální (logo + interní report mono label) */}
      <header
        style={{
          padding: "20px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(244,244,244,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 10,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/assets/boostmail-logo-black.png"
            alt="BoostMail"
            width={128}
            height={32}
            style={{ height: 32, width: "auto", display: "block" }}
            priority
            unoptimized
          />
        </a>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: "0.15em",
            color: BM_ACCENT,
            fontWeight: 600,
          }}
        >
          SOUL UP · INTERNÍ REPORT
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "80px 56px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.18em",
              color: BM_ACCENT,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            VÝSLEDKY · EMAIL FUNNEL
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Výsledky email{" "}
            <em
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                color: BM_ACCENT,
              }}
            >
              funnelu
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(0,0,0,0.6)",
              marginTop: 24,
              lineHeight: 1.6,
            }}
          >
            Přehled výkonu po verzích šablon. Generováno {generated}.
          </p>
        </div>
      </section>

      {/* 01 — HLAVNÍ ČÍSLA */}
      <section style={{ padding: "40px 56px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <MonoLabel n="01" text="HLAVNÍ ČÍSLA" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            <KpiCard
              kicker="LEADŮ ZE SOUL SCANU"
              value={data.scans.toLocaleString("cs-CZ")}
              sub={`${data.withName} se jménem (${
                data.scans ? Math.round((data.withName / data.scans) * 100) : 0
              } %)`}
            />
            <KpiCard
              kicker="ODESLANÝCH EMAILŮ"
              value={data.totalSent.toLocaleString("cs-CZ")}
              sub={`OR ${pct(data.totalOp, data.totalSent)} · CTR ${pct(data.totalCl, data.totalSent)} *`}
            />
            <KpiCard
              kicker="V KOŠÍKU"
              value={data.inCart.toLocaleString("cs-CZ")}
              sub={`${data.paid} zaplacených · ${pct(data.inCart, data.scans, 2)} konverze`}
              highlight
            />
          </div>
        </div>
      </section>

      {/* 02 — DENNÍ PŘÍRŮSTEK */}
      <section style={{ padding: "20px 56px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <MonoLabel n="02" text="DENNÍ PŘÍRŮSTEK · 30 DNÍ" />
          <h2 style={sectionTitleStyle}>Růst leadů ze Soul Scanu.</h2>
          <Card>
            <div
              style={{
                display: "flex",
                gap: 4,
                alignItems: "flex-end",
                height: 220,
                paddingTop: 24,
                paddingBottom: 24,
              }}
            >
              {last30.map(([d, c]) => {
                const h = Math.max(4, Math.round((c / maxDay) * 100));
                const dayLabel = d.substring(5).replace("-", "/");
                return (
                  <div
                    key={d}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: BM_ACCENT,
                      opacity: 0.7,
                      borderRadius: "4px 4px 0 0",
                      position: "relative",
                      minHeight: 4,
                    }}
                    title={`${d}: ${c} leadů`}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: -22,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        fontWeight: 600,
                        color: BM_ACCENT,
                      }}
                    >
                      {c}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: -22,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: FONT_MONO,
                        fontSize: 10,
                        color: "rgba(0,0,0,0.4)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dayLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* 03 — ARCHETYPY */}
      <section style={{ padding: "20px 56px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <MonoLabel n="03" text="ARCHETYPY" />
          <h2 style={sectionTitleStyle}>Distribuce.</h2>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {sortedArch.map(([k, v]) => {
                const p = data.scans ? Math.round((v / data.scans) * 100) : 0;
                return (
                  <div
                    key={k}
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <div
                      style={{
                        width: 140,
                        fontSize: 14,
                        fontWeight: 500,
                        color: BM_INK,
                      }}
                    >
                      {ARCH_NAME[k]}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 28,
                        background: `${BM_ACCENT}10`,
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${p}%`,
                          background: `linear-gradient(90deg, ${BM_ACCENT}, #4d7eee)`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 110,
                        textAlign: "right",
                        fontSize: 13,
                        color: "rgba(0,0,0,0.65)",
                        fontFamily: FONT_MONO,
                      }}
                    >
                      {v} ({p} %)
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* 04 — EMAIL × VERZE */}
      <section style={{ padding: "20px 56px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <MonoLabel n="04" text="EMAIL × VERZE ŠABLON" />
          <h2 style={sectionTitleStyle}>Výkon podle období.</h2>

          {/* Bot inflation disclaimer */}
          <div
            style={{
              padding: "16px 20px",
              background: `${BM_ACCENT}08`,
              border: `1px solid ${BM_ACCENT}22`,
              borderRadius: 10,
              marginBottom: 24,
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: BM_ACCENT,
                letterSpacing: "0.15em",
                fontWeight: 600,
                whiteSpace: "nowrap",
                paddingTop: 2,
              }}
            >
              POZOR ↓
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.7)",
              }}
            >
              <strong>OR a CTR obsahují bot/proxy aktivitu.</strong>{" "}
              <span style={{ fontFamily: FONT_MONO }}>Apple Mail Privacy Protection</span> pre-fetchne
              tracking pixel u všech iOS uživatelek (otevřou se pixely i bez reálného otevření). Corporate{" "}
              <span style={{ fontFamily: FONT_MONO }}>security scannery</span> (Outlook ATP, Gmail) klikají
              na linky v rámci kontroly. Reálná „human-only" čísla mohou být{" "}
              <strong>20–35 % nižší</strong>. Trendy mezi verzemi jsou ale spolehlivé — bot inflation se nemění.
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: BM_INK,
                      color: "#fff",
                    }}
                  >
                    <th style={tableHeaderStyle}>VERZE</th>
                    {(["E1", "E2", "E3", "E4"] as const).map((e) => (
                      <th key={e} style={tableHeaderStyle}>
                        {EMAIL_LABELS[e].toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.versions.map((v, i) => (
                    <tr
                      key={v.name}
                      style={{
                        background: "#fff",
                        borderBottom:
                          i < data.versions.length - 1
                            ? "1px solid rgba(0,0,0,0.06)"
                            : "none",
                      }}
                    >
                      <td style={{ padding: "20px 24px", verticalAlign: "top" }}>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: `${BM_ACCENT}12`,
                            color: BM_ACCENT,
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: FONT_MONO,
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 11,
                            color: "rgba(0,0,0,0.45)",
                            marginTop: 6,
                          }}
                        >
                          {v.from.substring(0, 10)} →{" "}
                          {v.to.startsWith("2099") ? "dnes" : v.to.substring(0, 10)}
                        </div>
                      </td>
                      {(["E1", "E2", "E3", "E4"] as const).map((e) => {
                        const ev = data.emailVersion as Record<
                          string,
                          { sent: number; op: number; cl: number }
                        >;
                        const d = ev[`${v.name}|${e}`] || { sent: 0, op: 0, cl: 0 };
                        if (d.sent === 0) {
                          return (
                            <td
                              key={e}
                              style={{
                                padding: "20px 24px",
                                color: "rgba(0,0,0,0.25)",
                                fontFamily: FONT_MONO,
                              }}
                            >
                              —
                            </td>
                          );
                        }
                        return (
                          <td key={e} style={{ padding: "20px 24px" }}>
                            <div
                              style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: BM_INK,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {d.sent}
                            </div>
                            <div
                              style={{
                                fontFamily: FONT_MONO,
                                fontSize: 12,
                                color: "rgba(0,0,0,0.55)",
                                marginTop: 2,
                              }}
                            >
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
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "32px 56px",
          marginTop: 24,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Re-generate:{" "}
            <code
              style={{
                background: "rgba(0,0,0,0.05)",
                padding: "2px 8px",
                borderRadius: 4,
                color: "rgba(0,0,0,0.7)",
              }}
            >
              node reports/generate.mjs
            </code>
          </div>
          <a
            href="/"
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12,
              color: BM_ACCENT,
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            ← BOOSTMAIL.CZ
          </a>
        </div>
      </footer>
    </div>
  );
}

// ── Helper styles & components ──────────────────────────────────────────────

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "12px 0 24px",
  lineHeight: 1.15,
};

const tableHeaderStyle: React.CSSProperties = {
  padding: "16px 24px",
  textAlign: "left",
  fontFamily: FONT_MONO,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
};

function MonoLabel({ n, text }: { n: string; text: string }) {
  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize: 11,
        color: BM_ACCENT,
        letterSpacing: "0.15em",
        fontWeight: 600,
      }}
    >
      {n} / {text}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        padding: 28,
      }}
    >
      {children}
    </div>
  );
}

function KpiCard({
  kicker,
  value,
  sub,
  highlight = false,
}: {
  kicker: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: highlight ? `${BM_ACCENT}08` : "#fff",
        border: highlight
          ? `1px solid ${BM_ACCENT}33`
          : "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        padding: "32px 28px",
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          color: BM_ACCENT,
          letterSpacing: "0.15em",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: BM_INK,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(0,0,0,0.55)",
          marginTop: 10,
          fontFamily: FONT_MONO,
        }}
      >
        {sub}
      </div>
    </div>
  );
}
