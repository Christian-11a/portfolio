import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;

// Runs against the production build in the installed Microsoft Edge.
// Set PLAYWRIGHT_CHANNEL=chrome to use installed Chrome instead.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "msedge",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Edge"], viewport: { width: 1280, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: process.env.PLAYWRIGHT_CHANNEL ?? "msedge" } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    // Locally, reuse a running server; in CI always start fresh against the new build.
    reuseExistingServer: !process.env.CI,
  },
});
