import { runLeadDiscovery } from "@/lib/scraper/leadEngine";
import { getSupabaseAdmin } from "@/lib/db/supabase";
import { dedupeLeads } from "@/lib/jobs/deduplicate";

export async function runDailyJob() {
  const countries = ["UAE", "Saudi Arabia", "Canada", "Qatar", "Oman", "Kuwait"];
  const cities = ["Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Toronto", "Vancouver", "Doha"];

  const discovered = await runLeadDiscovery({ countries, cities, targetPerDay: 120 });
  const { data: existing } = await getSupabaseAdmin().from("leads").select("*").limit(5000);
  const deduped = dedupeLeads(discovered, existing ?? []);

  const insertable = deduped.filter((x) => x.status !== "duplicate");
  if (insertable.length) await getSupabaseAdmin().from("leads").insert(insertable);

  return {
    total: deduped.length,
    fresh: deduped.filter((x) => x.status === "fresh").length,
    duplicates: deduped.filter((x) => x.status === "duplicate").length,
    highConfidence: deduped.filter((x) => x.buyer_confidence >= 0.8).length,
    emails: deduped.filter((x) => !!x.email).length
  };
}
