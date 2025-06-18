import { test, expect } from "@playwright/test";
import { takeScreenshot } from "../helpers/take-screenshot";

test.describe("Login functionality", { annotation: { type: "EPIC", description: "User Story: JIRA-1234" } }, () => {
  test.beforeEach(async ({ page }) => {
    // 1. Go to home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Assert if the title and header text
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // Take screenshot
    await takeScreenshot({ page }, "Screenshot-1");
  });

  // Successful login
  test("should login succcessfully", { tag: "@smoke" }, async ({ page }) => {
    // Login
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  // Negative scenario (Skip test for firefox)
  test("should not login succcessfully", async ({ page, browserName }) => {
    // Skip test for firefox
    test.skip(browserName === "firefox", "Open bug JIRA-1234"); // test.skip(condition, description)
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByLabel("Username").fill("John Carlo");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Login failed! Please ensure")).toBeVisible();
  });
});
