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
    return (
        <div
            id="game-board"
            className="grid grid-cols-4 grid-rows-4 gap-[1px] bg-black
             w-full sm:w-96 md:w-[28rem] lg:w-[32rem]
             aspect-square"
        >
            <CategoryBoardField value={null} />
            <CategoryBoardField value={categories.Horizontal[0]} />
            <CategoryBoardField value={categories.Horizontal[1]} />
            <CategoryBoardField value={categories.Horizontal[2]} />

            <CategoryBoardField value={categories.Vertical[0]} />
            <GuessBoardField cellIndex={9} value={board[0][0]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[0][1]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[0][2]} championNames={championNames} onCellClick={onCellClick} />

            <CategoryBoardField value={categories.Vertical[1]} />
            <GuessBoardField cellIndex={9} value={board[1][0]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[1][1]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[1][2]} championNames={championNames} onCellClick={onCellClick} />

            <CategoryBoardField value={categories.Vertical[2]} />
            <GuessBoardField cellIndex={9} value={board[2][0]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[2][1]} championNames={championNames} onCellClick={onCellClick} />
            <GuessBoardField cellIndex={9} value={board[2][2]} championNames={championNames} onCellClick={onCellClick} />
        </div>
    );
}
