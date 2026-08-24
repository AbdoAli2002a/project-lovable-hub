import { createFileRoute, Link } from "@tanstack/react-router";

import {
  RectangleFigure,
  RectangleWithExpression,
} from "@/components/site/figures";
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

export const Route = createFileRoute("/rectangle")({
  head: () => ({
    meta: [
      { title: "The Rectangle — Definition, Properties & Examples" },
      {
        name: "description",
        content:
          "The rectangle is a parallelogram with one right angle: all angles measure 90° and the diagonals are equal in length. Includes labelled figures and worked solutions.",
      },
      { property: "og:title", content: "The Rectangle — Definition, Properties & Examples" },
      {
        property: "og:description",
        content:
          "All angles equal 90°, diagonals equal in length, and how to find x in rectangle figures.",
      },
    ],
  }),
  component: RectanglePage,
});

function RectanglePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        eyebrow="Shape 1 of 3"
        title="The Rectangle"
        intro="A rectangle is nothing more than a parallelogram that has been given one right angle. That single condition forces the other three angles to be right angles as well, and it makes the two diagonals equal in length."
      />

      <Section number="1" title="Definition">
        <Definition>
          The rectangle is a parallelogram that has one of its angles a right angle.
        </Definition>
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="math space-y-1 text-base">
            <p>ABCD is a parallelogram,</p>
            <p>
              If m(<Math>∠A</Math>) = 90°
            </p>
            <p>then ABCD is a rectangle.</p>
          </div>
          <Figure caption="One right angle is enough">
            <RectangleFigure parallelMarks />
          </Figure>
        </div>
        <Note title="Why one angle is enough">
          <p>
            In a parallelogram, consecutive angles are supplementary and opposite angles are equal.
            If m(∠A) = 90°, then m(∠B) = 180° − 90° = 90°, and the opposite angles copy them. So one
            right angle produces four.
          </p>
        </Note>
      </Section>

      <Section number="2" title="Properties of the rectangle">
        <p className="text-base leading-relaxed">
          The rectangle is a parallelogram, so it keeps <strong>all</strong> the properties of the
          parallelogram (opposite sides parallel and equal, opposite angles equal, diagonals bisect
          each other), in addition to the following:
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card title="1 · All angles are equal in measure">
            <Figure caption="m(∠A) = m(∠B) = m(∠C) = m(∠D) = 90°">
              <RectangleFigure allRightAngles />
            </Figure>
          </Card>
          <Card title="2 · The diagonals are equal in length">
            <Figure caption="AC = BD, and AM = MB = MC = MD">
              <RectangleFigure diagonals />
            </Figure>
          </Card>
        </div>
        <Note title="Useful consequence">
          <p>
            Because the diagonals are equal <em>and</em> bisect each other, the four halves are all
            equal: <Math>AM = MB = MC = MD</Math>. This turns every triangle formed by half of a
            diagonal into an isosceles triangle — the fastest route through most angle-chasing
            questions.
          </p>
        </Note>
      </Section>

      <Section number="3" title="Example 1 — find the value of x">
        <p className="text-base">
          In each of the following figures, find the value of <Math>x</Math>, where ABCD is a
          rectangle:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Figure 1">
            <Figure caption="m(∠A) = (4x − 18)°">
              <RectangleWithExpression angleLabel="(4x − 18)°" />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <p className="chip bg-primary/10 text-primary">Solution</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>ABCD is a rectangle, so m(∠A) = 90°.</>,
                    <>4x − 18 = 90</>,
                    <>4x = 90 + 18 = 108</>,
                    <>
                      x = <sup>108</sup>⁄<sub>4</sub> = <strong>27</strong>
                    </>,
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card title="Figure 2">
            <Figure caption="AM = (4x − 1) cm, MB = (2x + 5) cm">
              <RectangleWithExpression diagonalLabels={["(4x − 1) cm", "(2x + 5) cm"]} />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <p className="chip bg-primary/10 text-primary">Solution</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>ABCD is a rectangle, so AC = DB.</>,
                    <>The diagonals bisect each other, therefore AM = MB.</>,
                    <>4x − 1 = 2x + 5</>,
                    <>4x − 2x = 5 + 1, so 2x = 6</>,
                    <>
                      x = <sup>6</sup>⁄<sub>2</sub> = <strong>3</strong>
                    </>,
                  ]}
                />
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section number="4" title="Try it yourself 1">
        <Card>
          <p className="text-base">
            In each of the following figures, find the value of <Math>x</Math> where ABCD is a
            rectangle:
          </p>
          <ol className="math mt-4 space-y-3 text-base">
            <li>
              <strong>1.</strong> The diagonal AC is drawn. m(∠DAC) = (5x − 1)° and m(∠CAB) = 31°.
              <span className="block text-sm text-muted-foreground">
                Hint: the two parts together make the right angle at A.
              </span>
            </li>
            <li>
              <strong>2.</strong> The diagonals meet at M, AM = 13 cm and MC = (3x − 2) cm.
              <span className="block text-sm text-muted-foreground">
                Hint: M is the midpoint of each diagonal.
              </span>
            </li>
          </ol>
          <details className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Show answers</summary>
            <p className="math mt-2">
              1. (5x − 1) + 31 = 90 → 5x = 60 → x = 12.
              <br />
              2. 3x − 2 = 13 → 3x = 15 → x = 5.
            </p>
          </details>
        </Card>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/rhombus"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Next: the rhombus
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
