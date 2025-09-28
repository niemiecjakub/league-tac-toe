"use client";

import { useRoomStore } from "@/store/roomStore";
import { PlayerType } from "@/models/Game";

export default function PostGameControls() {
    const { room, isDraw, playerWon } = useRoomStore((state) => state);

    return (
        <div className="mt-4 text-center">
            {playerWon() && <p className="text-lg font-semibold">Winner: {PlayerType[room?.game?.winner!]}</p>}
            {isDraw() && <p className="text-lg font-semibold">It's a draw!</p>}
        </div>
    );
}
