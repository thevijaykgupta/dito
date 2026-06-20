import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/server/lib/jsonDb";

interface StoredUser {
  id: string;
  email: string;
  name: string;
  campus?: string;
  isVerified?: boolean;
  isAvailableForTeam?: boolean;
}

const USERS_FILE = "users.json";

export async function GET() {
  const users = await readCollection<StoredUser[]>(USERS_FILE, []);
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as StoredUser;
    const users = await readCollection<StoredUser[]>(USERS_FILE, []);
    const index = users.findIndex((u) => u.id === body.id || u.email === body.email);
    if (index >= 0) {
      users[index] = { ...users[index], ...body };
    } else {
      users.push(body);
    }
    await writeCollection(USERS_FILE, users);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save user:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
