import { createFileRoute, Link } from "@tanstack/react-router";

import { SquareFigure, SquareWithParallelSegment } from "@/components/site/figures";
import {
  Card,
  Definition,
  Figure,
  Math,
  Note,
  PageHeader,
  Section,
  Steps,
} from "@/components/site/ui";

export const Route = createFileRoute("/square")({
  head: () => ({
    meta: [
      { title: "The Square — Definition, Properties & Examples" },
      {
        name: "description",
        content:
          "The square is a parallelogram with one right angle and two adjacent sides equal, so it owns every property of the parallelogram, the rectangle and the rhombus.",
      },
      { property: "og:title", content: "The Square — Definition, Properties & Examples" },
      {
        property: "og:description",
        content:
          "Four equal sides, four right angles, diagonals equal, perpendicular and angle-bisecting.",
      },
    ],
  }),
  component: SquarePage,
});

function SquarePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        eyebrow="Shape 3 of 3"
        title="The Square"
        intro="The square is the meeting point of the two previous shapes: control the angles like a rectangle and the sides like a rhombus at the same time, and every property of both shapes becomes available."
      />

      <Section number="1" title="Definition">
        <Definition>
          The square is a parallelogram that has one right angle and two adjacent sides equal in
          length.
        </Definition>
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="math space-y-1 text-base">
            <p>ABCD is a parallelogram,</p>
            <p>
              If m(<Math>∠A</Math>) = 90° and AB = BC
            </p>
            <p>then ABCD is a square.</p>
          </div>
          <Figure caption="Right angle + equal adjacent sides">
            <SquareFigure />
          </Figure>
        </div>
      </Section>

      <Section number="2" title="Properties of the square">
        <p className="text-base leading-relaxed">
          The square is a parallelogram with 4 right angles like a rectangle and 4 equal sides like a
          rhombus. Therefore it has <strong>all</strong> the properties of the three shapes:
          parallelogram, rectangle and rhombus.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Card title="1 · All sides equal">
            <Figure>
              <SquareFigure />
            </Figure>
          </Card>
          <Card title="2 · All angles are right angles">
            <Figure caption="Each angle = 90°">
              <SquareFigure ticks={false} allRightAngles />
            </Figure>
          </Card>
          <Card title="3 · Diagonals equal, perpendicular and angle-bisecting">
            <Figure caption="AC = BD, AC ⊥ BD">
              <SquareFigure diagonals ticks={false} />
            </Figure>
          </Card>
        </div>
        <Note title="The 45° rule">
          <p>
            Because each diagonal of a square bisects two right angles, it makes an angle of{" "}
            <strong>45°</strong> with every side it meets: m(∠ACD) = m(∠ACB) = m(∠CAB) = 45°. This
            single fact solves a large share of square questions.
          </p>
        </Note>
      </Section>

      <Section number="3" title="Example 3 — a proof and an angle">
        <Card>
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <p className="text-base leading-relaxed">
                In the opposite figure: ABCD is a square, <Math>DE</Math> is drawn parallel to{" "}
                <Math>AC</Math> and intersects <Math>BC</Math> at the point E.
              </p>
              <p className="math mt-3">
                <strong>1</strong> Prove that: EC = CB &nbsp;·&nbsp; <strong>2</strong> Find m(∠ADE)
              </p>
            </div>
            <Figure caption="DE ∥ AC, E ∈ BC">
              <SquareWithParallelSegment />
            </Figure>
          </div>

          <div className="mt-6 grid gap-6 border-t border-border pt-5 md:grid-cols-2">
            <div>
              <p className="chip bg-primary/10 text-primary">Part 1 — proof</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>ABCD is a square and E ∈ BC, so EC ∥ DA.</>,
                    <>AC ∥ DE (given).</>,
                    <>Therefore ACED has both pairs of opposite sides parallel: it is a parallelogram.</>,
                    <>So DA = EC (opposite sides of a parallelogram).</>,
                    <>But DA = CB (all sides of the square are equal).</>,
                    <>
                      Therefore <strong>EC = CB</strong>.
                    </>,
                  ]}
                />
              </div>
            </div>
            <div>
              <p className="chip bg-primary/10 text-primary">Part 2 — m(∠ADE)</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>AC is a diagonal of the square ABCD, so m(∠ACD) = 45°.</>,
                    <>
                      DE ∥ AC and DC is a transversal, so m(∠CDE) = m(∠ACD) = 45° (alternate
                      interior angles).
                    </>,
                    <>m(∠CDA) = 90° (property of the square).</>,
                    <>
                      m(∠ADE) = 90° + 45° = <strong>135°</strong>
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section number="4" title="Try it yourself 3">
        <Card>
          <p className="text-base leading-relaxed">
            ABCD is a square whose diagonals meet at H. The diagonal makes an angle of 104° at H with
            a segment drawn to a point E on AB; x° is marked at C and y° at H below the diagonal.
            Find the values of <Math>x</Math> and <Math>y</Math>.
          </p>
          <details className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Strategy & answers</summary>
            <p className="math mt-2">
              Use the 45° rule for x: the diagonal bisects the right angle at C, so x = 45.
              <br />
              Angles on a straight line at H give y = 180 − 104 = 76.
            </p>
          </details>
        </Card>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/conditions"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Next: the conditions
        </Link>
        <Link
          to="/activities"
          className="rounded-lg border border-border px-5 py-3 text-sm font-bold"
        >
          Practise this shape
        </Link>
      </div>
    </div>
  );
}
