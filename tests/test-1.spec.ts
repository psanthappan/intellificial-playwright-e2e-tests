import { test, expect } from "@playwright/test";

test("Should login successfully", async ({ page }) => {
  // Landing pag
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  // Click Make Appoitment
  await page.getByRole("link", { name: "Make Appointment" }).click();

  // Login
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  // Assert
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();

  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByText('Login failed! Please ensure').click();
  await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
  
});
