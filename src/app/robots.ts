import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account/", "/api/", "/login", "/register", "/orders/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
