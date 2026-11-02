import { describe, expect, it } from "vitest";
import * as site from "@/content/site";
import { links, projects } from "@/content/site";

describe("site content", () => {
  it("features the five projects, thesis first", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "taskbuddy",
      "imageprep",
      "pagekit",
      "amara-bakery",
      "stillframe",
    ]);
  });

  it("labels every project with a category", () => {
    for (const p of projects) expect(p.category.length).toBeGreaterThan(0);
  });

  it("gives every project enough detail for its detail view", () => {
    for (const p of projects) {
      expect(p.overview.length).toBeGreaterThan(40);
      expect(p.highlights.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("spells out my part of the team thesis", () => {
    const taskbuddy = projects.find((p) => p.slug === "taskbuddy")!;
    expect(taskbuddy.role).toMatch(/lead frontend/i);
    expect(taskbuddy.contributions?.length).toBeGreaterThanOrEqual(3);
  });

  it("gives every project an https live URL", () => {
    for (const p of projects) expect(p.liveUrl).toMatch(/^https:\/\//);
  });

  it("hides the private Stillframe repo and links the rest", () => {
    for (const p of projects) {
      if (p.slug === "stillframe") expect(p.repoUrl).toBeNull();
      else expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/Christian-11a\//);
    }
  });

  it("hides the resume until a PDF exists", () => {
    expect(links.find((l) => l.kind === "resume")!.href).toBeNull();
  });

  it("uses the public GitHub email", () => {
    expect(links.find((l) => l.kind === "email")!.href).toBe(
      "mailto:christianesquillo01@gmail.com",
    );
  });

  it("uses no em or en dashes in any visible copy", () => {
    expect(JSON.stringify(site)).not.toMatch(/[–—]/);
  });
});
