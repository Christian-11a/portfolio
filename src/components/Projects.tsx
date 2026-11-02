import { projects } from "@/content/site";
import { ProjectGrid } from "./ProjectGrid";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="work"
      title="Selected work"
      count={projects.length}
      intro="Live projects, from open-source tools to my team thesis. Open any project for the full story."
    >
      <ProjectGrid projects={projects} />
    </Section>
  );
}
