"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Game, GameSlot, GameStateType, Player } from "@/models/Game";
import { getCurrentGame, joinRoom, move, getRoom, skipMove } from "@/services/gameService";
import ScoreBoard from "./score-board";
import Board from "./board";
import GameStatus from "./game-status";
import DrawRequestPrompt from "./draw-request-pormpt";
import Controls from "./controls";
import { Card } from "@/components/ui/card";
import { Room } from "@/models/Room";
import { connectToGameHub } from "@/lib/signalr";

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;

    const [room, setRoom] = useState<Room>();
    const [game, setGame] = useState<Game>();
    const [gameSlot, setGameSlot] = useState<GameSlot | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

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
                const [roomData, gameSlotData, gameData] = await Promise.all([getRoom(id), joinRoom(id), getCurrentGame(id)]);

                setRoom(roomData);
                setGameSlot(gameSlotData);
                setGame(gameData);

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
    async function handleClick(cellIndex: number) {
        if (isYourTurn && game?.gameStatus === GameStateType.InProgress) {
            const gameData = await move(game!.roomUid, cellIndex + 1);
            setGame(gameData);
        }
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

    return (
        <div>
            <h1>Game Room: {id}</h1>

            <div className="mt-4">
                <p>Messages:</p>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                {game ? (
                    <div className="flex flex-col items-center justify-center min-h-screen p-4">
                        <Card className="p-6 w-[320px]">
                            <ScoreBoard scoreX={scoreX} scoreO={scoreO} />
                            <Board board={game.boardState} categories={game.categories} onCellClick={handleClick} />
                            <GameStatus gameState={game.gameStatus} winner={game.winner} isYourTurn={isYourTurn} timeLeft={timeLeft} gameSlot={gameSlot} />
                            <Controls drawRequestedBy={drawRequestedBy} onRequestDraw={requestDraw} onSkipTurn={skipTurn} />
                            <DrawRequestPrompt drawRequestedBy={drawRequestedBy} onAccept={acceptDraw} onReject={rejectDraw} />
                        </Card>
                    </div>
                ) : (
                    <p>Loading game board...</p>
                )}
            </div>
        </div>
    );
}
