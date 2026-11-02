import { describe, expect, it } from "vitest";
import { extrude, type Pt } from "@/lib/extrude";

// A unit square in letter space (v points down, like the screen).
const square: Pt[] = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
];
const depth: Pt = [10, -6]; // up and to the right on screen

describe("extrude", () => {
  it("offsets the back face by the depth vector", () => {
    const { front, back } = extrude(square, 10, depth);
    expect(front[1]).toEqual([10, 0]);
    expect(back[1]).toEqual([20, -6]);
  });

  it("keeps only the side faces that face the viewer (top and right)", () => {
    const { sides } = extrude(square, 10, depth);
    expect(sides).toHaveLength(2);
    // Top edge (0,0)->(1,0) and right edge (1,0)->(1,1), in screen units.
    expect(sides[0]).toEqual([
      [0, 0],
      [10, 0],
      [20, -6],
      [10, -6],
    ]);
    expect(sides[1][0]).toEqual([10, 0]);
    expect(sides[1][1]).toEqual([10, 10]);
  });

  it("works the same for either winding order", () => {
    const reversed = [...square].reverse();
    expect(extrude(reversed, 10, depth).sides).toHaveLength(2);
  });

  it("shows the inner top faces of a C-shaped notch", () => {
    // C: the bottom arm's upper edge faces up into the notch, so it is visible.
    const c: Pt[] = [
      [0, 0],
      [4, 0],
      [4, 1.5],
      [1.5, 1.5],
      [1.5, 3.5],
      [4, 3.5],
      [4, 5],
      [0, 5],
    ];
    const { sides } = extrude(c, 1, depth);
    const flat = (q: Pt[]) => q[0][1] === q[1][1];
    // Visible: outer top, top arm's right end, notch inner wall, bottom arm's top, bottom arm's right end.
    expect(sides.filter(flat)).toHaveLength(2);
    expect(sides).toHaveLength(5);
  });
});
