import { test, expect } from "@playwright/test";
import LoginPage from "../page-objects/login.page";
import constants from "../../data/constants.json";

test.describe("Login functionality", () => {
  test("Should login successfully", async ({ page }) => {
    // Reading data from JSON
    console.log(`>> Reading the JSON file: ${JSON.stringify(constants)}`);

    // Create a login page instance
    const loginPage = new LoginPage(page);

    // Get env variables
    const URL = process.env.URL;
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;

    if (!URL || !username || !password) {
      throw new Error("Invalid creds passed..");
    }

    // Launch the home page
    await loginPage.launchHomePage(URL);
    await loginPage.login(username, password);
  });

  // TODO: More tests to follow
});
