// /reseni-barber — plný detail Barbershopy
function ReseniBarberPage() {
  const pains = [
    {
      icon: '📉',
      title: 'Reklama je drahá',
      desc: 'Nový zákazník přes Meta nebo Google stojí stovky korun za klik. Stálý zákazník v rezervačním systému stojí desítky haléřů za e-mail.',
    },
    {
      icon: '👋',
      title: 'Zákazníci tichounce mizí',
      desc: 'Po dvou třech návštěvách na ně zapomenete. Oni na vás taky. A bez automatického připomenutí se vrátit nemusí.',
    },
    {
      icon: '🗓',
      title: 'Prázdná okna v týdnu',
      desc: 'Pondělí, středa, dopoledne. Díry v kalendáři, které nikdo aktivně nevyplňuje, jen se modlí, ať se někdo objedná.',
    },
    {
      icon: '⏱',
      title: 'Zrušené termíny',
      desc: 'Zákazník zruší den předem, slot zůstane volný. Nikdo se nepodívá, kdo by tam chtěl skočit místo něj.',
    },
  ];

  const flows = [
    {
      n: '01',
      name: 'Den po střihu',
      trigger: '24 hodin po návštěvě',
      desc: 'Zeptáme se zákazníka, jak byl spokojený. Sbíráme zpětnou vazbu a recenze. Z nevyřčené nespokojenosti uděláme řešitelný problém.',
      what: 'Zpětná vazba, recenze, případná reklamace',
    },
    {
      n: '02',
      name: 'Když je čas na další střih',
      trigger: 'individuální cyklus podle historie',
      desc: 'Připomeneme se v cyklu, který je pro daného zákazníka přirozený. Typicky 4 až 6 týdnů. Bez slev, jen ve správný moment.',
      what: 'Připomínka v cyklu, neagresivní, kontextová',
    },
    {
      n: '03',
      name: 'Volné okno v rozvrhu',
      trigger: 'na zítřek je díra v kalendáři',
      desc: 'Když má barber zítra volno, oslovíme lidi, kteří se v posledních týdnech chystali. Naplníme termín bez slevy, jen rychlejším oslovením.',
      what: 'Last-minute oslovení relevantních zákazníků',
    },
    {
      n: '04',
      name: 'Někdo zrušil termín',
      trigger: 'do dvou minut po zrušení',
      desc: 'Termín, který by jinak proplul, oslovíme čekající nebo lidi v zájmovém okruhu. Vy nepřijdete o tržbu, oni dostanou slot, na který by jinak čekali.',
      what: 'Okamžitý rebooking volného slotu',
    },
    {
      n: '05',
      name: 'Tři měsíce bez návštěvy',
      trigger: 'zákazník mlčí 90+ dní',
      desc: 'Zákazníka, který se ztratil, vracíme zpátky. Bez agresivní slevy, jen normální zpráva, která mu připomene, že jste tady.',
      what: 'Reaktivace ztracených zákazníků',
    },
  ];

  const integrations = [
    { name: 'Reservio', kind: 'Rezervační systém', supported: true },
    { name: 'Reservanto', kind: 'Rezervační systém', supported: true },
    { name: 'MyFox', kind: 'Rezervační systém', supported: true },
    { name: 'SmartEmailing', kind: 'Odesílací infrastruktura', supported: true },
    { name: 'Jiný systém', kind: 'Pošlete nám, kouknem na to', supported: false },
  ];

  return (
    <BMPage active="reseni">
      <BMHero
        kicker="ŘEŠENÍ · BARBERSHOPY"
        title={<>Reálné e-maily pro <em style={{ fontWeight: 400, color: BM_ACCENT }}>barbershopy.</em></>}
        sub="Pět situací, kdy posíláme e-mail. Žádné slevové letáky, žádné šablony stažené z internetu. Vrátíme stálé zákazníky zpátky do křesla a vy se soustředíte na to, co umíte."
        ctaPrimary={{ label: 'Spočítáme, kolik vám utíká →', href: 'kontakt.html' }}
        ctaSecondary={{ label: 'Případovka Nextlevel', href: 'pripadovky.html' }}
      />

      {/* Bolesti */}
      <section className="bm-section bm-rise" style={{ padding: '40px 56px 20px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <BMMonoLabel n="01" text="ČTYŘI BOLESTI BARBERSHOPU" />
          <h2 className="bm-section-title" style={{ fontSize: 48, fontWeight: 700, margin: '12px 0 32px', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 900 }}>
            Kde každý barbershop ztrácí peníze.
          </h2>
          <div className="bm-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {pains.map(p => (
              <div key={p.title} className="bm-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 flow situací */}
      <section className="bm-section" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <BMMonoLabel n="02" text="PĚT REÁLNÝCH SITUACÍ" />
          <h2 className="bm-section-title" style={{ fontSize: 48, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Kdy posíláme e-mail.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 32, maxWidth: 720, lineHeight: 1.55 }}>
            Každá situace má jasný trigger v rezervačním systému. Žádný plošný newsletter každý čtvrtek, jen kontextová zpráva ve správný moment.
          </div>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {flows.map(f => (
              <div key={f.n} className="bm-card" style={{ padding: 28, display: 'grid', gridTemplateColumns: '50px 1fr', gap: 20, alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.04em', lineHeight: 1 }}>{f.n}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{f.name}</h3>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 12 }}>TRIGGER: {f.trigger.toUpperCase()}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)', marginBottom: 14 }}>{f.desc}</div>
                  <div style={{ display: 'inline-block', padding: '6px 12px', background: `${BM_ACCENT}12`, color: BM_ACCENT, borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{f.what}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Výsledek Nextlevel */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 1.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            <span style={{ color: BM_ACCENT, fontWeight: 600 }}>[03]</span>
            <span>VÝSLEDEK · NEXTLEVEL, PRAHA</span>
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 700, margin: '16px 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 800 }}>
            Měsíční pohled na to, co reálně přišlo.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 720, lineHeight: 1.55 }}>
            Čísla z barbershopu Nextlevel za třicet dní. Měříme rezervace, které proběhly po našem e-mailu (last-touch attribution).
          </div>
          <div className="bm-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { k: 'Rezervace z e-mailu', v: '58', sub: 'za 30 dní' },
              { k: 'Obrat těchto rezervací', v: '45 792 Kč', sub: 'last-touch attribution' },
              { k: 'Odeslaných e-mailů', v: '878', sub: 'napříč všemi flow' },
              { k: 'Open rate', v: '28,6 %', sub: 's rezervou na bot inflation' },
            ].map(b => (
              <div key={b.k} style={{ padding: 28, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14 }}>
                <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 12 }}>{b.k.toUpperCase()}</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10 }}>{b.v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{b.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, maxWidth: 720 }}>
            Reklama na získání podobného počtu nových zákazníků by stála řádově desetitisíce. Tady proběhla nula.
          </div>
        </div>
      </section>

      {/* Integrace */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="04" text="NAPOJÍME NA VÁŠ SYSTÉM" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em' }}>
            S čím to běží.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 28, maxWidth: 700, lineHeight: 1.55 }}>
            Aktuálně máme hotové napojení na tři české rezervační systémy. Pokud používáte něco jiného, ozvěte se. Pokud má smysluplné API, dá se to udělat.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {integrations.map(i => (
              <div key={i.name} style={{
                padding: '14px 20px',
                background: i.supported ? '#f4f4f4' : 'transparent',
                border: i.supported ? '1px solid transparent' : '1px dashed rgba(0,0,0,0.2)',
                borderRadius: 999,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{i.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)' }}>· {i.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro koho to NENÍ */}
      <section className="bm-section" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="05" text="POZOR" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '12px 0 24px', letterSpacing: '-0.03em' }}>
            Pro koho se nehodíme.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              {
                title: 'Začínající barbershop bez databáze',
                desc: 'Pokud nemáte alespoň 300 zákazníků v rezervačním systému, retenční e-mail vám zatím nepřinese dost. Soustřeďte se na akvizici a vraťte se za pár měsíců.',
              },
              {
                title: 'Někdo, kdo si chce psát sám',
                desc: 'Neprodáváme software a školení. Děláme to za vás. Pokud chcete jen šablony a obsluhu si dělat sami, hodí se vám spíš Mailchimp nebo Ecomail.',
              },
              {
                title: 'Slevové masakry',
                desc: 'Pokud čekáte, že budeme posílat 30 % slevu každý týden, špatně jste si přečetli celý web. To neděláme. Kazí to cenu a nenavyšuje to obrat.',
              },
            ].map(p => (
              <div key={p.title} style={{
                padding: 28,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 14,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#0a0a0a', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Pojďme spočítat, kolik vám <em style={{ fontWeight: 400, color: BM_ACCENT }}>utíká.</em>
          </h2>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.55 }}>
            Patnáct minut hovoru zdarma. Žádná prezentace, jen vaše čísla a rovná odpověď, jestli dává smysl spolupracovat.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="kontakt.html" style={{ display: 'inline-block', padding: '16px 28px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Vybrat termín →
            </a>
            <a href="pripadovky.html" style={{ display: 'inline-block', padding: '16px 28px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Případovka Nextlevel
            </a>
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.ReseniBarberPage = ReseniBarberPage;
