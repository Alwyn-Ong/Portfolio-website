// K2 sprite data. Each sprite is rows of characters mapped to colours by a palette;
// '.' or any character missing from the palette is transparent.

export const OUTL = '#2B1E16';
export const BROWN = '#3B2A20';
export const WOOD = '#8A5A32';
export const GREEN = '#2D6A4F';
export const SKY = '#BFE3F2';
export const GRASS = '#8CC56A';

export function sprite(rows, pal) {
  return rows.map((r) => [...r].map((ch) => pal[ch] ?? null));
}

// Small deterministic PRNG so scenes look the same on every load.
export function rng(seed) {
  let s = seed >>> 0;
  return (n) => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * n);
  };
}

export const CLERK = sprite([
  '....kkkk....',
  '...kHHHHk...',
  '..kHHHHHHk..',
  '.kBBBBBBBBk.',
  '..kssssssk..',
  '..ksessesk..',
  '..kssrrssk..',
  '...kssssk...',
  '..kvvwwvvk..',
  '.kvvvwwvvvk.',
  '.svvppppvvs.',
  '.kvvppppvvk.',
  '..kvvvvvvk..',
  '..kddkkddk..',
  '..kook.kook.',
  '..kkkk.kkkk.',
], {
  k: OUTL, H: '#2E6E8E', B: '#1F4E66', s: '#E8B48A', e: OUTL, r: '#D9826A',
  v: '#3E8E5A', w: '#FFF6E3', p: '#C9A26A', d: '#4A5A7A', o: '#5A3A22',
});

const ICON_ROWS = {
  star: ['...y...', '..yyy..', 'yyyyyyy', '.yyyyy.', '..yyy..', '.yy.yy.', 'y.....y'],
  board: ['yyyyyyy', 'ywwwwwy', 'ywyyywy', 'ywwwwwy', 'ywyywwy', 'ywwwwwy', 'yyyyyyy'],
  gear: ['..y.y..', '.yyyyy.', 'yyy.yyy', '.y...y.', 'yyy.yyy', '.yyyyy.', '..y.y..'],
  book: ['.yyyyy.', 'ywwywwy', 'ywwywwy', 'ywwywwy', 'ywwywwy', 'yyyyyyy', '...y...'],
  letter: ['yyyyyyy', 'yyw.wyy', 'ywyywyy', 'ywwyyww', 'ywwwwwy', 'yyyyyyy', '.......'],
};

export const ICON_COLOURS = {
  star: '#C98A00', board: WOOD, gear: '#5A6672', book: '#2E5E8A', letter: '#C8553D',
};

export function icon(name, colour = ICON_COLOURS[name]) {
  return sprite(ICON_ROWS[name], { y: colour, w: '#FFFFFF' });
}

export const ICONS = Object.fromEntries(Object.keys(ICON_ROWS).map((k) => [k, icon(k)]));

export const TREE = sprite([
  '..ggg..',
  '.gGGGg.',
  'gGGgGGg',
  'gGGGGGg',
  '.gGGGg.',
  '..gtg..',
  '...t...',
  '...t...',
], { g: '#3E7A3A', G: '#5DA14E', t: '#6A4222' });

export const LOGO = sprite([
  '....kk....',
  '...kRRk...',
  '..kRRRRk..',
  '.kRRRRRRk.',
  'kkkkkkkkkk',
  '.kwwwwwwk.',
  '.kwbwwdwk.',
  '.kwwwwdwk.',
  '.kwwwwdwk.',
  '.kkkkkkkk.',
], { k: BROWN, R: '#B5473A', w: '#FFF6E3', b: '#9FD3E8', d: WOOD });

// 16×16 grass tile: blades and specks scattered on GRASS.
export function grassTile(seed = 4) {
  const r = rng(seed);
  const g = Array.from({ length: 16 }, () => Array(16).fill(GRASS));
  for (let i = 0; i < 14; i += 1) {
    const x = r(16);
    const y = r(15);
    g[y][x] = '#6FAE53';
    g[y + 1][x] = '#6FAE53';
  }
  for (let i = 0; i < 6; i += 1) g[r(16)][r(16)] = '#A6D67E';
  return g;
}
