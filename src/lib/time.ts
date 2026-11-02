export type Greeting = "Good morning" | "Good afternoon" | "Good evening";

const TIME_ZONE = "Asia/Manila";

export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getPHHour(d: Date): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    hourCycle: "h23",
  }).format(d);
  return Number(hour);
}

/** e.g. "2 Nov 2026 · 9:14 PM" */
export function formatPHDateTime(d: Date): string {
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
  return `${date} · ${time}`;
}
