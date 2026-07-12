import { NextResponse } from "next/server";
import { sendNotification, escapeHtml, isValidEmail } from "@/lib/mailer";
import { sendMetaLead } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  project?: string;
  msg?: string;
  source?: string;
  utm?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const project = (body.project ?? "").trim();
  const msg = (body.msg ?? "").trim();
  const source = (body.source ?? "homepage").trim().slice(0, 80);
  const utm = (body.utm ?? "").trim().slice(0, 200);
  const eventId = (body.eventId ?? "").trim().slice(0, 100);
  const fbp = (body.fbp ?? "").trim().slice(0, 256);
  const fbc = (body.fbc ?? "").trim().slice(0, 256);

  if (!name) return NextResponse.json({ ok: false, error: "Jméno je povinné" }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ ok: false, error: "Neplatný email" }, { status: 400 });
  if (!project) return NextResponse.json({ ok: false, error: "Název barbershopu je povinný" }, { status: 400 });

  const subject = `Nový lead z webu — ${name} (${project})`;
  const ts = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

  const text = [
    `Nový lead z webu boostmail.cz`,
    ``,
    `Jméno:       ${name}`,
    `Email:       ${email}`,
    `Telefon:     ${phone || "—"}`,
    `Provozovna:  ${project}`,
    ``,
    `Zpráva:`,
    msg || "(bez zprávy)",
    ``,
    `─────`,
    `Zdroj:  ${source}`,
    `Kampaň: ${utm || "—"}`,
    `Čas:    ${ts}`,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 1.5px; color: #1a5ada; font-weight: 600; margin-bottom: 8px;">NOVÝ LEAD</div>
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 24px; color: #0a0a0a; letter-spacing: -0.02em;">
        ${escapeHtml(name)} z ${escapeHtml(project)}
      </h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #0a0a0a;">
        <tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55); width: 110px;">Email</td><td style="padding: 10px 0; font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #1a5ada; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55);">Telefon</td><td style="padding: 10px 0;">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color: #0a0a0a; text-decoration: none; font-weight: 600;">${escapeHtml(phone)}</a>` : "—"}</td></tr>
        <tr><td style="padding: 10px 0; color: rgba(0,0,0,0.55);">Provozovna</td><td style="padding: 10px 0; font-weight: 600;">${escapeHtml(project)}</td></tr>
      </table>
      ${msg ? `
        <div style="margin-top: 24px; padding: 18px; background: #f4f4f4; border-radius: 10px;">
          <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 1px; color: rgba(0,0,0,0.5); margin-bottom: 8px;">ZPRÁVA</div>
          <div style="font-size: 14px; line-height: 1.55; color: #0a0a0a; white-space: pre-wrap;">${escapeHtml(msg)}</div>
        </div>
      ` : ""}
      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 12px; color: rgba(0,0,0,0.45); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.3px;">
        Zdroj: ${escapeHtml(source)} · Kampaň: ${escapeHtml(utm) || "—"} · ${ts}
      </div>
    </div>
  `;

  try {
    await sendNotification({ subject, text, html, replyTo: email });
    if (eventId) {
      await sendMetaLead({
        eventId,
        email,
        phone,
        fbp,
        fbc,
        ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
        userAgent: request.headers.get("user-agent") || undefined,
        sourceUrl: request.headers.get("referer") || undefined,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact send failed", err);
    return NextResponse.json({ ok: false, error: "Email se nepodařilo odeslat" }, { status: 500 });
  }
}
