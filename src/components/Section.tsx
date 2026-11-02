import type { ReactNode } from "react";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";

/** Slim hatched band between sections: hatch inside the column, hairlines across the full screen. */
export function Divider() {
  return <div aria-hidden="true" className="rule-top rule-bottom hatch relative h-3" />;
}

export function Section({
  id,
  title,
  intro,
  count,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <>
      <Divider />
      <section id={id} aria-labelledby={`${id}-title`} className={`${container} py-16 sm:py-20`}>
        <Reveal className="mb-10 max-w-[60ch]">
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
            {count !== undefined && (
              <sup className="ml-1 font-mono text-sm font-normal text-muted">{` (${count})`}</sup>
            )}
          </h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </Reveal>
        {children}
      </section>
    </>
  );
}
