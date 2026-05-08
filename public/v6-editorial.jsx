// V6 — Editorial / Magazine
// Big serif accents, generous whitespace, magazine-grade typography.
// Instrument Serif for display italics, Inter for body. Black/blue/cream palette.

function V6Editorial() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Inter, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
    }}>
      {/* NAV — minimal, masthead style */}
      <nav style={{ padding: '28px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0a0a0a' }}>
        <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>VOL. III · MMXXVI</div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, fontWeight: 400, fontStyle: 'italic' }}>BoostMail</div>
        <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>PRAGUE · CZ</div>
      </nav>

      {/* sub-nav */}
      <div style={{ padding: '14px 80px', display: 'flex', justifyContent: 'center', gap: 40, borderBottom: '1px solid #0a0a0a', fontSize: 12, letterSpacing: 1.5, fontWeight: 600 }}>
        <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>ŘEŠENÍ</a>
        <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>PŘÍPADOVKY</a>
        <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>O NÁS</a>
        <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>AKADEMIE</a>
        <a style={{ color: accent, textDecoration: 'none' }}>💸 UKÁZKA ZDARMA →</a>
      </div>

      {/* HERO — editorial cover */}
      <section style={{ padding: '80px 80px 60px' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 600, color: accent, marginBottom: 28, textAlign: 'center' }}>
          ESEJ Č. 01 — RETENČNÍ MARKETING
        </div>
        <h1 style={{
          fontSize: 168,
          fontFamily: 'Instrument Serif, serif',
          fontWeight: 400,
          margin: 0,
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          textAlign: 'center',
        }}>
          Proměňte<br/>
          <em>databázi</em><br/>
          ve <span style={{ color: accent }}>stroj</span> na peníze.
        </h1>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64,
          marginTop: 64, paddingTop: 48, borderTop: '1px solid #0a0a0a',
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 8 }}>PERSPEKTIVA</div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>
              Specializovaná agentura na retenční marketing a automatizaci. <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>Žádné šablony.</span> Žádné generické kampaně.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 8 }}>METODA</div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>
              Audit datebáze. Strategie. Automatizace flows. Růst řízený daty — nikoliv pocity. Iterace každých 30 dní.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 8 }}>VÝSLEDEK</div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>
              Průměrně <span style={{ color: accent, fontWeight: 600 }}>+47 %</span> opakovaných nákupů a <span style={{ color: accent, fontWeight: 600 }}>8.4× ROI</span> za prvních 12 měsíců spolupráce.
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE STATS */}
      <section style={{ padding: '80px 80px', borderTop: '1px solid #0a0a0a', borderBottom: '1px solid #0a0a0a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: '0 32px',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.15)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 96,
                fontFamily: 'Instrument Serif, serif',
                fontWeight: 400,
                color: i === 0 || i === 2 ? accent : '#0a0a0a',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: 12,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, letterSpacing: 1.5, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEGMENTS — magazine columns */}
      <section style={{ padding: '100px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: accent, marginBottom: 16 }}>SEKCE 02</div>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 88, fontWeight: 400, margin: 0,
              letterSpacing: '-0.03em', lineHeight: 0.95,
            }}>
              Pro <em>koho</em>?
            </h2>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', columnCount: 2, columnGap: 32 }}>
            Stejný princip, jiná data, jiná psychologie zákazníka. Pro každý segment specializovaný playbook, který víme, že funguje. Pracujeme jen s tím, čemu rozumíme do hloubky — od chování klienta až po sezonalitu.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #0a0a0a' }}>
          {SEGMENTS.map((s, i) => (
            <div key={s.id} style={{
              padding: '40px 32px',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.15)' : 'none',
              borderBottom: '1px solid #0a0a0a',
              minHeight: 360,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, color: 'rgba(0,0,0,0.5)', marginBottom: 32, fontWeight: 600 }}>
                  N° {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 64, marginBottom: 20 }}>{s.emoji}</div>
                <div style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: 36, fontWeight: 400, marginBottom: 12,
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>{s.label}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)' }}>{s.sub}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: accent, marginTop: 32 }}>
                ČTĚTE DÁL →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS — editorial article style */}
      <section style={{ padding: '100px 80px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: accent, marginBottom: 16 }}>SEKCE 03 · METODIKA</div>
          <h2 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 96, fontWeight: 400, margin: 0,
            letterSpacing: '-0.03em', lineHeight: 0.92,
          }}>
            Marketing řízený <em>daty</em>,<br/>
            ne pocity.
          </h2>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.n} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 80px',
              gap: 48, padding: '56px 0',
              borderTop: '1px solid rgba(0,0,0,0.15)',
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: 80, fontWeight: 400, color: accent,
                letterSpacing: '-0.04em', lineHeight: 1, fontStyle: 'italic',
              }}>{s.n}</div>
              <div>
                <div style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: 48, fontWeight: 400, marginBottom: 14,
                  letterSpacing: '-0.02em',
                }}>{s.title}</div>
                <div style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)', maxWidth: 640 }}>
                  {s.desc}
                </div>
              </div>
              <div style={{ fontSize: 56, textAlign: 'right' }}>{s.emoji}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}/>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ padding: '120px 80px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: 200,
            fontFamily: 'Instrument Serif, serif',
            color: accent, lineHeight: 0.5, marginBottom: 0,
          }}>"</div>
          <div style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 56, fontWeight: 400, lineHeight: 1.2,
            letterSpacing: '-0.02em', marginBottom: 40,
            fontStyle: 'italic',
          }}>
            Nejlepší zákazník není ten, kterého teprve získáte. <span style={{ color: accent }}>Je ten, kterého už dávno máte</span> a&nbsp;jen jste s&nbsp;ním přestali mluvit.
          </div>
          <div style={{ fontSize: 13, letterSpacing: 2, color: 'rgba(255,255,255,0.6)' }}>
            LUKÁŠ LANG · CO-FOUNDER
          </div>
        </div>
      </section>

      {/* EMAIL FEATURE — editorial spread */}
      <section style={{ padding: '120px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: accent, marginBottom: 16 }}>SEKCE 04 · UKÁZKA</div>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 80, fontWeight: 400, margin: '0 0 32px',
              letterSpacing: '-0.03em', lineHeight: 0.95,
            }}>
              Reálný email,<br/>
              <em>který běží sám.</em>
            </h2>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: 480, marginBottom: 32 }}>
              Personalizovaný flow podle nákupního chování. Spustí se sám, když se klient přibližuje k bodu opakované koupě. Otevíranost <span style={{ color: accent, fontWeight: 600 }}>62 %</span>, CTR <span style={{ color: accent, fontWeight: 600 }}>18 %</span>, konverze do rebookingu <span style={{ color: accent, fontWeight: 600 }}>9 %</span>.
            </div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)' }}>
              ↓ KLIKNĚTE NA „REZERVOVAT" V UKÁZCE
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmailMockup accent={accent} />
          </div>
        </div>
      </section>

      {/* ROI */}
      <section style={{ padding: '100px 80px', background: '#fff', borderTop: '1px solid #0a0a0a', borderBottom: '1px solid #0a0a0a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: accent, marginBottom: 16 }}>SEKCE 05 · KALKULAČKA</div>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 72, fontWeight: 400, margin: 0,
              letterSpacing: '-0.03em', lineHeight: 0.95,
            }}>
              Kolik vám <em>leží</em> v&nbsp;databázi?
            </h2>
          </div>
          <ROICalculator accent={accent} />
        </div>
      </section>

      {/* LOGOS */}
      <section style={{ padding: '60px 80px', borderBottom: '1px solid #0a0a0a' }}>
        <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 32, textAlign: 'center' }}>
          DŮVĚŘUJÍ NÁM
        </div>
        <ClientLogos />
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 120, fontWeight: 400, margin: 0,
            letterSpacing: '-0.04em', lineHeight: 0.9,
          }}>
            Začněme <em style={{ color: accent }}>rozhovor</em>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1100, margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', marginBottom: 32 }}>
              Vyplňte formulář a do 24 hodin se vám ozveme. Probereme, jestli je pro váš projekt náš systém vhodný — bez závazků a bez prodejních triků.
            </div>
            <div style={{ borderTop: '1px solid #0a0a0a', paddingTop: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 8 }}>NEBO ROVNOU VOLEJTE</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 40, fontWeight: 400 }}>+420 604 656 033</div>
            </div>
          </div>
          <ContactForm accent={accent} />
        </div>
      </section>

      <footer style={{ padding: '40px 80px', borderTop: '1px solid #0a0a0a', display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
        <div>© MMXXVI · BOOSTMAIL</div>
        <div>IČO 23915455</div>
        <div>INSTAGRAM · LINKEDIN</div>
      </footer>
    </div>
  );
}

window.V6Editorial = V6Editorial;
