import React from 'react';
import { Panel, Stamp, SectionHeading, Bullets } from './ui';
import { PLACES, isCurrent } from '../data';

export default function Education({ education }) {
  if (!education?.length) return null;
  return (
    <section className="section" id="education">
      <SectionHeading place={PLACES.education} />
      <div className="schools">
        {education.map((e, i) => (
          <Panel key={i} label={e.school} pad={24}>
            <div className="school-head">
              {e.degree && <h3>{e.degree}</h3>}
              <Stamp current={isCurrent(e.graduated)} />
            </div>
            {e.graduated && <p className="detail-meta">{e.graduated}</p>}
            <Bullets items={e.description} />
          </Panel>
        ))}
      </div>
    </section>
  );
}
