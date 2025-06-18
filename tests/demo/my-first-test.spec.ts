import { test, expect } from "@playwright/test";

test("Should launch the homepage", async ({ page }) => {
  // Launch the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Asssert the title
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Asert the page heading
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});
