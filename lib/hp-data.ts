// BoostMail homepage — data + copy (reframe v2, stručně)
// Design tokeny převzaté z Claude Design výstupu; copy reframovaná (méně "peníze", víc návraty/recenze/růst).

export const HP = {
  accent: "#1a5ada",
  accentDark: "#0f3fa0",
  accentSoft: "#e8eefb",
  bg: "#f4f4f4",
  ink: "#0a0a0a",
  dark: "#0a0a0a",
  soft: "#f9f9f9",
  line: "rgba(0,0,0,0.08)",
  mono: "var(--font-jetbrains-mono), monospace",
  sans: "var(--font-space-grotesk), system-ui, sans-serif",
} as const;

export const HP_CTA = "Nezávazná poptávka";
export const HP_CTA_LONG = "Chci nezávaznou poptávku";
export const HP_CTA_CALL = "Domluvit hovor";
export const HP_CTA_SUB = "Napište nám nebo si rovnou vyberte termín hovoru. Ozveme se a vše probereme. Zdarma a nezávazně";

export const HERO = {
  kicker: "E-mail marketing pro lokální provozovny",
  title: ["Získejte ze svého", "podnikání"],
  titleAccent: "maximum.",
  sub: "Posíláme za vás e-maily a SMS, co vracejí zákazníky, sbírají recenze a radí, kde růst. Vy pečujete o klienty, zbytek je na nás.",
  microProof: { n: 225, label: "rezervací navíc", sub: "Barbershop · Praha · od spuštění" },
};

// "Co pro vás děláme" — triáda (méně zaměřeno na peníze, víc na víc věcí najednou)
export const HP_TRIAD = [
  { title: "Vrací zákazníky", desc: "Plní volná okna a hlídá cykly." },
  { title: "Sbírá recenze", desc: "Víc hodnocení na Googlu, samo po návštěvě." },
  { title: "Radí, kde růst", desc: "Mentor čte vaše data." },
];

export type Segment = {
  id: string;
  emoji: string;
  label: string;
  promise: string;
  live?: boolean;
  soon?: boolean;
  result?: string;
  flows?: string[];
};

export const HP_SEG: Segment[] = [
  {
    id: "barber", emoji: "💈", label: "Barbershop", live: true,
    promise: "Stálí klienti zpátky v křesle",
    result: "Stálý klient se vrací po 4 až 6 týdnech. Připomeneme se přesně v ten moment a okno se zaplní, bez zbytečných slev.",
    flows: ["Den po střihu", "Čas na další střih", "Volné okno zítra", "Zrušený termín", "Tři měsíce bez návštěvy"],
  },
  {
    id: "beauty", emoji: "💅", label: "Kosmetika", live: true,
    promise: "Kalendář plný dopředu",
    result: "Každé ošetření má svůj cyklus. Připomeneme se, přesně když je čas na další. Bez nepříjemného spamu.",
    flows: ["Po ošetření", "Čas na další péči", "Volný termín tento týden", "Zrušení", "Dlouho se neukázala"],
  },
  { id: "wellness", emoji: "🧖", label: "Wellness", soon: true, promise: "Naplněné víkendy" },
  { id: "auto", emoji: "🚗", label: "Autoservis", soon: true, promise: "Připomínky STK a servisu" },
];

export const HP_PROOF = [
  { shop: "Barbershop", cat: "Praha", bookings: 225, revenue: "176 575 Kč", period: "od spuštění", photo: "/proof/barber1.webp" },
  { shop: "Barbershop", cat: "Praha · 3 pobočky", bookings: 247, revenue: "145 500 Kč", period: "od spuštění", photo: "/proof/barber2.jpg" },
];
export const HP_HONEST =
  "Reálná čísla z provozoven, které vedeme. Berte je jako odhad přínosu naší kampaně, ne striktně izolovaný efekt jednoho kanálu. Klienty, kteří by přišli tak jako tak, si nepřičítáme.";
export const HP_EXPECT = "Každý provoz je jiný. Berte to jako reálnou ukázku, ne slib.";

export type HpCase = { cat: string; name: string; summary: string; metric?: string; metricUnit?: string; placeholder?: boolean; anonymous?: boolean };
export const HP_CASES: HpCase[] = [
  { cat: "Barbershop · Praha · 3 pobočky", name: "MNB", summary: "247 rezervací navíc napříč třemi pobočkami. Stálí klienti zpátky v křesle.", metric: "145 500 Kč", metricUnit: "obrat navíc / od spuštění" },
  { cat: "Reálný klient · Praha", name: "Barbershop v Praze", summary: "225 rezervací navíc z databáze, kterou už dávno měl. Jméno na přání neuvádíme.", metric: "176 575 Kč", metricUnit: "obrat navíc / od spuštění" },
  { cat: "Barbershop · anonymizováno", name: "Barbershop, Brno", summary: "Reálný klient, jméno nezveřejňujeme. Detailní případovka v přípravě.", placeholder: true, anonymous: true },
  { cat: "Kosmetika · anonymizováno", name: "Kosmetické studio", summary: "Reálný klient, jméno nezveřejňujeme. Případovka v přípravě.", placeholder: true, anonymous: true },
];
export const HP_INTEGRATIONS = ["Reservio", "Reservanto", "MyFox", "SmartEmailing", "GoHighLevel"];

export const HP_STEPS = [
  { n: "01", emoji: "🔌", title: "Napojíme se na váš systém", desc: "Připojíme se na váš rezervační systém (Reservio, Reservanto, MyFox…). Nic neinstalujete.", tag: "VY · KRÁTCE" },
  { n: "02", emoji: "⚙️", title: "Připravíme a spustíme kampaně", desc: "Nastavíme e-maily, co chodí ve správný moment. Texty schválíte vy.", tag: "MY · DO TÝDNE" },
  { n: "03", emoji: "📈", title: "Vidíte rezervace a doporučení", desc: "V reportu máte rezervace, obrat a co u vás zlepšit. Víc neřešíte.", tag: "VÝSLEDEK · KAŽDÝ MĚSÍC" },
];

export const HP_MENTOR = [
  { tag: "CENA", from: "Pátky máte měsíce dopředu plné, ceny roky stejné.", rec: "Řekneme, kde a o kolik zvednout cenu, aniž přijdete o klienty.", gain: "vyšší marže" },
  { tag: "OTEVÍRACÍ DOBA", from: "Úterý dopoledne dlouhodobě prázdné, sobota přetížená.", rec: "Doporučíme, kdy mít otevřeno a kdy zbytečně platíte provoz.", gain: "míň prostojů" },
  { tag: "VYTÍŽENÍ TÝMU", from: "Jeden člověk dělá 40 % obratu, druhý čeká.", rec: "Pomůžeme rozložit objednávky rovnoměrně mezi tým.", gain: "vyšší obrat" },
  { tag: "KAMPANĚ", from: "Část klientů chodí nepravidelně a pomalu vypadává.", rec: "Upravíme jim cyklus připomínek za vás. Nemusíte nic řešit.", gain: "častější návštěvy" },
];

export const HP_FAQ = [
  { q: "Kolik to stojí?", a: "Nastavení od 15 000 Kč, péče od 5 000 Kč měsíčně podle velikosti databáze. Žádné procento z tržeb. Přesnou cenu řekneme, jakmile budeme znát velikost vaší databáze." },
  { q: "Musím něco dělat?", a: "Ne. Řeknete nám pár údajů o provozovně, zbytek nastavíme my. Žádná instalace, žádná práce navíc." },
  { q: "Co když nemám rezervační systém?", a: "Stačí seznam zákazníků s kontaktem a datem poslední návštěvy, klidně Excel. Napojení doděláme později." },
  { q: "Nebudete mi spamovat zákazníky?", a: "Ne. Píšeme jen ve správný moment, lidsky a v tónu, který schválíte. Žádné plošné slevové letáky." },
  { q: "Jak rychle uvidím výsledky?", a: "První rezervace obvykle během pár týdnů od spuštění." },
  { q: "A co GDPR?", a: "Pracujeme jako zpracovatel, s vaším souhlasem a daty, která už máte. Vše je dohledatelné a u nezávazného odhadu je po výpočtu mažeme." },
  { q: "Je to taky „nějaká AI\"?", a: "Kampaně a texty děláme my, ne generátor. AI nám pomáhá číst data a hlídat, kdy co poslat." },
];

export const HP_FOUNDERS = [
  { name: "Lukáš Lang", role: "Software a data", photo: "/team/lukas.png", line: "Stojí za vším, co v Boostmailu běží na pozadí. Napojení, data, flow." },
  { name: "Vojtěch Nerad", role: "Komunikace a řešení problémů", photo: "/team/vojta.png", line: "Píše e-maily, které lidi otevírají. Když zavoláte, zvedne to on." },
];

export const HP_DEMO_GET = [
  ["Analýza vaší databáze", "Společně se podíváme, kolik klientů vám aktuálně propadává sítem."],
  ["Propočet zisku", "Zjistíme, kolik peněz navíc vám náš systém může reálně přinést."],
  ["Plán nasazení", "Pokud to dává smysl, ukážeme, jak to do 72 hodin spustit i u vás."],
];

export const HP_FOOTER_NAV: { label: string; links: [string, string][] }[] = [
  { label: "ŘEŠENÍ", links: [["Pro koho", "/#pro-koho"], ["Jak to funguje", "/#jak"], ["Mentor", "/#mentor"], ["Výsledky", "/#dukaz"]] },
  { label: "SPOLEČNOST", links: [["O nás", "/#kontakt"], ["Případovky", "/pripadovky"], ["FAQ", "/#faq"], ["Kontakt", "/#kontakt"]] },
];

export const HP_LEGAL: [string, string][] = [
  ["Ochrana osobních údajů", "/ochrana-udaju"],
  ["Cookies", "/cookies"],
  ["Obchodní podmínky", "/obchodni-podminky"],
];

export const CONTACT = {
  email: "nerad@boostmail.cz",
  phone: "+420 739 192 790",
  phoneHref: "+420739192790",
  ico: "23915455",
  person: "Vojta Nerad",
  address: "Palackého 1232, Vodňany II, 389 01 Vodňany",
};
