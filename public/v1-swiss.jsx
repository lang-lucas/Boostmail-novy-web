// V1 — Swiss / Minimal
// Grid-based, calm, numbers and data as heroes. Tight typography, lots of whitespace.
// Mono labels, large condensed display sans, strict 12-col grid feel.

function V1Swiss() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';
  const seg_obj = SEGMENTS.find(s => s.id === seg);

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Inter, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
      letterSpacing: '-0.01em',
    }}>
      {/* ── NAV ───────────────────────────────────────── */}
      <nav style={{
        padding: '20px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        position: 'sticky', top: 0, background: '#f4f4f4', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18 }}>
          <span style={{ width: 22, height: 22, background: accent, display: 'inline-block', borderRadius: 3 }}/>
          BoostMail
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 }}>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Řešení</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Případové studie</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>O nás</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Akademie</a>
          <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Kontakt</a>
        </div>
        <button style={{ padding: '10px 18px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          💸 Ukázka zdarma →
        </button>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ padding: '100px 56px 80px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 24, letterSpacing: 2 }}>
              [01] — RETENČNÍ MARKETING / 2026
            </div>
            <h1 style={{
              fontSize: 92, lineHeight: 0.95, fontWeight: 800, margin: 0,
              letterSpacing: '-0.04em',
            }}>
              Proměňte<br/>
              databázi ve<br/>
              <span style={{ color: accent }}>stroj na peníze.</span>
            </h1>
          </div>
          <div style={{ paddingBottom: 12 }}>
            <div style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)', marginBottom: 28 }}>
              Specializovaná agentura na retenční marketing a automatizaci. Zvyšujeme zisk z vaší databáze kontaktů — ne z reklamy.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '14px 22px', background: accent, color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                💸 Chci ukázku →
              </button>
              <button style={{ padding: '14px 22px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Případové studie
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: '32px 24px 32px 0',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12, color: i === 0 ? accent : '#0a0a0a' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.55)', letterSpacing: 1, textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEGMENTS ──────────────────────────────────── */}
      <section style={{ padding: '80px 56px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 12, letterSpacing: 2 }}>[02] — ŘEŠENÍ</div>
            <h2 style={{ fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
              Vyberte své zaměření.
            </h2>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', alignSelf: 'end' }}>
            Stejný princip, jiná data. Pro každý segment specializovaný playbook, který víme, že funguje. Žádné šablony.
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <SegmentSwitcher active={seg} onChange={setSeg} accent={accent} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {SEGMENTS.map((s) => {
            const isActive = s.id === seg;
            return (
              <div key={s.id} onClick={() => setSeg(s.id)} style={{
                padding: 28,
                background: isActive ? '#0a0a0a' : '#fff',
                color: isActive ? '#fff' : '#0a0a0a',
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.25s',
                minHeight: 240,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{s.emoji}</div>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: isActive ? accent : 'rgba(0,0,0,0.4)', marginBottom: 8, letterSpacing: 1 }}>
                    {String(SEGMENTS.indexOf(s) + 1).padStart(2, '0')} / 04
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{s.label}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, opacity: isActive ? 0.7 : 0.6 }}>{s.sub}</div>
                </div>
                <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: isActive ? accent : 'rgba(0,0,0,0.5)' }}>
                  {isActive ? 'Vybráno →' : 'Vybrat'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────── */}
      <section style={{ padding: '80px 56px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 12, letterSpacing: 2 }}>[03] — PROCES</div>
            <h2 style={{ fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
              Marketing řízený daty,<br/>ne pocity.
            </h2>
          </div>
        </div>
        <ProcessAnimated accent={accent} />
      </section>

      {/* ── CLIENT LOGOS ──────────────────────────────── */}
      <section style={{ padding: '60px 56px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 32, letterSpacing: 2, textAlign: 'center' }}>
          [04] — DŮVĚŘUJÍ NÁM
        </div>
        <ClientLogos />
      </section>

      {/* ── ROI + EMAIL ─────────────────────────────── */}
      <section style={{ padding: '80px 56px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <ROICalculator accent={accent} />
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 12, letterSpacing: 2 }}>[05] — UKÁZKA</div>
            <h3 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Reálný email, který běží 24/7
            </h3>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', marginBottom: 28, maxWidth: 400 }}>
              Personalizovaný flow podle nákupního chování. Spustí se sám. Otevíranost {' '}
              <span style={{ color: accent, fontWeight: 700 }}>62 %</span>, CTR{' '}
              <span style={{ color: accent, fontWeight: 700 }}>18 %</span>.
            </div>
            <EmailMockup accent={accent} />
          </div>
        </div>
      </section>

      {/* ── CTA / FORM ───────────────────────────────── */}
      <section style={{ padding: '80px 56px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 12, letterSpacing: 2 }}>[06] — KONTAKT</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              Zjistěte, kolik peněz vám leží v databázi.
            </h2>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', marginBottom: 32 }}>
              Vyplňte formulář. Ozveme se vám do 24 hodin a probereme, jestli je pro váš projekt náš systém vhodný.
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>TELEFONNÍ ČÍSLO</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>+420 604 656 033</div>
            </div>
          </div>
          <ContactForm accent={accent} />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ padding: '40px 56px', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(0,0,0,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
        <div>© 2026 BOOSTMAIL · IČO 23915455</div>
        <div>INSTAGRAM · LINKEDIN</div>
      </footer>
    </div>
  );
}

window.V1Swiss = V1Swiss;
