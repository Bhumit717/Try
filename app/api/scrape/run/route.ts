import { NextResponse } from "next/server";
import { runDailyJob } from "@/lib/jobs/dailyJob";

export async function POST() {
  const stats = await runDailyJob();
  return NextResponse.json(stats);
}
