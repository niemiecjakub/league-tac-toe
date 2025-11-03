"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoardField, CategoryItem, PlayerType } from "@/models/Game";
import { cn } from "@/lib/utils";
import { PlusIcon, StealIcon } from "@/components/svg/svg-icons";
import { useChampionStore } from "@/store/championStore";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRoomStore } from "@/store/roomStore";
import { Champion } from "@/models/Champion";

export interface GuessBoardField {
    value?: BoardField;
    categories: CategoryItem[];
    cellIndex: number;
}

export default function GuessBoardField({ value, cellIndex, categories }: GuessBoardField) {
    const { champions, getChampionImageResourceKey } = useChampionStore((state) => state);
    const { isYourTurn, handleChampionSelect, room } = useRoomStore((state) => state);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const t = useTranslations("game.field");

    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredChampions([]);
            return;
        }

        const filtered = champions.filter((champion) => champion.name.toLowerCase().includes(inputValue.toLowerCase()));

        setFilteredChampions(filtered);
        setShowSuggestions(true);
    }, [inputValue, champions]);

    const handleChampionSubmit = (championName: string) => {
        setInputValue(championName);
        setShowSuggestions(false);
        handleChampionSelect(cellIndex, championName);
        setOpen(false);
    };

    const onOpenChange = (isOpen: boolean) => {
        const isMyField = value?.Value?.playerType === room?.slot?.playerType;
        if (!isYourTurn() || isMyField) {
            return;
        }
        setOpen(isOpen);
        setInputValue("");
        setFilteredChampions([]);
        setShowSuggestions(false);
    };

    const resolveIcons = () => {
        if (!isYourTurn()) {
            return;
        }

        const fieldHasValue: boolean = value?.Value !== undefined && value?.Value !== null;
        if (!fieldHasValue) {
            return <PlusIcon className="absolute top-1 right-1" />;
        }

        const isMyField = value?.Value?.playerType === room?.slot?.playerType;
        if (isMyField) {
            return null;
        }

        const hasSteals: boolean = (room?.slot?.steals ?? 0) > 0;
        const stealsEnabled = room?.stealsEnabled ?? false;

        return stealsEnabled && hasSteals ? <StealIcon className="absolute top-1 right-1 bg-white rounded-b-full" fill="#000000" /> : <PlusIcon className="absolute top-1 right-1" />;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className=" relative w-full h-full aspect-square bg-cover bg-center text-white text-xs sm:text-sm md:text-base cursor-pointer rounded-none"
                    style={{
                        backgroundImage: `${getChampionImageResourceKey(value?.Value?.championName)}`,
                    }}
                >
                    {resolveIcons()}
                    {value?.Value && (
                        <div className="bg-black/60 p-1 rounded text-center h-full w-full">
                            <p className="text-7xl opacity-85">{PlayerType[value.Value?.playerType]}</p>
                            <p className="text-xs">{value.Value.championName}</p>
                        </div>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t("enterChampion")}</DialogTitle>
                    <DialogDescription>
                        <div className="flex items-center">
                            <p>{`${categories[0].CategoryGroupName} ${categories[0].DisplayName ?? categories[0].OptionName} `}</p>
                            <p className="px-4">&</p>
                            <p>{`${categories[1].CategoryGroupName} ${categories[1].DisplayName ?? categories[1].OptionName} `}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Label htmlFor="champion" className="sr-only">
                        {t("champion")}
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
                        <ul className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white dark:bg-league-black-200 p-1 text-lg shadow">
                            {filteredChampions.map((champion) => (
                                <li
                                    key={champion.id}
                                    className={cn("cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100 dark:hover:bg-league-grey-150")}
                                    onMouseDown={() => handleChampionSubmit(champion.name)}
                                >
                                    <Image src={`/champion/${champion.imageResourceKey}.png`} alt={champion.name} className="inline-block h-10 w-10 mr-2" width={10} height={10} unoptimized />
                                    {champion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
