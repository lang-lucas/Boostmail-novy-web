import type { Metadata } from "next";
import { LegalShell, H2 } from "@/components/legal";

export const metadata: Metadata = {
  title: "Zásady používání cookies",
  description: "Jaké cookies BoostMail používá a jak je spravovat.",
};

export default function Page() {
  return (
    <LegalShell title="Zásady používání cookies" updated="29. 6. 2026">
      <p>Cookies jsou malé soubory, které web ukládá do vašeho prohlížeče. Analytické a reklamní cookies běží ve výchozím stavu; můžete je kdykoli odmítnout.</p>

      <H2>Nezbytné cookies</H2>
      <p>Potřebné k základnímu fungování webu a k zapamatování vaší volby. Běží vždy, není k nim potřeba souhlas.</p>

      <H2>Analytické cookies</H2>
      <p><strong>Google Analytics 4</strong> (ID G-LR5VFLP6C9): anonymizované statistiky návštěvnosti. Běží v režimu Google Consent Mode; pokud je odmítnete, neukládá cookies ani identifikátory.</p>
      <p><strong>Microsoft Clarity</strong>: anonymizované statistiky chování pro vylepšení webu. Načítá se ve výchozím stavu; po odmítnutí se při dalších návštěvách nenačítá.</p>

      <H2>Reklamní cookies</H2>
      <p>Používáme je k měření konverzí z reklamy a k remarketingu. Běží ve výchozím stavu; po odmítnutí se nenačítají (u Googlu přes režim Consent Mode).</p>
      <p><strong>Meta Pixel</strong> (Facebook a Instagram), <strong>Google Ads</strong> a <strong>Seznam Sklik</strong>: měří, kdy z reklamy vznikne poptávka, a umožňují znovu oslovit návštěvníky, kteří web navštívili.</p>
      <p>Nepoužíváme Google Tag Manager — měření máme přímo v kódu webu.</p>

      <H2>Jak cookies odmítnout</H2>
      <p>Při první návštěvě se zobrazí lišta, kde cookies přijmete nebo odmítnete. Volbu můžete kdykoli změnit přes odkaz <strong>„Nastavení cookies"</strong> v patičce webu, nebo smazáním cookies v prohlížeči.</p>

      <H2>Správce</H2>
      <p>Lukáš Lang, IČO 23915455, <a href="mailto:nerad@boostmail.cz" style={{ color: "#1a5ada" }}>nerad@boostmail.cz</a>. Více v <a href="/ochrana-udaju" style={{ color: "#1a5ada" }}>zásadách ochrany osobních údajů</a>.</p>
    </LegalShell>
  );
}
