import { NextRequest, NextResponse } from "next/server";
import { readCollection } from "@/server/lib/jsonDb";
import { TeamMatchResult, TeamUpProfile } from "@/features/teamup/types";

const TEAMUP_FILE = "teamup-profiles.json";

function intersectionCount(a: string[], b: string[]) {
  const setB = new Set(b.map((v) => v.toLowerCase()));
  return a.filter((v) => setB.has(v.toLowerCase())).length;
}

function score(base: TeamUpProfile, candidate: TeamUpProfile): number {
  let total = 0;
  total += intersectionCount(base.subjects, candidate.subjects) * 35;
  total += intersectionCount(base.skills, candidate.skills) * 20;
  if (base.region && candidate.region && base.region === candidate.region) total += 15;
  if (base.hostel && candidate.hostel && base.hostel === candidate.hostel) total += 20;
  if (base.campus && candidate.campus && base.campus === candidate.campus) total += 10;
  return Math.min(total, 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TeamUpProfile;
    const profiles = await readCollection<TeamUpProfile[]>(TEAMUP_FILE, []);
    const matches: TeamMatchResult[] = profiles
      .filter((item) => item.userId !== body.userId && item.isAvailableForTeam)
      .map((profile) => ({
        profile,
        compatibilityScore: score(body, profile),
      }))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Failed to generate team matches:", error);
    return NextResponse.json({ error: "Failed to generate team matches" }, { status: 500 });
  }
}
