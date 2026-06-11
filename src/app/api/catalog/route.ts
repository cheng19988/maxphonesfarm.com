import { NextResponse } from "next/server";
import { buildCatalogJson } from "@/lib/ai-catalog";
import { getPublishedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getPublishedProducts();
  return NextResponse.json(buildCatalogJson(products), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
