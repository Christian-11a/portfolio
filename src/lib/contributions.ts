export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type ContributionData = { total: number; weeks: (Day | null)[][] };

const API = "https://github-contributions-api.jogruber.de/v4";

/** Groups days into Sunday-first columns of 7, padding gaps with null. */
export function toWeeks(days: Day[]): (Day | null)[][] {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  for (const d of days) {
    const weekday = new Date(`${d.date}T00:00:00Z`).getUTCDay();
    if (week.length === 0 && weeks.length === 0) {
      week = Array(weekday).fill(null);
    } else if (weekday === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    week.push(d);
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function isDay(v: unknown): v is Day {
  const d = v as Day;
  return (
    typeof d?.date === "string" &&
    Number.isInteger(d.count) &&
    d.count >= 0 &&
    Number.isInteger(d.level) &&
    d.level >= 0 &&
    d.level <= 4
  );
}

/** Fetches last-year contributions. Returns null on any failure so the grid can hide itself. */
export async function loadContributions(
  user: string,
  fetchFn: typeof fetch = fetch,
): Promise<ContributionData | null> {
  try {
    const res = await fetchFn(`${API}/${encodeURIComponent(user)}?y=last`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const body = await res.json();
    const total = body?.total?.lastYear;
    const days = body?.contributions;
    if (typeof total !== "number" || !Array.isArray(days) || !days.every(isDay)) return null;
    return { total, weeks: toWeeks(days) };
  } catch {
    return null;
  }
}
