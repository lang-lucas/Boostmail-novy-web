"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// Hero vizuál: slide carousel přes 4 obory (barber/kosmetika/autoservis/wellness).
// Fotky se posouvají do strany, auto-advance, klikací tečky. Respektuje prefers-reduced-motion.

const SLIDES = [
  { img: "/hero/barber.jpg", label: "Barbershop" },
  { img: "/hero/beauty.jpg", label: "Kosmetika" },
  { img: "/hero/auto.jpg", label: "Autoservis" },
  { img: "/hero/wellness.jpg", label: "Wellness" },
];

export function HeroShowcase({ style = {} }: { style?: CSSProperties }) {
  const n = SLIDES.length;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((p) => (p + 1) % n), 3600);
    return () => clearTimeout(t);
  }, [i, n]);

  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 480, aspectRatio: "4 / 3",
      borderRadius: 20, overflow: "hidden", background: "#e9edf6",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 14px 44px -20px rgba(26,90,218,0.22), 0 2px 8px rgba(0,0,0,0.04)",
      ...style,
    }}>
      <div style={{
        display: "flex", width: `${n * 100}%`, height: "100%",
        transform: `translateX(-${i * (100 / n)}%)`,
        transition: "transform .7s cubic-bezier(.4,0,.2,1)",
      }}>
        {SLIDES.map((s) => (
          <div key={s.label} style={{ position: "relative", width: `${100 / n}%`, height: "100%" }}>
            <Image
              src={s.img}
              alt={`${s.label} · BoostMail`}
              fill
              sizes="(max-width: 1000px) 90vw, 480px"
              style={{ objectFit: "cover" }}
              priority
            />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,0.5) 100%)" }} />
            <div style={{
              position: "absolute", left: 16, bottom: 16, display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 14px", borderRadius: 999, background: "rgba(10,10,10,0.5)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              color: "#fff", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, fontWeight: 600, letterSpacing: 0.6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a5ada", display: "inline-block" }} />
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", right: 16, bottom: 20, display: "flex", gap: 7, zIndex: 2 }}>
        {SLIDES.map((s, idx) => (
          <button
            key={s.label}
            onClick={() => setI(idx)}
            aria-label={`Zobrazit ${s.label}`}
            style={{
              width: idx === i ? 22 : 7, height: 7, borderRadius: 999, border: "none", padding: 0, cursor: "pointer",
              background: idx === i ? "#fff" : "rgba(255,255,255,0.5)", transition: "width .3s ease, background .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
