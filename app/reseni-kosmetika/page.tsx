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

export default function Page() {
  return <ReseniKosmetika />;
}
