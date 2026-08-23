import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="border-b border-border pb-8">
      <p className="chip bg-secondary text-secondary-foreground">{eyebrow}</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
    </div>
  );
}

export function Section({
  id,
  number,
  title,
  children,
}: {
  id?: string;
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="flex items-center gap-3 text-xl font-bold sm:text-2xl">
        {number ? (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-sm text-secondary-foreground">
            {number}
          </span>
        ) : null}
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function Definition({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-primary bg-muted p-4 text-base font-semibold leading-relaxed">
      {children}
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="paper p-5">
      {title ? <h3 className="mb-3 text-base font-bold">{title}</h3> : null}
      {children}
    </div>
  );
}

export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <div className="text-figure">{children}</div>
      {caption ? (
        <figcaption className="math text-center text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Math({ children }: { children: ReactNode }) {
  return <span className="math">{children}</span>;
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="math space-y-2 text-base">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold not-italic text-primary">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Note({ title = "Note", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-accent/60 bg-accent/20 p-4">
      <p className="chip bg-accent text-accent-foreground">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
