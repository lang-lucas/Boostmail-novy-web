import type { Metadata } from "next";
import { PripadovkaMnb } from "@/components/pripadovky/PripadovkaMnb";

const DESC = "Případovka MNB Barbershop (3 pobočky, Praha): 247 rezervací navíc a 145 500 Kč přínosu z retenčních e-mailů za pět měsíců. Reálná čísla z dashboardu, poctivá metodika, náběh v čase.";

export const metadata: Metadata = {
  title: "Případovka MNB Barbershop: 247 rezervací navíc z e-mailů",
  description: DESC,
  alternates: { canonical: "/pripadovky" },
  openGraph: {
    type: "article",
    locale: "cs_CZ",
    url: "https://boostmail.cz/pripadovky",
    siteName: "BoostMail",
    title: "MNB Barbershop: 247 rezervací navíc a 145 500 Kč z e-mailů",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BoostMail · případovka MNB Barbershop" }],
  },
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MNB Barbershop: 247 rezervací navíc a 145 500 Kč z retenčních e-mailů",
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
    { q: "Kolik rezervací navíc e-maily přinesly?", a: "247 rezervací navíc za zhruba pět měsíců, v přepočtu 145 500 Kč ověřeného přínosu z reálného přehledu klienta." },
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
