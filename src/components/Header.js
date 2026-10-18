import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PixelArt from '../pixel/PixelArt';
import { LOGO } from '../pixel/sprites';
import { PLACES } from '../data';
import useMobile from '../useMobile';

export default function Header({ main, ids }) {
  const mobile = useMobile();
  const [open, setOpen] = useState(false);
  // Off the home page, section links go back to it.
  const home = useLocation().pathname === '/';
  const links = ids.map((id) => (
    <li key={id}>
      {home
        ? <a href={`#${id}`} onClick={() => setOpen(false)}>{PLACES[id].label}</a>
        : <Link to={`/#${id}`} onClick={() => setOpen(false)}>{PLACES[id].label}</Link>}
    </li>
  ));

  return (
    <header className="header">
      <Link className="brand" to="/">
        <PixelArt grid={LOGO} width={40} height={40} />
        <span>
          <span className="brand-name">{main.name}</span>
          {!mobile && main.description && <span className="brand-sub">{main.description}</span>}
        </span>
      </Link>
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
