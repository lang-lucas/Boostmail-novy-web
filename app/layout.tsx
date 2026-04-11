import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail | Automatický retenční marketing",
    template: "%s | BoostMail",
  },
  description:
    "Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu. Retenční engine pro barbershopy a lokální služby.",
  metadataBase: new URL("https://boostmail.cz"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "BoostMail",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <SmoothScroll>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
