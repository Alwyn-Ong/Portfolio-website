import React, { useState } from 'react';
import PixelArt from '../pixel/PixelArt';
import { LOGO } from '../pixel/sprites';
import { PLACES } from '../data';
import useMobile from '../useMobile';

export default function Header({ main, ids }) {
  const mobile = useMobile();
  const [open, setOpen] = useState(false);
  const links = ids.map((id) => (
    <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{PLACES[id].label}</a></li>
  ));

  return (
    <header className="header">
      <a className="brand" href="#top">
        <PixelArt grid={LOGO} width={40} height={40} />
        <span>
          <span className="brand-name">{main.name}</span>
          {!mobile && main.description && <span className="brand-sub">{main.description}</span>}
        </span>
      </a>
      {mobile ? (
        <div className="menu">
          <button
            type="button"
            className="btn btn-secondary"
            aria-expanded={open}
            aria-controls="menu-list"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="btn-frame"><span className="btn-face">Menu</span></span>
          </button>
          {open && <ul id="menu-list" className="menu-list">{links}</ul>}
        </div>
      ) : (
        <nav aria-label="Sections"><ul className="nav">{links}</ul></nav>
      )}
    </header>
  );
}
