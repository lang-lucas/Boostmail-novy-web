// Updated SegmentDetail with email mockup that changes per segment

const SEGMENT_DATA = {
  barber: {
    title: 'Plný kalendář bez SMS spamu',
    bullets: [
      'Připomínka po 4 týdnech přesně podle stylu střihu',
      'Recenzní flow po návštěvě – Google rating 4.9★',
      'No-show flow: 24h před, 2h před, automaticky',
    ],
    stat: '+34%', statLabel: 'opakovaných rezervací',
    email: {
      from: 'BARBERSHOP MIROSLAV',
      subject: 'Vaše stálá objednávka čeká 💈',
      preheader: 'Stejný střih, stejný den. Kliknutím rezervujete za 8 vteřin.',
      greeting: 'Ahoj Pavle,',
      message: 'vidíme, že jsi byl naposledy před 5 týdny. Tvůj střih (Fade #2) si obvykle obnovuješ po měsíci.',
      slotLabel: 'Doporučený termín',
      slotValue: 'Pátek 18:30',
      slotEmoji: '💈',
      cta: 'Rezervovat 1 klikem →',
    },
  },
  beauty: {
    title: 'Klientky chodí samy, kalendář se plní',
    bullets: [
      'Cyklické připomínky podle typu péče (manikúra 3 týdny, řasy 4)',
      'Doporučení produktové péče po návštěvě',
      'Birthday series s exkluzivní slevou',
    ],
    stat: '+41%', statLabel: 'rebookingu',
    email: {
      from: 'STUDIO LUNA · KOSMETIKA',
      subject: 'Vaše manikúra už hlásí potřebu obnovy 💅',
      preheader: 'Volný čtvrteční slot držíme pro vás. Stačí kliknout.',
      greeting: 'Dobrý den Anno,',
      message: 'od poslední návštěvy uběhly 3 týdny – přesně tehdy bývá ideální čas na doplnění gel laku a péči o nehtové lůžko.',
      slotLabel: 'Volný slot',
      slotValue: 'Čtvrtek 14:00',
      slotEmoji: '💅',
      cta: 'Rezervovat termín →',
    },
  },
  wellness: {
    title: 'Naplněné víkendy, vyšší ARPU',
    bullets: [
      'Re-aktivační série po 60 dnech bez návštěvy',
      'Dárkové vouchery automaticky před svátky',
      'Cross-sell masáží a balíčků na míru',
    ],
    stat: '+28%', statLabel: 'průměrné útraty',
    email: {
      from: 'WELLNESS RESORT VRÁŽ',
      subject: 'Víkend pro dva, který si zasloužíte 🧖',
      preheader: 'Speciální balíček s 15% slevou. Platí jen tento týden.',
      greeting: 'Vážený pane Nováku,',
      message: 'od vaší poslední návštěvy uplynuly 2 měsíce. Připravili jsme pro vás balíček Relax Weekend – 2 noci, 2 procedury, polopenze.',
      slotLabel: 'Volné víkendy',
      slotValue: 'So–Ne 14.–15. 6.',
      slotEmoji: '🧖',
      cta: 'Rezervovat balíček →',
    },
  },
  auto: {
    title: 'STK, servis, sezóna – nikdy nezapomenete',
    bullets: [
      'Automatické připomínky STK 14 dní předem',
      'Sezónní pneu výměna podle data poslední',
      'Servis intervaly napojené na CRM',
    ],
    stat: '+47%', statLabel: 'opakovaných servisů',
    email: {
      from: 'AUTOSERVIS ŠÍMA',
      subject: 'Vaše STK končí za 14 dní 🚗',
      preheader: 'Rezervujte termín teď, ať se vyhnete pokutě a frontám.',
      greeting: 'Dobrý den pane Dvořáku,',
      message: 'STK vašeho vozu Škoda Octavia (1AB 2345) končí 18. 6. Doporučujeme rezervovat termín teď – v posledním týdnu už býváme vyprodaní.',
      slotLabel: 'Nejbližší termín',
      slotValue: 'Středa 9:00',
      slotEmoji: '🚗',
      cta: 'Rezervovat STK →',
    },
  },
};

function SegmentDetailLive({ seg, accent, expandable = false }) {
  const data = SEGMENT_DATA[seg];
  const e = data.email;

  // The body is JSX so each segment gets its own fully-styled email body.
  const body = (
    <>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: '#1a1a1a', marginBottom: 14 }}>
        {e.greeting}<br/><br/>
        {e.message}
      </div>
      <div style={{ background: '#f4f4f4', padding: 14, borderRadius: 8, marginBottom: 14, fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: 11, marginBottom: 2 }}>{e.slotLabel}</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{e.slotValue}</div>
        </div>
        <div style={{ fontSize: 28 }}>{e.slotEmoji}</div>
      </div>
      <button style={{
        width: '100%', padding: '12px 16px', background: accent, color: '#fff',
        border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      }}>{e.cta}</button>
    </>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
      <div key={seg} style={{ animation: 'segFade 0.4s ease-out' }}>
        <h3 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>{data.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {data.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
              <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.75)', lineHeight: 1.5 }}>{b}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: accent, letterSpacing: '-0.03em' }}>{data.stat}</div>
          <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>{data.statLabel}</div>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <TiltWrap max={6}>
          <div key={seg} style={{ animation: 'segFade 0.5s ease-out' }}>
            <EmailMockup accent={accent} from={e.from} subject={e.subject} preheader={e.preheader} body={body} expandable={expandable} />
          </div>
        </TiltWrap>
      </div>
      <style>{`@keyframes segFade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </div>
  );
}

window.SegmentDetailLive = SegmentDetailLive;
window.SEGMENT_DATA = SEGMENT_DATA;
