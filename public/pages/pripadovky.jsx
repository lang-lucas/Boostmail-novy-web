// /pripadovky — index všech case studies
function PripadovkyPage() {
  const cases = [
    { slug: 'kava-cz', name: 'Káva.cz', segment: 'E-shop', img: '☕', headline: 'Z 4M Kč/měs na 11M za 9 měsíců', metric: '+184%', metricLabel: 'revenue z emailu', tags: ['Winback', 'Abandoned cart'] },
    { slug: 'barbershop-mr', name: 'Barbershop Mirek', segment: 'Salón', img: '✂️', headline: 'No-shows z 22% na 8%', metric: '−62%', metricLabel: 'no-shows za 6 měsíců', tags: ['SMS reminder', 'Rebooking'] },
    { slug: 'restaurace-ono', name: 'Restaurace ONO', segment: 'Gastro', img: '🍽️', headline: 'Stálí hosté: 32% → 58%', metric: '2.4×', metricLabel: 'repeat visits', tags: ['Loyalty', 'Events'] },
    { slug: 'optika-vize', name: 'Optika Vize', segment: 'Retail', img: '👓', headline: 'Doživotní hodnota +340%', metric: '+340%', metricLabel: 'LTV', tags: ['Recall', 'Cross-sell'] },
    { slug: 'fitness-pulse', name: 'Pulse Fitness', segment: 'Služby', img: '💪', headline: 'Členská retence 67% → 84%', metric: '+17pp', metricLabel: 'retention rate', tags: ['Onboarding', 'Reaktivace'] },
    { slug: 'b2b-saas', name: 'NodeFlow SaaS', segment: 'B2B', img: '⚙️', headline: 'Sales cycle z 67 na 42 dní', metric: '−37%', metricLabel: 'time to close', tags: ['Lead nurturing', 'Segmentace'] },
  ];
  return (
    <BMPage active="pripadovky">
      <BMHero
        kicker="PŘÍPADOVÉ STUDIE"
        title={<>Reálná čísla,<br/><em style={{ fontWeight: 400, color: BM_ACCENT }}>reální klienti.</em></>}
        sub="20+ firem, kterým jsme pomohli zhodnotit databázi. Žádný marketingový bullshit — jen výchozí stav, co jsme udělali a kolik to přineslo."
      />
      <section className="bm-section bm-rise" style={{ padding: '60px 56px' }}>
        <div className="bm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 1300, margin: '0 auto' }}>
          {cases.map(c => (
            <a key={c.slug} href={`pripadovky-${c.slug}.html`} className="bm-card bm-card-hover" style={{ padding: 0, textDecoration: 'none', color: 'inherit', display: 'block', overflow: 'hidden' }}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${BM_ACCENT}15, ${BM_ACCENT}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>{c.img}</div>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 8 }}>{c.segment.toUpperCase()}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{c.name}</h3>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)', lineHeight: 1.4, marginBottom: 16 }}>{c.headline}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.02em' }}>{c.metric}</span>
                  <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{c.metricLabel}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '4px 10px', background: '#f4f4f4', borderRadius: 999, color: 'rgba(0,0,0,0.6)' }}>{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="bm-section" style={{ padding: '60px 56px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', marginBottom: 16 }}>Chcete svoji case study?</div>
        <a href="/kontakt" style={{ display: 'inline-block', padding: '14px 24px', background: '#0a0a0a', color: '#fff', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>📅 Domluvit hovor →</a>
      </section>
    </BMPage>
  );
}
window.PripadovkyPage = PripadovkyPage;
