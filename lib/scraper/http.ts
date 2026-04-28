import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function fetchHtml(url: string) {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent(`Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/${120 + Math.floor(Math.random() * 4)}.0 Safari/537.36`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.floor(Math.random() * 1200)));
  const html = await page.content();
  await browser.close();
  return cheerio.load(html);
}
