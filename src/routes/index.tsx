import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ParallelogramFigure,
  RectangleFigure,
  RhombusFigure,
  SquareFigure,
} from "@/components/site/figures";
import { Card, Figure, Note, Section } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Special Quadrilaterals — Lesson Six Study Guide" },
      {
        name: "description",
        content:
          "Learn the rectangle, rhombus and square as special cases of the parallelogram: definitions, properties, worked examples, figures and interactive games.",
      },
      { property: "og:title", content: "Special Quadrilaterals — Lesson Six Study Guide" },
      {
        property: "og:description",
        content:
          "Definitions, properties, worked examples and interactive activities for the rectangle, rhombus and square.",
      },
    ],
  }),
  component: Index,
});

const outcomes = [
  "Learn the rectangle and its properties.",
  "Learn the rhombus and its properties.",
  "Learn the square and its properties.",
  "Identify the conditions that make a parallelogram a rectangle, a rhombus, or a square.",
];

const vocabulary = ["Rectangle", "Rhombus", "Square", "Conditions", "Diagonals", "Right angle"];

const map = [
  { to: "/rectangle", label: "Rectangle", note: "One right angle · equal diagonals" },
  { to: "/rhombus", label: "Rhombus", note: "Equal sides · perpendicular diagonals" },
  { to: "/square", label: "Square", note: "Rectangle + rhombus in one shape" },
  { to: "/conditions", label: "Conditions", note: "When does a parallelogram become…?" },
] as const;

function Index() {
  return (
    <div>
      <section className="hero-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="chip bg-accent text-accent-foreground">Lesson Six · Unit 3</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Continue to Special Quadrilaterals
            </h1>
            <p className="mt-2 font-display text-xl font-semibold text-accent">
              Special Cases of Parallelograms
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-90">
              A parallelogram is the parent shape. Add one right angle and it becomes a rectangle.
              Make two adjacent sides equal and it becomes a rhombus. Do both and you get a square.
              This guide explains every definition, property and condition in the lesson, with
              figures, full worked solutions and interactive practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/rectangle"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground"
              >
                Start with the rectangle
              </Link>
              <Link
                to="/activities"
                className="rounded-lg border border-white/40 px-5 py-3 text-sm font-bold"
              >
                Activities & games
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-center rounded-2xl bg-white/10 p-5 text-accent">
            <Figure caption="Parallelogram">
              <ParallelogramFigure />
            </Figure>
            <Figure caption="Rectangle">
              <RectangleFigure allRightAngles />
            </Figure>
            <Figure caption="Rhombus">
              <RhombusFigure ticks />
            </Figure>
            <Figure caption="Square">
              <SquareFigure allRightAngles />
            </Figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid gap-5 py-12 md:grid-cols-2">
          <Card title="Learning outcomes">
            <ul className="space-y-2 text-sm leading-relaxed">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-primary">▪</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Vocabulary">
            <div className="flex flex-wrap gap-2">
              {vocabulary.map((v) => (
                <span key={v} className="chip border border-border bg-muted text-foreground">
                  {v}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every shape in this lesson is a parallelogram first, so the parallelogram properties —
              opposite sides parallel and equal, opposite angles equal, diagonals bisecting each
              other — are always available to you in a proof.
            </p>
          </Card>
        </div>

        <Section title="Lesson map">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {map.map((m, i) => (
              <Link key={m.to} to={m.to} className="paper group p-5 transition-shadow hover:shadow-lg">
                <span className="math text-sm text-muted-foreground">Step {i + 1}</span>
                <h3 className="mt-1 font-display text-lg font-bold group-hover:text-primary">
                  {m.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="The family tree of quadrilaterals">
          <div className="paper overflow-x-auto p-6">
            <pre className="math min-w-[520px] text-sm leading-relaxed text-foreground">{`                        Quadrilateral
                              |
                        Parallelogram
              ______________|______________
             |                             |
   one right angle              two adjacent sides equal
             |                             |
        Rectangle                      Rhombus
             |_____________   _____________|
                           | |
                          Square
                (all right angles + all sides equal)`}</pre>
          </div>
          <Note title="Read it this way">
            <p>
              Moving <strong>down</strong> the tree adds a condition, so every square is a rectangle
              and a rhombus. Moving <strong>up</strong> the tree removes conditions, so “some
              parallelograms are rectangles”, but “all rectangles are parallelograms”.
            </p>
          </Note>
        </Section>

        <Section title="How to use this guide">
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="1 · Read the shape pages">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Rectangle, rhombus and square each get a definition, a labelled figure, the full
                property list and a solved example taken from the lesson.
              </p>
            </Card>
            <Card title="2 · Learn the conditions">
              <p className="text-sm leading-relaxed text-muted-foreground">
                The conditions page collects every “when does a parallelogram become…” rule, plus the
                two notes about turning a rectangle or a rhombus into a square.
              </p>
            </Card>
            <Card title="3 · Practise">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Exercise 16 questions, a property-sorting task, a Some/All challenge, endless
                solve-for-<span className="math">x</span> problems, a quiz and flashcards.
              </p>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}
