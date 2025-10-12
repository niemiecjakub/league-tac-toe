"use client";

import { useRoomStore } from "@/store/roomStore";
import { PlayerType } from "@/models/Game";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { room, isYourTurn, handleTurnSkip, handleSendDrawRequest, opponentDrawRequested, handleRespondDrawRequest } = useRoomStore((state) => state);

    console.log(opponentDrawRequested());
    function getDrawControls() {
        if (opponentDrawRequested()) {
            return (
                <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm">Your opponent suggests to draw the game</p>
                    <Button variant="destructive" onClick={handleRespondDrawRequest}>
                        Accept draw
                    </Button>
                </div>
            );
        }
        if (room?.game.drawRequestedId != null && !opponentDrawRequested()) {
            return (
                <Button className="text-gray-500" variant="secondary">
                    Draw request sent
                </Button>
            );
        }

        return (
            <Button variant={isYourTurn() ? `default` : `secondary`} onClick={handleSendDrawRequest}>
                Request Draw
            </Button>
        );
    }

    return (
        <div className="flex flex-col items-center w-full py-2">
            <div className=" w-full flex justify-start">
                <p className="text-sm ">You are '{PlayerType[room?.slot.playerType!]}'</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="flex w-full text-lg font-semibold">
                        <div>You</div>
                        <div className="px-2">
                            {room?.score.you} - {room?.score.opponent}
                        </div>
                        <div>Opponent</div>
                    </div>
                </div>
                <div className="flex space-x-2 items-center">
                    <p className="text-lg font-semibold">{isYourTurn() ? "Your turn" : "Opponent's turn"}</p>
                    <Button variant={isYourTurn() ? `destructive` : `secondary`} onClick={handleTurnSkip}>
                        Skip Turn
                    </Button>
                </div>
            </div>
            <div className="w-full flex justify-between items-center">
                {room?.turnTime == null && <p>No time limit</p>}
                <div>{getDrawControls()}</div>
            </div>
        </div>
    );
}
