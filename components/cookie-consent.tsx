"use client";

import { useEffect, useState } from "react";
import { loadConsentedScripts } from "@/lib/analytics";

const KEY = "bm-consent";

type Gtag = (...args: unknown[]) => void;

function setConsent(granted: boolean) {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  g?.("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
}

export function ConsentReopenButton({ style }: { style?: React.CSSProperties }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("bm-open-consent"))}
      style={{ background: "none", border: "none", padding: 0, color: "#1a5ada", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 16, ...style }}
    >
      Nastavení cookies
    </button>
  );
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    // Opt-out: analytika běží ve výchozím stavu. Clarity načteme, pokud návštěvník měření nevypnul.
    if (v !== "denied") loadConsentedScripts();
    if (v === null) setShow(true);
    const open = () => setShow(true);
    window.addEventListener("bm-open-consent", open);
    return () => window.removeEventListener("bm-open-consent", open);
  }, []);

  if (!show) return null;

  const accept = () => { localStorage.setItem(KEY, "granted"); setConsent(true); loadConsentedScripts(); setShow(false); };
  const reject = () => { localStorage.setItem(KEY, "denied"); setConsent(false); setShow(false); };

  const btn = (bg: string, color: string, border: string): React.CSSProperties => ({
    padding: "11px 20px", borderRadius: 999, fontSize: 14, fontWeight: 700,
    background: bg, color, border, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
  });

  return (
    <div role="dialog" aria-label="Nastavení cookies" style={{
      position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 100,
      maxWidth: 720, margin: "0 auto",
      background: "#0a0a0a", color: "rgba(255,255,255,0.85)",
      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16,
      boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
      padding: "18px 20px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
    }}>
      <div style={{ fontSize: 13.5, lineHeight: 1.55, flex: 1, minWidth: 240 }}>
        Web používá nezbytné cookies a ve výchozím stavu i analytické (Google Analytics, Microsoft Clarity), abychom ho vylepšovali. Měření můžete vypnout. Detail v{" "}
        <a href="/cookies" style={{ color: "#7aa2f0", textDecoration: "underline" }}>zásadách cookies</a>.
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={reject} style={btn("transparent", "rgba(255,255,255,0.85)", "1px solid rgba(255,255,255,0.25)")}>Vypnout měření</button>
        <button onClick={accept} style={btn("#1a5ada", "#fff", "none")}>Souhlasím</button>
      </div>
    </div>
  );
}
