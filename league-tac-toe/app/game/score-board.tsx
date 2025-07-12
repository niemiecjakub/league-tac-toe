"use client";

import React from "react";

type ScoreBoardProps = {
    scoreX: number;
    scoreO: number;
};

export default function ScoreBoard({ scoreX, scoreO }: ScoreBoardProps) {
    return (
        <div className="mb-4 text-center text-xl font-bold">
            X {scoreX} - {scoreO} O
        </div>
    );
}
