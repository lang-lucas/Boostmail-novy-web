// V7 — Hybrid (user's mix of V5 / V2 / V1) — interactive edition
// Changes vs prev:
// - Hero arrow nudged so it doesn't kiss the dot of "i" in databázi
// - Live counter (live email-sent ticker) overlaid on dashboard
// - Manual+auto ProcessAnimatedManual w/ moving "packets" on connecting line
// - Tilt-on-mouse wrapper around the live email mockup (gentle)
// - Email mockup gets "Otevřít" button → expanded inline view
// - Client-logos marquee converted to clickable case-study cards w/ modal
// - V7ContactForm: typing indicator, smart hints, inline mini calendar

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "arrowChar": "↗",
  "arrowSize": 80,
  "arrowGap": 6,
  "arrowOffsetY": 1,
  "arrowOffsetX": 0,
  "arrowOpacity": 0.4,
  "arrowAlign": "center",
  "arrowItalic": false,
  "arrowWeight": 600
}/*EDITMODE-END*/;

function V7Hybrid() {
  const [seg, setSeg] = React.useState('barber');
  const accent = '#1a5ada';
  const [caseStudy, setCaseStudy] = React.useState(null);
  const [navDrop, setNavDrop] = React.useState(false);
  const navDropTimer = React.useRef(null);
  const navOpen = () => { clearTimeout(navDropTimer.current); setNavDrop(true); };
  const navClose = () => { navDropTimer.current = setTimeout(() => setNavDrop(false), 140); };
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <div className="ab-scroll no-scrollbar v7-root" style={{
      fontFamily: 'Space Grotesk, sans-serif',
      background: '#f4f4f4',
      color: '#0a0a0a',
      position: 'relative',
    }}>
      <style>{`
        @keyframes v7marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes v7marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes v7gradMove { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes v7blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        @keyframes v7pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
        @keyframes v7slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes v7tickFade { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes v7dot { 0%,80%,100% { transform: translateY(0); opacity: 0.4 } 40% { transform: translateY(-3px); opacity: 1 } }
        @keyframes v7modalIn { from { opacity: 0; transform: translateY(20px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes v7backdrop { from { opacity: 0 } to { opacity: 1 } }
        @keyframes v7packet { 0% { transform: translateX(0); opacity: 0 } 10% { opacity: 1 } 90% { opacity: 1 } 100% { transform: translateX(var(--v7-packet-dist, 220px)); opacity: 0 } }
        @keyframes v7DropIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }
        .v7-rise > * { animation: v7slideUp 0.7s ease-out backwards; }
        .v7-rise > *:nth-child(1) { animation-delay: 0.05s }
        .v7-rise > *:nth-child(2) { animation-delay: 0.15s }
        .v7-rise > *:nth-child(3) { animation-delay: 0.25s }
        .v7-rise > *:nth-child(4) { animation-delay: 0.35s }
        .v7-rise > *:nth-child(5) { animation-delay: 0.45s }
        .v7-typing-dot { width: 6px; height: 6px; border-radius: 50%; background: ${accent}; display: inline-block; margin: 0 1px; animation: v7dot 1.2s infinite; }
        .v7-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .v7-typing-dot:nth-child(3) { animation-delay: 0.3s; }
        .v7-cs-card { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .v7-cs-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -16px rgba(26,90,218,0.35); }
        .v7-day:hover { background: rgba(26,90,218,0.08) !important; }
        .v7-slot:hover { background: ${accent} !important; color: #fff !important; }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 900px) {
          .v7-nav { padding: 14px 18px !important; gap: 10px; }
          .v7-nav-links { display: none !important; }
          .v7-nav-cta { padding: 9px 14px !important; font-size: 12px !important; }
          .v7-nav-logo { height: 24px !important; }
          .v7-section { padding: 48px 18px !important; }
          .v7-hero { padding: 32px 18px 40px !important; }
          .v7-h1 { font-size: 56px !important; line-height: 0.95 !important; letter-spacing: -0.04em !important; }
          .v7-h1-arrow { font-size: 38px !important; }
          .v7-hero-sub { font-size: 15px !important; max-width: 100% !important; }
          .v7-hero-ctas { flex-direction: column !important; width: 100%; }
          .v7-hero-ctas button { width: 100%; padding: 14px 20px !important; font-size: 14px !important; }
          .v7-hero-row { gap: 24px !important; flex-direction: column; align-items: stretch !important; }
          .v7-stats-num { font-size: 36px !important; }
          .v7-stats-row { gap: 32px !important; padding: 24px 0 !important; }
          .v7-section-title { font-size: 36px !important; line-height: 1.05 !important; }
          .v7-grid-2 { grid-template-columns: 1fr !important; gap: 24px !important; }
          .v7-grid-3 { grid-template-columns: 1fr !important; gap: 16px !important; }
          .v7-grid-4 { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .v7-process-row { flex-direction: column !important; gap: 16px !important; }
          .v7-process-item { width: 100% !important; }
          .v7-segments-row { flex-direction: column !important; gap: 8px !important; }
          .v7-segment-btn { width: 100% !important; justify-content: flex-start !important; }
          .v7-dashboard { transform: none !important; }
          .v7-live-counter { position: static !important; margin-top: 16px; }
          .v7-footer { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; padding: 32px 18px !important; }
          .v7-footer > div { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; font-size: 12px !important; }
          .v7-cs-card { padding: 20px !important; }
          .v7-modal { padding: 24px !important; max-width: calc(100vw - 24px) !important; }
          .v7-modal h2 { font-size: 24px !important; }
          .v7-cal-days { gap: 4px !important; }
          .v7-cal-slots { grid-template-columns: repeat(2, 1fr) !important; }
          .v7-contact-tabs { flex-wrap: wrap; }
          .v7-tilt { transform: none !important; }
          .twk-panel { display: none !important; }
        }
        @media (max-width: 480px) {
          .v7-h1 { font-size: 44px !important; }
          .v7-h1-arrow { font-size: 30px !important; }
          .v7-section-title { font-size: 28px !important; }
          .v7-grid-4 { grid-template-columns: 1fr !important; }
          .v7-stats-num { font-size: 28px !important; }
        }
      `}</style>

      {/* Dot-grid bg */}
      <div className="v7-dotgrid" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* NAV */}
      <nav className="v7-nav" style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(244,244,244,0.85)', backdropFilter: 'blur(12px)', zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img className="v7-nav-logo" src="/assets/boostmail-logo-black.png" alt="BoostMail" style={{ height: 32, width: 'auto', display: 'block' }} />
        </a>
        <div className="v7-nav-links" style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
          {/* Řešení s dropdownem */}
          <div onMouseEnter={navOpen} onMouseLeave={navClose} style={{ position: 'relative' }}>
            <a href="pages/reseni.html" style={{
              color: '#0a0a0a', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              Řešení
              <span style={{ fontSize: 8, transition: 'transform 0.2s', transform: navDrop ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </a>
            {navDrop && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', left: -16,
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14,
                boxShadow: '0 24px 60px -20px rgba(0,0,0,0.25)', padding: 8,
                minWidth: 360, animation: 'v7DropIn 0.18s ease-out',
              }}>
                {[
                  { key: 'barber', icon: '💈', name: 'Barbershopy', desc: 'No-show prevention, rebooking, vouchery' },
                  { key: 'beauty', icon: '💅', name: 'Kosmetičky', desc: 'Opakovaná péče bez prázdných oken', soon: true },
                  { key: 'wellness', icon: '🧖', name: 'Wellness', desc: 'Naplněné víkendy, vyšší ARPU', soon: true },
                  { key: 'auto', icon: '🚗', name: 'Autoservisy', desc: 'STK, servis, sezónní připomínky', soon: true },
                ].map(s => (
                  <a key={s.key} href={s.soon ? '#' : `pages/reseni.html#${s.key}`}
                     onClick={s.soon ? (e) => e.preventDefault() : undefined}
                     style={{
                       display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
                       borderRadius: 10, textDecoration: 'none', color: s.soon ? 'rgba(0,0,0,0.5)' : '#0a0a0a',
                       transition: 'background 0.15s', cursor: s.soon ? 'not-allowed' : 'pointer',
                     }}
                     onMouseEnter={e => { if (!s.soon) e.currentTarget.style.background = `${accent}0d`; }}
                     onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1, filter: s.soon ? 'grayscale(0.4)' : 'none' }}>{s.icon}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {s.name}
                        {s.soon && <span style={{
                          fontSize: 9, padding: '2px 6px', borderRadius: 999,
                          background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)',
                          fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, fontWeight: 700,
                        }}>JIŽ BRZY</span>}
                      </span>
                      <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{s.desc}</span>
                    </span>
                  </a>
                ))}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 6, paddingTop: 6 }}>
                  <a href="pages/kontakt.html" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 10, textDecoration: 'none',
                    color: accent, fontSize: 13, fontWeight: 600,
                  }}>
                    <span>🛠 Custom systém na míru</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          <a href="pages/pripadovky.html" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Případovky</a>
          <a href="pages/jak-pracujeme.html" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Jak pracujeme</a>
          <a href="pages/o-nas.html" style={{ color: '#0a0a0a', textDecoration: 'none' }}>O nás</a>
          <a href="pages/akademie.html" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Akademie</a>
          <a href="pages/cenik.html" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Ceník</a>
        </div>
        <a href="pages/kontakt.html" className="v7-nav-cta" style={{ padding: '11px 20px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
          💸 Ukázka zdarma →
        </a>
      </nav>

      {/* HERO */}
      <section className="v7-hero" style={{ padding: '60px 56px 60px', overflow: 'hidden', position: 'relative' }}>
        <div className="v7-rise" style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <MonoLabel n="01" text="RETENČNÍ MARKETING / 2026" accent={accent} />
          <h1 className="v7-h1" style={{ fontSize: 132, lineHeight: 0.85, fontWeight: 700, margin: '24px 0 0', letterSpacing: '-0.05em' }}>
            Proměňte
          </h1>
          <h1 className="v7-h1" style={{ fontSize: 132, lineHeight: 1, fontWeight: 700, margin: 0, letterSpacing: '-0.05em', display: 'flex', alignItems: 'center', gap: tw.arrowGap, flexWrap: 'wrap' }}>
            <span style={{
              background: `linear-gradient(110deg, ${accent}, #5d8cea, ${accent})`,
              backgroundSize: '200% 100%',
              animation: 'v7gradMove 4s linear infinite',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
              display: 'inline-block',
              paddingRight: 24,
              paddingTop: 4,
              paddingBottom: 4,
              lineHeight: 1.1,
              marginTop: -8,
              marginBottom: -8,
            }}>databázi</span>
            <span className="v7-h1-arrow" style={{
              fontSize: tw.arrowSize,
              color: `rgba(0,0,0,${tw.arrowOpacity})`,
              alignSelf: tw.arrowAlign,
              marginTop: tw.arrowOffsetY,
              marginLeft: tw.arrowOffsetX,
              fontStyle: tw.arrowItalic ? 'italic' : 'normal',
              fontWeight: tw.arrowWeight,
              lineHeight: 1,
              display: 'inline-block',
            }}>{tw.arrowChar}</span>
          </h1>
          <h1 className="v7-h1" style={{ fontSize: 132, lineHeight: 0.85, fontWeight: 700, margin: 0, letterSpacing: '-0.05em' }}>
            ve <em style={{ fontWeight: 400 }}>stroj</em> na 💸
          </h1>
          <div className="v7-hero-row" style={{ display: 'flex', gap: 64, marginTop: 40, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="v7-hero-sub" style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)', maxWidth: 460 }}>
              Specializovaná agentura na retenční marketing a automatizaci. Místo nalévání peněz do reklamy zhodnotíme databázi, kterou už máte.
            </div>
            <div className="v7-hero-ctas" style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '16px 26px', background: accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                💸 Spočítat potenciál →
              </button>
              <button className="v7-btn-outline" style={{ padding: '16px 26px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                ▶ 90s ukázka
              </button>
            </div>
          </div>

          {/* Dashboard mockup with live counter overlay */}
          <div className="v7-dashboard" style={{ marginTop: 64, perspective: 1500, position: 'relative' }}>
            <DashboardMockup />
            <LiveCounter accent={accent} />
          </div>
        </div>
      </section>

      {/* MARQUEE STATS */}
      <section style={{ padding: '32px 0', background: '#0a0a0a', color: '#fff', overflow: 'hidden' }}>
        <div className="v7-stats-row" style={{ display: 'flex', gap: 64, animation: 'v7marquee 30s linear infinite', whiteSpace: 'nowrap' }}>
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span className="v7-stats-num" style={{ fontSize: 56, fontWeight: 700, color: accent, letterSpacing: '-0.03em' }}>{s.value}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{s.label}</span>
              <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.2)', marginLeft: 32 }}>✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ŘEŠENÍ — segments + tilted live email */}
      <section className="v7-section" style={{ padding: '100px 56px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <MonoLabel n="02" text="ŘEŠENÍ" accent={accent} center />
          <h2 className="v7-section-title" style={{ fontSize: 72, fontWeight: 700, margin: '20px 0 16px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Řešení přesně pro vás
          </h2>
          <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.6)', marginBottom: 32 }}>
            Vyberte segment a podívejte se, jak konkrétně vám pomůžeme.
          </div>
          <SegmentSwitcher active={seg} onChange={setSeg} accent={accent} />
        </div>
        <SegmentDetailLive seg={seg} accent={accent} />

        {/* Custom systém na míru */}
        <div style={{
          maxWidth: 1100, margin: '64px auto 0',
          padding: '32px 36px',
          background: '#fff',
          border: `1px dashed ${accent}66`,
          borderRadius: 18,
          display: 'flex', alignItems: 'center', gap: 28,
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 14, flexShrink: 0,
            background: `${accent}10`, color: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>🛠</div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, letterSpacing: 1.5, marginBottom: 6, fontWeight: 600 }}>
              JINÝ OBOR? / CUSTOM
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
              Děláme i systémy na míru — pokud to dává smysl pro obě strany.
            </h3>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.65)' }}>
              Máte zajímavou databázi a obor mimo náš seznam? Zavolejte nám. 30 minut, žádný závazek — řekneme rovnou jestli pro to máme řešení.
            </div>
          </div>
          <a href="pages/kontakt.html" style={{
            padding: '14px 22px', background: '#0a0a0a', color: '#fff',
            borderRadius: 999, fontSize: 14, fontWeight: 600,
            textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            📅 Probrat můj obor →
          </a>
        </div>
      </section>

      {/* MARQUEE REVERSE */}
      <section style={{ padding: '24px 0', background: accent, color: '#fff', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'v7marqueeRev 25s linear infinite', whiteSpace: 'nowrap', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              💸 RETENCE &gt; AKVIZICE <span style={{ opacity: 0.4 }}>✦</span> NÁKUPNÍ DATA &gt; POCITY <span style={{ opacity: 0.4 }}>✦</span> 8.4× ROI <span style={{ opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROCES — manual + packet animation */}
      <section className="v7-section v7-section-white" style={{ padding: '100px 56px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <MonoLabel n="03" text="PROCES" accent={accent} center />
          <h2 className="v7-section-title" style={{ fontSize: 72, fontWeight: 700, margin: '20px 0 12px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Marketing řízený daty,<br/>ne <em style={{ fontWeight: 400, color: accent }}>pocity.</em>
          </h2>
          <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1 }}>
            ↓ KLIKNĚTE NA KROK PRO DETAIL
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ProcessAnimatedManual accent={accent} interval={2800} />
        </div>
      </section>

      {/* CASE STUDIES — clickable cards in marquee */}
      <section className="v7-section" style={{ padding: '80px 0 60px', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <MonoLabel n="04" text="PŘÍPADOVÉ STUDIE" accent={accent} center />
          <h2 style={{ fontSize: 48, fontWeight: 700, margin: '12px 0 6px', letterSpacing: '-0.03em' }}>
            40+ značek / ČR + SR
          </h2>
          <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>Klikněte na případovku pro detail výsledků</div>
        </div>
        <div style={{ display: 'flex', gap: 20, animation: 'v7marquee 50s linear infinite', whiteSpace: 'nowrap', padding: '8px 0' }}>
          {[...CASE_STUDIES, ...CASE_STUDIES, ...CASE_STUDIES].map((cs, i) => (
            <CaseStudyCard key={i} cs={cs} accent={accent} onClick={() => setCaseStudy(cs)} />
          ))}
        </div>
      </section>

      {/* UKÁZKA — ROI + email */}
      <section className="v7-section" style={{ padding: '100px 56px', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="v7-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start', maxWidth: 1300, margin: '0 auto' }}>
          <ROICalculator accent={accent} />
          <div>
            <MonoLabel n="05" text="UKÁZKA" accent={accent} />
            <h3 style={{ fontSize: 40, fontWeight: 700, margin: '20px 0 16px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Reálný email, který běží 24/7
            </h3>
            <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', marginBottom: 28, maxWidth: 440 }}>
              Personalizovaný flow podle nákupního chování. Spustí se sám. Otevíranost <span style={{ color: accent, fontWeight: 700 }}>62 %</span>, CTR <span style={{ color: accent, fontWeight: 700 }}>18 %</span>.
            </div>
            <EmailMockup accent={accent} />
          </div>
        </div>
      </section>

      {/* CTA / FORM with smart bits */}
      <section className="v7-section" style={{ padding: '100px 56px' }}>
        <div className="v7-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1300, margin: '0 auto' }}>
          <div>
            <MonoLabel n="06" text="KONTAKT" accent={accent} />
            <h2 className="v7-section-title" style={{ fontSize: 72, fontWeight: 700, margin: '20px 0 24px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              Zjistěte, kolik peněz vám leží v <em style={{ fontWeight: 400, color: accent }}>databázi.</em>
            </h2>
            <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', marginBottom: 32 }}>
              Vyplňte formulář, nebo si rovnou vyberte termín 30min hovoru. Ozveme se vám do 24 hodin.
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>TELEFONNÍ ČÍSLO</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>+420 604 656 033</div>
            </div>
          </div>
          <V7ContactForm accent={accent} />
        </div>
      </section>

      <footer className="v7-footer" style={{ padding: '48px 56px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 28, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <span>© 2026 BoostMail · IČO 23915455</span>
          <span>+420 604 656 033 · LinkedIn · Instagram</span>
        </div>
      </footer>

      </div>

      {/* Case-study modal */}
      {caseStudy && <CaseStudyModal cs={caseStudy} accent={accent} onClose={() => setCaseStudy(null)} />}

      <TweaksPanel title="Tweaks · Hero šipka">
        <TweakSection label="Šipka v hero" />
        <TweakSelect label="Znak"
          value={tw.arrowChar}
          options={[
            {value: '↗', label: '↗  diagonála'},
            {value: '→', label: '→  rovně'},
            {value: '➔', label: '➔  silná'},
            {value: '⤴', label: '⤴  oblouk'},
            {value: '↑', label: '↑  nahoru'},
            {value: '✦', label: '✦  hvězda'},
            {value: '＋', label: '＋  plus'},
            {value: '·', label: '·  bez (skrýt)'},
          ]}
          onChange={(v) => setTweak('arrowChar', v)} />
        <TweakSlider label="Velikost"
          value={tw.arrowSize} min={32} max={140} step={2} unit="px"
          onChange={(v) => setTweak('arrowSize', v)} />
        <TweakSlider label="Mezera od slova"
          value={tw.arrowGap} min={0} max={120} step={2} unit="px"
          onChange={(v) => setTweak('arrowGap', v)} />
        <TweakSlider label="Posun nahoru/dolů"
          value={tw.arrowOffsetY} min={-40} max={80} step={1} unit="px"
          onChange={(v) => setTweak('arrowOffsetY', v)} />
        <TweakSlider label="Posun vlevo/vpravo"
          value={tw.arrowOffsetX} min={-40} max={40} step={1} unit="px"
          onChange={(v) => setTweak('arrowOffsetX', v)} />
        <TweakSlider label="Průhlednost"
          value={tw.arrowOpacity} min={0.2} max={1} step={0.05}
          onChange={(v) => setTweak('arrowOpacity', v)} />
        <TweakRadio label="Zarovnání"
          value={tw.arrowAlign}
          options={[
            {value: 'flex-start', label: 'Nahoru'},
            {value: 'center', label: 'Střed'},
            {value: 'flex-end', label: 'Dolů'},
          ]}
          onChange={(v) => setTweak('arrowAlign', v)} />
        <TweakSlider label="Tloušťka"
          value={tw.arrowWeight} min={300} max={900} step={100}
          onChange={(v) => setTweak('arrowWeight', v)} />
        <TweakToggle label="Kurzíva"
          value={tw.arrowItalic}
          onChange={(v) => setTweak('arrowItalic', v)} />
      </TweaksPanel>
    </div>
  );
}

// ─── V1-style mono section label ──────────────────────────
function MonoLabel({ n, text, accent, center = false }) {
  return (
    <div style={{
      fontSize: 11,
      fontFamily: 'JetBrains Mono, monospace',
      color: accent,
      letterSpacing: 2,
      textAlign: center ? 'center' : 'left',
    }}>
      [{n}] — {text}
    </div>
  );
}

// ─── Live counter overlay (top-right of dashboard) ────────
function LiveCounter({ accent }) {
  const [count, setCount] = React.useState(8247);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      const inc = Math.floor(Math.random() * 4) + 1;
      setCount((c) => c + inc);
      setTick((t) => t + 1);
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      position: 'absolute', top: -16, right: -16, zIndex: 5,
      background: '#0a0a0a', color: '#fff',
      borderRadius: 14, padding: '14px 18px',
      boxShadow: '0 16px 36px -10px rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', gap: 14,
      transform: 'rotate(2deg)',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'v7blink 1.2s infinite', boxShadow: '0 0 8px #10b981' }}/>
      <div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.2, fontFamily: 'JetBrains Mono, monospace' }}>EMAILŮ ODESLÁNO · 24H</div>
        <div key={tick} style={{ fontSize: 24, fontWeight: 700, color: accent, fontVariantNumeric: 'tabular-nums', animation: 'v7tickFade 0.4s' }}>
          {count.toLocaleString('cs-CZ').replace(/,/g, ' ')}
        </div>
      </div>
    </div>
  );
}

// ─── Tilt wrapper (gentle) ────────────────────────────────
function TiltWrap({ children, max = 6 }) {
  const ref = React.useRef(null);
  const [transform, setTransform] = React.useState('perspective(1400px) rotateX(0deg) rotateY(0deg)');
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTransform(`perspective(1400px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`);
  };
  const onLeave = () => setTransform('perspective(1400px) rotateX(0deg) rotateY(0deg)');
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: 'transform 0.25s cubic-bezier(0.2, 0.7, 0.3, 1)', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

// ─── Manual ProcessAnimated with packet dots ──────────────
function ProcessAnimatedManual({ accent = '#1a5ada', interval = 2800 }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [packetKey, setPacketKey] = React.useState(0);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % 4);
      setPacketKey((k) => k + 1);
    }, interval);
    return () => clearInterval(id);
  }, [paused, interval]);

  const handleClick = (i) => {
    setActive(i);
    setPaused(true);
    setPacketKey((k) => k + 1);
  };

  // Detail panel content for each step
  const details = [
    { title: 'Co se děje při auditu', items: ['Napojení na databázi (SmartEmailing, Mailchimp, …)', 'Segmentace zákazníků dle RFM', 'Identifikace 3 největších úniků peněz'] },
    { title: 'Co dostanete ve strategii', items: ['Mapa flows (welcome, win-back, post-purchase)', 'Plán A/B testů na 90 dní', 'Konkrétní KPI cíle a milníky'] },
    { title: 'Co stavíme v automatizaci', items: ['Trigger flows v editoru (drag & drop scénáře)', 'Šablony emailů s personalizací', 'Reporting dashboard v reálném čase'] },
    { title: 'Co reportujeme měsíčně', items: ['ROI z retenčních flows + atribuce', 'PNO trend + náklady na akvizici', 'Doporučení další iterace'] },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, position: 'relative', marginBottom: 40 }}>
        {/* connecting line */}
        <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 2, background: 'rgba(0,0,0,0.08)', zIndex: 0, overflow: 'visible' }}>
          <div style={{
            height: '100%',
            background: accent,
            width: `${((active + 1) / 4) * 100}%`,
            transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
          }}/>
          {/* moving packet */}
          <div key={packetKey} style={{
            position: 'absolute', top: -3, left: 0, width: 8, height: 8, borderRadius: '50%',
            background: accent, boxShadow: `0 0 12px ${accent}`,
            '--v7-packet-dist': `${(active * 25 + 25) * 0.01 * 1000}px`,
            animation: 'v7packet 1.2s ease-out forwards',
          }}/>
        </div>
        {PROCESS_STEPS.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={s.n} style={{ position: 'relative', zIndex: 1, cursor: 'pointer' }} onClick={() => handleClick(i)}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: isActive || isPast ? accent : '#fff',
                border: `2px solid ${isActive || isPast ? accent : 'rgba(0,0,0,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
                transition: 'all 0.4s ease',
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
                boxShadow: isActive ? `0 8px 24px ${accent}55` : 'none',
                margin: '0 auto 16px',
                filter: isActive || isPast ? 'none' : 'grayscale(0.3)',
              }}>
                {s.emoji}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.4)', marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: isActive ? accent : '#0a0a0a' }}>{s.title.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div key={active} className="v7-card" style={{
        background: '#f9f9f9',
        border: `1px solid ${accent}33`,
        borderRadius: 14,
        padding: '24px 28px',
        animation: 'v7tickFade 0.4s ease-out',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, letterSpacing: 1.5 }}>
            DETAIL · KROK {PROCESS_STEPS[active].n}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
            {paused ? '⏸ MANUÁLNÍ MÓD' : '▶ AUTO'}
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 14 }}>{details[active].title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {details[active].items.map((it, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: '50%', background: accent, color: '#fff', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{idx + 1}</span>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(0,0,0,0.75)' }}>{it}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Case study card + modal ──────────────────────────────
const CASE_STUDIES = [
  { name: 'Barbershop Mirek', cat: 'Barbershop · Praha', metric: '−62 % no-shows', summary: 'No-show prevention + automatický rebooking. SMS + email 24h před.', kpis: [{ k: 'No-show', v: '−62 %' }, { k: 'Rebook rate', v: '71 %' }, { k: 'NPS', v: '+24' }] },
  { name: 'BarberHaus', cat: 'Barbershop · Brno', metric: '+8.4× ROI', summary: 'Win-back flow podle typu střihu. Personalizované termíny dle historie.', kpis: [{ k: 'Open rate', v: '64 %' }, { k: 'Booking', v: '+47 %' }, { k: 'ROI', v: '8.4×' }] },
  { name: 'Old School Cuts', cat: 'Barbershop · Plzeň', metric: '+34 % rezervací', summary: 'Narozeninové vouchery + reaktivace klientů 90+ dní bez návštěvy.', kpis: [{ k: 'Reaktivace', v: '28 %' }, { k: 'Rezervace', v: '+34 %' }, { k: 'CTR', v: '19 %' }] },
  { name: 'Sharp & Co.', cat: 'Barbershop · Ostrava', metric: '+41 % rebookingu', summary: 'Plán pravidelné péče + automatické připomínky podle růstu vlasů.', kpis: [{ k: 'Rebooking', v: '+41 %' }, { k: 'No-show', v: '−27 %' }, { k: 'LTV', v: '+19 %' }] },
  { name: 'Holičství Karel', cat: 'Barbershop · Liberec', metric: '+52 % opak. obj.', summary: 'Segmentace dle typu klienta (vous / vlasy / kombo) + cílené nabídky.', kpis: [{ k: 'Open rate', v: '68 %' }, { k: 'Opakované obj.', v: '+52 %' }, { k: 'CTR', v: '22 %' }] },
  { name: 'Gentlemen\u2019s Club', cat: 'Barbershop · Praha', metric: '+3.2× LTV', summary: 'Onboarding sekvence pro nové klienty. 5 emailů, 30 dní.', kpis: [{ k: 'LTV', v: '3.2×' }, { k: 'Retence 90d', v: '84 %' }, { k: 'Open rate', v: '71 %' }] },
];

function CaseStudyCard({ cs, accent, onClick }) {
  return (
    <div className="v7-cs-card" onClick={onClick} style={{
      flexShrink: 0,
      width: 300,
      padding: 24,
      background: '#fff',
      borderRadius: 14,
      border: '1px solid rgba(0,0,0,0.08)',
      whiteSpace: 'normal',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      {/* Header: badge + category */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `${accent}12`, color: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>💈</div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.45)', letterSpacing: 0.8 }}>
          {cs.cat.toUpperCase()}
        </div>
      </div>

      {/* Name */}
      <div style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{cs.name}</div>

      {/* Summary */}
      <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', lineHeight: 1.45, minHeight: 56 }}>{cs.summary}</div>

      {/* Big metric + sparkline */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: '14px 16px', borderRadius: 10,
        background: `${accent}08`, border: `1px solid ${accent}1f`,
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {(() => {
            const m = cs.metric;
            const idx = m.indexOf(' ');
            const value = idx === -1 ? m : m.slice(0, idx);
            const unit = idx === -1 ? '' : m.slice(idx + 1);
            return (
              <>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: accent,
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>{value}</div>
                {unit && (
                  <div style={{
                    fontSize: 12, color: 'rgba(0,0,0,0.55)',
                    marginTop: 4, fontWeight: 500,
                  }}>{unit}</div>
                )}
              </>
            );
          })()}
        </div>
        <svg viewBox="0 0 80 32" width="72" height="28" style={{ display: 'block', flexShrink: 0 }}>
          <defs>
            <linearGradient id={`spark-${cs.name.replace(/\W/g,'')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={accent} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 26 L12 24 L24 22 L36 18 L48 13 L60 9 L72 5 L80 3 L80 32 L0 32 Z" fill={`url(#spark-${cs.name.replace(/\W/g,'')})`}/>
          <path d="M0 26 L12 24 L24 22 L36 18 L48 13 L60 9 L72 5 L80 3" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.4)', letterSpacing: 1 }}>PŘÍPADOVKA</div>
        <div style={{ fontSize: 13, color: accent, fontWeight: 600 }}>Detail →</div>
      </div>
    </div>
  );
}

function CaseStudyModal({ cs, accent, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(10,10,10,0.55)',
      backdropFilter: 'blur(8px)',
      animation: 'v7backdrop 0.25s ease-out',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} className="v7-modal" style={{
        background: '#fff',
        borderRadius: 18,
        maxWidth: 720, width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        padding: 40,
        boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        animation: 'v7modalIn 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
        position: 'relative',
      }}>
        <button onClick={onClose} className="v7-modal-x" style={{
          position: 'absolute', top: 18, right: 18,
          width: 36, height: 36, borderRadius: '50%',
          background: '#f4f4f4', border: 'none', cursor: 'pointer',
          fontSize: 16, fontWeight: 700,
        }}>×</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: `${accent}15`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 26 }}>💈</div>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1.5 }}>{cs.cat.toUpperCase()} · PŘÍPADOVKA</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>{cs.name}</div>
          </div>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', marginBottom: 28 }}>
          {cs.summary} Stavěli jsme komplexní retenční systém, který běží 24/7 a dodává atribuovatelný revenue přímo do dashboardu klienta.
        </div>
        {/* fake chart */}
        <div className="v7-card-soft" style={{ marginBottom: 28, padding: '24px 0', background: '#f9f9f9', borderRadius: 12 }}>
          <div style={{ padding: '0 20px', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 14 }}>RŮST METRIKY ZA 90 DNÍ</div>
          <svg viewBox="0 0 600 140" style={{ width: '100%', height: 140, padding: '0 20px', boxSizing: 'border-box' }}>
            <defs>
              <linearGradient id={`grad-${cs.name.replace(/\W/g,'')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={accent} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M 0 110 L 60 100 L 120 92 L 180 78 L 240 70 L 300 50 L 360 38 L 420 28 L 480 18 L 540 10 L 600 5 L 600 140 L 0 140 Z" fill={`url(#grad-${cs.name.replace(/\W/g,'')})`}/>
            <path d="M 0 110 L 60 100 L 120 92 L 180 78 L 240 70 L 300 50 L 360 38 L 420 28 L 480 18 L 540 10 L 600 5" fill="none" stroke={accent} strokeWidth="2.5"/>
            {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((x, i) => {
              const ys = [110, 100, 92, 78, 70, 50, 38, 28, 18, 10, 5];
              return <circle key={i} cx={x} cy={ys[i]} r="3" fill={accent}/>;
            })}
          </svg>
        </div>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {cs.kpis.map((k, i) => (
            <div key={i} style={{ padding: 18, background: '#fff', color: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.45)', letterSpacing: 1 }}>{k.k.toUpperCase()}</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: accent, marginTop: 6, letterSpacing: '-0.02em' }}>{k.v}</div>
            </div>
          ))}
        </div>
        <button style={{
          width: '100%', padding: '16px 20px',
          background: accent, color: '#fff', border: 'none', borderRadius: 10,
          fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          💸 Chci podobné výsledky →
        </button>
      </div>
    </div>
  );
}

// ─── Typing indicator ────────────────────────────────────
function TypingIndicator({ accent }) {
  const [name, setName] = React.useState('Honza');
  React.useEffect(() => {
    const names = ['Honza', 'Markéta', 'Tom', 'Lucka'];
    const id = setInterval(() => setName(names[Math.floor(Math.random() * names.length)]), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px',
      background: '#fff', borderRadius: 999,
      border: '1px solid rgba(0,0,0,0.08)',
      width: 'fit-content',
      fontSize: 13,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
        {name[0]}
      </div>
      <span style={{ color: 'rgba(0,0,0,0.7)' }}>
        <b>{name}</b> z týmu právě píše
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
        <span className="v7-typing-dot"/>
        <span className="v7-typing-dot"/>
        <span className="v7-typing-dot"/>
      </span>
    </div>
  );
}

// ─── V7 contact form: smart hints + inline calendar ──────
function V7ContactForm({ accent }) {
  const [mode, setMode] = React.useState('form'); // 'form' | 'cal'
  const [data, setData] = React.useState({ name: '', email: '', phone: '', project: '', db: '', msg: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [picked, setPicked] = React.useState(null);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Jméno je povinné';
    if (!data.email.trim()) e.email = 'Email je povinný';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Neplatný formát emailu';
    if (!data.project.trim()) e.project = 'Název projektu je povinný';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  // Smart hint based on db size
  const dbHint = (() => {
    const n = parseInt(data.db.replace(/\D/g, ''), 10);
    if (!n) return null;
    if (n < 1000) return { text: 'Pro <1k zákazníků většinou doporučujeme akvizici dříve než retenci.', tone: 'warn' };
    if (n < 10000) return { text: '✓ Sweet-spot pro retenci. Většina našich klientů začíná v této velikosti.', tone: 'good' };
    if (n < 50000) return { text: '✓ Skvělé. Při této velikosti měříme nejvyšší ROI z flows.', tone: 'good' };
    return { text: '🚀 Velká databáze. Dokážeme dodat náš enterprise tier (custom integrace).', tone: 'good' };
  })();

  if (sent && mode === 'form') {
    return (
      <div style={{ padding: 32, background: '#e8eefb', border: `1px solid ${accent}`, borderRadius: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Děkujeme, {data.name || 'parťáku'}!</div>
        <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>Ozveme se vám do 24 hodin na <b>{data.email}</b>.</div>
      </div>
    );
  }

  if (picked && mode === 'cal') {
    return (
      <div style={{ padding: 32, background: '#e8eefb', border: `1px solid ${accent}`, borderRadius: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Termín potvrzen, {picked.lead.name.split(' ')[0]}!</div>
        <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', marginBottom: 14, lineHeight: 1.5 }}>
          <b>{picked.day}</b> v <b>{picked.slot}</b><br/>
          Pozvánku jsme poslali na <b>{picked.lead.email}</b>.
        </div>
        <button onClick={() => setPicked(null)} style={{ background: 'none', border: 'none', color: accent, fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Změnit termín</button>
      </div>
    );
  }

  const inputBase = {
    width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
    border: '1px solid rgba(0,0,0,0.12)', background: '#fff', color: '#0a0a0a',
    borderRadius: 8, outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>{label.toUpperCase()}</label>
      <input
        type={type}
        value={data[key]}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
        placeholder={placeholder}
        style={{ ...inputBase, ...(errors[key] ? { borderColor: '#dc2626' } : {}) }}
      />
      {errors[key] && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <div>
      {/* Mode switcher */}
      <div className="v7-card" style={{ display: 'inline-flex', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, padding: 4, marginBottom: 18 }}>
        <button onClick={() => setMode('form')} style={{ padding: '8px 16px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'form' ? accent : 'transparent', color: mode === 'form' ? '#fff' : '#0a0a0a' }}>
          ✉ Napsat zprávu
        </button>
        <button onClick={() => setMode('cal')} style={{ padding: '8px 16px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'cal' ? accent : 'transparent', color: mode === 'cal' ? '#fff' : '#0a0a0a' }}>
          📅 Vybrat termín hovoru
        </button>
      </div>

      {mode === 'form' && (
        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('name', 'Jméno', 'text', 'Jan Novák')}
            {field('email', 'Email', 'email', 'jan@firma.cz')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('phone', 'Telefon', 'tel', '+420 …')}
            {field('project', 'Název projektu', 'text', 'NextReality')}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>VELIKOST DATABÁZE (PŘIBLIŽNĚ)</label>
            <input
              type="text"
              value={data.db}
              onChange={(e) => setData({ ...data, db: e.target.value })}
              placeholder="např. 8 000"
              style={inputBase}
            />
            {dbHint ? (
              <div style={{
                marginTop: 8, padding: '10px 12px',
                background: dbHint.tone === 'good' ? '#ecfdf5' : '#fff7ed',
                border: `1px solid ${dbHint.tone === 'good' ? '#a7f3d0' : '#fed7aa'}`,
                borderRadius: 8,
                fontSize: 12,
                color: dbHint.tone === 'good' ? '#065f46' : '#9a3412',
                lineHeight: 1.5,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: 14 }}>{dbHint.tone === 'good' ? '💡' : '⚠️'}</span>
                {dbHint.text}
              </div>
            ) : (
              <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(0,0,0,0.45)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5 }}>
                MEDIÁN NAŠICH KLIENTŮ: 4 800 KONTAKTŮ
              </div>
            )}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>ZPRÁVA (NEPOVINNÉ)</label>
            <textarea
              value={data.msg}
              onChange={(e) => setData({ ...data, msg: e.target.value })}
              rows={3}
              placeholder="Co řešíte? S čím vám můžeme pomoct?"
              style={{ ...inputBase, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '16px 20px', fontSize: 15, fontWeight: 700,
            background: accent, color: '#fff', border: 'none', borderRadius: 8,
            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.2,
          }}>
            💸 Chci ukázku zdarma →
          </button>
        </form>
      )}

      {mode === 'cal' && <InlineCalendar accent={accent} onPick={(d, s, l) => setPicked({ day: d, slot: s, lead: l })} />}
    </div>
  );
}

// ─── Inline Cal.com-style calendar (with lead capture) ──
function InlineCalendar({ accent, onPick }) {
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [pickedSlot, setPickedSlot] = React.useState(null);
  const [lead, setLead] = React.useState({ name: '', email: '', phone: '', company: '' });
  const [errors, setErrors] = React.useState({});

  // Generate next 14 days
  const days = React.useMemo(() => {
    const today = new Date();
    const arr = [];
    const dayNames = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
    const monthNames = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      arr.push({
        date: d,
        label: `${d.getDate()}. ${monthNames[d.getMonth()]}`,
        dow: dayNames[d.getDay()],
        full: `${dayNames[d.getDay()]} ${d.getDate()}. ${monthNames[d.getMonth()]}`,
        disabled: isWeekend,
      });
    }
    return arr;
  }, []);

  const slots = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

  const confirm = () => {
    const e = {};
    if (!lead.name.trim()) e.name = 'Jméno je povinné';
    if (!lead.email.trim()) e.email = 'Email je povinný';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) e.email = 'Neplatný formát';
    if (!lead.phone.trim()) e.phone = 'Telefon je povinný';
    if (!lead.company.trim()) e.company = 'Název podniku je povinný';
    setErrors(e);
    if (Object.keys(e).length === 0) onPick(days[selectedDay].full, pickedSlot, lead);
  };

  // Step 3: lead capture form
  if (pickedSlot) {
    return (
      <div className="v7-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: 24 }}>
        <div className="v7-card-soft" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, padding: 14, background: '#f9f9f9', borderRadius: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1 }}>VYBRANÝ TERMÍN</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{days[selectedDay].full} · {pickedSlot}</div>
          </div>
          <button onClick={() => setPickedSlot(null)} style={{ background: 'none', border: 'none', color: accent, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>Změnit</button>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.65)', marginBottom: 14, letterSpacing: 0.3 }}>
          Vyplňte krátké údaje, ať vám pošleme pozvánku do kalendáře:
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>JMÉNO</label>
          <input
            value={lead.name}
            onChange={(ev) => setLead({ ...lead, name: ev.target.value })}
            placeholder="Jan Novák"
            style={{
              width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
              border: errors.name ? '1px solid #dc2626' : '1px solid rgba(0,0,0,0.12)',
              background: '#fff', color: '#0a0a0a', borderRadius: 8, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {errors.name && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>EMAIL</label>
          <input
            type="email"
            value={lead.email}
            onChange={(ev) => setLead({ ...lead, email: ev.target.value })}
            placeholder="jan@firma.cz"
            style={{
              width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
              border: errors.email ? '1px solid #dc2626' : '1px solid rgba(0,0,0,0.12)',
              background: '#fff', color: '#0a0a0a', borderRadius: 8, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {errors.email && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>TELEFON</label>
          <input
            type="tel"
            value={lead.phone}
            onChange={(ev) => setLead({ ...lead, phone: ev.target.value })}
            placeholder="+420 …"
            style={{
              width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
              border: errors.phone ? '1px solid #dc2626' : '1px solid rgba(0,0,0,0.12)',
              background: '#fff', color: '#0a0a0a', borderRadius: 8, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {errors.phone && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.phone}</div>}
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>NÁZEV PODNIKU</label>
          <input
            value={lead.company}
            onChange={(ev) => setLead({ ...lead, company: ev.target.value })}
            placeholder="např. Barbershop Miroslav"
            style={{
              width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
              border: errors.company ? '1px solid #dc2626' : '1px solid rgba(0,0,0,0.12)',
              background: '#fff', color: '#0a0a0a', borderRadius: 8, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {errors.company && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.company}</div>}
        </div>

        <button onClick={confirm} style={{
          width: '100%', padding: '16px 20px', fontSize: 15, fontWeight: 700,
          background: accent, color: '#fff', border: 'none', borderRadius: 8,
          cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.2,
        }}>
          📅 Potvrdit termín →
        </button>

        <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(0,0,0,0.45)', textAlign: 'center', lineHeight: 1.5 }}>
          Po potvrzení dostanete pozvánku do kalendáře a krátký dotazník (3 otázky), ať jsme na hovor připravení.
        </div>
      </div>
    );
  }

  return (
    <div className="v7-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, letterSpacing: 1.5 }}>BOOSTMAIL · 30 MIN HOVOR</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Vyberte termín</div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>UTC+1 · PRAHA</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 18 }}>
        {days.map((d, i) => {
          const isSelected = selectedDay === i;
          return (
            <button
              key={i}
              className="v7-day"
              disabled={d.disabled}
              onClick={() => setSelectedDay(i)}
              style={{
                padding: '10px 4px',
                border: `1px solid ${isSelected ? accent : 'rgba(0,0,0,0.1)'}`,
                background: isSelected ? `${accent}15` : '#fff',
                borderRadius: 8,
                cursor: d.disabled ? 'not-allowed' : 'pointer',
                opacity: d.disabled ? 0.35 : 1,
                fontFamily: 'inherit',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>{d.dow}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: isSelected ? accent : '#0a0a0a', marginTop: 2 }}>{d.date.getDate()}</div>
            </button>
          );
        })}
      </div>
      {selectedDay !== null ? (
        <>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.65)', marginBottom: 10, letterSpacing: 0.3 }}>
            VOLNÉ SLOTY · {days[selectedDay].full.toUpperCase()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {slots.map((s, i) => (
              <button
                key={i}
                className="v7-slot"
                onClick={() => setPickedSlot(s)}
                style={{
                  padding: '12px 10px',
                  border: `1px solid ${accent}`,
                  background: '#fff',
                  color: accent,
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="v7-card-soft" style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13, color: 'rgba(0,0,0,0.5)', background: '#f9f9f9', borderRadius: 8 }}>
          ↑ Nejdřív vyberte den
        </div>
      )}
    </div>
  );
}

window.V7Hybrid = V7Hybrid;
