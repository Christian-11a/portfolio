"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useMotionReduced } from "@/lib/motionPref";

/**
 * Animations play by default, even when the OS asks for reduced motion, because they
 * are short and light. Visitors can turn them off with the footer switch instead.
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduced = useMotionReduced();
  // Motion reads reducedMotion when an element mounts, so remount the tree when the choice changes.
  // App state survives: theme and motion live on <html>, the open project lives in the URL.
  return (
    <MotionConfig key={reduced ? "reduced" : "full"} reducedMotion={reduced ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
