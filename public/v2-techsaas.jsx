// V2 — Tech SaaS
// Modern, dashboard mockups, gradient accents, dark sections.
// Manrope for headlines, soft glassmorphism, blue gradient halos.

function V2TechSaas() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Manrope, Inter, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
    }}>
      {/* ── NAV ───────────────────────────────────────── */}
      <nav style={{
        padding: '16px 32px',
        margin: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: 999,
        border: '1px solid rgba(0,0,0,0.06)',
        position: 'sticky', top: 16, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${accent} 0%, #4d7eea 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>B</div>
          BoostMail
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
          <a style={{ color: 'rgba(0,0,0,0.7)', textDecoration: 'none' }}>Řešení</a>
          <a style={{ color: 'rgba(0,0,0,0.7)', textDecoration: 'none' }}>Případovky</a>
          <a style={{ color: 'rgba(0,0,0,0.7)', textDecoration: 'none' }}>Akademie</a>
          <a style={{ color: 'rgba(0,0,0,0.7)', textDecoration: 'none' }}>O nás</a>
        </div>
        <button style={{ padding: '10px 18px', background: accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          💸 Ukázka zdarma →
        </button>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ padding: '60px 56px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient halo */}
        <div style={{
          position: 'absolute', top: -100, left: '20%', width: 700, height: 700,
          background: `radial-gradient(circle, ${accent}33 0%, transparent 60%)`,
          filter: 'blur(40px)', pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            background: 'rgba(26,90,218,0.08)',
            border: `1px solid ${accent}33`,
            borderRadius: 999, fontSize: 12, fontWeight: 600, color: accent, marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite' }}/>
            8 247 emailů odesláno za posledních 24 hodin
          </div>
          <h1 style={{
            fontSize: 88, lineHeight: 1, fontWeight: 800, margin: '0 0 24px',
            letterSpacing: '-0.04em',
          }}>
            Proměňte databázi <br/>ve <span style={{
              background: `linear-gradient(135deg, ${accent} 0%, #5d8cea 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>stroj na peníze</span>
          </h1>
          <div style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(0,0,0,0.6)', maxWidth: 640, margin: '0 auto 36px' }}>
            Retenční flows, automatizace a personalizace, které běží 24/7. Místo reklamy investujte do databáze, kterou už máte.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
            <button style={{ padding: '14px 24px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              💸 Spočítat můj potenciál →
            </button>
            <button style={{ padding: '14px 24px', background: '#fff', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              ▶ Sledovat ukázku (90s)
            </button>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', perspective: 1500 }}>
          <DashboardMockup />
        </div>
      </section>

      {/* ── STATS BAND ─────────────────────────────────── */}
      <section style={{ padding: '60px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${accent} 0%, #5d8cea 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: 8, lineHeight: 1,
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEGMENTS WITH SWITCHER ────────────────────── */}
      <section style={{ padding: '100px 56px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 56, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.03em' }}>Řešení přesně pro vás</h2>
          <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.6)', marginBottom: 28 }}>Vyberte segment a podívejte se, jak konkrétně vám pomůžeme.</div>
          <SegmentSwitcher active={seg} onChange={setSeg} accent={accent} />
        </div>

        <SegmentDetail seg={seg} accent={accent} />
      </section>

      {/* ── PROCESS ───────────────────────────────────── */}
      <section style={{ padding: '100px 56px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, color: '#5d8cea', marginBottom: 12, letterSpacing: 2, fontWeight: 600 }}>JAK TO BĚŽÍ</div>
          <h2 style={{ fontSize: 56, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Marketing řízený daty,<br/>ne pocity
          </h2>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <DarkProcess accent={accent} />
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────── */}
      <section style={{ padding: '100px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2, fontWeight: 600 }}>KOLIK VÁM LEŽÍ V DATABÁZI</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Spočítejte si <br/>potenciál za <span style={{ color: accent }}>30 vteřin</span>.
            </h2>
            <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
              Přetočte slidery a uvidíte, kolik měsíčně necháváte ležet ladem. Konzervativní odhad – v praxi bývá víc.
            </div>
          </div>
          <ROICalculator accent={accent} />
        </div>
      </section>

      {/* ── LOGOS ────────────────────────────────────── */}
      <section style={{ padding: '60px 56px', background: '#fff' }}>
        <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginBottom: 32, textAlign: 'center', fontWeight: 500 }}>
          Důvěřuje nám 40+ značek napříč ČR a SR
        </div>
        <ClientLogos />
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '100px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${accent}22 0%, transparent 70%)`,
        }}/>
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 64, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Připraveni na ukázku zdarma?
          </h2>
          <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.6)', marginBottom: 40 }}>
            Vyplňte formulář a ozveme se do 24 hodin. Bez závazků, bez prodejních triků.
          </div>
          <div style={{ background: '#fff', padding: 40, borderRadius: 16, boxShadow: '0 24px 60px -20px rgba(26,90,218,0.2)', textAlign: 'left' }}>
            <ContactForm accent={accent} />
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px 56px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
        <div>© 2026 BoostMail · IČO 23915455</div>
        <div>+420 604 656 033 · LinkedIn · Instagram</div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
      `}</style>
    </div>
  );
}

// ── Dashboard mockup ─────────────────────────────────────
function DashboardMockup() {
  return (
    <div style={{
      background: '#0a0a0a',
      borderRadius: 16,
      padding: 18,
      boxShadow: '0 40px 80px -20px rgba(26,90,218,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
      transform: 'rotateX(2deg)',
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }}/>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c941' }}/>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>app.boostmail.cz/dashboard</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14, background: '#0a0a0a' }}>
        {/* Sidebar */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: 1 }}>FLOWS</div>
          {['Recommend (cyklus)', 'Reactivation 90+', 'Free slots', 'Cancel rebook', 'Post care'].map((f, i) => (
            <div key={i} style={{
              padding: '8px 10px',
              borderRadius: 6,
              background: i === 0 ? 'rgba(26,90,218,0.2)' : 'transparent',
              color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
              fontSize: 12, marginBottom: 2, display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{f}</span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}/>
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 18, color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Recommend · Nextlevel</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Aktivní · 878 zákazníků</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['7d', '30d', '90d'].map((d, i) => (
                <span key={d} style={{ padding: '5px 10px', background: i === 1 ? '#1a5ada' : 'rgba(255,255,255,0.06)', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{d}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
            {[['ODESLÁNO', '878'], ['OTEVÍRANOST', '28,6 %'], ['REZERVACE', '58'], ['OBRAT', '45 792 Kč']].map(([l, v], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, letterSpacing: 1 }}>{l}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: i === 3 ? '#1a5ada' : '#fff' }}>{v}</div>
              </div>
            ))}
          </div>
          {/* Fake chart */}
          <div style={{ height: 120, position: 'relative' }}>
            <svg viewBox="0 0 400 120" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1a5ada" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#1a5ada" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,80 L40,65 L80,72 L120,50 L160,55 L200,38 L240,45 L280,28 L320,32 L360,18 L400,22 L400,120 L0,120 Z" fill="url(#chartGrad)"/>
              <path d="M0,80 L40,65 L80,72 L120,50 L160,55 L200,38 L240,45 L280,28 L320,32 L360,18 L400,22" stroke="#1a5ada" strokeWidth="2" fill="none"/>
              {[[0,80],[80,72],[160,55],[240,45],[320,32],[400,22]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="#1a5ada"/>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Segment detail ───────────────────────────────────────
function SegmentDetail({ seg, accent }) {
  const data = {
    barber: {
      title: 'Plný kalendář bez SMS spamu',
      bullets: [
        'Připomínka po 4 týdnech přesně podle stylu střihu',
        'Recenzní flow po návštěvě – Google rating 4.9★',
        'No-show flow: 24h před, 2h před, automaticky',
      ],
      stat: '+34%', statLabel: 'opakovaných rezervací',
      image: '💈',
    },
    beauty: {
      title: 'Klientky chodí samy, kalendář se plní',
      bullets: [
        'Cyklické připomínky podle typu péče (manikúra 3 týdny, řasy 4)',
        'Doporučení produktové péče po návštěvě',
        'Birthday series s exkluzivní slevou',
      ],
      stat: '+41%', statLabel: 'rebookingu',
      image: '💅',
    },
    wellness: {
      title: 'Naplněné víkendy, vyšší ARPU',
      bullets: [
        'Re-aktivační série po 60 dnech bez návštěvy',
        'Dárkové vouchery automaticky před svátky',
        'Cross-sell masáží a balíčků na míru',
      ],
      stat: '+28%', statLabel: 'průměrné útraty',
      image: '🧖',
    },
    auto: {
      title: 'STK, servis, sezóna – nikdy nezapomenete',
      bullets: [
        'Automatické připomínky STK 14 dní předem',
        'Sezónní pneu výměna podle data poslední',
        'Servis intervaly napojené na CRM',
      ],
      stat: '+47%', statLabel: 'opakovaných servisů',
      image: '🚗',
    },
  }[seg];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
      <div>
        <h3 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>{data.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {data.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
              <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.75)', lineHeight: 1.5 }}>{b}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: accent, letterSpacing: '-0.03em' }}>{data.stat}</div>
          <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>{data.statLabel}</div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          background: `linear-gradient(135deg, ${accent}11, ${accent}05)`,
          border: `1px solid ${accent}22`,
          borderRadius: 20,
          padding: 32,
          minHeight: 380,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <EmailMockup accent={accent} />
        </div>
      </div>
    </div>
  );
}

// ── Dark process ────────────────────────────────────────
function DarkProcess({ accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {PROCESS_STEPS.map((s, i) => (
        <div key={s.n} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: 24,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -16, left: 24,
            width: 32, height: 32, borderRadius: 8,
            background: accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
          }}>{s.n}</div>
          <div style={{ fontSize: 32, marginBottom: 14, marginTop: 12 }}>{s.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

window.V2TechSaas = V2TechSaas;
