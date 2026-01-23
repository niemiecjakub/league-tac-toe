import { MetadataRoute } from "next";

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

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
