"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

type ControlsProps = {
    resetGame: () => void;
    drawRequestedBy: Player | null;
    onRequestDraw: () => void;
    onSkipTurn: () => void;
};

export default function Controls({ resetGame, drawRequestedBy, onRequestDraw, onSkipTurn }: ControlsProps) {
    return (
        <div className="mt-4 flex justify-center space-x-4">
            <Button onClick={resetGame}>Reset Game</Button>
            {!drawRequestedBy && (
                <Button variant="secondary" onClick={onRequestDraw}>
                    Request Draw
                </Button>
            )}
            <Button variant="secondary" onClick={onSkipTurn}>
                Skip Turn
            </Button>
        </div>
    );
}
