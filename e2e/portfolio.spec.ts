import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Vercel Analytics only exists once deployed; stub its script so local runs stay clean.
  await page.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  (page as unknown as { errors: string[] }).errors = errors;
});

test.afterEach(async ({ page }) => {
  const errors = (page as unknown as { errors: string[] }).errors;
  expect(errors, "no console or page errors").toEqual([]);
});

test("cards and headings have clean accessible names", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "TaskBuddy, view project details", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected work (5)", exact: true })).toBeVisible();
});

test("home page renders the essentials", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Christian Esquillo/);
  await expect(page.getByRole("heading", { level: 1, name: "Christian Esquillo" })).toBeVisible();
  await expect(page.getByRole("img", { name: /CE monogram/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Selected work/ })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(5);
});

test("no sideways scrolling", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("project details open, update the URL and close with Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "PageKit, view project details", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "PageKit" })).toBeVisible();
  await expect(page).toHaveURL(/\?project=pagekit/);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page).not.toHaveURL(/project=/);
});

test("a shared project link opens that project", async ({ page }) => {
  await page.goto("/?project=taskbuddy");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "What I built" })).toBeVisible();
});

test("theme choice survives a reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
});

test("reduce motion switch turns animations off and is remembered", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("switch", { name: "Reduce motion" });
  await expect(toggle).toHaveAttribute("aria-checked", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});

test("with motion off, the hero name appears instantly instead of animating", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("motion", "reduced"));
  await page.goto("/");
  await page.waitForTimeout(150);
  // The animated version fades letters in over about a second; with motion off they are fully visible right away.
  const opacities = await page.$$eval("#hero-title [aria-hidden] span span", (els) =>
    els.map((e) => Number(getComputedStyle(e).opacity)),
  );
  expect(opacities.length).toBeGreaterThan(10);
  expect(Math.min(...opacities)).toBe(1);
});

test("unknown pages show the styled 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  // The browser logs the document's own 404 as a console error; that one is expected here.
  const errors = (page as unknown as { errors: string[] }).errors;
  errors.splice(0, errors.length, ...errors.filter((e) => !e.includes("404 (Not Found)")));
  await expect(page.getByRole("heading", { name: "This page does not exist." })).toBeVisible();
  await page.getByRole("link", { name: /Back to the portfolio/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Christian Esquillo" })).toBeVisible();
});

test("the Resume button downloads the CV PDF", async ({ page, request }) => {
  await page.goto("/");
  const resume = page.getByRole("link", { name: "Resume" });
  await expect(resume).toHaveAttribute("href", "/resume.pdf");
  const pdf = await request.get("/resume.pdf");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

test("SEO files are served", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect(await (await request.get("/sitemap.xml")).text()).toContain("<urlset");
  const og = await request.get("/opengraph-image");
  expect(og.ok()).toBe(true);
  expect(og.headers()["content-type"]).toContain("image/png");
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, navigates and returns focus on Escape", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Craft" }).focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});
