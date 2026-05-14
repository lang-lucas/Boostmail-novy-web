// /jak-pracujeme — proces krok za krokem
function JakPracujemePage() {
  const steps = [
    {
      n: '01',
      name: 'Předání databáze',
      dur: 'Týden 1',
      desc: 'Napojíme se na váš rezervační systém. Převezmeme historii zákazníků a jejich návštěv. Zkontrolujeme, že máme dost dat na to, abychom mohli flow rozumně rozjet.',
      deliverables: [
        'Připojení k rezervačnímu systému',
        'Audit databáze a kvality dat',
        'Honest report, jestli dává smysl pokračovat',
      ],
    },
    {
      n: '02',
      name: 'Nastavení flow',
      dur: 'Týdny 2 až 3',
      desc: 'Sepneme jednotlivé situace. Přizpůsobíme jazyk a timing vašemu barbershopu. První dva týdny ladíme, než se to usadí. Vy během toho normálně provozujete podnik, my pracujeme na pozadí.',
      deliverables: [
        'Spuštěné flow ve všech pěti situacích',
        'Šablony e-mailů v tone of voice vašeho podniku',
        'Schválení každé šablony před odesláním',
      ],
    },
    {
      n: '03',
      name: 'První report po měsíci',
      dur: 'Týden 6',
      desc: 'Pošleme report s počtem rezervací z e-mailu, jejich hodnotou a poznámkami, co fungovalo a co ne. Pak se domluvíme, kde doladit, a jedeme dál.',
      deliverables: [
        'Měsíční report (PDF + krátký call)',
        'Detaily per situace, ne jen souhrn',
        'Plán úprav na další měsíc',
      ],
    },
  ];

  const principles = [
    {
      title: 'Měříme rezervace, ne otevření',
      desc: 'Open rate vám ukážeme jako diagnostiku, ale to, co reportujeme, jsou rezervace, které proběhly po našem e-mailu. Last-touch attribution, jednoduše dohledatelné.',
    },
    {
      title: 'Schvalujete každou šablonu',
      desc: 'Než cokoliv odejde vašim zákazníkům, projde to vámi. První dva týdny intenzivně, později jen na vyžádání. Nikdy nepošleme nic, co byste sami nepodepsali.',
    },
    {
      title: 'Žádné dlouhé smlouvy',
      desc: 'Měsíční spolupráce, výpovědní lhůta jeden měsíc. Pokud to nefunguje, vidíte to v reportu a ukončíte. Nevadí nám to, dává to nám smysl tlačit na výsledek každý měsíc.',
    },
    {
      title: 'Honest, když se nehodíme',
      desc: 'Pokud na prvním hovoru zjistíme, že vám nepřineseme dost, řekneme to. Máme rádi dlouhodobé klienty, ne první faktury.',
    },
  ];

  const tools = [
    { name: 'Reservio', kind: 'Rezervační systém', supported: true },
    { name: 'Reservanto', kind: 'Rezervační systém', supported: true },
    { name: 'MyFox', kind: 'Rezervační systém', supported: true },
    { name: 'SmartEmailing', kind: 'Odesílání', supported: true },
    { name: 'Vlastní reporting', kind: 'Měření', supported: true },
  ];

  return (
    <BMPage active="jak-pracujeme">
      <BMHero
        kicker="JAK TO BĚŽÍ"
        title={<>Tři kroky od podpisu po <em style={{ fontWeight: 400, color: BM_ACCENT }}>první rezervace.</em></>}
        sub="Žádný tříměsíční sprint a pak ticho. Žádné prázdné prezentace. Tři jasné kroky onboardingu, pak měsíční rytmus reportů a úprav. Vy stříháte, my píšeme."
        ctaPrimary={{ label: 'Domluvit hovor →', href: 'kontakt.html' }}
      />

      {/* 3 kroky */}
      <section className="bm-section" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {steps.map(s => (
            <div key={s.n} className="bm-card" style={{ padding: 32, display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 32, alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: 56, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginTop: 6, letterSpacing: 0.5 }}>{s.dur.toUpperCase()}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{s.name}</h3>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)' }}>{s.desc}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 10 }}>DOSTANETE</div>
                {s.deliverables.map(d => (
                  <div key={d} style={{ fontSize: 13, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.75)', display: 'flex', gap: 8 }}>
                    <span style={{ color: BM_ACCENT, fontWeight: 700 }}>✓</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Měsíční rytmus */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="04" text="MĚSÍČNÍ RYTMUS" />
          <h2 className="bm-section-title" style={{ fontSize: 48, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Co se děje každý měsíc.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 32, maxWidth: 720, lineHeight: 1.55 }}>
            Po onboardingu jedeme v jednoduchém měsíčním rytmu. Žádné týdenní statusy, žádné nesmyslné meetingy. Klidná práce v pozadí a jeden poctivý report.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { title: 'Měsíční report', desc: 'PDF s počtem rezervací z e-mailu, jejich hodnotou, otevíraností. Per situace, ne jen souhrn.' },
              { title: 'Patnáctiminutový call', desc: 'Krátký hovor po reportu. Co fungovalo, co ne, kde upravit. Bez prezentací a slidů.' },
              { title: 'Průběžné ladění', desc: 'Pokud něco vyžaduje úpravu mezi reporty (nové ceny, novinka v rozvrhu), řešíme to e-mailem nebo přes Slack.' },
            ].map(b => (
              <div key={b.title} style={{ padding: 28, background: '#f9f9f9', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{b.title}</h3>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pravidla */}
      <section className="bm-section" style={{ padding: '80px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="05" text="PRAVIDLA SPOLUPRÁCE" />
          <h2 className="bm-section-title" style={{ fontSize: 48, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Čemu věříme.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 32, maxWidth: 720, lineHeight: 1.55 }}>
            Pár principů, podle kterých pracujeme. Stejné věci říkáme klientovi na prvním hovoru a stejné věci dodržujeme po roce spolupráce.
          </div>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {principles.map(p => (
              <div key={p.title} className="bm-card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nástroje */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="06" text="NÁSTROJE" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em' }}>
            S čím to běží.
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 28, maxWidth: 720, lineHeight: 1.55 }}>
            Nepoužíváme nic přepáleného. Tři české rezervační systémy, jedna odesílací infrastruktura, vlastní vrstva pro reporting a měření.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {tools.map(t => (
              <div key={t.name} style={{
                padding: '14px 20px',
                background: '#f4f4f4',
                borderRadius: 999,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)' }}>· {t.kind}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.55, maxWidth: 720 }}>
            Používáte jiný rezervační systém? Pokud má API, dá se na něj napojit. Stačí napsat.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#0a0a0a', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Pojďme se domluvit, jak to <em style={{ fontWeight: 400, color: BM_ACCENT }}>rozjet.</em>
          </h2>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.55 }}>
            Patnáct minut hovoru zdarma. Probereme váš barbershop, podíváme se na databázi a řekneme rovnou, jestli to dává smysl.
          </div>
          <a href="kontakt.html" style={{ display: 'inline-block', padding: '16px 28px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Vybrat termín →
          </a>
        </div>
      </section>
    </BMPage>
  );
}
window.JakPracujemePage = JakPracujemePage;
