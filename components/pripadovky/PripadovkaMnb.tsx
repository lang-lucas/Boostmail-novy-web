"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BARBER, BARBER_DEEP, BARBER_SOFT, BarberPhoto, BarberLabel, BarberCapMark } from "@/components/reseni/barber-charts";

const MONO = "var(--font-jetbrains-mono), monospace";
const INK = "#0a0a0a";
const MNB_PHOTO = "/pripadovky/mnb-provozovna.webp";
const wrap = { maxWidth: 1300, margin: "0 auto" } as const;

/* ── ramp křivka náběhu (30 → 60 → 90 dní) ── */
const RAMP_POINTS = [
  { d: 0, v: 0 },
  { d: 30, v: 8 },
  { d: 60, v: 45 },
  { d: 90, v: 92 },
];
const RAMP_MAX = 100;

function useMountOn(delay = 250) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return on;
}

function RampCurve({ height = 320 }: { height?: number }) {
  const on = useMountOn(250);
  const W = 760;
  const H = height;
  const padL = 16;
  const padR = 16;
  const padT = 30;
  const padB = 44;
  const x = (d: number) => padL + (d / 90) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / RAMP_MAX) * (H - padT - padB);
  const pts = RAMP_POINTS.map((p) => ({ ...p, cx: x(p.d), cy: y(p.v) }));
  const linePath = pts.map((p, i) => `${i ? "L" : "M"}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].cx.toFixed(1)},${(H - padB).toFixed(1)} L${pts[0].cx.toFixed(1)},${(H - padB).toFixed(1)} Z`;
  const gridY = [0, 50, 100];

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "24px 24px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: "rgba(0,0,0,0.5)" }}>JAK PŘÍNOS NASKAKUJE · PRVNÍCH 90 DNÍ</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: BARBER_DEEP, fontWeight: 600 }}>ilustrativní</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="rampFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BARBER} stopOpacity="0.28" />
            <stop offset="100%" stopColor={BARBER} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect x={x(0)} y={padT} width={x(30) - x(0)} height={H - padT - padB} fill="rgba(0,0,0,0.03)" />
        <text x={x(15)} y={padT + 16} textAnchor="middle" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1, fill: "rgba(0,0,0,0.38)" }}>ZAHŘÍVÁNÍ</text>
        {gridY.map((gv) => (
          <g key={gv}>
            <line x1={padL} y1={y(gv)} x2={W - padR} y2={y(gv)} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            <text x={W - padR} y={y(gv) - 5} textAnchor="end" style={{ fontFamily: MONO, fontSize: 9.5, fill: "rgba(0,0,0,0.32)" }}>{gv}%</text>
          </g>
        ))}
        <path d={areaPath} fill="url(#rampFill)" style={{ opacity: on ? 1 : 0, transition: "opacity 0.9s ease 0.3s" }} />
        <path d={linePath} fill="none" stroke={BARBER} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 620, strokeDashoffset: on ? 0 : 620, transition: "stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)" }} />
        {pts.map((p, i) =>
          i === 0 ? null : (
            <g key={p.d} style={{ opacity: on ? 1 : 0, transition: `opacity 0.4s ease ${0.7 + i * 0.18}s` }}>
              <line x1={p.cx} y1={p.cy} x2={p.cx} y2={H - padB} stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={p.cx} cy={p.cy} r="6" fill="#fff" stroke={BARBER} strokeWidth="3" />
            </g>
          )
        )}
        {RAMP_POINTS.map((p) => (
          <text key={p.d} x={x(p.d)} y={H - padB + 20} textAnchor={p.d === 0 ? "start" : p.d === 90 ? "end" : "middle"} style={{ fontFamily: MONO, fontSize: 11, fill: "rgba(0,0,0,0.5)", fontWeight: 600 }}>{p.d === 0 ? "den 0" : `${p.d} dní`}</text>
        ))}
      </svg>
    </div>
  );
}

/* ── data ── */
const MNB_INPUT = [
  { v: "3 pobočky", k: "v Praze", s: "zaběhnutý barbershop" },
  { v: "Stálá", k: "klientela", s: "chodí pravidelně" },
  { v: "Spící", k: "část databáze", s: "přestala chodit" },
  { v: "Prázdná", k: "okna v týdnu", s: "nikdo je nezaplnil" },
];
const MNB_CAMPAIGNS = [
  { n: "01", kind: "rytmus", title: "Rytmus střihu", desc: "Připomínka v ideálním intervalu 4–6 týdnů, pro každého klienta zvlášť." },
  { n: "02", kind: "reaktivace", title: "Reaktivace spících", desc: "Klienty bez návštěvy 90+ dní jsme osobně pozvali zpět." },
  { n: "03", kind: "okna", title: "Naplnění volných oken", desc: "Prázdná odpoledne jsme nabídli relevantním klientům." },
  { n: "04", kind: "zruseni", title: "Zrušení → čekající", desc: "Uvolněný termín jsme hned nabídli dalším v pořadí." },
  { n: "05", kind: "recenze", title: "Recenze po návštěvě", desc: "Spokojení na Google, nespokojení rovnou k majiteli." },
  { n: "06", kind: "perbarber", title: "Ke svému holiči", desc: "Zpráva jménem holiče, ke kterému klient reálně chodí." },
];
const MNB_HEROSTATS = [
  { v: "přes 300", k: "rezervací navíc" },
  { v: "~180 000 Kč", k: "odhad přínosu" },
  { v: "2,1 %", k: "míra prokliku" },
];
const MNB_RAMP_CARDS = [
  { d: "30 dní", v: "Zahřívání", note: "Rozjíždí se odesílání a ladí se, komu psát." },
  { d: "60 dní", v: "Rozjezd", note: "Připomínky a reaktivace začínají vracet klienty." },
  { d: "90 dní", v: "Plný efekt", note: "Kadence běží napříč celou databází." },
];
const MNB_RESULT_META = [
  { v: "6 kampaní", k: "v provozu" },
  { v: "2,1 %", k: "míra prokliku" },
  { v: "~3,5 měsíce", k: "spolupráce (od pol. března 2026)" },
];
const MNB_NOTE = [
  "Klienty, co by přišli tak jako tak, nepočítáme.",
  "Je to odhad přínosu kampaně, ne izolovaný efekt jednoho kanálu. Pro MNB běží souběžně i reklama a landing pages.",
  "Číslo vidíme přímo v reálném přehledu klienta. Není to hrubý odhad.",
];
const MNB_COUNT = [
  "Rezervace, které proběhly po kampani. Vidíte je v reálném přehledu klienta.",
  "Přínos v Kč = rezervace navíc × běžná útrata za návštěvu.",
  "Náběh v čase: sledujeme křivku, ne jeden dobrý týden.",
];
const MNB_NOCOUNT = [
  "Klienty, co by přišli tak jako tak. Základní kadenci odečítáme.",
  "Nesčítáme efekt e-mailu s reklamou a landing pages, které běží souběžně.",
  "SMS (naostro se neposílá) ani recenze (výsledek se netrackuje) do čísla nedáváme.",
];
const MNB_QA = [
  { q: "Kolik rezervací navíc e-maily přinesly?", a: "Přehled MNB k 7. 7. 2026 ukazuje přes 300 rezervací navíc po našich kampaních, v přepočtu přibližně 180 000 Kč odhadovaného přínosu. Bereme to z reálného přehledu klienta.", link: null as null | { href: string; label: string } },
  { q: "Jak dlouho trvá, než se výsledek projeví?", a: "Náběh je vidět po ~30 dnech, plný efekt nastupuje mezi 60. a 90. dnem. První měsíc je zahřívání.", link: null },
  { q: "Kolik to stojí?", a: "Nasazení od 15 000 Kč, měsíční provoz podle velikosti databáze. Přesně po exportu.", link: { href: "/#faq", label: "Podrobnosti v FAQ →" } },
  { q: "Pro koho to funguje?", a: "Pro barbershopy se zaběhnutou databází (stovky klientů a více) a rezervačním systémem. U MNB to byl Reservanto a SmartEmailing.", link: null },
];

function MnbByline() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontFamily: MONO, fontSize: 11.5, letterSpacing: 0.5, color: "rgba(0,0,0,0.5)" }}>
      <span style={{ color: BARBER, fontWeight: 600 }}>PŘÍPADOVKA</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>MNB Barbershop, Praha</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>Reservanto + SmartEmailing</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>napsal BoostMail</span>
    </div>
  );
}
function HeroStatRow() {
  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      {MNB_HEROSTATS.map((s) => (
        <div key={s.k}>
          <div style={{ fontSize: 34, fontWeight: 700, color: BARBER_DEEP, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
          <div style={{ fontSize: 12.5, color: "rgba(0,0,0,0.55)", marginTop: 6, fontFamily: MONO, letterSpacing: 0.3 }}>{s.k}</div>
        </div>
      ))}
    </div>
  );
}
function MnbNoteBox() {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: "20px 24px", maxWidth: 720 }}>
      <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.5, color: "#e7b787", fontWeight: 600, marginBottom: 12 }}>POCTIVĚ, ABY TO SEDĚLO</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MNB_NOTE.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>
            <span style={{ color: BARBER, flexShrink: 0, marginTop: 1 }}>—</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PripadovkaMnb() {
  return (
    <div style={{ background: "#f4f4f4", color: INK, minHeight: "100vh", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>
      <style>{`
        @media (max-width: 960px) {
          .m-hero-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .m-hero-photo { height: 300px !important; }
          .m-sit-a, .m-nabeh-a { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 860px) {
          .m-camp-grid { grid-template-columns: 1fr !important; }
          .m-res-a { gap: 32px !important; }
          .bm-grid-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .m-res-a > div:first-child > div:first-child { font-size: 108px !important; }
          .m-res-a > div:nth-child(2) > div:first-child { font-size: 64px !important; }
        }
        @media (max-width: 520px) {
          .m-res-a > div:first-child > div:first-child { font-size: 84px !important; }
          .m-res-a > div:nth-child(2) > div:first-child { font-size: 48px !important; }
        }
        @media (max-width: 640px) { section { padding-left: 20px !important; padding-right: 20px !important; } }
      `}</style>

      <SiteNav subpage />

      {/* 01 · HERO */}
      <section style={{ padding: "48px 56px 52px" }}>
        <div className="m-hero-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 52, alignItems: "center" }}>
          <div>
            <MnbByline />
            <h1 style={{ fontSize: 66, lineHeight: 0.98, fontWeight: 700, margin: "18px 0 20px", letterSpacing: "-0.035em" }}>
              Přes 300 rezervací navíc a přibližně <em style={{ fontWeight: 400, fontStyle: "italic", color: BARBER }}>180 000 Kč</em> z e-mailů.
            </h1>
            <div style={{ fontSize: 17.5, lineHeight: 1.5, color: "rgba(0,0,0,0.7)", maxWidth: 540, marginBottom: 28 }}>
              MNB Barbershop: tři pobočky v Praze se zaběhnutou klientelou. S námi jede od druhé poloviny března 2026. Jejich přehled k 7. 7. 2026 ukazuje přes 300 rezervací navíc, které přišly po našich kampaních. Bereme to přímo z jejich přehledu, ne z odhadu na koleni.
            </div>
            <HeroStatRow />
          </div>
          <BarberPhoto className="m-hero-photo" src={MNB_PHOTO} label="FOTO · MNB PROVOZOVNA" hint="reálný interiér, barbeři + klienti" radius={24} style={{ width: "100%", height: 460 }} />
        </div>
      </section>

      {/* 02 · VÝCHOZÍ SITUACE */}
      <section style={{ padding: "56px 56px" }}>
        <div style={wrap}>
          <BarberLabel n="02" text="VÝCHOZÍ SITUACE" />
          <h2 style={{ fontSize: 44, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 820 }}>Databáze, která spala.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.62)", marginBottom: 30, maxWidth: 660, lineHeight: 1.55 }}>Ke střihu se chodí pravidelně. Jenže spousta klientů MNB přestala. Neodešli naštvaní, jen se nikdo neozval ve chvíli, kdy fade zarostl. A okna uprostřed týdne zela prázdnotou.</div>
          <div className="m-sit-a" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>
            <BarberPhoto src={MNB_PHOTO} label="FOTO · MNB PROVOZOVNA" hint="interiér, prázdná křesla uprostřed týdne" radius={18} style={{ width: "100%", minHeight: 300 }} objectPosition="center 40%" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {MNB_INPUT.map((s) => (
                <div key={s.k} style={{ background: BARBER_SOFT, border: `1px solid ${BARBER}2a`, borderRadius: 14, padding: "22px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 34, fontWeight: 700, color: BARBER_DEEP, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, margin: "8px 0 2px" }}>{s.k}</div>
                  <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 · CO JSME NASADILI */}
      <section style={{ padding: "20px 56px 56px" }}>
        <div style={wrap}>
          <BarberLabel n="03" text="CO JSME NASADILI" />
          <h2 style={{ fontSize: 44, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Šest kampaní, žádné slevové letáky.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.62)", marginBottom: 30, maxWidth: 660, lineHeight: 1.55 }}>Každá zpráva má jasný spouštěč v rezervačním systému. Kontextově, mužským rodem, jménem barbera.</div>
          <div className="m-camp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {MNB_CAMPAIGNS.map((c) => (
              <div key={c.n} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: `${BARBER}14`, color: BARBER, display: "flex", alignItems: "center", justifyContent: "center" }}><BarberCapMark kind={c.kind} /></span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(0,0,0,0.3)", fontWeight: 600 }}>[{c.n}]</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{c.title}</h3>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(0,0,0,0.62)" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · NÁBĚH V ČASE */}
      <section style={{ padding: "20px 56px 60px" }}>
        <div style={wrap}>
          <BarberLabel n="04" text="NÁBĚH V ČASE" />
          <h2 style={{ fontSize: 44, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>První měsíc je zahřívání. Pak to jede.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.62)", marginBottom: 30, maxWidth: 680, lineHeight: 1.55 }}>Nejde to zapnout jako spínač. Prvních 30 dní se odesílání rozjíždí, přínos se láme mezi 60. a 90. dnem. Proto se díváme na náběh, ne na první týden. (Křivka ukazuje typický tvar náběhu, ne konkrétní čísla klienta.)</div>
          <div className="m-nabeh-a" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "stretch" }}>
            <RampCurve height={320} />
            <div style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: 14 }}>
              {MNB_RAMP_CARDS.map((c) => (
                <div key={c.d} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "18px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: BARBER, fontWeight: 700 }}>{c.d}</span>
                    <span style={{ fontSize: 24, fontWeight: 700, color: BARBER_DEEP, letterSpacing: "-0.02em" }}>{c.v}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "rgba(0,0,0,0.6)", marginTop: 6, lineHeight: 1.45 }}>{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 · VÝSLEDEK */}
      <section style={{ padding: "80px 56px", background: "#0a0a0a", color: "#fff" }}>
        <div style={wrap}>
          <BarberLabel n="05" text="VÝSLEDEK" dark />
          <div className="m-res-a" style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-end", margin: "24px 0 30px" }}>
            <div>
              <div style={{ fontSize: 160, fontWeight: 700, color: BARBER, letterSpacing: "-0.05em", lineHeight: 0.82 }}>300+</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 10, fontFamily: MONO, letterSpacing: 0.5 }}>REZERVACÍ NAVÍC</div>
            </div>
            <div>
              <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.85 }}>~180 000 <span style={{ fontSize: 44, color: "rgba(255,255,255,0.6)" }}>Kč</span></div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 10, fontFamily: MONO, letterSpacing: 0.5 }}>ODHAD PŘÍNOSU</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 30 }}>
            {MNB_RESULT_META.map((m) => (
              <div key={m.k}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{m.v}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", marginTop: 4, fontFamily: MONO }}>{m.k}</div>
              </div>
            ))}
          </div>
          <MnbNoteBox />
        </div>
      </section>

      {/* 06 · JAK TO POČÍTÁME */}
      <section style={{ padding: "64px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <BarberLabel n="06" text="JAK TO POČÍTÁME" />
          <h2 style={{ fontSize: 42, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Co počítáme a co ne.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.62)", marginBottom: 30, maxWidth: 680, lineHeight: 1.55 }}>Případovka stojí a padá s metodikou. Proto ji píšeme na rovinu. Ať si číslo umíte přepočítat sami.</div>
          <div className="bm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "28px 30px" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: BARBER_DEEP, fontWeight: 600, marginBottom: 18 }}>CO POČÍTÁME</div>
              {MNB_COUNT.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderTop: i ? "1px solid rgba(0,0,0,0.06)" : "none", fontSize: 14.5, lineHeight: 1.5, color: "rgba(0,0,0,0.72)" }}>
                  <span style={{ color: BARBER, flexShrink: 0, fontWeight: 700, marginTop: -1 }}>+</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "28px 30px" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: "rgba(0,0,0,0.45)", fontWeight: 600, marginBottom: 18 }}>CO NEPOČÍTÁME</div>
              {MNB_NOCOUNT.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderTop: i ? "1px solid rgba(0,0,0,0.06)" : "none", fontSize: 14.5, lineHeight: 1.5, color: "rgba(0,0,0,0.72)" }}>
                  <span style={{ color: "rgba(0,0,0,0.3)", flexShrink: 0, fontWeight: 700, marginTop: -1 }}>−</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 · CITOVATELNÁ FAKTA (AEO) */}
      <section style={{ padding: "64px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <BarberLabel n="07" text="CITOVATELNÁ FAKTA" />
          <h2 style={{ fontSize: 42, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Nejčastější otázky, rovnou zodpovězené.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.62)", marginBottom: 30, maxWidth: 660, lineHeight: 1.55 }}>Klíčová čísla případovky ve strukturované podobě, pro vás i pro vyhledávače.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {MNB_QA.map((item, i) => (
              <div key={i} style={{ background: BARBER_SOFT, border: `1px solid ${BARBER}2a`, borderRadius: 16, padding: "24px 28px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontFamily: MONO, fontSize: 13, color: BARBER, fontWeight: 700, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>{item.q}</h3>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(0,0,0,0.72)", paddingLeft: 25 }}>
                  {item.a}
                  {item.link && (
                    <>
                      {" "}
                      <Link href={item.link.href} style={{ color: BARBER_DEEP, fontWeight: 600, textDecoration: "none" }}>{item.link.label}</Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · CTA */}
      <section style={{ padding: "90px 56px", background: "#0a0a0a", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontSize: 54, fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Pošlete export, spočítáme kolik vám <em style={{ fontWeight: 400, color: BARBER }}>utíká.</em></h2>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 30, lineHeight: 1.5 }}>Stejný postup jako u MNB. Vezmeme váš export, spočítáme odhad přínosu na vašich datech a řekneme rovnou, jestli to dává smysl.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#final-demo" style={{ display: "inline-block", padding: "16px 28px", background: BARBER, color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Spočítat z mého exportu →</Link>
            <Link href="/reseni-barber" style={{ display: "inline-block", padding: "16px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Řešení pro barbershopy</Link>
          </div>
        </div>
      </section>

      <div aria-hidden style={{ height: 128, background: "#f4f4f4", backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.09) 1px, transparent 0)", backgroundSize: "22px 22px" }} />

      <SiteFooter />
    </div>
  );
}
