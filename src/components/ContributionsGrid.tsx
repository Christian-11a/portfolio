import { profile } from "@/content/site";
import { getContributions } from "@/lib/getContributions";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";

const levelClass = [
  "bg-fg opacity-[0.07]",
  "bg-accent opacity-30",
  "bg-accent opacity-55",
  "bg-accent opacity-80",
  "bg-accent",
];

export async function ContributionsGrid() {
  const data = await getContributions(profile.githubUser);
  if (!data) return null;

  return (
    <section aria-label="GitHub contributions" className={`${container} pb-16`}>
      <Reveal className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        {/* rtl scroller: on narrow screens the newest weeks are visible first */}
        <div className="overflow-x-auto [direction:rtl]">
          <div
            className="flex gap-[3px] [direction:ltr]"
            role="img"
            aria-label={`${data.total} GitHub contributions in the last year`}
          >
            {data.weeks.map((week, i) => (
              <div key={i} className="flex min-w-[8px] flex-1 flex-col gap-[3px]">
                {week.map((day, j) => (
                  <span
                    key={j}
                    title={day ? `${day.count} on ${day.date}` : undefined}
                    className={`aspect-square w-full rounded-[3px] ${day ? levelClass[day.level] : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted">
          <a
            href={`https://github.com/${profile.githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg"
          >
            {data.total.toLocaleString("en-US")} contributions in the last year
          </a>
          <span className="hidden items-center gap-1 sm:flex" aria-hidden="true">
            Less
            {levelClass.map((c) => (
              <span key={c} className={`size-[10px] rounded-[3px] ${c}`} />
            ))}
            More
          </span>
        </div>
      </Reveal>
    </section>
  );
}
