# BoostMail Web — Design Spec

## Overview

New BoostMail agency website replacing the current Webflow site. Single-page-centric design targeting local service owners (barbershops primarily, clinics/cosmetics as expansion). The audience doesn't read much — everything must be scannable, visual, and conversion-focused.

**Tech stack:** Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll, deployed on Vercel.

## Site Structure

### 5 Pages Total

| Page | Route | Type |
|------|-------|------|
| Home | `/` | Main landing — all key info in one scroll |
| Pro barbershopy | `/pro-barbershopy` | Primary vertical detail |
| Případová studie | `/pripadova-studie` | Nextlevel real data |
| Kontakt | `/kontakt` | Form + CTA |
| Coming Soon | `/pro-kliniky`, `/pro-kosmeticky` | Placeholder with waitlist |

### Not separate pages (merged into Home)
- "Jak to funguje" → anchor section on Home
- "O nás" → footer section

---

## Page Designs

### 1. Home (`/`)

**Goal:** Land → understand → trust → CTA. One scroll, one decision.

**Sections (scroll order):**

1. **Hero**
   - Headline: "Vaši zákazníci se vrací. Automaticky."
   - Subheadline: "Napojíme se na váš rezervační systém a automaticky vracíme zákazníky, zaplňujeme zrušené termíny a dokazujeme každou korunu."
   - CTA: "Chci vědět víc" → scroll to contact / anchor
   - Background: subtle animated gradient or abstract shapes (no stock photos)

2. **Social Proof Bar**
   - 3 animated counters: "58 prokazaných konverzí" / "45 792 Kč extra tržby" / "28.6% open rate"
   - Client logo(s) if available

3. **Jak to funguje** (anchor: `#jak-to-funguje`)
   - 3 steps max, visual cards with icons:
     1. "Napojíme se" — Propojíme váš Reservio/Reservanto/MyFox
     2. "Systém běží" — 9 automatických kampaní pracuje 24/7
     3. "Zákazníci se vrací" — Reálné bookingy, měřitelné výsledky
   - Below: animated timeline "15:03 zákazník zruší → 15:05 email 5 čekajícím → 15:47 nový booking"

4. **Výsledky / Dashboard Preview**
   - Stylized dashboard mockup or screenshot showing real Nextlevel metrics
   - Key callouts: reaktivovaní zákazníci, zachráněné termíny, True ROI
   - Link to full case study

5. **Comparison**
   - Simple 3-column: BoostMail vs. Mailchimp/Ecomailer vs. Klasická agentura
   - Rows: Automatizace, Event-driven, Dokazatelný ROI, GDPR, Hands-off provoz

6. **CTA Section**
   - "Zjistěte kolik peněz vám leží v databázi"
   - Inline contact form or link to `/kontakt`

7. **Footer**
   - Brief "O nás" blurb (2-3 sentences about the team)
   - Links: Kontakt, Případová studie, Pro barbershopy
   - Legal links, social icons

### 2. Pro barbershopy (`/pro-barbershopy`)

**Goal:** Detail page for the primary vertical. Barber-specific language and use cases.

**Sections:**
1. **Hero** — "Plný kalendář. Bez reklam. Automaticky."
2. **Pain points** — 3-4 cards: "Zákazník přestal chodit", "Zrušený termín = ztráta", "Newsletter co nikdo nečte"
3. **9 kampaní vizuálně** — Grid/list of all campaigns with short descriptions, barber-specific examples
4. **Per-barber personalizace** — Each barber gets their own flows, their name in From
5. **Case study teaser** — Nextlevel metrics preview + link
6. **CTA** — "Napojte svůj barbershop"

### 3. Případová studie (`/pripadova-studie`)

**Goal:** Social proof with real numbers from Nextlevel barbershop.

**Content (real data):**
- 878 emailů za 30 dní
- 28.6% open rate
- 58 prokazaných konverzí
- 45 792 Kč True ROI
- 7 vrácených neaktivních zákazníků
- 51 zachráněných termínů
- Per-barber breakdown table (Lukáš, Michal, Denis, Adam, Luboš, Emre)
- Campaign performance table

### 4. Kontakt (`/kontakt`)

**Goal:** Simple conversion page.

- Headline: "Zjistěte potenciál vaší databáze"
- Contact form (name, email, business type, message)
- Email fallback: nerad@boostmail.cz
- No phone number needed

### 5. Coming Soon (`/pro-kliniky`, `/pro-kosmeticky`)

**Goal:** Placeholder for future verticals. Both pages share the same `ComingSoonPage` component, differentiated by props (title, description, niche-specific teaser).

- Simple page: "Brzy spustíme řešení pro [kliniky/kosmetičky]"
- Email signup for waitlist (simple form → same backend as contact)
- Brief teaser of what's coming (3-4 bullet points specific to the niche)

---

## Design System

### Typography
- Headings: Inter or similar geometric sans-serif, bold
- Body: Same family, regular weight
- Sizes: mobile-first scale

### Colors
- Primary: to be determined from current Webflow brand (or new brand direction)
- Dark background sections for contrast
- Accent color for CTAs

### Animations
- GSAP ScrollTrigger: parallax on hero, counter animations on social proof
- Framer Motion: `whileInView` blur/fade reveals for sections and cards
- Lenis: smooth scroll globally
- Timeline animation: step-by-step reveal of the "cancel → email → booking" sequence
- `prefers-reduced-motion`: respect, disable all non-essential animations

### Components
- `Navbar` — sticky, minimal links (Home, Pro barbershopy, Případová studie, Kontakt), mobile hamburger
- `Footer` — links, about blurb, legal
- `SectionWrapper` — reusable scroll-reveal container
- `MetricCounter` — animated number with label
- `StepCard` — icon + title + description
- `ComparisonTable` — 3-column responsive table
- `ContactForm` — name, email, business type, message → Resend or form backend
- `TimelineAnimation` — the "cancel → email → booking" sequence

---

## Technical Architecture

```
boostmail-web/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, Lenis)
│   ├── page.tsx                # Home
│   ├── pro-barbershopy/
│   │   └── page.tsx
│   ├── pripadova-studie/
│   │   └── page.tsx
│   ├── kontakt/
│   │   └── page.tsx
│   ├── pro-kliniky/
│   │   └── page.tsx
│   └── pro-kosmeticky/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/              # Home page sections
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Timeline.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── Comparison.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── MetricCounter.tsx
│   │   ├── StepCard.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── ContactForm.tsx
│   │   └── Button.tsx
│   └── animations/
│       ├── SectionReveal.tsx
│       └── TimelineAnimation.tsx
├── lib/
│   └── fonts.ts
├── styles/
│   └── globals.css            # Tailwind 4 @import syntax
├── public/
│   └── images/
└── docs/
```

### Key decisions
- **Server Components by default**, `'use client'` only for: animations, form interactions, counters
- **No CMS for now** — content hardcoded, easy to edit. MDX later if needed for blog/case studies
- **Contact form** — server action → Resend API (or simple mailto fallback)
- **No pricing page** — user unsure about public pricing, skip for now
- **SEO** — proper metadata per page, Open Graph, structured data for local business

### Performance targets
- LCP < 3s
- No layout shift on animations
- Images: WebP/AVIF, lazy loaded
- Fonts: `next/font` with display swap

---

## Content Sources

All content is derived from the product analysis provided by the user. Key messaging:

- **Value prop:** "Automaticky vracíme zákazníky, kteří by jinak nepřišli, a dokazujeme kolik to vydělalo."
- **Differentiation:** Event-driven (ne batch), True Incrementality (ne vanity metriky), hands-off autopilot
- **Real metrics:** Nextlevel barbershop data (878 emails, 58 conversions, 45 792 Kč)

---

## Out of Scope

- Pricing page (TBD)
- Blog / Akademie (future)
- Multi-language support
- User authentication / dashboard
- E-shop vertical pages
