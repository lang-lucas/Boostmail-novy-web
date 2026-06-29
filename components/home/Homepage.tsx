"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { ContactBooking } from "@/components/home/ContactBooking";
import {
  HP, HP_CTA, HP_CTA_LONG, HP_CTA_CALL, HP_CTA_SUB, HERO, HP_TRIAD, HP_SEG, HP_PROOF, HP_HONEST, HP_EXPECT,
  HP_INTEGRATIONS, HP_STEPS, HP_MENTOR, HP_FAQ, HP_FOUNDERS, HP_DEMO_GET, HP_FOOTER_NAV, HP_LEGAL, CONTACT,
} from "@/lib/hp-data";

const fmtCZK = (n: number) =>
  Math.round(n).toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
const fmtNum = (n: number) => Math.round(n).toLocaleString("cs-CZ").replace(/ /g, " ");

const scrollToDemo = () => {
  window.dispatchEvent(new CustomEvent("bm-open-contact", { detail: { tab: "form" } }));
};
const scrollToContact = () => {
  window.dispatchEvent(new CustomEvent("bm-open-contact", { detail: { tab: "cal" } }));
};

// Statické číslo (v SSR HTML kvůli AEO; žádný count-up od nuly).
function Count({ to, format }: { to: number; format?: (n: number) => string }) {
  return <span>{format ? format(to) : fmtNum(to)}</span>;
}

// ── atoms ──
function Mono({ n, text, center, dark }: { n: string; text: string; center?: boolean; dark?: boolean }) {
  return (
    <div style={{ fontSize: 11, fontFamily: HP.mono, letterSpacing: 2, fontWeight: 500, color: HP.accent, textAlign: center ? "center" : "left", textTransform: "uppercase" }}>
      [{n}]<span style={{ color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}> — {text}</span>
    </div>
  );
}
function DotGrid({ dark, opacity }: { dark?: boolean; opacity?: number }) {
  const o = opacity ?? (dark ? 0.14 : 0.06);
  return <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `radial-gradient(circle at 1px 1px, ${dark ? `rgba(255,255,255,${o})` : `rgba(0,0,0,${o})`} 1px, transparent 0)`, backgroundSize: "22px 22px" }} />;
}
function CTA({ children = HP_CTA, big, onClick, style = {} }: { children?: React.ReactNode; big?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="hp-cta" style={{ padding: big ? "18px 30px" : "14px 24px", fontSize: big ? 17 : 15, fontWeight: 700, background: HP.accent, color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 10px 28px -10px rgba(26,90,218,0.6)", display: "inline-flex", alignItems: "center", gap: 10, ...style }}>
      {children} <span aria-hidden className="hp-arr">→</span>
    </button>
  );
}
function CTAGhost({ children, big, onClick }: { children: React.ReactNode; big?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="hp-cta" style={{ padding: big ? "18px 28px" : "13px 22px", fontSize: big ? 17 : 15, fontWeight: 700, background: "transparent", color: HP.ink, border: `1.5px solid ${HP.line}`, borderRadius: 999, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8 }}>
      {children}
    </button>
  );
}
function IntegrationRow({ label = "NAPOJÍME SE NA" }: { label?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
      <span style={{ fontFamily: HP.mono, fontSize: 11, letterSpacing: 1.5, color: "rgba(0,0,0,0.4)", fontWeight: 600 }}>{label}</span>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {HP_INTEGRATIONS.map((i) => (
          <span key={i} className="hp-chip" style={{ fontSize: 13, fontWeight: 600, padding: "6px 12px", borderRadius: 8, background: "#fff", border: `1px solid ${HP.line}`, color: "rgba(0,0,0,0.7)" }}>{i}</span>
        ))}
      </div>
    </div>
  );
}

// ── NAV ──
function Nav() {
  const [open, setOpen] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const links: [string, string][] = [["Pro koho", "pro-koho"], ["Důkaz", "dukaz"], ["Jak to funguje", "jak"], ["Mentor", "mentor"], ["FAQ", "faq"]];
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30, background: "rgba(244,244,244,0.82)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/boostmail-logo-black.png" alt="BoostMail" style={{ height: 30, width: "auto", display: "block" }} />
      <div className="hp-nav-links" style={{ display: "flex", gap: 26, fontSize: 14, fontWeight: 500, alignItems: "center" }}>
        <div onMouseEnter={() => { if (t.current) clearTimeout(t.current); setOpen(true); }} onMouseLeave={() => { t.current = setTimeout(() => setOpen(false), 130); }} style={{ position: "relative" }}>
          <span onClick={() => go("pro-koho")} style={{ color: "#0a0a0a", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
            Řešení <span style={{ fontSize: 8, transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
          </span>
          {open && (
            <div style={{ position: "absolute", top: "calc(100% + 12px)", left: -16, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.25)", padding: 8, minWidth: 300, animation: "hpFade .18s ease-out" }}>
              {HP_SEG.map((s) => (
                <div key={s.id} onClick={() => !s.soon && go("pro-koho")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 10, color: s.soon ? "rgba(0,0,0,0.5)" : "#0a0a0a", cursor: s.soon ? "default" : "pointer" }}>
                  <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                      {s.label}
                      {s.soon && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)", borderRadius: 999, fontWeight: 700 }}>BRZY</span>}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", display: "block" }}>{s.promise}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {links.map(([l, id]) => (
          <span key={id} onClick={() => go(id)} style={{ color: "#0a0a0a", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href={`tel:${CONTACT.phoneHref}`} aria-label="Zavolat" className="hp-link-u" style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", textDecoration: "none", whiteSpace: "nowrap" }}>Zavolat</a>
        <button onClick={scrollToDemo} className="hp-cta hp-nav-cta" style={{ padding: "11px 20px", fontSize: 13, fontWeight: 700, background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
          <span className="hp-nav-cta-full">{HP_CTA}</span>
          <span className="hp-nav-cta-short">Poptávka</span>
          <span aria-hidden className="hp-arr">→</span>
        </button>
      </div>
    </nav>
  );
}

// ── EMAIL preview ──
function EmailPreview({ seg }: { seg: string }) {
  const isBarber = seg === "barber";
  const from = isBarber ? "BARBERSHOP NEXTLEVEL" : "STUDIO · KOSMETIKA";
  const subject = isBarber ? "Pavle, je čas na další fade 💈" : "Je čas na další ošetření ✨";
  const pre = isBarber ? "Stejný střih, váš obvyklý termín. Rezervace na jeden klik." : "Vaše péče má svůj cyklus, máme pro vás termín.";
  const slot = isBarber ? "Pátek 18:30 · Miroslav" : "Čtvrtek 16:00 · Tereza";
  return (
    <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 16, boxShadow: "0 24px 60px -20px rgba(26,90,218,0.28), 0 8px 20px rgba(0,0,0,0.06)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "13px 18px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c941" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(0,0,0,0.45)", fontFamily: HP.mono }}>inbox · zákazník@email.cz</span>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: HP.accent, letterSpacing: 1, marginBottom: 6, fontFamily: HP.mono }}>{from}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", marginBottom: 4, lineHeight: 1.25 }}>{subject}</div>
        <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", marginBottom: 18 }}>{pre}</div>
        <div style={{ background: HP.soft, padding: 14, borderRadius: 10, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>
            <span style={{ display: "block", color: "rgba(0,0,0,0.5)", fontSize: 11, marginBottom: 2 }}>Doporučený termín</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{slot}</span>
          </span>
          <span style={{ fontSize: 26 }}>{isBarber ? "💈" : "💅"}</span>
        </div>
        <div className="hp-cta" style={{ width: "100%", padding: "12px 16px", background: HP.accent, color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 700, textAlign: "center", cursor: "pointer" }}>Rezervovat 1 klikem <span className="hp-arr">→</span></div>
      </div>
    </div>
  );
}

// ── MENTOR feed ──
function MentorFeed() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % HP_MENTOR.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ background: "#11151e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 70px -30px rgba(0,0,0,0.7)" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "hpBlink 1.4s infinite", boxShadow: "0 0 8px #10b981" }} />
          <span style={{ fontFamily: HP.mono, fontSize: 12, letterSpacing: 1.5, color: "#fff", fontWeight: 600 }}>BOOSTMAIL · MENTOR</span>
        </div>
        <span style={{ fontFamily: HP.mono, fontSize: 11, color: "rgba(255,255,255,0.62)" }}>z vašich dat</span>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        {HP_MENTOR.map((m, i) => {
          const on = i === active;
          return (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px 18px", border: `1px solid ${on ? HP.accent : "rgba(255,255,255,0.07)"}`, boxShadow: on ? "0 0 0 3px rgba(26,90,218,0.25)" : "none", transition: "all .4s", opacity: on ? 1 : 0.78 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: HP.mono, fontSize: 10, letterSpacing: 1, fontWeight: 700, color: HP.accent, padding: "3px 8px", borderRadius: 999, background: "rgba(26,90,218,0.18)" }}>{m.tag}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>↑ {m.gain}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>📊</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}>{m.from}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: HP.accent, fontWeight: 800, fontSize: 15 }}>→</span>
                <span style={{ fontSize: 14.5, color: "#fff", lineHeight: 1.5, fontWeight: 600 }}>{m.rec}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MINI CALC ──
function MiniCalc() {
  const [db, setDb] = useState(1500);
  const [aov, setAov] = useState(600);
  // Data: ~9–12 rezervací / 1000 kontaktů měsíčně. Kalkulačka počítá ZÁMĚRNĚ pod tímhle
  // rozpětím (7,2/1000 = 9/1000 − 20 %), ať číslo spíš překvapí nahoru. Medián útraty ~600 Kč.
  const RATE = 7.2 / 1000;
  const monthly = db * RATE * aov;
  const yearly = monthly * 12;
  const slider = (label: string, val: number, set: (n: number) => void, min: number, max: number, step: number, fmt: (v: number) => string) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.62)" }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: HP.mono, fontWeight: 600, color: "#fff" }}>{fmt(val)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(+e.target.value)} style={{ width: "100%", accentColor: HP.accent }} />
    </div>
  );
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 22 }}>
      <div style={{ fontFamily: HP.mono, fontSize: 11, letterSpacing: 1.5, color: HP.accent, marginBottom: 4, fontWeight: 600 }}>KALKULAČKA · POTENCIÁL DATABÁZE</div>
      <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em" }}>Kolik z vaší databáze umíme vrátit</div>
      {slider("Zákazníků v databázi", db, setDb, 200, 6000, 100, (v) => fmtNum(v) + " lidí")}
      {slider("Průměrná útrata za návštěvu", aov, setAov, 200, 2000, 50, fmtCZK)}
      <div className="hp-calc-out" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 16, background: "rgba(26,90,218,0.15)", borderRadius: 12, border: "1px solid rgba(26,90,218,0.2)" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.62)", marginBottom: 4 }}>MĚSÍČNĚ · PO NÁBĚHU</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#7aa2f0", fontFamily: HP.mono }}>od {fmtCZK(monthly)}</div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.62)", marginBottom: 4 }}>ROČNĚ · PO NÁBĚHU</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#7aa2f0", fontFamily: HP.mono }}>od {fmtCZK(yearly)}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>Orientační odhad, ne závazek. Naše provozovny (barbershopy a kosmetika) dělají ~9–12 rezervací na 1000 kontaktů měsíčně po náběhu (medián útraty ~600 Kč); kalkulačka počítá záměrně pod tím, ať spíš překvapí nahoru. U jiných oborů se liší podle frekvence návštěv. Přesně spočítáme z vašeho exportu.</div>
    </div>
  );
}

// ── FAQ ──
function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {HP_FAQ.map((f, i) => {
        const on = open === i;
        return (
          <div key={i} className="hp-faq-item" onClick={() => setOpen(on ? -1 : i)} style={{ background: "#fff", border: `1px solid ${on ? "rgba(26,90,218,0.33)" : HP.line}`, borderRadius: 14, padding: "18px 22px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>{f.q}</span>
              <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: "50%", background: on ? HP.accent : HP.soft, color: on ? "#fff" : HP.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, transition: "all .2s", transform: on ? "rotate(45deg)" : "none" }}>+</span>
            </div>
            {on && <div style={{ fontSize: 15, color: "rgba(0,0,0,0.62)", lineHeight: 1.6, marginTop: 12, maxWidth: 640 }}>{f.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ── PAGE ──
export default function Homepage() {
  const [seg, setSeg] = useState("barber");
  const S = HP_SEG.find((x) => x.id === seg)!;
  const wrapA = { maxWidth: 1320, margin: "0 auto", width: "100%" } as const;
  const wrapB = { maxWidth: 1180, margin: "0 auto", width: "100%" } as const;
  const wrapC = { maxWidth: 1340, margin: "0 auto", width: "100%" } as const;
  const secLabelB = (n: string, t: string) => <div style={{ textAlign: "center", marginBottom: 40 }}><Mono n={n} text={t} center /></div>;

  return (
    <div style={{ position: "relative", background: HP.bg, color: HP.ink, minHeight: "100vh" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />

        {/* 01 — HERO */}
        <section style={{ padding: "64px 56px 56px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #eaf0fd 0%, #f4f4f4 62%)" }}>
          <div aria-hidden className="hp-hero-orbit" />
          <div style={{ ...wrapA, position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }} className="hp-hero-grid">
            <div>
              <Mono n="01" text={HERO.kicker} />
              <h1 style={{ fontSize: 78, lineHeight: 0.96, fontWeight: 700, letterSpacing: "-0.04em", margin: "22px 0 0" }}>
                {HERO.title.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
                <em style={{ fontWeight: 400, color: HP.accent, fontStyle: "normal" }}>{HERO.titleAccent}</em>
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "rgba(0,0,0,0.68)", maxWidth: 540, margin: "26px 0 30px" }}>{HERO.sub}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
                <CTA big onClick={scrollToDemo}>{HP_CTA_LONG}</CTA>
                <CTAGhost big onClick={scrollToContact}>{HP_CTA_CALL}</CTAGhost>
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(0,0,0,0.55)", marginBottom: 22 }}>Odhad zdarma a nezávazně · nebo zavolejte <a href={`tel:${CONTACT.phoneHref}`} className="hp-link-u" style={{ color: "rgba(0,0,0,0.7)", fontWeight: 600, textDecoration: "none" }}>{CONTACT.phone}</a></div>
              <IntegrationRow />
            </div>
            <div>
              <div className="hp-card hp-float" style={{ padding: "16px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: HP.accent, fontFamily: HP.mono, lineHeight: 1 }}><Count to={HERO.microProof.n} /></div>
                <div style={{ borderLeft: `1px solid ${HP.line}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{HERO.microProof.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>{HERO.microProof.sub}</div>
                </div>
              </div>
              <HeroShowcase />
            </div>
          </div>
        </section>

        {/* 01b — CO PRO VÁS DĚLÁME (triáda) */}
        <section style={{ padding: "0 56px 8px" }}>
          <div style={{ ...wrapA, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="hp-triad">
            {HP_TRIAD.map((t) => (
              <div key={t.title} className="hp-card hp-lift" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{t.title}</div>
                <div style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.45 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — PRO KOHO */}
        <section id="pro-koho" style={{ padding: "64px 48px", background: "#fff", borderTop: `1px solid ${HP.line}`, marginTop: 48 }}>
          {secLabelB("02", "Pro koho to děláme")}
          <h2 style={{ textAlign: "center", fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 36px", lineHeight: 1 }}>Vyberte svůj obor</h2>
          <div style={{ ...wrapB, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }} className="hp-seg-cards">
            {HP_SEG.map((s) => {
              const on = seg === s.id;
              return (
                <button key={s.id} onClick={() => !s.soon && setSeg(s.id)} disabled={s.soon} className={s.soon ? "" : "hp-lift"} style={{ textAlign: "left", padding: 20, borderRadius: 16, cursor: s.soon ? "default" : "pointer", fontFamily: "inherit", background: on ? HP.accent : "#fff", color: on ? "#fff" : "#0a0a0a", border: `1px solid ${on ? HP.accent : HP.line}`, opacity: s.soon ? 0.6 : 1, transition: "all .2s" }}>
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{s.emoji}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    {s.label}
                    {s.soon && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)", borderRadius: 999, fontWeight: 700 }}>BRZY</span>}
                  </div>
                  <div style={{ fontSize: 13, color: on ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.55)", marginTop: 6, lineHeight: 1.4 }}>{s.promise}</div>
                </button>
              );
            })}
          </div>
          <div style={{ ...wrapB, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", background: HP.soft, border: `1px solid ${HP.line}`, borderRadius: 20, padding: 32 }} className="hp-seg-detail">
            <div>
              <div style={{ fontSize: 13, fontFamily: HP.mono, letterSpacing: 1, color: HP.accent, marginBottom: 12 }}>{S.emoji} {S.label.toUpperCase()}</div>
              <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>{S.result}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {S.flows?.map((f) => (
                  <span key={f} className="hp-chip" style={{ fontSize: 12.5, fontWeight: 600, padding: "7px 13px", borderRadius: 999, background: "#fff", border: `1px solid ${HP.line}`, color: "rgba(0,0,0,0.7)" }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}><EmailPreview seg={seg} /></div>
          </div>
        </section>

        {/* 03 — PROBLÉM / KALKULAČKA */}
        <section style={{ padding: "72px 56px", background: HP.dark, color: "#fff", position: "relative", overflow: "hidden" }}>
          <DotGrid dark />
          <div style={{ ...wrapC, position: "relative", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 56, alignItems: "center" }} className="hp-problem-grid">
            <div>
              <Mono n="03" text="Problém" dark />
              <h2 style={{ fontSize: 70, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96, margin: "18px 0 24px" }}>Lidé, co se <em style={{ fontWeight: 400, color: "#7aa2f0", fontStyle: "normal" }}>nevrátili.</em></h2>
              <p style={{ fontSize: 19, color: "rgba(255,255,255,0.72)", lineHeight: 1.55, maxWidth: 520 }}>Prázdná okna, která do večera nikdo nezaplní. Zákazníci, co přišli jednou a zmizeli. To není smůla. To je obrat, který vám leží v databázi.</p>
            </div>
            <MiniCalc />
          </div>
        </section>

        {/* 04 — DŮKAZ */}
        <section id="dukaz" style={{ padding: "64px 56px" }}>
          <div style={wrapA}>
            <div style={{ marginBottom: 36 }}>
              <Mono n="04" text="Důkaz" />
              <h2 style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 0", lineHeight: 1 }}>Reálná čísla, ne sliby.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hp-proof-grid">
              {HP_PROOF.map((p) => (
                <div key={p.shop} className="hp-card" style={{ overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{ position: "relative", height: 150, borderRight: `1px solid ${HP.line}` }}>
                      <Image src={p.photo} alt={p.shop} fill sizes="(max-width: 1000px) 50vw, 300px" style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: 12, fontFamily: HP.mono, letterSpacing: 1, color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>{p.cat.toUpperCase()}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.shop}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${HP.line}` }}>
                    <div style={{ padding: "20px 22px", borderRight: `1px solid ${HP.line}` }}>
                      <div style={{ fontSize: 42, fontWeight: 800, color: HP.accent, fontFamily: HP.mono, lineHeight: 1 }}><Count to={p.bookings} /></div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", marginTop: 6 }}>rezervací z e-mailu</div>
                    </div>
                    <div style={{ padding: "20px 22px" }}>
                      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 6 }}><Count to={parseInt(p.revenue.replace(/\D/g, ""), 10)} format={fmtCZK} /></div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", marginTop: 8 }}>obrat {p.period}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "16px 20px", background: HP.soft, border: `1px solid ${HP.line}`, borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
              <span style={{ fontFamily: HP.mono, fontSize: 11, fontWeight: 700, color: HP.accent, letterSpacing: 1, padding: "4px 8px", background: "#fff", borderRadius: 6, border: `1px solid ${HP.line}`, whiteSpace: "nowrap" }}>POCTIVÁ NOTA</span>
              <span style={{ fontSize: 14, color: "rgba(0,0,0,0.65)", lineHeight: 1.5, flex: 1, minWidth: 240 }}>{HP_HONEST} {HP_EXPECT}</span>
            </div>
          </div>
        </section>

        {/* 05 — JAK TO FUNGUJE */}
        <section id="jak" style={{ padding: "64px 48px", background: "#fff", borderTop: `1px solid ${HP.line}` }}>
          {secLabelB("05", "Jak to funguje")}
          <h2 style={{ textAlign: "center", fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 40px", lineHeight: 1 }}>Napojíme se. Zbytek zařídíme.</h2>
          <div style={{ ...wrapB, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hp-steps">
            {HP_STEPS.map((s) => (
              <div key={s.n} className="hp-card hp-lift" style={{ padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: HP.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.emoji}</span>
                  <span style={{ fontFamily: HP.mono, fontSize: 28, fontWeight: 700, color: "rgba(0,0,0,0.1)" }}>{s.n}</span>
                </div>
                <div style={{ fontFamily: HP.mono, fontSize: 10.5, letterSpacing: 1, color: HP.accent, marginBottom: 8, fontWeight: 600 }}>{s.tag}</div>
                <h3 style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }}>{s.title}</h3>
                <div style={{ fontSize: 14.5, color: "rgba(0,0,0,0.62)", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 — MENTOR */}
        <section id="mentor" style={{ padding: "80px 56px", background: HP.dark, color: "#fff", position: "relative", overflow: "hidden" }}>
          <DotGrid dark />
          <div style={{ ...wrapC, position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="hp-mentor-grid">
            <div>
              <Mono n="06" text="Mentor vrstva" dark />
              <h2 style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.82, margin: "20px 0 0", background: "linear-gradient(180deg, #fff, #7aa2f0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="hp-mentor-word">MENTOR</h2>
              <p style={{ fontSize: 20, color: "rgba(255,255,255,0.72)", lineHeight: 1.55, maxWidth: 480, marginTop: 26 }}>Máme vaše data a vyhodnotíme je za vás. Řekneme konkrétně, <em style={{ color: "#7aa2f0", fontStyle: "italic" }}>co změnit, abyste vydělali víc.</em> Od ceny a otevírací doby po vytížení lidí. A co umíme, doladíme sami.</p>
            </div>
            <MentorFeed />
          </div>
        </section>

        {/* 07 — REVERSE DEMO */}
        <section id="final-demo" style={{ padding: "72px 48px", borderTop: `1px solid ${HP.line}` }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Mono n="07" text="Ozvěte se · nezávazně" center />
              <h2 style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 12px", lineHeight: 1 }}>Napište nám, nebo si vyberte termín</h2>
              <p style={{ fontSize: 17, color: "rgba(0,0,0,0.62)", maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>Řekněte nám pár údajů o své provozovně. Ozveme se, projdeme vaše čísla a řekneme rovnou, jestli pro vás dává smysl s námi spolupracovat. Zdarma a nezávazně.</p>
            </div>
            <div className="hp-card hp-demo-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
              <div style={{ padding: 32 }}><ContactBooking /></div>
              <div style={{ padding: 32, background: HP.soft, borderLeft: `1px solid ${HP.line}` }}>
                <div style={{ fontSize: 13, fontFamily: HP.mono, letterSpacing: 1, color: HP.accent, marginBottom: 16, fontWeight: 600 }}>CO DOSTANETE</div>
                {HP_DEMO_GET.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderTop: i > 0 ? `1px solid ${HP.line}` : "none" }}>
                    <span style={{ fontFamily: HP.mono, fontSize: 13, color: HP.accent, fontWeight: 700, paddingTop: 2 }}>0{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 3 }}>{r[0]}</div>
                      <div style={{ fontSize: 13.5, color: "rgba(0,0,0,0.6)", lineHeight: 1.45 }}>{r[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 08 — KDO ZA TÍM STOJÍ */}
        <section id="kontakt" style={{ padding: "72px 56px", background: "#fff", borderTop: `1px solid ${HP.line}` }}>
          <div style={{ ...wrapC, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hp-about-grid">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {HP_FOUNDERS.map((f) => (
                <div key={f.name}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.08", borderRadius: 16, overflow: "hidden", border: `1px solid ${HP.line}` }}>
                    <Image src={f.photo} alt={f.name} fill sizes="(max-width: 900px) 45vw, 320px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{f.name}</div>
                    <div style={{ fontSize: 12, fontFamily: HP.mono, color: HP.accent }}>{f.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Mono n="08" text="Kdo za tím stojí" />
              <h2 style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.98, margin: "16px 0 22px" }}>Zvedneme to <em style={{ fontWeight: 400, color: HP.accent, fontStyle: "normal" }}>my dva.</em></h2>
              <p style={{ fontSize: 19, color: "rgba(0,0,0,0.68)", lineHeight: 1.6, marginBottom: 18 }}>Za BoostMailem stojíme my dva. Lukáš má na starosti software a data, Vojta komunikaci s klienty. Žádné call centrum ani prostředník. Mluvíte přímo s lidmi, kteří váš účet reálně vedou.</p>
              <div style={{ fontSize: 15, fontFamily: HP.mono, color: "rgba(0,0,0,0.5)", letterSpacing: 0.5 }}>Zavolejte Vojtovi: <a href={`tel:${CONTACT.phoneHref}`} className="hp-link-u" style={{ color: HP.accent, fontWeight: 700, textDecoration: "none" }}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`} className="hp-link-u" style={{ color: "rgba(0,0,0,0.6)", textDecoration: "none" }}>{CONTACT.email}</a></div>
            </div>
          </div>
        </section>

        {/* 09 — FAQ */}
        <section id="faq" style={{ padding: "64px 48px", borderTop: `1px solid ${HP.line}` }}>
          {secLabelB("09", "FAQ")}
          <h2 style={{ textAlign: "center", fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 36px", lineHeight: 1 }}>Časté otázky</h2>
          <div style={{ maxWidth: 760, margin: "0 auto" }}><Faq /></div>
        </section>

        {/* 10 — FINÁLNÍ CTA */}
        <section style={{ padding: "100px 56px", background: HP.accent, color: "#fff", position: "relative", overflow: "hidden" }}>
          <DotGrid dark opacity={0.1} />
          <div style={{ ...wrapC, textAlign: "center", position: "relative" }}>
            <h2 style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.86, margin: "0 0 24px" }} className="hp-final-h2">Pojďme naplnit<br />váš kalendář.</h2>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.88)", marginBottom: 36, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{HP_CTA_SUB}.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={scrollToDemo} className="hp-cta" style={{ padding: "20px 36px", background: "#fff", color: HP.accent, border: "none", borderRadius: 999, fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{HP_CTA} →</button>
              <a href={`tel:${CONTACT.phoneHref}`} style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none", borderBottom: "2px solid rgba(255,255,255,0.5)", paddingBottom: 3 }}>{CONTACT.phone}</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.6)" }}>
          <div style={{ padding: "56px 48px 28px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, maxWidth: 1300, margin: "0 auto" }} className="hp-footer-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 30, marginBottom: 16 }} />
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", maxWidth: 340, marginBottom: 20 }}>Za majitele lokální provozovny děláme e-mail marketing, co vrací zákazníky a plní kalendář. Barbershopy, kosmetika a další služby, kam lidé chodí pravidelně.</p>
              <CTA onClick={scrollToDemo} style={{ padding: "12px 20px", fontSize: 14 }} />
            </div>
            {HP_FOOTER_NAV.map((col) => (
              <div key={col.label}>
                <div style={{ fontFamily: HP.mono, fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)", marginBottom: 14, fontWeight: 600 }}>{col.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map(([label, href]) => (
                    <Link key={label} href={href} style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", textDecoration: "none" }}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: HP.mono, fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)", marginBottom: 14, fontWeight: 600 }}>KONTAKT</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <a href={`mailto:${CONTACT.email}`} style={{ fontSize: 14, color: "#fff", textDecoration: "none", fontWeight: 600 }}>{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phoneHref}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", textDecoration: "none" }}>{CONTACT.phone}</a>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Lukáš Lang · IČO {CONTACT.ico} · neplátce DPH</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "18px 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, maxWidth: 1300, margin: "0 auto", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            <span>© 2026 Boostmail · Lukáš Lang · Všechna práva vyhrazena</span>
            <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {HP_LEGAL.map(([label, href]) => (
                <Link key={href} href={href} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{label}</Link>
              ))}
              <button onClick={() => window.dispatchEvent(new Event("bm-open-consent"))} style={{ background: "none", border: "none", padding: 0, color: "rgba(255,255,255,0.55)", textDecoration: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Nastavení cookies</button>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
