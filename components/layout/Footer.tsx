import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="px-5 py-8 sm:px-8">
      <div className="gradient-divider mb-8 w-full" />
      <div className="mx-auto max-w-6xl text-center">
        <p className="whitespace-pre-line text-sm text-text-dimmed">
          © {new Date().getFullYear()} {siteConfig.name}. Všechna práva vyhrazena.{"\n"}
          Provozovatel: Lukáš Lang IČO: 23915455 Sídlo: okres Strakonice
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 inline-block text-xs text-text-muted transition-colors hover:text-white"
        >
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
