import { test, expect } from '@playwright/test';

test('handle multiple windows', async ({ page, context }) => {
    // Navigate to the main page
    await page.goto('https://the-internet.herokuapp.com/windows');

    // Get initial page title for later verification
    const initialTitle = await page.title();

    // Click on the link and wait for the new page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Click Here')
    ]);

    // Verify the title of the new page
    await expect(newPage).toHaveTitle('New Window');

    // Close the new page
    await newPage.close();

    // Verify we're back on the original page
    await expect(page).toHaveTitle(initialTitle);
});
