import type { MetadataRoute } from "next";

const SITE = "https://boostmail.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/reseni-kosmetika`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/ochrana-udaju`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
