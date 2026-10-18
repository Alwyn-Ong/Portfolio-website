// K2 scenes, built as colour grids for <PixelArt>.
import { OUTL, WOOD, GREEN, SKY, CLERK, TREE, icon, grassTile, rng } from './sprites';

function canvas(w, h, fill = null) {
  const g = Array.from({ length: h }, () => Array(w).fill(fill));
  const rect = (x0, y0, x1, y1, c) => {
    for (let y = Math.max(0, y0); y < Math.min(h, y1); y += 1) {
      for (let x = Math.max(0, x0); x < Math.min(w, x1); x += 1) g[y][x] = c;
    }
  };
  const stamp = (spr, ox, oy) => {
    spr.forEach((row, y) => row.forEach((c, x) => {
      if (c != null && oy + y >= 0 && oy + y < h && ox + x >= 0 && ox + x < w) g[oy + y][ox + x] = c;
    }));
  };
  return { g, rect, stamp };
}

// Town: workshop, notice board, town hall, library, post office, with Pip on the road.
export function townScene(seed = 7) {
  const W = 112;
  const H = 64;
  const r = rng(seed);
  const { g, rect, stamp } = canvas(W, H, SKY);
  rect(0, 12, W, 26, '#D3ECF6');
  for (const [cx, cy] of [[18, 6], [70, 4], [96, 9]]) {
    for (let y = cy; y < cy + 4; y += 1) {
      const d = Math.abs(y - cy - 1) * 2;
      rect(cx - 6 + d, y, cx + 7 - d, y + 1, '#FFFFFF');
    }
  }
  for (let x = 0; x < W; x += 1) {
    const top = 21 + Math.trunc(2.5 * Math.abs(((x % 40) - 20) / 20));
    rect(x, top, x + 1, 28, '#9CCB8A');
  }
  const gr = grassTile(seed);
  for (let y = 28; y < H; y += 1) for (let x = 0; x < W; x += 1) g[y][x] = gr[y % 16][x % 16];

  // road
  rect(0, 49, W, 55, '#E9D3A4');
  rect(0, 49, W, 50, '#CDB07C');
  rect(0, 54, W, 55, '#CDB07C');
  for (let x = 0; x < W; x += 6) g[51 + (Math.floor(x / 6) % 2)][x + 2] = '#D8BE8A';
  const base = 46;

  const building = (ox, w, h, roof, ic, wall = '#F2E2C2') => {
    const top = base - h;
    rect(ox, top, ox + w, base, wall);
    for (let y = top + 2; y < base; y += 4) {
      for (let x = ox + 1; x < ox + w - 1; x += 1) if ((x + y) % 6 === 0) g[y][x] = '#E2CDA6';
    }
    for (let y = top; y < base; y += 1) { g[y][ox] = OUTL; g[y][ox + w - 1] = OUTL; }
    rect(ox, base - 1, ox + w, base, OUTL);
    const rh = Math.min(8, Math.floor(w / 2) - 1);
    for (let i = 0; i < rh; i += 1) {
      const y = top - rh + i;
      const x0 = ox - 1 + (rh - 1 - i);
      const x1 = ox + w + 1 - (rh - 1 - i);
      rect(x0, y, x1, y + 1, roof);
      g[y][x0] = OUTL;
      g[y][x1 - 1] = OUTL;
    }
    rect(ox + rh - 1, top - rh, ox + w - rh + 1, top - rh + 1, OUTL);
    rect(ox - 1, top, ox + w + 1, top + 1, OUTL);
    const mid = ox + Math.floor(w / 2);
    rect(mid - 2, base - 7, mid + 2, base - 1, WOOD);
    for (let y = base - 7; y < base - 1; y += 1) { g[y][mid - 3] = OUTL; g[y][mid + 2] = OUTL; }
    rect(mid - 3, base - 8, mid + 3, base - 7, OUTL);
    g[base - 4][mid + 1] = '#F2C230';
    for (const wx of [ox + 2, ox + w - 6]) {
      rect(wx, top + 3, wx + 4, top + 7, OUTL);
      rect(wx + 1, top + 4, wx + 3, top + 6, '#9FD3E8');
    }
    rect(mid - 5, top + 2, mid + 4, top + 11, OUTL);
    rect(mid - 4, top + 3, mid + 3, top + 10, '#FFF6E3');
    stamp(icon(ic), mid - 4, top + 3);
    rect(mid - 2, base, mid + 2, 49, '#E9D3A4');
    return top - rh;
  };

  building(4, 18, 16, '#C77D2E', 'gear');
  // notice board on posts
  rect(27, 33, 39, 42, OUTL);
  rect(28, 34, 38, 41, '#C9A26A');
  for (const [px, py, c] of [[29, 35, '#FFFFFF'], [33, 35, '#FFF6E3'], [30, 38, '#FFFFFF'], [34, 38, '#FCE9A8']]) {
    rect(px, py, px + 3, py + 2, c);
    g[py][px + 1] = '#C8553D';
  }
  for (const px of [29, 36]) rect(px, 42, px + 1, base, OUTL);
  const ht = building(42, 28, 22, '#B5473A', 'star', '#F7EBD3');
  for (const cx of [45, 49, 62, 66]) rect(cx, 36, cx + 1, base - 1, '#E2CDA6');
  rect(55, ht - 7, 56, ht, OUTL);
  rect(56, ht - 7, 60, ht - 4, '#3E8E5A');
  building(74, 17, 18, '#4F74AE', 'book');
  building(94, 15, 16, '#C8553D', 'letter');
  rect(109, 40, 111, 46, '#C8553D');
  rect(109, 40, 111, 41, OUTL);
  for (const [tx, ty] of [[22, 38], [90, 38], [-2, 52], [104, 55]]) stamp(TREE, tx, ty);
  const flowers = ['#F2C230', '#FFFFFF', '#E8798A'];
  for (let i = 0; i < 22; i += 1) {
    const x = r(W);
    const y = 56 + r(H - 56);
    g[y][x] = flowers[r(3)];
  }
  stamp(CLERK, 52, 44);
  return g;
}

// Workbench. Public projects get a laptop; private ones a padlocked crate.
export function benchScene(scene = 'laptop') {
  const W = 80;
  const H = 45;
  const { g, rect } = canvas(W, H);

  // plank wall
  for (let y = 0; y < 30; y += 1) {
    rect(0, y, W, y + 1, Math.floor(y / 6) % 2 ? '#E2C99A' : '#DBC08E');
    if (y % 6 === 5) rect(0, y, W, y + 1, '#C4A472');
  }
  for (let y = 0; y < 30; y += 1) {
    for (let x = 13; x < W; x += 26) g[y][x + (Math.floor(y / 6) % 2) * 7] = '#C4A472';
  }
  // window with sky
  rect(4, 4, 22, 18, OUTL);
  rect(5, 5, 21, 17, SKY);
  rect(5, 13, 21, 17, '#9CCB8A');
  rect(12, 5, 14, 17, OUTL);
  rect(5, 10, 21, 11, OUTL);
  for (const [x, y] of [[7, 7], [8, 7], [9, 6], [16, 7], [17, 7]]) g[y][x] = '#FFFFFF';
  // pegboard with tools
  rect(56, 3, 77, 22, OUTL);
  rect(57, 4, 76, 21, '#C9A26A');
  for (let y = 6; y < 20; y += 3) for (let x = 59; x < 75; x += 3) g[y][x] = '#A88250';
  rect(60, 6, 61, 16, '#5A6672'); // screwdriver
  rect(59, 15, 62, 19, '#C8553D');
  rect(65, 6, 70, 8, '#5A6672'); // hammer
  rect(67, 8, 68, 18, WOOD);
  icon('gear', '#5A6672').forEach((row, y) => row.forEach((c, x) => {
    if (c === '#5A6672') g[11 + y][70 + x] = c;
  }));
  // floor
  rect(0, 30, W, H, '#B88A58');
  for (let y = 31; y < H; y += 4) rect(0, y, W, y + 1, '#A47848');
  // bench
  rect(10, 27, 70, 30, OUTL);
  rect(11, 27, 69, 29, WOOD);
  rect(11, 27, 69, 28, '#A8743F');
  for (const lx of [13, 65]) {
    rect(lx, 30, lx + 3, 42, OUTL);
    rect(lx + 1, 30, lx + 2, 41, WOOD);
  }
  rect(16, 36, 65, 37, OUTL);

  if (scene === 'crate') {
    rect(26, 11, 54, 27, OUTL);
    rect(27, 12, 53, 26, '#C9A26A');
    for (const y of [15, 19, 23]) rect(27, y, 53, y + 1, '#A88250');
    rect(27, 12, 29, 26, '#A88250');
    rect(51, 12, 53, 26, '#A88250');
    rect(36, 14, 44, 16, OUTL); // padlock
    rect(36, 14, 37, 19, OUTL);
    rect(43, 14, 44, 19, OUTL);
    rect(34, 18, 46, 26, OUTL);
    rect(35, 19, 45, 25, '#F2C230');
    rect(39, 20, 41, 23, OUTL);
    rect(14, 22, 22, 27, OUTL); // tag on string
    rect(15, 23, 21, 26, '#FFF6E3');
    rect(22, 23, 27, 24, OUTL);
  } else {
    // laptop showing a calendar grid
    rect(26, 9, 54, 26, OUTL);
    rect(27, 10, 53, 25, '#FFFBF0');
    rect(27, 10, 53, 12, GREEN);
    const lit = ['1,2', '2,4', '3,1'];
    for (let rr = 0; rr < 4; rr += 1) {
      for (let c = 0; c < 6; c += 1) {
        const x = 29 + c * 4;
        const y = 13 + rr * 3;
        rect(x, y, x + 3, y + 2, lit.includes(`${rr},${c}`) ? '#3E8E5A' : '#E6D8B8');
      }
    }
    rect(22, 26, 58, 27, OUTL);
    rect(24, 25, 56, 26, '#8A96A0');
    // mug
    rect(60, 21, 65, 27, OUTL);
    rect(61, 22, 64, 26, '#C8553D');
    rect(65, 23, 67, 25, OUTL);
    g[19][62] = '#FFFFFF';
    g[18][63] = '#FFFFFF';
  }
  // rug + plant
  rect(2, 22, 8, 30, OUTL);
  rect(3, 23, 7, 29, '#C8553D');
  for (const [x, y] of [[3, 18], [4, 17], [5, 19], [6, 16], [7, 18], [4, 20], [6, 20], [5, 21]]) g[y][x] = '#3E7A3A';
  return g;
}
