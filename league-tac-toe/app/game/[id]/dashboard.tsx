"use client";

import { useRoomStore } from "@/store/roomStore";
import { GameStateType, PlayerType } from "@/models/Game";
import { Button } from "@/components/ui/button";
import DrawControls from "./draw-controls";

const getOpponentSign = (player: PlayerType | undefined) => {
    if (player === PlayerType.X) return PlayerType[PlayerType.O];
    if (player === PlayerType.O) return PlayerType[PlayerType.X];
};

export default function Dashboard() {
    const { room, isYourTurn, handleTurnSkip } = useRoomStore((state) => state);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1>Game status: {GameStateType[room?.game.gameStatus!]}</h1>
            <div className="flex w-full justify-center">
                <p className="text-xl font-bold text-center">
                    You ({PlayerType[room?.slot.playerType!]}) {room?.score.you} - {room?.score.opponent} ({getOpponentSign(room?.slot.playerType)}) Opponent
                </p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <DrawControls />
                <Button variant="secondary" onClick={handleTurnSkip}>
                    Skip Turn
                </Button>
            </div>
            <div className="mt-4 text-center">
                {room?.slot && <p className="text-lg font-semibold"> You are: {PlayerType[room?.slot.playerType]}</p>}
                <p className="text-lg font-semibold">{isYourTurn() ? "Your turn" : "Opponent's turn"}</p>
            </div>
        </div>
    );
}
