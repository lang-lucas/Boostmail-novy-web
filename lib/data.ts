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
