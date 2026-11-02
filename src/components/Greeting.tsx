"use client";

import { useEffect, useState } from "react";
import { getGreeting, getPHHour, type Greeting as GreetingText } from "@/lib/time";

/** Time-of-day greeting based on Manila time. */
export function Greeting() {
  const [text, setText] = useState<GreetingText | null>(null);

  useEffect(() => {
    const tick = () => setText(getGreeting(getPHHour(new Date())));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-muted">{text ? `${text} from the Philippines.` : " "}</span>;
}
