"use client";

import { GameSlot, GameStateType, PlayerType } from "@/models/Game";
import React from "react";

type GameStatusProps = {
    winner: PlayerType | null;
    gameState: GameStateType;
    isYourTurn: boolean;
    timeLeft: number | null;
    gameSlot: GameSlot | null;
};

export default function GameStatus({ winner, gameState, isYourTurn, timeLeft, gameSlot }: GameStatusProps) {
    const isDraw = gameState === GameStateType.Finished && winner === null;
    const playerWon = gameState === GameStateType.Finished && winner !== null;

    return (
        <div className="mt-4 text-center">
            {playerWon && <p className="text-lg font-semibold">Winner: {PlayerType[winner]}</p>}
            {isDraw && <p className="text-lg font-semibold">It's a draw!</p>}
            {gameState === GameStateType.InProgress && (
                <>
                    {gameSlot && <p className="text-lg font-semibold"> You are: {PlayerType[gameSlot.playerType]}</p>}
                    <p className="text-lg font-semibold">{isYourTurn ? "Your turn" : "Opponent's turn"}</p>
                    {timeLeft && <p className="text-sm text-gray-500">Time left: {timeLeft}s</p>}
                </>
            )}
        </div>
    );
}
