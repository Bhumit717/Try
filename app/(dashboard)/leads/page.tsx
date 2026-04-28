"use client";
import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    const res = await fetch(`/api/leads?q=${encodeURIComponent(q)}`);
    setLeads(await res.json());
  }
  useEffect(() => { load(); }, []);

  return (
    <main className="mx-auto max-w-md p-4 space-y-3">
      <h1 className="text-lg font-bold">Lead CRM</h1>
      <div className="flex gap-2">
        <input className="flex-1 rounded bg-slate-900 p-2" placeholder="Search company" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={load} className="rounded bg-blue-600 px-3">Search</button>
      </div>
      <div className="space-y-2">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded bg-slate-900 p-3 text-sm">
            <p className="font-semibold">{lead.company_name}</p>
            <p>{lead.country} {lead.city}</p>
            <p>{lead.email ?? "No email"}</p>
            <p className="text-xs text-slate-400">{lead.buyer_type} • {lead.status} • score {lead.buyer_confidence}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
