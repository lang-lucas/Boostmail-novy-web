// BoostMail — sdílené komponenty pro všechny root stránky
// Nav, Footer, page wrapper, společné styly

const BM_ACCENT = '#1a5ada';

const BM_SEGMENTS = [
  { key: 'barber', icon: '💈', name: 'Barbershopy', desc: 'No-show prevention, rebooking, vouchery', live: true },
  { key: 'beauty', icon: '💅', name: 'Kosmetičky', desc: 'Opakovaná péče bez prázdných oken', soon: true },
  { key: 'wellness', icon: '🧖', name: 'Wellness', desc: 'Naplněné víkendy, vyšší ARPU', soon: true },
  { key: 'auto', icon: '🚗', name: 'Autoservisy', desc: 'STK, servis, sezónní připomínky', soon: true },
];

function BMNav({ active }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [mobileSubOpen, setMobileSubOpen] = React.useState(false);
  const closeTimer = React.useRef(null);
  const openDropdown = () => { clearTimeout(closeTimer.current); setDropdownOpen(true); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 120); };
  const closeMobile = () => { setMobileMenu(false); setMobileSubOpen(false); };
  React.useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  const links = [
    { href: 'pripadovky.html', label: 'Případovky', key: 'pripadovky', soon: true },
    { href: 'jak-pracujeme.html', label: 'Jak pracujeme', key: 'jak-pracujeme' },
    { href: 'o-nas.html', label: 'O nás', key: 'o-nas' },
    { href: 'akademie.html', label: 'Akademie', key: 'akademie', soon: true },
    { href: 'cenik.html', label: 'Ceník', key: 'cenik', soon: true },
  ];
  return (
    <>
    <nav className="bm-nav" style={{
      padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, background: 'rgba(244,244,244,0.85)', backdropFilter: 'blur(12px)',
      zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <a href="../Boostmail.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img className="bm-nav-logo" src="../assets/boostmail-logo-black.png" alt="BoostMail" style={{ height: 32, width: 'auto', display: 'block' }} />
      </a>
      <div className="bm-nav-links" style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500, alignItems: 'center', whiteSpace: 'nowrap' }}>
        {/* Řešení s dropdown */}
        <div
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{ position: 'relative' }}
        >
          <a href="reseni.html" style={{
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
                <a key={s.key} href={`reseni-${s.key}.html`} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
                  borderRadius: 10, textDecoration: 'none', color: '#0a0a0a',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,90,218,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{s.icon}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.name}
                      {s.soon && <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, padding: '2px 6px', background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.55)', borderRadius: 4, fontWeight: 500 }}>SOON</span>}
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>{s.desc}</span>
                  </span>
                </a>
              ))}
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 6, paddingTop: 6 }}>
                <a href="reseni.html" style={{
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
            paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {l.label}
            {l.soon && <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 999,
              background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.45)',
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, fontWeight: 600, lineHeight: 1.2,
            }}>BRZY</span>}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="kontakt.html" className="bm-nav-cta" style={{
          padding: '11px 20px', background: '#0a0a0a', color: '#fff',
          border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          <span className="bm-nav-cta-full">Spočítáme, kolik vám utíká →</span>
          <span className="bm-nav-cta-short">Spočítat →</span>
        </a>
        <button
          className="bm-burger"
          aria-label={mobileMenu ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span style={{ display: 'block', width: 16, height: 12, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, top: mobileMenu ? 5 : 0, height: 2, background: '#0a0a0a', borderRadius: 2, transition: 'transform 0.2s, top 0.2s', transform: mobileMenu ? 'rotate(45deg)' : 'none' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 2, background: '#0a0a0a', borderRadius: 2, opacity: mobileMenu ? 0 : 1, transition: 'opacity 0.15s' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, top: mobileMenu ? 5 : 10, height: 2, background: '#0a0a0a', borderRadius: 2, transition: 'transform 0.2s, top 0.2s', transform: mobileMenu ? 'rotate(-45deg)' : 'none' }} />
          </span>
        </button>
      </div>
      <style>{`
        .bm-burger { display: none; }
        .bm-nav-cta-short { display: none; }
        @media (max-width: 900px) {
          .bm-burger { display: flex !important; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 999px; background: transparent; border: 1px solid rgba(0,0,0,0.12); cursor: pointer; padding: 0; flex-shrink: 0; }
          .bm-nav-cta-full { display: none !important; }
          .bm-nav-cta-short { display: inline !important; }
        }
      `}</style>
    </nav>
    {mobileMenu && (
      <div onClick={closeMobile} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.4)', zIndex: 100,
        animation: 'bmDropdownIn 0.2s ease-out',
      }}>
        <div onClick={(e) => e.stopPropagation()} style={{
          position: 'absolute', top: 64, left: 12, right: 12,
          background: '#fff', borderRadius: 18,
          boxShadow: '0 24px 60px -20px rgba(0,0,0,0.35)',
          padding: '16px 8px',
          animation: 'bmDropdownIn 0.22s ease-out',
          maxHeight: 'calc(100vh - 80px)', overflowY: 'auto',
        }}>
          <button
            onClick={() => setMobileSubOpen(!mobileSubOpen)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', background: 'transparent', border: 'none', borderRadius: 12,
              fontSize: 16, fontWeight: 600, color: '#0a0a0a', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            }}
          >
            <span>Řešení</span>
            <span style={{ fontSize: 11, transition: 'transform 0.2s', transform: mobileSubOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>
          {mobileSubOpen && (
            <div style={{ padding: '0 8px 8px' }}>
              {BM_SEGMENTS.map(s => (
                <a key={s.key} href={`reseni-${s.key}.html`} onClick={closeMobile} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 10, textDecoration: 'none', color: '#0a0a0a', fontSize: 15, fontWeight: 500,
                }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <span style={{ flex: 1 }}>{s.name}</span>
                  {s.soon && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 999, background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, fontWeight: 700 }}>SOON</span>}
                </a>
              ))}
            </div>
          )}
          {links.map(l => (
            <a key={l.key} href={l.href} onClick={closeMobile} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderRadius: 12,
              fontSize: 16, fontWeight: 600, color: '#0a0a0a', textDecoration: 'none',
            }}>
              <span>{l.label}</span>
              {l.soon && <span style={{ fontSize: 9, padding: '3px 7px', borderRadius: 999, background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.45)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, fontWeight: 600 }}>BRZY</span>}
            </a>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: 8, paddingTop: 12, padding: '12px 8px 4px' }}>
            <a href="kontakt.html" onClick={closeMobile} style={{
              display: 'block', textAlign: 'center',
              padding: '14px 18px', borderRadius: 999,
              background: '#0a0a0a', color: '#fff',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
            }}>
              Domluvit hovor →
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function BMFooter() {
  return (
    <footer className="bm-footer" style={{ background: '#0a0a0a', color: 'rgba(255,255,255,0.6)', marginTop: 80 }}>
      <div className="bm-footer-grid" style={{
        padding: '64px 56px 32px', display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48,
        maxWidth: 1400, margin: '0 auto',
      }}>
        {/* Brand column */}
        <div>
          <img src="../assets/boostmail-logo-white.png" alt="BoostMail" style={{ height: 32, width: 'auto', display: 'block', marginBottom: 18 }} />
          <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', maxWidth: 320, marginBottom: 24 }}>
            Vracíme stálé zákazníky barbershopů zpátky do křesla. Bez reklamy, bez zbytečných slev.
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>
            <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 6 }}>Boostmail</div>
            <div>Lukáš Lang</div>
            <div>IČO 23915455</div>
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Neplátce DPH</div>
          </div>
        </div>

        {/* Řešení */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>ŘEŠENÍ</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="reseni.html" style={{ fontSize: 14, color: '#fff', textDecoration: 'none' }}>Přehled segmentů</a>
            {BM_SEGMENTS.map(s => (
              <a key={s.key} href={`reseni-${s.key}.html`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                {s.name}
                {s.soon && <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, padding: '2px 6px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', borderRadius: 4 }}>SOON</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Firma */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>FIRMA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="o-nas.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>O nás</a>
            <a href="jak-pracujeme.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Jak pracujeme</a>
            <a href="cenik.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Ceník</a>
            <a href="pripadovky.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Případovky</a>
            <a href="akademie.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Akademie</a>
          </div>
        </div>

        {/* Kontakt */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>KONTAKT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="mailto:lang@boostmail.cz" style={{ fontSize: 14, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>lang@boostmail.cz</a>
            <a href="tel:+420604656033" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>+420 604 656 033</a>
            <a href="kontakt.html" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Kontaktní formulář →</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bm-footer-bottom" style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 56px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
        maxWidth: 1400, margin: '0 auto',
        fontSize: 12, color: 'rgba(255,255,255,0.4)',
      }}>
        <div>© 2026 Boostmail · Lukáš Lang · Všechna práva vyhrazena</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="gdpr.html" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Ochrana osobních údajů</a>
          <a href="cookies.html" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Cookies</a>
          <a href="obchodni-podminky.html" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Obchodní podmínky</a>
        </div>
      </div>
    </footer>
  );
}

function BMMonoLabel({ n, text, center, dark }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, justifyContent: center ? 'center' : 'flex-start',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: 1.5,
      color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
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

        @media (max-width: 1100px) {
          .bm-nav { padding: 16px 32px !important; }
          .bm-nav-links { gap: 18px !important; }
        }
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
          .bm-footer-grid { grid-template-columns: 1fr 1fr !important; padding: 40px 18px 24px !important; gap: 32px !important; }
          .bm-footer-bottom { flex-direction: column !important; align-items: flex-start !important; padding: 16px 18px !important; gap: 10px !important; }
          .bm-footer-bottom > div:last-child { flex-wrap: wrap !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .bm-h1 { font-size: 38px !important; }
          .bm-section-title { font-size: 26px !important; }
          .bm-grid-4 { grid-template-columns: 1fr !important; }
          .bm-footer-grid { grid-template-columns: 1fr !important; }
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

// Univerzální "Brzy" placeholder pro stránky, které ještě nejsou hotové
function ComingSoonPage({ kicker = 'BRZY', title, sub, hint }) {
  return (
    <BMPage active={null}>
      <section style={{ padding: '100px 56px 60px', minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, textAlign: 'center' }}>
          <BMMonoLabel n="…" text={kicker} center />
          <h1 style={{ fontSize: 56, fontWeight: 700, margin: '20px 0 18px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {title}
          </h1>
          <div style={{ fontSize: 17, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6, marginBottom: 28, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            {sub}
          </div>
          {hint && (
            <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.55, marginBottom: 36, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              {hint}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="../Boostmail.html" style={{ display: 'inline-block', padding: '14px 24px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Zpět na úvod
            </a>
            <a href="kontakt.html" style={{ display: 'inline-block', padding: '14px 24px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Domluvit hovor
            </a>
          </div>
        </div>
      </section>
    </BMPage>
  );
}

Object.assign(window, { BM_ACCENT, BM_SEGMENTS, BMNav, BMFooter, BMMonoLabel, BMHero, BMPage, ComingSoonPage });
