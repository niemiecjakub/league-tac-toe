"use client";

import Link from "next/link";
import { DarkMode, LightMode } from "../svg/svg-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LANG_KEY, MODE_KEY, SUPPORTED_CULTURES, UiMode, useUiStore } from "@/store/uiStore";
import CountryFlag from "./country-flag";
import { useEffect } from "react";

export default function Navbar() {
    const { mode, lang, setMode, setLang } = useUiStore((state) => state);

    useEffect(() => {
        const storedLang = localStorage.getItem(LANG_KEY);
        const storedMode = localStorage.getItem(MODE_KEY) as UiMode | null;

        if (storedLang) setLang(storedLang);
        if (storedMode && Object.values(UiMode).includes(storedMode)) {
            setMode(storedMode);
        }
    }, [setLang, setMode]);

    return (
        <div className="w-full sticky top-0 z-50 border-b border-b-league-gold-200 bg-amber-50 text-sm md:text-xl">
            <div className="lg:w-2/3 flex justify-between items-center px-1 md:px-4 md:py-2 m-auto ">
                <div className="flex items-center">
                    <div className="flex items-center gap-2 cursor-pointer md:pr-6 ">
                        <img src="/lolicon.svg" alt="League of Legends Icon" className="h-[32px]" />
                        <Link href="/">
                            <h1 className="font-semibold uppercase hidden md:block">League Tac Toe</h1>
                        </Link>
                    </div>
                    <Link href="/champions" className="font-medium">
                        Champions
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            <CountryFlag countryCode={lang} alt={lang} className="h-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {SUPPORTED_CULTURES.map(({ code, name }) => (
                                <DropdownMenuItem key={code} onClick={() => setLang(code)} className="cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <CountryFlag countryCode={code} alt={name} className="h-6 w-6" />
                                        {name}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {mode == UiMode.LIGHT ? (
                        <DarkMode className="h-8 w-8 cursor-pointer" onClick={() => setMode(UiMode.DARK)} />
                    ) : (
                        <LightMode className="h-8 w-8 cursor-pointer" onClick={() => setMode(UiMode.LIGHT)} />
                    )}
                </div>
            </div>
        </div>
    );
}
