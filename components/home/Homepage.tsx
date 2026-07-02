"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { ContactBooking } from "@/components/home/ContactBooking";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  HP, HP_CTA, HP_CTA_LONG, HP_CTA_CALL, HP_CTA_SUB, HERO, HP_TRIAD, HP_SEG, HP_CASES, HP_HONEST, HP_EXPECT,
  HP_INTEGRATIONS, HP_STEPS, HP_MENTOR, HP_FAQ, HP_FOUNDERS, HP_DEMO_GET, CONTACT,
} from "@/lib/hp-data";

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
      [{n}]<span style={{ color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}> · {text}</span>
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
    <nav style={{ padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 30, width: "auto", display: "block" }} />
      <div className="hp-nav-links" style={{ display: "flex", gap: 26, fontSize: 14, fontWeight: 500, alignItems: "center" }}>
        <div onMouseEnter={() => { if (t.current) clearTimeout(t.current); setOpen(true); }} onMouseLeave={() => { t.current = setTimeout(() => setOpen(false), 130); }} style={{ position: "relative" }}>
          <span onClick={() => go("pro-koho")} style={{ color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
            Řešení <span style={{ fontSize: 8, transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
          </span>
          {open && (
            <div style={{ position: "absolute", top: "calc(100% + 12px)", left: -16, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.25)", padding: 8, minWidth: 300, animation: "hpFade .18s ease-out" }}>
              {HP_SEG.map((s) => {
                const inner = (
                  <>
                    <span style={{ fontSize: 20 }}>{s.emoji}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                        {s.label}
                        {s.id === "beauty" && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: HP.accentSoft, color: HP.accent, borderRadius: 999, fontWeight: 700 }}>DETAIL</span>}
                        {s.soon && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)", borderRadius: 999, fontWeight: 700 }}>BRZY</span>}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", display: "block" }}>{s.promise}</span>
                    </span>
                  </>
                );
                const st: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 10, color: s.soon ? "rgba(0,0,0,0.5)" : "#0a0a0a", cursor: s.soon ? "default" : "pointer", textDecoration: "none" };
                return s.id === "beauty"
                  ? <Link key={s.id} href="/reseni-kosmetika" style={st}>{inner}</Link>
                  : <div key={s.id} onClick={() => !s.soon && go("pro-koho")} style={st}>{inner}</div>;
              })}
            </div>
          )}
        </div>
        {links.map(([l, id]) => (
          <span key={id} onClick={() => go(id)} style={{ color: "rgba(255,255,255,0.82)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href={`tel:${CONTACT.phoneHref}`} aria-label="Zavolat" className="hp-link-u" style={{ fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}>Zavolat</a>
        <button onClick={scrollToDemo} className="hp-cta hp-nav-cta" style={{ padding: "11px 20px", fontSize: 13, fontWeight: 700, background: HP.accent, color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
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
  const from = isBarber ? "VÁŠ BARBERSHOP" : "STUDIO · KOSMETIKA";
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

// ── KOSMETIKA e-maily (reálné, 1:1 v rámečku telefonu) ──
const KOS_EMAILS = [
  { file: "01_pripominka_plet", tab: "Připomínka", subject: "Nedopřeješ si zase ošetření, Terezo?" },
  { file: "02_reaktivace", tab: "Reaktivace", subject: "Dlouho jsme se neviděly, Terezo" },
];
function KosmetikaEmails() {
  const [i, setI] = useState(0);
  const e = KOS_EMAILS[i];
  return (
    <div style={{ width: "100%", maxWidth: 330 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <div style={{ display: "inline-flex", padding: 4, borderRadius: 999, background: "#fff", border: `1px solid ${HP.line}` }}>
          {KOS_EMAILS.map((em, idx) => (
            <button key={em.file} onClick={() => setI(idx)} style={{ padding: "8px 16px", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: idx === i ? HP.accent : "transparent", color: idx === i ? "#fff" : HP.ink }}>{em.tab}</button>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 30, background: "#0a0a0a", padding: 9, boxShadow: "0 30px 60px -26px rgba(0,0,0,0.45)" }}>
        <div style={{ borderRadius: 22, overflow: "hidden", background: "#fff" }}>
          <div style={{ padding: "13px 16px", borderBottom: `1px solid ${HP.line}`, background: HP.soft }}>
            <div style={{ fontSize: 10.5, fontFamily: HP.mono, letterSpacing: 0.8, color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>OD · STUDIO N</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: HP.ink, lineHeight: 1.3 }}>{e.subject}</div>
          </div>
          <iframe key={e.file} src={`/emails/kosmetika/${e.file}.html`} title={e.subject} loading="lazy" style={{ width: "100%", height: 400, border: "none", display: "block", background: "#fff" }} />
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 12, lineHeight: 1.5 }}>Skutečný e-mail, který za vás pošleme. Personalizovaný, ve správný moment.</div>
    </div>
  );
}

// ── CASE STUDY CARD (marquee) ──
function CaseCard({ cs }: { cs: (typeof HP_CASES)[number] }) {
  const ph = !!cs.placeholder;
  const card = (
    <div className="hp-card hp-lift" style={{ width: "100%", height: "100%", padding: 24, whiteSpace: "normal", display: "flex", flexDirection: "column", gap: 14, boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: HP.accentSoft, color: HP.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{cs.anonymous ? "·" : "💈"}</div>
        <div style={{ fontSize: 11, fontFamily: HP.mono, color: "rgba(0,0,0,0.45)", letterSpacing: 0.8 }}>{cs.cat.toUpperCase()}</div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{cs.name}</div>
      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", lineHeight: 1.45, minHeight: 56 }}>{cs.summary}</div>
      {!ph ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderRadius: 10, background: "rgba(26,90,218,0.05)", border: "1px solid rgba(26,90,218,0.14)" }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 25, fontWeight: 800, color: HP.accent, letterSpacing: "-0.02em", lineHeight: 1, fontFamily: HP.mono }}>{cs.metric}</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginTop: 4, fontWeight: 500 }}>{cs.metricUnit}</div>
          </div>
          <svg viewBox="0 0 80 32" width="72" height="28" style={{ display: "block", flexShrink: 0 }} aria-hidden>
            <path d="M0 26 L12 24 L24 22 L36 18 L48 13 L60 9 L72 5 L80 3 L80 32 L0 32 Z" fill="rgba(26,90,218,0.12)" />
            <path d="M0 26 L12 24 L24 22 L36 18 L48 13 L60 9 L72 5 L80 3" fill="none" stroke={HP.accent} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      ) : (
        <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(0,0,0,0.03)", border: "1px dashed rgba(0,0,0,0.15)", fontSize: 12, color: "rgba(0,0,0,0.55)", fontFamily: HP.mono, letterSpacing: 0.5, textAlign: "center" }}>PŘÍPADOVKA V PŘÍPRAVĚ</div>
      )}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12 }}>
        <div style={{ fontSize: 11, fontFamily: HP.mono, color: "rgba(0,0,0,0.4)", letterSpacing: 1 }}>{ph ? "KLIENT" : "PŘÍPADOVKA"}</div>
        <div style={{ fontSize: 13, color: HP.accent, fontWeight: 600 }}>{ph ? "brzy" : "Detail →"}</div>
      </div>
    </div>
  );
  return ph ? (
    <div style={{ flexShrink: 0, width: 300 }}>{card}</div>
  ) : (
    <Link href="/pripadovky" style={{ flexShrink: 0, width: 300, display: "block", textDecoration: "none", color: "inherit" }}>{card}</Link>
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
              {seg === "beauty" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
                  {["kosmetika-1.jpg", "kosmetika-2.jpg"].map((p) => (
                    <div key={p} style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden", border: `1px solid ${HP.line}` }}>
                      <Image src={`/segments/${p}`} alt="Kosmetika" fill sizes="(max-width: 1000px) 45vw, 220px" style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
              {seg === "beauty" && (
                <Link href="/reseni-kosmetika" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, padding: "13px 22px", background: HP.accent, color: "#fff", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Celé řešení pro kosmetiku →
                </Link>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>{seg === "beauty" ? <KosmetikaEmails /> : <EmailPreview seg={seg} />}</div>
          </div>
        </section>

        {/* 03 — PROBLÉM / KALKULAČKA */}
        <section style={{ padding: "72px 56px", background: HP.dark, color: "#fff", position: "relative", overflow: "hidden" }}>
          <DotGrid dark />
          <div style={{ ...wrapB, position: "relative", textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <Mono n="03" text="Problém" dark center />
            <h2 style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.98, margin: "14px 0 22px" }}>Lidé, co se <em style={{ fontWeight: 400, color: "#7aa2f0", fontStyle: "normal" }}>nevrátili.</em></h2>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.72)", lineHeight: 1.55, maxWidth: 580, margin: "0 auto" }}>Prázdná okna, která do večera nikdo nezaplní. Zákazníci, co přišli jednou a zmizeli. To není smůla. To je obrat, který vám leží v databázi. A umíme ho vrátit.</p>
          </div>
        </section>

        {/* 04 — VÝSLEDKY (marquee případovek) */}
        <section id="dukaz" style={{ padding: "64px 0", overflow: "hidden" }}>
          <div style={{ ...wrapA, padding: "0 56px", marginBottom: 30 }} className="hp-pad">
            <Mono n="04" text="Výsledky" />
            <h2 style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 10px", lineHeight: 1 }}>Reálná čísla, ne sliby.</h2>
            <p style={{ fontSize: 16, color: "rgba(0,0,0,0.55)", maxWidth: 620, lineHeight: 1.5 }}>Z provozoven, které vedeme. Jména klientů zveřejníme s jejich souhlasem. Detailní případovky připravujeme.</p>
          </div>
          <div className="hp-marquee" style={{ display: "flex", gap: 20, whiteSpace: "nowrap", padding: "8px 0", alignItems: "stretch" }}>
            {[...HP_CASES, ...HP_CASES].map((cs, i) => <CaseCard key={i} cs={cs} />)}
          </div>
          <div style={{ ...wrapA, padding: "0 56px", marginTop: 26 }} className="hp-pad">
            <div style={{ padding: "16px 20px", background: HP.soft, border: `1px solid ${HP.line}`, borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
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
              <p style={{ fontSize: 17, color: "rgba(0,0,0,0.62)", maxWidth: 580, margin: "0 auto", lineHeight: 1.5 }}>Krátký 20minutový videohovor, kde spolu projdeme vaši situaci: jak by u vás naše řešení vypadalo v praxi, jaké už máme zkušenosti ve vašem oboru a hlavně odhad finančního přínosu. Zdarma a nezávazně.</p>
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
        <SiteFooter onCtaClick={scrollToDemo} />
      </div>
    </div>
  );
}
