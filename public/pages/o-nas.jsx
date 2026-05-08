// /o-nas — tváře, story, hodnoty
function ONasPage() {
  const team = [
    { name: 'Honza Horák', role: 'Founder & strategy', bio: '8 let v retenčním marketingu. Před Boostmail vedl email pro Notino a Alza. Má rád espresso, jazz a A/B testy.', linkedin: '#' },
    { name: 'Eliška Poláková', role: 'Head of automation', bio: 'Bývalá data analytička. Stojí za 200+ live automatizacemi v Klaviyo a HubSpotu. V noci píše SQL pro radost.', linkedin: '#' },
    { name: 'Tomáš Veselý', role: 'Senior copywriter', bio: 'Píše emaily, které lidi otevírají. 12 let v reklamě, posledních 5 jen v retenci. Ironie z Brna.', linkedin: '#' },
    { name: 'Karolína Mlynářová', role: 'Account director', bio: 'Vaše první číslo. Drží projekty pohromadě, hlídá termíny a překládá z marketinger-čtiny.', linkedin: '#' },
  ];
  const values = [
    { n: '01', name: 'Čísla, ne pocity', desc: 'Každé doporučení podloženo daty. Když to nevíme, řekneme to.' },
    { n: '02', name: 'Transparentnost', desc: 'Vidíte všechny účty, KPI, A/B testy. Nic neschováváme.' },
    { n: '03', name: 'Dlouhodobost', desc: 'Žádné 3měsíční sprinty. Pracujeme s klienty 2+ roky.' },
    { n: '04', name: 'Kvalita > kvantita', desc: 'Bereme max 8 klientů. Když to nezvládáme, řekneme ne.' },
  ];
  return (
    <BMPage active="o-nas">
      <BMHero
        kicker="O NÁS"
        title={<>Lidé, kteří vám zhodnotí <em style={{ fontWeight: 400, color: BM_ACCENT }}>databázi.</em></>}
        sub="Boostmail založil v roce 2022 Honza Horák po 8 letech v inhouse týmech velkých e-shopů. Frustrovala ho jedna věc: 90 % marketingu jde na akvizici, ale 80 % zisku je v existujících zákaznících."
      />
      <section className="bm-section bm-rise" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <BMMonoLabel n="02" text="TÝM" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 32px', letterSpacing: '-0.03em', lineHeight: 1 }}>Lidé za prací.</h2>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {team.map(p => (
              <div key={p.name} className="bm-card" style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${BM_ACCENT}25, ${BM_ACCENT}10)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: BM_ACCENT }}>
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{p.name}</h3>
                  <div style={{ fontSize: 13, color: BM_ACCENT, fontWeight: 600, marginBottom: 10 }}>{p.role}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)', marginBottom: 12 }}>{p.bio}</div>
                  <a href={p.linkedin} style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>↗ LINKEDIN</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bm-section" style={{ padding: '80px 56px', background: '#f4f4f4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="03" text="HODNOTY" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 40px', letterSpacing: '-0.03em', lineHeight: 1 }}>Čemu věříme.</h2>
          <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {values.map(v => (
              <div key={v.n} style={{ padding: 28, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14 }}>
                <div style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, marginBottom: 12 }}>[{v.n}]</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{v.name}</h3>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)' }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.ONasPage = ONasPage;
