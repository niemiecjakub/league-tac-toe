import React from "react";
import { Metadata } from "next";
import GameBoard from "./game-board";

export const metadata: Metadata = {
    title: "League Tac Toe Game",
    description: "Game page",
};

export default function gamePage() {
    return <GameBoard />;
}
