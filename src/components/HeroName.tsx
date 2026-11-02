"use client";

import { motion } from "motion/react";
import { useMotionReduced } from "@/lib/motionPref";

/** The name rises in letter by letter on first load. */
export function HeroName({ text }: { text: string }) {
  const reduced = useMotionReduced();
  const words = text.split(" ");
  let i = 0;

  return (
    <h1 id="hero-title" className="text-5xl leading-[1.05] font-semibold tracking-tighter sm:text-6xl lg:text-7xl">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {[...word].map((char) => {
              const delay = 0.15 + i++ * 0.035;
              return (
                <motion.span
                  key={`${char}-${delay}`}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              );
            })}
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </h1>
  );
}
