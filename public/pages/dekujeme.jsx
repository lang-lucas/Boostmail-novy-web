// /dekujeme — potvrzení po odeslání formuláře / rezervaci hovoru
function DekujemePage() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const type = params.get('type') || 'meeting';
  const slot = params.get('slot') || null;

  const messages = {
    meeting: {
      kicker: 'REZERVACE POTVRZENA',
      title: <>Skvěle, ozveme se vám <em style={{ fontWeight: 400, color: BM_ACCENT }}>do hodiny.</em></>,
      sub: slot ? `Termín ${slot} jsme zarezervovali. Do hodiny dostanete kalendářové pozvání s odkazem na video hovor.` : 'Do hodiny dostanete kalendářové pozvání s odkazem na video hovor.',
      icon: '📅',
      next: [
        { label: 'Připravíme si vaše čísla', desc: 'Než zavoláme, mrkneme na váš barbershop a připravíme si pár hypotéz. Ušetříme čas vám i sobě.' },
        { label: 'Mějte po ruce databázi', desc: 'Stačí přibližný počet zákazníků v rezervačním systému. Detail řešíme až po hovoru.' },
        { label: 'Patnáct minut, žádná prezentace', desc: 'Když to spolu nedává smysl, řekneme to rovnou. Žádný tlak, žádné slidy.' },
      ],
    },
    message: {
      kicker: 'ZPRÁVA ODESLÁNA',
      title: <>Máme ji a <em style={{ fontWeight: 400, color: BM_ACCENT }}>odpovíme.</em></>,
      sub: 'Ozveme se zpravidla do 24 hodin. Pokud spěcháte, zavolejte +420 604 656 033.',
      icon: '✉️',
      next: [
        { label: 'Kdy odpovídáme', desc: 'Většinou do 24 hodin v pracovní dny. O víkendu o něco pomaleji.' },
        { label: 'Pokud spěcháte', desc: 'Zavolejte na +420 604 656 033 nebo napište přímo na lang@boostmail.cz.' },
        { label: 'Co dál', desc: 'Po našem ozvání se domluvíme na termínu úvodního hovoru.' },
      ],
    },
    waitlist: {
      kicker: 'JSTE NA WAITLISTU',
      title: <>Díky! Dáme vědět, <em style={{ fontWeight: 400, color: BM_ACCENT }}>jakmile spustíme.</em></>,
      sub: 'Žádné newslettery, žádné mezi-zprávy. Jen jeden e-mail, až bude co nabídnout.',
      icon: '📩',
      next: [
        { label: 'Kdy se ozveme', desc: 'Hned, jak rozjedeme. Termín zatím neumíme garantovat, máme rozpracované barbershopy.' },
        { label: 'Co mezitím', desc: 'Můžete se podívat, jak konkrétně to děláme pro barbershopy. Principy se přenášejí.' },
        { label: 'Pokud nechcete čekat', desc: 'Pro pilotní klienty z dalších oborů máme prostor. Ozvěte se na hovor a probereme.' },
      ],
    },
  };
  const m = messages[type] || messages.meeting;

  return (
    <BMPage active={null}>
      <section style={{ padding: '60px 56px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: `${BM_ACCENT}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
            margin: '0 auto 24px', border: `2px solid ${BM_ACCENT}30`,
          }}>{m.icon}</div>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: BM_ACCENT, letterSpacing: 2, marginBottom: 18, fontWeight: 600 }}>✓ {m.kicker}</div>
          <h1 style={{
            fontSize: 64, lineHeight: 1, fontWeight: 700,
            margin: '0 0 20px', letterSpacing: '-0.03em',
          }}>{m.title}</h1>
          <div style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(0,0,0,0.7)', marginBottom: 40 }}>{m.sub}</div>
        </div>
      </section>

      {/* Next steps */}
      <section className="bm-section bm-rise" style={{ padding: '20px 56px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1.5, marginBottom: 18, textAlign: 'center' }}>CO DÁL</div>
          <div className="bm-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {m.next.map((n, i) => (
              <div key={n.label} className="bm-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: BM_ACCENT, letterSpacing: '-0.03em', marginBottom: 12 }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{n.label}</h3>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested links */}
      <section className="bm-section" style={{ padding: '40px 56px 80px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', marginBottom: 18 }}>Než se ozveme, můžete se podívat na</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { href: 'reseni-barber.html', label: 'Řešení pro barbershopy' },
            { href: 'jak-pracujeme.html', label: 'Jak to běží' },
            { href: 'o-nas.html', label: 'O nás' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ padding: '10px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, fontSize: 13, color: 'rgba(0,0,0,0.75)', textDecoration: 'none' }}>{l.label}</a>
          ))}
        </div>
      </section>
    </BMPage>
  );
}
window.DekujemePage = DekujemePage;
