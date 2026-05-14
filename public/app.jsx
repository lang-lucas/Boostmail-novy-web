// App — mounts the design canvas with all 6 variants as artboards.

const W = 1440;
const H = 4200; // tall artboards so user sees the whole homepage in focus mode

function App() {
  return (
    <DesignCanvas>
      <DCSection id="hybrid" title="V7 · Hybrid (váš mix)" subtitle="V5 motion + V1 mono labels & dot grid + V2 dashboard & switcher + V1 ukázka & formulář">
        <DCArtboard id="v7" label="V7 · Hybrid" width={W} height={H}>
          <V7Hybrid />
        </DCArtboard>
      </DCSection>
      <DCSection id="overview" title="Původní směry" subtitle="6 vizuálních směrů pro srovnání.">
        <DCArtboard id="v1" label="V1 · Swiss / Minimal" width={W} height={H}>
          <V1Swiss />
        </DCArtboard>
        <DCArtboard id="v2" label="V2 · Tech SaaS" width={W} height={H}>
          <V2TechSaas />
        </DCArtboard>
        <DCArtboard id="v3" label="V3 · Playful / Agency" width={W} height={H}>
          <V3Playful />
        </DCArtboard>
        <DCArtboard id="v4" label="V4 · Premium / Corporate" width={W} height={H}>
          <V4Premium />
        </DCArtboard>
        <DCArtboard id="v5" label="V5 · Motion-heavy" width={W} height={H}>
          <V5Motion />
        </DCArtboard>
        <DCArtboard id="v6" label="V6 · Editorial / Magazine" width={W} height={H}>
          <V6Editorial />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
