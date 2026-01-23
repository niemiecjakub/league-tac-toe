import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Game - League Tac Toe",
        description: "Play League Tac Toe",
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
            },
        },
    };
}

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return children;
}
