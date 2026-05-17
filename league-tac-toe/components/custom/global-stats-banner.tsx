"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { GlobalStats } from "@/models/GlobalStats";
import { getGlobalStats } from "@/services/gameService";
import { formatRoundedCount } from "@/lib/utils";
import Image from "next/image";

export default function GlobalStatsBanner() {
    const t = useTranslations("home");
    const locale = useLocale();
    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);

    useEffect(() => {
        getGlobalStats()
            .then(setGlobalStats)
            .catch(() => setGlobalStats(null));
    }, []);

    if (!globalStats) {
        return null;
    }

    const gamesPlayed = formatRoundedCount(globalStats.gamesPlayed, locale);

    return (
        <div className="flex w-full items-center gap-2 sm:gap-3" role="status">
            <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
            <Image src="/images/ahri.png" alt="" width={24} height={24} className="shrink-0" aria-hidden />
            <p className="shrink-0 text-center text-sm italic text-muted-foreground sm:text-base">
                {t.rich("lobby.online.globalStats", {
                    gamesPlayed,
                    highlight: (chunks) => (
                        <span className="font-bold tabular-nums text-foreground">{chunks}</span>
                    ),
                })}
            </p>
            <Image src="/images/ahri.png" alt="" width={24} height={24} className="shrink-0" aria-hidden />
            <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
        </div>
    );
}
