"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useMotionReduced } from "@/lib/motionPref";
import { techIcon } from "@/lib/techIcons";

// Six items keep the resting dock narrow enough for small phones.
const items = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "GSAP"];

const BASE = 38;
const PEAK = 68;
const REACH = 130;

function DockIcon({ name, mouseX }: { name: string; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLLIElement>(null);
  const icon = techIcon(name);

  // Distance from the cursor to this icon's center drives its size.
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - (box.left + box.width / 2) : Infinity;
  });
  const size = useSpring(useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE]), {
    mass: 0.1,
    stiffness: 170,
    damping: 13,
  });

  return (
    <motion.li
      ref={ref}
      style={{ width: size, height: size }}
      className="group/dock relative grid shrink-0 place-items-center rounded-xl border border-line bg-surface shadow-[0_6px_16px_-8px_rgb(0_0_0/0.4)]"
    >
      <span className="pointer-events-none absolute -top-8 rounded-md bg-fg px-2 py-0.5 text-[11px] whitespace-nowrap text-bg opacity-0 transition-[opacity,translate] duration-150 group-hover/dock:-translate-y-0.5 group-hover/dock:opacity-100">
        {name}
      </span>
      {icon && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[45%]" style={{ fill: icon.hover }}>
          <path d={icon.path} />
        </svg>
      )}
      <span className="sr-only">{name}</span>
    </motion.li>
  );
}

/** macOS-style dock: icons swell as the cursor passes over them. */
export function Dock() {
  const reduced = useMotionReduced();
  const mouseX = useMotionValue(Infinity);

  return (
    <ul
      aria-label="Dock magnification demo"
      onPointerMove={(e) => !reduced && e.pointerType === "mouse" && mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(Infinity)}
      className="flex h-20 items-end gap-2 rounded-2xl border border-line bg-bg/60 px-3 pb-2.5 backdrop-blur-sm"
    >
      {items.map((name) => (
        <DockIcon key={name} name={name} mouseX={mouseX} />
      ))}
    </ul>
  );
}
