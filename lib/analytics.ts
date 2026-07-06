// Načtení měřicích skriptů (opt-out model — běží ve výchozím stavu, návštěvník je může vypnout).
// GA4 + reklamní úložiště jedou přes Google Consent Mode (default granted v layout.tsx).
// Clarity a Meta Pixel Consent Mode nerespektují, proto je injektujeme tady a nenačítáme,
// pokud návštěvník měření vypnul (bm-consent=denied).

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "x05llkokxh";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID; // Meta Pixel / Dataset ID

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...a: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

export function loadConsentedScripts() {
  if (typeof window === "undefined") return;
  loadClarity();
  loadMetaPixel();
}

type ClarityFn = ((...a: unknown[]) => void) & { q?: unknown[] };

function loadClarity() {
  const w = window as unknown as { __bmClarity?: boolean; clarity?: ClarityFn };
  if (w.__bmClarity) return;
  w.__bmClarity = true;
  // Oficiální Clarity snippet: nejdřív queue funkce (window.clarity), pak tag.
  // Bez té queue funkce se tag načte, ale relace se nenahrávají.
  if (!w.clarity) {
    const fn = function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    } as ClarityFn;
    w.clarity = fn;
  }
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
  const first = document.getElementsByTagName("script")[0];
  if (first && first.parentNode) first.parentNode.insertBefore(t, first);
  else document.head.appendChild(t);
}

function loadMetaPixel() {
  if (!META_PIXEL_ID) return; // dokud není ID, nic se nenačítá
  const w = window as unknown as { __bmPixel?: boolean; fbq?: FbqFn; _fbq?: FbqFn };
  if (w.__bmPixel) return;
  w.__bmPixel = true;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue!.push(args);
  } as FbqFn;
  w.fbq = n;
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(t);
  n("init", META_PIXEL_ID);
  n("track", "PageView");
}
