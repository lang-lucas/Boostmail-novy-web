"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BEAUTY, BEAUTY_DEEP, BEAUTY_SOFT,
  BeautyLabel, BeautyPhoto,
  BeautyRhythmChart, BeautySeasonAxis, BeautyRebookBars, BeautyCourseTracker,
} from "@/components/reseni/beauty-charts";

const MONO = "var(--font-jetbrains-mono), monospace";
const INK = "#0a0a0a";

// ── abstraktní ikony (kruh, čára, kosočtverec) ──
function CapMark({ kind }: { kind: string }) {
  const s = { width: 22, height: 22, display: "block" } as const;
  const st = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const D = (cx: number, cy: number, r = 2) => <circle cx={cx} cy={cy} r={r} fill="currentColor" />;
  switch (kind) {
    case "rytmus": return <svg style={s} viewBox="0 0 24 24"><line x1="2" y1="12" x2="22" y2="12" {...st} opacity="0.3" />{D(4, 12)}{D(11, 12)}{D(18, 12)}</svg>;
    case "reaktivace": return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" {...st} opacity="0.4" /><circle cx="12" cy="12" r="5" {...st} />{D(12, 12, 1.6)}</svg>;
    case "uvitani": return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" {...st} opacity="0.25" /><circle cx="12" cy="12" r="6" {...st} opacity="0.55" />{D(12, 12, 3)}</svg>;
    case "recenze": return <svg style={s} viewBox="0 0 24 24"><polygon points="12,2 22,12 12,22 2,12" {...st} />{D(12, 12, 1.8)}</svg>;
    case "narozeniny": return <svg style={s} viewBox="0 0 24 24">{D(6, 7, 1.7)}{D(12, 5, 1.7)}{D(18, 7, 1.7)}{D(6, 15, 1.7)}{D(12, 17, 1.7)}{D(18, 15, 1.7)}{D(12, 11, 2)}</svg>;
    case "sezonni": return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5" {...st} />{D(12, 3, 1.9)}{D(21, 12, 1.9)}{D(12, 21, 1.9)}{D(3, 12, 1.9)}</svg>;
    case "tym": return <svg style={s} viewBox="0 0 24 24"><circle cx="9" cy="12" r="5.5" {...st} /><circle cx="15" cy="12" r="5.5" {...st} opacity="0.5" /></svg>;
    default: return <svg style={s} viewBox="0 0 24 24"><rect x="3" y="13" width="4.5" height="8" rx="1" fill="currentColor" /><rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="currentColor" /><rect x="16.5" y="4" width="4.5" height="17" rx="1" fill="currentColor" opacity="0.6" /></svg>;
  }
}

// ── reálné e-maily (1:1 v rámečku) ──
const MAILS = [
  { file: "01_pripominka_plet", tab: "Připomínka", subject: "Nedopřeješ si zase ošetření, Terezo?" },
  { file: "02_reaktivace", tab: "Reaktivace", subject: "Dlouho jsme se neviděly, Terezo" },
  { file: "03_uvitani", tab: "Uvítání", subject: "Vítej u nás, Terezo!" },
  { file: "04_svatek", tab: "Svátek", subject: "Všechno nejlepší k svátku, Terezo!" },
  { file: "05_podekovani_recenze", tab: "Recenze", subject: "Jak ses po ošetření cítila, Terezo?" },
];
function BeautyEmails() {
  const [i, setI] = useState(0);
  const e = MAILS[i];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }} className="bty-msg-grid">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {MAILS.map((m, idx) => (
            <button key={m.file} onClick={() => setI(idx)} style={{ padding: "9px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", border: idx === i ? `1px solid ${BEAUTY}` : "1px solid rgba(0,0,0,0.12)", background: idx === i ? BEAUTY : "#fff", color: idx === i ? "#fff" : INK }}>{m.tab}</button>
          ))}
        </div>
        <div style={{ fontSize: 15, color: "rgba(0,0,0,0.62)", lineHeight: 1.6, maxWidth: 480 }}>
          Každá zpráva je psaná ženským rodem, ve stylu salonu a o výsledku péče, ne o prodeji. Připomínka sedí na cyklus konkrétní služby. Vpravo je skutečný e-mail, který za vás pošleme.
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: BEAUTY, marginTop: 20, fontWeight: 600 }}>E-MAIL I SMS · PERSONALIZOVANÉ · VE SPRÁVNÝ MOMENT</div>
      </div>
      <div style={{ borderRadius: 30, background: "#0a0a0a", padding: 9, boxShadow: "0 30px 60px -26px rgba(0,0,0,0.45)" }}>
        <div style={{ borderRadius: 22, overflow: "hidden", background: "#fff" }}>
          <div style={{ padding: "13px 16px", borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#f9f9f9" }}>
            <div style={{ fontSize: 10.5, fontFamily: MONO, letterSpacing: 0.8, color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>OD · STUDIO N</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, lineHeight: 1.3 }}>{e.subject}</div>
          </div>
          <iframe key={e.file} src={`/emails/kosmetika/${e.file}.html`} title={e.subject} loading="lazy" style={{ width: "100%", height: 420, border: "none", display: "block", background: "#fff" }} />
        </div>
      </div>
    </div>
  );
}


const CAPABILITIES = [
  { n: "01", kind: "rytmus", title: "Rytmus u každé služby", desc: "Připomeneme ošetření ve správný čas, službu po službě." },
  { n: "02", kind: "reaktivace", title: "Reaktivace spících", desc: "Pár měsíců nebyla? Přijde osobní pozvání zpět." },
  { n: "03", kind: "uvitani", title: "Uvítání nové klientky", desc: "První dojem a rovnou plán další návštěvy." },
  { n: "04", kind: "recenze", title: "Recenze po návštěvě", desc: "Spokojené na Google, nespokojené soukromě." },
  { n: "05", kind: "narozeniny", title: "Narozeniny a svátek", desc: "Dvakrát ročně osobní zpráva. Bez prodeje." },
  { n: "06", kind: "sezonni", title: "Sezónní kampaně", desc: "Poukazy i laser ve správný měsíc." },
  { n: "07", kind: "tym", title: "Víc specialistek", desc: "Každá klientka ví, ke které chodí." },
  { n: "08", kind: "prehled", title: "Přehled pro majitelku", desc: "Vidíte, jak si držíte klientky." },
];
const STATS = [
  { v: "60–70 %", k: "Zdravá roční retence" },
  { v: "30–35 %", k: "Nových klientek se vrátí" },
  { v: "do 3 týdnů", k: "Kdy nasadit připomínku" },
];
const PROCESS = [
  { n: "01", title: "Napojíme se na váš systém", desc: "Data bereme z vašeho rezervačního systému. Nepřepisujete nic." },
  { n: "02", title: "Projdeme vaše služby", desc: "Jednou nastavíme, co je pro klientky základ. Hodina práce." },
  { n: "03", title: "Zbytek jede sám", desc: "Zprávy ženským rodem, ve stylu salonu, e-mailem i SMS." },
  { n: "04", title: "Vy se věnujete klientkám", desc: "Majitelku to stojí skoro žádný čas." },
];
const TRUST = [
  { v: "5–15 %", k: "Konverze připomínek", s: "nejúčinnější automatické zprávy" },
  { v: "−85 %", k: "Méně nedorazivších", s: "co dokážou dobré připomínky (benchmark)" },
  { v: "≈ 6 týdnů", k: "Cyklus pleťové péče", s: "na to sedí načasování připomínky" },
  { v: "Na klíč", k: "Na váš stávající systém", s: "Reservio, Reservanto, MyFox" },
];

const wrap = { maxWidth: 1300, margin: "0 auto" } as const;

export function ReseniKosmetika() {
  return (
    <div style={{ background: "#f4f4f4", color: INK, minHeight: "100vh", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>
      <style>{`
        .bty-cap { transition: transform 0.2s, border-color 0.2s, background 0.2s; }
        .bty-cap:hover { transform: translateY(-4px); border-color: ${BEAUTY}66 !important; background: rgba(255,255,255,0.05) !important; }
        @media (max-width: 900px) { .bty-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; } .bty-hero-photo { height: 320px !important; } .bty-float { display: none !important; } .bm-grid-4 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 820px) { .bty-msg-grid, .bty-split, .bm-grid-2, .bm-grid-3 { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .bm-grid-4 { grid-template-columns: 1fr !important; } section { padding-left: 20px !important; padding-right: 20px !important; } }
      `}</style>

      <SiteNav subpage />

      {/* HERO */}
      <section style={{ padding: "64px 48px 48px", background: "linear-gradient(180deg, #fdf0f6 0%, #f4f4f4 62%)" }}>
        <div className="bty-hero-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}>
          <div>
            <BeautyLabel n="01" text="Řešení · Kosmetické salony" />
            <h1 style={{ fontSize: 76, lineHeight: 0.96, fontWeight: 700, margin: "20px 0 20px", letterSpacing: "-0.04em" }}>
              Kdy se má klientka vrátit?<br />
              <em style={{ fontWeight: 400, fontStyle: "italic", color: BEAUTY }}>Víme to za vás.</em>
            </h1>
            <div style={{ fontSize: 18, lineHeight: 1.5, color: "rgba(0,0,0,0.7)", maxWidth: 520, marginBottom: 26 }}>
              Automatický retenční systém pro kosmetické salony. Pozve každou klientku zpět ve správný čas, e-mailem i SMS. Vy nehlídáte nic.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              <Link href="/#final-demo" style={{ padding: "16px 26px", background: BEAUTY, color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Nezávazná poptávka →</Link>
              <Link href="/#jak" style={{ padding: "16px 26px", background: "transparent", color: INK, border: "1px solid rgba(0,0,0,0.2)", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Jak to děláme</Link>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: MONO, fontSize: 12 }}>
              {["Pleť ≈ 6 týdnů", "Řasy 2–3 týdny", "Nehty ≈ 3 týdny", "Obočí 4–6 týdnů"].map((t) => (
                <span key={t} style={{ padding: "7px 13px", background: `${BEAUTY}14`, color: BEAUTY_DEEP, borderRadius: 999, letterSpacing: 0.3, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <BeautyPhoto src="/segments/kosmetika-1.jpg" alt="Klientka při ošetření" className="bty-hero-photo" radius={24} style={{ width: "100%", height: 460 }} />
            <div className="bty-float" style={{ position: "absolute", left: -18, bottom: 30, background: "#fff", borderRadius: 16, boxShadow: "0 24px 60px -24px rgba(0,0,0,0.35)", padding: "14px 18px", border: "1px solid rgba(0,0,0,0.06)", maxWidth: 250 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: BEAUTY, fontWeight: 600, marginBottom: 6 }}>ZA 6 TÝDNŮ · PLEŤ</div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 8 }}>Kláro, vaše pleť je zase připravená</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "#fff", background: BEAUTY, padding: "6px 12px", borderRadius: 999 }}>Poslat pozvánku →</div>
            </div>
          </div>
        </div>
      </section>

      {/* fotopás */}
      <section style={{ padding: "8px 48px" }}>
        <div style={wrap}><BeautyPhoto src="/segments/kosmetika-2.jpg" alt="Atmosféra salonu" radius={20} style={{ width: "100%", height: 190 }} /></div>
      </section>

      {/* [02] PROBLÉM */}
      <section style={{ padding: "56px 48px" }}>
        <div style={wrap}>
          <BeautyLabel n="02" text="Proč se to vyplatí" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 820 }}>Klientky neodcházejí naštvané. Odcházejí potichu.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 36, maxWidth: 640, lineHeight: 1.5 }}>Rozhoduje jediná věc. Jestli se ozvete vy, nebo čekáte, až si klientka vzpomene sama.</div>
          <div className="bty-split" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, alignItems: "stretch" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.5, color: "rgba(0,0,0,0.5)", marginBottom: 22 }}>NÁVRATNOST PODLE TOHO, KDO UDĚLÁ PRVNÍ KROK</div>
              <BeautyRebookBars />
            </div>
            <div style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: 16 }}>
              {STATS.map((s) => (
                <div key={s.k} style={{ background: BEAUTY_SOFT, border: `1px solid ${BEAUTY}2a`, borderRadius: 16, padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 38, fontWeight: 700, color: BEAUTY_DEEP, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* [03] RYTMUS */}
      <section style={{ padding: "40px 48px 64px" }}>
        <div style={wrap}>
          <BeautyLabel n="03" text="Jádro věci" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Každá služba má svůj rytmus.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 28, maxWidth: 640, lineHeight: 1.5 }}>Holičství má jeden rytmus. Kosmetika sedm nezávislých. Boostware sleduje každou zvlášť.</div>
          <BeautyRhythmChart />
          <div className="bm-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
            {[
              { t: "Učí se vaši klientku", d: "Začne oborovým průměrem, pak se přizpůsobí její historii." },
              { t: "Nezahltí ji", d: "Pozná její základ. Časté řasy nepřebijí péči o pleť." },
              { t: "Ví, proč zrovna teď", d: "Pleť se obnoví za 28 až 40 dní. Připomínka sedí na biologii." },
            ].map((c) => (
              <div key={c.t} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{c.t}</h3>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(0,0,0,0.62)" }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [04] CO BOOSTWARE DĚLÁ */}
      <section style={{ padding: "76px 48px", background: "#0a0a0a", color: "#fff" }}>
        <div style={wrap}>
          <BeautyLabel n="04" text="Co Boostware dělá" dark />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Osm věcí, které běží samy.</h2>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 34, maxWidth: 600, lineHeight: 1.5 }}>Nastavíme jednou, pak to jede na pozadí.</div>
          <div className="bm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {CAPABILITIES.map((c) => (
              <div key={c.n} className="bty-cap" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: `${BEAUTY}1a`, color: BEAUTY, display: "flex", alignItems: "center", justifyContent: "center" }}><CapMark kind={c.kind} /></span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.32)", letterSpacing: 1, fontWeight: 600 }}>[{c.n}]</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{c.title}</h3>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.58)" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] SEZÓNNÍ */}
      <section style={{ padding: "64px 48px" }}>
        <div style={wrap}>
          <BeautyLabel n="05" text="Celý rok má svůj rytmus" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Sezóny, na které se plánuje dopředu.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 28, maxWidth: 640, lineHeight: 1.5 }}>Přes léto se laser a peelingy nedělají kvůli slunci. Musí se pobídnout s předstihem.</div>
          <BeautySeasonAxis />
          <div className="bm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: BEAUTY, fontWeight: 600, marginBottom: 10 }}>OBRÁCENÁ SEZÓNNOST</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>Laser na jaře, peelingy na podzim.</h3>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(0,0,0,0.62)" }}>Laser je kúra na měsíce, ať je hotová do léta. Kdo pobídne pozdě, přijde o celou sezónu.</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: BEAUTY, fontWeight: 600, marginBottom: 10 }}>DÁRKOVÉ POUKAZY</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>Čtyři vlny za rok, Vánoce největší.</h3>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(0,0,0,0.62)" }}>Boostware připomene poukazy včas a po svátcích je pomůže proměnit v návštěvu.</div>
            </div>
          </div>
        </div>
      </section>

      {/* [06] KÚRY */}
      <section style={{ padding: "20px 48px 64px" }}>
        <div style={wrap}>
          <BeautyLabel n="06" text="Některé výsledky jsou série" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Kúry, které je potřeba dotáhnout.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 28, maxWidth: 640, lineHeight: 1.5 }}>Boostware provede klientku celou sérií a hlídá dokončení.</div>
          <BeautyCourseTracker />
        </div>
      </section>

      {/* [07] UKÁZKY ZPRÁV */}
      <section style={{ padding: "72px 48px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={wrap}>
          <BeautyLabel n="07" text="Tak vypadají naše zprávy" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Osobní, ženským rodem, o výsledku.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 30, maxWidth: 620, lineHeight: 1.5 }}>Žádné šablony z internetu. Vyberte si typ a přečtěte si celý text.</div>
          <BeautyEmails />
        </div>
      </section>

      {/* [08] JAK NASADÍME */}
      <section style={{ padding: "76px 48px", background: "#0a0a0a", color: "#fff" }}>
        <div style={wrap}>
          <BeautyLabel n="08" text="Jak to nasadíme" dark />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 32px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Čtyři kroky a jede to samo.</h2>
          <div className="bm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {PROCESS.map((p) => (
              <div key={p.n} style={{ padding: "26px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14 }}>
                <div style={{ fontSize: 38, fontWeight: 700, color: BEAUTY, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 14 }}>{p.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.58)" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [09] ČÍSLA A DŮVĚRA */}
      <section style={{ padding: "72px 48px" }}>
        <div style={wrap}>
          <BeautyLabel n="09" text="Čísla a důvěra" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Není to experiment. Je to standard.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 34, maxWidth: 680, lineHeight: 1.5 }}>Co umí Fresha, Booksy nebo Phorest, přinášíme českým salonům na jejich stávající systém. Na klíč. Čísla níže jsou oborové benchmarky, ne konkrétní klient.</div>
          <div className="bm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {TRUST.map((t) => (
              <div key={t.k} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 34, fontWeight: 700, color: BEAUTY_DEEP, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12 }}>{t.v}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, letterSpacing: "-0.01em" }}>{t.k}</div>
                <div style={{ fontSize: 12.5, color: "rgba(0,0,0,0.52)", lineHeight: 1.45 }}>{t.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 48px", background: "#0a0a0a", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontSize: 54, fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Pojďme spočítat, kolik vám <em style={{ fontWeight: 400, color: BEAUTY }}>utíká.</em></h2>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 30, lineHeight: 1.5 }}>Krátký videohovor zdarma. Vaše čísla a rovná odpověď, jestli vám retence dává smysl.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#final-demo" style={{ display: "inline-block", padding: "16px 28px", background: BEAUTY, color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Vybrat termín →</Link>
            <Link href="/#jak" style={{ display: "inline-block", padding: "16px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Jak pracujeme</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
