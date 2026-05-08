// /reseni — přehled segmentů
function ReseniPage() {
  const segments = [
    { key: 'eshop', icon: '🛒', name: 'E-shopy', desc: 'Winback kampaně, abandoned cart, doporučení produktů na míru.', kpi: '+34% revenue z databáze', metrics: ['Open rate 42%', 'CTR 8.2%', 'AOV +18%'] },
    { key: 'barber', icon: '✂️', name: 'Barbershopy & salóny', desc: 'No-show prevention, narozeninové vouchery, reaktivace klientů.', kpi: '−62% no-shows', metrics: ['Rebook rate 71%', 'Reaktivace 28%', 'NPS +24'] },
    { key: 'restaurace', icon: '🍽️', name: 'Restaurace', desc: 'Rezervační flow, věrnostní program, eventový marketing.', kpi: '+2.4× návratnost', metrics: ['Repeat rate 58%', 'Avg check +14%', 'Reservations 3.1×'] },
    { key: 'b2b', icon: '🏢', name: 'B2B služby', desc: 'Lead nurturing, segmentace pipeline, content automation.', kpi: '4.8× delší LTV', metrics: ['MQL → SQL 38%', 'Sales cycle −22%', 'Email ROI 11×'] },
  ];
  return (
    <BMPage active="reseni">
      <BMHero
        kicker="ŘEŠENÍ / SEGMENTY"
        title={<>Pro každý obor <em style={{ fontWeight: 400, color: BM_ACCENT }}>vlastní</em> přístup.</>}
        sub="Nepoužíváme šablony. Pro každý segment máme vlastní knihovnu kampaní, automatizací a benchmarků postavenou na desítkách klientů."
        ctaPrimary={{ label: '💸 Spočítat potenciál →', href: 'kontakt.html' }}
        ctaSecondary={{ label: '📂 Případové studie', href: 'pripadovky.html' }}
      />
      <section className="bm-section bm-rise" style={{ padding: '60px 56px' }}>
        <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1300, margin: '0 auto' }}>
          {segments.map(s => (
            <a key={s.key} id={s.key} href={`reseni-${s.key}.html`} className="bm-card bm-card-hover" style={{ padding: 40, textDecoration: 'none', color: 'inherit', display: 'block', scrollMarginTop: 100 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{s.name}</h3>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)', marginBottom: 24 }}>{s.desc}</div>
              <div style={{ background: '#0a0a0a', color: '#fff', display: 'inline-block', padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>{s.kpi}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>
                {s.metrics.map(m => <span key={m} style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.55)' }}>{m}</span>)}
              </div>
              <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: BM_ACCENT }}>Detail řešení →</div>
            </a>
          ))}
        </div>
      </section>
      <section className="bm-section" style={{ padding: '80px 56px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <BMMonoLabel n="?" text="NEJSTE SI JISTÍ?" center />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '20px 0 16px', letterSpacing: '-0.03em', lineHeight: 1 }}>Nevíte, do kterého segmentu patříte?</h2>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>30 minut hovoru a řekneme vám rovnou — i kdybychom nebyli ti praví.</div>
          <a href="/kontakt" style={{ display: 'inline-block', padding: '16px 28px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>📅 Vybrat termín →</a>
        </div>
      </section>
    </BMPage>
  );
}
window.ReseniPage = ReseniPage;
