"use client";

import { useRoomStore } from "@/store/roomStore";
import { PlayerType } from "@/models/Game";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Timer from "@/components/custom/timer";

export default function Dashboard() {
    const { room, isYourTurn, handleTurnSkip, handleSendDrawRequest, opponentDrawRequested, handleRespondDrawRequest } = useRoomStore((state) => state);
    const t = useTranslations("game.dashboard");

    function getDrawControls() {
        if (opponentDrawRequested()) {
            return (
                <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm">{t("draw.drawSuggested")}</p>
                    <Button variant="destructive" onClick={handleRespondDrawRequest}>
                        {t("draw.acceptDraw")}
                    </Button>
                </div>
            );
        }
        if (room?.game.drawRequestedId != null && !opponentDrawRequested()) {
            return (
                <Button className="text-gray-500" variant="secondary">
                    {t("draw.drawRequestSent")}
                </Button>
            );
        }

        return (
            <Button variant={isYourTurn() ? "default" : "ghost"} onClick={handleSendDrawRequest} className="px-1 py-0">
                {isYourTurn() && t("draw.requestDraw")}
            </Button>
        );
    }

    return (
        <div className="flex flex-col items-center w-full py-2">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                    <div className=" w-full flex justify-start">
                        <p className="text-sm ">{t("youAre", { player: PlayerType[room?.slot.playerType!] })}</p>
                    </div>
                    <div className="flex w-full font-semibold text-xl">
                        <div>{t("you")}</div>
                        <div className="px-2">
                            {room?.score.you} - {room?.score.opponent}
                        </div>
                        <div>{t("opponent")}</div>
                    </div>
                </div>
                <div className="flex space-x-2 items-center">
                    <div className="flex items-center justify-center bg-gray-300 rounded-lg text-sm h-[36px]">
                        <p className="px-2">{isYourTurn() ? `${t("yourTurn")}` : `${t("opponentsTurn")}`}</p>
                        <Button variant="destructive" onClick={handleTurnSkip} className={`px-1 py-0 ${isYourTurn() ? "" : "hidden"}`}>
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
