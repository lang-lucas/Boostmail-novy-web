// Shared utilities, hooks, and segment data used across all 6 variants.

const SEGMENTS = [
  { id: 'barber', emoji: '💈', label: 'Barbershopy', sub: 'Plný kalendář, stálí klienti' },
  { id: 'beauty', emoji: '💅', label: 'Kosmetičky', sub: 'Opakovaná péče bez prázdných oken', comingSoon: true },
  { id: 'wellness', emoji: '🧖', label: 'Wellness', sub: 'Naplněné víkendy, vyšší ARPU', comingSoon: true },
  { id: 'auto', emoji: '🚗', label: 'Autoservisy', sub: 'STK, servis, sezóna – připomínky', comingSoon: true },
];

// 5 reálných situací, kdy posíláme e-mail (Boostware flows v produkci)
const SITUATIONS = [
  { n: '01', title: 'Den po střihu', emoji: '✂️', desc: 'Zeptáme se zákazníka, jak byl spokojený. Posbíráme zpětnou vazbu a recenze.' },
  { n: '02', title: 'Když je čas na další střih', emoji: '🗓', desc: 'Připomeneme se v individuálním cyklu (typicky po 4 až 6 týdnech). Bez slev, jen ve správný moment.' },
  { n: '03', title: 'Volné okno v rozvrhu', emoji: '⏱', desc: 'Když má barber zítra volno, oslovíme lidi, kteří se chystali. Naplníme termín.' },
  { n: '04', title: 'Někdo zrušil termín', emoji: '↩', desc: 'Do dvou minut po zrušení oslovíme čekající. Termín neproplave, vy nepřijdete o tržbu.' },
  { n: '05', title: 'Tři měsíce bez návštěvy', emoji: '💭', desc: 'Zákazníka, který se ztratil, vracíme zpátky. Bez agresivních slev, jen normální zpráva.' },
];

// 3 kroky onboardingu — co se stane, když řeknete ano
const PROCESS_STEPS = [
  { n: '01', title: 'Předání databáze', emoji: '🔑', desc: 'Napojíme se na váš rezervační systém (Reservio, Reservanto, MyFox). Stačí přístupy, zbytek řešíme my.' },
  { n: '02', title: 'Nastavení flow', emoji: '⚙', desc: 'Sepneme jednotlivé situace. První dva týdny ladíme jazyk a timing, ať to sedí na váš barbershop.' },
  { n: '03', title: 'První report po měsíci', emoji: '📊', desc: 'Posíláme report s počtem rezervací z e-mailu a jejich hodnotou. Vidíte, co děláme, a kolik to přineslo.' },
];

const CLIENT_LOGOS = [
  'Nextlevel', 'Torinos', 'The Drop', 'MNB',
];

// Reálná čísla z Nextlevelu, 30 dní
const STATS = [
  { value: '58', label: 'rezervací z e-mailu / měsíc' },
  { value: '45 792 Kč', label: 'obratu z databáze / měsíc' },
  { value: '878', label: 'odeslaných e-mailů / měsíc' },
  { value: '0 Kč', label: 'utraceno za reklamu' },
];

// ─── ROI Calculator ──────────────────────────────────────────
// Used in multiple variants (V2, V3, V5). Returns an object with
// value, monthly, yearly + a setter. Logic: dbSize × openRate × ctr × aov × repeatLift
function useROI(initial = { db: 8000, aov: 1500 }) {
  const [db, setDb] = React.useState(initial.db);
  const [aov, setAov] = React.useState(initial.aov);
  // Conservative assumption: 8% of db responds to retention flows per month
  const monthly = Math.round(db * 0.08 * aov * 0.18);
  const yearly = monthly * 12;
  return { db, setDb, aov, setAov, monthly, yearly };
}

function fmtCZK(n) {
  return n.toLocaleString('cs-CZ').replace(/,/g, ' ') + ' Kč';
}

// ─── Form with validation ────────────────────────────────────
function ContactForm({ accent = '#1a5ada', dark = false }) {
  const [data, setData] = React.useState({ name: '', email: '', phone: '', project: '', msg: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

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

  const inputBase = {
    width: '100%',
    padding: '14px 16px',
    fontSize: 15,
    fontFamily: 'inherit',
    border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
    background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: dark ? '#fff' : '#0a0a0a',
    borderRadius: 8,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const field = (key, label, type = 'text', extra = {}) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>
        {label.toUpperCase()}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          rows={3}
          style={{ ...inputBase, resize: 'vertical', fontFamily: 'inherit' }}
          {...extra}
        />
      ) : (
        <input
          type={type}
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          style={{ ...inputBase, ...(errors[key] ? { borderColor: '#dc2626' } : {}) }}
          {...extra}
        />
      )}
      {errors[key] && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors[key]}</div>}
    </div>
  );

  if (sent) {
    return (
      <div style={{ padding: 32, background: dark ? 'rgba(26,90,218,0.15)' : '#e8eefb', border: `1px solid ${accent}`, borderRadius: 12, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6, color: dark ? '#fff' : '#0a0a0a' }}>Děkujeme!</div>
        <div style={{ fontSize: 14, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>Ozveme se vám do 24 hodin.</div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {field('name', 'Jméno')}
        {field('email', 'Email', 'email')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {field('phone', 'Telefon', 'tel')}
        {field('project', 'Název projektu')}
      </div>
      {field('msg', 'Zpráva (nepovinné)', 'textarea')}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '16px 20px',
          fontSize: 15,
          fontWeight: 700,
          background: accent,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontFamily: 'inherit',
          letterSpacing: 0.2,
          transition: 'transform 0.1s, background 0.15s',
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💸 Chci ukázku zdarma →
      </button>
    </form>
  );
}

// ─── Email mockup with fake "send" animation ────────────────
function EmailMockup({ subject = 'Vaše stálá objednávka čeká 💈', preheader = 'Stejný střih, stejný den. Kliknutím rezervujete za 8 vteřin.', from = 'BARBERSHOP MIROSLAV', body, accent = '#1a5ada', sending: sendingProp, onSend, scale = 1, expandable = false }) {
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const isSending = sendingProp !== undefined ? sendingProp : sending;

  const handleSend = () => {
    if (onSend) return onSend();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div style={{ position: 'relative', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 24px 60px -20px rgba(26,90,218,0.25), 0 8px 20px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 380,
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        {/* Mail header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }}/>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }}/>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c941' }}/>
          </div>
          <div style={{ marginLeft: 10, fontSize: 11, color: 'rgba(0,0,0,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>inbox · zákazník@email.cz</div>
        </div>
        {/* Email content */}
        <div style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: accent, letterSpacing: 1, marginBottom: 6 }}>{from}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0a0a0a', marginBottom: 4, lineHeight: 1.25 }}>{subject}</div>
          <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', marginBottom: 18 }}>{preheader}</div>

          {body || (
            <>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: '#1a1a1a', marginBottom: 14 }}>
                Ahoj Pavle,<br/><br/>
                vidíme, že jsi byl naposledy <b>před 5 týdny</b>. Tvůj střih (Fade #2) si obvykle obnovuješ po měsíci.
              </div>
              <div style={{ background: '#f4f4f4', padding: 14, borderRadius: 8, marginBottom: 14, fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: 11, marginBottom: 2 }}>Doporučený termín</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Pátek 18:30</div>
                </div>
                <div style={{ fontSize: 28 }}>💈</div>
              </div>
              <button style={{
                width: '100%',
                padding: '12px 16px',
                background: accent,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                Rezervovat 1 klikem →
              </button>
            </>
          )}
        </div>
      </div>

      {/* "Sending" overlay */}
      {isSending && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12, borderRadius: 14, zIndex: 5,
        }}>
          <div style={{ fontSize: 36 }}>📨</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Odesílám 8 247 emailům…</div>
          <div style={{ width: 200, height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: accent, animation: 'sendBar 1.5s ease-out forwards' }}/>
          </div>
        </div>
      )}
      {sent && (
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: '#10b981', color: '#fff', fontSize: 12, fontWeight: 600,
          padding: '6px 10px', borderRadius: 999, animation: 'sentPop 0.3s ease-out',
        }}>
          ✓ Odesláno
        </div>
      )}

      {expandable && !expanded && (
        <button onClick={(e) => { e.stopPropagation(); setExpanded(true); }} style={{
          position: 'absolute', top: 14, right: 14, zIndex: 6,
          background: '#0a0a0a', color: '#fff', border: 'none',
          borderRadius: 999, padding: '6px 12px',
          fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
          cursor: 'pointer', letterSpacing: 0.3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 13 }}>↗</span> Otevřít
        </button>
      )}

      {expanded && (
        <div onClick={() => setExpanded(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          animation: 'emFade 0.25s ease-out',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 18,
            maxWidth: 720, width: '100%', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            animation: 'emPop 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
            position: 'relative',
          }}>
            <button onClick={() => setExpanded(false)} style={{
              position: 'absolute', top: 18, right: 18, zIndex: 2,
              width: 36, height: 36, borderRadius: '50%',
              background: '#f4f4f4', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700,
            }}>×</button>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
                {from[0]}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{from}</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>komu: zákazník@email.cz · dnes 08:32</div>
              </div>
            </div>
            <div style={{ padding: '28px 36px' }}>
              <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{subject}</div>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.55)', marginBottom: 24 }}>{preheader}</div>
              {body || (
                <>
                  <div style={{ fontSize: 16, lineHeight: 1.6, color: '#1a1a1a', marginBottom: 22 }}>
                    Ahoj Pavle,<br/><br/>
                    vidíme, že jsi byl naposledy <b>před 5 týdny</b>. Tvůj střih (Fade #2) si obvykle obnovuješ po měsíci. Připravili jsme ti termín, který se ti nejvíc hodí podle tvé historie.
                  </div>
                  <div style={{ background: '#f4f4f4', padding: 20, borderRadius: 12, marginBottom: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: 12, marginBottom: 4 }}>Doporučený termín</div>
                      <div style={{ fontWeight: 700, fontSize: 22 }}>Pátek 18:30</div>
                      <div style={{ color: 'rgba(0,0,0,0.55)', fontSize: 13, marginTop: 2 }}>Miroslav · 30 min · Fade #2</div>
                    </div>
                    <div style={{ fontSize: 48 }}>💈</div>
                  </div>
                  <button style={{
                    width: '100%', padding: '16px 20px',
                    background: accent, color: '#fff', border: 'none',
                    borderRadius: 10, fontSize: 16, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>Rezervovat 1 klikem →</button>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginTop: 14, textAlign: 'center' }}>
                    Nehodí se? <span style={{ color: accent, textDecoration: 'underline' }}>Vybrat jiný termín</span>
                  </div>
                </>
              )}
            </div>
            <div style={{ padding: '14px 28px', background: '#f9f9f9', borderTop: '1px solid #eee', fontSize: 11, color: 'rgba(0,0,0,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5, display: 'flex', justifyContent: 'space-between' }}>
              <span>FLOW: WIN-BACK · DEN 35</span>
              <span>OPEN: 62 % · CTR: 18 %</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sendBar { from { width: 0% } to { width: 100% } }
        @keyframes sentPop { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes emFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes emPop { from { opacity: 0; transform: translateY(20px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}

// ─── Animated 4-step process ─────────────────────────────────
// Auto-cycles through steps. Used in V2, V5.
function ProcessAnimated({ accent = '#1a5ada', interval = 2400 }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 4), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, position: 'relative' }}>
      {/* Connecting line behind cards */}
      <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 2, background: 'rgba(0,0,0,0.08)', zIndex: 0 }}>
        <div style={{
          height: '100%',
          background: accent,
          width: `${((active + 1) / 4) * 100}%`,
          transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
        }}/>
      </div>
      {PROCESS_STEPS.map((s, i) => {
        const isActive = i === active;
        const isPast = i < active;
        return (
          <div key={s.n} style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: isActive || isPast ? accent : '#fff',
              border: `2px solid ${isActive || isPast ? accent : 'rgba(0,0,0,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
              transition: 'all 0.4s ease',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              boxShadow: isActive ? `0 8px 24px ${accent}44` : 'none',
              margin: '0 auto 16px',
              filter: isActive || isPast ? 'none' : 'grayscale(0.3)',
            }}>
              {s.emoji}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.4)', marginBottom: 4 }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Segment switcher tabs ───────────────────────────────────
function SegmentSwitcher({ active, onChange, accent = '#1a5ada', variant = 'default' }) {
  return (
    <div style={{
      display: 'inline-flex',
      background: variant === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff',
      border: variant === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
      borderRadius: 999,
      padding: 4,
      gap: 2,
    }}>
      {SEGMENTS.map((s) => {
        const isActive = active === s.id;
        const disabled = !!s.comingSoon;
        return (
          <button
            key={s.id}
            onClick={() => !disabled && onChange(s.id)}
            disabled={disabled}
            title={disabled ? 'Připravujeme — chcete být první? Ozvěte se.' : undefined}
            style={{
              padding: '10px 18px',
              border: 'none',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              background: isActive ? accent : 'transparent',
              color: isActive
                ? '#fff'
                : disabled
                  ? (variant === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)')
                  : (variant === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'),
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
              position: 'relative',
              opacity: disabled ? 0.85 : 1,
            }}
          >
            <span style={{ filter: disabled ? 'grayscale(0.5)' : 'none' }}>{s.emoji}</span>
            <span>{s.label}</span>
            {disabled && (
              <span style={{
                fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
                padding: '2px 6px', borderRadius: 999,
                background: variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
                color: variant === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
                letterSpacing: 0.5, fontWeight: 700,
              }}>JIŽ BRZY</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── ROI Calculator UI ───────────────────────────────────────
function ROICalculator({ accent = '#1a5ada', dark = false, compact = false }) {
  const roi = useROI();
  const labelColor = dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)';
  const valColor = dark ? '#fff' : '#0a0a0a';

  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
      border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
      borderRadius: 16,
      padding: compact ? 24 : 32,
      color: valColor,
    }}>
      <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, marginBottom: 4, letterSpacing: 1 }}>ROI KALKULAČKA</div>
      <div style={{ fontSize: compact ? 20 : 24, fontWeight: 700, marginBottom: 24 }}>Kolik vám leží v databázi?</div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: labelColor }}>Velikost databáze</span>
          <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{roi.db.toLocaleString('cs-CZ')} kontaktů</span>
        </div>
        <input type="range" min="500" max="50000" step="500" value={roi.db} onChange={(e) => roi.setDb(+e.target.value)}
          style={{ width: '100%', accentColor: accent }} />
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: labelColor }}>Průměrná hodnota objednávky</span>
          <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{fmtCZK(roi.aov)}</span>
        </div>
        <input type="range" min="200" max="10000" step="100" value={roi.aov} onChange={(e) => roi.setAov(+e.target.value)}
          style={{ width: '100%', accentColor: accent }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 18, background: dark ? 'rgba(26,90,218,0.15)' : '#e8eefb', borderRadius: 10, border: `1px solid ${accent}22` }}>
        <div>
          <div style={{ fontSize: 11, color: labelColor, marginBottom: 4 }}>POTENCIÁL / MĚSÍC</div>
          <div style={{ fontSize: compact ? 22 : 26, fontWeight: 800, color: accent, fontFamily: 'JetBrains Mono, monospace' }}>{fmtCZK(roi.monthly)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: labelColor, marginBottom: 4 }}>POTENCIÁL / ROK</div>
          <div style={{ fontSize: compact ? 22 : 26, fontWeight: 800, color: accent, fontFamily: 'JetBrains Mono, monospace' }}>{fmtCZK(roi.yearly)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tiny logo render (SVG-based "wordmark" placeholders) ───
function ClientLogos({ logos = CLIENT_LOGOS, color = 'rgba(0,0,0,0.4)', monochrome = true }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 36, alignItems: 'center', justifyContent: 'center',
      filter: monochrome ? 'grayscale(1)' : 'none', opacity: monochrome ? 0.7 : 1,
    }}>
      {logos.map((l) => (
        <div key={l} style={{
          fontSize: 16, fontWeight: 700, color, letterSpacing: 0.5,
          fontFamily: 'inherit',
        }}>{l}</div>
      ))}
    </div>
  );
}

// Expose globally
Object.assign(window, {
  SEGMENTS, PROCESS_STEPS, SITUATIONS, CLIENT_LOGOS, STATS,
  useROI, fmtCZK,
  ContactForm, EmailMockup, ProcessAnimated, SegmentSwitcher, ROICalculator, ClientLogos,
});
