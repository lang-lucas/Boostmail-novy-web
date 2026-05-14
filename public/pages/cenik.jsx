// /cenik — placeholder, individuální cena
function CenikPage() {
  return (
    <ComingSoonPage
      kicker="CENÍK"
      title={<>Ceny zatím <em style={{ fontWeight: 400, color: BM_ACCENT }}>individuálně.</em></>}
      sub="Cena záleží na velikosti vašeho barbershopu a tom, jaké flow nasadíme. Místo veřejného ceníku je jednodušší si na patnáct minut zavolat, podíváme se na vaše čísla a řekneme rovnou."
      hint="Hodíme se barbershopům s 300+ zákazníky v rezervačním systému (Reservio, Reservanto, MyFox)."
    />
  );
}
window.CenikPage = CenikPage;
