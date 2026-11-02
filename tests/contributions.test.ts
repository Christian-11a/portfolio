import { describe, expect, it } from "vitest";
import { loadContributions, toWeeks, type Day } from "@/lib/contributions";

const day = (date: string, count = 1): Day => ({ date, count, level: 1 });

describe("toWeeks", () => {
  it("pads the first week so columns start on Sunday", () => {
    // 2026-11-04 is a Wednesday
    const weeks = toWeeks([day("2026-11-04"), day("2026-11-05"), day("2026-11-06")]);
    expect(weeks).toHaveLength(1);
    expect(weeks[0]).toHaveLength(7);
    expect(weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(weeks[0][3]?.date).toBe("2026-11-04");
    expect(weeks[0][6]).toBeNull();
  });

  it("starts a new column every Sunday", () => {
    const weeks = toWeeks([day("2026-11-07"), day("2026-11-08")]); // Sat, Sun
    expect(weeks).toHaveLength(2);
    expect(weeks[1][0]?.date).toBe("2026-11-08");
  });
});

describe("loadContributions", () => {
  it("returns null when the response is not OK", async () => {
    const f = async () => ({ ok: false, json: async () => ({}) }) as Response;
    expect(await loadContributions("x", f)).toBeNull();
  });

  it("returns null when fetch throws", async () => {
    const f = async (): Promise<Response> => {
      throw new Error("offline");
    };
    expect(await loadContributions("x", f)).toBeNull();
  });

  it("returns null on malformed JSON", async () => {
    const f = async () => ({ ok: true, json: async () => ({ nope: 1 }) }) as Response;
    expect(await loadContributions("x", f)).toBeNull();
  });

  it.each([
    [{ date: "2026-11-01", count: -3, level: 1 }],
    [{ date: "2026-11-01", count: 2, level: 999 }],
    [{ date: "2026-11-01", count: 1.5, level: 1 }],
  ])("rejects out-of-range values %o", async (bad) => {
    const body = { total: { lastYear: 1 }, contributions: [bad] };
    const f = async () => ({ ok: true, json: async () => body }) as Response;
    expect(await loadContributions("x", f)).toBeNull();
  });

  it("parses the total and weeks", async () => {
    const body = {
      total: { lastYear: 804 },
      contributions: [
        { date: "2026-11-01", count: 3, level: 2 },
        { date: "2026-11-02", count: 0, level: 0 },
      ],
    };
    const f = async () => ({ ok: true, json: async () => body }) as Response;
    const data = await loadContributions("Christian-11a", f);
    expect(data?.total).toBe(804);
    expect(data?.weeks[0][0]?.count).toBe(3);
  });
});
