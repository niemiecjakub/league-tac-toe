"use client";

import React from "react";
import { BoardField, Categories } from "@/models/Game";
import CategoryBoardField from "./category-board-field";
import GuessBoardField from "./guess-board-field";

type BoardProps = {
    board: BoardField[][];
    categories: Categories;
    championNames: string[];
    isYourTurn: boolean;
    onCellClick: (index: number, champion: string) => void;
};

export default function Board({ board, categories, championNames, isYourTurn, onCellClick }: BoardProps) {
    console.log(board);
    return (
        <div id="game-board" className="w-full grid grid-cols-4 grid-rows-4 aspect-square">
            <CategoryBoardField value={null} />
            <CategoryBoardField value={categories.Horizontal[0]} />
            <CategoryBoardField value={categories.Horizontal[1]} />
            <CategoryBoardField value={categories.Horizontal[2]} />

            <CategoryBoardField value={categories.Vertical[0]} />
            <GuessBoardField
                cellIndex={1}
                value={board[0][0]}
                categories={[categories.Vertical[0], categories.Horizontal[0]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={2}
                value={board[0][1]}
                categories={[categories.Vertical[0], categories.Horizontal[1]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={3}
                value={board[0][2]}
                categories={[categories.Vertical[0], categories.Horizontal[2]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />

            <CategoryBoardField value={categories.Vertical[1]} />
            <GuessBoardField
                cellIndex={4}
                value={board[1][0]}
                categories={[categories.Vertical[1], categories.Horizontal[0]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={5}
                value={board[1][1]}
                categories={[categories.Vertical[1], categories.Horizontal[1]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={6}
                value={board[1][2]}
                categories={[categories.Vertical[1], categories.Horizontal[2]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />

            <CategoryBoardField value={categories.Vertical[2]} />
            <GuessBoardField
                cellIndex={7}
                value={board[2][0]}
                categories={[categories.Vertical[2], categories.Horizontal[0]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={8}
                value={board[2][1]}
                categories={[categories.Vertical[2], categories.Horizontal[1]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
            <GuessBoardField
                cellIndex={9}
                value={board[2][2]}
                categories={[categories.Vertical[2], categories.Horizontal[2]]}
                championNames={championNames}
                onCellClick={onCellClick}
                isYourTurn={isYourTurn}
            />
        </div>
    );
}
