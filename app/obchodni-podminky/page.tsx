import type { Metadata } from "next";
import { LegalShell, H2 } from "@/components/legal";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: "Základní obchodní podmínky služby BoostMail.",
};

export default function Page() {
  return (
    <LegalShell title="Obchodní podmínky" updated="29. 6. 2026">
      <p>Základní podmínky poskytování služeb BoostMail. Konkrétní rozsah a cena se sjednávají individuálně ve smlouvě nebo nabídce.</p>

      <H2>Poskytovatel</H2>
      <p>Lukáš Lang, IČO 23915455, neplátce DPH, se sídlem Palackého 1232, Vodňany II, 389 01 Vodňany. Kontakt: <a href="mailto:nerad@boostmail.cz" style={{ color: "#1a5ada" }}>nerad@boostmail.cz</a>, +420 739 192 790.</p>

      <H2>Předmět služby</H2>
      <p>Nastavení a provoz e-mailové a marketingové automatizace pro lokální provozovny (napojení na rezervační systém, příprava a rozesílání kampaní, vyhodnocování dat a doporučení). Orientačně: jednorázové nastavení od 15 000 Kč, měsíční péče od 5 000 Kč podle velikosti databáze. Bez podílu na tržbách.</p>

      <H2>Platební podmínky</H2>
      <p>Cena a splatnost se sjednávají v nabídce nebo smlouvě, obvykle fakturou. Poskytovatel je neplátce DPH.</p>

      <H2>Mlčenlivost a data</H2>
      <p>S daty klienta nakládáme důvěrně a v souladu s <a href="/ochrana-udaju" style={{ color: "#1a5ada" }}>ochranou osobních údajů</a>. Klient odpovídá za to, že má souhlas svých zákazníků k oslovení.</p>

      <H2>Ukončení</H2>
      <p>Spolupráce je bez dlouhodobého závazku, není-li sjednáno jinak. Při ukončení předáme klientovi jeho data.</p>

      <p style={{ marginTop: 16, fontSize: 14, color: "rgba(0,0,0,0.55)" }}>Úplné znění podmínek poskytneme na vyžádání. V případě rozporu má přednost individuální smlouva.</p>
    </LegalShell>
  );
}
