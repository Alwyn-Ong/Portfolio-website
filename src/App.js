import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Street } from './components/ui';
import { PLACES } from './data';

const DEFAULT_SECTIONS = ['about', 'work', 'projects', 'skills', 'education'];

const SECTIONS = {
  work: ({ resume }) => <Work work={resume.work} />,
  projects: ({ resume }) => <Projects projects={resume.projects} />,
  skills: ({ resume }) => <Skills skills={resume.skills} />,
  education: ({ resume }) => <Education education={resume.education} />,
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

  const { main } = data;
  const resume = data.resume ?? {};
  const hasData = (id) => id === 'about' || resume[id]?.length > 0;
  const sections = (data.sections ?? DEFAULT_SECTIONS).filter(hasData);
  const ids = main.social?.length ? [...sections, 'contact'] : sections;

  return (
    <div id="top">
      <Header main={main} ids={ids} />
      <main>
        {sections.map((id) => {
          if (id === 'about') return <Hero key={id} main={main} ids={ids} />;
          const Section = SECTIONS[id];
          return (
            <React.Fragment key={id}>
              <Street place={PLACES[id]} />
              <Section resume={resume} />
            </React.Fragment>
          );
        })}
        {main.social?.length > 0 && (
          <>
            <Street place={PLACES.contact} />
            <Contact social={main.social} />
          </>
        )}
      </main>
      <Footer main={main} />
    </div>
  );
}
