import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
    title: "League Tac Toe",
    description: "A game of Tic Tac Toe with League of Legends champions.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <NextIntlClientProvider>
                    <div className="w-full max-h-screen flex flex-col items-center">
                        <Navbar />
                        <div className="flex h-screen flex-col items-center w-full px-2 sm:px-0">{children}</div>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
