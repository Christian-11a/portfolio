import { describe, expect, it } from "vitest";
import { readProject, withProject } from "@/lib/projectParam";

describe("project URL param", () => {
  it("reads the open project from the query string", () => {
    expect(readProject("?project=pagekit")).toBe("pagekit");
    expect(readProject("")).toBeNull();
  });

  it("adds the project while keeping the hash and other params", () => {
    expect(withProject("https://x.dev/?utm=li#work", "taskbuddy")).toBe("https://x.dev/?utm=li&project=taskbuddy#work");
  });

  it("removes the project param on close", () => {
    expect(withProject("https://x.dev/?project=taskbuddy", null)).toBe("https://x.dev/");
  });
});
