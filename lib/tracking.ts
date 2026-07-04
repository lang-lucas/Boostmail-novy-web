"use client";

// Konverzní a UTM tracking pro reklamy (Meta / Google Ads / Seznam Sklik + GA4).
// IDčka přes env — dokud nejsou vyplněná, příslušné volání je tiché no-op.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // "AW-XXXXXXXXX"
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL; // konverzní label
const SKLIK_ID = process.env.NEXT_PUBLIC_SKLIK_ID; // Sklik retargeting/konverze ID

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

/** Lidsky čitelný zdroj leadu pro e-mail Vojtovi (např. "google / cpc / barber-praha"). */
export function utmSummary(): string {
  const u = getUtm();
  if (!u.utm_source && !u.gclid && !u.fbclid) return "přímý / neznámý";
  const parts = [u.utm_source, u.utm_medium, u.utm_campaign].filter(Boolean);
  const clicks = [u.gclid && "gclid", u.fbclid && "fbclid"].filter(Boolean);
  return [parts.join(" / "), clicks.length ? `(${clicks.join(",")})` : ""].filter(Boolean).join(" ") || "přímý / neznámý";
}

/** Konverze: pošle událost do GA4 + Meta Pixel + Google Ads + Sklik naráz. Volat po úspěšném odeslání. */
export function trackLead(kind: "form" | "booking"): void {
  try {
    const w = window as unknown as { gtag?: Gtag; fbq?: Fbq; sklik?: { conversion?: SklikConv } };
    // GA4 — standardní událost pro leady
    w.gtag?.("event", "generate_lead", { method: kind });
    // Google Ads konverze (jen když je vyplněné ID i label)
    if (ADS_ID && ADS_LEAD_LABEL) {
      w.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
    }
    // Meta Pixel — standardní událost Lead
    w.fbq?.("track", "Lead", { content_name: kind });
    // Seznam Sklik konverze (respektuje consent přes ad_storage)
    if (SKLIK_ID && w.sklik?.conversion) {
      w.sklik.conversion({ id: Number(SKLIK_ID), consent: 1 });
    }
  } catch {
    /* no-op */
  }
}
