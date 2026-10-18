import React from 'react';
import { Link } from 'react-router-dom';
import PixelArt, { gridToCssUrl } from '../pixel/PixelArt';
import { grassTile } from '../pixel/sprites';

export function Panel({ label, fill, pad = 16, className = '', children }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-frame">
        <div className="panel-fill" style={fill ? { background: fill } : undefined}>
          {label && <div className="panel-label">{label}</div>}
          <div className="panel-body" style={{ padding: pad }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Button({ href, to, variant = 'secondary', big, children }) {
  const className = `btn btn-${variant}${big ? ' btn-big' : ''}`;
  const face = <span className="btn-frame"><span className="btn-face">{children}</span></span>;
  if (to) return <Link className={className} to={to}>{face}</Link>;
  const external = /^https?:/.test(href);
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {face}
    </a>
  );
}

export const Tag = ({ children }) => <span className="tag">{children}</span>;

export function Stamp({ current }) {
  return current
    ? <span className="stamp stamp-amber"><span aria-hidden="true">●</span>In progress</span>
    : <span className="stamp stamp-ok"><span aria-hidden="true">✓</span>Completed</span>;
}

export function Kicker({ icon, children }) {
  return (
    <p className="kicker">
      {icon && <PixelArt grid={icon} scale={2} />}
      {children}
    </p>
  );
}

export function SectionHeading({ place, children }) {
  return (
    <div className="section-heading">
      <Kicker icon={place.icon}>{place.place} · {place.label}</Kicker>
      <h2>{children ?? place.label}</h2>
    </div>
  );
}

const GRASS_BG = gridToCssUrl(grassTile());

// Grass strip with a fence and a wooden sign, between sections.
export function Street({ place }) {
  return (
    <div className="street" style={{ backgroundImage: GRASS_BG }} aria-hidden="true">
      <div className="street-fence" />
      <div className="street-sign">
        <span className="street-icon"><PixelArt grid={place.icon} scale={2} /></span>
        {place.place}
      </div>
    </div>
  );
}

export function Bullets({ items }) {
  if (!items?.length) return null;
  return <ul className="bullets">{items.map((b, i) => <li key={i}>{b}</li>)}</ul>;
}
