"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { connectToGameHub } from "@/lib/signalr";
import { StealIcon } from "@/components/svg/svg-icons";
import { useChampionStore } from "@/store/championStore";
import { useRoomStore } from "@/store/roomStore";
import { GameStateType } from "@/models/Game";
import { useTranslations } from "next-intl";
import React from "react";
import Board from "./board";
import Loading from "@/components/custom/loading";
import Dashboard from "./dashboard";
import PostGameControls from "./post-game-controls";
import { useTheme } from "next-themes";
import { UiMode } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const t = useTranslations("game");
    const { setChampions } = useChampionStore((state) => state);
    const { room, updateRoom, handleTimeLeftUpdate, handleRoomLeave, joinRoom } = useRoomStore((state) => state);
    const { theme } = useTheme();

    useEffect(() => {
        if (!id) return;

        let hubConnection: signalR.HubConnection;
        let isMounted = true;

        const init = async () => {
            try {
                hubConnection = await connectToGameHub(id);

                hubConnection.on("PlayerLeft", () => {
                    toast.warn(
                        <div className="flex flex-col">
                            <strong>{t("info.opponentLeft")}</strong>
                            <div>{t("info.returningToMenu")}.</div>
                        </div>,
                        {
                            theme: theme,
                            autoClose: 2000,
                            onClose: () => (window.location.href = "/"),
                        }
                    );
                });

                hubConnection.on("PlayerJoined", async () => {
                    if (!isMounted) return;
                    await updateRoom(id);
                    toast.success(t("info.opponentJoined"), { theme: theme, autoClose: 1000 });
                });

                hubConnection.on("TurnSwitch", async () => {
                    if (!isMounted) return;
                    await updateRoom(id);
                });

                hubConnection.on("DrawRequested", async () => {
                    if (!isMounted) return;
                    await updateRoom(id);
                });

                hubConnection.on("TurnTimeTick", async (turnTimeLeft: number) => {
                    if (!isMounted) return;
                    handleTimeLeftUpdate(turnTimeLeft);
                });

                hubConnection.on("NextGameStarted", async () => {
                    if (!isMounted) return;
                    await updateRoom(id);
                });

                //If user connects via link
                if (document.referrer === "") {
                    await joinRoom(id);
                }
                await setChampions();
                await hubConnection.invoke("JoinRoom", id);
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        init();

        return () => {
            console.log("disposing");
            isMounted = false;

            if (hubConnection) {
                (async () => {
                    await hubConnection.invoke("LeaveRoom", id);
                    await hubConnection.stop();
                    console.log("disconnected");
                    handleRoomLeave();
                })();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const copyRoomCode = () => {
        navigator.clipboard.writeText(room!.roomGuid);
        toast.info(t("waitingRoom.roomCodeCopied"), {
            theme: theme,
        });
    };

    const copyRoomLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.info(t("waitingRoom.roomLinkCopied"), {
            theme: theme,
        });
    };

    if (room?.game.gameStatus === GameStateType.Created) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                {room.isPublic ? (
                    <Loading text={t("waitingRoom.searchingOpponent")} />
                ) : (
                    <Card className="flex flex-col items-center justify-between gap-0 p-2 bg-league-gold-100 dark:bg-league-grey-200">
                        <p>{t("waitingRoom.waitingForPlayer")}</p>
                        <p className="text-lg">{t("waitingRoom.shareCode")}</p>
                        <div className="flex flex-col w-full">
                            <div className="flex space-x-2 justify-center items-center">
                                <p className="text-sm lg:text-md py-4">
                                    {t("waitingRoom.roomCode")}: {room?.roomGuid}
                                </p>
                            </div>
                            <div className="flex w-full justify-center items-center space-x-4">
                                <Button className="flex-1 w-full cursor-pointer hover:opacity-30" onClick={copyRoomCode}>
                                    {t("waitingRoom.copyCode")}
                                </Button>
                                <Button className="flex-1 w-full cursor-pointer hover:opacity-30" onClick={copyRoomLink}>
                                    {t("waitingRoom.copyLink")}
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        );
    }

    if (room?.game.gameStatus === GameStateType.InProgress || room?.game.gameStatus === GameStateType.Finished) {
        return (
            <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none sm:w-96 md:w-[28rem] lg:w-[32rem] dark:bg-league-black-200">
                <Dashboard />
                <div className="flex flex-col items-center justify-center">
                    <Board board={room?.game.boardState} categories={room?.game.categories} />
                    {room?.stealsEnabled && (
                        <div className="flex items-center py-1 px-2">
                            <StealIcon className="h-4 w-4 mr-1 fill-current" fill={theme == UiMode.LIGHT ? "#000000" : "#FFFFFF"} />
                            <p className="text-xs">{t("info.remainingSteals", { steals: room.slot.steals + "" })}</p>
                        </div>
                    )}
                </div>
                <PostGameControls />
            </Card>
        );
    }
}
