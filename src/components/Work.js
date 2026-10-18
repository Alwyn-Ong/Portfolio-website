import React, { useState } from 'react';
import { Panel, Stamp, Kicker, SectionHeading, Bullets } from './ui';
import { PLACES, isCurrent, asset } from '../data';
import useMobile from '../useMobile';

const meta = (w) => [w.company, w.years].filter(Boolean).join(' · ');

function Notice({ job, n, selected, mobile, onSelect }) {
  return (
    <button
      type="button"
      className={`notice${selected ? ' is-selected' : ''}`}
      aria-pressed={mobile ? undefined : selected}
      aria-expanded={mobile ? selected : undefined}
      onClick={onSelect}
    >
      <span className="notice-pin" aria-hidden="true" />
      <span className="notice-no"><small>No.</small>{n}</span>
      <span className="notice-main">
        <span className="notice-title">{job.title}</span>
        <span className="notice-meta">{meta(job)}</span>
      </span>
      <Stamp current={isCurrent(job.years)} />
      <span className="notice-arrow" aria-hidden="true">{mobile && selected ? '▼' : '▶'}</span>
    </button>
  );
}

function Detail({ job, n, inline }) {
  const body = (
    <>
      <div className="detail-head">
        <span className="detail-no">Notice No. {n}</span>
        <Stamp current={isCurrent(job.years)} />
      </div>
      <div className="detail-title">
        {job.logo && <img className="detail-logo" src={asset(job.logo)} alt="" />}
        <div>
          <h3>{job.title}</h3>
          <p className="detail-meta">{meta(job)}</p>
        </div>
      </div>
      {job.description?.length > 0 && (
        <>
          <Kicker>What I did</Kicker>
          <Bullets items={job.description} />
        </>
      )}
    </>
  );
  if (inline) return <div className="detail detail-inline">{body}</div>;
  return <Panel label="Notice, in full" pad={26} className="detail">{body}</Panel>;
}

export default function Work({ work }) {
  const mobile = useMobile();
  const [sel, setSel] = useState(0);
  if (!work?.length) return null;

  const notices = work.map((job, i) => (
    <li key={i}>
      <Notice
        job={job}
        n={i + 1}
        selected={sel === i}
        mobile={mobile}
        onSelect={() => setSel(mobile && sel === i ? -1 : i)}
      />
      {mobile && sel === i && <Detail job={job} n={i + 1} inline />}
    </li>
  ));

  return (
    <section className="section" id="work">
      <SectionHeading place={PLACES.work} />
      {mobile ? (
        <ul className="notices">{notices}</ul>
      ) : (
        <div className="work-layout">
          <div className="board"><ul className="notices">{notices}</ul></div>
          {work[sel] && <Detail job={work[sel]} n={sel + 1} />}
        </div>
      )}
    </section>
  );
}
