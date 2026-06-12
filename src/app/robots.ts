import type { MetadataRoute } from "next";
import { SITE, SITE_URL } from "@/lib/config";

/** Non-public routes — excluded from sitemap and blocked in robots.txt */
const DISALLOW = [
  "/admin",
  "/account/",
  "/api/",
  "/login",
  "/register",
  "/orders/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOW,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE.canonicalHost,
  };
}
