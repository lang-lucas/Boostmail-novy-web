// BoostMail — sdílené komponenty pro všechny root stránky
// Nav, Footer, page wrapper, společné styly

const BM_ACCENT = '#1a5ada';

const BM_SEGMENTS = [
  { key: 'eshop', icon: '🛒', name: 'E-shopy', desc: 'Winback, abandoned cart, retention' },
  { key: 'barber', icon: '✂️', name: 'Barbershopy & salóny', desc: 'No-show prevention, rebook, vouchery' },
  { key: 'restaurace', icon: '🍽️', name: 'Restaurace', desc: 'Rezervace, věrnost, eventy' },
  { key: 'b2b', icon: '🏢', name: 'B2B služby', desc: 'Lead nurturing, pipeline automation' },
];

function BMNav({ active }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const closeTimer = React.useRef(null);
  const openDropdown = () => { clearTimeout(closeTimer.current); setDropdownOpen(true); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 120); };

  const links = [
    { href: 'pripadovky.html', label: 'Případovky', key: 'pripadovky' },
    { href: 'jak-pracujeme.html', label: 'Jak pracujeme', key: 'jak-pracujeme' },
    { href: 'o-nas.html', label: 'O nás', key: 'o-nas' },
    { href: 'akademie.html', label: 'Akademie', key: 'akademie' },
    { href: 'cenik.html', label: 'Ceník', key: 'cenik' },
  ];
  return (
    <nav className="bm-nav" style={{
      padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, background: 'rgba(244,244,244,0.85)', backdropFilter: 'blur(12px)',
      zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img className="bm-nav-logo" src="/assets/boostmail-logo-black.png" alt="BoostMail" style={{ height: 32, width: 'auto', display: 'block' }} />
      </a>
      <div className="bm-nav-links" style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
        {/* Řešení s dropdown */}
        <div
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{ position: 'relative' }}
        >
          <a href="/reseni" style={{
            color: '#0a0a0a', textDecoration: 'none',
            borderBottom: active === 'reseni' ? `2px solid ${BM_ACCENT}` : '2px solid transparent',
            paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            Řešení
            <span style={{
              fontSize: 9, transition: 'transform 0.2s',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>▼</span>
          </a>
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: -16, marginTop: 12,
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14,
              boxShadow: '0 24px 60px -20px rgba(0,0,0,0.25)', padding: 8,
              minWidth: 320, animation: 'bmDropdownIn 0.18s ease-out',
            }}>
              {BM_SEGMENTS.map(s => (
                <a key={s.key} href={`reseni.html#${s.key}`} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
                  borderRadius: 10, textDecoration: 'none', color: '#0a0a0a',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,90,218,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{s.icon}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>{s.desc}</span>
                  </span>
                </a>
              ))}
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 6, paddingTop: 6 }}>
                <a href="/reseni" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: 10, textDecoration: 'none',
                  color: BM_ACCENT, fontSize: 13, fontWeight: 600,
                }}>
                  <span>Všechna řešení</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          )}
        </div>
        {links.map(l => (
          <a key={l.key} href={l.href} style={{
            color: '#0a0a0a', textDecoration: 'none',
            borderBottom: active === l.key ? `2px solid ${BM_ACCENT}` : '2px solid transparent',
            paddingBottom: 2,
          }}>{l.label}</a>
        ))}
      </div>
      <a href="/kontakt" className="bm-nav-cta" style={{
        padding: '11px 20px', background: '#0a0a0a', color: '#fff',
        border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', textDecoration: 'none',
      }}>
        💸 Ukázka zdarma →
      </a>
    </nav>
  );
}

function BMFooter() {
  return (
    <footer className="bm-footer" style={{
      padding: '48px 56px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)',
      fontSize: 13, display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 24, marginTop: 80,
    }}>
      <img src="/assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 28, width: 'auto', display: 'block' }} />
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <span>© 2026 BoostMail · IČO 23915455</span>
        <span>+420 604 656 033 · LinkedIn · Instagram</span>
      </div>
    </footer>
  );
}

function BMMonoLabel({ n, text, center }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, justifyContent: center ? 'center' : 'flex-start',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 1.5,
      color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase',
    }}>
      <span style={{ color: BM_ACCENT, fontWeight: 600 }}>[{n}]</span>
      <span>{text}</span>
    </div>
  );
}

function BMHero({ kicker, title, sub, ctaPrimary, ctaSecondary }) {
  return (
    <section className="bm-hero" style={{ padding: '80px 56px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <BMMonoLabel n="01" text={kicker} />
        <h1 className="bm-h1" style={{
          fontSize: 96, lineHeight: 0.92, fontWeight: 700,
          margin: '24px 0 24px', letterSpacing: '-0.04em', maxWidth: 1100,
        }}>
          {title}
        </h1>
        {sub && <div className="bm-hero-sub" style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(0,0,0,0.7)', maxWidth: 640, marginBottom: 32 }}>
          {sub}
        </div>}
        {(ctaPrimary || ctaSecondary) && (
          <div className="bm-hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {ctaPrimary && <a href={ctaPrimary.href} style={{
              padding: '16px 26px', background: BM_ACCENT, color: '#fff',
              border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 600,
              cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
            }}>{ctaPrimary.label}</a>}
            {ctaSecondary && <a href={ctaSecondary.href} style={{
              padding: '16px 26px', background: 'transparent', color: '#0a0a0a',
              border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block',
            }}>{ctaSecondary.label}</a>}
          </div>
        )}
      </div>
    </section>
  );
}

function BMPage({ active, children }) {
  return (
    <div className="ab-scroll no-scrollbar" style={{
      fontFamily: 'Space Grotesk, sans-serif', background: '#f4f4f4', color: '#0a0a0a',
      position: 'relative', minHeight: '100vh',
    }}>
      <style>{`
        @keyframes bmRise { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes bmDropdownIn { from { transform: translateY(-8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .bm-rise > * { animation: bmRise 0.6s ease-out backwards; }
        .bm-rise > *:nth-child(1) { animation-delay: 0.05s }
        .bm-rise > *:nth-child(2) { animation-delay: 0.15s }
        .bm-rise > *:nth-child(3) { animation-delay: 0.25s }
        .bm-rise > *:nth-child(4) { animation-delay: 0.35s }
        .bm-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; transition: transform 0.2s, box-shadow 0.2s; }
        .bm-card-hover:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -16px rgba(26,90,218,0.25); }

        @media (max-width: 900px) {
          .bm-nav { padding: 14px 18px !important; }
          .bm-nav-links { display: none !important; }
          .bm-nav-cta { padding: 9px 14px !important; font-size: 12px !important; }
          .bm-nav-logo { height: 24px !important; }
          .bm-hero { padding: 40px 18px 32px !important; }
          .bm-h1 { font-size: 48px !important; line-height: 0.98 !important; }
          .bm-hero-sub { font-size: 15px !important; }
          .bm-section { padding: 48px 18px !important; }
          .bm-section-title { font-size: 32px !important; line-height: 1.05 !important; }
          .bm-grid-2 { grid-template-columns: 1fr !important; gap: 20px !important; }
          .bm-grid-3 { grid-template-columns: 1fr !important; gap: 16px !important; }
          .bm-grid-4 { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .bm-footer { flex-direction: column !important; align-items: flex-start !important; padding: 32px 18px !important; gap: 16px !important; }
          .bm-footer > div { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .bm-h1 { font-size: 38px !important; }
          .bm-section-title { font-size: 26px !important; }
          .bm-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}/>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BMNav active={active} />
        {children}
        <BMFooter />
      </div>
    </div>
  );
}

Object.assign(window, { BM_ACCENT, BM_SEGMENTS, BMNav, BMFooter, BMMonoLabel, BMHero, BMPage });
