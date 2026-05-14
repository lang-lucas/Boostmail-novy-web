// /reseni-{beauty|wellness|auto} — placeholdery, obory připravujeme
function ReseniSoonPlaceholder({ icon, name }) {
  return (
    <ComingSoonPage
      kicker={`ŘEŠENÍ · ${name.toUpperCase()}`}
      title={
        <>
          <span style={{ display: 'inline-block', marginRight: 12 }}>{icon}</span>
          <span>{name}</span> <em style={{ fontWeight: 400, color: BM_ACCENT, display: 'block' }}>chystáme.</em>
        </>
      }
      sub={`Začínáme u barbershopů. ${name} jsou na řadě, jakmile si systém v barbershopu pořádně sedne a najdeme první pilotní klienty z tohoto oboru.`}
      hint="Pokud byste do toho šli s námi, ozvěte se. Pilotním klientům dáme férové podmínky."
    />
  );
}

function ReseniBeautyPage()    { return <ReseniSoonPlaceholder icon="💅" name="Kosmetičky" />; }
function ReseniWellnessPage()  { return <ReseniSoonPlaceholder icon="🧖" name="Wellness" />; }
function ReseniAutoPage()      { return <ReseniSoonPlaceholder icon="🚗" name="Autoservisy" />; }

Object.assign(window, { ReseniSoonPlaceholder, ReseniBeautyPage, ReseniWellnessPage, ReseniAutoPage });
