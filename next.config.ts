import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /termin/ je proxy na samostatný statický deploy SK rezervace hovoru
  // (repo nerad-v/boostmail-rezervacia, projekt boostmail-rezervacia).
  // Ta stránka linkuje css/js/obrázky relativně, takže musí běžet na URL s koncovým
  // lomítkem — jinak by si je hledala na rootu boostmail.cz a nenašla je.
  // Next by lomítko sám strhnul, tak mu to bereme a strhávání si obstaráme
  // vlastním redirectem níž — pro všechno kromě /termin zůstává chování stejné.
  skipTrailingSlashRedirect: true,

  // Staré prototypové stránky (jiný design + staré „Poslat export" CTA) byly zrušeny.
  // Přesměrováváme je na nový web, ať staré odkazy nekončí na zastaralém obsahu / 404.
  async redirects() {
    return [
      { source: "/kontakt", destination: "/#final-demo", permanent: true },
      { source: "/cenik", destination: "/#faq", permanent: true },
      { source: "/reseni", destination: "/#pro-koho", permanent: true },
      { source: "/reseni-beauty", destination: "/reseni-kosmetika", permanent: true },
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

      // Kampaňový odkaz bez lomítka doženeme na verzi s lomítkem (kvůli relativním cestám).
      // `$` v regexu je nutné: bez něj zdroj „/termin" matchuje i „/termin/" a vznikne smyčka.
      { source: "/:t(termin$)", destination: "/termin/", permanent: false },
      // Náhrada za vypnuté skipTrailingSlashRedirect: /neco/ → /neco, mimo /termin.
      { source: "/:path((?!termin).*)/", destination: "/:path", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Pitch deck (interní proxy, zachováno)
      { source: "/prezentace", destination: "https://boostmail-pitch-deck.vercel.app/" },
      { source: "/prezentace/:path*", destination: "https://boostmail-pitch-deck.vercel.app/:path*" },

      // SK rezervace hovoru (statický deploy, Vojtovo repo)
      { source: "/termin/:path*", destination: "https://boostmail-rezervacia.vercel.app/:path*" },
    ];
  },
};

export default nextConfig;
