import "./globals.css";
import type { Metadata } from "next";
import Navbar, { UiMode } from "@/components/custom/navbar";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import BuyMeACoffeeWidget from "@/components/custom/buy-me-a-coffee";
import Footer from "@/components/custom/footer";

export const metadata: Metadata = {
    title: "League Tac Toe",
    description: "A game of Tic Tac Toe with League of Legends champions.",
};

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

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased">
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme={UiMode.DARK} enableSystem disableTransitionOnChange>
                        <div className="w-full max-h-screen flex flex-col items-center">
                            <Navbar />
                            <BuyMeACoffeeWidget />
                            <div className="flex h-screen flex-col items-center w-full px-2 sm:px-0">{children}</div>
                        </div>
                        <ToastContainer autoClose={1000} position="top-center" />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
