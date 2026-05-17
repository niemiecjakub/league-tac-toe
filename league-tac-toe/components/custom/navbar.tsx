"use client";

import { DarkMode, GithubIcon, LightMode, LogoIcon } from "../svg/svg-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MessageSquareReplyIcon } from "lucide-react";
import CountryFlag from "./country-flag";   
import Feedback from "./Feedback";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { SUPPORTED_CULTURES, DEFAULT_LANG } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFeedbackTooltipStore } from "@/store/feedbackTooltipStore";

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
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const { isOpen: isFeedbackTooltipOpen, show: showFeedbackTooltip, hide: hideFeedbackTooltip } = useFeedbackTooltipStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        showFeedbackTooltip();
        const timer = setTimeout(hideFeedbackTooltip, 6000);
        return () => clearTimeout(timer);
    }, [mounted, showFeedbackTooltip, hideFeedbackTooltip]);

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
        <nav className="w-full sticky top-0 z-50 border-b border-b-league-gold-200 dark:bg-league-grey-300 bg-amber-50 dark:text-league-white-100 text-black text-sm md:text-xl" aria-label="Main navigation">
            <div className="lg:w-2/3 flex justify-between items-center px-1 md:px-4 md:py-2 m-auto ">
                <div className="flex items-center ">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer md:pr-6 hover:opacity-50" aria-label="League Tac Toe - Home">
                        <LogoIcon className="h-[36px]" />
                        <span className="font-semibold uppercase hidden md:block">League Tac Toe</span>
                    </Link>
                    <Link href={isInGame ? "#" : "/champions"} className="hover:opacity-50" onClick={handleChampionsClick}>
                        {t("champions")}
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Tooltip
                        open={isFeedbackTooltipOpen}
                        onOpenChange={(open) => {
                            if (open) {
                                showFeedbackTooltip();
                            } else {
                                hideFeedbackTooltip();
                            }
                        }}
                    >
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setIsFeedbackModalOpen(true)}
                                className="hover:opacity-40"
                                aria-label={t("sendFeedback")}
                            >
                                <MessageSquareReplyIcon className="h-[28px] w-[28px]" stroke="currentColor" fill="none" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={8}>
                            {t("feedbackTooltip")}
                        </TooltipContent>
                    </Tooltip>
                    <Link href="https://github.com/niemiecjakub/league-tac-toe" target="_blank" className="hover:opacity-40" aria-label="GitHub repository">
                        <GithubIcon className="h-[28px] inline fill-current" />
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer" aria-label="Select language">
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
                    {!mounted ? (
                        <span className="inline-block h-8 w-8" aria-hidden />
                    ) : theme === UiMode.LIGHT ? (
                        <DarkMode className="h-8 w-8 cursor-pointer hover:opacity-50" onClick={() => setTheme(UiMode.DARK)} aria-label="Toggle dark mode" />
                    ) : (
                        <LightMode className="h-8 w-8 cursor-pointer hover:opacity-50" onClick={() => setTheme(UiMode.LIGHT)} aria-label="Toggle light mode" />
                    )}
                </div>
            </div>

            <Feedback open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen} />
        </nav>
    );
}
