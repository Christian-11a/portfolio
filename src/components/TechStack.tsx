import type { CSSProperties } from "react";
import { stack } from "@/content/site";
import { techIcon } from "@/lib/techIcons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function TechStack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section id="stack" title="Tech stack" count={total} intro="Tools I reach for, grouped by where they fit.">
      <Reveal className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {stack.map((group) => (
          <div key={group.title} className="grid gap-3 p-5 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-6 sm:px-6">
            <h3 className="font-mono text-sm text-muted">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const icon = techIcon(item);
                return (
                  <li
                    key={item}
                    style={icon ? ({ "--brand": icon.hover } as CSSProperties) : undefined}
                    className="group/chip inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-sm transition-colors hover:border-line-strong"
                  >
                    {icon && (
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        aria-hidden="true"
                        className="fill-muted transition-colors group-hover/chip:fill-[var(--brand)]"
                      >
                        <path d={icon.path} />
                      </svg>
                    )}
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
