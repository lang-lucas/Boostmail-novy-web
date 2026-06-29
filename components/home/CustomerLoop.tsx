import type { CSSProperties } from "react";

// BoostMail — CustomerLoop
// Animovaný hero vizuál: jeden zákazník (token) putuje přes 3 stavy
// 01 SPÍCÍ → 02 PŘIPOMÍNKA → 03 ZPÁTKY a ve smyčce se to opakuje.
// Token mění barvu (šedá → modrá → zelená), trasa za ním se rozsvěcí.
// Čistě CSS/SVG keyframes, žádné externí knihovny. Respektuje prefers-reduced-motion.

const CLP = {
  accent: "#1a5ada",
  accentSoft: "#e8eefb",
  success: "#10b981",
  successSoft: "#e6f7f0",
  ink: "#0a0a0a",
  muted: "rgba(0,0,0,0.55)",
  line: "rgba(0,0,0,0.08)",
  sleep: "#9aa0ad",
  sleepSoft: "#eef0f4",
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
  sans: "var(--font-space-grotesk), system-ui, sans-serif",
};

const CLP_STATIONS = [
  { n: "01", name: "SPÍCÍ", sub: "Naposledy před 8 týdny", x: "16.666%", icon: "moon" as const },
  { n: "02", name: "PŘIPOMÍNKA", sub: "Poslali jsme e-mail", x: "50%", icon: "mail" as const },
  { n: "03", name: "ZPÁTKY", sub: "Rezervace potvrzená", x: "83.333%", icon: "check" as const },
];

function ClpIcon({ kind }: { kind: "moon" | "mail" | "check" }) {
  if (kind === "moon") {
    return (
      <svg width={21} height={21} viewBox="0 0 24 24" aria-hidden fill="currentColor">
        <path d="M21 12.9A8.6 8.6 0 1 1 11.1 3 6.7 6.7 0 0 0 21 12.9z" />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg width={21} height={21} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3.7 7.2 L12 12.6 L20.3 7.2" />
      </svg>
    );
  }
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.7 l4.3 4.3 L19 7" />
    </svg>
  );
}

export function CustomerLoop({ style = {} }: { style?: CSSProperties }) {
  const railCenter = 47;

  const node = (i: number) => {
    const s = CLP_STATIONS[i];
    const cls = i === 0 ? "clp-node clp-node1" : i === 1 ? "clp-node clp-node2" : "clp-node clp-node3";
    return (
      <div key={s.n} className={cls} style={{
        position: "absolute", left: s.x, top: railCenter,
        width: 44, height: 44, marginLeft: -22, marginTop: -22,
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        background: CLP.sleepSoft, border: `1px solid ${CLP.line}`, color: CLP.sleep,
        boxSizing: "border-box", zIndex: 3,
      }}>
        <ClpIcon kind={s.icon} />
      </div>
    );
  };

  return (
    <div className="clp-card" style={{
      position: "relative", width: "100%", maxWidth: 480, boxSizing: "border-box",
      background: "#fff", border: `1px solid ${CLP.line}`, borderRadius: 20,
      boxShadow: "0 14px 44px -20px rgba(26,90,218,0.22), 0 2px 8px rgba(0,0,0,0.04)",
      padding: "22px 24px 26px", fontFamily: CLP.sans, color: CLP.ink,
      overflow: "hidden", ...style,
    }}>
      <style>{CLP_CSS}</style>

      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.045) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: CLP.mono, fontSize: 11, letterSpacing: 1.6, fontWeight: 500, color: CLP.muted, textTransform: "uppercase" }}>
            Jak se zákazník vrací
          </span>
          <span style={{ fontFamily: CLP.mono, fontSize: 11, letterSpacing: 1.2, color: "rgba(0,0,0,0.32)", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
            <span className="clp-loopdot" style={{ width: 6, height: 6, borderRadius: "50%", background: CLP.success, display: "inline-block" }} />
            ve smyčce
          </span>
        </div>

        <div className="clp-rail" style={{ position: "relative", height: 94, marginTop: 4 }}>
          <div aria-hidden style={{
            position: "absolute", left: "16.666%", right: "16.666%", top: railCenter,
            height: 2, marginTop: -1, background: "rgba(0,0,0,0.10)", borderRadius: 2, zIndex: 1,
          }} />
          <div className="clp-segA" aria-hidden style={{
            position: "absolute", left: "16.666%", width: "33.333%", top: railCenter,
            height: 3, marginTop: -1.5, background: CLP.accent, borderRadius: 2,
            transformOrigin: "left center", transform: "scaleX(0)", zIndex: 2,
          }} />
          <div className="clp-segB" aria-hidden style={{
            position: "absolute", left: "50%", width: "33.333%", top: railCenter,
            height: 3, marginTop: -1.5, background: CLP.success, borderRadius: 2,
            transformOrigin: "left center", transform: "scaleX(0)", zIndex: 2,
          }} />

          <div className="clp-ping" aria-hidden style={{
            position: "absolute", left: "50%", top: railCenter, width: 44, height: 44,
            marginLeft: 0, borderRadius: "50%", border: `2px solid ${CLP.accent}`,
            transform: "translate(-50%,-50%) scale(0.7)", opacity: 0, zIndex: 2,
          }} />

          {node(0)}
          {node(1)}
          {node(2)}

          <div className="clp-counter" style={{
            position: "absolute", left: "83.333%", top: railCenter - 34,
            transform: "translate(-50%,2px) scale(0.6)", opacity: 0, zIndex: 6,
            display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            padding: "5px 11px", borderRadius: 999, background: CLP.successSoft,
            border: `1px solid ${CLP.success}`, color: CLP.success,
            fontFamily: CLP.mono, fontSize: 11.5, fontWeight: 600, letterSpacing: 0.3,
          }}>
            <span style={{ fontWeight: 700 }}>+1</span> rezervace
          </div>

          <div className="clp-token" aria-hidden style={{
            position: "absolute", top: railCenter, left: "16.666%",
            width: 54, height: 54, marginLeft: -27, marginTop: -27,
            borderRadius: "50%", border: `4px solid ${CLP.sleep}`,
            background: "rgba(174,178,189,0.16)", boxSizing: "border-box",
            transform: "translateZ(0)", zIndex: 5,
            boxShadow: "0 0 0 3px #fff",
          }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 16 }}>
          {CLP_STATIONS.map((s, i) => (
            <div key={s.n} style={{ textAlign: "center", padding: "0 4px" }}>
              <div className={i === 1 ? "clp-num2" : i === 2 ? "clp-num3" : ""} style={{
                fontFamily: CLP.mono, fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
                color: CLP.sleep, marginBottom: 6,
              }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.4, color: CLP.ink, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, lineHeight: 1.35, color: CLP.muted, textWrap: "balance" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CLP_CSS = `
@keyframes clpTok {
  0%   { left:16.666%; opacity:0; border-color:#9aa0ad; background:rgba(174,178,189,.16); }
  4%   { opacity:1; }
  16%  { left:16.666%; border-color:#9aa0ad; background:rgba(174,178,189,.16); }
  30%  { left:50%;     border-color:#1a5ada; background:rgba(26,90,218,.14); }
  46%  { left:50%;     border-color:#1a5ada; background:rgba(26,90,218,.14); }
  60%  { left:83.333%; border-color:#10b981; background:rgba(16,185,129,.14); }
  80%  { left:83.333%; opacity:1; border-color:#10b981; background:rgba(16,185,129,.14); }
  88%  { left:83.333%; opacity:0; border-color:#10b981; background:rgba(16,185,129,.14); }
  92%  { left:16.666%; opacity:0; border-color:#9aa0ad; background:rgba(174,178,189,.16); }
  100% { left:16.666%; opacity:0; border-color:#9aa0ad; background:rgba(174,178,189,.16); }
}
@keyframes clpSegA { 0%,16%{transform:scaleX(0)} 30%,84%{transform:scaleX(1)} 95%,100%{transform:scaleX(0)} }
@keyframes clpSegB { 0%,46%{transform:scaleX(0)} 60%,84%{transform:scaleX(1)} 95%,100%{transform:scaleX(0)} }
@keyframes clpAct2 {
  0%,24%   { color:#9aa0ad; background:#eef0f4; border-color:rgba(0,0,0,.08); }
  30%,84%  { color:#1a5ada; background:#e8eefb; border-color:#1a5ada; }
  95%,100% { color:#9aa0ad; background:#eef0f4; border-color:rgba(0,0,0,.08); }
}
@keyframes clpAct3 {
  0%,54%   { color:#9aa0ad; background:#eef0f4; border-color:rgba(0,0,0,.08); }
  60%,84%  { color:#10b981; background:#e6f7f0; border-color:#10b981; }
  95%,100% { color:#9aa0ad; background:#eef0f4; border-color:rgba(0,0,0,.08); }
}
@keyframes clpNum2 { 0%,24%{color:#9aa0ad} 30%,84%{color:#1a5ada} 95%,100%{color:#9aa0ad} }
@keyframes clpNum3 { 0%,54%{color:#9aa0ad} 60%,84%{color:#10b981} 95%,100%{color:#9aa0ad} }
@keyframes clpWake {
  0%,16%,100% { transform: translate(0,0) scale(1); }
  8%          { transform: translate(0,0) scale(1.07); }
}
@keyframes clpPing {
  0%,30% { transform:translate(-50%,-50%) scale(0.7); opacity:0; }
  34%    { opacity:0.45; }
  47%    { transform:translate(-50%,-50%) scale(2.0); opacity:0; }
  100%   { opacity:0; }
}
@keyframes clpPop {
  0%,57%   { opacity:0; transform:translate(-50%,2px) scale(0.6); }
  62%      { opacity:1; transform:translate(-50%,-9px) scale(1.12); }
  67%      { opacity:1; transform:translate(-50%,-9px) scale(1); }
  80%      { opacity:1; transform:translate(-50%,-11px) scale(1); }
  90%,100% { opacity:0; transform:translate(-50%,-15px) scale(1); }
}
@keyframes clpBlink { 0%,55%{opacity:1} 60%,100%{opacity:0.25} }

.clp-token   { animation: clpTok  8s ease-in-out infinite; }
.clp-segA    { animation: clpSegA 8s ease-in-out infinite; }
.clp-segB    { animation: clpSegB 8s ease-in-out infinite; }
.clp-node1   { animation: clpWake 8s ease-in-out infinite; }
.clp-node2   { animation: clpAct2 8s ease infinite; }
.clp-node3   { animation: clpAct3 8s ease infinite; }
.clp-num2    { animation: clpNum2 8s ease infinite; }
.clp-num3    { animation: clpNum3 8s ease infinite; }
.clp-ping    { animation: clpPing 8s ease-out infinite; }
.clp-counter { animation: clpPop  8s ease infinite; }
.clp-loopdot { animation: clpBlink 8s ease infinite; }

@media (prefers-reduced-motion: reduce) {
  .clp-token, .clp-segA, .clp-segB, .clp-node1, .clp-node2, .clp-node3,
  .clp-num2, .clp-num3, .clp-ping, .clp-counter, .clp-loopdot { animation: none !important; }
  .clp-token   { left:83.333% !important; opacity:1 !important; border-color:#10b981 !important; background:rgba(16,185,129,.14) !important; }
  .clp-segA    { transform: scaleX(1) !important; }
  .clp-segB    { transform: scaleX(1) !important; }
  .clp-node2   { color:#1a5ada !important; background:#e8eefb !important; border-color:#1a5ada !important; }
  .clp-node3   { color:#10b981 !important; background:#e6f7f0 !important; border-color:#10b981 !important; }
  .clp-num2    { color:#1a5ada !important; }
  .clp-num3    { color:#10b981 !important; }
  .clp-ping    { opacity:0 !important; }
  .clp-counter { opacity:1 !important; transform:translate(-50%,-11px) scale(1) !important; }
}
`;
