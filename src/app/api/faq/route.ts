import { NextResponse } from "next/server";
import { buildFaqJson } from "@/lib/ai-catalog";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(buildFaqJson(), {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
