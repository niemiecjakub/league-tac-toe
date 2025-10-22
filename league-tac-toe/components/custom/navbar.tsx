"use client";

import { DarkMode, GithubIcon, LightMode, LogoIcon } from "../svg/svg-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CountryFlag from "./country-flag";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { SUPPORTED_CULTURES, DEFAULT_LANG } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";

export enum UiMode {
    LIGHT = "light",
    DARK = "dark",
}

export default function Navbar() {
    const [isPending, startTransition] = useTransition();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations("navbar");
    const isInGame = pathname.includes("/game");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLocaleChange = (nextLocale: Locale) => {
        if (isInGame) {
            toast.warn(t("cannotChangeLanguage"), {
                theme: theme,
            });
            return;
        }

        startTransition(() => {
            // @ts-expect-error -- TypeScript will validate that only known `params
            router.replace({ pathname, params }, { locale: nextLocale });
            localStorage.setItem("locale", nextLocale);
        });
    };

    const getFlagCode = (locale: string) => {
        const culture = SUPPORTED_CULTURES.find((c) => c.langCode === locale);
        return culture ? culture.flagCode : DEFAULT_LANG.flagCode;
    };

    const handleChampionsClick = () => {
        if (isInGame) {
            toast.warn(t("dontCheat"), {
                theme: theme,
            });
        }
    };

    return (
        <div className="w-full sticky top-0 z-50 border-b border-b-league-gold-200 dark:bg-league-grey-300 bg-amber-50 dark:text-league-white-100 text-black text-sm md:text-xl">
            <div className="lg:w-2/3 flex justify-between items-center px-1 md:px-4 md:py-2 m-auto ">
                <div className="flex items-center ">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer md:pr-6 hover:opacity-50">
                        <LogoIcon className="h-[36px]" />
                        <h1 className="font-semibold uppercase hidden md:block">League Tac Toe</h1>
                    </Link>
                    <Link href={isInGame ? "#" : "/champions"} className="hover:opacity-50" onClick={handleChampionsClick}>
                        {t("champions")}
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Link href="https://github.com/niemiecjakub/league-tac-toe" target="_blank" className="hover:opacity-40">
                        <GithubIcon className="h-[28px] inline" fill={mounted && theme == UiMode.DARK ? "#FFFFFF" : "#000000"} />
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            <CountryFlag countryCode={getFlagCode(locale)} alt={locale} height={32} width={32} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {SUPPORTED_CULTURES.map(({ langCode, name, flagCode }) => (
                                <DropdownMenuItem key={langCode} disabled={isPending} onSelect={() => handleLocaleChange(langCode as Locale)} className="cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <CountryFlag countryCode={flagCode} alt={name} height={24} width={24} />
                                        {name}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {theme == UiMode.LIGHT ? (
                        <DarkMode className="h-8 w-8 cursor-pointer hover:opacity-50" onClick={() => setTheme(UiMode.DARK)} />
                    ) : (
                        <LightMode className="h-8 w-8 cursor-pointer hover:opacity-50" onClick={() => setTheme(UiMode.LIGHT)} />
                    )}
                </div>
            </div>
        </div>
    );
}
