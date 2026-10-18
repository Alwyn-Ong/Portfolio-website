import { ICONS, icon, GREEN } from './pixel/sprites';

export const asset = (file) => import.meta.env.BASE_URL + 'images/' + file;

// A project is private when it has no public repo or link, unless `private` says otherwise.
export const isPrivate = (p) => p.private ?? (!p.github && !p.link);

export const isCurrent = (years) => /present/i.test(years ?? '');

// Town place for each home section. Order on the page comes from `sections` in the data.
export const PLACES = {
  about: { place: 'Town hall', label: 'About', icon: ICONS.star },
  work: { place: 'Notice board', label: 'Experience', icon: ICONS.board },
  projects: { place: 'Workshop', label: 'Projects', icon: ICONS.gear },
  skills: { place: 'Library', label: 'Skills', icon: ICONS.book },
  education: { place: 'Schoolhouse', label: 'Education', icon: icon('book', GREEN) },
  contact: { place: 'Post office', label: 'Contact', icon: ICONS.letter },
};

const SOCIAL_LABELS = { linkedin: 'LinkedIn', github: 'GitHub', email: 'Email', website: 'Website' };
export const socialLabel = (s) => SOCIAL_LABELS[s.name?.toLowerCase()] ?? s.name;
