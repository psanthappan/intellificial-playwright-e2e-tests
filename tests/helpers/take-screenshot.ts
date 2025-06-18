import { test, expect } from "@playwright/test";

export async function takeScreenshot({ page }, screenshotName) {
  // Capture the screenshot
  const screenshot = await page.screenshot({ fullPage: true });
  // Attach it to the report
  await test.info().attach(screenshotName, {
    body: screenshot,
    contentType: "image/png",
  });
}
