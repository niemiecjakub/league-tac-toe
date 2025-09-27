"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { GameStateType, Player, PlayerType } from "@/models/Game";
import { joinRoom, move, skipMove, getRoom } from "@/services/gameService";
import Board from "./board";
import DrawRequestPrompt from "./draw-request-pormpt";
import { Card } from "@/components/ui/card";
import { Room } from "@/models/Room";
import { connectToGameHub } from "@/lib/signalr";
import { StealIcon } from "@/components/svg/svg-icons";
import { Button } from "@/components/ui/button";
import React from "react";
import Loading from "@/components/custom/loading";
import { useChampionStore } from "@/store/championStore";
import { useRoomStore } from "@/store/roomStore";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const { setChampionNames } = useChampionStore((state) => state);
    const { room, joinRoom, updateRoom, handleTurnSkip: skipTurn, isDraw, isYourTurn, playerWon } = useRoomStore((state) => state);
    const [messages, setMessages] = useState<string[]>([]);

    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
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

    function requestDraw() {
        // const nextPlayer = currentPlayer === "X" ? "O" : "X";
        // setDrawRequestedBy(currentPlayer);
        // setCurrentPlayer(nextPlayer);
        // setTimeLeft(TURN_TIME);
    }

    function acceptDraw() {
        // setWinner("Draw");
        // setDrawRequestedBy(null);
    }

    function rejectDraw() {
        // setDrawRequestedBy(null);
    }

    return (
        <>
            {room?.game.gameStatus === GameStateType.InProgress ? (
                <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none">
                    <div className="flex flex-col items-center justify-center w-full">
                        <h1>Game status: {GameStateType[room?.game.gameStatus]}</h1>
                        <div className="flex w-full justify-center">
                            <p className="text-xl font-bold text-center">
                                X {scoreX} - {scoreO} O
                            </p>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            {!drawRequestedBy && (
                                <Button variant="secondary" onClick={requestDraw}>
                                    Request Draw
                                </Button>
                            )}
                            <Button variant="secondary" onClick={() => skipTurn(id)}>
                                Skip Turn
                            </Button>
                        </div>
                        <div className="mt-4 text-center">
                            {playerWon() && <p className="text-lg font-semibold">Winner: {PlayerType[room?.game?.winner!]}</p>}
                            {isDraw() && <p className="text-lg font-semibold">It's a draw!</p>}
                            {room?.slot && <p className="text-lg font-semibold"> You are: {PlayerType[room?.slot.playerType]}</p>}
                            <p className="text-lg font-semibold">{isYourTurn() ? "Your turn" : "Opponent's turn"}</p>
                            {timeLeft && <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:w-96 md:w-[28rem] lg:w-[32rem]">
                        <Board board={room?.game.boardState} categories={room?.game.categories} />
                        {room?.stealsEnabled && (
                            <div className="flex items-center py-1 px-2">
                                <StealIcon className="h-4 w-4 mr-1" />
                                <p className="text-xs">Means that you can steal your opponent's square. You have {room.slot.steals} steals remaining</p>
                            </div>
                        )}
                    </div>
                    <DrawRequestPrompt drawRequestedBy={drawRequestedBy} onAccept={acceptDraw} onReject={rejectDraw} />
                </Card>
            ) : (
                <div className="flex items-center justify-center h-full w-full">
                    <Loading text="Loading game" />
                </div>
            )}
        </>
    );
}
