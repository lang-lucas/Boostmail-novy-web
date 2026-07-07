import type { Metadata } from "next";
import { PripadovkaMnb } from "@/components/pripadovky/PripadovkaMnb";

const DESC = "Případovka MNB Barbershop (3 pobočky, Praha): přes 300 rezervací navíc a přibližně 180 000 Kč odhadovaného přínosu z retenčních e-mailů. Stav přehledu klienta k 7. 7. 2026, poctivá metodika, náběh v čase.";

export const metadata: Metadata = {
  title: "Případovka MNB Barbershop: přes 300 rezervací navíc z e-mailů",
  description: DESC,
  alternates: { canonical: "/pripadovky" },
  openGraph: {
    type: "article",
    locale: "cs_CZ",
    url: "https://boostmail.cz/pripadovky",
    siteName: "BoostMail",
    title: "MNB Barbershop: přes 300 rezervací navíc a přibližně 180 000 Kč z e-mailů",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BoostMail · případovka MNB Barbershop" }],
  },
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MNB Barbershop: přes 300 rezervací navíc a přibližně 180 000 Kč z retenčních e-mailů",
  description: DESC,
  datePublished: "2026-07-04",
  inLanguage: "cs-CZ",
  author: { "@type": "Organization", name: "BoostMail" },
  publisher: { "@type": "Organization", name: "BoostMail", logo: { "@type": "ImageObject", url: "https://boostmail.cz/assets/boostmail-logo-white.png" } },
  about: "Retenční e-mail marketing pro barbershopy",
  mainEntityOfPage: "https://boostmail.cz/pripadovky",
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "Kolik rezervací navíc e-maily přinesly?", a: "Přehled MNB k 7. 7. 2026 ukazuje přes 300 rezervací navíc po našich kampaních, v přepočtu přibližně 180 000 Kč odhadovaného přínosu. Bereme to z reálného přehledu klienta." },
    { q: "Jak dlouho trvá, než se výsledek projeví?", a: "Náběh je vidět po zhruba 30 dnech, plný efekt nastupuje mezi 60. a 90. dnem. První měsíc je zahřívání." },
    { q: "Kolik to stojí?", a: "Nasazení od 15 000 Kč, měsíční provoz podle velikosti databáze." },
    { q: "Pro koho to funguje?", a: "Pro barbershopy se zaběhnutou databází (stovky klientů a více) a rezervačním systémem. U MNB to byl Reservanto a SmartEmailing." },
  ].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <PripadovkaMnb />
    </>
  );
}
