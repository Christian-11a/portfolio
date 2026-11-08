// Builds the CV from cv/resume.html into two PDFs:
//   public/resume.pdf                 public copy for the website (no phone number)
//   cv/out/Christian-Esquillo-CV.pdf  private copy with the phone from cv/private.json (git-ignored)
// Usage: npm run cv
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const template = readFileSync(join(root, "cv", "resume.html"), "utf8");

const privatePath = join(root, "cv", "private.json");
const phone = existsSync(privatePath) ? JSON.parse(readFileSync(privatePath, "utf8")).phone : null;

const builds = [{ out: join(root, "public", "resume.pdf"), phone: null }];
if (phone) builds.push({ out: join(root, "cv", "out", "Christian-Esquillo-CV.pdf"), phone });

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL ?? "msedge" });
try {
  for (const { out, phone: number } of builds) {
    const html = template.replace(
      "<!--PHONE-->",
      number ? `<a href="tel:${number.replace(/\s/g, "")}">${number}</a>` : "",
    );
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    mkdirSync(dirname(out), { recursive: true });
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });

    const pages = (readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    console.log(`${out}: ${pages} page(s)${number ? ", with phone" : ", public"}`);
    if (pages !== 1) process.exitCode = 1;
    await page.close();
  }
} finally {
  await browser.close();
}
