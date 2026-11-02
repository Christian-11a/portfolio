"use client";

import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useRef, useSyncExternalStore, type PointerEvent, type RefObject } from "react";
import type { Project } from "@/content/site";
import { useMotionReduced } from "@/lib/motionPref";
import { getProjectServerSnapshot, getProjectSnapshot, setProject, subscribeProject } from "@/lib/projectParam";
import { ProjectDialog } from "./ProjectDialog";

/**
 * Pointer tracking for the "View details" pill. It lives on the card, not the
 * screenshot, because the card's stretched button sits on top of the screenshot.
 */
function usePillFollow() {
  const reduced = useMotionReduced();
  const shotRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const visible = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const opacity = useSpring(visible, { stiffness: 400, damping: 40 });

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const shot = shotRef.current;
    if (!shot || reduced || e.pointerType !== "mouse") return;
    const r = shot.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    visible.set(inside ? 1 : 0);
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  const pill = { x: sx, y: sy, opacity };
  return { shotRef, onPointerMove, onPointerLeave: () => visible.set(0), pill };
}

type Pill = ReturnType<typeof usePillFollow>["pill"];

/** Screenshot with a "View details" pill that follows the cursor. */
function Shot({
  project,
  featured,
  shotRef,
  pill,
}: {
  project: Project;
  featured: boolean;
  shotRef: RefObject<HTMLDivElement | null>;
  pill: Pill;
}) {
  return (
    <div ref={shotRef} className="relative overflow-hidden rounded-xl border border-line bg-surface-2">
      <Image
        src={`/projects/${project.slug}.png`}
        alt=""
        width={1280}
        height={800}
        sizes={featured ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 500px, 100vw"}
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
      />
      <motion.span
        aria-hidden="true"
        style={pill}
        className="pointer-events-none absolute top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap text-bg [@media(pointer:fine)]:inline-flex"
      >
        View details <ArrowUpRightIcon size={12} />
      </motion.span>
    </div>
  );
}

function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured: boolean;
  onOpen: () => void;
}) {
  const reduced = useMotionReduced();
  const { shotRef, onPointerMove, onPointerLeave, pill } = usePillFollow();

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-line-strong ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1.35fr_1fr] md:gap-8" : "flex flex-col"
      }`}
    >
      <Shot project={project} featured={featured} shotRef={shotRef} pill={pill} />

      <div className={`flex flex-1 flex-col px-2 pt-5 pb-2 ${featured ? "md:justify-center md:py-4 md:pr-4" : ""}`}>
        <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>{project.category}</span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Live
          </span>
        </div>

        <h3 className={`mt-3 font-semibold tracking-tight ${featured ? "text-3xl" : "text-xl"}`}>
          {/* Stretched button: the whole card opens the details. */}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${project.name}, view project details`}
            className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {project.name}
          </button>
        </h3>
        <p className="mt-2 text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex items-center gap-5 pt-6 text-sm">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
          >
            Live site <ArrowUpRightIcon size={13} />
            <span className="sr-only">for {project.name}</span>
          </a>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <GithubLogoIcon size={14} /> Code
              <span className="sr-only">for {project.name}</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  // The open project is read from the URL, so ?project=slug links open it directly.
  const slug = useSyncExternalStore(subscribeProject, getProjectSnapshot, getProjectServerSnapshot);
  const open = projects.find((p) => p.slug === slug) ?? null;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} featured={i === 0} onOpen={() => setProject(p.slug)} />
        ))}
      </div>
      <ProjectDialog project={open} onClose={() => setProject(null)} />
    </>
  );
}
