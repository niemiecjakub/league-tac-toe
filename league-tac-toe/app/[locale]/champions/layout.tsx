import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "seo.champions" });

    const title = t("title");
    const description = t("description");
    const url = `${metadataBase}${locale === "en" ? "" : `/${locale}`}/champions`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: `${metadataBase}/images/champions.jpg`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            title,
            description,
            images: [`${metadataBase}/images/champions.jpg`],
        },
    };
}

export default function ChampionsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
