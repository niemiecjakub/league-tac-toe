import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const SITE_NAME = "League Tac Toe";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://leaguetactoe.com").replace(
    /\/+$/,
    ""
);
export const GITHUB_URL = "https://github.com/niemiecjakub/league-tac-toe";

export const OG_LOCALE: Record<string, string> = {
    en: "en_US",
    "pt-BR": "pt_BR",
    tr: "tr_TR",
    "es-AR": "es_AR",
    ro: "ro_RO",
    pl: "pl_PL",
    es: "es_ES",
    de: "de_DE",
    fr: "fr_FR",
    it: "it_IT",
    ja: "ja_JP",
    ko: "ko_KR",
};

export type AppPath = "/" | "/champions";

export function localizedPath(locale: string, href: AppPath = "/"): string {
    return getPathname({ locale, href });
}

export function absoluteUrl(locale: string, href: AppPath = "/"): string {
    return `${SITE_URL}${localizedPath(locale, href)}`;
}

export function languageAlternates(href: AppPath = "/"): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
        languages[locale] = absoluteUrl(locale, href);
    }
    languages["x-default"] = absoluteUrl(routing.defaultLocale, href);
    return languages;
}

export function sitemapLanguages(href: AppPath = "/"): Record<string, string> {
    return languageAlternates(href);
}

export function pageMetadata({
    locale,
    path = "/",
    title,
    description,
    ogImage,
}: {
    locale: string;
    path?: AppPath;
    title: string;
    description: string;
    ogImage?: string;
}): Metadata {
    const url = absoluteUrl(locale, path);
    const image = ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates(path),
        },
        openGraph: {
            type: "website",
            locale: OG_LOCALE[locale] ?? locale.replace("-", "_"),
            url,
            siteName: SITE_NAME,
            title,
            description,
            ...(image ? { images: image } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export function jsonLdScript(data: unknown): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
