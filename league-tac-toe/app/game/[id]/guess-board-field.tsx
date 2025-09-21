"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoardField, CategoryItem, PlayerType } from "@/models/Game";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@/components/svg/svg-icons";

export interface GuessBoardField {
    value?: BoardField;
    championNames: string[];
    categories: CategoryItem[];
    cellIndex: number;
    isYourTurn: boolean;
    onCellClick: (index: number, champion: string) => void;
}

export default function GuessBoardField({ value, championNames, cellIndex, categories, isYourTurn, onCellClick }: GuessBoardField) {
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
        if (!isYourTurn) {
            return;
        }
        setOpen(isOpen);
        setInputValue("");
        setFilteredChampions([]);
        setShowSuggestions(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className="relative w-full h-full aspect-square bg-cover bg-center text-white text-xs sm:text-sm md:text-base cursor-pointer rounded-none"
                    style={{
                        backgroundImage: value?.Value?.championName ? `url('/champion/${value.Value.championName}.png')` : `url('/default.png')`,
                    }}
                >
                    <PlusIcon className="absolute top-1 right-1" />
                    {value?.Value && (
                        <div className="bg-black/60 p-1 rounded text-center">
                            <p>{PlayerType[value.Value?.playerType]}</p>
                            <p>{value.Value.championName}</p>
                        </div>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter champion</DialogTitle>
                    <DialogDescription>{`${categories[0].Category} ${categories[0].Name} & ${categories[1].Category} ${categories[1].Name}`}</DialogDescription>
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
                        <ul className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white p-1 text-lg shadow">
                            {filteredChampions.map((name) => (
                                <li key={name} className={cn("cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100")} onMouseDown={() => handleChampionSubmit(name)}>
                                    <img src={`/champion/${name}.png`} alt={name} className="inline-block h-10 w-10 mr-2" />
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
