// /kontakt — kalendář + form + adresa
function KontaktPage() {
  const [mode, setMode] = React.useState('cal');
  const [day, setDay] = React.useState(2);
  const [slot, setSlot] = React.useState(null);
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    const wd = ['ne','po','út','st','čt','pá','so'][d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    return { i, label: wd, num: d.getDate(), disabled: isWeekend };
  }).filter(d => !d.disabled).slice(0, 10);
  const slots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <BMPage active="kontakt">
      <BMHero
        kicker="KONTAKT"
        title={<>Zjistěte, kolik peněz vám leží v <em style={{ fontWeight: 400, color: BM_ACCENT }}>databázi.</em></>}
        sub="30minutový hovor zdarma. Žádné prezentace, žádný sales pitch — projdeme vaši situaci a řekneme, jestli vám můžeme pomoci."
      />
      <section className="bm-section" style={{ padding: '40px 56px 80px' }}>
        <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, maxWidth: 1300, margin: '0 auto' }}>
          <div>
            <div className="bm-card" style={{ display: 'inline-flex', padding: 4, borderRadius: 999, marginBottom: 24 }}>
              <button onClick={() => setMode('cal')} style={{ padding: '10px 18px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'cal' ? BM_ACCENT : 'transparent', color: mode === 'cal' ? '#fff' : '#0a0a0a' }}>📅 Vybrat termín</button>
              <button onClick={() => setMode('form')} style={{ padding: '10px 18px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'form' ? BM_ACCENT : 'transparent', color: mode === 'form' ? '#fff' : '#0a0a0a' }}>✉ Napsat zprávu</button>
            </div>
            {mode === 'cal' ? (
              <div className="bm-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 14 }}>VYBERTE DEN</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
                  {days.map(d => (
                    <button key={d.i} onClick={() => setDay(d.i)} style={{ padding: '12px 4px', border: `1px solid ${d.i === day ? BM_ACCENT : 'rgba(0,0,0,0.1)'}`, background: d.i === day ? `${BM_ACCENT}15` : '#fff', color: d.i === day ? BM_ACCENT : '#0a0a0a', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase' }}>{d.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{d.num}</div>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1, marginBottom: 14 }}>VYBERTE ČAS</div>
                <div className="bm-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {slots.map(s => (
                    <button key={s} onClick={() => setSlot(s)} style={{ padding: '12px 8px', border: `1px solid ${slot === s ? BM_ACCENT : 'rgba(0,0,0,0.1)'}`, background: slot === s ? BM_ACCENT : '#fff', color: slot === s ? '#fff' : '#0a0a0a', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600 }}>{s}</button>
                  ))}
                </div>
                {slot && <button style={{ marginTop: 20, width: '100%', padding: '14px 20px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Potvrdit termín {slot} →</button>}
              </div>
            ) : (
              <form className="bm-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={(e)=>e.preventDefault()}>
                {[{ l:'Jméno', t:'text', p:'Jan Novák' },{ l:'Email', t:'email', p:'jan@firma.cz' },{ l:'Telefon', t:'tel', p:'+420 …' },{ l:'Firma', t:'text', p:'Boostmail s.r.o.' }].map(f => (
                  <label key={f.l} style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, color: 'rgba(0,0,0,0.6)' }}>{f.l.toUpperCase()}
                    <input type={f.t} placeholder={f.p} style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                  </label>
                ))}
                <label style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, color: 'rgba(0,0,0,0.6)' }}>ZPRÁVA
                  <textarea rows="4" placeholder="O co máte zájem?" style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}></textarea>
                </label>
                <button type="submit" style={{ marginTop: 6, padding: '14px 20px', background: BM_ACCENT, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Odeslat zprávu →</button>
              </form>
            )}
          </div>
          <div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>TELEFON</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>+420 604 656 033</div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>Po–Pá 9:00–17:00</div>
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>EMAIL</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>ahoj@boostmail.cz</div>
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>ADRESA</div>
              <div style={{ fontSize: 16, lineHeight: 1.5 }}>Jindřišská 941/24<br/>110 00 Praha 1</div>
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>FAKTURAČNÍ ÚDAJE</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)' }}>Boostmail s.r.o.<br/>IČO: 23915455<br/>DIČ: CZ23915455</div>
            </div>
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.KontaktPage = KontaktPage;
