import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Card, Math, Note, PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Worked Examples & Exercise 16 — Special Quadrilaterals" },
      {
        name: "description",
        content:
          "Exam-style questions on the rectangle, rhombus and square with hidden model answers: angle chasing, solving for x and full geometric proofs.",
      },
      { property: "og:title", content: "Worked Examples & Exercise 16 — Special Quadrilaterals" },
      {
        property: "og:description",
        content: "Angle chasing, solving for x and proofs, each with a step-by-step model answer.",
      },
    ],
  }),
  component: ExamplesPage,
});

type Problem = {
  id: string;
  tag: "Remember" | "Understand" | "Apply" | "Problem solving";
  question: React.ReactNode;
  solution: React.ReactNode;
};

const problems: Problem[] = [
  {
    id: "q1",
    tag: "Understand",
    question: (
      <>
        ABCD is a rectangle in which the diagonal AC is drawn and m(∠CAB) = 39°. Find the measures of
        the angles ∠ACB, ∠DAC and ∠ADC.
      </>
    ),
    solution: (
      <>
        <p>m(∠B) = 90°, so in △ABC: m(∠ACB) = 180° − (90° + 39°) = 51°.</p>
        <p>m(∠DAB) = 90°, so m(∠DAC) = 90° − 39° = 51°.</p>
        <p>m(∠ADC) = 90°, because every angle of a rectangle is a right angle.</p>
      </>
    ),
  },
  {
    id: "q2",
    tag: "Understand",
    question: (
      <>
        ABCD is a square whose diagonals intersect at M. Find m(∠AMB), m(∠MAB) and m(∠DAC).
      </>
    ),
    solution: (
      <>
        <p>The diagonals of a square are perpendicular, so m(∠AMB) = 90°.</p>
        <p>Each diagonal bisects the right angle, so m(∠MAB) = m(∠DAC) = 45°.</p>
        <p>(△AMB is therefore a right isosceles triangle with two 45° base angles.)</p>
      </>
    ),
  },
  {
    id: "q3",
    tag: "Apply",
    question: (
      <>
        ABCD is a rectangle whose diagonals intersect at M and m(∠AMB) = 120°. Find m(∠MAB) and
        m(∠MBC).
      </>
    ),
    solution: (
      <>
        <p>
          The diagonals are equal and bisect each other, so MA = MB and △AMB is isosceles.
        </p>
        <p>m(∠MAB) = m(∠MBA) = (180° − 120°) ÷ 2 = 30°.</p>
        <p>m(∠ABC) = 90°, so m(∠MBC) = 90° − 30° = 60°.</p>
      </>
    ),
  },
  {
    id: "q4",
    tag: "Apply",
    question: (
      <>
        ABCD is a rhombus in which m(∠DAC) = 31°. Find m(∠DAB), m(∠ADC) and m(∠AMD), where M is the
        intersection of the diagonals.
      </>
    ),
    solution: (
      <>
        <p>AC bisects ∠DAB, so m(∠DAB) = 2 × 31° = 62°.</p>
        <p>Consecutive angles are supplementary: m(∠ADC) = 180° − 62° = 118°.</p>
        <p>The diagonals are perpendicular, so m(∠AMD) = 90°.</p>
      </>
    ),
  },
  {
    id: "q5",
    tag: "Apply",
    question: (
      <>
        ABCD is a rhombus and m(∠DAB) = 60°. The diagonal DB is drawn. Find m(∠ADB) and prove that
        △ABD is equilateral.
      </>
    ),
    solution: (
      <>
        <p>AB = AD (all sides of a rhombus are equal), so △ABD is isosceles.</p>
        <p>m(∠ADB) = m(∠ABD) = (180° − 60°) ÷ 2 = 60°.</p>
        <p>All three angles measure 60°, therefore △ABD is equilateral.</p>
      </>
    ),
  },
  {
    id: "q6",
    tag: "Apply",
    question: (
      <>
        ABCD is a rhombus whose diagonals meet at M. AD = (7x − 11) cm and AB = (5x + 1) cm. Find{" "}
        <Math>x</Math> and the perimeter of the rhombus.
      </>
    ),
    solution: (
      <>
        <p>All sides are equal, so 7x − 11 = 5x + 1 → 2x = 12 → x = 6.</p>
        <p>Side = 5(6) + 1 = 31 cm.</p>
        <p>Perimeter = 4 × 31 = 124 cm.</p>
      </>
    ),
  },
  {
    id: "q7",
    tag: "Apply",
    question: (
      <>
        ABCD is a rectangle whose diagonals meet at M, AM = (3x) cm and MD = (4x − 5) cm. Find the
        length of the diagonal AC.
      </>
    ),
    solution: (
      <>
        <p>All four half-diagonals are equal, so 3x = 4x − 5 → x = 5.</p>
        <p>AM = 15 cm, therefore AC = 2 × 15 = 30 cm.</p>
      </>
    ),
  },
  {
    id: "q8",
    tag: "Problem solving",
    question: (
      <>
        ABCD is a rectangle and E ∈ AB such that m(∠ECB) = 44° and m(∠AED) = 46°. Find, with proof,
        m(∠CED).
      </>
    ),
    solution: (
      <>
        <p>In △ECB: m(∠B) = 90°, so m(∠BEC) = 180° − (90° + 44°) = 46°.</p>
        <p>
          ∠AED, ∠DEC and ∠CEB lie on the straight line AB, so m(∠CED) = 180° − (46° + 46°) = 88°.
        </p>
      </>
    ),
  },
  {
    id: "q9",
    tag: "Problem solving",
    question: (
      <>
        ABCD is a rhombus and m(∠DBC) = 62°. Find, with proof, m(∠A).
      </>
    ),
    solution: (
      <>
        <p>CB = CD (rhombus), so △BCD is isosceles and m(∠BDC) = m(∠DBC) = 62°.</p>
        <p>m(∠BCD) = 180° − (62° + 62°) = 56°.</p>
        <p>∠A and ∠BCD are opposite angles of a parallelogram, so m(∠A) = 56°.</p>
      </>
    ),
  },
  {
    id: "q10",
    tag: "Problem solving",
    question: (
      <>
        ABCD is a square whose diagonals meet at M. BD = (5a − 4) cm and MC = (2a − 1) cm. Find{" "}
        <Math>a</Math> and then the length of AC.
      </>
    ),
    solution: (
      <>
        <p>MC is half of the diagonal AC, and AC = BD, so BD = 2 × MC.</p>
        <p>5a − 4 = 2(2a − 1) → 5a − 4 = 4a − 2 → a = 2.</p>
        <p>MC = 3 cm, therefore AC = 6 cm.</p>
      </>
    ),
  },
  {
    id: "q11",
    tag: "Problem solving",
    question: (
      <>
        ABCD is a square with diagonals meeting at M. E ∈ AC and F ∈ AC with EA = FC. Prove that EBFD
        is a rhombus.
      </>
    ),
    solution: (
      <>
        <p>M is the midpoint of BD, and since EA = FC we get ME = MF, so M is the midpoint of EF.</p>
        <p>The diagonals EF and BD bisect each other, so EBFD is a parallelogram.</p>
        <p>AC ⊥ BD in the square, so the diagonals of EBFD are perpendicular.</p>
        <p>A parallelogram with perpendicular diagonals is a rhombus, therefore EBFD is a rhombus.</p>
      </>
    ),
  },
  {
    id: "q12",
    tag: "Problem solving",
    question: (
      <>
        ABCD is a rectangle, E ∈ AD and F ∈ BC such that ABFE is a square, and m(∠FDC) = 52°. Find,
        with proof, m(∠AFD).
      </>
    ),
    solution: (
      <>
        <p>In △FDC: m(∠C) = 90°, so m(∠DFC) = 180° − (90° + 52°) = 38°.</p>
        <p>AF is a diagonal of the square ABFE, so m(∠AFB) = 45°.</p>
        <p>B, F, C are collinear, so m(∠AFD) = 180° − (45° + 38°) = 97°.</p>
      </>
    ),
  },
];

const tagStyle: Record<Problem["tag"], string> = {
  Remember: "bg-muted text-foreground",
  Understand: "bg-secondary text-secondary-foreground",
  Apply: "bg-accent text-accent-foreground",
  "Problem solving": "bg-primary text-primary-foreground",
};

function ExamplesPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"All" | Problem["tag"]>("All");

  const list = problems.filter((p) => filter === "All" || p.tag === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        eyebrow="Exercise 16"
        title="Worked examples & exam-style questions"
        intro="Twelve questions in the style of the lesson exercise, sorted from straightforward angle chasing to full proofs. Attempt each one on paper first, then open the model answer."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", "Understand", "Apply", "Problem solving"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              filter === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Section title={`${list.length} questions`}>
        <div className="space-y-4">
          {list.map((p, i) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between gap-4">
                <p className="text-base leading-relaxed">
                  <span className="math mr-2 font-bold text-primary">{i + 1}.</span>
                  {p.question}
                </p>
                <span className={`chip shrink-0 ${tagStyle[p.tag]}`}>{p.tag}</span>
              </div>
              <button
                onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
                className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-primary"
              >
                {open[p.id] ? "Hide solution" : "Show solution"}
              </button>
              {open[p.id] ? (
                <div className="math mt-4 space-y-1.5 rounded-lg bg-muted p-4 text-sm leading-relaxed">
                  {p.solution}
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      <Note title="Proof-writing checklist">
        <p>
          1. Name the shape and quote the property you are using — “ABCD is a rhombus, so AC ⊥ BD”.
          <br />
          2. Work inside one triangle at a time; the angle sum 180° and isosceles base angles do most
          of the work.
          <br />
          3. Finish by stating the conclusion in the words of the question.
        </p>
      </Note>

      <div className="mt-12">
        <Link
          to="/activities"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Go to activities & games
        </Link>
      </div>
    </div>
  );
}
