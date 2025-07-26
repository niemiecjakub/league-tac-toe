"use client";

import React from "react";
import { Categories, Player } from "@/models/Game";
import CategoryBoardField from "./category-board-field";
import GuessBoardField from "./guess-board-field";

type BoardProps = {
    board: Player[][];
    categories: Categories;
    championNames: string[];
    onCellClick: (index: number) => void;
};

export default function Board({ board, categories, championNames, onCellClick }: BoardProps) {
    const xLabels = [null, ...categories.Horizontal];
    const yLabels = categories.Vertical;

    return (
        <div className="grid gap-2">
            <div className="flex justify-between">
                {xLabels.map((label, index) => {
                    if (label == null) {
                        return <CategoryBoardField key={`null-${index}`} value={null} />;
                    } else {
                        return <CategoryBoardField key={label.Name} value={label} />;
                    }
                })}
            </div>

            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    <CategoryBoardField value={yLabels[rowIndex]} />
                    {row.map((value, colIndex) => {
                        const cellIndex = rowIndex * 3 + colIndex;
                        return <GuessBoardField key={cellIndex} onCellClick={() => onCellClick(cellIndex)} value={value} championNames={championNames} />;
                    })}
                </div>
            ))}
        </div>
    );
}
