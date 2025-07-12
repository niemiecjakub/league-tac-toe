import { Metadata } from "next";
import { LobbyOptions } from "./lobby-options";

export const metadata: Metadata = {
    title: "League Tac Toe Lobby",
    description: "Select game options and start game.",
};

export default async function LobbyPage() {
    return (
        <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex w-2/3">
            <h2 className="text-2xl font-semibold tracking-tight">Lobby</h2>
            <LobbyOptions />
        </div>
    );
}
