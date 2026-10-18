import React from 'react';
import { Panel, SectionHeading } from './ui';
import { PLACES } from '../data';

const SPINE = ['#8A3B2E', '#2E5E8A', '#3E6E3A', '#6A4A8A', '#8A5A22', '#2E6E6E', '#7A3E5E'];
const MONOGRAMS = { python: 'Py', java: 'Jv', mysql: 'SQL', javascript: 'JS' };
const monogram = (name) => MONOGRAMS[name.toLowerCase()] ?? (name.length <= 4 ? name : name.slice(0, 2));

export default function Skills({ skills }) {
  if (!skills?.length) return null;
  return (
    <section className="section" id="skills">
      <SectionHeading place={PLACES.skills} />
      <Panel label="Library shelf" fill="#EAD7B0" pad={14}>
        <ul className="shelf">
          {skills.map((s, i) => {
            const v = parseInt(s.level, 10);
            const has = Number.isFinite(v);
            return (
              <li key={s.name} className="book">
                <span className="spine" style={{ background: SPINE[i % SPINE.length] }} aria-hidden="true">
                  {monogram(s.name)}
                </span>
                <span className="book-name">{s.name}</span>
                {has && (
                  <>
                    <span className="pips" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, k) => <span key={k} className={k < Math.round(v / 10) ? 'on' : ''} />)}
                    </span>
                    <span className="book-level">{v} / 100</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </section>
  );
}
