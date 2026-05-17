"use client";

import { useRoomStore } from "@/store/roomStore";
import { PlayerType } from "@/models/Game";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Timer from "@/components/custom/timer";

export default function LocalDashboard() {
    const { room, isYourTurn, handleTurnSkip, handleSendDrawRequest, opponentDrawRequested, handleRespondDrawRequest } =
        useRoomStore((state) => state);
    const t = useTranslations("game.dashboard");
    const tLocal = useTranslations("game.dashboard.local");

    const activePlayer = room?.game.currentPlayerTurn != null ? PlayerType[room.game.currentPlayerTurn] : "";

    function getDrawControls() {
        if (opponentDrawRequested()) {
            return (
                <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm">{tLocal("drawSuggested")}</p>
                    <Button variant="destructive" onClick={handleRespondDrawRequest} aria-label={t("draw.acceptDraw")}>
                        {t("draw.acceptDraw")}
                    </Button>
                </div>
            );
        }
        if (room?.game.drawRequestedId != null && !opponentDrawRequested()) {
            return (
                <Button className="text-gray-500" variant="secondary" aria-label={t("draw.drawRequestSent")}>
                    {t("draw.drawRequestSent")}
                </Button>
            );
        }

        return (
            <Button variant={isYourTurn() ? "default" : "ghost"} onClick={handleSendDrawRequest} className="px-1 py-0" aria-label={t("draw.requestDraw")}>
                {isYourTurn() && t("draw.requestDraw")}
            </Button>
        );
    }

    return (
        <div className="flex flex-col items-center w-full py-2 text-black dark:text-white">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex justify-start">
                        <p className="text-sm invisible select-none" aria-hidden="true">
                            &nbsp;
                        </p>
                    </div>
                    <div className="flex w-full font-semibold text-xl">
                        <div>{tLocal("scoreX")}</div>
                        <div className="px-2">
                            {room?.score.you} - {room?.score.opponent}
                        </div>
                        <div>{tLocal("scoreO")}</div>
                    </div>
                </div>
                <div className="flex space-x-2 items-center">
                    <div className="flex items-center justify-center bg-gray-300 rounded-lg text-sm h-[36px]" aria-live="polite" aria-atomic="true">
                        <p className="px-2 dark:text-black">{tLocal("playerTurn", { player: activePlayer })}</p>
                        <Button
                            variant="destructive"
                            onClick={handleTurnSkip}
                            className={`dark:text-black px-1 py-0 ${isYourTurn() ? "" : "hidden"} `}
                            aria-label={t("skipTurn")}
                        >
                            {t("skipTurn")}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between items-center h-[36px]">
                <Timer />
                <div>{getDrawControls()}</div>
            </div>
        </div>
    );
}
