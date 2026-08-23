import { useState } from "react";

type Row = { sentence: string; answer: "All" | "Some"; why: string };

const ROWS: Row[] = [
  { sentence: "……… squares are rectangles.", answer: "All", why: "A square has four right angles, so it satisfies the definition of a rectangle." },
  { sentence: "……… quadrilaterals are parallelograms.", answer: "Some", why: "A trapezium is a quadrilateral that is not a parallelogram." },
  { sentence: "……… squares are rhombuses.", answer: "All", why: "A square has four equal sides, which is exactly the rhombus condition." },
  { sentence: "……… parallelograms are rectangles.", answer: "Some", why: "Only the parallelograms with a right angle (or equal diagonals) are rectangles." },
  { sentence: "……… rectangles are parallelograms.", answer: "All", why: "The rectangle is defined as a special parallelogram." },
  { sentence: "……… rhombuses are squares.", answer: "Some", why: "Only a rhombus with a right angle (or equal diagonals) is a square." },
];

export function SomeAllGame() {
  const [picks, setPicks] = useState<Record<number, "All" | "Some">>({});
  const answered = Object.keys(picks).length;
  const score = ROWS.reduce((t, r, i) => t + (picks[i] === r.answer ? 1 : 0), 0);

  return (
    <div className="paper p-6">
      <p className="text-sm text-muted-foreground">
        Choose <strong>“All”</strong> or <strong>“Some”</strong> so that each statement becomes true.
      </p>

      <ul className="mt-5 space-y-3">
        {ROWS.map((row, i) => {
          const picked = picks[i];
          const correct = picked === row.answer;
          return (
            <li key={row.sentence} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  {(["All", "Some"] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setPicks((p) => ({ ...p, [i]: w }))}
                      className={`rounded-md border px-3 py-1.5 text-xs font-bold ${
                        picked === w
                          ? correct
                            ? "border-success bg-success/15"
                            : "border-destructive bg-destructive/15"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <span className="math text-base">{row.sentence}</span>
              </div>
              {picked ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {correct ? "Correct. " : `The answer is “${row.answer}”. `}
                  {row.why}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center gap-3">
        <span className="math text-lg font-bold text-primary">
          {score} / {ROWS.length}
        </span>
        <button
          onClick={() => setPicks({})}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
        >
          Clear
        </button>
        {answered === ROWS.length && score === ROWS.length ? (
          <span className="chip bg-success text-success-foreground">All correct</span>
        ) : null}
      </div>
    </div>
  );
}
