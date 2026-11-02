"use client";

import { BellIcon, BellSlashIcon } from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent, type ReactNode } from "react";
import { useMotionReduced } from "@/lib/motionPref";
import { Dock } from "./Dock";

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

function SegmentedControl() {
  const options = ["Overview", "Activity", "Settings"];
  const [active, setActive] = useState(options[0]);

  return (
    // A visual demo, so plain toggle buttons rather than a tablist with no panels.
    <div role="group" aria-label="Segmented control demo" className="inline-flex rounded-full border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={active === o}
          onClick={() => setActive(o)}
          className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${active === o ? "text-bg" : "text-muted hover:text-fg"}`}
        >
          {active === o && (
            <motion.span layoutId="craft-segment" transition={spring} className="absolute inset-0 rounded-full bg-fg" />
          )}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  );
}

function MagneticButton() {
  const reduced = useMotionReduced();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={() => (x.set(0), y.set(0))} className="grid size-full place-items-center">
      <motion.button
        type="button"
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.94 }}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg shadow-[0_10px_30px_-10px_var(--accent)]"
      >
        Hover near me
      </motion.button>
    </div>
  );
}

function SpringToggle() {
  const [on, setOn] = useState(true);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3 text-sm"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-muted">
        {on ? <BellIcon size={16} /> : <BellSlashIcon size={16} />}
      </span>
      {/* The accessible name stays "Notifications"; aria-checked carries the state. */}
      <span className="w-28 text-left">
        Notifications<span aria-hidden="true"> {on ? "on" : "off"}</span>
      </span>
      <span className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${on ? "justify-end bg-accent" : "justify-start bg-line-strong"}`}>
        <motion.span layout transition={spring} className="size-5 rounded-full bg-[#fafafa] shadow" />
      </span>
    </button>
  );
}

function Tile({
  title,
  body,
  stage,
  className = "",
  stageClass = "",
}: {
  title: string;
  body: string;
  stage: ReactNode;
  className?: string;
  stageClass?: string;
}) {
  const reduced = useMotionReduced();
  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
    >
      <div className={`grid h-48 place-items-center border-b border-line ${stageClass}`}>{stage}</div>
      <figcaption className="p-5">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </figcaption>
    </motion.figure>
  );
}

/** Small, real interface details: proof of craft beyond screenshots. */
export function Craft() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Tile
        className="md:col-span-2"
        stageClass="hatch"
        stage={<SegmentedControl />}
        title="Segmented control"
        body="The active pill glides between options with a spring, so the change is easy to follow."
      />
      <Tile
        stageClass="bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_70%)]"
        stage={<MagneticButton />}
        title="Magnetic button"
        body="Leans toward the cursor and settles back. Off on touch screens and when motion is off."
      />
      <Tile
        stageClass="bg-[linear-gradient(135deg,var(--surface-2),var(--surface))]"
        stage={<SpringToggle />}
        title="Spring switch"
        body="A real switch role with a physical feel. The icon and label update together."
      />
      {/* The dock gets the wide slot so magnified icons have room to grow. */}
      <Tile
        className="md:col-span-2"
        stageClass="bg-surface-2"
        stage={<Dock />}
        title="Dock magnification"
        body="Glide across the icons. Each one swells with a spring based on how close the cursor is."
      />
    </div>
  );
}
