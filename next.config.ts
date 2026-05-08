import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Homepage — Boostmail.html prototype (handoff bundle)
      { source: "/", destination: "/Boostmail.html" },
      // Subpages — clean URLs map to /pages/*.html prototypes
      { source: "/cenik", destination: "/pages/cenik.html" },
      { source: "/akademie", destination: "/pages/akademie.html" },
      { source: "/jak-pracujeme", destination: "/pages/jak-pracujeme.html" },
      { source: "/kontakt", destination: "/pages/kontakt.html" },
      { source: "/o-nas", destination: "/pages/o-nas.html" },
      { source: "/pripadovky", destination: "/pages/pripadovky.html" },
      { source: "/reseni", destination: "/pages/reseni.html" },
    ];
  },
};

export default nextConfig;
