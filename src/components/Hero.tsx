import Image from "next/image";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ClockIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { links, profile } from "@/content/site";
import { container } from "@/lib/ui";
import { Greeting } from "./Greeting";
import { HeroName } from "./HeroName";
import { LinkRow } from "./LinkRow";
import { LiveClock } from "./LiveClock";
import { TiltCard } from "./TiltCard";

function Info({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex min-w-0 items-center gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted">
        {icon}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </li>
  );
}

export function Hero() {
  const email = links.find((l) => l.kind === "email")?.href;

  return (
    <section id="top" aria-labelledby="hero-title" className={`${container} pt-10 pb-16 sm:pt-14`}>
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="mb-4 font-mono text-xs text-muted">
            <Greeting />
          </p>
          <HeroName text={profile.name} />
          <p className="mt-5 max-w-[48ch] text-lg text-muted">
            {profile.headline} <span className="text-fg/80">{profile.pitch}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
            >
              View work
              <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-line-strong hover:bg-surface active:scale-[0.98]"
            >
              Get in touch
            </a>
          </div>
        </div>

        <TiltCard className="order-first justify-self-start md:order-none md:justify-self-end">
          <figure className="w-40 rounded-[20px] border border-line bg-surface p-2 shadow-[0_20px_60px_-25px_rgb(0_0_0/0.5)] sm:w-48 md:w-60 md:p-2.5 lg:w-64">
            {/* The source photo has a lot of wall above the head, so zoom in around the face and shoulders. */}
            <div className="overflow-hidden rounded-xl">
              <Image
                src={profile.photo}
                alt={`Photo of ${profile.name}`}
                width={900}
                height={1112}
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 360px, 288px"
                priority
                className="aspect-[4/5] w-full origin-[50%_55%] scale-[1.45] object-cover"
              />
            </div>
          </figure>
        </TiltCard>
      </div>

      <ul aria-label="Overview" className="mt-12 grid gap-4 border-t border-line pt-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Info icon={<CodeIcon size={15} />}>{profile.role}</Info>
        <Info icon={<MapPinIcon size={15} />}>{profile.location}</Info>
        <Info icon={<ClockIcon size={15} />}>
          <LiveClock /> <span className="font-mono text-xs text-muted">GMT+8</span>
        </Info>
        <Info icon={<BriefcaseIcon size={15} />}>Open to internships and junior roles</Info>
        {email && (
          <Info icon={<EnvelopeSimpleIcon size={15} />}>
            <a href={email} className="underline-offset-4 hover:underline">
              {email.replace("mailto:", "")}
            </a>
          </Info>
        )}
      </ul>

      <LinkRow />
    </section>
  );
}
