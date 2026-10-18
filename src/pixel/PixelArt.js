import React, { memo } from 'react';

// Grid (rows of colours, null = transparent) → crisp SVG.
// Horizontal runs of one colour merge into a single <rect>.
export function gridRects(grid) {
  const rects = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (c == null) { x += 1; continue; }
      let x2 = x;
      while (x2 + 1 < row.length && row[x2 + 1] === c) x2 += 1;
      rects.push([x, y, x2 - x + 1, c]);
      x = x2 + 1;
    }
  });
  return rects;
}

function PixelArt({ grid, scale = 1, width, height, title, className, style }) {
  const gh = grid.length;
  const gw = grid[0].length;
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <svg
      width={width ?? gw * scale}
      height={height ?? gh * scale}
      viewBox={`0 0 ${gw} ${gh}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      {...label}
    >
      {gridRects(grid).map(([x, y, w, c]) => (
        <rect key={`${x},${y}`} x={x} y={y} width={w} height={1} fill={c} />
      ))}
    </svg>
  );
}

export default memo(PixelArt);

// Same grid as a CSS background-image value (for tiled backgrounds).
export function gridToCssUrl(grid) {
  const gh = grid.length;
  const gw = grid[0].length;
  const body = gridRects(grid)
    .map(([x, y, w, c]) => `<rect x='${x}' y='${y}' width='${w}' height='1' fill='${c}'/>`)
    .join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${gw} ${gh}' shape-rendering='crispEdges'>${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
