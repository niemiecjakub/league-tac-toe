"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

type BoardProps = {
    board: Player[];
    onCellClick: (index: number) => void;
};

export default function Board({ board, onCellClick }: BoardProps) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {board.map((cell, index) => (
                <Button key={index} variant="outline" className="h-16 w-16 text-3xl font-bold" onClick={() => onCellClick(index)}>
                    {cell}
                </Button>
            ))}
        </div>
    );
}
