import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/server/lib/jsonDb";
import { TeamUpProfile } from "@/features/teamup/types";

const TEAMUP_FILE = "teamup-profiles.json";

export async function GET() {
  const profiles = await readCollection<TeamUpProfile[]>(TEAMUP_FILE, []);
  return NextResponse.json({ profiles });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TeamUpProfile;
    const profiles = await readCollection<TeamUpProfile[]>(TEAMUP_FILE, []);
    const existingIndex = profiles.findIndex((p) => p.userId === body.userId);
    if (existingIndex >= 0) {
      profiles[existingIndex] = { ...profiles[existingIndex], ...body };
    } else {
      profiles.push(body);
    }
    await writeCollection(TEAMUP_FILE, profiles);
    return NextResponse.json({ success: true, profile: body });
  } catch (error) {
    console.error("Failed to save teamup profile:", error);
    return NextResponse.json({ error: "Failed to save teamup profile" }, { status: 500 });
  }
}
