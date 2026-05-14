// /reseni — přehled segmentů
function ReseniPage() {
  const primary = {
    key: 'barber',
    icon: '💈',
    name: 'Barbershopy',
    desc: 'Vrátíme stálé zákazníky barbershopu zpátky do křesla. Pět reálných situací, kdy posíláme e-mail. Žádné slevové letáky, žádný spam.',
    proof: '4 barbershopy v ČR · spolupráce od konce roku 2025',
    metrics: [
      'Den po střihu se ptáme na zpětnou vazbu',
      'Když je čas na další střih, připomeneme ho',
      'Volné okno v rozvrhu doplníme stálými klienty',
      'Po zrušení termínu do dvou minut oslovíme čekající',
    ],
  };

  const soon = [
    { key: 'beauty', icon: '💅', name: 'Kosmetičky', desc: 'Opakovaná péče bez prázdných oken. Cykly podle typu ošetření.' },
    { key: 'wellness', icon: '🧖', name: 'Wellness', desc: 'Naplněné víkendy, předvídatelný obrat. Vracení stálých hostů.' },
    { key: 'auto', icon: '🚗', name: 'Autoservisy', desc: 'STK, sezónní výměny, plánovaný servis. Připomínky podle data prohlídky.' },
  ];

  return (
    <BMPage active="reseni">
      <BMHero
        kicker="ŘEŠENÍ / SEGMENTY"
        title={<>Specializujeme se na <em style={{ fontWeight: 400, color: BM_ACCENT }}>barbershopy.</em></>}
        sub="Jeden obor, do hloubky. Pro barbershop máme pět reálných flow, které běží v produkci u našich klientů. Další obory připravujeme. Pokud do nich patříte, dejte vědět, ozveme se, až spustíme."
        ctaPrimary={{ label: 'Detail Barbershopy →', href: 'reseni-barber.html' }}
        ctaSecondary={{ label: 'Případovky', href: 'pripadovky.html' }}
      />

      {/* Primary niche — full card */}
      <section className="bm-section bm-rise" style={{ padding: '20px 56px 40px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <a id="barber" href="reseni-barber.html" className="bm-card bm-card-hover" style={{
            display: 'grid', gridTemplateColumns: '1.1fr 1fr', textDecoration: 'none', color: 'inherit',
            overflow: 'hidden', scrollMarginTop: 100,
          }}>
            <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '6px 12px', background: `${BM_ACCENT}12`, color: BM_ACCENT, borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, fontWeight: 600, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: BM_ACCENT }} /> HLAVNÍ ZAMĚŘENÍ · LIVE
              </div>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{primary.icon}</div>
              <h3 style={{ fontSize: 48, fontWeight: 700, margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1 }}>{primary.name}</h3>
              <div style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)', marginBottom: 22, maxWidth: 520 }}>{primary.desc}</div>
              <div style={{ background: '#0a0a0a', color: '#fff', display: 'inline-block', alignSelf: 'flex-start', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
                Nextlevel: 58 rezervací z e-mailu / měsíc · 45 792 Kč obratu
              </div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 10 }}>{primary.proof.toUpperCase()}</div>
              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: BM_ACCENT }}>Detail řešení →</div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${BM_ACCENT}, #0f3fa0)`, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, marginBottom: 4 }}>CO REÁLNĚ POSÍLÁME</div>
              {primary.metrics.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, opacity: 0.9 }}>✓</span>
                  <span style={{ color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{m}</span>
                </div>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* Soon niches */}
      <section className="bm-section bm-rise" style={{ padding: '40px 56px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <BMMonoLabel n="02" text="PŘIPRAVUJEME" />
          <h2 className="bm-section-title" style={{ fontSize: 40, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.03em' }}>Další obory, kam se chystáme.</h2>
          <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', marginBottom: 32, maxWidth: 720, lineHeight: 1.55 }}>
            Principy retence jsou všude podobné. Než ale spustíme do dalšího oboru, chceme mít první klienty, na kterých si systém odladíme. Pokud jste z některého z těchto oborů, napište nám. Dáme vědět, až spustíme.
          </div>
          <div className="bm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {soon.map(s => (
              <a key={s.key} id={s.key} href="kontakt.html" className="bm-card bm-card-hover" style={{ padding: 32, textDecoration: 'none', color: 'inherit', display: 'block', scrollMarginTop: 100, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1.5, padding: '4px 10px', background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.6)', borderRadius: 999, fontWeight: 600 }}>JIŽ BRZY</div>
                <div style={{ fontSize: 44, marginBottom: 18 }}>{s.icon}</div>
                <h3 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{s.name}</h3>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.6)', marginBottom: 20 }}>{s.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: BM_ACCENT }}>Dejte mi vědět, až spustíte →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bm-section" style={{ padding: '80px 56px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <BMMonoLabel n="?" text="NEJSTE SI JISTÍ?" center dark />
          <h2 className="bm-section-title" style={{ fontSize: 56, fontWeight: 700, margin: '20px 0 16px', letterSpacing: '-0.03em', lineHeight: 1 }}>Patří váš obor mezi naše?</h2>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.55 }}>
            Patnáct minut hovoru a řekneme rovnou. I kdybychom nebyli ti praví.
          </div>
          <a href="kontakt.html" style={{ display: 'inline-block', padding: '16px 28px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Vybrat termín →</a>
        </div>
      </section>
    </BMPage>
  );
}
window.ReseniPage = ReseniPage;
