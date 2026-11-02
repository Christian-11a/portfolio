import { GraduationCapIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { education, principles, profile } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  const { school, degree, status, expected, thesis } = education;

  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <dl className="space-y-5 text-lg">
            <div>
              <dt className="font-mono text-sm text-muted">Now</dt>
              <dd className="mt-1">{profile.now}</dd>
            </div>
            <div>
              <dt className="font-mono text-sm text-muted">Offline</dt>
              <dd className="mt-1">{profile.offline}</dd>
            </div>
          </dl>

          <h3 className="mt-12 font-medium">How I work</h3>
          <ol className="mt-5 space-y-6">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="font-mono text-sm text-accent">{i + 1}.</span>
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-1 text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCapIcon size={22} />
              </span>
              <div>
                <h3 className="text-lg font-medium">{school}</h3>
                <p className="text-muted">{degree}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {status}, {expected.toLowerCase()}
                </p>
              </div>
            </div>

            <details open className="group mt-6 border-t border-line pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
                {thesis.title}
                <PlusIcon
                  size={16}
                  aria-hidden="true"
                  className="text-muted transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-muted">{thesis.summary}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {thesis.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
