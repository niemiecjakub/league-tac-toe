"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import ScoreBoard from "./score-board";
import GameStatus from "./game-status";
import DrawRequestPrompt from "./draw-request-pormpt";
import { winningCombinations } from "@/constants/game";
import Board from "./board";
import Controls from "./controls";

type Player = "X" | "O" | null;

const TURN_TIME = 10;

function checkWinner(board: Player[]): Player | null {
    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

export default function GameBoard() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

    const [winner, setWinner] = useState<Player | "Draw" | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(TURN_TIME);
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (winner) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (winner === "X") {
                setScoreX((prev) => prev + 1);
            } else if (winner === "O") {
                setScoreO((prev) => prev + 1);
            } else if (winner === "Draw") {
                setScoreX((prev) => prev + 1);
                setScoreO((prev) => prev + 1);
            }
            return;
        }
        // Clear draw request if turn changes
        setDrawRequestedBy(null);

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
    }, [currentPlayer, winner]);

    function handleTimeout() {
        setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
        setTimeLeft(TURN_TIME);
    }

    function handleClick(index: number) {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        } else if (newBoard.every((cell) => cell !== null)) {
            setWinner("Draw");
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
        setTimeLeft(TURN_TIME);
        // Do not reset scores on game reset, keep the state
    }

    function requestDraw() {
        const nextPlayer = currentPlayer === "X" ? "O" : "X";
        setDrawRequestedBy(currentPlayer);
        setCurrentPlayer(nextPlayer);
        setTimeLeft(TURN_TIME);
    }

    function skipTurn() {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setTimeLeft(TURN_TIME);
    }

    function acceptDraw() {
        setWinner("Draw");
        setDrawRequestedBy(null);
    }

    function rejectDraw() {
        setDrawRequestedBy(null);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className="p-6 w-[320px]">
                <ScoreBoard scoreX={scoreX} scoreO={scoreO} />
                <Board board={board} onCellClick={handleClick} />
                <GameStatus winner={winner} currentPlayer={currentPlayer} timeLeft={timeLeft} />
                <Controls resetGame={resetGame} drawRequestedBy={drawRequestedBy} onRequestDraw={requestDraw} onSkipTurn={skipTurn} />
                <DrawRequestPrompt drawRequestedBy={drawRequestedBy} onAccept={acceptDraw} onReject={rejectDraw} />
            </Card>
        </div>
    );
}
