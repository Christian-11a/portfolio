import { projects } from "@/content/site";
import { ProjectGrid } from "./ProjectGrid";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="work"
      title="Selected work"
      count={projects.length}
      intro="Full-stack and frontend projects, from my team thesis to open-source tools. Open any project for the full story."
    >
      <ProjectGrid projects={projects} />
    </Section>
  );
}
