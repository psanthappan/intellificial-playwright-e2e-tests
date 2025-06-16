1. **🎭 PLAYRIGHT E2E TESTS - STAGING**
---

- [1. Getting Started](#1-getting-started)
  - [1.1. Install Playwright](#11-install-playwright)
  - [1.2. Run a sample test](#12-run-a-sample-test)
  - [1.3. Set up Git (optional)](#13-set-up-git-optional)
- [2. Project folder structure](#2-project-folder-structure)
- [3. Running the first test](#3-running-the-first-test)
  - [3.1. Creating a basic test](#31-creating-a-basic-test)
  - [3.2. Running a Test via `package.json` Scripts](#32-running-a-test-via-packagejson-scripts)
- [4. Codegen - The test generator of playwright](#4-codegen---the-test-generator-of-playwright)
  - [4.1. Option 1:  VS Code Extension](#41-option-1--vs-code-extension)
  - [4.2. Option 2: Command Line Interface (CLI)](#42-option-2-command-line-interface-cli)
  - [4.3. 🎬 Demo time](#43--demo-time)
- [5. Annotations and Tags in Playwright](#5-annotations-and-tags-in-playwright)
  - [5.1. Example](#51-example)
- [6. Locators - Page Methods Returning Locator Summary Table](#6-locators---page-methods-returning-locator-summary-table)
- [7. Handling a new tab](#7-handling-a-new-tab)
- [8. Adding Screenshots](#8-adding-screenshots)
  - [8.1. Option 1: Auto-Capture via `use` config](#81-option-1-auto-capture-via-use-config)
  - [8.2. Option 2: Manually Capture and Attach Screenshot](#82-option-2-manually-capture-and-attach-screenshot)
- [9. Setting Up Allure Report with Playwright](#9-setting-up-allure-report-with-playwright)
  - [9.1. Useful References](#91-useful-references)
  - [9.2. Installation \& Basic Setup](#92-installation--basic-setup)
- [10. Setting up a page object model](#10-setting-up-a-page-object-model)
  - [10.1. Set up a base page](#101-set-up-a-base-page)
  - [10.2. Set up a Login page](#102-set-up-a-login-page)
  - [10.3. Adding new tests](#103-adding-new-tests)
- [11. Data Handling](#11-data-handling)
- [12. Reading data from JSON file](#12-reading-data-from-json-file)
  - [12.1. Recommended `tsconfig.json` for JSON Import Support](#121-recommended-tsconfigjson-for-json-import-support)
  - [12.2. Env Data handling](#122-env-data-handling)
- [13. API Integration](#13-api-integration)
  - [13.1. Basic REST API – GET Request](#131-basic-rest-api--get-request)
  - [13.2. Working with OAuth API](#132-working-with-oauth-api)
- [14. MCP Server Integration with Playwright](#14-mcp-server-integration-with-playwright)
  - [14.1. Pre-check](#141-pre-check)
  - [14.2. Setup Steps](#142-setup-steps)
  - [14.3. References](#143-references)
- [15. Code utils](#15-code-utils)
  - [15.1. Delete Allure results folder](#151-delete-allure-results-folder)
- [16. ✅ Best Practices for Playwright Projects](#16--best-practices-for-playwright-projects)
  - [16.1. Project Naming Convention](#161-project-naming-convention)
  - [16.2. File \& Code Naming Conventions](#162-file--code-naming-conventions)
- [17. Possible Errors](#17-possible-errors)
  - [17.1. Error:](#171-error)
  - [17.2. Possible resolution:](#172-possible-resolution)



This is the staging projects demonstrates the ability to build a new project from scratch, noting down all instructions in one place. 

## 1. Getting Started

### 1.1. Install Playwright

__Pre-check__

1. ✅ Check if node is installed

```sh
node -v 
```
Returns a valid node version. Something like `v22.16.0`

2. ✅ Make sure you're inside your intended project directory.

__Installation__

1. Open the VS Code terminal and run:
```sh
npm init playwright@latest
```
2. When prompted
   1. Select `TypeScript` as the language
   2. Choose to install **all browsers**
   
### 1.2. Run a sample test

1. Run below command
   
```sh
npx playwright test --headed
```
2. To show the report, run
   
```sh
npx playwright show-report
```

### 1.3. Set up Git (optional)

Initialize a new Git repository in your project
   
```sh
git init
```

🎯 **Basic Setup** is completed!

---

## 2. Project folder structure

Let's create the following folder structure 

```sh
INTELLIFICIAL-PLAYWRIGHT-E2E-TESTS/
├── .vscode/                    # Editor-specific settings
│   └── mcp.json                # MCP server config for VS Code
├── config/                     # Environment-specific config files
├── data/                       # Static data and constants
│   └── constants.json          # Common constants used in tests
├── debug/                      # Optional: Debug-related outputs/logs
├── logs/                       # Application/test logs
├── node_modules/               # Auto-generated dependencies
├── playwright-report/          # Playwright HTML test report output
├── resources/                  # Misc test resources (e.g. images, files)
├── tests/                      # All organized test files
│   ├── api/                    # API test specs
│   ├── demo/                   # Demo-related test specs
│   ├── devices/                # Device related scenarios
│   ├── e2e/                    # End-to-end test specs
│   ├── functional/             # Functional test cases
│   ├── helpers/                # Utility functions for tests
│   ├── page-objects/           # Page Object Model files
├── tests-examples/             # Auto-generated sample test scenarios
├── .env.example                # Template for environment files
├── .gitignore                  # Git ignored files and folders
├── package-lock.json           # Dependency lock file
├── package.json                # Project metadata and scripts
├── playwright.config.ts        # Playwright configuration file
├── README.md                   # Project overview and instructions
```

✅ __Quick Check__

1. In the `playwright.config.ts` file, comment out all other browsers and ensure only `chromium` is enabled.
2. Run the following command to verify everything still works:

```sh
npx playwright test --headed
```
If tests execute successfully, you're all set!

🎯 The target project structure is now set up. Let’s keep moving forward... 🚀

---

## 3. Running the first test

### 3.1. Creating a basic test

[💡] Playwright recognizes the following file extensions as valid test specification files:
  - `*.spec.ts`
  - `*.test.ts`

__STEPS__:

1. Create a spec file `first-test.spec.ts` under the `./demo` folder
2. Create the following code

```ts
import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
    // Go to the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Assert header text
    await expect(page.locator('//h1')).toHaveText('CURA Healthcare providr')
});
```
3. Run this specific test file
   
```sh
npx playwright test tests/demo/first-test.spec.ts --headed
```

[💡] To know more about `playwright test` command, run

```sh
npx playwright test --help
```

🎯 Congrats! We wrote a simple test, now let's understant each line. 

### 3.2. Running a Test via `package.json` Scripts

1. Add a new script entry named `demo` inside the `scripts` section of your `package.json` file:
```json
"scripts": {
  "demo": "npx playwright test tests/demo/first-test.spec.ts --headed"
}
```
2. Execute the test by running the following command in your terminal:
```sh
npm run demo
```
[💡] This approach helps you avoid typing long commands repeatedly.

🎯 The first BIG step forward ...

---

## 4. Codegen - The test generator of playwright

Use Playwright's `codegen` feature to auto-generate tests by recording interactions with your app. There are two primary ways to use it — via **VS Code Extension** or the **Command Line Interface (CLI)**.

Refer to the official docs for more: [Playwright Codegen Docs](https://playwright.dev/docs/codegen)

### 4.1. Option 1:  VS Code Extension

1. Open the Extensions Marketplace and install:  
   **`Playwright Test for VSCode`**
2. Once installed, look for a new **laboratory flask icon** in the sidebar. Click to open the extension.
3. You can now:
   - **Record tests** interactively
   - **Capture locators** with tooltips and visibility checks

[💡] __Tips While Using the Extension__
- Click on assertion tooltips to select an element.
- Visibility checks ensure the element is ready before interacting.
- `text` selectors provide an extra layer of validation.

### 4.2. Option 2: Command Line Interface (CLI)

1. View available options:
```sh
npx playwright codegen --help
```
2. Run with or without a URL:
```sh
npx playwright codegen
npx playwright codegen https://katalon-demo-cura.herokuapp.com/
```

[💡]__Use CLI for__
- Device emulation
- Custom viewport settings
- Automation scripts and advanced workflows

🎯 **Codegen** can drastically reduce your test writing time and help you learn the best locator strategies along the way.

### 4.3. 🎬 Demo time
Let's walk through a live test recording using Playwright Codegen...

---

## 5. Annotations and Tags in Playwright

The following examples demonstrate how to:

- ✅ Add annotations to a group of tests
- ✅ Conditionally skip tests (e.g., based on environment or browser)
- ✅ Use custom tags like `@smoke` for categorization and filtering


### 5.1. Example
```ts
import { test, expect } from "@playwright/test";

test.describe("Login functionality", { annotation: { type: "EPIC", description: "User Story: JIRA-1234" } }, () => {
    test.beforeEach(async ({ page }) => {
        // 1. Go to home page
        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        // Assert if the title and header text
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
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
```

💡 Pro Tip: You can use `--grep` command in CLI to run only tests with the @smoke tag:

```sh
npx playwright test --grep '@smoke' --headed
```

## 6. Locators - Page Methods Returning Locator Summary Table

| # | Method                                  | Description                                                                           | Example                                                                              |
|---|-----------------------------------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| 1 | `page.locator(selector)`                | Creates a `Locator` using CSS or XPath selector. Most flexible and powerful.          | `const usernameInput = page.locator('#username');`                                   |
| 2 | `page.getByRole(role, options?)`        | Selects elements by ARIA role (`button`, `link`, `textbox`). Great for accessibility. | `await page.getByRole('button', { name: 'Submit' }).click();`                        |
| 3 | `page.getByText(text, options?)`        | Selects elements containing visible text.                                             | `await page.getByText('Sign in').click();`                                           |
| 4 | `page.getByAltText(text, options?)`     | Finds elements with a specific `alt` attribute (commonly used with images).           | `const logo = page.getByAltText('Company Logo');\nawait expect(logo).toBeVisible();` |
| 5 | `page.getByLabel(text, options?)`       | Selects inputs linked to `<label>` via `for` or nesting.                              | `await page.getByLabel('Email Address').fill('test@example.com');`                   |
| 6 | `page.getByPlaceholder(text, options?)` | Selects inputs using the `placeholder` attribute.                                     | `await page.getByPlaceholder('Enter your name').fill('John');`                       |
| 7 | `page.getByTestId(testId)`              | Uses `data-testid` attribute, ideal for stable test targeting.                        | `await page.getByTestId('submit-button').click();`                                   |
| 8 | `page.getByTitle(title, options?)`      | Finds elements with the `title` attribute (not page title).                           | `await page.getByTitle('Close dialog').click();`                                     |

---

🔁 These methods return `Locator` objects and are ideal for stable, auto-waited interactions in Playwright.

---

## 7. Handling a new tab 

The following example demonstrates handing a new tab

```ts
import { test, expect } from "@playwright/test";

test("Should handle a new tab", async ({ browser }) => {
    // 1. Create a new browser context and open the initial page
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");

    // 3. Click the link that opens a new tab
    await page.getByText("Click Here").click();

    // 2. Prepare to wait for the new tab
    const newPagePromise = context.waitForEvent("page");

    // 4. Get the new tab page
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();

    // 5. Perform actions/assertions in the new tab
    await expect(newPage).toHaveURL("https://the-internet.herokuapp.com/windows/new");

    // 6. Close the new tab and continue in the original page
    await newPage.close();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/windows");
});
```

## 8. Adding Screenshots

Playwright allows capturing and attaching screenshots to your test reports in two primary ways:

### 8.1. Option 1: Auto-Capture via `use` config
1. Add the following setting in `use`

```ts
 use: {
  screenshot: 'on', // or 'only-on-failure'
}
```
💡 **Pro Tip:** Setting `video: "on"` in Playwright config will record the **entire test execution** and automatically attach the video file to the **HTML report** for every test.


### 8.2. Option 2: Manually Capture and Attach Screenshot

```ts
 // Capture the screenshot
  const screenshot = await page.screenshot({ fullPage: true });
  // Attach it to the report
  await test.info().attach("Full Page Screenshot", {
      body: screenshot,
      contentType: "image/png",
  });
```

🎯 This screenshot will appear in the report under the "Attachments" section.

---

## 9. Setting Up Allure Report with Playwright

Enhance your Playwright reports using the Allure Reporter for better visualization and insights.

### 9.1. Useful References

1. GitHub: [Allure Playwright Package](https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright)
2. Official Docs: [Allure + Playwright Setup Guide](https://allurereport.org/docs/playwright/)

### 9.2. Installation & Basic Setup

1. Install allure reporter
```sh
npm install -D allure-playwright
```
2. Update reporter in `playwright.config.ts`:
```ts
reporter: [
  ['html'],                    // Default Playwright HTML reporter
  ['allure-playwright'],       // Allure reporter
],
```
3. If allure serve throws error like: `zsh: command not found: allure`, Install

```sh
npm install -g allure-commandline
```
4. Now you can generate the report using

```sh
allure serve
```
5. Advanced Reporter Configuration

```ts
reporter: [
      [
        'html',
        {
          open: 'never', // Don't auto-open HTML report
        },
      ],
      [
        'allure-playwright',
        {
          detail: true,
          suiteTitle: true,
          environmentInfo: {
            name: 'TEST',
            Release: 'Release 1.1',
            node_version: process.version
          },
        },
      ],
    ],
```

🎯 You now have powerful HTML + Allure reporting integrated into your Playwright test runs!

---

## 10. Setting up a page object model 

### 10.1. Set up a base page

1. Create a base `pagepage.ts` under `./tests/page-objects'` folder
2. A sample content of the file: 

<details>
<summary> **A bagepage.ts content** </summary>

```ts
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

```
</details>

### 10.2. Set up a Login page

A sample code below

<details>
<summary> **A login page** </summary>

```ts
import BasePage from "./basepage.js";
import { expect, type Locator, type Page } from "@playwright/test";

class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /* Elements */
    get makeAppointmentBtn () {
        return this.page.getByRole("link", { name: "Make Appointment" })
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
        await this.click(this.makeAppointmentBtn)
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

```

</details>

### 10.3. Adding new tests

A sample code below

<details>
<Summary>**A sample test** </summary>

```ts
import { test, expect } from "@playwright/test";
import LoginPage from "../page-objects/login-page.ts";

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

```

</details>

💡 Pro Tip: You can set the `navigationTimeout: 30_000` in the `use` config 

🎯 **Now that you have successfully set up a Page Object Design Pattern!**

This structure helps you:
- ✅ Reuse actions and locators across tests
- ✅ Keep test files clean and focused
- ✅ Boost maintainability and scalability

---

## 11. Data Handling

## 12. Reading data from JSON file

1. **Create a JSON file**  
   Add an object in:  
   `data/constants.json`

2. **Import the JSON file** into any test or helper file:

```ts
import constants from '../../data/constants.json';
```
4. Access values using `dot` notation. You can also use `JSON.stringify()` to print or log entire objects.


### 12.1. Recommended `tsconfig.json` for JSON Import Support
1. To import `.json` files smoothly, ensure your project has a valid TypeScript config:
2. Create the file `tsconfig.json` at the project root and add the follwoing basic config

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "CommonJS",
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "strict": true
    },
    "include": ["tests/**/*.ts", "data/**/*.ts", "playwright.config.ts"],
    "exclude": ["node_modules", "dist"]
}
```
__Notes & Troubleshooting__
**Error:**
An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.ts(5097)
✅ Fix: Remove the .ts extension from the import path.

**Error:**
SyntaxError: data/constants.json: Unexpected end of JSON input
✅ Fix: Make sure your JSON file is not empty and contains valid syntax.

---

### 12.2. Env Data handling
Use `.env` files to manage environment-specific variables for flexible and secure test execution.

---

__Steps to Load Environment Data from `.env` Files__:
1. Install `dotenv` and `cross-env`packages

```sh
npm i -D dotenv
npm i -D cross-env
```
- `dotenv:` Loads variables from .env files
- `cross-env:` Makes CLI environment variables work across Windows/macOS/Linux


2. Import Modules in `playwright.config.ts`

```ts
import dotenv from "dotenv"; 
import * as path from "path"; // Additional node js package
```

3.  Configure and Load the Environment. 
- At the top of `playwright.config.ts`, add:

```ts
// Set default ENV if not provided
let ENV = process.env.ENV || 'test';
ENV = ENV.toUpperCase();

// Validate allowed ENV values
const allowedEnvs = ['DEV', 'TEST', 'UAT', 'PROD'];
if (!allowedEnvs.includes(ENV)) {
    throw new Error(`Given ENV name: ${ENV} is invalid and accepted values are: ${allowedEnvs}`)
}

// Load the appropriate .env file
console.log(`*** Loading ${ENV} environment config ***`);
dotenv.config({ path: path.resolve(__dirname, `config/.env.${ENV}`) });

```

4. Run Tests with Environment-Specific Config
- You can specify environment in your CLI or `package.json`: 

```json
"scripts": {
  "test:dev": "cross-env ENV=dev npx playwright test",
  "test:uat": "cross-env ENV=uat npx playwright test"
}
```

[💡] You might get error as `Argument of type 'string | undefined' is not assignable to parameter of type 'string'.Type 'undefined' is not assignable to type 'string'.ts(2345)` 
- Add the below lines

```ts
const baseUrl = process.env.URL;
if (!baseUrl) {
  throw new Error(`Environment variable "URL" is missing.`); // Required to over the error if you directly reference it !
}
```

🎯 You’re now ready to run Playwright tests in different environments with ease!

---


## 13. API Integration

Playwright allows seamless API testing using its built-in `request` object. Below are examples for both basic REST and OAuth-protected API calls.

### 13.1. Basic REST API – GET Request

Fetch a list of users from a public API:


```ts
import { test, expect, request } from "@playwright/test";

test.describe("REST API Demo", () => {
    const baseURL = "https://reqres.in/api";

    test("Should get a list of students", async ({ request }) => {
        const listRes = await request.get(`${baseURL}/users?page=2`, {
            headers: {
                "x-api-key": "reqres-free-v1",
            },
        });
        expect(listRes.status()).toBe(200);

        // Get the data
        const listData = await listRes.json();
        console.log("User List (Page 2):", listData);
    });
});

```


### 13.2. Working with OAuth API

__Steps to Generate a GitHub Bearer Token__:

- Go to **GitHub** → **Settings** → **Developer settings** → **Personal Access Tokens**
- Click **"Tokens (classic)"**
- Generate a new token with the following scopes:
  -   __Recommended Scopes__:
  - `read:user` — to read authenticated user profile
  - `repo` *(optional)* — required if you want to access your repositories
- Click **Generate Token**
- **Copy the token** – you'll use it as a **Bearer token** in your API calls  

💡 Use this token in your `.env` file or directly in headers like:
```ts
Authorization: `Bearer <your_token_here>`
```

Fetch the authenticated user profile from GitHub using an OAuth token:
```ts
import { test, expect, request } from "@playwright/test";

test.describe("OAuth Example", () => {
    const GITHUB_API = "https://api.github.com";

    test("Should return user profile from GitHub", async () => {
        const token = process.env.API_TOKEN;
        if (!token) throw new Error("API_TOKEN not set in env");

        // Create a github context
        const githubContext = await request.newContext({
            baseURL: GITHUB_API,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`
            },
        });

        // Get user profile
        const res = await githubContext.get("/user");

        //
        expect(res.status()).toBe(200);
        const userData = await res.json();
        console.log("Authenticated GitHub User:", userData);
    });
});

```

[💡] Pro Tips:
- Always test your API endpoints in Postman, Insomnia, or similar tools before coding.
- Keep sensitive values (like tokens) in `.env` files and never hardcode them.
- You can use `request.newContext()` to create isolated API contexts for different base URLs or auth headers.

---

## 14. MCP Server Integration with Playwright

Use the **Model Context Protocol (MCP)** to integrate Playwright into VS Code Copilot workflows and accelerate test creation with AI assistance.

---

### 14.1. Pre-check
1. Ensure you have **VS Code v1.99** or later.  
   👉 *Upgrade if you're using an older version.*
2. Make sure **GitHub Copilot** is set up and running in your VS Code.
   1. [Copilot Setup](https://code.visualstudio.com/docs/copilot/setup)

---


### 14.2. Setup Steps

1. Create the following file if not present
   `.vscode/mcp.json`

2. Add this MCP server configuration:

```json
{
  "servers": {
    "mcp-microsoft": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

```

3. Open the Copilot Chat window and select Agent Mode.
4. Ask Copilot to:
   1. "Automate a test for Android device using Playwright"
5. 🎉 Sit back and watch Copilot generate meaningful test scripts powered by Playwright MCP!


### 14.3. References
1. https://github.com/microsoft/playwright-mcp
2. https://code.visualstudio.com/docs/copilot/chat/mcp-servers
3. https://github.com/microsoft/playwright-mcp

---


## 15. Code utils

### 15.1. Delete Allure results folder

```ts
// Deletes allure-results for every run

if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    const resultsDir = path.resolve(__dirname, "allure-results");
    if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true, force: true });
        console.log("Deleted allure-results folder for clean local run.");
    }
}
```

## 16. ✅ Best Practices for Playwright Projects

Follow these conventions to ensure your project remains clean, consistent, and easy to maintain.

---

### 16.1. Project Naming Convention

- Format: `<project-name>-playwright-e2e-tests`  
- Example: `skyline-playwright-e2e-tests`

---

### 16.2. File & Code Naming Conventions

| Item                | Convention                                     | Example                            |
|---------------------|------------------------------------------------|------------------------------------|
| **Test File**       | `<file-name>.spec.ts` or `<file-name>.test.ts` | `login.spec.ts`                    |
| **Folders / Files** | kebab-case                                     | `page-objects/`, `user-actions.ts` |
| **Class Names**     | PascalCase (each word capitalized)             | `LoginPage`, `DashboardActions`    |
| **Variables**       | camelCase                                      | `loginButton`, `userNameInput`     |
| **Constants**       | UPPER_SNAKE_CASE                               | `BASE_URL`, `API_TIMEOUT_MS`       |

---

🎯 **Consistent naming improves readability and reduces confusion across teams.**



## 17. Possible Errors

### 17.1. Error:
```log
Error: page.goto: Test ended.
Call log:
  - navigating to "https://katalon-demo-cura.herokuapp.com/", waiting until "load"
```

### 17.2. Possible resolution:
1. Increase the timeout
2. Check if you forgot to add `await` for
   1. `page.goto()` method 
   2. spec file page objects actions

🎉 Congrats and Happy Testing! 🎭