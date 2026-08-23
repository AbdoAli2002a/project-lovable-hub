import { useEffect, useMemo, useState } from "react";

type Problem = { prompt: string; hint: string; answer: number };

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeProblem(): Problem {
  const kind = randInt(1, 4);

  if (kind === 1) {
    // Rectangle angle: (a x - b)° = 90
    const x = randInt(5, 30);
    const a = randInt(2, 6);
    const b = a * x - 90;
    const sign = b >= 0 ? "−" : "+";
    return {
      prompt: `ABCD is a rectangle and m(∠A) = (${a}x ${sign} ${Math.abs(b)})°. Find x.`,
      hint: "Every angle of a rectangle is 90°, so set the expression equal to 90.",
      answer: x,
    };
  }

  if (kind === 2) {
    // Rectangle diagonals: AM = MB  ->  a x + b = c x + d
    const x = randInt(2, 12);
    const a = randInt(3, 7);
    const c = randInt(1, a - 1);
    const d = randInt(1, 15);
    const b = c * x + d - a * x;
    const sign = b >= 0 ? "+" : "−";
    return {
      prompt: `ABCD is a rectangle whose diagonals meet at M, AM = (${a}x ${sign} ${Math.abs(b)}) cm and MB = (${c}x + ${d}) cm. Find x.`,
      hint: "In a rectangle the diagonals are equal and bisect each other, so AM = MB.",
      answer: x,
    };
  }

  if (kind === 3) {
    // Rhombus: angle at M = 90  ->  (a x + b) = 90
    const x = randInt(5, 25);
    const a = randInt(2, 5);
    const b = 90 - a * x;
    const sign = b >= 0 ? "+" : "−";
    return {
      prompt: `The parallelogram ABCD becomes a rhombus when m(∠AMB) = (${a}x ${sign} ${Math.abs(b)})°, where M is the intersection of the diagonals. Find x.`,
      hint: "The diagonals of a rhombus are perpendicular: m(∠AMB) = 90°.",
      answer: x,
    };
  }

  // kind 4 — parallelogram becomes a rectangle: (2x - p) + (x - q) = 90
  const x = randInt(10, 40);
  const p = randInt(1, 20);
  const q = 3 * x - 90 - p;
  const sign = q >= 0 ? "−" : "+";
  return {
    prompt: `In the parallelogram ABCD, m(∠DAC) = (2x − ${p})° and m(∠CAB) = (x ${sign} ${Math.abs(q)})°. Find the value of x that makes ABCD a rectangle.`,
    hint: "The parallelogram becomes a rectangle when m(∠DAB) = 90°, so add the two parts and set the sum to 90.",
    answer: x,
  };
}

export function SolveForXGame() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"none" | "right" | "wrong">("none");
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setProblem(makeProblem());
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const label = useMemo(
    () => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
    [seconds],
  );

  function check() {
    if (!problem) return;
    setRunning(true);
    const guess = Number(value.replace(",", "."));
    if (!Number.isFinite(guess)) return;
    if (Math.abs(guess - problem.answer) < 1e-9) {
      setFeedback("right");
      setStreak((s) => {
        const n = s + 1;
        setBest((b) => Math.max(b, n));
        return n;
      });
    } else {
      setFeedback("wrong");
      setStreak(0);
    }
  }

  function nextProblem() {
    setProblem(makeProblem());
    setValue("");
    setFeedback("none");
    setShowHint(false);
    setRunning(true);
  }

  return (
    <div className="paper p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>Endless practice · new problem every round</span>
        <span className="math">
          streak {streak} · best {best} · {label}
        </span>
      </div>

      <p className="math mt-4 text-lg leading-relaxed">{problem?.prompt ?? "Loading…"}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="math text-lg font-semibold" htmlFor="solve-x">
          x =
        </label>
        <input
          id="solve-x"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setFeedback("none");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") check();
          }}
          inputMode="decimal"
          placeholder="answer"
          className="math w-28 rounded-lg border border-input bg-card px-3 py-2 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <button
          onClick={check}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Check
        </button>
        <button
          onClick={() => setShowHint(true)}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
        >
          Hint
        </button>
        <button
          onClick={nextProblem}
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
        >
          New problem
        </button>
      </div>

      {showHint && problem ? (
        <p className="mt-4 rounded-lg bg-accent/25 p-3 text-sm">{problem.hint}</p>
      ) : null}

      {feedback === "right" ? (
        <p className="mt-4 rounded-lg border border-success bg-success/10 p-3 text-sm font-semibold">
          Correct — x = {problem?.answer}. Press “New problem” to keep the streak alive.
        </p>
      ) : null}
      {feedback === "wrong" ? (
        <p className="mt-4 rounded-lg border border-destructive bg-destructive/10 p-3 text-sm font-semibold">
          Not yet. Re-read the property that the figure gives you, then try again.
        </p>
      ) : null}
    </div>
  );
}
