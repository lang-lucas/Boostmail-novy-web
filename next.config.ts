import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Homepage — Boostmail.html prototype (handoff bundle)
      { source: "/", destination: "/Boostmail.html" },

      // Top-level pages
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

      // Case studies
      { source: "/pripadovky", destination: "/pages/pripadovky.html" },
      { source: "/pripadovky-barberhaus", destination: "/pages/pripadovky-barberhaus.html" },
      { source: "/pripadovky-mirek", destination: "/pages/pripadovky-mirek.html" },
      { source: "/pripadovky-oldschool", destination: "/pages/pripadovky-oldschool.html" },
      { source: "/pripadovky-sharp", destination: "/pages/pripadovky-sharp.html" },

      // Legal
      { source: "/gdpr", destination: "/pages/gdpr.html" },
      { source: "/cookies", destination: "/pages/cookies.html" },
      { source: "/obchodni-podminky", destination: "/pages/obchodni-podminky.html" },

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
