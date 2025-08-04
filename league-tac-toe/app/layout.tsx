import type { Metadata } from "next";
import "./globals.css";

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
                    <div className="w-full bg-league-black-200  flex justify-center items-center py-2 sticky top-0 z-50 border-b-league-gold-200 border-b">
                        <img src="/lolicon.svg" alt="League of Legends Icon" className="h-[48px]" />
                        <h1 className="text-4xl font-semibold uppercase">League Tac Toe</h1>
                    </div>
                    <div className="flex h-screen flex-col items-center w-full">{children}</div>
                </div>
            </body>
        </html>
    );
}
