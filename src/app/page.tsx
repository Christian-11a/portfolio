import { Suspense } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { ContributionsGrid } from "@/components/ContributionsGrid";
import { Cover } from "@/components/Cover";
import { Craft } from "@/components/Craft";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    // The framed content column: thin lines on both sides, hairlines across at section edges.
    <div className="relative mx-auto min-h-dvh max-w-[1080px] border-line min-[1081px]:border-x">
      <Nav />
      <main id="main">
        <Cover />
        <Hero />
        <Suspense fallback={null}>
          <ContributionsGrid />
        </Suspense>
        <Projects />
        <Section
          id="craft"
          title="Craft"
          intro="Small interface details I care about. These are live, so try them."
        >
          <Craft />
        </Section>
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
