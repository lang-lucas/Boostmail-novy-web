import type { Metadata } from "next";
import { LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Případovky",
  description: "Připravujeme.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalShell title="Případovky" updated="29. 6. 2026">
      <p>Připravujeme detailní případovky z reálných provozoven. Zatím nejsilnější čísla najdete přímo na homepage v sekci Důkaz.</p>
      <p>Chcete vědět, kolik vám e-maily přinesou? Pošlete nám export a spočítáme to na vašich datech.</p>
    </LegalShell>
  );
}
