import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/server/lib/jsonDb";

interface OtpRecord {
  email: string;
  otp: string;
  expiresAt: number;
}

const OTP_FILE = "email-otp.json";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email: string; otp?: string; mode: "send" | "verify" };

  if (!body.email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const records = await readCollection<OtpRecord[]>(OTP_FILE, []);

  if (body.mode === "send") {
    const otp = generateOtp();
    const updated = records
      .filter((r) => r.email !== body.email)
      .concat({ email: body.email, otp, expiresAt: Date.now() + 10 * 60 * 1000 });
    await writeCollection(OTP_FILE, updated);
    return NextResponse.json({ success: true, otp });
  }

  const record = records.find((r) => r.email === body.email && r.otp === body.otp);
  if (!record || record.expiresAt < Date.now()) {
    return NextResponse.json({ success: false, verified: false }, { status: 400 });
  }

  await writeCollection(
    OTP_FILE,
    records.filter((r) => !(r.email === body.email && r.otp === body.otp))
  );
  return NextResponse.json({ success: true, verified: true });
}
