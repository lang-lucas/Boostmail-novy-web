# BoostMail Web — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build BoostMail agency website — 5-page Next.js site replacing Webflow, deployed on Vercel.

**Architecture:** Next.js 16 App Router with Server Components by default. Tailwind CSS 4 for styling. GSAP + Framer Motion for animations, Lenis for smooth scroll. Content hardcoded (no CMS). Contact form via Resend server action.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, GSAP + ScrollTrigger, Lenis, Resend, Vercel

---

## File Structure

```
boostmail-web/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, Navbar, Footer, Lenis
│   ├── page.tsx                      # Home — assembles all home sections
│   ├── pro-barbershopy/page.tsx      # Barbershop vertical
│   ├── pripadova-studie/page.tsx     # Case study — Nextlevel
│   ├── kontakt/page.tsx              # Contact form
│   ├── kontakt/action.ts             # Server action for form submission
│   ├── pro-kliniky/page.tsx          # Coming soon — clinics
│   └── pro-kosmeticky/page.tsx       # Coming soon — cosmetics
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Sticky navbar with mobile menu
│   │   └── Footer.tsx                # Footer with about blurb + links
│   ├── sections/
│   │   ├── Hero.tsx                  # Home hero
│   │   ├── SocialProof.tsx           # Animated metric counters
│   │   ├── HowItWorks.tsx            # 3-step cards
│   │   ├── Timeline.tsx              # Cancel→email→booking animation
│   │   ├── DashboardPreview.tsx      # Stylized metrics showcase
│   │   ├── Comparison.tsx            # BoostMail vs others table
│   │   └── CTASection.tsx            # Bottom CTA with form link
│   ├── ui/
│   │   ├── Button.tsx                # Primary/secondary button variants
│   │   ├── MetricCounter.tsx         # Animated number counter
│   │   ├── StepCard.tsx              # Icon + title + desc card
│   │   └── SectionReveal.tsx         # Framer Motion whileInView wrapper
│   └── pages/
│       ├── BarberHero.tsx            # Barbershop page hero
│       ├── PainPoints.tsx            # Barbershop pain point cards
│       ├── CampaignGrid.tsx          # 9 campaigns visual grid
│       ├── CaseStudyTeaser.tsx       # Metrics preview + link
│       └── ComingSoonPage.tsx        # Shared coming soon template
├── lib/
│   ├── fonts.ts                      # next/font Inter + Instrument Serif
│   └── data.ts                       # All content/metrics as typed constants
├── styles/
│   └── globals.css                   # Tailwind 4 @import, @theme inline, custom styles
├── public/
│   └── images/                       # Logos, icons, OG images
├── .env.local                        # RESEND_API_KEY (user provides)
├── next.config.ts
├── tailwind.config.ts                # (not needed for TW4 — config in globals.css)
├── tsconfig.json
├── package.json
└── docs/
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `styles/globals.css`, `lib/fonts.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
```

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
npm install framer-motion gsap @gsap/react lenis resend
npm install -D @types/node
```

- [ ] **Step 3: Configure Tailwind CSS 4 globals.css**

Replace `styles/globals.css` (or `app/globals.css` depending on scaffold output) with:

```css
@import "tailwindcss";

@theme inline {
  --color-brand: #398FFF;
  --color-brand-dark: #2B6FCC;
  --color-brand-light: #5EAAFF;
  --color-surface: #0A0A0A;
  --color-surface-light: #141414;
  --color-surface-card: #1A1A1A;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0A0;
  --color-text-muted: #666666;
  --color-accent: #398FFF;
  --color-cta: #398FFF;
  --color-cta-hover: #2B6FCC;
  --font-heading: "Instrument Serif", serif;
  --font-body: "Inter", sans-serif;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--color-brand);
  color: white;
}
```

- [ ] **Step 4: Configure fonts in lib/fonts.ts**

```typescript
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});
```

Note: Download Instrument Serif font files from Google Fonts and place in `public/fonts/`. If unavailable as local files, switch to `next/font/google`:

```typescript
import { Instrument_Serif } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});
```

- [ ] **Step 5: Set up root layout**

Create/replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail | Automatický retenční marketing",
    template: "%s | BoostMail",
  },
  description:
    "Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu. Retenční engine pro barbershopy a lokální služby.",
  metadataBase: new URL("https://boostmail.cz"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "BoostMail",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
npm run dev
```

Expected: Dev server starts on `localhost:3000` without errors.

- [ ] **Step 7: Initialize git and commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git init
echo "node_modules/\n.next/\n.env.local\n.DS_Store" > .gitignore
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind 4, fonts, and base config"
```

---

### Task 2: Content Data Module

**Files:**
- Create: `lib/data.ts`

All hardcoded content lives here — single source of truth, easy for AI to edit.

- [ ] **Step 1: Create lib/data.ts with all site content**

```typescript
export const siteConfig = {
  name: "BoostMail",
  email: "nerad@boostmail.cz",
  url: "https://boostmail.cz",
} as const;

export const heroContent = {
  headline: "Vaši zákazníci se vrací.",
  headlineAccent: "Automaticky.",
  subheadline:
    "Napojíme se na váš rezervační systém a automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu.",
  cta: "Zjistit víc",
  ctaHref: "#jak-to-funguje",
} as const;

export const metrics = [
  { value: 58, suffix: "", label: "prokazaných konverzí" },
  { value: 45792, suffix: " Kč", label: "extra tržby" },
  { value: 28.6, suffix: "%", label: "open rate" },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "Napojíme se",
    description: "Propojíme váš Reservio, Reservanto nebo MyFox. Žádné složité nastavování.",
  },
  {
    step: 2,
    title: "Systém běží",
    description: "9 automatických kampaní pracuje 24/7. Vy stříháte, my posíláme.",
  },
  {
    step: 3,
    title: "Zákazníci se vrací",
    description: "Reálné bookingy, měřitelné výsledky. Každou korunu dokazujeme.",
  },
] as const;

export const timelineEvents = [
  { time: "15:03", label: "Zákazník zruší termín" },
  { time: "15:05", label: "Email 5 čekajícím zákazníkům" },
  { time: "15:47", label: "Nový zákazník si zarezervuje" },
] as const;

export const comparisonData = {
  headers: ["", "BoostMail", "Mailchimp / Ecomailer", "Klasická agentura"],
  rows: [
    { feature: "Plný autopilot", boostmail: true, tool: false, agency: false },
    { feature: "Event-driven (minuty)", boostmail: true, tool: false, agency: false },
    { feature: "Dokazatelný ROI", boostmail: true, tool: false, agency: false },
    { feature: "GDPR out-of-the-box", boostmail: true, tool: false, agency: false },
    { feature: "Hands-off provoz", boostmail: true, tool: false, agency: false },
    { feature: "Per-barber personalizace", boostmail: true, tool: false, agency: false },
  ],
} as const;

export const campaigns = [
  { name: "Welcome", trigger: "Nová rezervace", description: "Uvítací email 1h po první návštěvě" },
  { name: "Doporučení", trigger: "Pravidelný interval", description: "Připomínka střihu ve správný čas" },
  { name: "Reaktivace", trigger: "90+ dní neaktivní", description: "Vrátíme zákazníky, co přestali chodit" },
  { name: "Zrušený termín", trigger: "Real-time", description: "Okamžité oslovení 5 čekajících" },
  { name: "PostCare", trigger: "Den 1–2 po návštěvě", description: "Jak dopadl střih? 4 varianty" },
  { name: "Follow-up", trigger: "Den 12–13", description: "Sleva na příští návštěvu" },
  { name: "Last Minute", trigger: "Volné sloty", description: "Díry v rozvrhu → osloví zákazníky" },
  { name: "Přeobjednání", trigger: "Po zrušení", description: "Chceš se přeobjednat na jiný termín?" },
  { name: "Popup", trigger: "Lead z webu", description: "Promo kód pro nového návštěvníka" },
] as const;

export const painPoints = [
  {
    title: "Zákazník přestal chodit",
    description: "A nikdo si toho nevšiml. My ho automaticky vrátíme.",
  },
  {
    title: "Zrušený termín = ztráta",
    description: "Za 2 minuty oslovíme 5 čekajících zákazníků.",
  },
  {
    title: "Nemáte čas na marketing",
    description: "9 kampaní běží samo. Vy se věnujete zákazníkům.",
  },
  {
    title: "Newsletter, co nikdo nečte",
    description: "Posíláme ve správný čas správnému člověku. 28.6% open rate.",
  },
] as const;

export const caseStudy = {
  client: "Nextlevel Barbershop",
  period: "30 dní",
  metrics: {
    emailsSent: 878,
    openRate: 28.6,
    clickRate: 2.1,
    conversions: 58,
    revenue: 45792,
    reactivated: 7,
    savedSlots: 51,
  },
  barbers: [
    { name: "Lukáš", conversions: 17, revenue: 14283, emails: 167, openRate: 31.1, clickRate: 3.0 },
    { name: "Michal", conversions: 14, revenue: 10886, emails: 162, openRate: 26.5, clickRate: 3.1 },
    { name: "Waiting List", conversions: 7, revenue: 5043, emails: 31, openRate: 25.8, clickRate: 0.0 },
    { name: "Denis", conversions: 6, revenue: 4744, emails: 221, openRate: 22.6, clickRate: 1.8 },
    { name: "Adam", conversions: 6, revenue: 4494, emails: 172, openRate: 37.2, clickRate: 0.0 },
    { name: "Luboš", conversions: 5, revenue: 4095, emails: 64, openRate: 34.4, clickRate: 3.1 },
    { name: "Emre", conversions: 3, revenue: 2247, emails: 125, openRate: 28.0, clickRate: 1.6 },
  ],
  campaignBreakdown: [
    { name: "Doporučení", sent: 155, openRate: 22, clickRate: 2 },
    { name: "Reaktivace", sent: 284, openRate: 26, clickRate: 2 },
    { name: "PostCare", sent: 162, openRate: 37, clickRate: 2 },
    { name: "Nextlevel", sent: 195, openRate: 28, clickRate: 1 },
    { name: "Nabídka termínu", sent: 58, openRate: 33, clickRate: 9 },
    { name: "Last Minute", sent: 12, openRate: 33, clickRate: 0 },
    { name: "Přeobjednání", sent: 12, openRate: 42, clickRate: 0 },
  ],
} as const;

export const comingSoonPages = {
  kliniky: {
    title: "Pro kliniky",
    headline: "Brzy spustíme řešení pro kliniky",
    description: "Automatické připomínky kontrol, follow-up po zákrocích a zaplňování zrušených termínů.",
    features: [
      "Připomínky pravidelných kontrol",
      "Follow-up péče po zákrocích",
      "Zaplňování zrušených termínů",
      "GDPR compliance pro zdravotnictví",
    ],
  },
  kosmeticky: {
    title: "Pro kosmetičky",
    headline: "Brzy spustíme řešení pro kosmetické salóny",
    description: "Automatické vracení klientek, sezónní nabídky a péče po ošetření.",
    features: [
      "Připomínky opakovaných ošetření",
      "Sezónní nabídky a novinky",
      "Péče po ošetření",
      "Zaplňování volných termínů",
    ],
  },
} as const;

export const navLinks = [
  { label: "Jak to funguje", href: "/#jak-to-funguje" },
  { label: "Pro barbershopy", href: "/pro-barbershopy" },
  { label: "Případová studie", href: "/pripadova-studie" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const footerAbout =
  "Jsme tým specialistů na retenční marketing pro lokální služby. Věříme, že nejlepší zákazník je ten, kterého už máte." as const;
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add lib/data.ts
git commit -m "feat: add centralized content data module"
```

---

### Task 3: UI Primitives — Button, SectionReveal, MetricCounter, StepCard

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/SectionReveal.tsx`, `components/ui/MetricCounter.tsx`, `components/ui/StepCard.tsx`

- [ ] **Step 1: Create Button component**

Create `components/ui/Button.tsx`:

```tsx
import Link from "next/link";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary: "bg-surface-card text-text-primary hover:bg-surface-light",
  outline: "border border-text-muted text-text-primary hover:border-brand",
} as const;

const sizes = {
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

export function Button({
  href,
  variant = "primary",
  size = "default",
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create SectionReveal component**

Create `components/ui/SectionReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create MetricCounter component**

Create `components/ui/MetricCounter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type MetricCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export function MetricCounter({
  value,
  suffix = "",
  label,
  duration = 2000,
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const start = 0;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = start + (value - start) * eased;

      if (isDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.round(current).toLocaleString("cs-CZ"));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-normal text-brand md:text-5xl">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-text-secondary">{label}</div>
    </div>
  );
}
```

- [ ] **Step 4: Create StepCard component**

Create `components/ui/StepCard.tsx`:

```tsx
type StepCardProps = {
  step: number;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-surface-card bg-surface-card p-8 transition-colors hover:border-brand/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
        {step}
      </div>
      <h3 className="mb-2 font-heading text-xl text-text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/ui/
git commit -m "feat: add UI primitives — Button, SectionReveal, MetricCounter, StepCard"
```

---

### Task 4: Layout — Navbar & Footer

**Files:**
- Create: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Navbar**

Create `components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl text-text-primary">
          {siteConfig.name}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
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

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-white/5 bg-surface px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Create Footer**

Create `components/layout/Footer.tsx`:

```tsx
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
```

- [ ] **Step 3: Add Navbar and Footer to root layout**

Update `app/layout.tsx` — add imports and wrap children:

```tsx
import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail | Automatický retenční marketing",
    template: "%s | BoostMail",
  },
  description:
    "Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu. Retenční engine pro barbershopy a lokální služby.",
  metadataBase: new URL("https://boostmail.cz"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "BoostMail",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify in browser — navbar and footer render**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web && npm run dev
```

Open `localhost:3000`. Expected: dark background, navbar at top with "BoostMail" logo and links, footer at bottom.

- [ ] **Step 5: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/layout/ app/layout.tsx
git commit -m "feat: add Navbar and Footer layout components"
```

---

### Task 5: Home Page Sections — Hero, SocialProof, HowItWorks

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/SocialProof.tsx`, `components/sections/HowItWorks.tsx`

- [ ] **Step 1: Create Hero section**

Create `components/sections/Hero.tsx`:

```tsx
"use client";

import { heroContent } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-5xl leading-tight md:text-7xl"
        >
          {heroContent.headline}
          <br />
          <span className="text-brand">{heroContent.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <Button href={heroContent.ctaHref} size="lg">
            {heroContent.cta}
          </Button>
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px]" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create SocialProof section**

Create `components/sections/SocialProof.tsx`:

```tsx
"use client";

import { metrics } from "@/lib/data";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function SocialProof() {
  return (
    <section className="border-y border-white/5 py-16">
      <SectionReveal>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
```

- [ ] **Step 3: Create HowItWorks section**

Create `components/sections/HowItWorks.tsx`:

```tsx
"use client";

import { howItWorksSteps } from "@/lib/data";
import { StepCard } from "@/components/ui/StepCard";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            Jak to funguje
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-text-secondary">
            Tři kroky k plnému kalendáři. Žádné složité nastavování.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.15}>
              <StepCard
                step={step.step}
                title={step.title}
                description={step.description}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/sections/Hero.tsx components/sections/SocialProof.tsx components/sections/HowItWorks.tsx
git commit -m "feat: add Hero, SocialProof, and HowItWorks sections"
```

---

### Task 6: Home Page Sections — Timeline, DashboardPreview, Comparison, CTA

**Files:**
- Create: `components/sections/Timeline.tsx`, `components/sections/DashboardPreview.tsx`, `components/sections/Comparison.tsx`, `components/sections/CTASection.tsx`

- [ ] **Step 1: Create Timeline section**

Create `components/sections/Timeline.tsx`:

```tsx
"use client";

import { timelineEvents } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6" ref={ref}>
        <SectionReveal>
          <p className="mb-12 text-center text-sm text-text-muted uppercase tracking-wider">
            Reálný scénář
          </p>
        </SectionReveal>

        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-0 left-[72px] h-full w-px bg-brand/20 md:left-[88px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.time}
              className="relative mb-8 flex items-center gap-6 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.4 }}
            >
              <div className="w-16 shrink-0 text-right font-mono text-lg text-brand md:w-20">
                {event.time}
              </div>
              <div className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-brand shadow-[0_0_12px_rgba(57,143,255,0.5)]" />
              <div className="text-text-primary">{event.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create DashboardPreview section**

Create `components/sections/DashboardPreview.tsx`:

```tsx
"use client";

import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function DashboardPreview() {
  const m = caseStudy.metrics;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            Reálné výsledky
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
            {caseStudy.client} — {caseStudy.period}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="rounded-2xl border border-white/5 bg-surface-card p-8 md:p-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <Stat value={m.conversions.toString()} label="Konverzí" />
              <Stat
                value={`${m.revenue.toLocaleString("cs-CZ")} Kč`}
                label="Extra tržby"
              />
              <Stat value={m.reactivated.toString()} label="Vrácených zákazníků" />
              <Stat value={m.savedSlots.toString()} label="Zachráněných termínů" />
            </div>

            <div className="mt-8 text-center">
              <Button href="/pripadova-studie" variant="outline">
                Celá případová studie
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-medium text-brand md:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create Comparison section**

Create `components/sections/Comparison.tsx`:

```tsx
"use client";

import { comparisonData } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Comparison() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal>
          <h2 className="mb-12 text-center font-heading text-3xl md:text-4xl">
            Proč ne Mailchimp?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  {comparisonData.headers.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 font-medium text-text-secondary"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="px-6 py-4 text-text-primary">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-brand">&#10003;</td>
                    <td className="px-6 py-4 text-text-muted">&#10005;</td>
                    <td className="px-6 py-4 text-text-muted">&#10005;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CTASection**

Create `components/sections/CTASection.tsx`:

```tsx
"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionReveal>
          <h2 className="font-heading text-3xl md:text-5xl">
            Zjistěte kolik peněz vám leží{" "}
            <span className="text-brand">v databázi</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-text-secondary">
            Nezávazná konzultace zdarma. Podíváme se na váš rezervační systém a
            řekneme vám, kolik zákazníků můžete vrátit.
          </p>
          <div className="mt-10">
            <Button href="/kontakt" size="lg">
              Chci konzultaci zdarma
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/sections/
git commit -m "feat: add Timeline, DashboardPreview, Comparison, and CTA sections"
```

---

### Task 7: Assemble Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the Home page**

Replace `app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Timeline } from "@/components/sections/Timeline";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Comparison } from "@/components/sections/Comparison";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Timeline />
      <DashboardPreview />
      <Comparison />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify Home page renders**

Open `localhost:3000`. Expected: all 7 sections render in order — hero with animated text, metric counters, 3-step cards, timeline, dashboard preview, comparison table, CTA.

- [ ] **Step 3: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add app/page.tsx
git commit -m "feat: assemble Home page with all sections"
```

---

### Task 8: Pro Barbershopy Page

**Files:**
- Create: `components/pages/BarberHero.tsx`, `components/pages/PainPoints.tsx`, `components/pages/CampaignGrid.tsx`, `components/pages/CaseStudyTeaser.tsx`, `app/pro-barbershopy/page.tsx`

- [ ] **Step 1: Create BarberHero**

Create `components/pages/BarberHero.tsx`:

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function BarberHero() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl leading-tight md:text-7xl"
        >
          Plný kalendář.
          <br />
          <span className="text-brand">Bez reklam. Automaticky.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary"
        >
          Napojíme se na váš Reservio a automaticky vracíme zákazníky, kteří by
          jinak nepřišli. Vy stříháte, my plníme kalendář.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Button href="/kontakt" size="lg">
            Napojte svůj barbershop
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create PainPoints**

Create `components/pages/PainPoints.tsx`:

```tsx
"use client";

import { painPoints } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function PainPoints() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-12 text-center font-heading text-3xl md:text-4xl">
            Znáte to?
          </h2>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {painPoints.map((point, i) => (
            <SectionReveal key={point.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/5 bg-surface-card p-8">
                <h3 className="mb-2 text-lg font-medium text-text-primary">
                  {point.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {point.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create CampaignGrid**

Create `components/pages/CampaignGrid.tsx`:

```tsx
"use client";

import { campaigns } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CampaignGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="mb-4 text-center font-heading text-3xl md:text-4xl">
            9 kampaní, co běží za vás
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-text-secondary">
            Každá reaguje na jinou situaci. Všechny běží automaticky.
          </p>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {campaigns.map((campaign, i) => (
            <SectionReveal key={campaign.name} delay={i * 0.05}>
              <div className="rounded-xl border border-white/5 bg-surface-card p-6">
                <div className="mb-2 text-xs text-brand">{campaign.trigger}</div>
                <h3 className="mb-1 font-medium text-text-primary">
                  {campaign.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {campaign.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CaseStudyTeaser**

Create `components/pages/CaseStudyTeaser.tsx`:

```tsx
"use client";

import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function CaseStudyTeaser() {
  const m = caseStudy.metrics;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal>
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center md:p-12">
            <p className="mb-2 text-sm text-brand">{caseStudy.client}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.conversions}
                </div>
                <div className="text-xs text-text-muted">konverzí</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.revenue.toLocaleString("cs-CZ")} Kč
                </div>
                <div className="text-xs text-text-muted">extra tržby</div>
              </div>
              <div>
                <div className="text-3xl font-medium text-text-primary">
                  {m.savedSlots}
                </div>
                <div className="text-xs text-text-muted">zachráněných termínů</div>
              </div>
            </div>
            <Button href="/pripadova-studie">Celá případová studie</Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Assemble Pro Barbershopy page**

Create `app/pro-barbershopy/page.tsx`:

```tsx
import type { Metadata } from "next";
import { BarberHero } from "@/components/pages/BarberHero";
import { PainPoints } from "@/components/pages/PainPoints";
import { CampaignGrid } from "@/components/pages/CampaignGrid";
import { CaseStudyTeaser } from "@/components/pages/CaseStudyTeaser";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Pro barbershopy",
  description:
    "Plný kalendář bez reklam. Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a personalizujeme emaily za každého barbera.",
};

export default function ProBarbershopy() {
  return (
    <>
      <BarberHero />
      <PainPoints />
      <CampaignGrid />
      <CaseStudyTeaser />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 6: Verify and commit**

Open `localhost:3000/pro-barbershopy`. Expected: barber-specific hero, 4 pain point cards, 9 campaign cards in grid, case study teaser, CTA.

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/pages/ app/pro-barbershopy/
git commit -m "feat: add Pro Barbershopy page with all sections"
```

---

### Task 9: Případová Studie Page

**Files:**
- Create: `app/pripadova-studie/page.tsx`

- [ ] **Step 1: Build case study page**

Create `app/pripadova-studie/page.tsx`:

```tsx
import type { Metadata } from "next";
import { caseStudy } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Případová studie — Nextlevel Barbershop",
  description: `${caseStudy.metrics.conversions} konverzí, ${caseStudy.metrics.revenue.toLocaleString("cs-CZ")} Kč extra tržby za ${caseStudy.period}. Reálná data z automatického retenčního marketingu.`,
};

export default function CaseStudyPage() {
  const m = caseStudy.metrics;

  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <SectionReveal>
          <p className="mb-2 text-sm text-brand">Případová studie</p>
          <h1 className="font-heading text-4xl md:text-5xl">
            {caseStudy.client}
          </h1>
          <p className="mt-4 text-text-secondary">
            Výsledky za {caseStudy.period} automatického retenčního marketingu.
          </p>
        </SectionReveal>

        {/* Top metrics */}
        <SectionReveal delay={0.2}>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            <MetricCard value={m.emailsSent.toString()} label="Odeslaných emailů" />
            <MetricCard value={`${m.openRate}%`} label="Open rate" />
            <MetricCard value={m.conversions.toString()} label="Konverzí" />
            <MetricCard
              value={`${m.revenue.toLocaleString("cs-CZ")} Kč`}
              label="True ROI"
              highlight
            />
          </div>
        </SectionReveal>

        {/* Secondary metrics */}
        <SectionReveal delay={0.3}>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            <MetricCard value={m.reactivated.toString()} label="Vrácených neaktivních" />
            <MetricCard value={m.savedSlots.toString()} label="Zachráněných termínů" />
            <MetricCard value={`${m.clickRate}%`} label="Click rate" />
          </div>
        </SectionReveal>

        {/* Campaign breakdown */}
        <SectionReveal delay={0.2}>
          <h2 className="mb-6 mt-16 font-heading text-2xl">
            Výkon podle kampaní
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  <th className="px-6 py-3 text-text-muted">Kampaň</th>
                  <th className="px-6 py-3 text-text-muted">Odesláno</th>
                  <th className="px-6 py-3 text-text-muted">Open rate</th>
                  <th className="px-6 py-3 text-text-muted">Click rate</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.campaignBreakdown.map((row) => (
                  <tr key={row.name} className="border-b border-white/5">
                    <td className="px-6 py-3 text-text-primary">{row.name}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.sent}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.openRate}%</td>
                    <td className="px-6 py-3 text-text-secondary">{row.clickRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>

        {/* Per-barber breakdown */}
        <SectionReveal delay={0.2}>
          <h2 className="mb-6 mt-16 font-heading text-2xl">
            Přehled barberů
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-card">
                  <th className="px-6 py-3 text-text-muted">Barber</th>
                  <th className="px-6 py-3 text-text-muted">Konverze</th>
                  <th className="px-6 py-3 text-text-muted">Tržby</th>
                  <th className="px-6 py-3 text-text-muted">Emaily</th>
                  <th className="px-6 py-3 text-text-muted">Open</th>
                  <th className="px-6 py-3 text-text-muted">Click</th>
                </tr>
              </thead>
              <tbody>
                {caseStudy.barbers.map((barber) => (
                  <tr key={barber.name} className="border-b border-white/5">
                    <td className="px-6 py-3 font-medium text-text-primary">
                      {barber.name}
                    </td>
                    <td className="px-6 py-3 text-brand">{barber.conversions}</td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.revenue.toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-3 text-text-secondary">{barber.emails}</td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.openRate}%
                    </td>
                    <td className="px-6 py-3 text-text-secondary">
                      {barber.clickRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal delay={0.2}>
          <div className="mt-16 text-center">
            <p className="mb-6 text-text-secondary">
              Chcete podobné výsledky pro svůj barbershop?
            </p>
            <Button href="/kontakt" size="lg">
              Chci konzultaci zdarma
            </Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

function MetricCard({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 text-center ${
        highlight
          ? "border-brand/30 bg-brand/5"
          : "border-white/5 bg-surface-card"
      }`}
    >
      <div
        className={`text-2xl font-medium ${highlight ? "text-brand" : "text-text-primary"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}
```

- [ ] **Step 2: Verify and commit**

Open `localhost:3000/pripadova-studie`. Expected: header, 7 metric cards, 2 data tables, CTA.

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add app/pripadova-studie/
git commit -m "feat: add case study page with Nextlevel real data"
```

---

### Task 10: Kontakt Page with Server Action

**Files:**
- Create: `app/kontakt/page.tsx`, `app/kontakt/action.ts`, `components/ui/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `components/ui/ContactForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/kontakt/action";
import { Button } from "@/components/ui/Button";

const initialState: ContactState = { success: false, error: null };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center">
        <p className="text-lg text-text-primary">Děkujeme za zprávu!</p>
        <p className="mt-2 text-sm text-text-secondary">
          Ozveme se vám do 24 hodin.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-text-secondary">
          Jméno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-text-secondary">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      <div>
        <label
          htmlFor="businessType"
          className="mb-2 block text-sm text-text-secondary"
        >
          Typ podnikání
        </label>
        <select
          id="businessType"
          name="businessType"
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        >
          <option value="barbershop">Barbershop</option>
          <option value="klinika">Klinika</option>
          <option value="kosmetika">Kosmetický salón</option>
          <option value="wellness">Wellness</option>
          <option value="other">Jiné</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-text-secondary">
          Zpráva (volitelné)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <Button type="submit" size="lg" className="w-full">
        {isPending ? "Odesílám..." : "Odeslat zprávu"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Create server action**

Create `app/kontakt/action.ts`:

```typescript
"use server";

export type ContactState = {
  success: boolean;
  error: string | null;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const businessType = formData.get("businessType") as string;
  const message = formData.get("message") as string;

  if (!name || !email) {
    return { success: false, error: "Vyplňte prosím jméno a email." };
  }

  try {
    // If RESEND_API_KEY is set, send via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "BoostMail Web <web@boostmail.cz>",
        to: "nerad@boostmail.cz",
        subject: `Nový kontakt: ${name} (${businessType})`,
        text: `Jméno: ${name}\nEmail: ${email}\nTyp: ${businessType}\nZpráva: ${message || "—"}`,
        replyTo: email,
      });
    } else {
      // Fallback: log to console in dev
      console.log("Contact form submission:", { name, email, businessType, message });
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "Něco se pokazilo. Zkuste to prosím znovu." };
  }
}
```

- [ ] **Step 3: Create Kontakt page**

Create `app/kontakt/page.tsx`:

```tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvte si nezávaznou konzultaci zdarma. Zjistíme, kolik zákazníků vám leží v databázi.",
};

export default function KontaktPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-xl px-6">
        <SectionReveal>
          <h1 className="font-heading text-4xl md:text-5xl">
            Zjistěte potenciál vaší{" "}
            <span className="text-brand">databáze</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Nezávazná konzultace zdarma. Nebo nám napište na{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify and commit**

Open `localhost:3000/kontakt`. Expected: headline, form with 4 fields, submit button. Test submission — should show success message (in dev, logs to console).

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add app/kontakt/ components/ui/ContactForm.tsx
git commit -m "feat: add contact page with form and Resend server action"
```

---

### Task 11: Coming Soon Pages

**Files:**
- Create: `components/pages/ComingSoonPage.tsx`, `app/pro-kliniky/page.tsx`, `app/pro-kosmeticky/page.tsx`

- [ ] **Step 1: Create shared ComingSoonPage component**

Create `components/pages/ComingSoonPage.tsx`:

```tsx
"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

type ComingSoonPageProps = {
  headline: string;
  description: string;
  features: readonly string[];
};

export function ComingSoonPage({
  headline,
  description,
  features,
}: ComingSoonPageProps) {
  return (
    <div className="flex min-h-[70vh] items-center py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <SectionReveal>
          <div className="mb-6 inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1 text-sm text-brand">
            Již brzy
          </div>
          <h1 className="font-heading text-4xl md:text-5xl">{headline}</h1>
          <p className="mt-4 text-text-secondary">{description}</p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 text-brand">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-12">
            <p className="mb-4 text-sm text-text-muted">
              Chcete vědět, až spustíme?
            </p>
            <Button href="/kontakt">Dejte nám vědět</Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Pro Kliniky page**

Create `app/pro-kliniky/page.tsx`:

```tsx
import type { Metadata } from "next";
import { comingSoonPages } from "@/lib/data";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Pro kliniky",
  description: comingSoonPages.kliniky.description,
};

export default function ProKliniky() {
  const data = comingSoonPages.kliniky;
  return (
    <ComingSoonPage
      headline={data.headline}
      description={data.description}
      features={data.features}
    />
  );
}
```

- [ ] **Step 3: Create Pro Kosmetičky page**

Create `app/pro-kosmeticky/page.tsx`:

```tsx
import type { Metadata } from "next";
import { comingSoonPages } from "@/lib/data";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";

export const metadata: Metadata = {
  title: "Pro kosmetičky",
  description: comingSoonPages.kosmeticky.description,
};

export default function ProKosmeticky() {
  const data = comingSoonPages.kosmeticky;
  return (
    <ComingSoonPage
      headline={data.headline}
      description={data.description}
      features={data.features}
    />
  );
}
```

- [ ] **Step 4: Verify and commit**

Open `localhost:3000/pro-kliniky` and `localhost:3000/pro-kosmeticky`. Expected: "Již brzy" badge, headline, features with checkmarks, CTA.

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/pages/ComingSoonPage.tsx app/pro-kliniky/ app/pro-kosmeticky/
git commit -m "feat: add Coming Soon pages for kliniky and kosmetičky"
```

---

### Task 12: Lenis Smooth Scroll + prefers-reduced-motion

**Files:**
- Create: `components/providers/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create SmoothScroll provider**

Create `components/providers/SmoothScroll.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Add SmoothScroll to root layout**

Update `app/layout.tsx` — add `SmoothScroll` wrapper around `body` children:

```tsx
import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "BoostMail | Automatický retenční marketing",
    template: "%s | BoostMail",
  },
  description:
    "Automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu. Retenční engine pro barbershopy a lokální služby.",
  metadataBase: new URL("https://boostmail.cz"),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "BoostMail",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <SmoothScroll>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify smooth scroll works**

Open `localhost:3000`, scroll the page. Expected: smooth, eased scrolling. With `prefers-reduced-motion: reduce` enabled in OS settings, scrolling should be native (not smooth).

- [ ] **Step 4: Commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add components/providers/ app/layout.tsx
git commit -m "feat: add Lenis smooth scroll with prefers-reduced-motion support"
```

---

### Task 13: Final Polish — Verify All Pages, Fix Issues

**Files:**
- Possibly modify any file based on issues found

- [ ] **Step 1: Verify all routes**

Open each URL and check for errors:
- `localhost:3000` — Home
- `localhost:3000/pro-barbershopy` — Barbershop page
- `localhost:3000/pripadova-studie` — Case study
- `localhost:3000/kontakt` — Contact
- `localhost:3000/pro-kliniky` — Coming soon
- `localhost:3000/pro-kosmeticky` — Coming soon

Expected: all pages render without console errors, all animations trigger on scroll, all links navigate correctly.

- [ ] **Step 2: Check mobile responsiveness**

Resize browser to 375px width. Check each page. Expected: single column layouts, hamburger menu works, tables scroll horizontally, no horizontal overflow.

- [ ] **Step 3: Run build to catch type errors**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 4: Fix any issues found, then commit**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add -A
git commit -m "fix: polish and fixes from final review"
```

---

### Task 14: Deploy to Vercel

**Files:**
- None (Vercel CLI or GitHub integration)

- [ ] **Step 1: Push to GitHub**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
gh repo create boostmail-web --private --source=. --push
```

- [ ] **Step 2: Deploy to Vercel**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
npx vercel --yes
```

Or if using Vercel GitHub integration, connect the repo at vercel.com/new.

- [ ] **Step 3: Verify deployment**

Open the Vercel URL. All pages should work, animations should play, contact form should submit (if RESEND_API_KEY is set in Vercel env vars).

- [ ] **Step 4: Commit any Vercel config if generated**

```bash
cd /Users/lukaslang/Projects/internal/boostmail-web
git add -A && git commit -m "chore: add Vercel deployment config" || echo "Nothing to commit"
```
