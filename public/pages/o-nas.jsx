// /o-nas — story, tým, hodnoty
function ONasPage() {
  const team = [
    {
      name: 'Lukáš Lang',
      role: 'Co-founder, CTO',
      bio: 'Stojí za vším, co v Boostmailu běží na pozadí. Před Boostmailem dělal weby, e-shopy a marketingové automatizace pro lokální podnikatele. Když se ho zeptáte na Apple Mail Privacy, jen tak nepřestane.',
      linkedin: 'https://www.linkedin.com/in/luk%C3%A1%C5%A1-lang/',
    },
    {
      name: 'Vojtěch Nerad',
      role: 'Co-founder, CMO',
      bio: 'Píše e-maily, které lidi otevírají. Dlouho dělal marketing pro malé a střední firmy, dokud nedošlo na to, že většinu zákazníků mají firmy už ve vlastní databázi. Tak založil s Lukášem Boostmail.',
      linkedin: 'https://www.linkedin.com/in/vojta-nerad-9b6b73394/',
    },
  ];

  const values = [
    {
      n: '01',
      name: 'Čísla, ne pocity',
      desc: 'Doporučení podkládáme daty z vašich kampaní. Když něco nevíme, řekneme to. Když si nejsme jistí přínosem, řekneme to taky.',
    },
    {
      n: '02',
      name: 'Měříme, co se reálně stalo',
      desc: 'Sledujeme rezervace, které proběhly po našem e-mailu. Ne open rate, ne kliky, ne odhady. Rezervace. Vidíte je v reportu každý měsíc.',
    },
    {
      n: '03',
      name: 'Nehodíme se každému',
      desc: 'Pokud nemáte databázi zákazníků, není s čím pracovat. Pokud čekáte slevovou masakru, řekneme to dopředu. Šetří to čas oběma stranám.',
    },
    {
      n: '04',
      name: 'Specializace, ne všechno',
      desc: 'Děláme e-maily pro barbershopy. Ne web, ne reklamu, ne sociální sítě. Jednu věc dobře. Další obory plánujeme, ale postupně.',
    },
  ];

  return (
    <BMPage active="o-nas">
      <BMHero
        kicker="O NÁS"
        title={<>Začínali jsme u reklam. <em style={{ fontWeight: 400, color: BM_ACCENT }}>Skončili u retence.</em></>}
        sub="Boostmail založili Lukáš Lang a Vojtěch Nerad na konci roku 2025. Dělali roky weby a reklamy pro malé podnikatele a postupně viděli to samé pořád dokola: na nového zákazníka šly tisíce, na stávající nepřišel ani jeden e-mail."
      />

      {/* STORY */}
      <section className="bm-section bm-rise" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <BMMonoLabel n="02" text="STORY" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 32px', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Jak Boostmail vznikl.
          </h2>
          <div style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(0,0,0,0.78)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ margin: 0 }}>
              Když jsme s Vojtou začínali první projekt, dělali jsme úplně něco jiného. Stavěli jsme weby a sypali peníze do reklam. Klienti byli spokojení, my taky, ale po pár letech jsme začali vidět to samé pořád dokola.
            </p>
            <p style={{ margin: 0 }}>
              Reklama přivede nového zákazníka. Drahého. Ten přijde jednou, možná dvakrát, a pak se na něj zapomene. Mezitím v databázi sedí stovky lidí, kteří už jednou nakoupili a nikdo je neoslovuje. Říkali jsme si, že tohle je škoda.
            </p>
            <p style={{ margin: 0 }}>
              Pak jsme se rozhodli, že se přesně na tohle specializujeme. Tak vznikl Boostmail. Firma, která vrací stálé zákazníky barbershopů zpátky do křesla. Místo aby si je museli kupovat reklamou znova.
            </p>
          </div>
        </div>
      </section>

      {/* TÝM */}
      <section className="bm-section bm-rise" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="03" text="TÝM" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 32px', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Lidé za prací.
          </h2>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {team.map(p => (
              <div key={p.name} className="bm-card" style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${BM_ACCENT}25, ${BM_ACCENT}10)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: BM_ACCENT }}>
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{p.name}</h3>
                  <div style={{ fontSize: 13, color: BM_ACCENT, fontWeight: 600, marginBottom: 10 }}>{p.role}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)', marginBottom: 12 }}>{p.bio}</div>
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>↗ LINKEDIN</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HODNOTY */}
      <section className="bm-section" style={{ padding: '80px 56px', background: '#f4f4f4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="04" text="HODNOTY" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 40px', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Čemu věříme.
          </h2>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {values.map(v => (
              <div key={v.n} style={{ padding: 28, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14 }}>
                <div style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, marginBottom: 12 }}>[{v.n}]</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{v.name}</h3>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.ONasPage = ONasPage;
