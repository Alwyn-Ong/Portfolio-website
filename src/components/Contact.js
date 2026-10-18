import React from 'react';
import PixelArt from '../pixel/PixelArt';
import { CLERK } from '../pixel/sprites';
import { Panel, Button, Kicker } from './ui';
import { PLACES, socialLabel } from '../data';

export default function Contact({ social }) {
  if (!social?.length) return null;
  return (
    <section className="section" id="contact">
      <Panel pad={28} className="post">
        <div className="airmail" aria-hidden="true" />
        <div className="post-stamp" aria-hidden="true"><PixelArt grid={CLERK} scale={3} /></div>
        <Kicker icon={PLACES.contact.icon}>{PLACES.contact.place} · {PLACES.contact.label}</Kicker>
        <h2>{PLACES.contact.label}</h2>
        <div className="btn-row">
          {social.map((s, i) => (
            <Button key={s.url} href={s.url} variant={i === 0 ? 'primary' : 'secondary'}>{socialLabel(s)}</Button>
          ))}
        </div>
      </Panel>
    </section>
  );
}
