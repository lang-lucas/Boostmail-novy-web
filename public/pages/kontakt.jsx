// /kontakt — krátký formulář + kalendář + kontakty
function KontaktPage() {
  const [mode, setMode] = React.useState('cal');
  const [day, setDay] = React.useState(2);
  const [slot, setSlot] = React.useState(null);
  const [showLeadForm, setShowLeadForm] = React.useState(false);
  const [bookingLead, setBookingLead] = React.useState({ name: '', email: '', phone: '', company: '' });
  const [bookingErrors, setBookingErrors] = React.useState({});
  const [bookingSubmitting, setBookingSubmitting] = React.useState(false);
  const [bookingError, setBookingError] = React.useState(null);
  const [bookingDone, setBookingDone] = React.useState(false);

  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', project: '', msg: '' });
  const [formErrors, setFormErrors] = React.useState({});
  const [formSubmitting, setFormSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState(null);
  const [formDone, setFormDone] = React.useState(false);

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    const wd = ['ne','po','út','st','čt','pá','so'][d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const monthNames = ['led','úno','bře','dub','kvě','čvn','čvc','srp','zář','říj','lis','pro'];
    return {
      i,
      label: wd,
      num: d.getDate(),
      disabled: isWeekend,
      full: `${wd} ${d.getDate()}. ${monthNames[d.getMonth()]}`,
    };
  }).filter(d => !d.disabled).slice(0, 10);

  const slots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const selectedDay = days.find(d => d.i === day) || days[0];

  const submitBooking = async () => {
    const e = {};
    if (!bookingLead.name.trim()) e.name = 'Jméno je povinné';
    if (!bookingLead.email.trim()) e.email = 'Email je povinný';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingLead.email)) e.email = 'Neplatný formát';
    if (!bookingLead.phone.trim()) e.phone = 'Telefon je povinný';
    if (!bookingLead.company.trim()) e.company = 'Název barbershopu je povinný';
    setBookingErrors(e);
    if (Object.keys(e).length !== 0) return;
    setBookingSubmitting(true);
    setBookingError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingLead,
          day: selectedDay.full,
          slot,
          source: 'kontakt-page',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setBookingError(json.error || 'Něco se pokazilo, zkuste to prosím znovu.');
      } else {
        setBookingDone(true);
      }
    } catch (err) {
      setBookingError('Nepodařilo se odeslat. Zkuste to prosím znovu.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  const submitForm = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!formData.name.trim()) e.name = 'Jméno je povinné';
    if (!formData.email.trim()) e.email = 'Email je povinný';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Neplatný formát';
    if (!formData.project.trim()) e.project = 'Název barbershopu je povinný';
    setFormErrors(e);
    if (Object.keys(e).length !== 0) return;
    setFormSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'kontakt-page-form' }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setFormError(json.error || 'Něco se pokazilo, zkuste to prosím znovu.');
      } else {
        setFormDone(true);
      }
    } catch (err) {
      setFormError('Nepodařilo se odeslat. Zkuste to prosím znovu.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const inputStyle = (hasError) => ({
    display: 'block', width: '100%', marginTop: 6, padding: '12px 14px',
    border: `1px solid ${hasError ? '#dc2626' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
  });

  return (
    <BMPage active="kontakt">
      <BMHero
        kicker="KONTAKT"
        title={<>Pojďme spočítat, kolik vám <em style={{ fontWeight: 400, color: BM_ACCENT }}>utíká.</em></>}
        sub="Patnáctiminutový hovor zdarma. Žádná prezentace. Projdeme vaše čísla a řekneme rovnou, jestli pro vás dává smysl s námi spolupracovat."
      />

      <section className="bm-section" style={{ padding: '40px 56px 80px' }}>
        <div className="bm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, maxWidth: 1300, margin: '0 auto' }}>
          {/* Levá strana: kalendář / formulář */}
          <div>
            <div className="bm-card" style={{ display: 'inline-flex', padding: 4, borderRadius: 999, marginBottom: 24 }}>
              <button onClick={() => setMode('cal')} style={{ padding: '10px 18px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'cal' ? BM_ACCENT : 'transparent', color: mode === 'cal' ? '#fff' : '#0a0a0a' }}>Vybrat termín</button>
              <button onClick={() => setMode('form')} style={{ padding: '10px 18px', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === 'form' ? BM_ACCENT : 'transparent', color: mode === 'form' ? '#fff' : '#0a0a0a' }}>Napsat zprávu</button>
            </div>

            {mode === 'cal' && bookingDone ? (
              <div className="bm-card" style={{ padding: 32, textAlign: 'center', background: '#e8eefb', border: `1px solid ${BM_ACCENT}` }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Termín potvrzen!</div>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', lineHeight: 1.55 }}>
                  <b>{selectedDay.full}</b> v <b>{slot}</b><br/>
                  Pozvánku do kalendáře vám pošleme na <b>{bookingLead.email}</b> do několika minut.
                </div>
              </div>
            ) : mode === 'cal' && showLeadForm && slot ? (
              <div className="bm-card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, padding: 14, background: '#f9f9f9', borderRadius: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: BM_ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📅</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', letterSpacing: 1 }}>VYBRANÝ TERMÍN</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedDay.full} · {slot}</div>
                  </div>
                  <button onClick={() => setShowLeadForm(false)} style={{ background: 'none', border: 'none', color: BM_ACCENT, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>Změnit</button>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.65)', marginBottom: 14, letterSpacing: 0.3 }}>
                  Vyplňte krátké údaje, ať vám pošleme pozvánku do kalendáře:
                </div>
                {[
                  { k: 'name', l: 'JMÉNO', t: 'text', p: 'Jan Novák' },
                  { k: 'email', l: 'EMAIL', t: 'email', p: 'jan@barbershop.cz' },
                  { k: 'phone', l: 'TELEFON', t: 'tel', p: '+420 …' },
                  { k: 'company', l: 'NÁZEV BARBERSHOPU', t: 'text', p: 'Např. Boostmail Barbershop' },
                ].map(f => (
                  <div key={f.k} style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.3 }}>{f.l}</label>
                    <input type={f.t} value={bookingLead[f.k]} placeholder={f.p}
                      onChange={(ev) => setBookingLead({ ...bookingLead, [f.k]: ev.target.value })}
                      style={inputStyle(!!bookingErrors[f.k])} />
                    {bookingErrors[f.k] && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{bookingErrors[f.k]}</div>}
                  </div>
                ))}
                {bookingError && (
                  <div style={{ padding: '12px 14px', marginBottom: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#991b1b', lineHeight: 1.5 }}>{bookingError}</div>
                )}
                <button onClick={submitBooking} disabled={bookingSubmitting} style={{
                  width: '100%', padding: '14px 20px',
                  background: bookingSubmitting ? 'rgba(0,0,0,0.4)' : '#0a0a0a', color: '#fff',
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: bookingSubmitting ? 'wait' : 'pointer', fontFamily: 'inherit',
                }}>
                  {bookingSubmitting ? 'Odesílám…' : `Potvrdit termín ${slot} →`}
                </button>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 14, lineHeight: 1.5 }}>
                  Po potvrzení vám pošleme pozvánku do kalendáře. Pokud termín nesedí, ozveme se a najdeme jiný.
                </div>
              </div>
            ) : mode === 'cal' ? (
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
                {slot && (
                  <button onClick={() => setShowLeadForm(true)} style={{ display: 'block', textAlign: 'center', marginTop: 20, width: '100%', padding: '14px 20px', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', boxSizing: 'border-box', fontFamily: 'inherit' }}>
                    Pokračovat ({slot}) →
                  </button>
                )}
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 14, lineHeight: 1.5 }}>
                  Po výběru zadáte kontakt a my vám pošleme pozvánku do kalendáře.
                </div>
              </div>
            ) : formDone ? (
              <div className="bm-card" style={{ padding: 32, textAlign: 'center', background: '#e8eefb', border: `1px solid ${BM_ACCENT}` }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Děkujeme, {formData.name.split(' ')[0]}!</div>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)' }}>Ozveme se vám do 24 hodin na <b>{formData.email}</b>.</div>
              </div>
            ) : (
              <form className="bm-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={submitForm}>
                {[
                  { k: 'name', l: 'Jméno', t: 'text', p: 'Jan Novák' },
                  { k: 'email', l: 'E-mail', t: 'email', p: 'jan@barbershop.cz' },
                  { k: 'phone', l: 'Telefon', t: 'tel', p: '+420 …' },
                  { k: 'project', l: 'Název barbershopu', t: 'text', p: 'Např. Boostmail Barbershop' },
                ].map(f => (
                  <label key={f.k} style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, color: 'rgba(0,0,0,0.6)' }}>
                    {f.l.toUpperCase()}
                    <input type={f.t} value={formData[f.k]} placeholder={f.p}
                      onChange={(ev) => setFormData({ ...formData, [f.k]: ev.target.value })}
                      style={inputStyle(!!formErrors[f.k])} />
                    {formErrors[f.k] && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4, fontFamily: 'inherit', letterSpacing: 0 }}>{formErrors[f.k]}</div>}
                  </label>
                ))}
                <label style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1, color: 'rgba(0,0,0,0.6)' }}>
                  ZPRÁVA (NEPOVINNÉ)
                  <textarea rows="4" value={formData.msg} placeholder="Co řešíte? Co byste potřebovali?"
                    onChange={(ev) => setFormData({ ...formData, msg: ev.target.value })}
                    style={{ ...inputStyle(false), resize: 'vertical' }}></textarea>
                </label>
                {formError && (
                  <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#991b1b', lineHeight: 1.5 }}>{formError}</div>
                )}
                <button type="submit" disabled={formSubmitting} style={{
                  marginTop: 6, padding: '14px 20px',
                  background: formSubmitting ? 'rgba(0,0,0,0.4)' : BM_ACCENT, color: '#fff',
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: formSubmitting ? 'wait' : 'pointer',
                }}>
                  {formSubmitting ? 'Odesílám…' : 'Odeslat zprávu →'}
                </button>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 4, lineHeight: 1.5 }}>
                  Ozveme se zpravidla do 24 hodin. O víkendu o něco pomaleji.
                </div>
              </form>
            )}
          </div>

          {/* Pravá strana: přímé kontakty */}
          <div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>TELEFON</div>
              <a href="tel:+420604656033" style={{ fontSize: 28, fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>+420 604 656 033</a>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>Lukáš Lang, co-founder</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>E-MAIL</div>
              <a href="mailto:lang@boostmail.cz" style={{ fontSize: 22, fontWeight: 600, color: '#0a0a0a', textDecoration: 'none' }}>lang@boostmail.cz</a>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>Odpovídáme do 24 hodin</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 6, letterSpacing: 1 }}>FAKTURAČNÍ ÚDAJE</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(0,0,0,0.7)' }}>
                Lukáš Lang<br/>
                IČO 23915455<br/>
                Neplátce DPH
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(0,0,0,0.5)', marginBottom: 10, letterSpacing: 1 }}>NEŽ NAPÍŠETE</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(0,0,0,0.65)' }}>
                Hodíme se barbershopům s alespoň 300 zákazníky v rezervačním systému (Reservio, Reservanto, MyFox). Pokud nesedíte, řekneme rovnou, ať nikdo neztrácí čas.
              </div>
            </div>
          </div>
        </div>
      </section>
    </BMPage>
  );
}
window.KontaktPage = KontaktPage;
