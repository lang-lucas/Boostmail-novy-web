import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_EMAIL = process.env.RESEND_FROM ?? "BoostMail leady <leady@boostsite.cz>";
const NOTIFY_TO = (process.env.NOTIFY_TO ?? "nerad@boostmail.cz, lang@boostmail.cz")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const NOTIFY_EMAIL = NOTIFY_TO.join(", ");
export { FROM_EMAIL };

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  cached = new Resend(RESEND_API_KEY);
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
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_TO,
    replyTo,
    subject,
    text,
    html,
  });
  if (error) throw new Error(error.message || "Resend send failed");
  return data;
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
