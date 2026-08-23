import { useMemo, useState } from "react";

type Shape = "Rectangle" | "Rhombus" | "Square";

type Item = { text: string; shapes: Shape[] };

/** A property may belong to more than one shape; the learner must pick the
 *  smallest family it is guaranteed in — the answer key stores every shape
 *  where the property is always true. */
const ITEMS: Item[] = [
  { text: "All angles measure 90°", shapes: ["Rectangle", "Square"] },
  { text: "All four sides are equal in length", shapes: ["Rhombus", "Square"] },
  { text: "The diagonals are equal in length", shapes: ["Rectangle", "Square"] },
  { text: "The diagonals are perpendicular", shapes: ["Rhombus", "Square"] },
  { text: "Each diagonal bisects two interior angles", shapes: ["Rhombus", "Square"] },
  { text: "The diagonals are equal AND perpendicular", shapes: ["Square"] },
  { text: "Opposite sides are parallel and equal", shapes: ["Rectangle", "Rhombus", "Square"] },
  { text: "The diagonals bisect each other", shapes: ["Rectangle", "Rhombus", "Square"] },
];

const SHAPES: Shape[] = ["Rectangle", "Rhombus", "Square"];

export function PropertySortGame() {
  const [answers, setAnswers] = useState<Record<number, Shape[]>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    return ITEMS.reduce((total, item, idx) => {
      const picked = [...(answers[idx] ?? [])].sort();
      const key = [...item.shapes].sort();
      return total + (JSON.stringify(picked) === JSON.stringify(key) ? 1 : 0);
    }, 0);
  }, [answers]);

  function toggle(idx: number, shape: Shape) {
    if (checked) return;
    setAnswers((prev) => {
      const cur = prev[idx] ?? [];
      return {
        ...prev,
        [idx]: cur.includes(shape) ? cur.filter((s) => s !== shape) : [...cur, shape],
      };
    });
  }

  return (
    <div className="paper p-6">
      <p className="text-sm text-muted-foreground">
        Tick every shape in which the property is <em>always</em> true. A property can belong to two
        or three shapes.
      </p>

      <div className="mt-5 space-y-3">
        {ITEMS.map((item, idx) => {
          const picked = answers[idx] ?? [];
          const correct =
            JSON.stringify([...picked].sort()) === JSON.stringify([...item.shapes].sort());
          return (
            <div
              key={item.text}
              className={`rounded-lg border p-4 ${
                checked
                  ? correct
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border"
              }`}
            >
              <p className="text-sm font-semibold">{item.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(idx, s)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      picked.includes(s)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {checked && !correct ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Correct answer: {item.shapes.join(", ")}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {checked ? (
          <>
            <span className="math text-lg font-bold text-primary">
              {score} / {ITEMS.length}
            </span>
            <button
              onClick={() => {
                setChecked(false);
                setAnswers({});
              }}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
            >
              Reset
            </button>
          </>
        ) : (
          <button
            onClick={() => setChecked(true)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Check my answers
          </button>
        )}
      </div>
    </div>
  );
}
