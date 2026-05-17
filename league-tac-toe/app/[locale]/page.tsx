import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LobbyOnline from "@/components/custom/lobby-online";
import LobbyRandom from "@/components/custom/lobby-random";
import LobbyLocal from "@/components/custom/lobby-local";
import RuleList from "@/components/custom/rule-list";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

const metadataBase = new URL("https://leaguetactoe.com");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "seo.home" });

    const title = t("title");
    const description = t("description");
    const url = `${metadataBase}${locale === "en" ? "" : `/${locale}`}`;

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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "home" });

    return (
        <div className="w-full md:w-2/3 2xl:w-2/5 h-full flex items-center flex-col gap-0.5">
            <section className="flex gap-4 items-baseline justify-center py-4">
                <Image src="/images/poro.png" alt="Poro Icon" height={32} width={32} />
                <h1 className="text-center text-4xl lg:text-6xl font-extrabold tracking-tight text-balance">League Tac Toe</h1>
                <Image src="/images/poro.png" alt="Poro Icon" height={32} width={32} />
            </section>
            <p className="text-xs">{t("subtitle")}</p>
            <section className="flex flex-col items-center justify-center">
                <p className="text-xs lg:text-lg text-center">{t("description1")}</p>
                <p className="text-xs lg:text-lg text-center">{t("description2")}</p>
            </section>
            <section className="flex w-full flex-col gap-6 my-4">
                <Tabs defaultValue="online">
                    <TabsList className="w-full">
                        <TabsTrigger value="online">{t("online")}</TabsTrigger>
                        <TabsTrigger value="random">{t("randomOpponent")}</TabsTrigger>
                        <TabsTrigger value="local">{t("sameScreen")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="online">
                        <LobbyOnline />
                    </TabsContent>
                    <TabsContent value="random">
                        <LobbyRandom />
                    </TabsContent>
                    <TabsContent value="local">
                        <LobbyLocal />
                    </TabsContent>
                </Tabs>
            </section>
            <RuleList />
        </div>
    );
}
