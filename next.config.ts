import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Homepage nyní servíruje app/page.tsx (Next.js SSR). Rewrite zrušen.

      // Top-level pages (zatím staré prototypy, postupně přepíšeme)
      { source: "/cenik", destination: "/pages/cenik.html" },
      { source: "/akademie", destination: "/pages/akademie.html" },
      { source: "/akademie-clanek", destination: "/pages/akademie-clanek.html" },
      { source: "/jak-pracujeme", destination: "/pages/jak-pracujeme.html" },
      { source: "/kontakt", destination: "/pages/kontakt.html" },
      { source: "/o-nas", destination: "/pages/o-nas.html" },
      { source: "/dekujeme", destination: "/pages/dekujeme.html" },

      // Solutions
      { source: "/reseni", destination: "/pages/reseni.html" },
      { source: "/reseni-barber", destination: "/pages/reseni-barber.html" },
      { source: "/reseni-beauty", destination: "/pages/reseni-beauty.html" },
      { source: "/reseni-wellness", destination: "/pages/reseni-wellness.html" },
      { source: "/reseni-auto", destination: "/pages/reseni-auto.html" },

      // Case studies (/pripadovky nyní servíruje app/pripadovky)
      { source: "/pripadovky-barberhaus", destination: "/pages/pripadovky-barberhaus.html" },
      { source: "/pripadovky-mirek", destination: "/pages/pripadovky-mirek.html" },
      { source: "/pripadovky-oldschool", destination: "/pages/pripadovky-oldschool.html" },
      { source: "/pripadovky-sharp", destination: "/pages/pripadovky-sharp.html" },

      // Legal stránky nyní servíruje app/ (ochrana-udaju, cookies, obchodni-podminky).

      // External proxies (preserved from earlier branches)
      {
        source: "/prezentace",
        destination: "https://boostmail-pitch-deck.vercel.app/",
      },
      {
        source: "/prezentace/:path*",
        destination: "https://boostmail-pitch-deck.vercel.app/:path*",
      },
      {
        source: "/royal-barbershop",
        destination: "https://boostmail-royal-vysledky.vercel.app/",
      },
    ];
  },
};

export default nextConfig;
