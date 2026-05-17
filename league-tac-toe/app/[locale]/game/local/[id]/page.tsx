"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { StealIcon } from "@/components/svg/svg-icons";
import { useChampionStore } from "@/store/championStore";
import { useRoomStore } from "@/store/roomStore";
import { GameStateType } from "@/models/Game";
import { useTranslations } from "next-intl";
import Board from "../../[id]/board";
import LocalDashboard from "@/components/custom/local-dashboard";
import PostGameControls from "../../[id]/post-game-controls";
import { useTheme } from "next-themes";
import { UiMode } from "@/components/custom/navbar";
import Loading from "@/components/custom/loading";

export default function LocalGamePage() {
    const params = useParams();
    const id = params?.id as string;
    const t = useTranslations("game");
    const { theme } = useTheme();
    const { setChampions } = useChampionStore((state) => state);
    const { room, updateRoom, handleRoomLeave, handleTimeLeftUpdate } = useRoomStore((state) => state);
    const rematchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!id) return;

        const init = async () => {
            await setChampions();
            if (!useRoomStore.getState().room) {
                await updateRoom(id);
            }
        };

        init();

        return () => {
            if (rematchTimeoutRef.current) {
                clearTimeout(rematchTimeoutRef.current);
            }
            handleRoomLeave();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (!room || room.turnTime == null || room.turnTime <= 0) return;
        if (room.game.gameStatus !== GameStateType.InProgress) return;

        handleTimeLeftUpdate(room.turnTime);

        const interval = setInterval(() => {
            const state = useRoomStore.getState();
            const current = state.turnTimeLeft;
            if (current === null) return;
            if (current <= 1) {
                clearInterval(interval);
                void state.handleTurnSkip();
                return;
            }
            state.handleTimeLeftUpdate(current - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [room, handleTimeLeftUpdate]);

    useEffect(() => {
        if (!id || room?.game.gameStatus !== GameStateType.Finished) return;

        rematchTimeoutRef.current = setTimeout(() => {
            void updateRoom(id);
        }, 3500);

        return () => {
            if (rematchTimeoutRef.current) {
                clearTimeout(rematchTimeoutRef.current);
            }
        };
    }, [id, room?.game.gameStatus, room?.game.id, updateRoom]);

    if (!room) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <Loading text={t("waitingRoom.searchingOpponent")} />
            </div>
        );
    }

    if (room.game.gameStatus === GameStateType.InProgress || room.game.gameStatus === GameStateType.Finished) {
        return (
            <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none sm:w-96 md:w-[28rem] lg:w-[32rem] dark:bg-league-black-200">
                <LocalDashboard />
                <div className="flex flex-col items-center justify-center">
                    <Board board={room.game.boardState} categories={room.game.categories} />
                    {room.stealsEnabled && (
                        <div className="flex items-center py-1 px-2">
                            <StealIcon className="h-4 w-4 mr-1 fill-current" fill={theme == UiMode.LIGHT ? "#000000" : "#FFFFFF"} />
                            <p className="text-xs">{t("info.remainingSteals", { steals: room.slot.steals + "" })}</p>
                        </div>
                    )}
                </div>
                <PostGameControls mode="local" />
            </Card>
        );
    }

    return null;
}
