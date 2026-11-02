"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type State = "idle" | "copied" | "failed";

/** Copies text to the clipboard and morphs its label to confirm. */
export function CopyButton({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const id = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(id);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const shown = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 overflow-hidden rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-line-strong active:scale-[0.97] ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className={`inline-flex items-center gap-2 ${state === "copied" ? "text-accent" : ""}`}
        >
          {state === "copied" ? <CheckIcon size={15} weight="bold" /> : <CopyIcon size={15} />}
          {shown}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}
