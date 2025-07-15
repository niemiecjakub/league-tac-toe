"use client";

import { Label } from "@/components/ui/label";
import React from "react";

type ScoreBoardProps = {
    scoreX: number;
    scoreO: number;
};

export default function ScoreBoard({ scoreX, scoreO }: ScoreBoardProps) {
    return (
        <div className="flex w-full justify-center">
            <Label className="text-xl font-bold text-center">
                X {scoreX} - {scoreO} O
            </Label>
        </div>
    );
}
