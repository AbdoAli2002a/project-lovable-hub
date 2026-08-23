import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Small geometry helpers used to draw textbook-style figures in SVG.
 * ------------------------------------------------------------------ */

type Pt = { x: number; y: number };

const S = 2.2; // stroke width

function mid(a: Pt, b: Pt): Pt {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function unit(a: Pt, b: Pt): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

function Poly({ pts }: { pts: Pt[] }) {
  return (
    <polygon
      points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={S}
      strokeLinejoin="round"
    />
  );
}

function Seg({ a, b, dashed = false }: { a: Pt; b: Pt; dashed?: boolean }) {
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke="currentColor"
      strokeWidth={S}
      strokeDasharray={dashed ? "5 5" : undefined}
    />
  );
}

/** Small square marking a right angle at vertex v between rays v→p and v→q. */
function RightAngle({ v, p, q, size = 11 }: { v: Pt; p: Pt; q: Pt; size?: number }) {
  const u1 = unit(v, p);
  const u2 = unit(v, q);
  const a = { x: v.x + u1.x * size, y: v.y + u1.y * size };
  const c = { x: v.x + u2.x * size, y: v.y + u2.y * size };
  const b = { x: v.x + (u1.x + u2.x) * size, y: v.y + (u1.y + u2.y) * size };
  return (
    <polygon
      points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
      fill="var(--mark)"
      fillOpacity={0.5}
      stroke="var(--mark)"
      strokeWidth={1.4}
    />
  );
}

/** Tick marks on a side to show equal lengths. */
function Ticks({ a, b, count = 1 }: { a: Pt; b: Pt; count?: number }) {
  const m = mid(a, b);
  const u = unit(a, b);
  const n = { x: -u.y, y: u.x };
  const items = [];
  for (let i = 0; i < count; i++) {
    const off = (i - (count - 1) / 2) * 5;
    const c = { x: m.x + u.x * off, y: m.y + u.y * off };
    items.push(
      <line
        key={i}
        x1={c.x - n.x * 6}
        y1={c.y - n.y * 6}
        x2={c.x + n.x * 6}
        y2={c.y + n.y * 6}
        stroke="currentColor"
        strokeWidth={S}
      />,
    );
  }
  return <g>{items}</g>;
}

/** Arrow chevrons on a side to show parallel pairs. */
function Arrows({ a, b, count = 1 }: { a: Pt; b: Pt; count?: number }) {
  const m = mid(a, b);
  const u = unit(a, b);
  const n = { x: -u.y, y: u.x };
  const items = [];
  for (let i = 0; i < count; i++) {
    const off = (i - (count - 1) / 2) * 7;
    const c = { x: m.x + u.x * off, y: m.y + u.y * off };
    items.push(
      <polyline
        key={i}
        points={[
          `${c.x - u.x * 4 + n.x * 4},${c.y - u.y * 4 + n.y * 4}`,
          `${c.x + u.x * 3},${c.y + u.y * 3}`,
          `${c.x - u.x * 4 - n.x * 4},${c.y - u.y * 4 - n.y * 4}`,
        ].join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinecap="round"
      />,
    );
  }
  return <g>{items}</g>;
}

function Labels({ pts, names }: { pts: Pt[]; names: string[] }) {
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return (
    <g>
      {pts.map((p, i) => {
        const u = unit({ x: cx, y: cy }, p);
        return (
          <text
            key={names[i]}
            x={p.x + u.x * 15}
            y={p.y + u.y * 15 + 5}
            textAnchor="middle"
            fontSize="14"
            fill="var(--ink)"
            fontFamily="var(--font-sans)"
          >
            {names[i]}
          </text>
        );
      })}
    </g>
  );
}

function Dot({ p, label }: { p: Pt; label?: string }) {
  return (
    <g>
      <circle cx={p.x} cy={p.y} r={2.6} fill="currentColor" />
      {label ? (
        <text
          x={p.x + 10}
          y={p.y - 6}
          fontSize="13"
          fill="var(--ink)"
          fontFamily="var(--font-sans)"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Frame({ children, w = 260, h = 200 }: { children: ReactNode; w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full max-w-[280px]" role="img">
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Named figures
 * ------------------------------------------------------------------ */

const R = {
  A: { x: 45, y: 155 },
  B: { x: 215, y: 155 },
  C: { x: 215, y: 50 },
  D: { x: 45, y: 50 },
};

export function RectangleFigure({
  diagonals = false,
  allRightAngles = false,
  parallelMarks = false,
}: {
  diagonals?: boolean;
  allRightAngles?: boolean;
  parallelMarks?: boolean;
}) {
  const pts = [R.A, R.B, R.C, R.D];
  return (
    <Frame>
      <Poly pts={pts} />
      {parallelMarks ? (
        <>
          <Arrows a={R.A} b={R.B} count={2} />
          <Arrows a={R.D} b={R.C} count={2} />
          <Arrows a={R.A} b={R.D} />
          <Arrows a={R.B} b={R.C} />
        </>
      ) : null}
      {diagonals ? (
        <>
          <Seg a={R.A} b={R.C} />
          <Seg a={R.B} b={R.D} />
          <Dot p={mid(R.A, R.C)} label="M" />
        </>
      ) : null}
      <RightAngle v={R.A} p={R.B} q={R.D} />
      {allRightAngles ? (
        <>
          <RightAngle v={R.B} p={R.A} q={R.C} />
          <RightAngle v={R.C} p={R.B} q={R.D} />
          <RightAngle v={R.D} p={R.C} q={R.A} />
        </>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

const H = {
  A: { x: 45, y: 150 },
  B: { x: 165, y: 150 },
  C: { x: 215, y: 55 },
  D: { x: 95, y: 55 },
};

export function RhombusFigure({
  diagonals = false,
  ticks = false,
  adjacentOnly = false,
  angleMarks = false,
}: {
  diagonals?: boolean;
  ticks?: boolean;
  adjacentOnly?: boolean;
  angleMarks?: boolean;
}) {
  const pts = [H.A, H.B, H.C, H.D];
  return (
    <Frame>
      <Poly pts={pts} />
      {ticks ? (
        <>
          <Ticks a={H.A} b={H.B} />
          <Ticks a={H.B} b={H.C} />
          {!adjacentOnly ? (
            <>
              <Ticks a={H.C} b={H.D} />
              <Ticks a={H.D} b={H.A} />
            </>
          ) : null}
        </>
      ) : null}
      {diagonals ? (
        <>
          <Seg a={H.A} b={H.C} />
          <Seg a={H.B} b={H.D} />
          <RightAngle v={mid(H.A, H.C)} p={H.C} q={H.D} size={9} />
          <Dot p={mid(H.A, H.C)} label="M" />
        </>
      ) : null}
      {angleMarks ? (
        <g fill="none" stroke="var(--mark)" strokeWidth={1.6}>
          <path d="M 63 150 A 18 18 0 0 0 57 138" />
          <path d="M 70 150 A 25 25 0 0 0 62 134" />
        </g>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

const Q = {
  A: { x: 70, y: 165 },
  B: { x: 195, y: 165 },
  C: { x: 195, y: 40 },
  D: { x: 70, y: 40 },
};

export function SquareFigure({
  diagonals = false,
  ticks = true,
  allRightAngles = false,
}: {
  diagonals?: boolean;
  ticks?: boolean;
  allRightAngles?: boolean;
}) {
  const pts = [Q.A, Q.B, Q.C, Q.D];
  return (
    <Frame>
      <Poly pts={pts} />
      {ticks ? (
        <>
          <Ticks a={Q.A} b={Q.B} />
          <Ticks a={Q.B} b={Q.C} />
          <Ticks a={Q.C} b={Q.D} />
          <Ticks a={Q.D} b={Q.A} />
        </>
      ) : null}
      {diagonals ? (
        <>
          <Seg a={Q.A} b={Q.C} />
          <Seg a={Q.B} b={Q.D} />
          <RightAngle v={mid(Q.A, Q.C)} p={Q.C} q={Q.D} size={9} />
          <Dot p={mid(Q.A, Q.C)} label="M" />
        </>
      ) : null}
      <RightAngle v={Q.A} p={Q.B} q={Q.D} />
      {allRightAngles ? (
        <>
          <RightAngle v={Q.B} p={Q.A} q={Q.C} />
          <RightAngle v={Q.C} p={Q.B} q={Q.D} />
          <RightAngle v={Q.D} p={Q.C} q={Q.A} />
        </>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

const P = {
  A: { x: 40, y: 150 },
  B: { x: 170, y: 150 },
  C: { x: 220, y: 55 },
  D: { x: 90, y: 55 },
};

export function ParallelogramFigure({
  diagonals = false,
  annotation,
}: {
  diagonals?: boolean;
  annotation?: string;
}) {
  const pts = [P.A, P.B, P.C, P.D];
  return (
    <Frame>
      <Poly pts={pts} />
      <Arrows a={P.A} b={P.B} />
      <Arrows a={P.D} b={P.C} />
      <Arrows a={P.A} b={P.D} count={2} />
      <Arrows a={P.B} b={P.C} count={2} />
      {diagonals ? (
        <>
          <Seg a={P.A} b={P.C} />
          <Seg a={P.B} b={P.D} />
          <Dot p={mid(P.A, P.C)} label="M" />
        </>
      ) : null}
      {annotation ? (
        <text
          x={130}
          y={190}
          textAnchor="middle"
          fontSize="13"
          fill="var(--ink)"
          fontFamily="var(--font-math)"
        >
          {annotation}
        </text>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

/** Rectangle carrying an algebraic label, used in worked examples. */
export function RectangleWithExpression({
  angleLabel,
  diagonalLabels,
}: {
  angleLabel?: string;
  diagonalLabels?: [string, string];
}) {
  const pts = [R.A, R.B, R.C, R.D];
  return (
    <Frame>
      <Poly pts={pts} />
      {angleLabel ? (
        <>
          <path
            d="M 68 155 A 23 23 0 0 0 45 132"
            fill="none"
            stroke="var(--mark)"
            strokeWidth={1.6}
          />
          <text
            x={78}
            y={139}
            fontSize="13"
            fill="var(--ink)"
            fontFamily="var(--font-math)"
          >
            {angleLabel}
          </text>
        </>
      ) : null}
      {diagonalLabels ? (
        <>
          <Seg a={R.A} b={R.C} />
          <Seg a={R.B} b={R.D} />
          <Dot p={mid(R.A, R.C)} label="M" />
          <text x={52} y={108} fontSize="12" fill="var(--ink)" fontFamily="var(--font-math)">
            {diagonalLabels[0]}
          </text>
          <text x={158} y={108} fontSize="12" fill="var(--ink)" fontFamily="var(--font-math)">
            {diagonalLabels[1]}
          </text>
        </>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

/** Rhombus carrying algebraic side labels, used in worked examples. */
export function RhombusWithExpression({
  sideAD,
  sideDC,
  angleAtM,
}: {
  sideAD?: string;
  sideDC?: string;
  angleAtM?: string;
}) {
  const pts = [H.A, H.B, H.C, H.D];
  return (
    <Frame>
      <Poly pts={pts} />
      <Seg a={H.A} b={H.C} />
      <Seg a={H.B} b={H.D} />
      <Dot p={mid(H.A, H.C)} label="M" />
      {sideAD ? (
        <text x={22} y={105} fontSize="12" fill="var(--ink)" fontFamily="var(--font-math)">
          {sideAD}
        </text>
      ) : null}
      {sideDC ? (
        <text x={130} y={45} fontSize="12" fill="var(--ink)" fontFamily="var(--font-math)">
          {sideDC}
        </text>
      ) : null}
      {angleAtM ? (
        <text x={140} y={120} fontSize="12" fill="var(--ink)" fontFamily="var(--font-math)">
          {angleAtM}
        </text>
      ) : null}
      <Labels pts={pts} names={["A", "B", "C", "D"]} />
    </Frame>
  );
}

/** The lesson map shown on the lesson cover page. */
export function LessonMap() {
  const nodes = ["Rectangle", "Rhombus", "Square", "Conditions"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="chip bg-accent text-accent-foreground">Lesson map</span>
      {nodes.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          <span className="text-muted-foreground">→</span>
          <span className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium">
            {n}
          </span>
          {i === nodes.length - 1 ? null : null}
        </span>
      ))}
    </div>
  );
}

/** Square with a drawn segment DE ∥ AC (Example 3). */
export function SquareWithParallelSegment() {
  const A = { x: 215, y: 145 };
  const B = { x: 215, y: 145 };
  void B;
  const D = { x: 130, y: 50 };
  const Aa = { x: 215, y: 50 };
  const Bb = { x: 215, y: 145 };
  const C = { x: 130, y: 145 };
  const E = { x: 45, y: 145 };
  void A;
  return (
    <Frame>
      <Poly pts={[C, Bb, Aa, D]} />
      <Seg a={E} b={D} />
      <Seg a={E} b={C} />
      <Seg a={Aa} b={C} />
      <Arrows a={E} b={D} />
      <Arrows a={C} b={Aa} />
      <text x={Aa.x + 12} y={Aa.y - 6} fontSize="14" fill="var(--ink)">
        A
      </text>
      <text x={Bb.x + 12} y={Bb.y + 14} fontSize="14" fill="var(--ink)">
        B
      </text>
      <text x={C.x - 4} y={C.y + 18} fontSize="14" fill="var(--ink)">
        C
      </text>
      <text x={D.x - 6} y={D.y - 8} fontSize="14" fill="var(--ink)">
        D
      </text>
      <text x={E.x - 14} y={E.y + 14} fontSize="14" fill="var(--ink)">
        E
      </text>
    </Frame>
  );
}
