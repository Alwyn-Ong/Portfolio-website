import React from 'react';
import PixelArt, { gridToCssUrl } from './PixelArt';
import { CLERK, ICONS, TREE, LOGO, grassTile } from './sprites';
import { townScene, benchScene } from './scenes';

// Temporary step-2 page (?sprites) to review the pixel primitives. Removed in step 3.
const grass = {
  backgroundColor: 'var(--grass)',
  backgroundImage: gridToCssUrl(grassTile()),
  backgroundSize: '64px 64px',
  imageRendering: 'pixelated',
};
const panel = { clipPath: 'var(--step)', background: 'var(--brown)', padding: 3 };
const inner = { clipPath: 'var(--step)', background: 'var(--paper)', padding: 16 };

function Panel({ label, children }) {
  return (
    <div style={{ filter: 'var(--shadow)' }}>
      <div style={panel}>
        <div style={{ ...inner, padding: 0 }}>
          {label && (
            <div style={{ background: 'var(--wood)', color: 'var(--sign-text)', fontFamily: 'var(--font-px)', fontWeight: 600, fontSize: 16, padding: '6px 14px' }}>
              {label}
            </div>
          )}
          <div style={{ padding: 16 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const town = townScene();
  return (
    <main style={{ padding: 'var(--space-8) var(--gutter)', display: 'grid', gap: 32, maxWidth: 1180, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32 }}>Pixel primitives</h1>
      <Panel label="Town scene (112×64)">
        <PixelArt grid={town} width="100%" height="auto" style={{ aspectRatio: '112 / 64', width: '100%' }} title="Pixel town" />
      </Panel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <Panel label="On the workbench">
          <PixelArt grid={benchScene('laptop')} width="100%" height="auto" style={{ aspectRatio: '80 / 45', width: '100%' }} />
        </Panel>
        <Panel label="Private crate">
          <PixelArt grid={benchScene('crate')} width="100%" height="auto" style={{ aspectRatio: '80 / 45', width: '100%' }} />
        </Panel>
      </div>
      <Panel label="Sprites">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
          <PixelArt grid={CLERK} scale={6} />
          <PixelArt grid={TREE} scale={8} />
          <PixelArt grid={LOGO} scale={6} />
          {Object.entries(ICONS).map(([k, g]) => <PixelArt key={k} grid={g} scale={6} />)}
        </div>
      </Panel>
      <div style={{ ...grass, height: 120, boxShadow: 'inset 0 3px 0 var(--brown), inset 0 -3px 0 var(--brown)' }} />
      <Panel label="Type">
        <p style={{ fontFamily: 'var(--font-px)', fontWeight: 600, fontSize: 15, color: 'var(--wood)', margin: 0 }}>Kicker label</p>
        <h2 style={{ fontSize: 28 }}>Heading in Pixelify Sans</h2>
        <p style={{ margin: '8px 0 0', color: 'var(--muted)' }}>Body text in Atkinson Hyperlegible, muted colour.</p>
      </Panel>
    </main>
  );
}
