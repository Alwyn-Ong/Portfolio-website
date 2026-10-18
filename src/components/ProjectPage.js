import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PixelArt, { gridToCssUrl } from '../pixel/PixelArt';
import { benchScene } from '../pixel/scenes';
import { grassTile } from '../pixel/sprites';
import { Panel, Button, Tag, Kicker, Bullets } from './ui';
import { PLACES, isPrivate, video } from '../data';

const SCENES = { laptop: benchScene('laptop'), crate: benchScene('crate') };
const SCENE_TITLES = { laptop: 'A laptop on a workbench', crate: 'A padlocked crate on a workbench' };
const GRASS_BG = gridToCssUrl(grassTile());

// Grass strip whose sign is the breadcrumb back to the projects section.
function Breadcrumb({ title }) {
  return (
    <nav className="street" style={{ backgroundImage: GRASS_BG }} aria-label="Breadcrumb">
      <div className="street-fence" aria-hidden="true" />
      <ol className="street-sign crumbs">
        <li>
          <Link to="/#projects">
            <span className="street-icon"><PixelArt grid={PLACES.projects.icon} scale={2} /></span>
            {PLACES.projects.place}
          </Link>
        </li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

function JobCard({ p, priv }) {
  return (
    <Panel label="Job card" pad={20} className="job-card">
      <dl className="facts">
        <dt>Type</dt>
        <dd><span className={`chip ${priv ? 'chip-private' : 'chip-open'}`}>{priv ? 'Client work' : 'Open source'}</span></dd>
        {p.builtFor && (<><dt>Built for</dt><dd>{p.builtFor}</dd></>)}
        {p.metric && (<><dt>Result</dt><dd className="metric">{p.metric}</dd></>)}
        {p.technology?.length > 0 && (
          <>
            <dt>Built with</dt>
            <dd className="tags">{p.technology.map((t) => <Tag key={t}>{t}</Tag>)}</dd>
          </>
        )}
      </dl>
      <div className="job-cta">
        {p.link && <Button href={p.link} variant="primary">Visit site</Button>}
        {p.github && <Button href={p.github}>View on GitHub</Button>}
        {priv && <p className="card-private">Private repo · ask me about it</p>}
      </div>
    </Panel>
  );
}

function Pager({ prev, next }) {
  return (
    <nav className="pager" aria-label="More projects">
      <Link className="pager-link" to={`/projects/${prev.slug}`}>
        <span className="pager-dir">← Previous</span>
        <span className="pager-title">{prev.title}</span>
      </Link>
      <Link className="pager-link pager-next" to={`/projects/${next.slug}`}>
        <span className="pager-dir">Next →</span>
        <span className="pager-title">{next.title}</span>
      </Link>
    </nav>
  );
}

export function NotFound() {
  return (
    <main className="section project-missing">
      <h1>Page not found</h1>
      <Button to="/" variant="primary">Back to home</Button>
    </main>
  );
}

export default function ProjectPage({ projects }) {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];

  useEffect(() => {
    if (!p) return undefined;
    const prevTitle = document.title;
    document.title = `${p.title} · ${prevTitle}`;
    return () => { document.title = prevTitle; };
  }, [p]);

  if (!p) return <NotFound />;

  const priv = isPrivate(p);
  const scene = p.scene ?? (priv ? 'crate' : 'laptop');
  const n = projects.length;

  return (
    <main>
      <Breadcrumb title={p.title} />
      <article className="section project">
        <header className="project-head">
          <Kicker icon={PLACES.projects.icon}>{PLACES.projects.place} · Project</Kicker>
          <h1>{p.title}</h1>
          {p.builtFor && <p className="built-for">Built for {p.builtFor}</p>}
          {p.problem && <p className="problem project-problem"><strong>The problem:</strong> {p.problem}</p>}
        </header>
        {p.demo ? (
          <div className="project-scene project-scene-demo">
            <video className="project-demo" src={video(p.demo)} autoPlay muted loop playsInline controls aria-label={`${p.title} demo`} />
          </div>
        ) : (
          <div className="project-scene">
            <PixelArt grid={SCENES[scene]} width="100%" height="100%" title={SCENE_TITLES[scene]} />
          </div>
        )}
        <JobCard p={p} priv={priv} />
        <div className="project-body">
          {p.description && (
            <section>
              <h2>What it does</h2>
              <p>{p.description}</p>
            </section>
          )}
          {p.howItWorks?.length > 0 && (
            <section>
              <h2>How it works</h2>
              <Bullets items={p.howItWorks} />
            </section>
          )}
          {p.learned?.length > 0 && (
            <section>
              <h2>What I learned</h2>
              <Bullets items={p.learned} />
            </section>
          )}
        </div>
      </article>
      {n > 1 && <div className="section pager-wrap"><Pager prev={projects[(i - 1 + n) % n]} next={projects[(i + 1) % n]} /></div>}
    </main>
  );
}
