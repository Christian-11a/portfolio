import { describe, expect, it } from "vitest";
import { siteUrl } from "@/lib/siteUrl";

describe("siteUrl", () => {
  it("prefers an explicit site URL and trims a trailing slash", () => {
    expect(siteUrl({ NEXT_PUBLIC_SITE_URL: "https://christian.dev/", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" })).toBe(
      "https://christian.dev",
    );
  });

  it("falls back to the Vercel production URL", () => {
    expect(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "christian-esquillo.vercel.app" })).toBe(
      "https://christian-esquillo.vercel.app",
    );
  });

  it("uses localhost during local development", () => {
    expect(siteUrl({})).toBe("http://localhost:3000");
  });
});
