import { test, expect } from "@playwright/test";

test("user styles input test", async ({ page }) => {
    await page.goto("index.html");
    await page.locator("#input-styles").click();
    await page
        .getByLabel("Upload .css")
        .setInputFiles("./tests/user-styles-input-test.css");
    await page.getByRole("button", { name: "Apply Style" }).click();
    await page.getByRole("button", { name: "Remove Style" }).click();
});
