import Link from "next/link";
import { ConsentReopenButton } from "@/components/cookie-consent";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#f4f4f4", color: "#0a0a0a", minHeight: "100vh", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>
      <nav style={{ padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(244,244,244,0.85)", backdropFilter: "blur(12px)" }}>
        <Link href="/" aria-label="BoostMail">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/boostmail-logo-black.png" alt="BoostMail" style={{ height: 28, display: "block" }} />
        </Link>
      </nav>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 8px", lineHeight: 1.05 }}>{title}</h1>
        <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: 1, color: "rgba(0,0,0,0.5)", marginBottom: 32 }}>AKTUALIZOVÁNO {updated}</div>
        <div className="legal-prose" style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(0,0,0,0.8)" }}>{children}</div>
        <p style={{ marginTop: 48, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/" style={{ color: "#1a5ada", fontWeight: 600, textDecoration: "none" }}>← Zpět na boostmail.cz</Link>
          <ConsentReopenButton />
        </p>
      </main>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 10px" }}>{children}</h2>;
}
