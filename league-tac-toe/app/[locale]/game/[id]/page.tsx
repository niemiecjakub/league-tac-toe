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

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const t = useTranslations("game");
    const { setChampionNames } = useChampionStore((state) => state);
    const { room, joinRoom, updateRoom } = useRoomStore((state) => state);

    const [messages, setMessages] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    // const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!id) return;

        let hubConnection: signalR.HubConnection;
        let isMounted = true;

        // const setTimer = (turnTime: number | null) => {
        //     setTimeLeft(turnTime);

        //     if (turnTime === null) {
        //         return;
        //     }

        //     if (timerRef.current) {
        //         clearInterval(timerRef.current);
        //     }

        //     timerRef.current = setInterval(() => {
        //         setTimeLeft((prev) => {
        //             if (!prev || prev <= 1) {
        //                 clearInterval(timerRef.current!);
        //                 handleTimeout();
        //                 return turnTime;
        //             }
        //             return prev - 1;
        //         });
        //     }, 1000);
        // };

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
                    // console.log("User Joined, fetching game data", updatedRoom.game);
                    // if (updatedRoom.game.gameStatus === GameStateType.InProgress && updatedRoom?.turnTime != null) {
                    //     // setTimer(updatedRoom.turnTime);
                    // }
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

                await hubConnection.invoke("JoinRoom", id);
                setChampionNames();
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        init();

        async function setupSignalR() {
            await init();
        }
        return () => {
            isMounted = false;
            if (hubConnection) hubConnection.stop();
        };
    }, [id]);

    // async function handleTimeout() {
    //     if (isYourTurn && room?.game.gameStatus === GameStateType.InProgress) {
    //         const roomData = await skipMove(id);
    //         setRoom(roomData);
    //     }
    // }

    if (room?.game.gameStatus === GameStateType.Created) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <Card className="flex flex-col items-center justify-between gap-0 border-league-grey-200 p-2 space-y-4">
                    <p className="text-lg">{t("waitingRoom.shareCode")}</p>
                    <div className="flex flex-col w-full  bg-league-gold-100 space">
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
            <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none sm:w-96 md:w-[28rem] lg:w-[32rem]">
                <Dashboard />
                {timeLeft && <p className="text-sm text-gray-500">{t("info.timeLeft", { timeLeft: timeLeft })}</p>}
                <div className="flex flex-col items-center justify-center">
                    <Board board={room?.game.boardState} categories={room?.game.categories} />
                    {room?.stealsEnabled && (
                        <div className="flex items-center py-1 px-2">
                            <StealIcon className="h-4 w-4 mr-1" />
                            <p className="text-xs">{t("info.remainingSteals", { steals: room.slot.steals + "" })}</p>
                        </div>
                    )}
                </div>
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
