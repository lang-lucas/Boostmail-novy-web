// /jak-pracujeme — proces
function JakPracujemePage() {
  const steps = [
    { n: '01', name: 'Audit databáze', dur: '1 týden', desc: 'Analyzujeme vaši databázi: kvalita kontaktů, segmentace, historie kampaní, technický stack. Dostanete report s konkrétními čísly: kolik peněz vám tam leží.', deliverables: ['Audit dokument (24+ stran)', 'Heatmapa segmentů', 'ROI projekce na 12 měsíců'] },
    { n: '02', name: 'Strategie', dur: '2 týdny', desc: 'Postavíme retenční roadmapu: které kampaně, v jakém pořadí, s jakými KPI. Vždy 3 prioritní automatizace pro první 90 dní.', deliverables: ['Retenční strategie', 'Customer journey mapa', 'KPI dashboard setup'] },
    { n: '03', name: 'Implementace', dur: '3–6 týdnů', desc: 'Postavíme automatizace v Klaviyo / Mailchimp / SmartEmailing. Nastavíme tracking, integrujeme s e-shopem či CRM, otestujeme všechny flows.', deliverables: ['Live automatizace', 'Email šablony (10–15)', 'Tracking & integrace'] },
    { n: '04', name: 'Optimalizace', dur: 'průběžně', desc: 'Měsíční reporting, A/B testy, iterace. Každý kvartál velký review a strategická úprava. Vy se soustředíte na byznys, my na čísla.', deliverables: ['Měsíční report (PDF + call)', 'A/B test backlog', 'Strategický kvartál'] },
  ];
  const tools = [
    { name: 'Klaviyo', kind: 'Email & SMS', logo: '✉️' },
    { name: 'Mailchimp', kind: 'Email', logo: '📬' },
    { name: 'SmartEmailing', kind: 'Email (CZ)', logo: '🇨🇿' },
    { name: 'Make', kind: 'Automatizace', logo: '🔗' },
    { name: 'Zapier', kind: 'Integrace', logo: '⚡' },
    { name: 'Looker Studio', kind: 'Reporting', logo: '📊' },
    { name: 'HubSpot', kind: 'CRM (B2B)', logo: '🎯' },
    { name: 'Shopify / WooCom', kind: 'E-shop', logo: '🛒' },
  ];
  return (
    <BMPage active="jak-pracujeme">
      <BMHero
        kicker="JAK PRACUJEME"
        title={<>Marketing řízený daty, ne <em style={{ fontWeight: 400, color: BM_ACCENT }}>pocity.</em></>}
        sub="Žádný 'tříměsíční sprint' a pak ticho. Pracujeme jako součást vašeho týmu — dlouhodobě, transparentně, s reportingem co máte rádi."
        ctaPrimary={{ label: '📅 Domluvit hovor →', href: 'kontakt.html' }}
      />
      <section className="bm-section" style={{ padding: '60px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={s.n} className="bm-card" style={{ padding: 32, display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 32, alignItems: 'start' }} >
              <div>
                <div style={{ fontSize: 56, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginTop: 6 }}>{s.dur}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{s.name}</h3>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)' }}>{s.desc}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 10 }}>DOSTANETE</div>
                {s.deliverables.map(d => (
                  <div key={d} style={{ fontSize: 13, padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.75)' }}>✓ {d}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bm-section" style={{ padding: '80px 56px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <BMMonoLabel n="05" text="NÁSTROJE" />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '16px 0 32px', letterSpacing: '-0.03em', lineHeight: 1 }}>S čím pracujeme.</h2>
          <div className="bm-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {tools.map(t => (
              <div key={t.name} className="bm-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 28 }}>{t.logo}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{t.kind}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.JakPracujemePage = JakPracujemePage;
