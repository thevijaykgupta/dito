import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types";
import { readCollection, writeCollection } from "@/server/lib/jsonDb";

const LISTINGS_FILE = "listings.json";

type Params = { params: { id: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const updates = (await request.json()) as Partial<Product>;
    const listings = await readCollection<Product[]>(LISTINGS_FILE, []);
    const updated = listings.map((item) =>
      item.id === params.id ? { ...item, ...updates } : item
    );
    await writeCollection(LISTINGS_FILE, updated);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update listing:", error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const listings = await readCollection<Product[]>(LISTINGS_FILE, []);
    const updated = listings.map((item) =>
      item.id === params.id ? { ...item, listingStatus: "deleted", isAvailable: false } : item
    );
    await writeCollection(LISTINGS_FILE, updated);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete listing:", error);
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}
