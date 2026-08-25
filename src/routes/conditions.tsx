import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ParallelogramFigure,
  RectangleFigure,
  RhombusFigure,
  SquareFigure,
} from "@/components/site/figures";
import { Card, Figure, Math, Note, PageHeader, Section, Steps } from "@/components/site/ui";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "When Does a Parallelogram Become a Rectangle, Rhombus or Square?" },
      {
        name: "description",
        content:
          "Every condition that upgrades a parallelogram into a rectangle, a rhombus or a square, plus the two notes about turning a rectangle or a rhombus into a square.",
      },
      {
        property: "og:title",
        content: "When Does a Parallelogram Become a Rectangle, Rhombus or Square?",
      },
      {
        property: "og:description",
        content: "The full condition table with worked Example 4 solutions.",
      },
    ],
  }),
  component: ConditionsPage,
});

const columns = [
  {
    title: "A rectangle",
    figure: <RectangleFigure allRightAngles />,
    conditions: ["It has one right angle,", "or its diagonals are equal in length."],
  },
  {
    title: "A rhombus",
    figure: <RhombusFigure ticks />,
    conditions: [
      "It has two adjacent sides equal in length,",
      "or its diagonals are perpendicular.",
    ],
  },
  {
    title: "A square",
    figure: <SquareFigure allRightAngles />,
    conditions: [
      "It has one right angle and two adjacent sides equal in length,",
      "or it has one right angle and its diagonals are perpendicular,",
      "or its diagonals are equal in length and perpendicular,",
      "or it has two adjacent sides equal in length and its diagonals are equal in length.",
    ],
  },
];

function ConditionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PageHeader
        eyebrow="The decision rules"
        title="When does a parallelogram become a rectangle, rhombus or square?"
        intro="Each of the three special shapes can be reached from a parallelogram in more than one way — through the angles, through the sides, or through the diagonals. This page is the complete decision table for the lesson."
      />

      <Section title="A parallelogram becomes as:">
        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="paper flex flex-col p-5">
              <h3 className="rounded-lg bg-accent px-3 py-2 text-center font-display text-lg font-bold text-accent-foreground">
                {col.title}
              </h3>
              <div className="my-4 grid place-items-center">
                <Figure>{col.figure}</Figure>
              </div>
              <p className="text-center font-display text-sm font-bold text-primary">If</p>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                {col.conditions.map((c, i) => (
                  <li key={c} className="text-center">
                    {i > 0 ? (
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        or
                      </span>
                    ) : null}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Note title="Notes">
          <p>
            <strong>1.</strong> The rectangle becomes a square if two adjacent sides are equal in
            length, or if its diagonals are perpendicular.
          </p>
          <p>
            <strong>2.</strong> The rhombus becomes a square if it has one right angle, or if its
            diagonals are equal in length.
          </p>
        </Note>
      </Section>

      <Section title="Example 4 — find the value of x that makes each statement true">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="1 · Parallelogram ABCD is a rectangle">
            <Figure caption="m(∠DAC) = (2x − 5)°, m(∠CAB) = (x − 10)°">
              <ParallelogramFigure diagonals />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <Steps
                items={[
                  <>ABCD becomes a rectangle if m(∠DAB) = 90°.</>,
                  <>(2x − 5) + (x − 10) = 90</>,
                  <>3x − 15 = 90 → 3x = 105</>,
                  <>
                    x = <sup>105</sup>⁄<sub>3</sub> = <strong>35</strong>
                  </>,
                ]}
              />
            </div>
          </Card>

          <Card title="2 · Parallelogram ABCD is a rhombus">
            <Figure caption="m(∠AMB) = (4x − 10)°">
              <ParallelogramFigure diagonals />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <Steps
                items={[
                  <>ABCD becomes a rhombus if AC ⊥ BD.</>,
                  <>m(∠AMB) = 90 → 4x − 10 = 90</>,
                  <>4x = 100</>,
                  <>
                    x = <sup>100</sup>⁄<sub>4</sub> = <strong>25</strong>
                  </>,
                ]}
              />
            </div>
          </Card>

          <Card title="3 · Rectangle ABCD is a square">
            <Figure caption="AD = (2x − 1) cm, AB = (3x − 4) cm">
              <RectangleFigure parallelMarks />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <Steps
                items={[
                  <>The rectangle becomes a square if AB = AD.</>,
                  <>3x − 4 = 2x − 1</>,
                  <>3x − 2x = 4 − 1</>,
                  <>
                    x = <strong>3</strong>
                  </>,
                ]}
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Try it yourself 4">
        <Card>
          <p className="text-base leading-relaxed">
            In the parallelogram ABCD: DC = (2y + 1) cm, AD = (4y − 7) cm and m(∠DAB) = (40x − 30)°.
            Prove that ABCD becomes a square if <Math>x</Math> = 3 and y = 4.
          </p>
          <details className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Show the proof</summary>
            <div className="math mt-2 space-y-1">
              <p>When x = 3: m(∠DAB) = 40(3) − 30 = 90°, so ABCD is a rectangle.</p>
              <p>When y = 4: DC = 2(4) + 1 = 9 cm and AD = 4(4) − 7 = 9 cm, so DC = AD.</p>
              <p>
                A rectangle with two adjacent sides equal in length is a square, therefore ABCD is a
                square.
              </p>
            </div>
          </details>
        </Card>
      </Section>

      <Section title="Quick reference — Some or All?">
        <div className="paper overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 font-display">Statement</th>
                <th className="px-4 py-3 font-display">Correct word</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["……… squares are rectangles.", "All"],
                ["……… squares are rhombuses.", "All"],
                ["……… rectangles are parallelograms.", "All"],
                ["……… quadrilaterals are parallelograms.", "Some"],
                ["……… parallelograms are rectangles.", "Some"],
                ["……… rhombuses are squares.", "Some"],
              ].map(([s, w]) => (
                <tr key={s}>
                  <td className="math px-4 py-3">{s}</td>
                  <td className="px-4 py-3 font-bold text-primary">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/examples"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          See all worked examples
        </Link>
        <Link
          to="/activities"
          className="rounded-lg border border-border px-5 py-3 text-sm font-bold"
        >
          Activities & games
        </Link>
      </div>
    </div>
  );
}
