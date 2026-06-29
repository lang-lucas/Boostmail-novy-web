import type { Metadata } from "next";
import { LegalShell, H2 } from "@/components/legal";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: "Jak BoostMail zpracovává osobní údaje.",
};

export default function Page() {
  return (
    <LegalShell title="Ochrana osobních údajů" updated="29. 6. 2026">
      <p>Tyto zásady popisují, jak nakládáme s osobními údaji v souladu s GDPR a českými předpisy.</p>

      <H2>Správce údajů</H2>
      <p>Lukáš Lang, IČO 23915455, neplátce DPH, se sídlem Palackého 1232, Vodňany II, 389 01 Vodňany. Kontakt: <a href="mailto:nerad@boostmail.cz" style={{ color: "#1a5ada" }}>nerad@boostmail.cz</a>, +420 739 192 790.</p>

      <H2>Jaké údaje zpracováváme</H2>
      <p>Kontaktní údaje, které nám sami pošlete přes formulář nebo poptávku (jméno, e-mail, telefon, název provozovny, případně export kontaktů k nezávaznému odhadu). Dále technické údaje a cookies pro anonymní analytiku, kterou můžete vypnout (viz <a href="/cookies" style={{ color: "#1a5ada" }}>zásady cookies</a>).</p>

      <H2>Proč a na jakém základě</H2>
      <p>Údaje používáme, abychom vám odpověděli na poptávku, připravili odhad a poskytli službu (plnění smlouvy a oprávněný zájem). Anonymní analytiku spouštíme ve výchozím stavu pro vylepšení webu; můžete ji kdykoli vypnout.</p>

      <H2>Kdo se k údajům dostane</H2>
      <p>Web běží na hostingu Vercel. Zprávy z formuláře přijímáme do e-mailové schránky. Pro vylepšení webu používáme Google Analytics a Microsoft Clarity (lze vypnout). Údaje nepředáváme nikomu dalšímu a neprodáváme je. Export, který nám pošlete k nezávaznému odhadu, po vyhodnocení mažeme.</p>

      <H2>Jak dlouho</H2>
      <p>Po dobu naší komunikace a případné spolupráce a poté po dobu nutnou podle zákona. Pak údaje smažeme.</p>

      <H2>Vaše práva</H2>
      <p>Máte právo na přístup, opravu, výmaz, omezení zpracování, námitku a přenositelnost. Žádost pošlete na <a href="mailto:nerad@boostmail.cz" style={{ color: "#1a5ada" }}>nerad@boostmail.cz</a>. Stížnost můžete podat u Úřadu pro ochranu osobních údajů (uoou.cz).</p>
    </LegalShell>
  );
}
