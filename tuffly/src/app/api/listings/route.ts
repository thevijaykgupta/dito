import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types";
import { readCollection, writeCollection } from "@/server/lib/jsonDb";

const LISTINGS_FILE = "listings.json";

export async function GET() {
  const listings = await readCollection<Product[]>(LISTINGS_FILE, []);
  return NextResponse.json({ listings });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Product;
    const listings = await readCollection<Product[]>(LISTINGS_FILE, []);
    const nextItem: Product = {
      ...body,
      id: body.id || Date.now().toString(),
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      isAvailable: body.isAvailable ?? true,
      views: body.views ?? 0,
      likes: body.likes ?? 0,
      listingStatus: body.listingStatus ?? "active",
    };
    const updated = [nextItem, ...listings];
    await writeCollection(LISTINGS_FILE, updated);
    return NextResponse.json({ listing: nextItem }, { status: 201 });
  } catch (error) {
    console.error("Failed to create listing:", error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
