import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, sitemapLanguages, type AppPath } from "@/lib/seo";
import { getPathname } from "@/i18n/navigation";

function urlFor(locale: string, href: AppPath): string {
    return `${SITE_URL}${getPathname({ locale, href })}`;
}

function entry(href: AppPath, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number): MetadataRoute.Sitemap {
    return routing.locales.map((locale) => ({
        url: urlFor(locale, href),
        changeFrequency,
        priority,
        alternates: {
            languages: sitemapLanguages(href),
        },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
    return [...entry("/", "weekly", 1), ...entry("/champions", "weekly", 0.8)];
}
