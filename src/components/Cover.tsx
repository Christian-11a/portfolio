import { extrude, toPath, type Pt } from "@/lib/extrude";
import { container } from "@/lib/ui";

// Block letters in grid units (v points down). E is shifted right by OFFSET_E.
const C: Pt[] = [[0, 0], [4, 0], [4, 1.5], [1.5, 1.5], [1.5, 3.5], [4, 3.5], [4, 5], [0, 5]];
const E: Pt[] = [
  [0, 0], [4, 0], [4, 1.3], [1.5, 1.3], [1.5, 1.85], [3.3, 1.85], [3.3, 3.15],
  [1.5, 3.15], [1.5, 3.7], [4, 3.7], [4, 5], [0, 5],
];
const OFFSET_E = 5;

const UNIT = 26; // px per grid unit
const DEPTH = 34; // extrusion length in px
const ANGLE = 30; // receding angle in degrees
const depth: Pt = [DEPTH * Math.cos((ANGLE * Math.PI) / 180), -DEPTH * Math.sin((ANGLE * Math.PI) / 180)];

const WIDTH = (OFFSET_E + 4) * UNIT; // 234
const HEIGHT = 5 * UNIT; // 130

// Where the drawing sits inside the viewBox.
const VIEW_W = 440;
const VIEW_H = 205;
const OX = (VIEW_W - WIDTH - depth[0]) / 2;
const OY = (VIEW_H - HEIGHT + depth[1]) / 2 + 4;

const letters = [C, E.map(([u, v]): Pt => [u + OFFSET_E, v])].map((p) => extrude(p, UNIT, depth));

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  const w = children.length * 6 + 8;
  return (
    <g className="cover-note">
      <rect x={x - w / 2} y={y - 7} width={w} height={14} rx={3} fill="var(--bg)" />
      <text x={x} y={y + 3} textAnchor="middle" className="fill-muted font-mono text-[9px]">
        {children}
      </text>
    </g>
  );
}

/** Blueprint-style 3D line drawing of the CE monogram. Lines draw themselves in on load. */
export function Cover() {
  // Corner of the E's top-right edge, used for the angle annotation.
  const cx = OX + WIDTH;
  const cy = OY;
  const arcR = 30;
  const arcEnd: Pt = [cx + arcR * Math.cos((ANGLE * Math.PI) / 180), cy - arcR * Math.sin((ANGLE * Math.PI) / 180)];

  return (
    <div className={container}>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-bg">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="CE monogram drawn as a 3D line drawing"
          className="block h-48 w-full sm:h-64"
        >
          <defs>
            <pattern id="cover-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5" stroke="var(--line-strong)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Hidden back edges, dashed like a technical drawing. */}
          <g className="cover-note" fill="none" stroke="var(--line-strong)" strokeDasharray="3 3" strokeWidth="0.75">
            {letters.map((l, i) => (
              <path key={i} d={toPath(l.back, OX, OY)} />
            ))}
          </g>

          {/* Visible side faces: hatched. */}
          <g stroke="var(--muted)" strokeWidth="0.75" strokeLinejoin="round">
            {letters.flatMap((l, i) =>
              l.sides.map((s, j) => (
                <path
                  key={`${i}-${j}`}
                  d={toPath(s, OX, OY)}
                  pathLength={1}
                  fill="url(#cover-hatch)"
                  className="cover-draw"
                  style={{ animationDelay: `${0.25 + j * 0.05}s, ${1.1 + j * 0.05}s` }}
                />
              )),
            )}
          </g>

          {/* Front faces: solid, drawn last so they hide what is behind them. */}
          <g stroke="var(--fg)" strokeWidth="1" strokeLinejoin="round">
            {letters.map((l, i) => (
              <path
                key={i}
                d={toPath(l.front, OX, OY)}
                pathLength={1}
                fill="var(--bg)"
                className="cover-draw"
                style={{ animationDelay: `${i * 0.15}s, ${0.9 + i * 0.15}s` }}
              />
            ))}
          </g>

          {/* Annotations: width, height, depth angle. */}
          <g className="cover-note" stroke="var(--muted)" strokeWidth="0.6" fill="none">
            <path d={`M${OX} ${OY + HEIGHT + 14}V${OY + HEIGHT + 26}M${OX + WIDTH} ${OY + HEIGHT + 14}V${OY + HEIGHT + 26}M${OX} ${OY + HEIGHT + 20}H${OX + WIDTH}`} />
            <path d={`M${OX - 14} ${OY}H${OX - 26}M${OX - 14} ${OY + HEIGHT}H${OX - 26}M${OX - 20} ${OY}V${OY + HEIGHT}`} />
            <path d={`M${cx} ${cy}H${cx + 48}`} strokeDasharray="2 2" />
            <path d={`M${cx + arcR} ${cy}A${arcR} ${arcR} 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`} />
          </g>
          <Label x={OX + WIDTH / 2} y={OY + HEIGHT + 20}>{String(WIDTH)}</Label>
          <Label x={OX - 20} y={OY + HEIGHT / 2}>{String(HEIGHT)}</Label>
          <Label x={cx + arcR + 16} y={cy - 9}>{`${ANGLE}°`}</Label>
          {/* Depth label sits on the C's top-left receding edge, clear of the angle note. */}
          <Label x={OX + depth[0] / 2 - 18} y={OY + depth[1] / 2 - 4}>{`d ${DEPTH}`}</Label>
        </svg>
      </div>
    </div>
  );
}
