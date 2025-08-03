"use client";

import React from "react";
import { BoardField, Categories } from "@/models/Game";
import CategoryBoardField from "./category-board-field";
import GuessBoardField from "./guess-board-field";

type BoardProps = {
    board: BoardField[][];
    categories: Categories;
    championNames: string[];
    onCellClick: (index: number, champion: string) => void;
};

export default function Board({ board, categories, championNames, onCellClick }: BoardProps) {
    const horizontal = [null, ...categories.Horizontal];
    const vertical = categories.Vertical;

    return (
        <div className="grid gap-2">
            <div className="flex justify-between">
                {horizontal.map((label, index) => {
                    if (label == null) {
                        return <CategoryBoardField key={`null-${index}`} value={null} />;
                    } else {
                        return <CategoryBoardField key={label.Name} value={label} />;
                    }
                })}
            </div>

            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                    <CategoryBoardField value={vertical[rowIndex]} />
                    {row.map((value, colIndex) => {
                        const cellIndex = rowIndex * 3 + colIndex;
                        return <GuessBoardField key={cellIndex} cellIndex={cellIndex} value={value} championNames={championNames} onCellClick={onCellClick} />;
                    })}
                </div>
            ))}
        </div>
    );
}
