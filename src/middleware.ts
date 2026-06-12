import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/config";

const CANONICAL_HOST = SITE.canonicalHost;

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const proto = request.headers.get("x-forwarded-proto");
  const isPreview =
    host.endsWith(".vercel.app") || host === "localhost" || host === "127.0.0.1";

  if (!isPreview) {
    const url = request.nextUrl.clone();

    // Apex → www (301) — always force https on canonical host
    if (host === SITE.domain) {
      url.protocol = "https:";
      url.host = CANONICAL_HOST;
      return NextResponse.redirect(url, 301);
    }

    // http → https on www production host
    if (proto === "http") {
      url.protocol = "https:";
      return NextResponse.redirect(url, 301);
    }
  }

  // Preview / deployment hosts: do not index
  if (host.endsWith(".vercel.app") || host === "localhost" || host === "127.0.0.1") {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|images/).*)"],
};
