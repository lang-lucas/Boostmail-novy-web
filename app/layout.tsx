import type { Metadata } from "next";
import Script from "next/script";
import { inter, spaceGrotesk, jetbrainsMono, instrumentSerif } from "@/lib/fonts";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const SITE = "https://boostmail.cz";
const DESC =
  "Posíláme za vás e-maily, co vracejí zákazníky, sbírají recenze a radí, kde růst. Pro barbershopy, kosmetiku a další lokální služby.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BoostMail · e-mail marketing pro barbershopy a kosmetiku",
    template: "%s | BoostMail",
  },
  description: DESC,
  applicationName: "BoostMail",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE,
    siteName: "BoostMail",
    title: "BoostMail · aby se vám zákazníci vraceli",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BoostMail · e-mail marketing pro lokální provozovny" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoostMail · aby se vám zákazníci vraceli",
    description: DESC,
    images: ["/og.png"],
  },
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#org`,
      name: "BoostMail",
      url: SITE,
      description: DESC,
      email: "nerad@boostmail.cz",
      telephone: "+420739192790",
      priceRange: "Nastavení od 15 000 Kč, péče od 5 000 Kč měsíčně",
      address: { "@type": "PostalAddress", streetAddress: "Palackého 1232", addressLocality: "Vodňany", postalCode: "389 01", addressCountry: "CZ" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      knowsAbout: ["retenční marketing", "e-mail marketing", "marketingová automatizace", "sbírání recenzí", "win-back kampaně", "barbershop", "kosmetika"],
      founder: [
        { "@type": "Person", name: "Lukáš Lang" },
        { "@type": "Person", name: "Vojtěch Nerad" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Služby BoostMail",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retenční e-mail marketing", description: "E-maily a SMS, které vracejí zákazníky a plní kalendář lokálním provozovnám." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatické sbírání recenzí", description: "Žádost o recenzi po návštěvě, víc hodnocení na Googlu samo." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mentor: poradenství z dat", description: "Vyhodnocení dat a konkrétní doporučení, kde a o kolik růst." } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "BoostMail",
      inLanguage: "cs-CZ",
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID || "G-LR5VFLP6C9";
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        {/* Google Consent Mode (opt-out): analytika běží ve výchozím stavu, reklamní úložiště DENIED. Pokud návštěvník měření vypnul (bm-consent=denied), zůstane DENIED. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}var __bm='granted';try{if(localStorage.getItem('bm-consent')==='denied')__bm='denied';}catch(e){}gtag('consent','default',{ad_storage:'denied',analytics_storage:__bm,ad_user_data:'denied',ad_personalization:'denied'});`}
        </Script>
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
        <CookieConsent />
      </body>
    </html>
  );
}
