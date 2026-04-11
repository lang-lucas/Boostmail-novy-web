import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail | Retenční marketing na autopilotu",
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
    <html lang="cs" className={inter.variable}>
      <body className="font-sans antialiased">
        <ReadingProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
