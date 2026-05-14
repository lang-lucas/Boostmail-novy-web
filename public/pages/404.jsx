// /404 — stránka nenalezena
function NotFoundPage() {
  return (
    <BMPage active={null}>
      <section style={{ padding: '100px 56px 80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, letterSpacing: 2, marginBottom: 24, fontWeight: 600 }}>[ERROR / 404]</div>
          <div style={{
            fontSize: 'clamp(140px, 22vw, 280px)', fontWeight: 700, letterSpacing: '-0.06em',
            lineHeight: 0.9, margin: '0 0 24px', color: '#0a0a0a',
            background: `linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 50%, ${BM_ACCENT} 50%, ${BM_ACCENT} 100%)`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>404</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Tahle stránka <em style={{ fontWeight: 400, color: BM_ACCENT }}>uletěla do spamu.</em>
          </h1>
          <div style={{ fontSize: 16, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            Stránka, kterou hledáte, neexistuje. Možná jsme ji přesunuli, možná je v odkazu překlep. Zkuste se vrátit a chytit jiný vlak.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <a href="../Boostmail.html" style={{ display: 'inline-block', padding: '14px 24px', background: BM_ACCENT, color: '#fff', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← Zpět na úvod</a>
            <a href="kontakt.html" style={{ display: 'inline-block', padding: '14px 24px', background: 'transparent', color: '#0a0a0a', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Domluvit hovor</a>
          </div>

          {/* Quick links */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 32 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1.5, marginBottom: 18 }}>POPULÁRNÍ STRÁNKY</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { href: 'reseni-barber.html', label: 'Řešení pro barbershopy' },
                { href: 'jak-pracujeme.html', label: 'Jak to běží' },
                { href: 'o-nas.html', label: 'O nás' },
                { href: 'kontakt.html', label: 'Kontakt' },
              ].map(l => (
                <a key={l.href} href={l.href} style={{ padding: '8px 16px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, fontSize: 13, color: 'rgba(0,0,0,0.75)', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.NotFoundPage = NotFoundPage;
