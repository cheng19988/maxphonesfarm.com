import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/** Paths crawlers may fetch without authentication — including machine-readable JSON (Shopify-style). */
const PUBLIC_ALLOW = [
  "/",
  "/catalog.json",
  "/faq.json",
  "/products/*.json",
  "/agents.md",
  "/llms.txt",
  "/ai.txt",
  "/.well-known/",
];

const DISALLOW = ["/admin", "/account/", "/api/", "/login", "/register", "/orders/"];

/** AI crawlers explicitly allowed on public marketing + JSON catalog endpoints. */
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "PerplexityBot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "DeepSeekBot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: PUBLIC_ALLOW, disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: PUBLIC_ALLOW,
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
