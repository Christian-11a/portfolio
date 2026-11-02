"use client";

import { ArrowUpRightIcon, GithubLogoIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/site";
import { CopyButton } from "./CopyButton";

/** Native modal dialog with the full story of one project. */
export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="project-dialog-title"
      className="project-dialog m-auto max-h-[90dvh] w-[min(920px,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg backdrop:bg-transparent"
    >
      {project && (
        <article>
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/85 px-5 py-3 backdrop-blur-md sm:px-7">
            <p className="font-mono text-xs text-muted">
              {project.category}, {project.year}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <XIcon size={16} />
            </button>
          </div>

          <div className="p-5 sm:p-7">
            <div className="overflow-hidden rounded-xl border border-line">
              <Image
                src={`/projects/${project.slug}.png`}
                alt={`${project.name} home page`}
                width={1280}
                height={800}
                sizes="(min-width: 960px) 860px, 100vw"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>

            <div className="mt-7 grid gap-8 md:grid-cols-[1fr_220px]">
              <div>
                <h3 id="project-dialog-title" className="text-3xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-1 text-muted">{project.tagline}</p>
                <p className="mt-5 leading-relaxed">{project.overview}</p>

                {project.contributions && (
                  <>
                    <h4 className="mt-8 font-medium">What I built</h4>
                    <ul className="mt-3 space-y-2.5 text-muted">
                      {project.contributions.map((c) => (
                        <li key={c} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="mt-8 font-medium">Highlights</h4>
                <ul className="mt-3 space-y-2.5 text-muted">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                {project.designNotes && (
                  <>
                    <h4 className="mt-8 font-medium">Design notes</h4>
                    <ul className="mt-3 space-y-2.5 text-muted">
                      {project.designNotes.map((n) => (
                        <li key={n} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <aside className="space-y-6 text-sm">
                <div>
                  <p className="text-muted">Role</p>
                  <p className="mt-1">{project.role}</p>
                </div>
                <div>
                  <p className="text-muted">Built with</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-2">
                  <CopyButton text={window.location.href} label="Copy link to this project" className="justify-center" />
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-4 py-2.5 font-medium text-bg active:scale-[0.98]"
                  >
                    Visit live site <ArrowUpRightIcon size={15} />
                  </a>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 transition-colors hover:border-line-strong active:scale-[0.98]"
                    >
                      <GithubLogoIcon size={15} /> Source code
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </article>
      )}
    </dialog>
  );
}
