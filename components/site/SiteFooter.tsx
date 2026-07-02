"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { HP, HP_CTA, HP_FOOTER_NAV, HP_LEGAL, CONTACT } from "@/lib/hp-data";

const ctaStyle: CSSProperties = {
  padding: "12px 20px", fontSize: 14, fontWeight: 700, background: HP.accent, color: "#fff",
  border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
  boxShadow: "0 10px 28px -10px rgba(26,90,218,0.6)", display: "inline-flex",
  alignItems: "center", gap: 10, textDecoration: "none",
};

/**
 * Shared site footer. On the homepage, pass `onCtaClick` (scrollToDemo) so the CTA
 * opens the contact module in place. On sub-pages, omit it → CTA links to /#final-demo.
 */
export function SiteFooter({ onCtaClick }: { onCtaClick?: () => void }) {
  const ctaInner = (
    <>
      {HP_CTA} <span aria-hidden className="hp-arr">→</span>
    </>
  );

  return (
    <footer style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.6)" }}>
      <div style={{ padding: "56px 48px 28px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, maxWidth: 1300, margin: "0 auto" }} className="hp-footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 30, marginBottom: 16 }} />
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", maxWidth: 340, marginBottom: 20 }}>Za majitele lokální provozovny děláme e-mail marketing, co vrací zákazníky a plní kalendář. Barbershopy, kosmetika a další služby, kam lidé chodí pravidelně.</p>
          {onCtaClick
            ? <button onClick={onCtaClick} className="hp-cta" style={ctaStyle}>{ctaInner}</button>
            : <Link href="/#final-demo" className="hp-cta" style={ctaStyle}>{ctaInner}</Link>}
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
  );
}
