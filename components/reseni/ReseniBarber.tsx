"use client";

import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BARBER, BARBER_DEEP, BARBER_SOFT,
  BarberPhoto, BarberLabel, BarberCapMark,
  BarberCutCycle, BarberReturnBars, BarberPhone,
} from "@/components/reseni/barber-charts";

const MONO = "var(--font-jetbrains-mono), monospace";
const INK = "#0a0a0a";
const BARBER_PHOTO = "/hero/barber.jpg";
const wrap = { maxWidth: 1300, margin: "0 auto" } as const;

const HERO_CHIPS = ["Střih ≈ 4–6 týdnů", "Fade ≈ 3–4 týdny", "Vousy ≈ 2 týdny", "8 barbershopů"];
const BOLEST_STATS = [
  { val: "4–6 týd", k: "rytmus, na který se dá spolehnout" },
  { val: "90 dní", k: "a klient je většinou pryč natrvalo" },
  { val: "0 Kč", k: "stojí připomínka oproti reklamě" },
];
const RYTMUS_CARDS = [
  { t: "Učí se vašeho klienta", d: "Začne oborovým průměrem 4–6 týdnů, pak se přizpůsobí jeho historii." },
  { t: "Nezahltí ho", d: "Jedna připomínka ve správný týden. Žádný newsletter každý čtvrtek." },
  { t: "Ví, proč zrovna teď", d: "Fade drží formu pár týdnů. Připomínka sedí na tom, kdy začne zarůstat." },
];
const CAMPAIGNS = [
  { n: "01", kind: "rytmus", title: "Rytmus střihu", desc: "Připomínka v ideálním intervalu, pro každého klienta zvlášť." },
  { n: "02", kind: "reaktivace", title: "Reaktivace spících", desc: "90+ dní se neukázal? Osobní pozvání zpátky." },
  { n: "03", kind: "uvitani", title: "Uvítání nového klienta", desc: "První dojem a rovnou návrh dalšího termínu." },
  { n: "04", kind: "recenze", title: "Recenze po návštěvě", desc: "Spokojený na Google, nespokojený rovnou k vám." },
  { n: "05", kind: "okna", title: "Naplnění volných oken", desc: "Prázdné odpoledne? Rychlá nabídka lidem, co ji ocení." },
  { n: "06", kind: "zruseni", title: "Zrušení → čekající", desc: "Po zrušení hned nabídneme termín dalším v pořadí." },
  { n: "07", kind: "perbarber", title: "Ke svému holiči", desc: "Klient ví, ke komu chodí. Zpráva jde jménem holiče." },
  { n: "08", kind: "prehled", title: "Přehled pro majitele", desc: "Vidíte černé na bílém, jak si držíte klientelu." },
];
const PROOF = [
  { name: "MNB Barbershop", place: "3 pobočky · Praha", named: true, resv: "300+", rev: "~180 000 Kč", link: "/pripadovky", agg: false },
  { name: "Barbershop v Praze", place: "bez uvedení jména", named: false, resv: "225", rev: "176 575 Kč", link: null, agg: false },
  { name: "8 barbershopů", place: "agregát napříč obory", named: false, resv: "tisíce", rev: "~27 500 kontaktů", link: null, agg: true },
];
const PROOF_NOTE = "Klienty, co by přišli tak jako tak, nepočítáme. Je to odhad přínosu kampaně, ne izolovaný efekt jednoho kanálu.";
const PROCESS = [
  { n: "01", title: "Napojíme se na váš systém", desc: "Data bereme z vašeho rezervačního systému. Nepřepisujete nic." },
  { n: "02", title: "Projdeme vaše služby", desc: "Jednou nastavíme rytmus a ceny. Zabere to hodinu." },
  { n: "03", title: "Zbytek jede sám", desc: "Zprávy mužským rodem, ve stylu vašeho barbershopu, e-mailem." },
  { n: "04", title: "Vy stříháte", desc: "Majitele to stojí skoro žádný čas. Jen inkasujete termíny." },
];
const MENTOR_MSGS = [
  { tag: "PRÁZDNÁ OKNA", text: "Ve středu odpoledne máš dlouhodobě volno. Rozšířil jsem reaktivaci na út–čt." },
  { tag: "CYKLUS", text: "Klienti Dana se vrací po 5 týdnech, u Marka po 7. Připomínky jedou zvlášť." },
  { tag: "TOP KLIENTI", text: "20 klientů dělá třetinu tržeb. Dostávají přednostní okno na rezervaci." },
  { tag: "ZRUŠENÍ", text: "Nejvíc zrušení chodí v pondělí ráno. Nasadil jsem rychlejší nabídku čekajícím." },
];
const MENTOR_CHECKS = [
  "Prázdná okna, která se dají zaplnit",
  "Cyklus střihu zvlášť pro každého barbera",
  "Top klienti, na kterých stojí tržba",
  "Zrušení, na která je potřeba reagovat rychle",
];

function MentorPanel() {
  return (
    <div style={{ background: "#0a0a0a", borderRadius: 20, padding: "24px 24px 20px", boxShadow: "0 40px 90px -50px rgba(0,0,0,0.6)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${BARBER}, ${BARBER_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>B</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Boostware · mentor</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)" }}>čte data, radí majiteli</div>
        </div>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5bbf7a" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MENTOR_MSGS.map((m) => (
          <div key={m.tag} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.2, color: "#e7b787", fontWeight: 600, marginBottom: 7 }}>{m.tag}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReseniBarber() {
  return (
    <div style={{ background: "#f4f4f4", color: INK, minHeight: "100vh", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>
      <style>{`
        .bty-cap { position: relative; overflow: hidden; transition: transform 0.2s, border-color 0.2s, background 0.2s; }
        .bty-cap::before { content: ''; position: absolute; left: 0; top: 0; height: 3px; width: 100%; background: ${BARBER}; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .bty-cap:hover { transform: translateY(-4px); border-color: ${BARBER}66 !important; background: rgba(255,255,255,0.05) !important; }
        .bty-cap:hover::before { transform: scaleX(1); }
        .bty-cap .cap-ic { transition: background 0.2s, transform 0.25s; }
        .bty-cap:hover .cap-ic { background: ${BARBER}33 !important; transform: rotate(-5deg); }
        @media (prefers-reduced-motion: no-preference) {
          .bty-cap .cap-mark { display: inline-flex; animation: capPulse 3.4s ease-in-out infinite; transform-origin: center; }
          .bty-cap:hover .cap-mark { animation-duration: 1.3s; }
        }
        @keyframes capPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.16); } }
        @media (max-width: 960px) {
          .b-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .b-hero-photo { height: 300px !important; }
          .b-float { display: none !important; }
        }
        @media (max-width: 860px) { .b-split { grid-template-columns: 1fr !important; gap: 28px !important; } }
        @media (max-width: 900px) { .bm-grid-4 { grid-template-columns: repeat(2,1fr) !important; } .bm-grid-3 { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .bm-grid-4 { grid-template-columns: 1fr !important; } section { padding-left: 20px !important; padding-right: 20px !important; } }
      `}</style>

      <SiteNav subpage />

      {/* 01 · HERO */}
      <section style={{ padding: "72px 56px 56px" }}>
        <div className="b-hero-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}>
          <div>
            <BarberLabel n="01" text="ŘEŠENÍ · BARBERSHOPY" />
            <h1 style={{ fontSize: 80, lineHeight: 0.95, fontWeight: 700, margin: "20px 0 20px", letterSpacing: "-0.04em" }}>
              Stálí klienti zpátky<br />
              <em style={{ fontWeight: 400, fontStyle: "italic", color: BARBER }}>v křesle.</em>
            </h1>
            <div style={{ fontSize: 18, lineHeight: 1.5, color: "rgba(0,0,0,0.7)", maxWidth: 520, marginBottom: 26 }}>
              Za vás posíláme e-maily, co vrátí stálého klienta ve správný týden, zaplní volná okna a získají recenze. Vy stříháte, zbytek je na nás.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              <Link href="/#final-demo" style={{ padding: "16px 26px", background: BARBER, color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Spočítat z mého exportu →</Link>
              <Link href="/#jak" style={{ padding: "16px 26px", background: "transparent", color: INK, border: "1px solid rgba(0,0,0,0.2)", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Jak to funguje</Link>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: MONO, fontSize: 12 }}>
              {HERO_CHIPS.map((t) => (
                <span key={t} style={{ padding: "7px 13px", background: `${BARBER}14`, color: BARBER_DEEP, borderRadius: 999, letterSpacing: 0.3, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <BarberPhoto className="b-hero-photo" src={BARBER_PHOTO} label="Barbershop" radius={24} style={{ width: "100%", height: 470 }} />
            <div className="b-float" style={{ position: "absolute", left: -18, bottom: 30, background: "#fff", borderRadius: 16, boxShadow: "0 24px 60px -24px rgba(0,0,0,0.35)", padding: "14px 18px", border: "1px solid rgba(0,0,0,0.06)", maxWidth: 250 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: BARBER, fontWeight: 600, marginBottom: 6 }}>ZA 5 TÝDNŮ · STŘIH</div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 8 }}>Tome, fade zarůstá. Sednem na to?</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "#fff", background: BARBER, padding: "6px 12px", borderRadius: 999 }}>Vybrat termín →</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · BOLEST */}
      <section style={{ padding: "56px 56px" }}>
        <div style={wrap}>
          <BarberLabel n="02" text="PROČ SE TO VYPLATÍ" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 860 }}>Klienti neodcházejí naštvaní. Odejdou a nevrátí se.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 34, maxWidth: 640, lineHeight: 1.5 }}>Rozhoduje jediná věc. Jestli se ozvete vy, nebo čekáte, až si klient vzpomene sám.</div>
          <div className="b-split" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, alignItems: "stretch" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.5, color: "rgba(0,0,0,0.5)", marginBottom: 22 }}>NÁVRATNOST PODLE TOHO, KDO UDĚLÁ PRVNÍ KROK</div>
              <BarberReturnBars />
            </div>
            <div style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: 16 }}>
              {BOLEST_STATS.map((s) => (
                <div key={s.k} style={{ background: BARBER_SOFT, border: `1px solid ${BARBER}2a`, borderRadius: 16, padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 38, fontWeight: 700, color: BARBER_DEEP, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 · RYTMUS STŘIHU */}
      <section style={{ padding: "40px 56px 64px" }}>
        <div style={wrap}>
          <BarberLabel n="03" text="JÁDRO VĚCI" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Střih má svůj rytmus. My ho hlídáme.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 28, maxWidth: 660, lineHeight: 1.5 }}>Stálý klient se stříhá po 4 až 6 týdnech. Připomeneme se přesně tehdy. Okno se zaplní bez jediné slevy.</div>
          <BarberCutCycle />
          <div className="bm-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
            {RYTMUS_CARDS.map((c) => (
              <div key={c.t} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{c.t}</h3>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(0,0,0,0.62)" }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · KAMPANĚ */}
      <section style={{ padding: "76px 56px", background: "#0a0a0a", color: "#fff" }}>
        <div style={wrap}>
          <BarberLabel n="04" text="CO BOOSTWARE DĚLÁ" dark />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Osm věcí, které běží samy.</h2>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 34, maxWidth: 620, lineHeight: 1.5 }}>Nastavíme jednou, pak to jede na pozadí. Většina jsou zprávy se spouštěčem v rezervačním systému, poslední je přehled pro vás.</div>
          <div className="bm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {CAMPAIGNS.map((c, i) => (
              <div key={c.n} className="bty-cap" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span className="cap-ic" style={{ width: 44, height: 44, borderRadius: 12, background: `${BARBER}1a`, color: BARBER, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="cap-mark" style={{ animationDelay: `${i * 0.25}s` }}><BarberCapMark kind={c.kind} /></span>
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.32)", letterSpacing: 1, fontWeight: 600 }}>[{c.n}]</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{c.title}</h3>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.58)" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · TELEFON */}
      <section style={{ padding: "72px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="b-split" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 52, alignItems: "center" }}>
            <BarberPhone />
            <div>
              <BarberLabel n="05" text="TAK VYPADÁ NÁŠ E-MAIL" />
              <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Osobní, mužským rodem, o věci.</h2>
              <div style={{ fontSize: 16, color: "rgba(0,0,0,0.65)", lineHeight: 1.6, margin: "8px 0 22px", maxWidth: 520 }}>
                Žádné slevové letáky, žádný plošný newsletter. Jen krátká, osobní zpráva ve chvíli, kdy dává smysl. Vyberte si situaci a přečtěte si celý e-mail tak, jak ho klient dostane.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: MONO, fontSize: 12 }}>
                {["mužský rod", "jméno barbera", "reálný termín", "bez slev"].map((t) => (
                  <span key={t} style={{ padding: "7px 13px", background: `${BARBER}14`, color: BARBER_DEEP, borderRadius: 999, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · PROOF */}
      <section style={{ padding: "64px 56px" }}>
        <div style={wrap}>
          <BarberLabel n="06" text="ČÍSLA, NE SLIBY" />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Barber je náš nejsilnější obor.</h2>
          <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 30, maxWidth: 660, lineHeight: 1.5 }}>Reálné výsledky z provozoven, se kterými spolupracujeme. Měříme rezervace navíc, ne kdo si mail otevřel.</div>
          <div className="bm-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {PROOF.map((p) => (
              <div key={p.name} style={{ background: p.named ? BARBER_DEEP : "#fff", color: p.named ? "#fff" : "#0a0a0a", border: p.named ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: 30, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1, padding: "3px 8px", borderRadius: 999, background: p.named ? "rgba(255,255,255,0.16)" : `${BARBER}14`, color: p.named ? "#fff" : BARBER_DEEP, fontWeight: 600 }}>{p.named ? "JMENOVITĚ" : p.agg ? "AGREGÁT" : "ANONYMNĚ"}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{p.name}</div>
                <div style={{ fontSize: 13, color: p.named ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", marginBottom: 24 }}>{p.place}</div>
                <div style={{ display: "flex", gap: 28, marginTop: "auto" }}>
                  <div>
                    <div style={{ fontSize: 40, fontWeight: 700, color: p.named ? BARBER : BARBER_DEEP, letterSpacing: "-0.03em", lineHeight: 1 }}>{p.resv}</div>
                    <div style={{ fontSize: 12, color: p.named ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", marginTop: 6 }}>rezervací navíc</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: p.named ? "#fff" : "#0a0a0a", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 6 }}>{p.rev}</div>
                    <div style={{ fontSize: 12, color: p.named ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", marginTop: 6 }}>{p.agg ? "v databázích" : "přínos"}</div>
                  </div>
                </div>
                {p.link && (
                  <Link href={p.link} style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", fontSize: 13.5, fontWeight: 600, color: "#e7b787", textDecoration: "none" }}>Celá případovka →</Link>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "flex-start", maxWidth: 760 }}>
            <span style={{ fontFamily: MONO, fontSize: 12, color: BARBER, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>POCTIVĚ:</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(0,0,0,0.55)" }}>{PROOF_NOTE}</span>
          </div>
        </div>
      </section>

      {/* 07 · JAK TO FUNGUJE */}
      <section style={{ padding: "76px 56px", background: "#0a0a0a", color: "#fff" }}>
        <div style={wrap}>
          <BarberLabel n="07" text="JAK TO NASADÍME" dark />
          <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 32px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Čtyři kroky a jede to samo.</h2>
          <div className="bm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {PROCESS.map((p) => (
              <div key={p.n} style={{ padding: "26px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14 }}>
                <div style={{ fontSize: 38, fontWeight: 700, color: BARBER, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 14 }}>{p.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.58)" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · MENTOR */}
      <section style={{ padding: "64px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="b-split" style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 48, alignItems: "center" }}>
            <div style={{ maxWidth: 460 }}>
              <BarberLabel n="08" text="DRUHÁ VRSTVA" />
              <h2 style={{ fontSize: 46, fontWeight: 700, margin: "12px 0 8px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Nejen posílá. Taky radí.</h2>
              <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 24, maxWidth: 640, lineHeight: 1.5 }}>Nad kampaněmi běží druhá vrstva Boostware. Čte vaše data a upozorní na to, co byste jinak přehlédli.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {MENTOR_CHECKS.map((t) => (
                  <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "rgba(0,0,0,0.72)" }}>
                    <span style={{ color: BARBER, marginTop: -1 }}>→</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <MentorPanel />
          </div>
        </div>
      </section>

      {/* 09 · CTA */}
      <section style={{ padding: "90px 56px", background: "#0a0a0a", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontSize: 56, fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>Pošlete export, spočítáme kolik vám <em style={{ fontWeight: 400, color: BARBER }}>utíká.</em></h2>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 30, lineHeight: 1.5 }}>Patnáct minut zdarma. Vaše čísla a rovná odpověď, jestli vám retence dává smysl.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#final-demo" style={{ display: "inline-block", padding: "16px 28px", background: BARBER, color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Spočítat z mého exportu →</Link>
            <Link href="/pripadovky" style={{ display: "inline-block", padding: "16px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Případovka MNB</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
