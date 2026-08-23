import { useState } from "react";

const CARDS: { front: string; back: string }[] = [
  { front: "Rectangle", back: "A parallelogram that has one right angle. All its angles are 90° and its diagonals are equal in length." },
  { front: "Rhombus", back: "A parallelogram in which two adjacent sides are equal. All sides are equal, and the diagonals are perpendicular and bisect the interior angles." },
  { front: "Square", back: "A parallelogram with one right angle and two adjacent sides equal. It owns every property of the parallelogram, rectangle and rhombus." },
  { front: "Conditions → rectangle", back: "One right angle, OR diagonals equal in length." },
  { front: "Conditions → rhombus", back: "Two adjacent sides equal, OR diagonals perpendicular." },
  { front: "Conditions → square", back: "Right angle + adjacent sides equal, OR right angle + perpendicular diagonals, OR diagonals equal + perpendicular, OR adjacent sides equal + diagonals equal." },
  { front: "Rectangle → square", back: "A rectangle becomes a square if two adjacent sides are equal, or if its diagonals are perpendicular." },
  { front: "Rhombus → square", back: "A rhombus becomes a square if it has one right angle, or if its diagonals are equal in length." },
  { front: "Diagonal of a square", back: "It bisects the right angles, so it makes an angle of 45° with each side." },
];

export function Flashcards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = CARDS[i]!;

  function move(step: number) {
    setI((v) => (v + step + CARDS.length) % CARDS.length);
    setFlipped(false);
  }

  return (
    <div className="paper p-6">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>Vocabulary cards</span>
        <span>
          {i + 1} / {CARDS.length}
        </span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 grid min-h-44 w-full place-items-center rounded-xl border border-border bg-muted p-6 text-center transition-colors hover:border-primary"
      >
        {flipped ? (
          <span className="text-sm leading-relaxed">{card.back}</span>
        ) : (
          <span className="font-display text-2xl font-bold">{card.front}</span>
        )}
      </button>
      <p className="mt-2 text-center text-xs text-muted-foreground">Tap the card to flip it.</p>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => move(-1)}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
        >
          Previous
        </button>
        <button
          onClick={() => move(1)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Next card
        </button>
      </div>
    </div>
  );
}
