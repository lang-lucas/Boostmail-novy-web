// V5 — Motion-heavy
// Big scroll-driven feel, strong animations, marquee bands, kinetic type.
// Space Grotesk display, animated gradients, ticker tape stats.

function V5Motion() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Space Grotesk, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
    }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(-3deg) } 50% { transform: translateY(-12px) rotate(-3deg) } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(4deg) } 50% { transform: translateY(-16px) rotate(4deg) } }
        @keyframes gradMove { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .v5-rise > * { animation: slideUp 0.7s ease-out backwards; }
        .v5-rise > *:nth-child(1) { animation-delay: 0.05s }
        .v5-rise > *:nth-child(2) { animation-delay: 0.15s }
        .v5-rise > *:nth-child(3) { animation-delay: 0.25s }
        .v5-rise > *:nth-child(4) { animation-delay: 0.35s }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(244,244,244,0.85)', backdropFilter: 'blur(12px)', zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 18 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: `linear-gradient(120deg, ${accent}, #5d8cea, ${accent})`,
            backgroundSize: '200% 100%',
            animation: 'gradMove 3s linear infinite',
          }}/>
          BoostMail
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Řešení</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Případovky</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>O nás</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Akademie</a>
        </div>
        <button style={{ padding: '11px 20px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          💸 Ukázka zdarma →
        </button>
      </nav>

      {/* HERO — kinetic */}
      <section style={{ padding: '80px 48px 60px', overflow: 'hidden', position: 'relative' }}>
        <div className="v5-rise" style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 14, color: accent, fontWeight: 700, letterSpacing: 2, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, animation: 'blink 1s infinite' }}/>
            LIVE — automatizace běží
          </div>
          <h1 style={{ fontSize: 156, lineHeight: 0.85, fontWeight: 700, margin: 0, letterSpacing: '-0.05em' }}>
            Proměňte
          </h1>
          <h1 style={{ fontSize: 156, lineHeight: 0.85, fontWeight: 700, margin: 0, letterSpacing: '-0.05em', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <span style={{
              background: `linear-gradient(110deg, ${accent}, #5d8cea, ${accent})`,
              backgroundSize: '200% 100%',
              animation: 'gradMove 4s linear infinite',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>databázi</span>
            <span style={{ fontSize: 80, color: 'rgba(0,0,0,0.4)' }}>↗</span>
          </h1>
          <h1 style={{ fontSize: 156, lineHeight: 0.85, fontWeight: 700, margin: 0, letterSpacing: '-0.05em' }}>
            ve <em style={{ fontWeight: 400 }}>stroj</em> na 💸
          </h1>
          <div style={{ display: 'flex', gap: 80, marginTop: 48, alignItems: 'center' }}>
            <div style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)', maxWidth: 460 }}>
              Specializovaná agentura na retenční marketing a automatizaci. Místo nalévání peněz do reklamy zhodnotíme databázi, kterou už máte.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '16px 26px', background: accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                💸 Spočítat potenciál →
              </button>
              <button style={{ padding: '16px 26px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                ▶ 90s ukázka
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STATS */}
      <section style={{ padding: '32px 0', background: '#0a0a0a', color: '#fff', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: 64, animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap' }}>
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontSize: 56, fontWeight: 700, color: accent, letterSpacing: '-0.03em' }}>{s.value}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{s.label}</span>
              <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.2)', marginLeft: 32 }}>✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEGMENTS */}
      <section style={{ padding: '100px 48px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: accent, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>SEGMENTY</div>
          <h2 style={{ fontSize: 80, fontWeight: 700, margin: 0, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Pro koho<br/>to <em style={{ fontWeight: 400, color: accent }}>jede</em>?
          </h2>
        </div>
        <div style={{ marginBottom: 32 }}>
          <SegmentSwitcher active={seg} onChange={setSeg} accent={accent} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {SEGMENTS.map((s) => {
            const isActive = s.id === seg;
            return (
              <div key={s.id} onClick={() => setSeg(s.id)} style={{
                padding: 28,
                background: isActive ? accent : '#fff',
                color: isActive ? '#fff' : '#0a0a0a',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.65,0,0.35,1)',
                transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isActive ? `0 24px 48px -12px ${accent}66` : '0 4px 12px rgba(0,0,0,0.04)',
                minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ fontSize: 56 }}>{s.emoji}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.4 }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 80, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Marketing řízený daty,<br/>ne <em style={{ fontWeight: 400, color: accent }}>pocity.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ProcessAnimated accent={accent} interval={2200} />
        </div>
      </section>

      {/* MARQUEE REVERSE */}
      <section style={{ padding: '24px 0', background: accent, color: '#fff', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'marqueeRev 25s linear infinite', whiteSpace: 'nowrap', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              💸 RETENCE &gt; AKVIZICE <span style={{ opacity: 0.4 }}>✦</span> NÁKUPNÍ DATA &gt; POCITY <span style={{ opacity: 0.4 }}>✦</span> 8.4× ROI <span style={{ opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* EMAIL + ROI */}
      <section style={{ padding: '100px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 13, color: accent, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>UKÁZKA V AKCI</div>
            <h2 style={{ fontSize: 64, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              Email, který běží <em style={{ fontWeight: 400, color: accent }}>24/7</em>.
            </h2>
            <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55, marginBottom: 32 }}>
              Personalizovaný flow podle nákupního chování. Spustí se sám, když se klient přibližuje k bodu opakované koupě.
            </div>
            <div style={{ display: 'flex', gap: 32, padding: 24, background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>62%</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>otevíranost</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>18%</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>CTR</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>8.4×</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>ROI</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ animation: 'float1 6s ease-in-out infinite', position: 'absolute', top: -20, left: 20, zIndex: 1 }}>
              <Sticker2 bg="#FFE066">+47% rebookingů</Sticker2>
            </div>
            <div style={{ animation: 'float2 7s ease-in-out infinite', position: 'absolute', bottom: 0, right: 20, zIndex: 3 }}>
              <Sticker2 bg={accent} color="#fff">otevíranost 62%</Sticker2>
            </div>
            <div style={{ zIndex: 2 }}>
              <EmailMockup accent={accent} />
            </div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section style={{ padding: '100px 48px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, color: '#5d8cea', fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>KOLIK VÁM LEŽÍ V DATABÁZI?</div>
            <h2 style={{ fontSize: 80, fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.04em', lineHeight: 0.9 }}>
              Spočítejte si to <em style={{ fontWeight: 400, color: accent }}>za 30 sekund.</em>
            </h2>
            <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
              Posuňte slidery a uvidíte konzervativní odhad měsíčního i ročního potenciálu.
            </div>
          </div>
          <ROICalculator accent={accent} dark />
        </div>
      </section>

      {/* LOGOS */}
      <section style={{ padding: '60px 0', overflow: 'hidden', background: '#fff' }}>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(0,0,0,0.5)', marginBottom: 24 }}>40+ ZNAČEK / ČR + SR</div>
        <div style={{ display: 'flex', gap: 64, animation: 'marquee 40s linear infinite', whiteSpace: 'nowrap' }}>
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
            <div key={i} style={{ fontSize: 24, fontWeight: 700, color: 'rgba(0,0,0,0.4)', letterSpacing: 0.5 }}>{l}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 96, fontWeight: 700, margin: '0 0 48px', letterSpacing: '-0.045em', lineHeight: 0.9, textAlign: 'center' }}>
            Pojďme to <em style={{ fontWeight: 400, color: accent }}>rozjet.</em>
          </h2>
          <div style={{ background: '#fff', padding: 48, borderRadius: 24, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 24px 60px -20px rgba(0,0,0,0.1)' }}>
            <ContactForm accent={accent} />
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px 48px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
        <div>© 2026 BoostMail · IČO 23915455</div>
        <div>+420 604 656 033 · LinkedIn · Instagram</div>
      </footer>
    </div>
  );
}

function Sticker2({ children, bg = '#fff', color = '#0a0a0a' }) {
  return (
    <div style={{
      padding: '10px 16px', background: bg, color, borderRadius: 999,
      fontSize: 13, fontWeight: 700,
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}

window.V5Motion = V5Motion;
