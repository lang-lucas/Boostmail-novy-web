"use client";

import { useState, useEffect, Fragment } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

export const BEAUTY = "#e0417e";
export const BEAUTY_DEEP = "#a02555";
export const BEAUTY_SOFT = "#fceef4";
const MONO = "var(--font-jetbrains-mono), monospace";

export function BeautyLabel({ n, text, center, dark }: { n: string; text: string; center?: boolean; dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: center ? "center" : "flex-start", fontFamily: MONO, fontSize: 12, letterSpacing: 1.5, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <span style={{ color: BEAUTY, fontWeight: 600 }}>[{n}]</span>
      <span>{text}</span>
    </div>
  );
}

export function BeautyPhoto({ src, alt = "Kosmetika", radius = 18, style, className }: { src: string; alt?: string; radius?: number; style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: "relative", borderRadius: radius, overflow: "hidden", border: `1px solid ${BEAUTY}33`, background: BEAUTY_SOFT, ...style }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: "cover" }} />
    </div>
  );
}


export function BeautyRhythmChart() {
  const WEEKS = 12;

  type Service = { name: string; note: string; interval: number; label: string };

  const cosmetics: Service[] = [
    { name: "Řasy", note: "doplnění", interval: 2.5, label: "2 až 3 týdny" },
    { name: "Nehty", note: "gel", interval: 3, label: "≈ 3 týdny" },
    { name: "Depilace", note: "vosk", interval: 4, label: "≈ 4 týdny" },
    { name: "Obočí", note: "úprava, barvení", interval: 5, label: "4 až 6 týdnů" },
    { name: "Pedikúra", note: "", interval: 5, label: "4 až 6 týdnů" },
    { name: "Pleť", note: "ošetření", interval: 6, label: "≈ 6 týdnů" },
  ];
  const barber: Service = { name: "Holičství", note: "jeden rytmus", interval: 4, label: "≈ 4 týdny" };

  const mono = "var(--font-jetbrains-mono), monospace";

  const dots = (interval: number): number[] => {
    const arr: number[] = [];
    for (let w = 0; w <= WEEKS + 0.001; w += interval) arr.push(Math.round(w * 10) / 10);
    return arr;
  };
  const pct = (w: number): number => (w / WEEKS) * 100;

  const Track = ({ interval, color, faint }: { interval: number; color: string; faint?: boolean }) => (
    <div style={{ position: "relative", height: 34, margin: "0 8px" }}>
      {/* baseline */}
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, transform: "translateY(-50%)", background: faint ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)" }} />
      {/* segment od poslední návštěvy k první připomínce */}
      {dots(interval).map((w, i) => {
        const first = i === 0;
        return (
          <div key={w} style={{ position: "absolute", top: "50%", left: `${pct(w)}%`, transform: "translate(-50%,-50%)" }}>
            {first ? (
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff", border: `2px solid ${color}` }} />
            ) : (
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            )}
          </div>
        );
      })}
    </div>
  );

  const Row = ({ item, color, faint, contrast }: { item: Service; color: string; faint?: boolean; contrast?: boolean }) => (
    <div style={{
      display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", gap: 8,
      padding: "2px 0",
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", color: contrast ? "rgba(0,0,0,0.45)" : "#0a0a0a", display: "flex", alignItems: "baseline", gap: 7 }}>
          {item.name}
          {item.note && <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(0,0,0,0.4)" }}>{item.note}</span>}
        </div>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: 0.5, color: contrast ? "rgba(0,0,0,0.35)" : BEAUTY, marginTop: 2 }}>{item.label}</div>
      </div>
      <Track interval={item.interval} color={color} faint={faint} />
    </div>
  );

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "28px 28px 24px", overflowX: "auto" }} className="no-scrollbar">
      <div style={{ minWidth: 560 }}>
        {/* header s týdny */}
        <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 8, marginBottom: 14 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1, color: "rgba(0,0,0,0.4)", alignSelf: "end" }}>SLUŽBA</div>
          <div style={{ position: "relative", height: 16, margin: "0 8px" }}>
            {[0, 2, 4, 6, 8, 10, 12].map((w) => (
              <div key={w} style={{ position: "absolute", left: `${pct(w)}%`, transform: "translateX(-50%)", fontFamily: mono, fontSize: 10, color: "rgba(0,0,0,0.4)" }}>{w}</div>
            ))}
          </div>
        </div>

        {/* barber kontrast */}
        <Row item={barber} color="rgba(0,0,0,0.28)" faint contrast />
        <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "8px 0" }} />

        {/* kosmetika */}
        {cosmetics.map((c) => <Row key={c.name} item={c} color={BEAUTY} />)}

        {/* legenda */}
        <div style={{ display: "flex", gap: 22, marginTop: 18, flexWrap: "wrap", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", border: `2px solid ${BEAUTY}` }} /> poslední návštěva
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: BEAUTY }} /> Boostware pozve zpět
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: mono, fontSize: 10.5, letterSpacing: 0.5 }}>osa = týdny od návštěvy</span>
        </div>
      </div>
    </div>
  );
}
export function BeautySeasonAxis() {
  const MONTHS: string[] = ['LED', 'ÚNO', 'BŘE', 'DUB', 'KVĚ', 'ČVN', 'ČVC', 'SRP', 'ZÁŘ', 'ŘÍJ', 'LIS', 'PRO'];

  const bands: { label: string; sub: string; start: number; span: number }[] = [
    { label: 'Plesová sezóna', sub: 'líčení, řasy, nehty', start: 0, span: 2 },
    { label: 'Laser epilace', sub: 'začít na jaře, hotovo do léta', start: 2, span: 3 },
    { label: 'Depilace a pedikúra', sub: 'sandálová sezóna', start: 3, span: 2 },
    { label: 'Svatební sezóna', sub: 'plánuje se měsíce dopředu', start: 4, span: 5 },
    { label: 'Peelingy a náročná pleť', sub: 'po létě, když skončí slunce', start: 8, span: 3 },
  ];

  const vouchers: { label: string; at: number; big?: boolean }[] = [
    { label: 'Valentýn', at: 1.45 },
    { label: 'MDŽ', at: 2.25 },
    { label: 'Den matek', at: 4.4 },
    { label: 'Vánoce', at: 11.5, big: true },
  ];

  const mono = "var(--font-jetbrains-mono), monospace";
  const pct = (m: number): number => (m / 12) * 100;
  const laneH = 40;
  const laneGap = 8;

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 18, padding: '26px 26px 22px', overflowX: 'auto' }} className="no-scrollbar">
      <div style={{ minWidth: 720 }}>
        {/* měsíce */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginBottom: 10 }}>
          {MONTHS.map((m, i) => (
            <div key={m} style={{ textAlign: 'center', fontFamily: mono, fontSize: 10.5, letterSpacing: 0.5, color: i >= 5 && i <= 7 ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.5)', fontWeight: 600 }}>{m}</div>
          ))}
        </div>

        {/* poukazy — bodové kampaně */}
        <div style={{ position: 'relative', height: 46, marginBottom: 6 }}>
          <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.06)' }} />
          {vouchers.map((v) => (
            <div key={v.label} style={{ position: 'absolute', top: 0, left: `${pct(v.at)}%`, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 9.5, fontFamily: mono, color: v.big ? BEAUTY : 'rgba(0,0,0,0.5)', fontWeight: v.big ? 700 : 500, whiteSpace: 'nowrap' }}>{v.label}</div>
              <div style={{ width: v.big ? 16 : 11, height: v.big ? 16 : 11, borderRadius: '50%', background: v.big ? BEAUTY : '#fff', border: `2px solid ${BEAUTY}`, boxShadow: v.big ? `0 0 0 4px ${BEAUTY}22` : 'none' }} />
            </div>
          ))}
          <div style={{ position: 'absolute', top: 28, left: 4, fontFamily: mono, fontSize: 9, letterSpacing: 1, color: 'rgba(0,0,0,0.35)' }}>DÁRKOVÉ POUKAZY</div>
        </div>

        {/* pásma sezón + letní upozornění */}
        <div style={{ position: 'relative', paddingTop: 6 }}>
          {/* léto / slunce overlay */}
          <div style={{ position: 'absolute', top: 0, bottom: 20, left: `${pct(5)}%`, width: `${pct(3)}%`, background: 'repeating-linear-gradient(-45deg, rgba(214,150,60,0.10) 0 6px, rgba(214,150,60,0.04) 6px 12px)', border: '1px dashed rgba(190,130,50,0.4)', borderRadius: 8, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 9.5, letterSpacing: 1, color: 'rgba(150,100,30,0.85)', fontWeight: 600 }}>LÉTO<br />SLUNCE</div>
          </div>

          {bands.map((b) => (
            <div key={b.label} style={{ position: 'relative', height: laneH, marginBottom: laneGap }}>
              <div style={{
                position: 'absolute', top: 0, left: `${pct(b.start)}%`, width: `${pct(b.span)}%`, height: laneH,
                background: `linear-gradient(180deg, ${BEAUTY}1f, ${BEAUTY}12)`, border: `1px solid ${BEAUTY}55`,
                borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', overflow: 'hidden',
              }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function BeautyRebookBars() {
  const [on, setOn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), 180);
    return () => clearTimeout(t);
  }, []);

  const bars: { label: string; value: string; pct: number; good: boolean }[] = [
    { label: "Rezervace hned při odchodu", value: "70 až 80 %", pct: 78, good: true },
    { label: "Čeká se, až se klientka ozve sama", value: "40 až 50 %", pct: 46, good: false },
    { label: "Přeobjednání samo do 24 hodin", value: "≈ 10 %", pct: 10, good: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {bars.map((b) => (
        <div key={b.label}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: b.good ? "#0a0a0a" : "rgba(0,0,0,0.6)",
              }}
            >
              {b.label}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: b.good ? BEAUTY : "rgba(0,0,0,0.45)",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {b.value}
            </span>
          </div>
          <div
            style={{
              height: 12,
              borderRadius: 999,
              background: "rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: on ? `${b.pct}%` : "0%",
                borderRadius: 999,
                background: b.good
                  ? `linear-gradient(90deg, ${BEAUTY}, ${BEAUTY_DEEP})`
                  : "rgba(0,0,0,0.22)",
                transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export function BeautyCourseTracker() {
  const courses: { name: string; note: string; gap: string; sessions: number }[] = [
    { name: "Laser epilace", note: "6 až 8 sezení", gap: "rozestup 4 až 6 týdnů", sessions: 7 },
    { name: "Chemický peeling", note: "4 sezení", gap: "po 2 týdnech", sessions: 4 },
    { name: "Mezoterapie", note: "3 sezení", gap: "po 14 dnech", sessions: 3 },
  ];

  const [reduceMotion, setReduceMotion] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    setMounted(true);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const animate = mounted && !reduceMotion;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      {courses.map((c, ci) => (
        <div
          key={c.name}
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 24 }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 2 }}>{c.name}</div>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              color: BEAUTY,
              letterSpacing: 0.5,
              marginBottom: 22,
            }}
          >
            {c.note.toUpperCase()}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
            {Array.from({ length: c.sessions }).map((_, i) => {
              const last = i === c.sessions - 1;
              const delay = (ci * c.sessions + i) * 45;
              return (
                <Fragment key={i}>
                  <div
                    style={{
                      width: last ? 26 : 22,
                      height: last ? 26 : 22,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: last ? BEAUTY : `${BEAUTY}1a`,
                      color: last ? "#fff" : BEAUTY,
                      border: last ? "none" : `1.5px solid ${BEAUTY}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      opacity: animate ? 0 : 1,
                      transform: animate ? "scale(0.4)" : "scale(1)",
                      animation: animate ? `btyCoursePop 0.4s ease ${delay}ms forwards` : undefined,
                    }}
                  >
                    {last ? "✓" : i + 1}
                  </div>
                  {!last && <div style={{ flex: 1, height: 2, background: `${BEAUTY}44`, minWidth: 6 }} />}
                </Fragment>
              );
            })}
          </div>
          <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{c.gap}</div>
        </div>
      ))}
      <style>{`@keyframes btyCoursePop{to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}