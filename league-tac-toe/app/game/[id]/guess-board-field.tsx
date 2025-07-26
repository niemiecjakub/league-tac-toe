"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Player } from "@/models/Game";
import { cn } from "@/lib/utils";

export interface GuessBoardField {
    onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: Player | null;
    championNames: string[];
}

export default function GuessBoardField({ onCellClick, value, championNames }: GuessBoardField) {
    const [inputValue, setInputValue] = useState("");
    const [selectedChampion, setSelectedChampion] = useState("");
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

    const handleSuggestionClick = (name: string) => {
        setInputValue(name);
        setSelectedChampion(name);
        setShowSuggestions(false);
    };

    const onOpenChange = () => {
        setInputValue("");
        setFilteredChampions([]);
        setSelectedChampion("");
        setShowSuggestions(false);
    };

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-16 w-16 text-3xl font-bold" onClick={onCellClick}>
                    {value ? <div>{value}</div> : null}
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
                                <li key={name} className={cn("cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100")} onMouseDown={() => handleSuggestionClick(name)}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <DialogFooter className="sm:justify-start mt-4">
                    <DialogClose asChild>
                        <div className="flex w-full justify-between">
                            <Button
                                type="button"
                                variant="default"
                                onClick={() => {
                                    console.log("Selected Champion:", selectedChampion || inputValue);
                                }}
                            >
                                Submit
                            </Button>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
