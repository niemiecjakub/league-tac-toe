"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Game, GameSlot, GameStateType, Player, PlayerType } from "@/models/Game";
import { getCurrentGame, joinRoom, move, getRoom, skipMove } from "@/services/gameService";
import Board from "./board";
import DrawRequestPrompt from "./draw-request-pormpt";
import { Card } from "@/components/ui/card";
import { Room } from "@/models/Room";
import { connectToGameHub } from "@/lib/signalr";
import { getChampionNames } from "@/services/championService";
import { StealIcon } from "@/components/svg/svg-icons";
import { Button } from "@/components/ui/button";
import React from "react";
import Loading from "@/components/custom/loading";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;

    const [room, setRoom] = useState<Room>();
    const [game, setGame] = useState<Game>();
    const [gameSlot, setGameSlot] = useState<GameSlot | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [champions, setChampions] = useState<string[]>([]);

    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isYourTurn: boolean = gameSlot?.playerType === game?.currentPlayerTurn;

    useEffect(() => {
        let hubConnection: signalR.HubConnection;

        const setTimer = (turnTime: number | null) => {
            setTimeLeft(turnTime);

            if (turnTime === null) {
                return;
            }

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (!prev || prev <= 1) {
                        clearInterval(timerRef.current!);
                        handleTimeout();
                        return turnTime;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        const fetchGame = async () => {
            if (!id) return;

            try {
                const [roomData, gameSlotData, gameData, championNames] = await Promise.all([getRoom(id), joinRoom(id), getCurrentGame(id), getChampionNames()]);

                setRoom(roomData);
                setGameSlot(gameSlotData);
                setGame(gameData);
                setChampions(championNames);
                console.log("Room:", roomData);
                console.log("Game:", gameData);

                if (roomData?.turnTime != null) {
                    setTimer(roomData.turnTime);
                }
            } catch (error) {
                console.error("Failed to join game:", error);
            }
        };

        const setupSignalR = async () => {
            try {
                hubConnection = await connectToGameHub(id);

                hubConnection.on("MesageReceived", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                hubConnection.on("PlayerJoined", async () => {
                    const updatedGame = await getCurrentGame(id);
                    const updatedRoom = await getRoom(id);

                    setGame(updatedGame);
                    setRoom(updatedRoom);
                    setMessages((prevMessages) => [...prevMessages, `🔵 User has joined`]);
                    console.log("User Joined, fetching game data", updatedGame);
                    if (updatedGame.gameStatus === GameStateType.InProgress && updatedRoom?.turnTime != null) {
                        setTimer(updatedRoom.turnTime);
                    }
                });

                hubConnection.on("PlayerLeft", () => {
                    setMessages((prevMessages) => [...prevMessages, `🔴 User has left`]);
                });

                hubConnection.on("TurnSwitch", async (message: string) => {
                    try {
                        const updatedGame = await getCurrentGame(id);
                        const updatedRoom = await getRoom(id);

                        setGame(updatedGame);
                        setRoom(updatedRoom);

                        console.log("updatedGame", updatedGame);
                        if (updatedRoom?.turnTime != null) {
                            setTimer(updatedRoom.turnTime);
                        }

                        setMessages((prevMessages) => [...prevMessages, `* ${message}`]);
                    } catch (err) {
                        console.error("Error during TurnSwitch update:", err);
                    }
                });

                if (id) {
                    await hubConnection.invoke("JoinRoom", id);
                }
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        fetchGame();
        setupSignalR();

        return () => {
            if (hubConnection) {
                hubConnection.off("SendMessage");
                hubConnection.off("JoinRoom");
                hubConnection.off("LeaveRoom");
                hubConnection.off("TurnSwitch");
                hubConnection.stop();
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [id]);

    //TURN LOGIC
    async function handleClick(cellIndex: number, champion: string) {
        const gameData = await move(game!.roomUid, cellIndex + 1, champion);
        setGame(gameData);
        // if (isYourTurn && game?.gameStatus === GameStateType.InProgress) {
        //     const gameData = await move(game!.roomUid, cellIndex + 1);
        //     setGame(gameData);
        // }
    }

    async function skipTurn() {
        if (isYourTurn && game?.gameStatus === GameStateType.InProgress) {
            const game = await skipMove(id);
            setGame(game);
        }
    }

    async function handleTimeout() {
        if (isYourTurn && game?.gameStatus === GameStateType.InProgress) {
            const updatedGame = await skipMove(id);
            setGame(updatedGame);
        }
    }

    // DRAW LOGIC
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

    const isDraw = game?.gameStatus === GameStateType.Finished && game?.winner === null;
    const playerWon = game?.gameStatus === GameStateType.Finished && game?.winner !== null;

    return (
        <>
            {game ? (
                <Card className="flex flex-col items-center justify-center h-full w-full gap-0 border-0 shadow-none">
                    <div className="flex flex-col items-center justify-center w-full">
                        <h1>Game status: {GameStateType[game.gameStatus]}</h1>
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
                            <Button variant="secondary" onClick={skipTurn}>
                                Skip Turn
                            </Button>
                        </div>
                        <div className="mt-4 text-center">
                            {playerWon && <p className="text-lg font-semibold">Winner: {PlayerType[game?.winner!]}</p>}
                            {isDraw && <p className="text-lg font-semibold">It's a draw!</p>}
                            {game.gameStatus === GameStateType.InProgress && (
                                <>
                                    {gameSlot && <p className="text-lg font-semibold"> You are: {PlayerType[gameSlot.playerType]}</p>}
                                    <p className="text-lg font-semibold">{isYourTurn ? "Your turn" : "Opponent's turn"}</p>
                                    {timeLeft && <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:w-96 md:w-[28rem] lg:w-[32rem]">
                        <Board board={game.boardState} categories={game.categories} championNames={champions} onCellClick={handleClick} />
                        {room?.stealsEnabled && (
                            <div className="flex items-center py-1 px-2">
                                <StealIcon className="h-4 w-4 mr-1" />
                                <p className="text-xs">Means that you can steal your opponent's square. You have 3 steals remaining</p>
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
