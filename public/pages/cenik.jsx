// /cenik — interaktivní ceník pro barbery s DB sliderem
function CenikPage() {
  const TIERS = [
    { name: 'Starter', range: 'do 1 500', min: 0, max: 1500, setup: 10000, monthly: 3000, desc: 'Pro nově otevřené barbershop nebo malou solo provozovnu.', features: ['Audit + napojení dat', '2 základní automatizace', 'Měsíční email kampaň', 'Slack support'] },
    { name: 'Standard', range: '1 500–3 500', min: 1500, max: 3500, setup: 15000, monthly: 5000, desc: 'Sweet-spot pro rozjetý barbershop s 1–2 holiči.', features: ['Vše ze Starter', '4 automatizace (rebooking, no-show, vouchery)', '2 email kampaně/měsíc', 'A/B testy', 'Měsíční reporting'] },
    { name: 'Pro', range: '3 500–6 500', min: 3500, max: 6500, setup: 20000, monthly: 8000, desc: 'Pro více lokací nebo barbershop s plnou kapacitou.', features: ['Vše ze Standard', '6 automatizací + SMS', '4 kampaně/měsíc', 'Pokročilá segmentace', 'Týdenní reporting'] },
    { name: 'Premium', range: '6 500–8 999', min: 6500, max: 9000, setup: 25000, monthly: 10000, desc: 'Pro síť provozoven s pokročilým marketingem.', features: ['Vše z Pro', 'Multi-lokace personalizace', 'Birthday + loyalty programy', 'Predikce churnu', 'Dedikovaný consultant'], starred: true },
    { name: 'Custom', range: '9 000+', min: 9000, max: Infinity, setup: 'od 30 000', monthly: 'od 12 000', desc: 'Pro velké sítě a franchisy. Cena se odvíjí od integrace a rozsahu.', features: ['Plně custom řešení', 'Vlastní integrace s POS / rezervačním systémem', 'API + napojení na BI', 'Týdenní strategický hovor', 'Senior consultant + tým'] },
  ];
  const [db, setDb] = React.useState(2400);
  const tier = React.useMemo(() => TIERS.find(t => db >= t.min && db < t.max) || TIERS[TIERS.length - 1], [db]);
  const fmtCZK = (v) => typeof v === 'number' ? v.toLocaleString('cs-CZ') + ' Kč' : v + ' Kč';
  return (
    <BMPage active="cenik">
      <BMHero
        kicker="CENÍK · BARBERSHOPY"
        title={<>Cena podle <em style={{ fontWeight: 400, color: BM_ACCENT }}>velikosti</em> vaší databáze.</>}
        sub="Posuňte slider podle počtu kontaktů ve vašem rezervačním systému. Ukážeme rovnou tier, který vám sedne."
      />

      {/* INTERACTIVE FINDER */}
      <section className="bm-section bm-rise" style={{ padding: '20px 56px 60px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 18, padding: 36 }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>VAŠE DATABÁZE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#0a0a0a' }}>{db.toLocaleString('cs-CZ')}</span>
            <span style={{ fontSize: 18, color: 'rgba(0,0,0,0.5)' }}>kontaktů</span>
          </div>
          <input type="range" min="200" max="12000" step="100" value={db} onChange={e => setDb(+e.target.value)}
            style={{ width: '100%', accentColor: BM_ACCENT, marginTop: 18, marginBottom: 8 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.4)', letterSpacing: 1, marginBottom: 28 }}>
            <span>200</span><span>3 000</span><span>6 000</span><span>9 000</span><span>12 000+</span>
          </div>

          {/* Recommended tier */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 28, background: `${BM_ACCENT}08`, border: `1px solid ${BM_ACCENT}33`, borderRadius: 14 }} className="bm-grid-2">
            <div>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, letterSpacing: 1.5, marginBottom: 6, fontWeight: 600 }}>↓ DOPORUČENÝ TIER</div>
              <h3 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{tier.name}</h3>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>DB rozsah: {tier.range} kontaktů</div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)' }}>{tier.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 16, background: '#fff', borderRadius: 10, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 4 }}>SETUP (jednorázově)</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}>{fmtCZK(tier.setup)}</div>
              </div>
              <div style={{ padding: 16, background: '#0a0a0a', color: '#fff', borderRadius: 10 }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.55)', letterSpacing: 1, marginBottom: 4 }}>MĚSÍČNĚ</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.02em' }}>{fmtCZK(tier.monthly)}</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }} className="bm-grid-2">
            {tier.features.map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'rgba(0,0,0,0.75)' }}>
                <span style={{ color: BM_ACCENT, fontWeight: 700 }}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <a href="/kontakt" style={{
            display: 'block', textAlign: 'center', marginTop: 28, padding: '16px 24px',
            background: '#0a0a0a', color: '#fff', borderRadius: 999,
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
          }}>📅 Domluvit hovor o {tier.name} →</a>
        </div>
      </section>

      {/* FULL TABLE */}
      <section className="bm-section" style={{ padding: '40px 56px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <BMMonoLabel n="02" text="VŠECHNY TIERY" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '12px 0 24px', letterSpacing: '-0.03em' }}>Přehled všech variant.</h2>
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr', padding: '16px 24px', background: '#0a0a0a', color: '#fff', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, fontWeight: 600 }}>
              <div>TIER</div><div>DB ROZSAH</div><div>SETUP</div><div>MONTHLY</div>
            </div>
            {TIERS.map((t, i) => {
              const isActive = t.name === tier.name;
              return (
                <div key={t.name} className="bm-tier-row" style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr',
                  padding: '20px 24px', alignItems: 'center',
                  borderBottom: i < TIERS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  background: isActive ? `${BM_ACCENT}08` : '#fff',
                  position: 'relative',
                }}>
                  {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: BM_ACCENT }} />}
                  <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 10 }}>
                    {t.name}
                    {t.starred && <span style={{ color: BM_ACCENT, fontSize: 12 }}>★</span>}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', fontFamily: 'JetBrains Mono, monospace' }}>{t.range}</div>
                  <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>{fmtCZK(t.setup)}</div>
                  <div style={{ fontSize: 14, color: isActive ? BM_ACCENT : 'rgba(0,0,0,0.85)', fontWeight: isActive ? 700 : 500 }}>
                    {fmtCZK(t.monthly)}{t.starred && '*'}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 14, fontFamily: 'JetBrains Mono, monospace' }}>* Premium: měsíční fee se přizpůsobuje rozsahu kampaní.</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bm-section" style={{ padding: '60px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <BMMonoLabel n="?" text="ČASTÉ OTÁZKY" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '16px 0 32px', letterSpacing: '-0.03em' }}>Co byste se ještě zeptali.</h2>
          {[
            { q: 'Co když moje DB roste a vyroste z tieru?', a: 'Tier upgradeujeme v půlročních review. Žádné skokové dorovnávání — když přerostete, dohodneme se férově.' },
            { q: 'Co když mám databázi pod 1 500 kontaktů?', a: 'Sweet-spot pro retenci je od ~1 500. Pod tím vám doporučíme nejdřív akvizici. Řekneme rovnou na úvodním hovoru, nebudeme vám prodávat něco, co se nevyplatí.' },
            { q: 'Pracujete s mým rezervačním systémem?', a: 'Reservio, Bookio, Reservation Hub, vlastní řešení — máme univerzální napojení na většinu z nich. U Custom tieru řešíme integrace na míru.' },
            { q: 'Garantujete výsledky?', a: 'Ne, a kdo to dělá, lže. Garantujeme proces, transparentnost a 4–10× zhodnocení poplatku u většiny barberů. Po 90 dnech si sedneme a podíváme se na čísla.' },
            { q: 'Kdy začneme vidět výsledky?', a: 'První automatizace běží do 30 dnů od podpisu. První čísla — open rate, rezervace navíc — vidíte po 60 dnech. Plný efekt cca po 4 měsících.' },
          ].map(f => (
            <details key={f.q} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '18px 0' }}>
              <summary style={{ fontSize: 17, fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', marginTop: 10 }}>{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </BMPage>
  );
}
window.CenikPage = CenikPage;
