"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

type DrawRequestPromptProps = {
    drawRequestedBy: Player | null;
    onAccept: () => void;
    onReject: () => void;
};

export default function DrawRequestPrompt({ drawRequestedBy, onAccept, onReject }: DrawRequestPromptProps) {
    if (!drawRequestedBy) return null;
    return (
        <div className="mt-4 p-4 border rounded bg-yellow-50 text-center">
            <p className="mb-2 font-semibold">Player {drawRequestedBy} has requested a draw. Do you accept?</p>
            <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={onAccept}>
                    Accept
                </Button>
                <Button variant="destructive" onClick={onReject}>
                    Reject
                </Button>
            </div>
        </div>
    );
}
