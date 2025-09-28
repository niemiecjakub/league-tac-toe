"use client";

import { useRoomStore } from "@/store/roomStore";
import { Button } from "@/components/ui/button";

export default function DrawControls() {
    const { room, handleSendDrawRequest, opponentDrawRequested, handleRespondDrawRequest } = useRoomStore((state) => state);

    if (opponentDrawRequested()) {
        return (
            <div className="mt-4 p-4 border rounded bg-yellow-50 text-center">
                <p className="mb-2 font-semibold">Your opponent to draw the game</p>
                <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={handleRespondDrawRequest}>
                        Accept
                    </Button>
                </div>
            </div>
        );
    }
    if (room?.game.drawRequestedId != null && !opponentDrawRequested()) {
        return <p className="text-sm italic text-gray-500">Waiting for opponent to respond to draw request...</p>;
    }

    return (
        <Button variant="secondary" onClick={handleSendDrawRequest}>
            Request Draw
        </Button>
    );
}
