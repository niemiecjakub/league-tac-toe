import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "seo.champions" });
    return pageMetadata({
        locale,
        path: "/champions",
        title: t("title"),
        description: t("description"),
    });
}

export default function ChampionsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
