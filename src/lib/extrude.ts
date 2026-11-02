export type Pt = [number, number];

/**
 * Oblique extrusion of a flat polygon for a line drawing.
 * Points are in letter units with v pointing down (screen convention).
 * `scale` converts units to pixels; `depth` is the screen offset of the back face.
 * Only side faces whose outward normal points along the depth direction are kept,
 * which are exactly the ones a viewer can see.
 */
export function extrude(poly: Pt[], scale: number, depth: Pt) {
  const front = poly.map(([u, v]): Pt => [u * scale, v * scale]);
  const back = front.map(([x, y]): Pt => [x + depth[0], y + depth[1]]);

  // Signed area tells us the winding, so normals can point outward.
  let area = 0;
  for (let i = 0; i < front.length; i++) {
    const [x1, y1] = front[i];
    const [x2, y2] = front[(i + 1) % front.length];
    area += x1 * y2 - x2 * y1;
  }
  const sign = area > 0 ? 1 : -1;

  const sides: Pt[][] = [];
  for (let i = 0; i < front.length; i++) {
    const j = (i + 1) % front.length;
    const ex = front[j][0] - front[i][0];
    const ey = front[j][1] - front[i][1];
    const normal: Pt = [sign * ey, sign * -ex];
    if (normal[0] * depth[0] + normal[1] * depth[1] > 0) {
      sides.push([front[i], front[j], back[j], back[i]]);
    }
  }

  return { front, back, sides };
}

/** SVG path data for a closed polygon. */
export function toPath(points: Pt[], dx = 0, dy = 0): string {
  return `M${points.map(([x, y]) => `${+(x + dx).toFixed(2)} ${+(y + dy).toFixed(2)}`).join("L")}Z`;
}
