import React from 'react';

export default function Footer({ main }) {
  return (
    <footer className="footer">
      <span className="footer-name">{main.name}</span>
      {main.description && <span>{main.description}</span>}
    </footer>
  );
}
