import { test, expect } from "@playwright/test";
import LoginPage from '../page-objects/login.page'

test.describe("Login functionality", () => {
  test("Should login successfully", async ({ page }) => {
    // Create a login page instance
    const loginPage = new LoginPage(page);

    // Launch the home page
    await loginPage.launchHomePage("https://katalon-demo-cura.herokuapp.com/");
    await loginPage.login("John Doe", "ThisIsNotAPassword");
  });

  // TODO: More tests to follow
});
