import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    for (const locale of routing.locales) {
        const localePath = locale === "en" ? "" : `/${locale}`;

        routes.push({
            url: `${metadataBase}${localePath}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
            alternates: {
                languages: Object.fromEntries(
                    routing.locales.map((loc) => [
                        loc,
                        `${metadataBase}${loc === "en" ? "" : `/${loc}`}`,
                    ])
                ),
            },
        });

        routes.push({
            url: `${metadataBase}${localePath}/champions`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(
                    routing.locales.map((loc) => [
                        loc,
                        `${metadataBase}${loc === "en" ? "" : `/${loc}`}/champions`,
                    ])
                ),
            },
        });
    }

    return routes;
}
