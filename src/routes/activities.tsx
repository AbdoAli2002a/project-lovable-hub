import { createFileRoute } from "@tanstack/react-router";

import { Flashcards } from "@/components/games/flashcards";
import { PropertySortGame } from "@/components/games/property-sort";
import { QuizGame } from "@/components/games/quiz";
import { SolveForXGame } from "@/components/games/solve-x";
import { SomeAllGame } from "@/components/games/some-all";
import { Card, Note, PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities, Practice & Educational Games — Special Quadrilaterals" },
      {
        name: "description",
        content:
          "Interactive games for the rectangle, rhombus and square: a property quiz, a property-sorting task, Some/All challenge, endless solve-for-x practice, flashcards and a classroom activity.",
      },
      {
        property: "og:title",
        content: "Activities, Practice & Educational Games — Special Quadrilaterals",
      },
      {
        property: "og:description",
        content:
          "Six ways to practise Lesson Six: quiz, sorting, Some/All, endless x problems, flashcards and a hands-on classroom activity.",
      },
    ],
  }),
  component: ActivitiesPage,
});

const contents = [
  { id: "quiz", label: "1 · Property & condition quiz" },
  { id: "sort", label: "2 · Sort the properties" },
  { id: "some-all", label: "3 · Some or All challenge" },
  { id: "solve", label: "4 · Endless solve for x" },
  { id: "cards", label: "5 · Vocabulary flashcards" },
  { id: "hands-on", label: "6 · Hands-on classroom activities" },
];

function ActivitiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        eyebrow="Activities & games"
        title="Practise the lesson, then play with it"
        intro="Six activities that cover every learning outcome of Lesson Six. Each one gives instant feedback and explains the property behind the answer, so you can use them alone or as a whole-class warm-up."
      />

      <nav className="mt-6 flex flex-wrap gap-2">
        {contents.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:border-primary hover:text-foreground"
          >
            {c.label}
          </a>
        ))}
      </nav>

      <Section id="quiz" number="1" title="Property & condition quiz">
        <p className="text-sm text-muted-foreground">
          Ten multiple-choice questions across definitions, properties and conditions. Every answer
          comes with the reason.
        </p>
        <QuizGame />
      </Section>

      <Section id="sort" number="2" title="Sort the properties">
        <p className="text-sm text-muted-foreground">
          Decide which shapes each property always belongs to. This is the fastest way to see why the
          square inherits from both the rectangle and the rhombus.
        </p>
        <PropertySortGame />
      </Section>

      <Section id="some-all" number="3" title="Some or All challenge">
        <p className="text-sm text-muted-foreground">
          The classic exercise-5 task: complete each sentence with the correct quantifier.
        </p>
        <SomeAllGame />
      </Section>

      <Section id="solve" number="4" title="Endless solve for x">
        <p className="text-sm text-muted-foreground">
          Freshly generated algebra-in-geometry problems: right angles, half-diagonals, perpendicular
          diagonals and “make it a rectangle” conditions. Build the longest streak you can.
        </p>
        <SolveForXGame />
      </Section>

      <Section id="cards" number="5" title="Vocabulary flashcards">
        <p className="text-sm text-muted-foreground">
          Nine cards covering the definitions, the property lists and all the upgrade conditions.
        </p>
        <Flashcards />
      </Section>

      <Section id="hands-on" number="6" title="Hands-on classroom activities">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Activity A · The straw investigation">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cut four straws — two of length 8 cm and two of length 12 cm — and thread them into a
              quadrilateral. Push the frame sideways and record what changes and what does not. Then
              swap in four equal straws and repeat.
            </p>
            <p className="mt-3 text-sm">
              <strong>Discuss:</strong> the side lengths never change, so the shape stays a
              parallelogram. What extra measurement do you need to check to claim it is now a
              rectangle? A rhombus?
            </p>
          </Card>

          <Card title="Activity B · Two rulers, one shape">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cross two rulers at their midpoints and join the four end points. The figure is always a
              parallelogram because the diagonals bisect each other.
            </p>
            <p className="mt-3 text-sm">
              <strong>Predict then test:</strong> equal rulers → rectangle; unequal rulers at 90° →
              rhombus; equal rulers at 90° → square.
            </p>
          </Card>

          <Card title="Activity C · Paper-folding proof">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fold a square sheet along one diagonal. The two halves match exactly, which shows the
              diagonal bisects the two right angles it passes through.
            </p>
            <p className="mt-3 text-sm">
              <strong>Record:</strong> each fold line makes 45° with the sides — the fact that solves
              most square questions.
            </p>
          </Card>

          <Card title="Activity D · Always, sometimes, never (in pairs)">
            <p className="text-sm leading-relaxed text-muted-foreground">
              One student reads a statement (“a rhombus has equal diagonals”), the partner answers
              always, sometimes or never and must justify it with a property or a counter-example.
            </p>
            <p className="mt-3 text-sm">
              <strong>Scoring:</strong> 2 points for a correct justification, 1 point for a correct
              answer only. First to 10 wins.
            </p>
          </Card>
        </div>

        <Note title="Teacher tip">
          <p>
            Run activities A and B before the definitions are introduced. Learners discover the
            conditions themselves, and the formal definition then becomes a summary of what they have
            already seen rather than a rule to memorise.
          </p>
        </Note>
      </Section>
    </div>
  );
}
