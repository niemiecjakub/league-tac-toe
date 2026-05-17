import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar, { UiMode } from "@/components/custom/navbar";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import BuyMeACoffeeWidget from "@/components/custom/buy-me-a-coffee";

const metadataBase = new URL("https://leaguetactoe.com");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "seo" });

    const title = t("title");
    const description = t("description");
    const url = `${metadataBase}${locale === "en" ? "" : `/${locale}`}`;

    return {
        metadataBase,
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(
                routing.locales.map((loc) => [loc, `${metadataBase}${loc === "en" ? "" : `/${loc}`}`])
            ),
        },
        openGraph: {
            type: "website",
            locale: locale,
            url: url,
            siteName: title,
            title: title,
            description: description,
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
            card: "summary_large_image",
            title: title,
            description: description,
            images: [`${metadataBase}/images/champions.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: title,
        },
    };
}

export async function generateViewport(): Promise<Viewport> {
    return {
        themeColor: "#1f2937",
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "seo" });

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t("title"),
        description: t("description"),
        url: metadataBase.toString(),
        applicationCategory: "Game",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        inLanguage: routing.locales,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </head>
            <body className="antialiased">
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme={UiMode.DARK} disableTransitionOnChange>
                        <div className="w-full max-h-screen flex flex-col items-center">
                            <header className="w-full">
                                <Navbar />
                            </header>
                            <BuyMeACoffeeWidget />
                            <main className="flex h-screen flex-col items-center w-full px-2 sm:px-0">{children}</main>
                        </div>
                        <ToastContainer autoClose={1000} position="top-center" />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
