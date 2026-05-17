"use client";

import { useRoomStore } from "@/store/roomStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { PlayerType } from "@/models/Game";

type PostGameControlsProps = {
    mode?: "online" | "local";
};

export default function PostGameControls({ mode = "online" }: PostGameControlsProps) {
    const { gameFinishedWithDraw, gameFinishedWithPlayerWin, youWon, handleRoomLeave, room } = useRoomStore((state) => state);
    const gameFinished = gameFinishedWithDraw() || gameFinishedWithPlayerWin();
    const router = useRouter();
    const t = useTranslations("game.postGame");
    const tLocal = useTranslations("game.postGame.local");

    const leaveRoom = async () => {
        await handleRoomLeave();
        router.push("/");
    };

    const getResultMessage = () => {
        if (gameFinishedWithDraw()) {
            return t("draw");
        }
        if (!gameFinishedWithPlayerWin()) {
            return null;
        }
        if (mode === "local" && room?.game.winner != null) {
            return tLocal("playerWon", { player: PlayerType[room.game.winner] });
        }
        return youWon() ? t("youWon") : t("youLost");
    };

    return (
        <Dialog open={gameFinished}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("gameFinished")}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div>
                        <p className="text-lg font-semibold">{getResultMessage()}</p>
                    </div>
                    <span>{t("nextGameStartSoon")}</span>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={leaveRoom}>
                            {t("leave")}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
