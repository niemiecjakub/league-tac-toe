import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/game/", "/api/", "/_next/"],
            },
            {
                userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Applebot-Extended"],
                allow: "/",
                disallow: ["/game/", "/api/", "/_next/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
