"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { connectToGameHub } from "@/lib/signalr";
import { CopyIcon, StealIcon } from "@/components/svg/svg-icons";
import { useChampionStore } from "@/store/championStore";
import { useRoomStore } from "@/store/roomStore";
import { GameStateType } from "@/models/Game";
import { useTranslations } from "next-intl";
import React from "react";
import Board from "./board";
import Loading from "@/components/custom/loading";
import Dashboard from "./dashboard";
import PostGameControls from "./post-game-controls";
import { skipMove } from "@/services/gameService";
import Messages from "@/components/custom/messages";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const t = useTranslations("game");
    const { setChampionNames } = useChampionStore((state) => state);
    const { room, joinRoom, updateRoom, handleTimeLeftUpdate, handleTurnSkip } = useRoomStore((state) => state);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        if (!id) return;

        let hubConnection: signalR.HubConnection;
        let isMounted = true;

        const init = async () => {
            try {
                await joinRoom(id);

                hubConnection = await connectToGameHub(id);

                hubConnection.on("MesageReceived", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                hubConnection.on("PlayerLeft", () => {
                    setMessages((prevMessages) => [...prevMessages, `🔴 User has left`]);
                });

                hubConnection.on("PlayerJoined", async () => {
                    if (!isMounted) return;
                    await updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `🔵 User has joined`]);
                });

                hubConnection.on("TurnSwitch", async (message: string) => {
                    if (!isMounted) return;
                    await updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `* ${message}`]);
                });

                hubConnection.on("DrawRequested", async (message: string) => {
                    if (!isMounted) return;
                    await updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `* ${message}`]);
                });

                hubConnection.on("TurnTimeTick", async (turnTimeLeft: number) => {
                    if (!isMounted) return;
                    handleTimeLeftUpdate(turnTimeLeft);
                    setMessages((prevMessages) => [...prevMessages, `[SERVER] Turn time left: ${turnTimeLeft} seconds`]);
                });

                hubConnection.on("Countdown", async (time: number) => {
                    if (!isMounted) return;
                    setMessages((prevMessages) => [...prevMessages, `[SERVER] Next game starting in: ${time} seconds`]);
                });

                hubConnection.on("NextGameStarted", async (message: string) => {
                    if (!isMounted) return;
                    await updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `[SERVER] Next game starting!`]);
                });

                await hubConnection.invoke("JoinRoom", id);
                setChampionNames();
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        init();

        return () => {
            isMounted = false;
            if (hubConnection) hubConnection.stop();
        };
    }, [id]);

    if (room?.game.gameStatus === GameStateType.Created) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <Card className="flex flex-col items-center justify-between gap-0 border-league-grey-200 p-2 space-y-4">
                    <p className="text-lg">{t("waitingRoom.shareCode")}</p>
                    <div className="flex flex-col w-full  bg-league-gold-100 dark:bg-league-grey-200 space">
                        <div className="flex p-2 rounded-t-xl space-x-2 justify-between items-center">
                            <div className="flex space-x-2 justify-center items-center">
                                <p className="text-sm lg:text-md">{t("waitingRoom.roomCode")}:</p>
                                <p className="text-sm lg:text-md">{room?.roomGuid}</p>
                            </div>
                            <CopyIcon className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(room?.roomGuid)} />
                        </div>
                        <div className="flex p-2 rounded-t-xl space-x-2">
                            <p className="text-sm lg:text-md">{window.location.href}</p>
                            <CopyIcon className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.href)} />
                        </div>
                    </div>
                    <p>{t("waitingRoom.waitingForPlayer")}</p>
                </Card>
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
                            <StealIcon className="h-4 w-4 mr-1" />
                            <p className="text-xs">{t("info.remainingSteals", { steals: room.slot.steals + "" })}</p>
                        </div>
                    )}
                </div>
                {/* <Messages messages={messages} /> */}
                <PostGameControls />
            </Card>
        );
    }

    // return (
    //     <div className="h-full w-full flex flex-col items-center justify-center">
    //         <Loading text="" />
    //     </div>
    // );
}
