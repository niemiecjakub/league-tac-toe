"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

type ControlsProps = {
    drawRequestedBy: Player | null;
    onRequestDraw: () => void;
    onSkipTurn: () => void;
};

export default function Controls({ drawRequestedBy, onRequestDraw, onSkipTurn }: ControlsProps) {
    return (
        <div className="mt-4 flex justify-center space-x-4">
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
