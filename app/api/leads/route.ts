import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/db/supabase";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  let query = getSupabaseAdmin().from("leads").select("*").order("created_at", { ascending: false }).limit(200);
  if (q) query = query.ilike("company_name", `%${q}%`);
  const { data } = await query;
  return NextResponse.json(data ?? []);
}
