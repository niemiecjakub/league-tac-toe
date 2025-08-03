"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoardField, PlayerType } from "@/models/Game";
import { cn } from "@/lib/utils";

export interface GuessBoardField {
    value?: BoardField;
    championNames: string[];
    cellIndex: number;
    onCellClick: (index: number, champion: string) => void;
}

export default function GuessBoardField({ value, championNames, cellIndex, onCellClick }: GuessBoardField) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredChampions, setFilteredChampions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredChampions([]);
            return;
        }

        const filtered = championNames.filter((name) => name.toLowerCase().includes(inputValue.toLowerCase()));

        setFilteredChampions(filtered);
        setShowSuggestions(true);
    }, [inputValue, championNames]);

    const handleChampionSubmit = (championName: string) => {
        setInputValue(championName);
        setShowSuggestions(false);
        onCellClick(cellIndex, championName);
        setOpen(false);
    };

    const onOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        setInputValue("");
        setFilteredChampions([]);
        setShowSuggestions(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="h-16 w-16 text-3xl font-bold bg-cover bg-center"
                    style={{
                        backgroundImage: value?.Value?.championName ? `url('/champion/${value.Value.championName}.png')` : `url('/default.png')`,
                    }}
                >
                    {value?.Value ? (
                        <div className="flex flex-col text-sm text-white rounded">
                            <p>{PlayerType[value.Value?.playerType]}</p>
                            <p>{value?.Value.championName}</p>
                        </div>
                    ) : null}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter champion</DialogTitle>
                    <DialogDescription>Category 1 & Category 2</DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Label htmlFor="champion" className="sr-only">
                        Champion
                    </Label>
                    <Input
                        ref={inputRef}
                        id="champion"
                        placeholder="Enter champion name..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => {
                            if (filteredChampions.length > 0) setShowSuggestions(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => setShowSuggestions(false), 100);
                        }}
                    />

                    {showSuggestions && filteredChampions.length > 0 && (
                        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white p-1 text-sm shadow">
                            {filteredChampions.map((name) => (
                                <li key={name} className={cn("cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100")} onMouseDown={() => handleChampionSubmit(name)}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
