import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { links } from "@/content/site";
import { container } from "@/lib/ui";
import { CopyButton } from "./CopyButton";
import { Divider } from "./Section";
import { Reveal } from "./Reveal";

export function Contact() {
  const email = links.find((l) => l.kind === "email")?.href;
  if (!email) return null;
  const address = email.replace("mailto:", "");

  return (
    <>
      <Divider />
      <section id="contact" aria-labelledby="contact-title" className={`${container} py-16 sm:py-24`}>
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)]"
          />
          <h2 id="contact-title" className="relative max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something good.
          </h2>
          <p className="relative mt-4 max-w-[52ch] text-lg text-muted">
            Open to internships, junior developer roles and freelance projects. Email is the best way to reach me.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <a
              href={email}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg active:scale-[0.98]"
            >
              Get in touch
              <ArrowUpRightIcon size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <CopyButton text={address} label="Copy email" className="py-2.5" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
