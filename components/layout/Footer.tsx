import Link from "next/link";
import { siteConfig, navLinks, footerAbout } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="mb-4 font-heading text-xl">{siteConfig.name}</div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {footerAbout}
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="mb-4 text-sm font-medium text-text-muted uppercase">
              Navigace
            </div>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-4 text-sm font-medium text-text-muted uppercase">
              Kontakt
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Všechna práva
          vyhrazena.
        </div>
      </div>
    </footer>
  );
}
