import type { Metadata } from "next";
import { ReseniKosmetika } from "@/components/reseni/ReseniKosmetika";

const DESC = "Automatický retenční systém pro kosmetické salony. Pozve každou klientku zpět ve správný čas, e-mailem i SMS. Připomínky podle cyklu služby, reaktivace, recenze, sezónní kampaně.";

export const metadata: Metadata = {
  title: "Retence pro kosmetické salony",
  description: DESC,
  alternates: { canonical: "/reseni-kosmetika" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://boostmail.cz/reseni-kosmetika",
    siteName: "BoostMail",
    title: "BoostMail · Retence pro kosmetické salony",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BoostMail · retence pro kosmetické salony" }],
  },
};

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Retenční e-mail marketing pro kosmetické salony",
  provider: { "@type": "Organization", name: "BoostMail", url: "https://boostmail.cz" },
  areaServed: { "@type": "Country", name: "Česko" },
  audience: { "@type": "Audience", audienceType: "Kosmetické salony" },
  description: DESC,
  url: "https://boostmail.cz/reseni-kosmetika",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <ReseniKosmetika />
    </>
  );
}
