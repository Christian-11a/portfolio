import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { links, profile } from "@/content/site";
import { container } from "@/lib/ui";
import { linkIcons } from "./Icons";
import { MotionToggle } from "./MotionToggle";

// Cached so the current year can be read without making the page dynamic.
async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="rule-top relative mt-10">
      <div className={`${container} flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row`}>
        <p>
          ©{" "}
          <Suspense fallback={null}>
            <Year />
          </Suspense>{" "}
          {profile.name}. Designed and built by me.
        </p>
        <div className="flex items-center gap-3">
          <MotionToggle />
          <ul className="flex gap-1" aria-label="Profiles">
            {links
              .filter((l) => l.href && l.kind !== "resume")
              .map((l) => {
                const Icon = linkIcons[l.kind];
                const external = l.href!.startsWith("http");
                return (
                  <li key={l.kind}>
                    <a
                      href={l.href!}
                      aria-label={l.label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="grid size-9 place-items-center rounded-full transition-colors hover:bg-surface hover:text-fg"
                    >
                      <Icon size={17} />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
