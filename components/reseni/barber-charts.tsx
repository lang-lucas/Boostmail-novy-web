"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// Kožená amber akcent barber segmentu. Sdílí /reseni-barber i /pripadovky (MNB).
export const BARBER = "#b8763a"; // kožená amber, akcent segmentu
export const BARBER_DEEP = "#8a5424"; // hlubší amber pro text na světlém
export const BARBER_SOFT = "#f6ecdf"; // jemná amber plocha

const MONO = "var(--font-jetbrains-mono), monospace";

function useMountOn(delay = 200) {
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

// Fotka v amber rámu. Když chybí src, designovaný placeholder (nikdy prázdný rám).
export function BarberPhoto({
  src,
  label = "FOTO",
  hint,
  radius = 18,
  style,
  className,
  objectPosition = "center",
}: {
  src?: string | null;
  label?: string;
  hint?: string;
  radius?: number;
  style?: CSSProperties;
  className?: string;
  objectPosition?: string;
}) {
  if (src) {
    return (
      <div className={className} style={{ position: "relative", borderRadius: radius, overflow: "hidden", background: "#eee", ...style }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }} />
      </div>
    );
  }
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        overflow: "hidden",
        background: `repeating-linear-gradient(135deg, ${BARBER}12 0 16px, ${BARBER}06 16px 32px)`,
        border: `1px solid ${BARBER}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${BARBER}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: BARBER }} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: BARBER_DEEP, fontWeight: 700 }}>{label}</div>
        {hint && <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(0,0,0,0.42)", marginTop: 6, letterSpacing: 0.5 }}>{hint}</div>}
      </div>
    </div>
  );
}

export function BarberLabel({ n, text, center, dark }: { n: string; text: string; center?: boolean; dark?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: center ? "center" : "flex-start",
        fontFamily: MONO,
        fontSize: 12,
        letterSpacing: 1.5,
        color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: BARBER, fontWeight: 600 }}>[{n}]</span>
      <span>{text}</span>
    </div>
  );
}

// Minimalistické abstraktní ikony ze základních tvarů — kampaně
export function BarberCapMark({ kind }: { kind: string }) {
  const s = { width: 22, height: 22, display: "block" } as const;
  const st = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const D = (cx: number, cy: number, r = 2) => <circle cx={cx} cy={cy} r={r} fill="currentColor" />;
  switch (kind) {
    case "rytmus":
      return <svg style={s} viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12" {...st} opacity="0.3" />{D(4, 12)}{D(11, 12)}{D(18, 12)}</svg>;
    case "reaktivace":
      return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" {...st} opacity="0.4" /><circle cx="12" cy="12" r="5" {...st} />{D(12, 12, 1.6)}</svg>;
    case "uvitani":
      return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" {...st} opacity="0.25" /><circle cx="12" cy="12" r="6" {...st} opacity="0.55" />{D(12, 12, 3)}</svg>;
    case "recenze":
      return <svg style={s} viewBox="0 0 24 24"><polygon points="12,2 22,12 12,22 2,12" {...st} />{D(12, 12, 1.8)}</svg>;
    case "okna":
      return <svg style={s} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" {...st} opacity="0.4" /><rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" /><rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" /><rect x="14" y="14" width="7" height="7" rx="1.5" {...st} opacity="0.4" /></svg>;
    case "zruseni":
      return <svg style={s} viewBox="0 0 24 24"><circle cx="6" cy="12" r="3.2" {...st} /><line x1="9.5" y1="12" x2="14.5" y2="12" {...st} opacity="0.5" />{D(18, 12, 3.2)}</svg>;
    case "perbarber":
      return <svg style={s} viewBox="0 0 24 24"><circle cx="9" cy="12" r="5.5" {...st} /><circle cx="15" cy="12" r="5.5" {...st} opacity="0.5" /></svg>;
    case "prehled":
      return <svg style={s} viewBox="0 0 24 24"><rect x="3" y="13" width="4.5" height="8" rx="1" fill="currentColor" /><rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="currentColor" /><rect x="16.5" y="4" width="4.5" height="17" rx="1" fill="currentColor" opacity="0.6" /></svg>;
    default:
      return <svg style={s} viewBox="0 0 24 24">{D(12, 12, 4)}</svg>;
  }
}

// Rytmus střihu — freshness pruh + osa, ideální okno 4–6 týdnů
export function BarberCutCycle() {
  const WEEKS = 10;
  const pct = (w: number) => (w / WEEKS) * 100;
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "30px 30px 24px", overflowX: "auto" }}>
      <div style={{ minWidth: 560 }}>
        <div style={{ position: "relative", height: 60, marginBottom: 8 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: `linear-gradient(90deg, ${BARBER} 0%, ${BARBER}bb 30%, ${BARBER}66 62%, ${BARBER}22 100%)` }} />
          <div style={{ position: "absolute", top: -6, bottom: -6, left: `${pct(4)}%`, width: `${pct(2)}%`, border: `2px solid ${BARBER_DEEP}`, borderRadius: 10, background: "rgba(255,255,255,0.14)" }} />
          <div style={{ position: "absolute", left: 12, top: 10, fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: "#fff", fontWeight: 700 }}>ČERSTVÝ FADE</div>
          <div style={{ position: "absolute", right: 12, top: 10, fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: "rgba(0,0,0,0.45)", fontWeight: 700 }}>ZAROSTLÝ</div>
        </div>
        <div style={{ position: "relative", height: 54 }}>
          <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 2, background: "rgba(0,0,0,0.08)" }} />
          {[0, 2, 4, 6, 8, 10].map((w) => (
            <div key={w} style={{ position: "absolute", top: 0, left: `${pct(w)}%`, transform: "translateX(-50%)", textAlign: "center" }}>
              <div style={{ width: 2, height: 8, background: "rgba(0,0,0,0.2)", margin: "0 auto" }} />
              <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(0,0,0,0.4)", marginTop: 4 }}>{w} tý</div>
            </div>
          ))}
          <div style={{ position: "absolute", top: -1, left: 0, transform: "translate(-50%,0)" }}>
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff", border: `2px solid ${BARBER}` }} />
          </div>
          <div style={{ position: "absolute", top: -3, left: `${pct(5)}%`, transform: "translate(-50%,0)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 17, height: 17, borderRadius: "50%", background: BARBER, boxShadow: `0 0 0 5px ${BARBER}22` }} />
            <div style={{ fontFamily: MONO, fontSize: 10, color: BARBER_DEEP, fontWeight: 700, marginTop: 6, whiteSpace: "nowrap" }}>PŘIPOMÍNKA</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 22, marginTop: 16, flexWrap: "wrap", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", border: `2px solid ${BARBER}` }} /> poslední střih</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: "50%", background: BARBER }} /> ideální okno 4–6 týdnů</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 10.5, letterSpacing: 0.5 }}>osa = týdny od střihu</span>
        </div>
      </div>
    </div>
  );
}

// Návratnost podle toho, kdo udělá první krok (obecný benchmark)
export function BarberReturnBars() {
  const on = useMountOn(180);
  const bars = [
    { label: "Připomeneme se ve správný týden", value: "70–80 %", pct: 76, good: true },
    { label: "Čeká se, až si klient vzpomene sám", value: "40–50 %", pct: 45, good: false },
    { label: "Bez připomínky po 90 dnech", value: "≈ 15 %", pct: 15, good: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {bars.map((b) => (
        <div key={b.label}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: b.good ? "#0a0a0a" : "rgba(0,0,0,0.6)" }}>{b.label}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: b.good ? BARBER : "rgba(0,0,0,0.45)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{b.value}</span>
          </div>
          <div style={{ height: 12, borderRadius: 999, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: on ? `${b.pct}%` : "0%", borderRadius: 999, background: b.good ? `linear-gradient(90deg, ${BARBER}, ${BARBER_DEEP})` : "rgba(0,0,0,0.22)", transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }} />
          </div>
        </div>
      ))}
      <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 0.5, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>obecný průměr u opakovaných služeb · ne čísla konkrétního klienta</div>
    </div>
  );
}

// Telefon s e-mailem — pracovní vzorové maily (reálné se dodají)
export const BARBER_MAILS = [
  { tab: "Rytmus střihu", kind: "připomínka", subject: "Tome, čtyři týdny utekly", body: ["Zdravím Tome, od posledního střihu jsou to zhruba čtyři týdny. Přesně teď fade začíná ztrácet tvar.", "Dan má tento týden ještě volno ve čtvrtek a v pátek. Vezmete jeden?"], cta: "Vybrat termín" },
  { tab: "Reaktivace", kind: "spící klient", subject: "Dlouho jsme se neviděli, Petře", body: ["Nebyl jste u nás přes tři měsíce. Nic se neděje, jen se ozývám. Křeslo je pořád tady a Dan si vás pamatuje.", "Kdyby se hodilo se zase ukázat, stačí kliknout. Bez slev, bez řečí."], cta: "Rezervovat střih" },
  { tab: "Volné okno", kind: "last minute", subject: "Zítra odpoledne máme volno", body: ["Zítra se u nás uvolnilo odpoledne. Máte to k nám kousek a blíží se vám termín, tak posílám dřív, než to zabere někdo jiný.", "Volno je v 15:30 a v 16:15. Berete?"], cta: "Vzít termín" },
];

export function BarberPhone({ single }: { single?: boolean }) {
  const [i, setI] = useState(0);
  const m = BARBER_MAILS[i];
  return (
    <div>
      {!single && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {BARBER_MAILS.map((msg, idx) => {
            const active = idx === i;
            return (
              <button key={msg.tab} onClick={() => setI(idx)} style={{ padding: "9px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", border: active ? `1px solid ${BARBER}` : "1px solid rgba(0,0,0,0.14)", background: active ? BARBER : "#fff", color: active ? "#fff" : "rgba(0,0,0,0.7)", transition: "all 0.15s" }}>{msg.tab}</button>
            );
          })}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 320, maxWidth: "100%", background: "#0a0a0a", borderRadius: 40, padding: 10, boxShadow: "0 40px 90px -40px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "relative", background: BARBER_SOFT, borderRadius: 30, overflow: "hidden", minHeight: 520 }}>
            <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", fontFamily: MONO, fontSize: 11, color: "#0a0a0a", fontWeight: 600 }}>
              <span>9:41</span>
              <div style={{ position: "absolute", left: "50%", top: 9, transform: "translateX(-50%)", width: 90, height: 20, background: "#0a0a0a", borderRadius: 999 }} />
              <span>▪▪▪ ▮</span>
            </div>
            <div style={{ background: "#fff", margin: "6px 10px 0", borderRadius: "18px 18px 0 0", padding: "16px 18px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${BARBER}, ${BARBER_DEEP})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>B</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>Váš barbershop</div>
                <div style={{ fontSize: 11.5, color: "rgba(0,0,0,0.45)" }}>rezervace@barbershop.cz</div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: 1, color: BARBER, background: `${BARBER}14`, padding: "4px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>{m.kind.toUpperCase()}</div>
            </div>
            <div style={{ background: "#fff", margin: "0 10px", padding: "4px 18px 22px" }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "10px 0 14px" }}>{m.subject}</div>
              {m.body.map((p, idx) => (
                <p key={idx} style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(0,0,0,0.72)", margin: "0 0 12px" }}>{p}</p>
              ))}
              <a href="/#final-demo" style={{ display: "inline-block", marginTop: 6, padding: "11px 20px", background: BARBER, color: "#fff", borderRadius: 999, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>{m.cta} →</a>
              <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)", fontSize: 10.5, color: "rgba(0,0,0,0.4)" }}>
                Váš barbershop · Jinak už vás nebudeme obtěžovat · <span style={{ textDecoration: "underline" }}>odhlásit</span>
              </div>
            </div>
            <div style={{ background: "#fff", margin: "0 10px 10px", borderRadius: "0 0 18px 18px", height: 12 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
