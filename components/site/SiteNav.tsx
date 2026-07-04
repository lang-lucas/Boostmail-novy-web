"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { HP, HP_CTA, HP_SEG, CONTACT } from "@/lib/hp-data";

const TOP_LINKS: [string, string][] = [
  ["Pro koho", "pro-koho"], ["Důkaz", "dukaz"], ["Jak to funguje", "jak"], ["Mentor", "mentor"], ["FAQ", "faq"],
];

const ctaStyle: CSSProperties = {
  padding: "11px 20px", fontSize: 13, fontWeight: 700, background: HP.accent, color: "#fff",
  border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
  display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", textDecoration: "none",
};

/**
 * Shared site header. On the homepage (default) nav links scroll to sections and the
 * CTA opens the contact module in place. On sub-pages (`subpage`) links navigate to the
 * homepage anchor (/#id) and the CTA links to /#final-demo.
 */
export function SiteNav({ subpage = false }: { subpage?: boolean }) {
  const [open, setOpen] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (id: string) => {
    if (subpage) { window.location.href = `/#${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const openContact = () => window.dispatchEvent(new CustomEvent("bm-open-contact", { detail: { tab: "form" } }));

  const ctaInner = (
    <>
      <span className="hp-nav-cta-full">{HP_CTA}</span>
      <span className="hp-nav-cta-short">Poptávka</span>
      <span aria-hidden className="hp-arr">→</span>
    </>
  );

  return (
    <nav style={{ padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <Link href="/" aria-label="BoostMail" style={{ display: "block" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 30, width: "auto", display: "block" }} />
      </Link>
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
                        {s.detail && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: HP.accentSoft, color: HP.accent, borderRadius: 999, fontWeight: 700 }}>DETAIL</span>}
                        {s.soon && <span style={{ fontSize: 9, fontFamily: HP.mono, letterSpacing: 0.8, padding: "2px 6px", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)", borderRadius: 999, fontWeight: 700 }}>BRZY</span>}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", display: "block" }}>{s.promise}</span>
                    </span>
                  </>
                );
                const st: CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 10, color: s.soon ? "rgba(0,0,0,0.5)" : "#0a0a0a", cursor: s.soon ? "default" : "pointer", textDecoration: "none" };
                return s.detail
                  ? <Link key={s.id} href={s.detail} style={st}>{inner}</Link>
                  : <div key={s.id} onClick={() => !s.soon && go("pro-koho")} style={st}>{inner}</div>;
              })}
            </div>
          )}
        </div>
        {TOP_LINKS.map(([l, id]) => (
          <span key={id} onClick={() => go(id)} style={{ color: "rgba(255,255,255,0.82)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href={`tel:${CONTACT.phoneHref}`} aria-label="Zavolat" className="hp-link-u" style={{ fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}>Zavolat</a>
        {subpage
          ? <Link href="/#final-demo" className="hp-cta hp-nav-cta" style={ctaStyle}>{ctaInner}</Link>
          : <button onClick={openContact} className="hp-cta hp-nav-cta" style={ctaStyle}>{ctaInner}</button>}
      </div>
    </nav>
  );
}
