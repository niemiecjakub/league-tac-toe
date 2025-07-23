"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Game, GameSlot, Player } from "@/models/Game";
import { getCurrentGame, joinRoom, move, getRoom, skipMove } from "@/services/gameService";
import ScoreBoard from "./score-board";
import Board from "./board";
import GameStatus from "./game-status";
import DrawRequestPrompt from "./draw-request-pormpt";
import Controls from "./controls";
import { Card } from "@/components/ui/card";
import { getUserUid } from "@/lib/utils";
import { Room } from "@/models/Room";
import { connectToGameHub } from "@/lib/signalr";
import { skip } from "node:test";

const TURN_TIME = 10;

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const playerGuid = getUserUid();

    const [room, setRoom] = useState<Room>();
    const [game, setGame] = useState<Game>();
    const [gameSlot, setGameSlot] = useState<GameSlot>();
    const [messages, setMessages] = useState<string[]>([]);

    const [timeLeft, setTimeLeft] = useState<number>(TURN_TIME);
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isYourTurn: boolean = gameSlot?.playerType === game?.currentPlayerTurn;

    useEffect(() => {
        const fetchGame = async () => {
            if (!id) return;

            try {
                const [roomData, gameSlot, gameData] = await Promise.all([getRoom(id), joinRoom(id), getCurrentGame(id)]);
                setRoom(roomData);
                setGameSlot(gameSlot);
                setGame(gameData);
                console.log("Game joined successfully:", gameData);
            } catch (error) {
                console.error("Failed to join game:", error);
            }
        };
        const setupSignalR = async () => {
            try {
                hubConnection = await connectToGameHub(id);
                hubConnection.on("SendMessage", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });
                hubConnection.on("JoinRoom", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, `🔵 ${message}`]);
                });
                hubConnection.on("LeaveRoom", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, `🔴 ${message}`]);
                });
                hubConnection.on("TurnSwitch", async () => {
                    const gameData = await getCurrentGame(id);
                    setGame(gameData);
                });

                if (id) {
                    await hubConnection.invoke("JoinRoom", id);
                }
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        let hubConnection: signalR.HubConnection;
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
        };
    }, []);

    // useEffect(() => {
    //     setTimeLeft(TURN_TIME);
    //     if (timerRef.current) {
    //         clearInterval(timerRef.current);
    //     }
    //     timerRef.current = setInterval(() => {
    //         setTimeLeft((prev) => {
    //             if (prev === 1) {
    //                 // Time's up, switch player
    //                 handleTimeout();
    //                 return TURN_TIME;
    //             }
    //             return prev - 1;
    //         });
    //     }, 1000);

    //     return () => {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current);
    //         }
    //     };
    // }, []);

    async function handleClick(cellIndex: number) {
        if (isYourTurn) {
            const gameData = await move(game!.roomUid, cellIndex + 1);
            setGame(gameData);
        }
    }

    async function skipTurn() {
        if (isYourTurn) {
            const game = await skipMove(id);
            setGame(game);
        }
    }

    function handleTimeout() {
        // setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
        // setTimeLeft(TURN_TIME);
    }

    function resetGame() {
        // setBoard(Array(9).fill(null));
        // setCurrentPlayer("X");
        // setWinner(null);
        // setTimeLeft(TURN_TIME);
        // Do not reset scores on game reset, keep the state
    }

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
                            <Board board={game.boardState} onCellClick={handleClick} />
                            <GameStatus winner={null} isYourTurn={isYourTurn} timeLeft={timeLeft} />
                            <Controls resetGame={resetGame} drawRequestedBy={drawRequestedBy} onRequestDraw={requestDraw} onSkipTurn={skipTurn} />
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
