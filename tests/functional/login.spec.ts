import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Launch the homepage", async ({ page }) => {
    // Launch the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Asssert the title
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Asert the page heading
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // Click Make Appoitment
    await page.getByRole("link", { name: "Make Appointment" }).click();
  });

  // Successful login
  test("Should login successfully", async ({ page }) => {
    // Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert
    await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
  });

  // Unsucessful logic

  test("Should not login successfully", async ({ page }) => {
    // Login
    await page.getByLabel("Username").fill("John");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert
    await expect(page.locator("#login")).toContainText("Login failed! Please ensure the username and password are valid.");
  });
});
