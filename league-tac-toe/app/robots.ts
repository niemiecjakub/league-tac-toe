import { MetadataRoute } from "next";

const metadataBase = new URL("https://leaguetactoe.com");

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/game/", "/api/", "/_next/"],
            },
        ],
        sitemap: `${metadataBase}/sitemap.xml`,
    };
}
