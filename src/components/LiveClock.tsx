"use client";

import { useEffect, useState } from "react";
import { formatPHDateTime } from "@/lib/time";

/** Ticking Manila date and time. Renders a placeholder until mounted to avoid hydration mismatch. */
export function LiveClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(formatPHDateTime(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{now ?? " "}</span>;
}
