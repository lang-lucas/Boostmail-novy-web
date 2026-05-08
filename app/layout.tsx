import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail",
    template: "%s | BoostMail",
  },
  description: "BoostMail — retenční marketing na autopilotu.",
  metadataBase: new URL("https://boostmail.cz"),
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
