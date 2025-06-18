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
        Authorization: `Bearer ${token}`,
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
