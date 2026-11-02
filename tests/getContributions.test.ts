import { beforeEach, describe, expect, it, vi } from "vitest";

const cacheLife = vi.fn();
const loadContributions = vi.fn();
vi.mock("next/cache", () => ({ cacheLife }));
vi.mock("@/lib/contributions", () => ({ loadContributions }));

const { getContributions } = await import("@/lib/getContributions");

describe("getContributions cache lifetime", () => {
  beforeEach(() => {
    cacheLife.mockReset();
    loadContributions.mockReset();
  });

  it("caches successful data for days", async () => {
    loadContributions.mockResolvedValue({ total: 1, weeks: [] });
    await getContributions("x");
    expect(cacheLife).toHaveBeenCalledExactlyOnceWith("days");
  });

  it("retries failures after minutes, not days", async () => {
    loadContributions.mockResolvedValue(null);
    await getContributions("x");
    expect(cacheLife).toHaveBeenCalledExactlyOnceWith("minutes");
  });
});
