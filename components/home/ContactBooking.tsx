"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { HP } from "@/lib/hp-data";
import { trackLead, utmSummary, newEventId, getFbCookies } from "@/lib/tracking";

// Kontaktní modul: taby [Napsat zprávu | Vybrat termín].
// Formulář → /api/contact, rezervační okno (den + čas → lead) → /api/booking.
// Dny se počítají client-side (useEffect) kvůli hydrataci.

type Tab = "form" | "cal";
type Day = { i: number; label: string; num: number; full: string };

const SLOTS = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const WD = ["ne", "po", "út", "st", "čt", "pá", "so"];
const MON = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];

function buildDays(): Day[] {
  const out: Day[] = [];
  const base = new Date();
  for (let k = 1; out.length < 10 && k < 20; k++) {
    const d = new Date(base);
    d.setDate(base.getDate() + k);
    const wd = d.getDay();
    out.push({ i: k, label: WD[wd], num: d.getDate(), full: `${WD[wd]} ${d.getDate()}. ${MON[d.getMonth()]}` });
  }
  return out;
}

const inputStyle = (err: boolean): CSSProperties => ({
  display: "block", width: "100%", marginTop: 4, padding: "9px 12px",
  border: `1px solid ${err ? "#dc2626" : HP.line}`, borderRadius: 9,
  fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none", background: "#fff",
});
const labelStyle: CSSProperties = { display: "block", fontSize: 11, fontFamily: HP.mono, letterSpacing: 1, color: "rgba(0,0,0,0.55)" };
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const okBox = (title: string, body: React.ReactNode): React.ReactElement => (
  <div style={{ padding: 30, textAlign: "center", background: HP.accentSoft, border: `1px solid ${HP.accent}`, borderRadius: 16 }}>
    <div style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>
    <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>{body}</div>
  </div>
);

export function ContactBooking() {
  const [tab, setTab] = useState<Tab>("form");

  // booking
  const [days, setDays] = useState<Day[]>([]);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [bLead, setBLead] = useState({ name: "", email: "", phone: "", company: "" });
  const [bErr, setBErr] = useState<Record<string, string>>({});
  const [bBusy, setBBusy] = useState(false);
  const [bFail, setBFail] = useState<string | null>(null);
  const [bDone, setBDone] = useState(false);

  // form
  const [fd, setFd] = useState({ name: "", email: "", phone: "", project: "", msg: "" });
  const [fErr, setFErr] = useState<Record<string, string>>({});
  const [fBusy, setFBusy] = useState(false);
  const [fFail, setFFail] = useState<string | null>(null);
  const [fDone, setFDone] = useState(false);

  useEffect(() => {
    const d = buildDays();
    setDays(d);
    setDay((p) => (p == null && d.length ? d[0].i : p));
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const t = (e as CustomEvent).detail?.tab;
      if (t === "cal" || t === "form") setTab(t);
      document.getElementById("final-demo")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("bm-open-contact", onOpen);
    return () => window.removeEventListener("bm-open-contact", onOpen);
  }, []);

  const selectedDay = days.find((d) => d.i === day) || days[0];

  const submitBooking = async () => {
    const e: Record<string, string> = {};
    if (!bLead.name.trim()) e.name = "Jméno je povinné";
    if (!bLead.email.trim()) e.email = "Email je povinný";
    else if (!emailOk(bLead.email)) e.email = "Neplatný formát";
    if (!bLead.phone.trim()) e.phone = "Telefon je povinný";
    if (!bLead.company.trim()) e.company = "Název provozovny je povinný";
    setBErr(e);
    if (Object.keys(e).length) return;
    setBBusy(true); setBFail(null);
    const eventId = newEventId();
    const fb = getFbCookies();
    try {
      const res = await fetch("/api/booking", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bLead, day: selectedDay?.full, slot, source: "homepage-booking", utm: utmSummary(), eventId, fbp: fb.fbp, fbc: fb.fbc }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) setBFail(json.error || "Něco se pokazilo, zkuste to prosím znovu.");
      else { setBDone(true); trackLead("booking", { email: bLead.email, phone: bLead.phone }, eventId); }
    } catch {
      setBFail("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally { setBBusy(false); }
  };

  const submitForm = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!fd.name.trim()) e.name = "Jméno je povinné";
    if (!fd.email.trim()) e.email = "Email je povinný";
    else if (!emailOk(fd.email)) e.email = "Neplatný formát";
    if (!fd.project.trim()) e.project = "Název provozovny je povinný";
    setFErr(e);
    if (Object.keys(e).length) return;
    setFBusy(true); setFFail(null);
    const eventId = newEventId();
    const fb = getFbCookies();
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fd, source: "homepage-form", utm: utmSummary(), eventId, fbp: fb.fbp, fbc: fb.fbc }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) setFFail(json.error || "Něco se pokazilo, zkuste to prosím znovu.");
      else { setFDone(true); trackLead("form", { email: fd.email, phone: fd.phone }, eventId); }
    } catch {
      setFFail("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally { setFBusy(false); }
  };

  const tabBtn = (t: Tab, label: string) => (
    <button onClick={() => setTab(t)} style={{
      padding: "10px 18px", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
      fontFamily: "inherit", background: tab === t ? HP.accent : "transparent", color: tab === t ? "#fff" : HP.ink,
    }}>{label}</button>
  );

  const errLine = (m?: string) => m ? <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{m}</div> : null;
  const failLine = (m: string | null) => m ? <div style={{ padding: "12px 14px", marginBottom: 12, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 13, color: "#991b1b", lineHeight: 1.5 }}>{m}</div> : null;

  return (
    <div>
      <div style={{ display: "inline-flex", padding: 4, borderRadius: 999, background: HP.soft, border: `1px solid ${HP.line}`, marginBottom: 16 }}>
        {tabBtn("form", "Napsat zprávu")}
        {tabBtn("cal", "Vybrat termín")}
      </div>

      {tab === "form" ? (
        fDone ? okBox(`Díky, ${fd.name.split(" ")[0] || "ozveme se"}!`, <>Ozveme se vám do 24 hodin na <b>{fd.email}</b>.</>) : (
          <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { k: "name", l: "JMÉNO", t: "text", p: "Jan Novák" },
              { k: "email", l: "E-MAIL", t: "email", p: "jan@provozovna.cz" },
              { k: "phone", l: "TELEFON", t: "tel", p: "+420 …" },
              { k: "project", l: "NÁZEV PROVOZOVNY", t: "text", p: "Název vaší provozovny" },
            ].map((f) => (
              <label key={f.k} style={labelStyle}>
                {f.l}
                <input type={f.t} value={(fd as Record<string, string>)[f.k]} placeholder={f.p}
                  onChange={(ev) => { const v = ev.target.value; setFd((prev) => ({ ...prev, [f.k]: v })); }} style={inputStyle(!!fErr[f.k])} />
                {errLine(fErr[f.k])}
              </label>
            ))}
            <label style={labelStyle}>
              ZPRÁVA (NEPOVINNÉ)
              <textarea rows={3} value={fd.msg} placeholder="Co řešíte? Kolik máte zákazníků v systému?"
                onChange={(ev) => { const v = ev.target.value; setFd((prev) => ({ ...prev, msg: v })); }} style={{ ...inputStyle(false), resize: "vertical" }} />
            </label>
            {failLine(fFail)}
            <button type="submit" disabled={fBusy} className="hp-cta" style={{ marginTop: 4, padding: "14px 20px", background: fBusy ? "rgba(26,90,218,0.5)" : HP.accent, color: "#fff", border: "none", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: fBusy ? "wait" : "pointer", fontFamily: "inherit" }}>
              {fBusy ? "Odesílám…" : "Odeslat poptávku →"}
            </button>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>Ozveme se zpravidla do 24 hodin. Zdarma a nezávazně.</div>
          </form>
        )
      ) : bDone ? okBox("Termín máme!", <><b>{selectedDay?.full}</b> v <b>{slot}</b><br />Pozvánku pošleme na <b>{bLead.email}</b> do několika minut.</>) : showLead && slot ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, padding: 14, background: HP.soft, borderRadius: 12, border: `1px solid ${HP.line}` }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: HP.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontFamily: HP.mono, color: "rgba(0,0,0,0.5)", letterSpacing: 1 }}>VYBRANÝ TERMÍN</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{selectedDay?.full} · {slot}</div>
            </div>
            <button onClick={() => setShowLead(false)} style={{ background: "none", border: "none", color: HP.accent, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Změnit</button>
          </div>
          {[
            { k: "name", l: "JMÉNO", t: "text", p: "Jan Novák" },
            { k: "email", l: "E-MAIL", t: "email", p: "jan@provozovna.cz" },
            { k: "phone", l: "TELEFON", t: "tel", p: "+420 …" },
            { k: "company", l: "NÁZEV PROVOZOVNY", t: "text", p: "Název vaší provozovny" },
          ].map((f) => (
            <div key={f.k} style={{ marginBottom: 12 }}>
              <label style={labelStyle}>{f.l}</label>
              <input type={f.t} value={(bLead as Record<string, string>)[f.k]} placeholder={f.p}
                onChange={(ev) => { const v = ev.target.value; setBLead((prev) => ({ ...prev, [f.k]: v })); }} style={inputStyle(!!bErr[f.k])} />
              {errLine(bErr[f.k])}
            </div>
          ))}
          {failLine(bFail)}
          <button onClick={submitBooking} disabled={bBusy} className="hp-cta" style={{ width: "100%", padding: "14px 20px", background: bBusy ? "rgba(0,0,0,0.4)" : HP.ink, color: "#fff", border: "none", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: bBusy ? "wait" : "pointer", fontFamily: "inherit" }}>
            {bBusy ? "Odesílám…" : `Potvrdit termín ${slot} →`}
          </button>
          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 12, lineHeight: 1.5 }}>Pošleme pozvánku do kalendáře. Pokud termín nesedne, ozveme se a najdeme jiný.</div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 11, fontFamily: HP.mono, color: "rgba(0,0,0,0.5)", letterSpacing: 1, marginBottom: 12 }}>VYBERTE DEN</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 22 }}>
            {days.map((d) => (
              <button key={d.i} onClick={() => setDay(d.i)} style={{ padding: "12px 4px", border: `1px solid ${d.i === day ? HP.accent : HP.line}`, background: d.i === day ? HP.accentSoft : "#fff", color: d.i === day ? HP.accent : HP.ink, borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase" }}>{d.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{d.num}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, fontFamily: HP.mono, color: "rgba(0,0,0,0.5)", letterSpacing: 1, marginBottom: 12 }}>VYBERTE ČAS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {SLOTS.map((s) => (
              <button key={s} onClick={() => setSlot(s)} style={{ padding: "12px 8px", border: `1px solid ${slot === s ? HP.accent : HP.line}`, background: slot === s ? HP.accent : "#fff", color: slot === s ? "#fff" : HP.ink, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600 }}>{s}</button>
            ))}
          </div>
          {slot && (
            <button onClick={() => setShowLead(true)} className="hp-cta" style={{ display: "block", marginTop: 20, width: "100%", padding: "14px 20px", background: HP.ink, color: "#fff", border: "none", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer", boxSizing: "border-box", fontFamily: "inherit" }}>
              Pokračovat ({slot}) →
            </button>
          )}
          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 12, lineHeight: 1.5 }}>Krátký 20minutový videohovor, zdarma. Projdeme vaši situaci, zkušenosti z oboru i odhad přínosu.</div>
        </div>
      )}
    </div>
  );
}
