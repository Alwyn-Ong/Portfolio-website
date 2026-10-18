import React from 'react';
import PixelArt from '../pixel/PixelArt';
import { townScene } from '../pixel/scenes';
import { Panel, Button, Kicker } from './ui';
import { PLACES, socialLabel, asset } from '../data';

const TOWN = townScene();

function TownMap({ ids }) {
  return (
    <Panel label="Town map" pad={16}>
      <div className="map-scene">
        <PixelArt grid={TOWN} width="100%" height="100%" title="A small pixel town" />
      </div>
      <ul className="legend">
        {ids.map((id) => (
          <li key={id}>
            <a href={`#${id}`}>
              <PixelArt grid={PLACES[id].icon} scale={3} />
              <span className="legend-place">{PLACES[id].place}</span>
              <span className="legend-section">{PLACES[id].label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export default function Hero({ main, ids }) {
  return (
    <section className="hero" id="about" aria-labelledby="hero-name">
      <div className="hero-text">
        <Kicker icon={PLACES.about.icon}>{PLACES.about.place} · {PLACES.about.label}</Kicker>
        <div className="hero-title">
          {main.image && <img className="avatar" src={asset(main.image)} alt="" width="88" height="88" />}
          <div>
            <h1 id="hero-name">{main.name}</h1>
            {main.description && <p className="hero-tagline">{main.description}</p>}
          </div>
        </div>
        {main.bio && <p className="hero-bio">{main.bio}</p>}
        <div className="btn-row">
          {main.resumedownload && <Button href={main.resumedownload} variant="primary" big>Resume</Button>}
          {(main.social ?? []).map((s) => (
            <Button key={s.url} href={s.url} big>{socialLabel(s)}</Button>
          ))}
        </div>
      </div>
      <TownMap ids={ids} />
    </section>
  );
}
