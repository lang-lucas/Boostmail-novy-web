// /akademie/clanek — placeholder, články ještě nejsou
function AkademieClanekPage() {
  return (
    <ComingSoonPage
      kicker="AKADEMIE · ČLÁNEK"
      title={<>Tenhle článek se <em style={{ fontWeight: 400, color: BM_ACCENT }}>právě píše.</em></>}
      sub="Akademii teprve plníme obsahem. První články přidáme v nejbližších týdnech."
    />
  );
}
window.AkademieClanekPage = AkademieClanekPage;
