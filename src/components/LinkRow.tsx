import { links } from "@/content/site";
import { linkIcons } from "./Icons";

export function LinkRow() {
  const visible = links.filter((l) => l.href !== null);

  return (
    <ul className="mt-8 flex flex-wrap gap-2" aria-label="Profiles">
      {visible.map((l) => {
        const Icon = linkIcons[l.kind];
        const external = l.href!.startsWith("http");
        return (
          <li key={l.kind}>
            <a
              href={l.href!}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(l.kind === "resume" ? { download: "" } : {})}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg active:scale-[0.98]"
            >
              <Icon size={15} />
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
