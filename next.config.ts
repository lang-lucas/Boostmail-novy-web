import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Staré prototypové stránky (jiný design + staré „Poslat export" CTA) byly zrušeny.
  // Přesměrováváme je na nový web, ať staré odkazy nekončí na zastaralém obsahu / 404.
  async redirects() {
    return [
      { source: "/kontakt", destination: "/#final-demo", permanent: true },
      { source: "/cenik", destination: "/#faq", permanent: true },
      { source: "/reseni", destination: "/#pro-koho", permanent: true },
      { source: "/reseni-barber", destination: "/#pro-koho", permanent: true },
      { source: "/reseni-beauty", destination: "/#pro-koho", permanent: true },
      { source: "/reseni-wellness", destination: "/#pro-koho", permanent: true },
      { source: "/reseni-auto", destination: "/#pro-koho", permanent: true },
      { source: "/o-nas", destination: "/#kontakt", permanent: true },
      { source: "/jak-pracujeme", destination: "/#jak", permanent: true },
      { source: "/akademie", destination: "/", permanent: true },
      { source: "/akademie-clanek", destination: "/", permanent: true },
      { source: "/dekujeme", destination: "/", permanent: true },
      { source: "/pripadovky-barberhaus", destination: "/pripadovky", permanent: true },
      { source: "/pripadovky-mirek", destination: "/pripadovky", permanent: true },
      { source: "/pripadovky-oldschool", destination: "/pripadovky", permanent: true },
      { source: "/pripadovky-sharp", destination: "/pripadovky", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Pitch deck (interní proxy, zachováno)
      { source: "/prezentace", destination: "https://boostmail-pitch-deck.vercel.app/" },
      { source: "/prezentace/:path*", destination: "https://boostmail-pitch-deck.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;
