"use client";

import { useRoomStore } from "@/store/roomStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PostGameControls() {
    const { gameFinishedWithDraw, gameFinishedWithPlayerWin, youWon, handleRoomLeave } = useRoomStore((state) => state);
    const gameFinished = gameFinishedWithDraw() || gameFinishedWithPlayerWin();
    const router = useRouter();

    const leaveRoom = async () => {
        await handleRoomLeave();
        router.push("/");
    };

    return (
        <Dialog open={gameFinished}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Game finished</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div>
                        {gameFinishedWithPlayerWin() && <p className="text-lg font-semibold">{youWon() ? "You won!" : "You lost!"}</p>}
                        {gameFinishedWithDraw() && <p className="text-lg font-sem ibold">It's a draw!</p>}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={leaveRoom}>
                            Leave
                        </Button>
                    </DialogClose>
                    <Button>Play again</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
