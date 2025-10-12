"use client";

import { useRoomStore } from "@/store/roomStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PostGameControls() {
    const { gameFinishedWithDraw, gameFinishedWithPlayerWin, youWon, handleRoomLeave } = useRoomStore((state) => state);
    const gameFinished = gameFinishedWithDraw() || gameFinishedWithPlayerWin();
    const router = useRouter();
    const t = useTranslations("game.postGame");

    const leaveRoom = async () => {
        await handleRoomLeave();
        router.push("/");
    };

    return (
        <Dialog open={gameFinished}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("gameFinished")}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div>
                        {gameFinishedWithPlayerWin() && <p className="text-lg font-semibold">{youWon() ? `${t("youWon")}` : `${t("youLost")}`}</p>}
                        {gameFinishedWithDraw() && <p className="text-lg font-sem ibold">{t("draw")}</p>}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={leaveRoom}>
                            {t("leave")}
                        </Button>
                    </DialogClose>
                    <Button>{t("playAgain")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
