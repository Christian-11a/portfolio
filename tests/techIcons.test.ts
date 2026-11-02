import { describe, expect, it } from "vitest";
import { stack } from "@/content/site";
import { luminance, techIcon } from "@/lib/techIcons";

describe("techIcon", () => {
  it("returns null for items without a logo", () => {
    expect(techIcon("Xendit")).toBeNull();
  });

  it("keeps saturated brand colors for hover", () => {
    expect(techIcon("TypeScript")?.hover).toBe("#3178C6");
  });

  it("falls back to the text color for near-black brands", () => {
    expect(techIcon("Next.js")?.hover).toBe("var(--fg)");
    expect(techIcon("Vercel")?.hover).toBe("var(--fg)");
  });

  it("computes luminance at the extremes", () => {
    expect(luminance("000000")).toBe(0);
    expect(luminance("FFFFFF")).toBeCloseTo(1);
  });

  it("has a logo for most stack items", () => {
    const items = stack.flatMap((g) => g.items);
    const withIcon = items.filter((i) => techIcon(i));
    expect(withIcon.length / items.length).toBeGreaterThan(0.85);
  });
});
