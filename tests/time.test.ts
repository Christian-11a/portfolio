import { describe, expect, it } from "vitest";
import { formatPHDateTime, getGreeting, getPHHour } from "@/lib/time";

describe("getGreeting", () => {
  it.each([
    [5, "Good morning"],
    [11, "Good morning"],
    [12, "Good afternoon"],
    [17, "Good afternoon"],
    [18, "Good evening"],
    [2, "Good evening"],
  ])("hour %i → %s", (hour, expected) => {
    expect(getGreeting(hour)).toBe(expected);
  });
});

describe("Manila time", () => {
  const d = new Date("2026-11-02T13:14:00Z"); // 9:14 PM in Manila

  it("formats date and time in Asia/Manila", () => {
    const s = formatPHDateTime(d);
    expect(s).toContain("9:14");
    expect(s).toContain("PM");
    expect(s).toContain("2 Nov");
  });

  it("reads the hour in Asia/Manila", () => {
    expect(getPHHour(d)).toBe(21);
  });
});
