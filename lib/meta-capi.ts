// Meta Conversion API (server-side) — posílá událost Lead přímo z serveru do Mety,
// paralelně s browser Pixelem. Dedup přes sdílené event_id. Odolné vůči adblocku/iOS.
// META_CAPI_TOKEN je tajný (server-only, NE NEXT_PUBLIC). Bez tokenu se CAPI tiše přeskočí.
import { createHash } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const GRAPH = "https://graph.facebook.com/v21.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const normEmail = (e: string) => e.trim().toLowerCase();
const normPhone = (p: string) => {
  let d = p.replace(/\D/g, "");
  if (d.length === 9) d = "420" + d; // české číslo bez předvolby
  return d;
};

export async function sendMetaLead(o: {
  eventId: string;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
  sourceUrl?: string;
}): Promise<void> {
  if (!PIXEL_ID || !CAPI_TOKEN) return; // dokud není token, CAPI se přeskočí

  const user_data: Record<string, unknown> = {};
  if (o.email) user_data.em = [sha256(normEmail(o.email))];
  if (o.phone) {
    const ph = normPhone(o.phone);
    if (ph) user_data.ph = [sha256(ph)];
  }
  if (o.fbp) user_data.fbp = o.fbp;
  if (o.fbc) user_data.fbc = o.fbc;
  if (o.ip) user_data.client_ip_address = o.ip;
  if (o.userAgent) user_data.client_user_agent = o.userAgent;

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: o.eventId, // dedup s browser Pixelem (stejné eventID)
        action_source: "website",
        event_source_url: o.sourceUrl || "https://boostmail.cz/",
        user_data,
      },
    ],
  };

  try {
    const res = await fetch(`${GRAPH}/${PIXEL_ID}/events?access_token=${encodeURIComponent(CAPI_TOKEN)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("meta capi non-ok", res.status, await res.text().catch(() => ""));
    }
  } catch (e) {
    console.error("meta capi failed", e);
  }
}
