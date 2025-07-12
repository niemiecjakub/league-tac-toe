"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { winningCombinations } from "@/constants/game";

type Player = "X" | "O" | null;

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

    function handleClick(index: number) {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
        } else if (newBoard.every((cell) => cell !== null)) {
            setWinner("Draw");
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className="p-6 w-[320px]">
                <div className="grid grid-cols-3 gap-2">
                    {board.map((cell, index) => (
                        <Button key={index} variant="outline" className="h-16 w-16 text-3xl font-bold" onClick={() => handleClick(index)}>
                            {cell}
                        </Button>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    {winner ? (
                        winner === "Draw" ? (
                            <p className="text-lg font-semibold">It's a draw!</p>
                        ) : (
                            <p className="text-lg font-semibold">Winner: {winner}</p>
                        )
                    ) : (
                        <p className="text-lg font-semibold">Current Player: {currentPlayer}</p>
                    )}
                </div>
                <div className="mt-4 flex justify-center">
                    <Button onClick={resetGame}>Reset Game</Button>
                </div>
            </Card>
        </div>
    );
}
