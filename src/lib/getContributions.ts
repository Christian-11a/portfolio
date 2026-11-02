import { cacheLife } from "next/cache";
import { loadContributions } from "./contributions";

/** Cached wrapper: the grid refreshes about once a day; a failed fetch is retried after minutes. */
export async function getContributions(user: string) {
  "use cache";
  const data = await loadContributions(user);
  if (data) cacheLife("days");
  else cacheLife("minutes");
  return data;
}
