"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Game, Player } from "@/models/Game";
import { joinRoom, move } from "@/services/gameService";
import ScoreBoard from "./score-board";
import Board from "./board";
import GameStatus from "./game-status";
import DrawRequestPrompt from "./draw-request-pormpt";
import Controls from "./controls";
import { Card } from "@/components/ui/card";
import { connectToGameHub } from "@/lib/signalr";

const TURN_TIME = 10;

export default function GameIdPage() {
    const params = useParams();
    const id = params?.id as string;

    const [game, setGame] = useState<Game | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const [timeLeft, setTimeLeft] = useState<number>(TURN_TIME);
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchGame = async () => {
        if (!id) return;
        try {
            const gameData = await joinRoom(id);
            setGame(gameData);
        } catch (error) {
            console.error("Failed to join game:", error);
        }
    };

    useEffect(() => {
        let hubConnection: signalR.HubConnection;

        const setupSignalR = async () => {
            try {
                hubConnection = await connectToGameHub();

                // Register SignalR client listeners
                hubConnection.on("SendMessage", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                hubConnection.on("JoinRoom", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, `🔵 ${message}`]);
                });

                hubConnection.on("LeaveRoom", (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, `🔴 ${message}`]);
                });

                // Join the room
                if (id) {
                    await hubConnection.invoke("JoinRoom", id);
                }
            } catch (err) {
                console.error("Error setting up SignalR:", err);
            }
        };

        setupSignalR();

        return () => {
            if (hubConnection) {
                hubConnection.off("SendMessage");
                hubConnection.off("JoinRoom");
                hubConnection.off("LeaveRoom");
                hubConnection.stop();
            }
        };
    }, [id]);

    useEffect(() => {
        fetchGame();
    }, [id]);

    useEffect(() => {
        setTimeLeft(TURN_TIME);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    // Time's up, switch player
                    handleTimeout();
                    return TURN_TIME;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    function handleTimeout() {
        // setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
        // setTimeLeft(TURN_TIME);
    }

    async function handleClick(cellIndex: number) {
        if (game?.roomUID) {
            const response = await move(game.roomUID, cellIndex + 1); // Adjusting for 1-based index in API
            if (response) {
                setGame(response);
            }
        }
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

    function skipTurn() {
        // setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
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
                            <GameStatus winner={game.winnerId} currentPlayer={game.currentTurnId} timeLeft={timeLeft} />
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
