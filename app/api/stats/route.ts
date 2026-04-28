import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";

export async function GET() {
  const { data } = await supabaseAdmin.from("leads").select("status,buyer_confidence,email", { count: "exact" });
  const rows = data ?? [];
  return NextResponse.json({
    total: rows.length,
    freshToday: rows.filter((r) => r.status === "fresh").length,
    duplicatesRemoved: rows.filter((r) => r.status === "duplicate").length,
    highConfidence: rows.filter((r) => r.buyer_confidence >= 0.8).length,
    emailsFoundToday: rows.filter((r) => !!r.email).length
  });
}
