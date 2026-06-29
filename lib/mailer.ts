import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? "";
const NOTIFY_TO = process.env.NOTIFY_TO ?? "nerad@boostmail.cz";
const FROM_NAME = "BoostMail web";

export const NOTIFY_EMAIL = NOTIFY_TO;
export const FROM_EMAIL = SMTP_USER;

let cached: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (cached) return cached;
  if (!SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP_USER or SMTP_PASSWORD is not set");
  }
  cached = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  return cached;
}

export async function sendNotification({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  return transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: NOTIFY_TO,
    replyTo: replyTo ?? FROM_EMAIL,
    subject,
    text,
    html,
  });
}

export function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
