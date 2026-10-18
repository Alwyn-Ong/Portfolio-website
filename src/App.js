import React, { useEffect, useState } from 'react';

// Temporary plain renderer: proves the data loads and `sections` drives the page.
// Replaced by the K2 components in step 3.
const SECTIONS = {
  about: ({ main }) => <p>{main.bio}</p>,
  work: ({ resume }) => (resume.work ?? []).map((w, i) => (
    <div key={i}><strong>{w.title}, {w.company}</strong> {w.years}</div>
  )),
  education: ({ resume }) => (resume.education ?? []).map((e, i) => (
    <div key={i}><strong>{e.school}</strong> {e.degree} {e.graduated}</div>
  )),
  skills: ({ resume }) => <p>{(resume.skills ?? []).map((s) => s.name).join(', ')}</p>,
  projects: ({ resume }) => (resume.projects ?? []).map((p) => (
    <div key={p.slug}><strong>{p.title}</strong> {p.description}</div>
  )),
};

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'resumeData.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <p>Could not load resume data.</p>;
  if (!data) return null;

  const resume = data.resume ?? {};
  return (
    <main>
      <h1>{data.main.name}</h1>
      <p>{data.main.description}</p>
      {(data.sections ?? Object.keys(SECTIONS)).map((id) => {
        const Section = SECTIONS[id];
        return (
          <section key={id} id={id}>
            <h2>{id}</h2>
            <Section main={data.main} resume={resume} />
          </section>
        );
      })}
    </main>
  );
}
