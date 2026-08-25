import { createFileRoute, Link } from "@tanstack/react-router";

import { ParallelogramFigure, RectangleFigure, RhombusFigure, SquareFigure } from "@/components/site/figures";
import { Card, Figure, Math, Note, PageHeader, Section, Steps } from "@/components/site/ui";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "When Does a Parallelogram Become a Rectangle, Rhombus or Square?" },
      {
        name: "description",
        content:
          "Every condition that upgrades a parallelogram into a rectangle, a rhombus or a square, plus the two notes about turning a rectangle or rhombus into a square.",
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
  component: ConditionsPage;
});

function ConditionsPage() {
  return <div />;
}
