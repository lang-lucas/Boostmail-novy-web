import type { Metadata } from "next";
import { LegalShell, H2 } from "@/components/legal";

export const metadata: Metadata = {
  title: "Zásady používání cookies",
  description: "Jaké cookies BoostMail používá a jak je spravovat.",
};

export default function Page() {
  return (
    <LegalShell title="Zásady používání cookies" updated="29. 6. 2026">
      <p>Cookies jsou malé soubory, které web ukládá do vašeho prohlížeče. Analytické cookies běží ve výchozím stavu, abychom web vylepšovali; můžete je kdykoli vypnout.</p>

      <H2>Nezbytné cookies</H2>
      <p>Potřebné k základnímu fungování webu a k zapamatování vaší volby. Běží vždy, není k nim potřeba souhlas.</p>

      <H2>Analytické a měřicí</H2>
      <p><strong>Google Analytics 4</strong> (ID G-LR5VFLP6C9) — anonymizované statistiky návštěvnosti. Běží v režimu Google Consent Mode; pokud měření vypnete, neukládá cookies ani identifikátory.</p>
      <p><strong>Microsoft Clarity</strong> — anonymizované heatmapy a přehrávky relací pro vylepšení webu. Načítá se ve výchozím stavu; po vypnutí měření se při dalších návštěvách nenačítá.</p>
      <p>Nepoužíváme reklamní cookies (Google Ads, Meta) ani Google Tag Manager.</p>

      <H2>Jak měření vypnout</H2>
      <p>Při první návštěvě se zobrazí lišta, kde můžete měření vypnout. Volbu můžete kdykoli změnit přes odkaz <strong>„Nastavení cookies"</strong> v patičce webu, nebo smazáním cookies v prohlížeči.</p>

      <H2>Správce</H2>
      <p>Lukáš Lang, IČO 23915455, <a href="mailto:nerad@boostmail.cz" style={{ color: "#1a5ada" }}>nerad@boostmail.cz</a>. Více v <a href="/ochrana-udaju" style={{ color: "#1a5ada" }}>zásadách ochrany osobních údajů</a>.</p>
    </LegalShell>
  );
}
