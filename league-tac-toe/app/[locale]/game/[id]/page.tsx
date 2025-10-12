"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Board from "./board";
import { Card } from "@/components/ui/card";
import { connectToGameHub } from "@/lib/signalr";
import { CopyIcon, StealIcon } from "@/components/svg/svg-icons";
import React from "react";
import Loading from "@/components/custom/loading";
import { useChampionStore } from "@/store/championStore";
import { useRoomStore } from "@/store/roomStore";
import Dashboard from "./dashboard";
import PostGameControls from "./post-game-controls";
import { GameStateType } from "@/models/Game";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const { setChampionNames } = useChampionStore((state) => state);
    const { room, joinRoom, updateRoom } = useRoomStore((state) => state);

    const [messages, setMessages] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    // const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let hubConnection: signalR.HubConnection;

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

        const setupSignalR = async () => {
            try {
                hubConnection = await connectToGameHub(id);

                hubConnection.on("MesageReceived", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                hubConnection.on("PlayerJoined", async () => {
                    updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `🔵 User has joined`]);
                    // console.log("User Joined, fetching game data", updatedRoom.game);
                    // if (updatedRoom.game.gameStatus === GameStateType.InProgress && updatedRoom?.turnTime != null) {
                    //     // setTimer(updatedRoom.turnTime);
                    // }
                });

                hubConnection.on("PlayerLeft", () => {
                    setMessages((prevMessages) => [...prevMessages, `🔴 User has left`]);
                });

                hubConnection.on("TurnSwitch", async (message: string) => {
                    updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `* ${message}`]);
                });

                hubConnection.on("DrawRequested", async (message: string) => {
                    updateRoom(id);
                    setMessages((prevMessages) => [...prevMessages, `* ${message}`]);
                });

                if (id) {
                    await hubConnection.invoke("JoinRoom", id);
                }
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        joinRoom(id);
        setupSignalR();
        setChampionNames();

        return () => {
            if (hubConnection) {
                hubConnection.off("SendMessage");
                hubConnection.off("JoinRoom");
                hubConnection.off("LeaveRoom");
                hubConnection.off("TurnSwitch");
                hubConnection.off("DrawRequested");
                hubConnection.stop();
            }
            // if (timerRef.current) {
            //     clearInterval(timerRef.current);
            // }
        };
    }, [id]);

    // async function handleTimeout() {
    //     if (isYourTurn && room?.game.gameStatus === GameStateType.InProgress) {
    //         const roomData = await skipMove(id);
    //         setRoom(roomData);
    //     }
    // }

    if (room?.game.gameStatus === GameStateType.InProgress) {
        return (
            <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none sm:w-96 md:w-[28rem] lg:w-[32rem]">
                <Dashboard />
                {timeLeft && <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>}
                <div className="flex flex-col items-center justify-center">
                    <Board board={room?.game.boardState} categories={room?.game.categories} />
                    {room?.stealsEnabled && (
                        <div className="flex items-center py-1 px-2">
                            <StealIcon className="h-4 w-4 mr-1" />
                            <p className="text-xs">Means that you can steal your opponent's square. You have {room.slot.steals} steals remaining</p>
                        </div>
                    )}
                </div>
                <PostGameControls />
            </Card>
        );
    }

    if (room?.game.gameStatus === GameStateType.Created) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <Card className="flex flex-col items-center justify-between gap-0 border-league-grey-200 p-2 space-y-4">
                    <p className="text-lg">Share room code or link</p>
                    <div className="flex flex-col w-full  bg-league-gold-100 space">
                        <div className="flex p-2 rounded-t-xl space-x-2 justify-between items-center">
                            <div className="flex space-x-2 justify-center items-center">
                                <p className="text-sm lg:text-md">Room code:</p>
                                <p className="text-sm lg:text-md">{room?.roomGuid}</p>
                            </div>
                            <CopyIcon className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(room?.roomGuid)} />
                        </div>
                        <div className="flex p-2 rounded-t-xl space-x-2">
                            <p className="text-sm lg:text-md">{window.location.href}</p>
                            <CopyIcon className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.href)} />
                        </div>
                    </div>
                    <p>The game will start once other player joins</p>
                </Card>
            </div>
        );
    }
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Loading text="" />
        </div>
    );
}
