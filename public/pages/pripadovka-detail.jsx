// Detail případovek — všechny zatím placeholdery (čeká se na souhlas klientů)
function PripadovkaDetailPlaceholder({ name }) {
  return (
    <ComingSoonPage
      kicker={`PŘÍPADOVKA · ${name.toUpperCase()}`}
      title={<>Tahle případovka se <em style={{ fontWeight: 400, color: BM_ACCENT }}>právě píše.</em></>}
      sub="Detailní rozpad spolupráce, čísel a metodiky doplníme, jakmile budeme mít souhlas klienta se zveřejněním."
      hint="Krátké shrnutí výsledků barbershopu Nextlevel je už teď na úvodní stránce."
    />
  );
}

function PripadovkaMirekPage()      { return <PripadovkaDetailPlaceholder name="Barbershop Mirek" />; }
function PripadovkaBarberhausPage() { return <PripadovkaDetailPlaceholder name="BarberHaus" />; }
function PripadovkaOldschoolPage()  { return <PripadovkaDetailPlaceholder name="Old School Cuts" />; }
function PripadovkaSharpPage()      { return <PripadovkaDetailPlaceholder name="Sharp & Co." />; }

Object.assign(window, {
  PripadovkaDetailPlaceholder,
  PripadovkaMirekPage, PripadovkaBarberhausPage, PripadovkaOldschoolPage, PripadovkaSharpPage,
});
