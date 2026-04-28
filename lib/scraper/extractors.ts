import { load } from "cheerio";

const emailRegex = /[a-zA-Z0-9._%+-]+@(info|sales|purchase|procurement|import|admin|contact|[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}/g;

export function extractEmails(html: string): { email: string; confidence: number }[] {
  const matches = html.match(emailRegex) ?? [];
  return [...new Set(matches)].map((email) => ({ email: email.toLowerCase(), confidence: /info|sales|purchase|procurement|import/.test(email) ? 0.9 : 0.65 }));
}

export function extractPhones(html: string) {
  const phoneRegex = /(\+?\d[\d\s().-]{7,}\d)/g;
  return [...new Set(html.match(phoneRegex) ?? [])].slice(0, 5);
}

export function extractLinks(html: string, baseUrl: string) {
  const $ = load(html);
  return $("a")
    .map((_i, el) => $(el).attr("href") || "")
    .get()
    .filter((href) => /contact|about|team|sales|purchase|procurement|distributor|partner/i.test(href))
    .map((href) => (href.startsWith("http") ? href : new URL(href, baseUrl).toString()));
}
