import BasePage from "./basepage.js";
import { expect, type Locator, type Page } from "@playwright/test";

class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Elements */
  get makeAppointmentBtn() {
    return this.page.getByRole("link", { name: "Make Appointment" });
  }

  get usernameInput() {
    return this.page.getByLabel("Username");
  }

  get passwordInput() {
    return this.page.getByLabel("Password");
  }

  get loginButton() {
    return this.page.locator('button[type="submit"]');
  }

  /* Page Actions */
  async launchHomePage(url: string) {
    await this.navigateTo(url);
    await expect(this.page).toHaveTitle("CURA Healthcare Service");
  }

  async login(username: string, password: string) {
    await this.click(this.makeAppointmentBtn);
    await this.typeInto(this.usernameInput, username);
    await this.typeInto(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}

export default LoginPage;

// Use this in your tests like:
// const loginPage = new LoginPage(page);

/**
 * Notes:
 * 1. This is where you spent MOST of the hours getting the locators and adding methods on a page for covearg
 *  - Use 'codegen' boilerplat code to structure this
 */
