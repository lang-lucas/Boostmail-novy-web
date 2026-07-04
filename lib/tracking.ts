"use client";

// Konverzní a UTM tracking pro reklamy (Meta / Google Ads / Seznam Sklik + GA4).
// IDčka přes env — dokud nejsou vyplněná, příslušné volání je tiché no-op.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // "AW-XXXXXXXXX"
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL; // konverzní label
const SKLIK_ID = process.env.NEXT_PUBLIC_SKLIK_ID; // Sklik retargeting/konverze ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID; // pro Meta advanced matching

type Gtag = (...a: unknown[]) => void;
type Fbq = (...a: unknown[]) => void;
type SklikConv = (o: { id: number; value?: number; consent?: number }) => void;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
const UTM_STORE = "bm-utm";

/** Zachytí utm_* / gclid / fbclid z URL a uloží do sessionStorage (jen doplňuje, nepřepisuje první dotek). */
export function captureUtm(): void {
  try {
    const p = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = p.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length) {
      sessionStorage.setItem(UTM_STORE, JSON.stringify({ ...found, ...getUtm() }));
    }
  } catch {
    /* no-op */
  }
}

/** Vrátí uložené UTM/klikové parametry (pro přiložení k leadu). */
export function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}");
  } catch {
    return {};
  }
}

/** Nové event_id pro dedup browser Pixel ↔ server CAPI (stejné ID na obou stranách). */
export function newEventId(): string {
  try {
    return window.crypto.randomUUID();
  } catch {
    return `bm-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function getCookie(name: string): string {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : "";
  } catch {
    return "";
  }
}

/** _fbp / _fbc cookies od Meta Pixelu — pro spárování server CAPI se stejným uživatelem/klikem. */
export function getFbCookies(): { fbp: string; fbc: string } {
  return { fbp: getCookie("_fbp"), fbc: getCookie("_fbc") };
}

/** Lidsky čitelný zdroj leadu pro e-mail Vojtovi (např. "google / cpc / barber-praha"). */
export function utmSummary(): string {
  const u = getUtm();
  if (!u.utm_source && !u.gclid && !u.fbclid) return "přímý / neznámý";
  const parts = [u.utm_source, u.utm_medium, u.utm_campaign].filter(Boolean);
  const clicks = [u.gclid && "gclid", u.fbclid && "fbclid"].filter(Boolean);
  return [parts.join(" / "), clicks.length ? `(${clicks.join(",")})` : ""].filter(Boolean).join(" ") || "přímý / neznámý";
}

/**
 * Konverze: pošle událost do GA4 + Meta Pixel + Google Ads + Sklik naráz. Volat po úspěšném odeslání.
 * user (e-mail/telefon) zapne Enhanced Conversions (Google) a advanced matching (Meta) — obojí
 * si hodnoty samo hashuje, surové se posílají jen přes HTTPS. Respektuje consent (ad_user_data).
 */
export function trackLead(kind: "form" | "booking", user?: { email?: string; phone?: string }, eventId?: string): void {
  try {
    const w = window as unknown as { gtag?: Gtag; fbq?: Fbq; sklik?: { conversion?: SklikConv } };
    const email = user?.email?.trim().toLowerCase() || "";
    const phone = user?.phone?.replace(/[\s()-]/g, "") || "";

    // Enhanced Conversions (Google) + advanced matching (Meta)
    if (email || phone) {
      const ud: Record<string, string> = {};
      if (email) ud.email = email;
      if (phone) ud.phone_number = phone;
      w.gtag?.("set", "user_data", ud);
      if (META_PIXEL_ID) {
        const am: Record<string, string> = {};
        if (email) am.em = email;
        if (phone) am.ph = phone;
        w.fbq?.("init", META_PIXEL_ID, am); // Meta merge advanced matching dat
      }
    }

    // GA4 — standardní událost pro leady
    w.gtag?.("event", "generate_lead", { method: kind });
    // Google Ads konverze (jen když je vyplněné vlastní ID i label)
    if (ADS_ID && ADS_LEAD_LABEL) {
      w.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
    }
    // Meta Pixel — standardní událost Lead (eventID = dedup se server CAPI)
    w.fbq?.("track", "Lead", { content_name: kind }, eventId ? { eventID: eventId } : undefined);
    // Seznam Sklik konverze (respektuje consent přes ad_storage)
    if (SKLIK_ID && w.sklik?.conversion) {
      w.sklik.conversion({ id: Number(SKLIK_ID), consent: 1 });
    }
  } catch {
    /* no-op */
  }
}
