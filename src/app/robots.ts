import type { MetadataRoute } from "next";
import { SITE, SITE_URL } from "@/lib/config";

/**
 * Public crawl policy for search engines and AI crawlers.
 * GPTBot: NOT blocked — inherits the same allow/disallow rules as User-agent: *.
 * Blocked: admin, account, api, auth, order status pages only.
 * AI discovery: /llms.txt · /llms-full.txt · /agents.md · /catalog.json
 */
const DISALLOW = [
  "/admin",
  "/account/",
  "/api/",
  "/login",
  "/register",
  "/orders/",
];

const PUBLIC_RULE = {
  allow: "/" as const,
  disallow: DISALLOW,
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...PUBLIC_RULE },
      { userAgent: "Googlebot", ...PUBLIC_RULE },
      { userAgent: "Bingbot", ...PUBLIC_RULE },
      { userAgent: "OAI-SearchBot", ...PUBLIC_RULE },
      { userAgent: "ChatGPT-User", ...PUBLIC_RULE },
      { userAgent: "GPTBot", ...PUBLIC_RULE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE.canonicalHost,
  };
}
