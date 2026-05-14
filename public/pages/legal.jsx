// Sdílená šablona pro legal stránky (GDPR, Cookies, Obchodní podmínky)
function LegalPage({ data }) {
  const { title, kicker, intro, lastUpdate, sections } = data;
  return (
    <BMPage active={null}>
      <section className="bm-hero" style={{ padding: '60px 56px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <BMMonoLabel n="§" text={kicker} />
          <h1 className="bm-h1" style={{
            fontSize: 64, lineHeight: 1, fontWeight: 700,
            margin: '20px 0 24px', letterSpacing: '-0.03em',
          }}>{title}</h1>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: 720, marginBottom: 18 }}>{intro}</div>
          <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1 }}>POSLEDNÍ AKTUALIZACE: {lastUpdate.toUpperCase()}</div>
        </div>
      </section>

      <section className="bm-section" style={{ padding: '20px 56px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48 }} className="bm-legal-grid">
          {/* TOC */}
          <aside style={{ position: 'sticky', top: 100, alignSelf: 'flex-start', height: 'fit-content' }} className="bm-legal-toc">
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 14 }}>OBSAH</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)', textDecoration: 'none', lineHeight: 1.4, paddingLeft: 12, borderLeft: '2px solid rgba(0,0,0,0.08)' }}>
                  <span style={{ color: BM_ACCENT, fontFamily: 'JetBrains Mono, monospace', marginRight: 6 }}>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.82)' }}>
            <div className="bm-card" style={{ padding: '16px 20px', background: '#fff8e8', borderColor: 'rgba(180,140,30,0.25)', marginBottom: 32, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18 }}>📝</span>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)' }}>
                <strong>Pracovní verze:</strong> Tento dokument je draft připravený podle běžných standardů. Před spuštěním do produkce projde kontrolou právníka.
              </div>
            </div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} style={{ marginBottom: 40, scrollMarginTop: 100 }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT }}>{String(i + 1).padStart(2, '0')}.</span>
                  <span>{s.title}</span>
                </h2>
                {s.body.map((b, j) => {
                  if (typeof b === 'string') return <p key={j} style={{ margin: '0 0 14px' }}>{b}</p>;
                  if (b.list) return (
                    <ul key={j} style={{ margin: '0 0 14px', paddingLeft: 0, listStyle: 'none' }}>
                      {b.list.map((it, k) => (
                        <li key={k} style={{ paddingLeft: 20, position: 'relative', margin: '6px 0' }}>
                          <span style={{ position: 'absolute', left: 0, color: BM_ACCENT, fontWeight: 700 }}>·</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                  if (b.heading) return <h3 key={j} style={{ fontSize: 17, fontWeight: 700, margin: '24px 0 10px' }}>{b.heading}</h3>;
                  if (b.callout) return (
                    <div key={j} className="bm-card" style={{ padding: 20, margin: '14px 0', background: '#f4f4f4' }}>
                      <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 8 }}>{b.callout.label.toUpperCase()}</div>
                      <div style={{ fontSize: 14 }}>{b.callout.text}</div>
                    </div>
                  );
                  return null;
                })}
              </section>
            ))}

            {/* Kontakt for legal */}
            <div className="bm-card" style={{ padding: 28, marginTop: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>Máte dotaz?</h3>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', marginBottom: 14 }}>
                Ohledně tohoto dokumentu nebo nakládání s vašimi údaji se ozvěte:
              </div>
              <div style={{ fontSize: 14 }}>
                <strong>lang@boostmail.cz</strong> · +420 604 656 033
              </div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', marginTop: 10 }}>
                Lukáš Lang · IČO 23915455 · Neplátce DPH · Boostmail (značka)
              </div>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .bm-legal-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .bm-legal-toc { position: static !important; }
        }
      `}</style>
    </BMPage>
  );
}

// ─── DATA ────────────────────────────────────────────────
const LEGAL_DATA = {
  gdpr: {
    kicker: 'OCHRANA OSOBNÍCH ÚDAJŮ',
    title: 'GDPR. Jak nakládáme s vašimi daty.',
    intro: 'Bereme ochranu osobních údajů vážně. V tomto dokumentu vysvětlujeme, jaké údaje sbíráme, proč, jak dlouho je uchováváme a jaká máte práva. Vše v souladu s nařízením EU 2016/679 (GDPR) a zákonem č. 110/2019 Sb.',
    lastUpdate: 'Květen 2026',
    sections: [
      { id: 'spravce', title: 'Kdo je správce', body: [
        'Správcem osobních údajů je Lukáš Lang, IČO 23915455, neplátce DPH, podnikající fyzická osoba pod značkou Boostmail.',
        'Kontakt ve věcech osobních údajů: lang@boostmail.cz, telefon +420 604 656 033.',
      ] },
      { id: 'rozsah', title: 'Jaké údaje zpracováváme', body: [
        'Zpracováváme pouze osobní údaje, které jsou nezbytné pro splnění naší služby nebo které nám sami poskytnete:',
        { list: [
          'Identifikační údaje: jméno, příjmení, název podniku, IČO/DIČ',
          'Kontaktní údaje: e-mail, telefon, doručovací a fakturační adresa',
          'Údaje o vaší databázi zákazníků (pouze v rámci poskytování služby, viz níže)',
          'Údaje z webových formulářů (kontakt, rezervace hovoru)',
          'Technické údaje: IP adresa, typ prohlížeče, čas návštěvy (cookies)',
        ] },
      ] },
      { id: 'ucel', title: 'Účely zpracování', body: [
        'Vaše osobní údaje zpracováváme z následujících právních důvodů:',
        { heading: 'Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)' },
        { list: [
          'Poskytování retenčního e-mailingu pro váš barbershop',
          'Fakturace a vedení účetnictví',
          'Komunikace ohledně spolupráce',
        ] },
        { heading: 'Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)' },
        { list: [
          'Odpověď na poptávku přes kontaktní formulář',
          'Přímá komunikace se stávajícími klienty',
          'Zabezpečení webu a prevence zneužití',
        ] },
        { heading: 'Souhlas (čl. 6 odst. 1 písm. a) GDPR)' },
        { list: [
          'Analytické a marketingové cookies',
          'Případné rozesílky e-mailových novinek (pokud o ně požádáte)',
        ] },
      ] },
      { id: 'klienti-db', title: 'Údaje o zákaznících klienta', body: [
        'Pokud pro vás zajišťujeme e-mailing, jste správcem osobních údajů vaší databáze zákazníků a my jsme zpracovatelem ve smyslu čl. 28 GDPR.',
        'Tento vztah upravujeme zpracovatelskou smlouvou, ve které se zavazujeme:',
        { list: [
          'Zpracovávat údaje pouze podle vašich pokynů',
          'Zachovávat mlčenlivost o všech zpracovávaných údajích',
          'Nasadit přiměřená technická a organizační opatření',
          'Po skončení smlouvy údaje vrátit nebo prokazatelně smazat',
          'Oznámit vám jakýkoliv bezpečnostní incident bez zbytečného odkladu',
        ] },
      ] },
      { id: 'doba', title: 'Doba uchovávání', body: [
        { list: [
          'Údaje z kontaktních formulářů: 3 roky od posledního kontaktu',
          'Údaje klientů (po dobu smlouvy + 10 let dle daňových a účetních předpisů)',
          'Fakturační údaje: 10 let dle zákona o účetnictví',
          'Cookies: dle nastavení v cookies banneru (max 12 měsíců u marketingových)',
        ] },
      ] },
      { id: 'prijemci', title: 'Komu údaje předáváme', body: [
        'Vaše údaje předáváme pouze prověřeným zpracovatelům, se kterými máme uzavřenou zpracovatelskou smlouvu:',
        { list: [
          'SmartEmailing (česká platforma na odesílání e-mailů)',
          'Poskytovatelé hostingu a cloudových služeb (servery v EU)',
          'Účetní a daňový poradce',
        ] },
        'Údaje nepředáváme do třetích zemí mimo EU/EHP s výjimkou služeb, které jsou kryté standardními smluvními doložkami EU nebo rozhodnutím o přiměřenosti.',
      ] },
      { id: 'prava', title: 'Vaše práva', body: [
        'V souvislosti se zpracováním osobních údajů máte následující práva:',
        { list: [
          'Právo na přístup, vědět, jaké údaje o vás máme',
          'Právo na opravu nepřesných údajů',
          'Právo na výmaz („právo být zapomenut")',
          'Právo na omezení zpracování',
          'Právo na přenositelnost údajů',
          'Právo vznést námitku proti zpracování',
          'Právo odvolat souhlas, kde jsme jej získali',
          'Právo podat stížnost u Úřadu pro ochranu osobních údajů (uoou.cz)',
        ] },
        { callout: { label: 'Jak uplatnit?', text: 'Stačí napsat na lang@boostmail.cz. Odpovídáme do 30 dní, většinou do tří dní.' } },
      ] },
      { id: 'cookies', title: 'Cookies', body: [
        'Náš web používá cookies pro zajištění základní funkčnosti, analytiku návštěvnosti a marketingové účely. Detail najdete v samostatném dokumentu Zásady cookies.',
      ] },
      { id: 'zmeny', title: 'Změny tohoto dokumentu', body: [
        'Tento dokument můžeme čas od času aktualizovat. Aktuální verze je vždy zde, s datem poslední aktualizace na začátku. Při zásadních změnách vás budeme informovat e-mailem nebo upozorněním na webu.',
      ] },
    ],
  },

  cookies: {
    kicker: 'ZÁSADY COOKIES',
    title: 'Cookies. Co a proč ukládáme.',
    intro: 'Cookies jsou krátké textové soubory, které web ukládá do vašeho prohlížeče. Některé jsou nezbytné pro provoz webu, jiné nám pomáhají měřit návštěvnost a zlepšovat obsah. Tady najdete, jaké cookies používáme a jak je můžete spravovat.',
    lastUpdate: 'Květen 2026',
    sections: [
      { id: 'co-jsou', title: 'Co jsou cookies', body: [
        'Cookies jsou drobné textové soubory, které prohlížeč ukládá při návštěvě webu. Slouží k tomu, aby si web pamatoval informace o vaší návštěvě, třeba že jste odsouhlasili cookies banner.',
        'Cookies samy o sobě neidentifikují konkrétní osobu, ukládají jen anonymní identifikátor nebo nastavení.',
      ] },
      { id: 'kategorie', title: 'Jaké cookies používáme', body: [
        { heading: 'Nezbytné cookies' },
        'Tyto cookies nelze vypnout, bez nich web nefunguje. Slouží například k pamatování souhlasu s cookies bannerem nebo k zabezpečení formulářů.',
        { list: [
          'bm_consent — uložení vašeho výběru v cookies banneru (12 měsíců)',
          'bm_session — technická relace (24 hodin)',
        ] },
        { heading: 'Analytické cookies' },
        'Pomáhají nám pochopit, jak návštěvníci web používají. Měříme anonymně, neidentifikujeme konkrétní osoby.',
        { list: [
          'Plausible Analytics (self-hosted, žádné cross-site tracking)',
        ] },
        { heading: 'Marketingové cookies' },
        'Slouží k cílení reklamy a měření efektivity kampaní. Aktivují se pouze s vaším souhlasem.',
        { list: [
          'Meta Pixel (Facebook a Instagram reklama)',
          'Google Ads conversion tracking',
        ] },
      ] },
      { id: 'sprava', title: 'Jak cookies spravovat', body: [
        'Při první návštěvě webu vám zobrazíme cookies banner. Můžete odsouhlasit vše, nebo si vybrat jen některé kategorie. Volbu kdykoliv změníte odkazem „Nastavení cookies" v patičce webu.',
        'Cookies můžete spravovat i přímo v prohlížeči, návody najdete na stránkách jednotlivých prohlížečů:',
        { list: [
          'Chrome: support.google.com/chrome',
          'Firefox: support.mozilla.org',
          'Safari: support.apple.com',
          'Edge: support.microsoft.com',
        ] },
        { callout: { label: 'Pozor', text: 'Pokud zablokujete všechny cookies, kontaktní formulář a další interaktivní části webu nemusí fungovat správně.' } },
      ] },
      { id: 'doba-cookies', title: 'Jak dlouho cookies platí', body: [
        { list: [
          'Session cookies — platí jen do zavření prohlížeče',
          'Persistent cookies — platí předem stanovenou dobu (uvedeno u každé cookie)',
          'U marketingových cookies nepřesahujeme 12 měsíců',
        ] },
      ] },
      { id: 'kontakt-cookies', title: 'Dotazy', body: [
        'Pokud máte k cookies dotaz, ozvěte se na lang@boostmail.cz.',
      ] },
    ],
  },

  obchodni: {
    kicker: 'OBCHODNÍ PODMÍNKY',
    title: 'Obchodní podmínky služeb Boostmail.',
    intro: 'Tyto obchodní podmínky upravují vztahy mezi Lukášem Langem (značka Boostmail) a klienty využívajícími naše služby v oblasti retenčního e-mailingu pro barbershopy. Jejich přijetím se obě strany řídí při uzavírání a plnění smluv.',
    lastUpdate: 'Květen 2026',
    sections: [
      { id: 'obecna', title: 'Obecná ustanovení', body: [
        'Poskytovatelem služeb je Lukáš Lang, IČO 23915455, neplátce DPH, podnikající fyzická osoba pod značkou Boostmail.',
        'Klientem se rozumí fyzická nebo právnická osoba, která si u nás objedná služby na základě nabídky a podepsané smlouvy.',
        'Tyto podmínky tvoří nedílnou součást každé smlouvy. Pokud smlouva určuje jinak, platí znění smlouvy.',
      ] },
      { id: 'sluzby', title: 'Předmět služeb', body: [
        'Boostmail poskytuje klientům následující služby:',
        { list: [
          'Napojení na rezervační systém klienta (Reservio, Reservanto, MyFox)',
          'Nastavení automatických e-mail flow (post-care, recommend, free slots, cancel rebook, reaktivace)',
          'Průběžné ladění a obsluha jednotlivých flow',
          'Měsíční report s počtem rezervací z e-mailu a jejich hodnotou',
        ] },
        'Konkrétní rozsah služeb je definován v individuální smlouvě s klientem.',
      ] },
      { id: 'cena', title: 'Cena a platební podmínky', body: [
        'Cena služeb se stanoví individuálně dohodou s klientem podle velikosti databáze a rozsahu nasazených flow. Ceník není veřejně publikován.',
        { heading: 'Měsíční fee' },
        'Pravidelný měsíční poplatek za provoz služby. Fakturujeme zpětně k 1. dni každého kalendářního měsíce, splatnost 14 dní.',
        { heading: 'Splatnost' },
        'Standardní splatnost faktur je 14 dní od vystavení. Při prodlení účtujeme zákonný úrok z prodlení dle nařízení vlády č. 351/2013 Sb.',
      ] },
      { id: 'trvani', title: 'Trvání a ukončení smlouvy', body: [
        'Smlouva se uzavírá na dobu neurčitou. Standardní výpovědní lhůta je jeden kalendářní měsíc, ke konci měsíce.',
        'Po podání výpovědi pokračujeme v poskytování služby do konce výpovědní lhůty, kdy klient hradí standardní měsíční fee.',
        { heading: 'Okamžité ukončení' },
        'Smlouvu lze ukončit okamžitě v případě:',
        { list: [
          'Prodlení s platbou delším než 30 dní',
          'Závažného porušení smlouvy druhou stranou',
          'Zjištění, že klient zneužívá službu k nelegálním účelům (spam, podvody)',
        ] },
      ] },
      { id: 'povinnosti', title: 'Práva a povinnosti', body: [
        { heading: 'Boostmail se zavazuje' },
        { list: [
          'Poskytovat služby s odbornou péčí',
          'Dodržovat zpracovatelskou smlouvu a GDPR',
          'Dodávat měsíční report a být dostupný v běžné pracovní době',
          'Mlčenlivost o všech údajích klienta',
        ] },
        { heading: 'Klient se zavazuje' },
        { list: [
          'Poskytnout přístup k rezervačnímu systému a databázi zákazníků',
          'Schvalovat šablony e-mailů v dohodnutých lhůtách',
          'Hradit faktury včas',
          'Neposkytovat třetím osobám výstupy a metodiky Boostmail bez souhlasu',
        ] },
      ] },
      { id: 'zaruka', title: 'Odpovědnost a záruky', body: [
        'Negarantujeme konkrétní výsledky kampaní. Výsledky závisí na řadě faktorů (velikost a kvalita databáze, brand, sezónnost, lokalita). Garantujeme proces, transparentnost a odbornou péči.',
        'Naše odpovědnost za škodu je omezena výší úhrad zaplacených klientem za posledních 12 měsíců. Neručíme za nepřímou škodu, ušlý zisk ani škodu vzniklou v důsledku okolností mimo naši kontrolu.',
      ] },
      { id: 'reklamace', title: 'Reklamace', body: [
        'Pokud nejste s některou částí služby spokojeni, ozvěte se nám na lang@boostmail.cz. Reklamaci vyřídíme do 30 dní, ve většině případů do týdne.',
        'Při oprávněné reklamaci poskytneme dle povahy problému slevu, dopracování nebo finanční kompenzaci.',
      ] },
      { id: 'gdpr-link', title: 'Ochrana osobních údajů', body: [
        'Nakládání s osobními údaji se řídí samostatným dokumentem Ochrana osobních údajů (gdpr.html).',
      ] },
      { id: 'zaver', title: 'Závěrečná ustanovení', body: [
        'Vztahy neupravené těmito podmínkami nebo smlouvou se řídí českým právem, zejména zákonem č. 89/2012 Sb. (občanský zákoník).',
        'Případné spory budou řešeny u věcně a místně příslušného soudu v České republice.',
        'Tyto podmínky můžeme měnit. O změnách klienty informujeme nejméně 30 dní předem. Pokud klient se změnou nesouhlasí, má právo smlouvu ukončit ke dni účinnosti změny.',
      ] },
    ],
  },
};

function GdprPage()    { return <LegalPage data={LEGAL_DATA.gdpr} />; }
function CookiesPage() { return <LegalPage data={LEGAL_DATA.cookies} />; }
function ObchodniPage(){ return <LegalPage data={LEGAL_DATA.obchodni} />; }

Object.assign(window, { LegalPage, LEGAL_DATA, GdprPage, CookiesPage, ObchodniPage });
