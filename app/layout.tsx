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
    default: "BoostMail — e-mail marketing pro barbershopy a kosmetiku",
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
    title: "BoostMail — aby se vám zákazníci vraceli",
    description: DESC,
  },
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BoostMail",
  url: SITE,
  description: DESC,
  email: "nerad@boostmail.cz",
  telephone: "+420739192790",
  address: { "@type": "PostalAddress", streetAddress: "Palackého 1232", addressLocality: "Vodňany", postalCode: "389 01", addressCountry: "CZ" },
  founder: [
    { "@type": "Person", name: "Lukáš Lang" },
    { "@type": "Person", name: "Vojtěch Nerad" },
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
