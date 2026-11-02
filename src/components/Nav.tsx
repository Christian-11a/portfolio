"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { container, navSections } from "@/lib/ui";
import { ThemeToggle } from "./ThemeToggle";

type SectionId = (typeof navSections)[number]["id"];

/** Tracks which nav section is currently in view. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Back at the hero: no nav item is active.
          setActive(entry.target.id === "top" ? null : (entry.target.id as SectionId));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of [{ id: "top" }, ...navSections]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // The focused menu link is about to unmount, so return focus to the toggle.
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="rule-bottom sticky top-0 z-40 bg-bg/75 backdrop-blur-md">
      <nav aria-label="Main" className={`${container} flex h-16 items-center justify-between`}>
        <a href="#top" className="font-mono text-sm font-semibold tracking-widest" aria-label="Christian Esquillo, back to top">
          CE<span className="text-accent">_</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map(({ id, label }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={`relative z-10 block rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-line bg-surface-2"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg md:hidden"
          >
            {open ? <XIcon size={16} /> : <ListIcon size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`${container} grid gap-1 border-t border-line pt-3 pb-5 md:hidden`}
          >
            {navSections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className={`block rounded-xl px-3 py-2.5 text-base ${
                    active === id ? "bg-surface-2 text-fg" : "text-muted"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
