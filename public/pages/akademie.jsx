// /akademie — blog & resources hub
function AkademiePage() {
  const featured = { title: 'Kompletní průvodce winback kampaněmi pro e-shop', excerpt: '12 minut čtení. Krok za krokem od prvního emailu po finální slevu — včetně šablon, načasování a benchmarků z 50+ e-shopů.', tag: 'PRŮVODCE', date: '24. dubna 2026', read: '12 min', img: '📧' };
  const articles = [
    { title: 'Email open rate v 2026: nové benchmarky podle segmentu', tag: 'Benchmarky', read: '6 min', date: '18. 4. 2026' },
    { title: '5 automatizací, které byste měli mít před akvizicí', tag: 'Strategie', read: '8 min', date: '10. 4. 2026' },
    { title: 'Jak segmentovat databázi, aniž byste ji rozbili', tag: 'Tutorial', read: '10 min', date: '2. 4. 2026' },
    { title: 'A/B test, který nám zvedl revenue o 34 %', tag: 'Case study', read: '5 min', date: '25. 3. 2026' },
    { title: 'Klaviyo vs Mailchimp vs SmartEmailing — co kdy', tag: 'Srovnání', read: '14 min', date: '18. 3. 2026' },
    { title: 'GDPR a email marketing: co se změnilo v 2026', tag: 'Legal', read: '7 min', date: '10. 3. 2026' },
  ];
  return (
    <BMPage active="akademie">
      <BMHero
        kicker="AKADEMIE"
        title={<>Vědomosti, které <em style={{ fontWeight: 400, color: BM_ACCENT }}>fungují.</em></>}
        sub="Žádný bullshit content. Jen praktické návody, benchmarky a šablony, které používáme s našimi klienty každý den."
      />
      <section className="bm-section" style={{ padding: '40px 56px' }}>
        <a href="#" className="bm-card bm-card-hover" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1300, margin: '0 auto', textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}>
          <div style={{ background: `linear-gradient(135deg, ${BM_ACCENT}, #5d8cea)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, minHeight: 320 }}>
            {featured.img}
          </div>
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1 }}>
              <span style={{ background: '#0a0a0a', color: '#fff', padding: '4px 10px', borderRadius: 999 }}>{featured.tag}</span>
              <span>{featured.date}</span>
              <span>· {featured.read}</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{featured.title}</h2>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)' }}>{featured.excerpt}</div>
            <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: BM_ACCENT }}>Číst článek →</div>
          </div>
        </a>
      </section>
      <section className="bm-section" style={{ padding: '40px 56px 80px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <h3 style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1.5, marginBottom: 24 }}>VŠECHNY ČLÁNKY</h3>
          <div className="bm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {articles.map(a => (
              <a key={a.title} href="#" className="bm-card bm-card-hover" style={{ padding: 24, textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ display: 'flex', gap: 10, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 14 }}>
                  <span style={{ background: '#f4f4f4', padding: '3px 10px', borderRadius: 999 }}>{a.tag}</span>
                  <span>· {a.read}</span>
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{a.title}</h4>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{a.date}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="bm-section" style={{ padding: '60px 56px', background: '#0a0a0a', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Newsletter, který nemyslí, že email je mrtvý.</h2>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>1× měsíčně. Konkrétní case studies, benchmarky, A/B testy. Žádné motivační citáty.</div>
          <form style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto' }}>
            <input type="email" placeholder="vase@firma.cz" style={{ flex: 1, padding: '14px 16px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
            <button type="button" style={{ padding: '14px 22px', background: BM_ACCENT, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Odebírat →</button>
          </form>
        </div>
      </section>
    </BMPage>
  );
}
window.AkademiePage = AkademiePage;
