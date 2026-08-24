import { createFileRoute, Link } from "@tanstack/react-router";

import { RhombusFigure, RhombusWithExpression } from "@/components/site/figures";
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

export const Route = createFileRoute("/rhombus")({
  head: () => ({
    meta: [
      { title: "The Rhombus — Definition, Properties & Examples" },
      {
        name: "description",
        content:
          "The rhombus is a parallelogram with two adjacent sides equal: all four sides are equal and the diagonals are perpendicular and bisect the interior angles.",
      },
      { property: "og:title", content: "The Rhombus — Definition, Properties & Examples" },
      {
        property: "og:description",
        content:
          "Equal sides, perpendicular diagonals, bisected angles — with fully worked solutions.",
      },
    ],
  }),
  component: RhombusPage,
});

function RhombusPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        eyebrow="Shape 2 of 3"
        title="The Rhombus"
        intro="Where the rectangle controls the angles, the rhombus controls the sides. Making two neighbouring sides equal forces all four sides to be equal, and it turns the diagonals into perpendicular angle-bisectors."
      />

      <Section number="1" title="Definition">
        <Definition>
          The rhombus is a parallelogram in which two adjacent sides are equal in length.
        </Definition>
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="math space-y-1 text-base">
            <p>ABCD is a parallelogram,</p>
            <p>If AB = BC</p>
            <p>then ABCD is a rhombus.</p>
          </div>
          <Figure caption="AB = BC is enough">
            <RhombusFigure ticks adjacentOnly />
          </Figure>
        </div>
        <Note title="Why two sides are enough">
          <p>
            In a parallelogram opposite sides are already equal: AB = CD and BC = DA. So the single
            extra fact AB = BC chains through all four sides: AB = BC = CD = DA.
          </p>
        </Note>
      </Section>

      <Section number="2" title="Properties of the rhombus">
        <p className="text-base leading-relaxed">
          The rhombus is a parallelogram, so it has the same properties as the parallelogram, in
          addition to the following:
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card title="1 · All sides are equal in length">
            <Figure caption="AB = BC = CD = DA">
              <RhombusFigure ticks />
            </Figure>
          </Card>
          <Card title="2 · The diagonals are perpendicular and bisect the interior angles">
            <Figure caption="AC ⊥ BD">
              <RhombusFigure diagonals angleMarks />
            </Figure>
            <p className="math mt-3 text-sm text-muted-foreground">
              m(∠1) = m(∠2), m(∠3) = m(∠4), m(∠5) = m(∠6), m(∠7) = m(∠8)
            </p>
          </Card>
        </div>
        <Note title="Three tools you get for free">
          <p>
            1. Each of the four triangles cut by the diagonals is right-angled at M.
            <br />
            2. Every triangle formed by a diagonal (for example △CBD) is isosceles, so its base
            angles are equal.
            <br />
            3. A diagonal splits the angle it passes through into two equal halves.
          </p>
        </Note>
      </Section>

      <Section number="3" title="Example 2 — using sides and angles">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Figure 1 — find the length of BC">
            <Figure caption="AD = (6x − 4) cm, DC = (5x + 1) cm">
              <RhombusWithExpression sideAD="(6x − 4) cm" sideDC="(5x + 1) cm" />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <p className="chip bg-primary/10 text-primary">Solution</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>ABCD is a rhombus, so AD = DC.</>,
                    <>6x − 4 = 5x + 1</>,
                    <>6x − 5x = 4 + 1, so x = 5</>,
                    <>AD = 6 × 5 − 4 = 26 cm</>,
                    <>
                      AD = BC, therefore the length of BC = <strong>26 cm</strong>
                    </>,
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card title="Figure 2 — find m(∠BCD)">
            <Figure caption="m(∠CDB) = (x + 15)°, m(∠DMC) = (2x + 20)°">
              <RhombusWithExpression sideDC="(x + 15)°" angleAtM="(2x + 20)°" />
            </Figure>
            <div className="mt-4 border-t border-border pt-4">
              <p className="chip bg-primary/10 text-primary">Solution</p>
              <div className="mt-3">
                <Steps
                  items={[
                    <>The diagonals of a rhombus are perpendicular, so m(∠DMC) = 90°.</>,
                    <>2x + 20 = 90 → 2x = 70 → x = 35</>,
                    <>
                      △CBD is isosceles (CB = CD), so m(∠CBD) = m(∠CDB) = x + 15 = 50°
                    </>,
                    <>
                      In triangle CBD: m(∠BCD) = 180° − (50° + 50°) = <strong>80°</strong>
                    </>,
                  ]}
                />
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section number="4" title="Try it yourself 2">
        <Card>
          <p className="text-base leading-relaxed">
            ABCD is a rhombus with diagonals intersecting at M. AB = (10x + 1) cm, DA = (x + 10) cm,
            m(∠CMB) = 2y° and m(∠MDC) = (y − 15)°.
          </p>
          <p className="math mt-3">
            Find: <strong>1</strong> the length of DC &nbsp;·&nbsp; <strong>2</strong> m(∠CDA)
          </p>
          <details className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Show answers</summary>
            <p className="math mt-2">
              1. All sides equal: 10x + 1 = x + 10 → 9x = 9 → x = 1, so DC = 11 cm.
              <br />
              2. m(∠CMB) = 90° → 2y = 90 → y = 45, so m(∠MDC) = 30° and m(∠CDA) = 2 × 30° = 60°.
            </p>
          </details>
        </Card>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/square"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Next: the square
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
