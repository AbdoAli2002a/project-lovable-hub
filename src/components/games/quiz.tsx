import { useState } from "react";

type Q = { q: string; options: string[]; answer: number; why: string };

const QUESTIONS: Q[] = [
  {
    q: "A parallelogram in which one angle is a right angle is called…",
    options: ["a rhombus", "a rectangle", "a trapezium", "a kite"],
    answer: 1,
    why: "Definition: the rectangle is a parallelogram that has one right angle. The other three angles then become right angles too.",
  },
  {
    q: "Which statement is true for every rectangle?",
    options: [
      "The diagonals are perpendicular",
      "All four sides are equal",
      "The diagonals are equal in length",
      "The diagonals bisect the angles",
    ],
    answer: 2,
    why: "In a rectangle AC = BD. Perpendicular diagonals and bisected angles belong to the rhombus.",
  },
  {
    q: "A parallelogram in which two adjacent sides are equal in length is…",
    options: ["a rectangle", "a rhombus", "a square", "a trapezium"],
    answer: 1,
    why: "Definition of the rhombus. Because opposite sides are already equal, all four sides become equal: AB = BC = CD = DA.",
  },
  {
    q: "In a rhombus ABCD with diagonals meeting at M, m(∠AMB) equals…",
    options: ["45°", "60°", "90°", "180°"],
    answer: 2,
    why: "The diagonals of a rhombus are perpendicular, so AC ⊥ BD and each angle at M is 90°.",
  },
  {
    q: "Which property does a rhombus have that a rectangle does NOT have in general?",
    options: [
      "Opposite sides are parallel",
      "The diagonals bisect each other",
      "The diagonals bisect the interior angles",
      "Opposite angles are equal",
    ],
    answer: 2,
    why: "Only in a rhombus (and therefore a square) does each diagonal bisect the interior angles it passes through.",
  },
  {
    q: "The square has all the properties of…",
    options: [
      "the parallelogram only",
      "the rectangle only",
      "the rhombus only",
      "the parallelogram, the rectangle and the rhombus",
    ],
    answer: 3,
    why: "A square is a parallelogram with 4 right angles (like a rectangle) and 4 equal sides (like a rhombus).",
  },
  {
    q: "A parallelogram becomes a rhombus if…",
    options: [
      "its diagonals are equal in length",
      "its diagonals are perpendicular",
      "one of its angles is a right angle",
      "its diagonals bisect each other",
    ],
    answer: 1,
    why: "Conditions for a rhombus: two adjacent sides equal in length, OR the diagonals are perpendicular.",
  },
  {
    q: "A rectangle becomes a square if…",
    options: [
      "its diagonals are equal",
      "its diagonals bisect each other",
      "two adjacent sides are equal in length",
      "opposite angles are equal",
    ],
    answer: 2,
    why: "A rectangle becomes a square if two adjacent sides are equal in length, or if its diagonals are perpendicular.",
  },
  {
    q: "In a square ABCD, m(∠ACD) equals…",
    options: ["30°", "45°", "60°", "90°"],
    answer: 1,
    why: "Each diagonal of a square bisects the right angles, so it makes 45° with the sides.",
  },
  {
    q: "Complete correctly: ……… rhombuses are squares.",
    options: ["All", "Some", "No", "Exactly two"],
    answer: 1,
    why: "Only the rhombuses that have a right angle (or equal diagonals) are squares, so the correct word is “Some”.",
  },
];

export function QuizGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = QUESTIONS[i]!;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === current.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  }

  function restart() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="paper p-6 text-center">
        <h3 className="text-lg font-bold">Quiz complete</h3>
        <p className="math mt-2 text-4xl font-bold text-primary">
          {score} / {QUESTIONS.length}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {score === QUESTIONS.length
            ? "Perfect — every property and condition mastered."
            : score >= 7
              ? "Strong work. Review the conditions page and try again."
              : "Re-read the three definitions, then play again."}
        </p>
        <button
          onClick={restart}
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="paper p-6">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>
          Question {i + 1} of {QUESTIONS.length}
        </span>
        <span>Score {score}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(i / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <p className="mt-5 text-base font-semibold leading-relaxed">{current.q}</p>

      <div className="mt-4 grid gap-2">
        {current.options.map((opt, idx) => {
          const isAnswer = idx === current.answer;
          const isPicked = picked === idx;
          const state =
            picked === null
              ? "border-border hover:border-primary hover:bg-muted"
              : isAnswer
                ? "border-success bg-success/10"
                : isPicked
                  ? "border-destructive bg-destructive/10"
                  : "border-border opacity-60";
          return (
            <button
              key={opt}
              onClick={() => choose(idx)}
              disabled={picked !== null}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null ? (
        <div className="mt-4 rounded-lg bg-muted p-4 text-sm leading-relaxed">
          <strong className="font-display">
            {picked === current.answer ? "Correct. " : "Not quite. "}
          </strong>
          {current.why}
          <div className="mt-3">
            <button
              onClick={next}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
            >
              {i + 1 === QUESTIONS.length ? "See result" : "Next question"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
