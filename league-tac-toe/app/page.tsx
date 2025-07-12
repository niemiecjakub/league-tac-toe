import { getChampions } from "@/services/championService";
import Link from "next/link";

export default async function Home() {
    return (
        <div>
            <h1 className="text-4xl font-semibold">League Tac Toe</h1>
            <Link href="/champions" className="text-blue-600 underline">
                Champions
            </Link>
            <br />
            <Link href="/lobby" className="text-blue-600 underline">
                Lobby
            </Link>
            <br />
            <Link href="/game" className="text-blue-600 underline">
                Game
            </Link>
        </div>
    );
}
