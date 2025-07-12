"use client";

import React from "react";
import BoardField from "./board-field";

type Player = "X" | "O" | null;

type BoardProps = {
    board: Player[];
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
            {yLabels.map((yLabel, rowIndex) => (
                <div key={yLabel} className="flex justify-between">
                    <BoardField value={yLabel} isCategory={true} />
                    {[0, 1, 2].map((colIndex) => {
                        const cellIndex = rowIndex * 3 + colIndex;
                        return <BoardField key={cellIndex} onCellClick={() => onCellClick(cellIndex)} value={board[cellIndex]} />;
                    })}
                </div>
            ))}
        </div>
    );
}
