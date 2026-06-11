import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

const DISALLOW = ["/admin", "/account/", "/api/", "/login", "/register", "/orders/"];

/** AI crawlers explicitly allowed on public marketing content. */
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
