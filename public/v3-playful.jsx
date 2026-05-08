// V3 — Playful / Agency
// Sticker vibe, tilted cards, hand-drawn feel, emoji as brand.
// Big, fun, confident. Manrope display, warm shadows.

function V3Playful() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';

  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Manrope, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
    }}>
      {/* Sticker noise pattern bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* NAV */}
        <nav style={{ padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 22 }}>
            <div style={{ width: 38, height: 38, background: accent, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transform: 'rotate(-6deg)', boxShadow: '4px 4px 0 #0a0a0a' }}>
              <span style={{ fontSize: 18 }}>📈</span>
            </div>
            BoostMail
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 600 }}>
            <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Řešení</a>
            <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Případovky</a>
            <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>O nás</a>
            <a style={{ color: '#0a0a0a', textDecoration: 'none' }}>Akademie</a>
          </div>
          <button style={{
            padding: '12px 22px', background: '#0a0a0a', color: '#fff',
            border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer',
            boxShadow: `4px 4px 0 ${accent}`, transform: 'rotate(-1deg)',
          }}>
            💸 Ukázka zdarma
          </button>
        </nav>

        {/* HERO */}
        <section style={{ padding: '60px 48px 80px', position: 'relative' }}>
          {/* floating stickers */}
          <Sticker style={{ top: 80, right: 80 }} rot={12} bg={accent} color="#fff">+47% rebookingů 📈</Sticker>
          <Sticker style={{ top: 280, right: 180 }} rot={-8} bg="#fff" color="#0a0a0a">8.4× ROI 💸</Sticker>
          <Sticker style={{ top: 200, left: 60 }} rot={-15} bg="#FFE066" color="#0a0a0a">žádné šablony ✋</Sticker>

          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: '#fff', border: '2px solid #0a0a0a', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 28, boxShadow: '3px 3px 0 #0a0a0a' }}>
              🟢 Právě teď točíme retenci pro 23 značek
            </div>
            <h1 style={{
              fontSize: 110, lineHeight: 0.92, fontWeight: 900, margin: '0 0 28px',
              letterSpacing: '-0.05em',
            }}>
              Proměňte <span style={{
                background: accent, color: '#fff', padding: '0 16px', borderRadius: 12,
                display: 'inline-block', transform: 'rotate(-2deg)', boxShadow: '6px 6px 0 #0a0a0a',
              }}>databázi</span><br/>
              ve stroj <br/>na peníze 💸
            </h1>
            <div style={{ fontSize: 19, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)', maxWidth: 580, margin: '0 auto 36px' }}>
              Specializovaná agentura na retenční marketing. Stávající zákazníky <b>známe líp než vaše ex</b>. Vyrobíme z databáze stroj, co tiskne peníze 24/7.
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <button style={{
                padding: '16px 28px', background: accent, color: '#fff', border: '2px solid #0a0a0a',
                borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
                boxShadow: '5px 5px 0 #0a0a0a',
              }}>👇 Vyberte zaměření</button>
              <button style={{
                padding: '16px 28px', background: '#fff', color: '#0a0a0a', border: '2px solid #0a0a0a',
                borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
                boxShadow: '5px 5px 0 #0a0a0a',
              }}>📞 Spojte mě</button>
            </div>
          </div>
        </section>

        {/* SEGMENTS — chunky cards */}
        <section style={{ padding: '60px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 56, fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>
              Pro koho máme <span style={{ background: '#FFE066', padding: '0 12px', borderRadius: 8 }}>playbook?</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {SEGMENTS.map((s, i) => {
              const rot = [-2, 1, -1, 2][i];
              const bg = ['#fff', accent, '#FFE066', '#0a0a0a'][i];
              const fg = [bg === '#0a0a0a' || bg === accent ? '#fff' : '#0a0a0a'][0];
              return (
                <div key={s.id} style={{
                  background: bg, color: fg,
                  border: '2px solid #0a0a0a',
                  borderRadius: 16, padding: 28,
                  boxShadow: '6px 6px 0 #0a0a0a',
                  transform: `rotate(${rot}deg)`,
                  cursor: 'pointer', transition: 'transform 0.2s',
                  minHeight: 280,
                }}
                onMouseEnter={e => e.currentTarget.style.transform = `rotate(${rot}deg) translateY(-4px)`}
                onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rot}deg)`}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>{s.emoji}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 24, lineHeight: 1.4 }}>{s.sub}</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Chci to →</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROCESS */}
        <section style={{ padding: '80px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 56, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
              Jak to děláme? 🛠️
            </h2>
            <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.6)' }}>Marketing řízený daty, ne pocity.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {PROCESS_STEPS.map((s, i) => {
              const rot = [(-1.5), 1, -1, 1.5][i];
              return (
                <div key={s.n} style={{
                  background: '#fff', border: '2px solid #0a0a0a', borderRadius: 16, padding: 24,
                  boxShadow: '5px 5px 0 #0a0a0a', transform: `rotate(${rot}deg)`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div style={{ fontSize: 48 }}>{s.emoji}</div>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: accent, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace',
                      border: '2px solid #0a0a0a',
                    }}>{s.n}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>{s.title.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EMAIL + ROI */}
        <section style={{ padding: '80px 48px', background: accent, color: '#fff', borderTop: '2px solid #0a0a0a', borderBottom: '2px solid #0a0a0a' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
            <div>
              <h2 style={{ fontSize: 56, fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1 }}>
                Reálný email,<br/>co běží 24/7 📨
              </h2>
              <div style={{ fontSize: 17, opacity: 0.9, marginBottom: 24, lineHeight: 1.5 }}>
                Personalizovaný flow podle nákupního chování. Klikněte a podívejte se, jak to vypadá v praxi.
              </div>
              <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>62%</div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>otevíranost</div>
                </div>
                <div>
                  <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>18%</div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>CTR</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', transform: 'rotate(2deg)' }}>
              <div style={{ filter: 'drop-shadow(8px 8px 0 #0a0a0a)' }}>
                <EmailMockup accent={accent} />
              </div>
            </div>
          </div>
        </section>

        {/* ROI calc */}
        <section style={{ padding: '80px 48px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ fontSize: 48, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                Spočítejte si to 🧮
              </h2>
              <div style={{ fontSize: 16, color: 'rgba(0,0,0,0.65)' }}>Kolik měsíčně necháváte ležet v databázi.</div>
            </div>
            <div style={{ border: '2px solid #0a0a0a', borderRadius: 16, boxShadow: '6px 6px 0 #0a0a0a', overflow: 'hidden' }}>
              <ROICalculator accent={accent} />
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section style={{ padding: '40px 48px 80px' }}>
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, marginBottom: 28 }}>
            Mají v nás důvěru ✊
          </div>
          <ClientLogos />
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 48px', background: '#0a0a0a', color: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, maxWidth: 1100, margin: '0 auto' }}>
            <div>
              <h2 style={{ fontSize: 64, fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                Pojďme to <span style={{ color: accent }}>rozjet</span> 🚀
              </h2>
              <div style={{ fontSize: 17, opacity: 0.7, lineHeight: 1.5, marginBottom: 32 }}>
                Vyplňte formulář a do 24 hodin vám zavoláme. Bez závazků, bez prodejních triků.
              </div>
              <div style={{ fontSize: 14, opacity: 0.5, marginBottom: 4 }}>nebo rovnou volejte</div>
              <div style={{ fontSize: 32, fontWeight: 800 }}>+420 604 656 033</div>
            </div>
            <div style={{ background: '#fff', color: '#0a0a0a', padding: 32, borderRadius: 16, transform: 'rotate(-1deg)', boxShadow: `8px 8px 0 ${accent}` }}>
              <ContactForm accent={accent} />
            </div>
          </div>
        </section>

        <footer style={{ padding: '24px 48px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          © 2026 BoostMail · IČO 23915455 · Made with 💙
        </footer>
      </div>
    </div>
  );
}

function Sticker({ children, style, rot = 0, bg = '#fff', color = '#0a0a0a' }) {
  return (
    <div style={{
      position: 'absolute',
      padding: '8px 16px',
      background: bg,
      color,
      border: '2px solid #0a0a0a',
      borderRadius: 999,
      fontSize: 14,
      fontWeight: 700,
      transform: `rotate(${rot}deg)`,
      boxShadow: '3px 3px 0 #0a0a0a',
      whiteSpace: 'nowrap',
      zIndex: 2,
      ...style,
    }}>{children}</div>
  );
}

window.V3Playful = V3Playful;
