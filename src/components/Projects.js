import React from 'react';
import PixelArt from '../pixel/PixelArt';
import { ICONS } from '../pixel/sprites';
import { Panel, Button, Tag, SectionHeading } from './ui';
import { PLACES, isPrivate } from '../data';

function ProjectCard({ p }) {
  const priv = isPrivate(p);
  return (
    <Panel pad={20} className="card">
      <div className="card-top">
        <span className="card-place"><PixelArt grid={ICONS.gear} scale={2} />Workshop</span>
        <span className={`chip ${priv ? 'chip-private' : 'chip-open'}`}>{priv ? 'Client work' : 'Open source'}</span>
      </div>
      <h3><a href={`${import.meta.env.BASE_URL}projects/${p.slug}`}>{p.title}</a></h3>
      {p.builtFor && <p className="built-for">Built for {p.builtFor}</p>}
      {p.problem && <p className="problem"><strong>The problem:</strong> {p.problem}</p>}
      {p.description && <p className="card-desc">{p.description}</p>}
      {p.technology?.length > 0 && (
        <div className="tags">{p.technology.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      )}
      <div className="card-cta">
        {p.link && <Button href={p.link} variant="primary">Visit site</Button>}
        {p.github && <Button href={p.github}>View on GitHub</Button>}
        {priv && <span className="card-private">Private repo · ask me about it</span>}
      </div>
    </Panel>
  );
}

export default function Projects({ projects }) {
  if (!projects?.length) return null;
  return (
    <section className="section" id="projects">
      <SectionHeading place={PLACES.projects} />
      <ul className="cards">
        {projects.map((p) => <li key={p.slug}><ProjectCard p={p} /></li>)}
      </ul>
    </section>
  );
}
