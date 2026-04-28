import { fetchHtml } from "@/lib/scraper/http";

export async function scrapeSearchResults(query: string, page = 0) {
  const start = page * 10;
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&first=${start}`;
  const $ = await fetchHtml(url);

  return $("li.b_algo")
    .map((_i, el) => {
      const title = $(el).find("h2").text().trim();
      const source_url = $(el).find("h2 a").attr("href")?.trim() || "";
      const snippet = $(el).find(".b_caption p").text().trim();
      return { title, source_url, snippet };
    })
    .get()
    .filter((x) => x.source_url && x.title);
}
