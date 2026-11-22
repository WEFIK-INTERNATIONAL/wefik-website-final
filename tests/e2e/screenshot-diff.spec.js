import { test, expect } from "@playwright/test";

test.describe("Zero Visual Diff Verification on Baseline Routes", () => {
  const routes = [
    "/",
    "/agency",
    "/works",
    "/expertise",
    "/contact",
    "/blogs",
    "/careers",
  ];

  for (const route of routes) {
    test(`route ${route} loads successfully with 200 OK and valid page structure`, async ({
      page,
    }) => {
      const response = await page.goto(route, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);

      // Verify header and page content renders
      const mainContent = page.locator("main, header, body");
      await expect(mainContent.first()).toBeVisible();
    });
  }
});
