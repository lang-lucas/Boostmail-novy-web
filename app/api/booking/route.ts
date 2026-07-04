import { NextResponse } from "next/server";
import { sendNotification, escapeHtml, isValidEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  day?: string;
  slot?: string;
  source?: string;
  utm?: string;
};

export async function POST(request: Request) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const company = (body.company ?? "").trim();
  const day = (body.day ?? "").trim();
  const slot = (body.slot ?? "").trim();
  const source = (body.source ?? "homepage").trim().slice(0, 80);
  const utm = (body.utm ?? "").trim().slice(0, 200);

  if (!name) return NextResponse.json({ ok: false, error: "Jméno je povinné" }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ ok: false, error: "Neplatný email" }, { status: 400 });
  if (!phone) return NextResponse.json({ ok: false, error: "Telefon je povinný" }, { status: 400 });
  if (!day || !slot)
    return NextResponse.json({ ok: false, error: "Termín je povinný" }, { status: 400 });

  const subject = `Nová schůzka — ${day} v ${slot} · ${name}`;
  const ts = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

  const text = [
    `Nová schůzka domluvená přes web`,
    ``,
    `Termín:     ${day} v ${slot}`,
    ``,
    `Jméno:      ${name}`,
    `Email:      ${email}`,
    `Telefon:    ${phone}`,
    `Barbershop: ${company || "—"}`,
    ``,
    `─────`,
    `Zdroj:  ${source}`,
    `Kampaň: ${utm || "—"}`,
    `Čas:    ${ts}`,
    ``,
    `Vlož termín do Google Calu a pošli pozvánku na ${email}.`,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 1.5px; color: #1a5ada; font-weight: 600; margin-bottom: 8px;">NOVÁ SCHŮZKA</div>
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #0a0a0a; letter-spacing: -0.02em;">
        ${escapeHtml(day)} v ${escapeHtml(slot)}
      </h1>
      <div style="font-size: 16px; color: rgba(0,0,0,0.65); margin-bottom: 24px;">
        s <strong style="color: #0a0a0a;">${escapeHtml(name)}</strong>${company ? ` z <strong style="color: #0a0a0a;">${escapeHtml(company)}</strong>` : ""}
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #0a0a0a;">
        <tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55); width: 110px;">Email</td><td style="padding: 10px 0; font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #1a5ada; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55);">Telefon</td><td style="padding: 10px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #0a0a0a; text-decoration: none; font-weight: 600;">${escapeHtml(phone)}</a></td></tr>
        ${company ? `<tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55);">Podnik</td><td style="padding: 10px 0; font-weight: 600;">${escapeHtml(company)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 24px; padding: 14px 16px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; font-size: 13px; color: #9a3412; line-height: 1.55;">
        ⚠️ Vlož termín do Google Calu a pošli pozvánku na <strong>${escapeHtml(email)}</strong>.
      </div>
      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 12px; color: rgba(0,0,0,0.45); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.3px;">
        Zdroj: ${escapeHtml(source)} · Kampaň: ${escapeHtml(utm) || "—"} · ${ts}
      </div>
    </div>
  `;

  try {
    await sendNotification({ subject, text, html, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("booking send failed", err);
    return NextResponse.json({ ok: false, error: "Email se nepodařilo odeslat" }, { status: 500 });
  }
}
