// Načtení analytických skriptů (opt-out model — běží ve výchozím stavu, návštěvník je může vypnout).
// GA4 jede přes Google Consent Mode (default granted pro analytics v layout.tsx). Clarity Consent Mode
// nerespektuje, proto ho injektujeme tady a nenačítáme, pokud návštěvník měření vypnul.

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "x05llkokxh";

export function loadConsentedScripts() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __bmClarity?: boolean };
  if (w.__bmClarity) return;
  w.__bmClarity = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
  document.head.appendChild(s);
}
