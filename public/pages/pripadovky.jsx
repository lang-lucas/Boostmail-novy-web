// /pripadovky — placeholder, případovky se píšou
function PripadovkyPage() {
  return (
    <ComingSoonPage
      kicker="PŘÍPADOVKY"
      title={<>Detailní případovky <em style={{ fontWeight: 400, color: BM_ACCENT }}>brzy.</em></>}
      sub="Veřejné případovky teprve píšeme. Chceme do nich dostat reálná čísla a citaci od klienta, ne marketingové fráze."
      hint="Mezitím najdete krátké shrnutí výsledků barbershopu Nextlevel na úvodní stránce."
    />
  );
}
window.PripadovkyPage = PripadovkyPage;
