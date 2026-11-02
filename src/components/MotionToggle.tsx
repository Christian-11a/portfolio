"use client";

import { setMotion, useMotionReduced } from "@/lib/motionPref";

/** Footer switch: lets anyone who gets motion sick turn the animations off. */
export function MotionToggle() {
  const reduced = useMotionReduced();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={() => setMotion(reduced ? "full" : "reduced")}
      className="inline-flex items-center gap-2.5 rounded-full px-2 py-1.5 transition-colors hover:text-fg"
    >
      <span
        aria-hidden="true"
        className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${reduced ? "justify-end bg-accent" : "justify-start bg-line-strong"}`}
      >
        <span className="size-3 rounded-full bg-[#fafafa]" />
      </span>
      Reduce motion
    </button>
  );
}
