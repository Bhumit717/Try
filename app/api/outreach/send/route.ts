import { NextRequest, NextResponse } from "next/server";
import { smtp } from "@/lib/email/smtp";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const to = Array.isArray(body.to) ? body.to : [body.to];
  await smtp.sendMail({ from: process.env.SMTP_FROM, to, subject: body.subject, html: body.html });
  return NextResponse.json({ sent: to.length });
}
