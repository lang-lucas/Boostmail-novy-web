// /akademie — placeholder, články píše Claude Code
function AkademiePage() {
  return (
    <ComingSoonPage
      kicker="AKADEMIE"
      title={<>Články se právě <em style={{ fontWeight: 400, color: BM_ACCENT }}>píšou.</em></>}
      sub="Akademie bude knihovna textů o retenci pro barbershopy. Témata už máme rozplánovaná, první články přidáme v nejbližších týdnech."
      hint="Pokud chcete dostat upozornění, jakmile spustíme, napište nám."
    />
  );
}
window.AkademiePage = AkademiePage;
