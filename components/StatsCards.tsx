"use client";
import { useEffect, useState } from "react";

export function StatsCards() {
  const [stats, setStats] = useState<any>({});
  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats).catch(() => undefined);
  }, []);

  const cards = [
    ["Fresh leads today", stats.freshToday ?? 0],
    ["Duplicates removed", stats.duplicatesRemoved ?? 0],
    ["High confidence buyers", stats.highConfidence ?? 0],
    ["Emails found today", stats.emailsFoundToday ?? 0]
  ];

  return <div className="grid grid-cols-2 gap-2">{cards.map(([k, v]) => <div key={String(k)} className="rounded bg-slate-800 p-3"><p className="text-xs text-slate-400">{k}</p><p className="text-lg font-semibold">{String(v)}</p></div>)}</div>;
}
