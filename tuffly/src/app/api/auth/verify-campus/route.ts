import { NextRequest, NextResponse } from "next/server";

const allowedDomains = ["rvce.edu.in", "rvu.edu.in"];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string };
  const email = body.email || "";
  const domain = email.split("@")[1]?.toLowerCase();
  const isCampusEmail = !!domain && allowedDomains.includes(domain);
  return NextResponse.json({ isCampusEmail, domain, allowedDomains });
}
