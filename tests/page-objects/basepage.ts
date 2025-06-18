import { expect, type Locator, type Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* All reusable actions */
  async navigateTo(path: string) {
    console.log(`Navigating to the path: ${path}`);
    await this.page.goto(path);
  }

  /** Click action */
  async click(ele: Locator) {
    try {
      await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
      await ele.click();
    } catch (error) {
      console.error(`ERROR: Failed to click element: ${ele.toString()}`);
      throw error;
    }
  }

  /** Type action */
  async typeInto(ele: Locator, text: string) {
    try {
      await expect(ele).toBeVisible({ timeout: 10_000 });
      await ele.fill(text);
    } catch (error) {
      console.error(`ERROR: Failed to type into element: ${ele.toString()}`);
      throw error;
    }
  }
}
