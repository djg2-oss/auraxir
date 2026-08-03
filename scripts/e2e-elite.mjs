#!/usr/bin/env node
/**
 * Elite production readiness E2E — express + full + preview + mobile.
 * Exit 0 only if clean.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/workspace/screenshots", { recursive: true });
const base = process.argv[2] || "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

const clickText = async (re) => {
  await page.getByRole("button", { name: re }).first().click({ timeout: 12000 });
  await page.waitForTimeout(300);
};

await page.goto(base + "/");
await page.evaluate(() => localStorage.clear());

// Express
await page.goto(base + "/start?mode=express", { waitUntil: "networkidle" });
await clickText(/Business site or app/i);
await clickText(/Continue to you|Continue/i);
await page.locator("#businessName").fill("Harbor Elite Co");
await clickText(/Restaurant & Food/i);
await clickText(/Continue/i);
await clickText(/Warm/i);
await page.locator("#desire").fill("warm luxury hospitality");
await clickText(/See best fit/i);
await page.waitForURL(/recommend/, { timeout: 15000 });
const rec = await page.locator("body").innerText();
const leaks = ["webflow", "framer", "shopify", "bubble", "wix", "onspace"].filter((w) =>
  rec.toLowerCase().includes(w),
);
await page
  .getByRole("button")
  .filter({ hasText: /builder|Build|Start production|Open/i })
  .first()
  .click();
await page.waitForURL(/builder/, { timeout: 15000 });
const bid = page.url().match(/builder\/([^/?]+)/)?.[1];
await page.getByRole("button", { name: /^Publish$/i }).click();
await page.waitForTimeout(600);
await page.goto(base + "/preview/" + bid, { waitUntil: "networkidle" });
const previewOk = (await page.locator("body").innerText()).length > 80;
await page.screenshot({ path: "/workspace/screenshots/elite-ready-preview.png" });

// Full
await page.evaluate(() => localStorage.clear());
await page.goto(base + "/start?mode=full", { waitUntil: "networkidle" });
await clickText(/Business site or app/i);
await clickText(/Continue to you|Continue/i);
await page.locator("#businessName").fill("Auraxir First Co");
await clickText(/SaaS \/ Software/i);
await clickText(/Elite website/i);
await clickText(/^Continue$/i);
await clickText(/Leads/i);
await clickText(/Lock the look|Continue/i);
await clickText(/Technical/i);
await page.locator("#desire").fill("precise dark SaaS");
await clickText(/Set scale|Continue/i);
await clickText(/Growing/i);
await page.locator("button").filter({ hasText: "Serious brands" }).first().click();
await page.locator("button").filter({ hasText: "Comfortable with tools" }).first().click();
const buttons = page.locator("button");
const count = await buttons.count();
for (let i = 0; i < count; i++) {
  const t = await buttons.nth(i).innerText();
  if (t.length > 60 && /responsible|Terms|accept/i.test(t)) {
    await buttons.nth(i).click();
    break;
  }
}
await page.getByRole("button", { name: /See best fit/i }).click();
await page.waitForURL(/recommend/, { timeout: 15000 });

// Mobile
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + "/", { waitUntil: "networkidle" });
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
);

const uniqueErrors = [...new Set(errors)];
const ok =
  previewOk &&
  leaks.length === 0 &&
  !overflow &&
  uniqueErrors.length === 0;

console.log(
  JSON.stringify(
    {
      ok,
      previewOk,
      leaks,
      overflow,
      errors: uniqueErrors.slice(0, 20),
      builderId: bid,
    },
    null,
    2,
  ),
);
await browser.close();
process.exit(ok ? 0 : 1);
