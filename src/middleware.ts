import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Canonical host — apex and typos redirect here (308). */
const CANONICAL_HOST = "www.maxphonesfarm.com";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  if (host === "maxphonesfarm.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|images/).*)",
  ],
};
