import { StatsCards } from "@/components/StatsCards";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-md p-4 space-y-4">
      <h1 className="text-xl font-bold">Export Buyer Lead SaaS</h1>
      <StatsCards />
      <div className="grid gap-2">
        <Link className="rounded bg-emerald-600 px-3 py-2 text-center" href="/leads">Open CRM Leads</Link>
      </div>
    </main>
  );
}
