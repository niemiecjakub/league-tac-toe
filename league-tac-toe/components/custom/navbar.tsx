"use client";

import Link from "next/link";
import { DarkMode, LightMode } from "../svg/svg-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MODE_KEY, SUPPORTED_CULTURES, UiMode, useUiStore } from "@/store/uiStore";
import CountryFlag from "./country-flag";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
    const { mode, setMode } = useUiStore((state) => state);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const t = useTranslations("navbar");
    const locale = useLocale();

    useEffect(() => {
        const storedMode = localStorage.getItem(MODE_KEY) as UiMode | null;

        if (storedMode && Object.values(UiMode).includes(storedMode)) {
            setMode(storedMode);
        }
    }, [setMode]);

    const handleLocaleChange = (nextLocale: Locale) => {
        startTransition(() => {
            router.replace({ pathname, params }, { locale: nextLocale });
            localStorage.setItem(nextLocale, nextLocale);
        });
    };

    const getFlagCode = (locale: string) => {
        const culture = SUPPORTED_CULTURES.find((c) => c.langCode === locale);
        return culture ? culture.flagCode : "US";
    };

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
                        {t("champions")}
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            <CountryFlag countryCode={getFlagCode(locale)} alt={locale} className="h-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {SUPPORTED_CULTURES.map(({ langCode, name, flagCode }) => (
                                <DropdownMenuItem key={langCode} disabled={isPending} onSelect={() => handleLocaleChange(langCode as Locale)} className="cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <CountryFlag countryCode={flagCode} alt={name} className="h-6 w-6" />
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
