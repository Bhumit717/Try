import { LeadRecord } from "@/lib/types";

export function dedupeLeads(newLeads: LeadRecord[], existing: LeadRecord[]) {
  return newLeads.map((lead) => {
    const dup = existing.find((e) =>
      normalize(e.company_name) === normalize(lead.company_name) ||
      (!!e.website && !!lead.website && normalize(e.website) === normalize(lead.website)) ||
      (!!e.email && !!lead.email && normalize(e.email) === normalize(lead.email)) ||
      (!!e.phone && !!lead.phone && normalize(e.phone) === normalize(lead.phone))
    );

    if (!dup) return lead;
    const resurfaced = dup.source_url !== lead.source_url;
    return { ...lead, status: resurfaced ? "resurfaced" : "duplicate" };
  });
}

function normalize(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, "");
}
