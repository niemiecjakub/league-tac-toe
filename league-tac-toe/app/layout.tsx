import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "League Tac Toe",
    description: "A game of Tic Tac Toe with League of Legends champions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <div className="w-full h-screen flex flex-col items-center">
                    <div className="w-full flex justify-center items-center px-4 py-2 sticky top-0 z-50 border-b-league-gold-200 border-b">
                        <div className="w-full flex items-center gap-10">
                            <div className="flex items-center gap-2">
                                <img src="/lolicon.svg" alt="League of Legends Icon" className="h-[32px]" />
                                <Link href="/">
                                    <h1 className="text-xl font-semibold uppercase">League Tac Toe</h1>
                                </Link>
                            </div>
                            <Link href="/champions">Champions</Link>
                        </div>
                    </div>
                    <div className="flex h-screen flex-col items-center w-full">{children}</div>
                </div>
            </body>
        </html>
    );
}
