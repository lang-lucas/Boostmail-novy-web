"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="BoostMail"
            width={140}
            height={26}
            className="h-6 w-auto opacity-90 transition-opacity duration-200 hover:opacity-100"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt" className="ghost-button text-sm">
            <span>Chci konzultaci zdarma</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-black/95 px-6 py-8 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm text-text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setIsOpen(false)}
            className="neon-button mt-4 w-full justify-center text-sm"
          >
            Chci konzultaci zdarma
          </Link>
        </div>
      )}
    </header>
  );
}
