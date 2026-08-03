#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/workspace/screenshots", { recursive: true });
const base = "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

async function shot(name) {
  await page.screenshot({ path: `/workspace/screenshots/${name}.png`, fullPage: false });
}

await page.goto(base + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const body = await page.locator("body").innerText();
if (!/Express|Execution/i.test(body)) throw new Error("landing missing express/execution");
await shot("exec-01-landing");

await page.goto(base + "/start?mode=express", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.fill("#businessName", "Harbor & Co.");
await page.getByRole("button", { name: /Restaurant/i }).first().click();
await page.getByRole("button", { name: /^Continue$/i }).click();
await page.waitForTimeout(400);
await page.getByRole("button", { name: /^Warm/i }).first().click();
await page.fill("#desire", "warm neighborhood cafe, inviting hospitality");
await page.getByRole("button", { name: /Show success plan/i }).click();
await page.waitForURL(/\/recommend/, { timeout: 15000 });
await page.waitForTimeout(600);
await shot("exec-02-plan");

await page.getByRole("button", { name: /Open builder/i }).first().click();
await page.waitForURL(/\/builder\//, { timeout: 15000 });
await page.waitForTimeout(900);
await shot("exec-03-builder");
const builderText = await page.locator("body").innerText();
if (!builderText.includes("Harbor")) throw new Error("builder missing project name");

await page.getByRole("button", { name: /^Publish$/i }).first().click();
await page.waitForTimeout(700);
await shot("exec-04-published");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
);
await shot("exec-05-mobile");

const result = { ok: errors.length === 0 && !overflow, errors, overflow };
console.log(JSON.stringify(result, null, 2));
await browser.close();
if (!result.ok) process.exit(1);
