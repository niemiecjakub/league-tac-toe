"use client";

import React from "react";

type Player = "X" | "O" | null;

type GameStatusProps = {
    winner: Player | "Draw" | null;
    currentPlayer: Player;
    timeLeft: number;
};

export default function GameStatus({ winner, currentPlayer, timeLeft }: GameStatusProps) {
    return (
        <div className="mt-4 text-center">
            {winner ? (
                winner === "Draw" ? (
                    <p className="text-lg font-semibold">It's a draw!</p>
                ) : (
                    <p className="text-lg font-semibold">Winner: {winner}</p>
                )
            ) : (
                <>
                    <p className="text-lg font-semibold">It's {currentPlayer}'s turn</p>
                    <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>
                </>
            )}
        </div>
    );
}
