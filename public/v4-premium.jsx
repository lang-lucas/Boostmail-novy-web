// V4 — Premium / Corporate
// Serial, trust-driven, case-study heavy. Quiet authority.
// Inter, restrained, business-class feel. Light/serif accent for trust.

function V4Premium() {
  const [seg, setSeg] = React.useState('barber');
  const [activeCase, setActiveCase] = React.useState(0);
  const accent = '#1a5ada';

  const cases = [
    { client: 'Lázně Vráž', segment: 'Wellness', metric: '+38%', metricLabel: 'opakovaných pobytů', period: 'za 6 měsíců', summary: 'Re-aktivační flow pro hosty 6+ měsíců nečinné. Personalizace podle typu pobytu.', emoji: '🧖' },
    { client: 'Autošíma', segment: 'Autoservis', metric: '+47%', metricLabel: 'opakovaných servisů', period: 'YoY', summary: 'STK + servisní intervaly napojené na CRM. Připomínky 14 dní předem.', emoji: '🚗' },
    { client: 'Barbershop Miroslav', segment: 'Barbershopy', metric: '8.4×', metricLabel: 'ROI z retenčních flows', period: 'za rok', summary: 'Win-back flow podle typu střihu + automatické recenze po návštěvě.', emoji: '💈' },
  ];
  const c = cases[activeCase];

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Inter, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
      letterSpacing: '-0.005em',
    }}>
      {/* NAV */}
      <nav style={{
        padding: '24px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        position: 'sticky', top: 0, background: 'rgba(244,244,244,0.95)', backdropFilter: 'blur(10px)', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 32, height: 32, background: '#0a0a0a', display: 'inline-block', borderRadius: 4, position: 'relative' }}>
            <span style={{ position: 'absolute', inset: 8, background: accent, borderRadius: 1 }}/>
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1 }}>BoostMail</div>
            <div style={{ fontSize: 10, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'rgba(0,0,0,0.5)' }}>Retention Studio</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 36, fontSize: 14, fontWeight: 500 }}>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Služby</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Případové studie</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>O nás</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Akademie</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Kontakt</a>
        </div>
        <button style={{ padding: '12px 22px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 2, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.3 }}>
          Domluvit konzultaci
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: '120px 64px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 24, letterSpacing: 2, fontWeight: 600 }}>
            ESTABLISHED 2023 — PRAGUE
          </div>
          <h1 style={{
            fontSize: 80, lineHeight: 1.0, fontWeight: 600, margin: '0 0 36px',
            letterSpacing: '-0.035em', maxWidth: 1000,
          }}>
            Specializovaná agentura <br/>na retenční marketing <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>pro segmenty</span>, <br/>které vyžadují přesnost.
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 80, alignItems: 'start' }}>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)' }}>
              Pomáháme značkám zvýšit zisk z databáze kontaktů prostřednictvím datově řízených retenčních flows, automatizace a personalizace.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '14px 24px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 2, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Domluvit konzultaci →
              </button>
              <button style={{ padding: '14px 24px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 2, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Stáhnout case studies (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT BAND */}
      <section style={{ padding: '40px 64px', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
            Důvěřují nám —
          </div>
          <ClientLogos />
        </div>
      </section>

      {/* CASE STUDIES — primary content */}
      <section style={{ padding: '120px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 12, color: accent, marginBottom: 8, letterSpacing: 2, fontWeight: 600 }}>SELECTED WORK</div>
              <h2 style={{ fontSize: 48, fontWeight: 600, margin: 0, letterSpacing: '-0.025em' }}>
                Případové studie <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>napříč segmenty</span>.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {cases.map((_, i) => (
                <button key={i} onClick={() => setActiveCase(i)} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: i === activeCase ? '#0a0a0a' : 'transparent',
                  color: i === activeCase ? '#fff' : '#0a0a0a',
                  border: '1px solid rgba(0,0,0,0.2)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>{String(i+1).padStart(2,'0')}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 4, padding: 56 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', letterSpacing: 1.5, marginBottom: 8 }}>{c.segment.toUpperCase()} · {c.period.toUpperCase()}</div>
              <div style={{ fontSize: 36, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.02em' }}>{c.client}</div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', marginBottom: 32 }}>
                {c.summary}
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
                <div style={{ fontSize: 88, fontWeight: 600, color: accent, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 8 }}>{c.metric}</div>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>{c.metricLabel}</div>
              </div>
              <div style={{ marginTop: 32, fontSize: 14, fontWeight: 600, color: accent, cursor: 'pointer' }}>
                Číst celou case study →
              </div>
            </div>
            <div style={{
              background: '#f4f4f4', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 480, fontSize: 200,
            }}>
              {c.emoji}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (segments) */}
      <section style={{ padding: '120px 64px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: '#5d8cea', marginBottom: 8, letterSpacing: 2, fontWeight: 600 }}>SLUŽBY</div>
            <h2 style={{ fontSize: 48, fontWeight: 600, margin: 0, letterSpacing: '-0.025em', maxWidth: 800 }}>
              Specializace na segmenty, kde retence <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>rozhoduje</span> o byznysu.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {SEGMENTS.map((s, i) => (
              <div key={s.id} style={{
                background: '#0a0a0a', padding: 32,
                cursor: 'pointer', transition: 'background 0.2s',
                minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,90,218,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
              >
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 24 }}>
                    /{String(i+1).padStart(2,'0')}
                  </div>
                  <div style={{ fontSize: 44, marginBottom: 24 }}>{s.emoji}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{s.sub}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#5d8cea', marginTop: 32 }}>Více →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — quiet, numbered */}
      <section style={{ padding: '120px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 12, color: accent, marginBottom: 8, letterSpacing: 2, fontWeight: 600 }}>METODIKA</div>
            <h2 style={{ fontSize: 48, fontWeight: 600, margin: 0, letterSpacing: '-0.025em' }}>
              Marketing řízený daty, <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>ne pocity</span>.
            </h2>
          </div>
          <div>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.n} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 2fr 80px', gap: 32,
                padding: '32px 0', borderTop: '1px solid rgba(0,0,0,0.1)',
                alignItems: 'center',
              }}>
                <div style={{ fontSize: 32, fontWeight: 600, color: accent, fontFamily: 'JetBrains Mono, monospace' }}>{s.n}</div>
                <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.015em' }}>{s.title}</div>
                <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55 }}>{s.desc}</div>
                <div style={{ fontSize: 28, textAlign: 'right' }}>{s.emoji}</div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}/>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: '100px 64px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 80, color: accent, fontFamily: 'Instrument Serif, serif', lineHeight: 0.5, marginBottom: 16 }}>"</div>
          <div style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.35, marginBottom: 32, letterSpacing: '-0.015em' }}>
            Za 4 měsíce nám retenční flows přinesly víc tržeb než celý loňský Q4. <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: accent }}>BoostMail</span> proměnil databázi v reálný kanál.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e8eefb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚗</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Petr Novotný</div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>Marketing Lead, Autošíma</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 64px', background: '#f4f4f4' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1200, margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: 12, color: accent, marginBottom: 8, letterSpacing: 2, fontWeight: 600 }}>KONZULTACE</div>
            <h2 style={{ fontSize: 56, fontWeight: 600, margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1.0 }}>
              Zjistěte, kolik vám <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>leží</span> v databázi.
            </h2>
            <div style={{ fontSize: 16, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6, marginBottom: 32 }}>
              Vyplňte formulář a do 24 hodin se vám ozveme. Probereme, jestli je pro váš projekt náš systém vhodný.
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'rgba(0,0,0,0.5)', marginBottom: 6 }}>TELEFON</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>+420 604 656 033</div>
            </div>
          </div>
          <div style={{ background: '#fff', padding: 40, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 4 }}>
            <ContactForm accent={accent} />
          </div>
        </div>
      </section>

      <footer style={{ padding: '48px 64px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>
        <div>© 2026 BoostMail s.r.o. · IČO 23915455</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>Praha</span>
          <span>Instagram</span>
          <span>LinkedIn</span>
        </div>
      </footer>
    </div>
  );
}

window.V4Premium = V4Premium;
