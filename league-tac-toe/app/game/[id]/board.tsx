"use client";

import React from "react";
import BoardField from "./board-field";
import { Player } from "@/models/Game";

type BoardProps = {
    board: Player[][];
    onCellClick: (index: number) => void;
};

export default function Board({ board, onCellClick }: BoardProps) {
    const xLabels = ["-", "X1", "X2", "X3"];
    const yLabels = ["Y1", "Y2", "Y3"];

    return (
        <div className="grid gap-2">
            <div className="flex justify-between">
                {xLabels.map((label) => (
                    <BoardField key={label} value={label} isCategory={true} />
                ))}
            </div>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    <BoardField value={yLabels[rowIndex]} isCategory={true} />
                    {row.map((value, colIndex) => {
                        const cellIndex = rowIndex * 3 + colIndex;
                        return <BoardField key={cellIndex} onCellClick={() => onCellClick(cellIndex)} value={value} />;
                    })}
                </div>
            ))}
        </div>
    );
}
