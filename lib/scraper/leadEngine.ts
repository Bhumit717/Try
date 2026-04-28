import pLimit from "p-limit";
import { classifyBuyer } from "@/lib/ai/buyerFilter";
import { generateDailyQueries } from "@/lib/ai/queryRotation";
import { extractEmails, extractLinks, extractPhones } from "@/lib/scraper/extractors";
import { fetchHtml } from "@/lib/scraper/http";
import { scrapeSearchResults } from "@/lib/scraper/sources/searchEngineSource";
import { LeadRecord } from "@/lib/types";

export async function runLeadDiscovery(input: { countries: string[]; cities: string[]; targetPerDay?: number }) {
  const queries = generateDailyQueries(input.countries, input.cities);
  const raw: LeadRecord[] = [];
  const limit = pLimit(3);

  for (const query of queries.slice(0, 80)) {
    for (let p = 0; p < 20; p++) {
      const rows = await scrapeSearchResults(query, p);
      for (const row of rows) {
        const c = classifyBuyer({ title: row.title, snippet: row.snippet });
        if (c.buyer_type === "irrelevant") continue;
        raw.push({
          company_name: row.title.split("-")[0].trim(),
          source_url: row.source_url,
          buyer_confidence: c.score,
          buyer_type: c.buyer_type,
          product_keyword: query,
          status: "fresh"
        });
      }
    }
    if (raw.length >= (input.targetPerDay ?? 120)) break;
  }

  const enriched = await Promise.all(raw.slice(0, input.targetPerDay ?? 120).map((lead) => limit(async () => enrichLead(lead))));
  return enriched;
}

async function enrichLead(lead: LeadRecord): Promise<LeadRecord> {
  try {
    const $ = await fetchHtml(lead.source_url);
    const html = $.html();
    const emails = extractEmails(html);
    const phones = extractPhones(html);
    const internal = extractLinks(html, lead.source_url).slice(0, 8);

    for (const link of internal) {
      const $$ = await fetchHtml(link);
      const inner = $$.html();
      emails.push(...extractEmails(inner));
    }

    const best = emails.sort((a, b) => b.confidence - a.confidence)[0];
    return {
      ...lead,
      email: best?.email ?? null,
      email_confidence: best?.confidence ?? null,
      phone: phones[0] ?? null,
      website: new URL(lead.source_url).origin
    };
  } catch {
    return lead;
  }
}
