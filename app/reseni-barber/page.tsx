import type { Metadata } from "next";
import { ReseniBarber } from "@/components/reseni/ReseniBarber";

const DESC = "Retenční e-mail marketing pro barbershopy. Vrátíme stálého klienta ve správný týden, zaplníme volná okna a sebereme recenze. Připomínka v cyklu střihu, reaktivace spících, naplnění oken. Reálné výsledky: MNB přes 300 rezervací navíc.";

export const metadata: Metadata = {
  title: "Retence pro barbershopy: stálí klienti zpátky v křesle",
  description: DESC,
  alternates: { canonical: "/reseni-barber" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://boostmail.cz/reseni-barber",
    siteName: "BoostMail",
    title: "BoostMail · Retence pro barbershopy",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BoostMail · retence pro barbershopy" }],
  },
};

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Retenční e-mail marketing pro barbershopy",
  provider: { "@type": "Organization", name: "BoostMail", url: "https://boostmail.cz" },
  areaServed: { "@type": "Country", name: "Česko" },
  audience: { "@type": "Audience", audienceType: "Barbershopy" },
  description: DESC,
  url: "https://boostmail.cz/reseni-barber",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <ReseniBarber />
    </>
  );
}
