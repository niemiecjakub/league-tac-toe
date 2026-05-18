"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { GlobalStats } from "@/models/GlobalStats";
import { getGlobalStats } from "@/services/gameService";
import { getRoundedCount } from "@/lib/utils";
import { useCountUp } from "@/lib/hooks/use-count-up";
import Image from "next/image";

const COUNT_UP_DURATION_MS = 500;

export default function GlobalStatsBanner() {
    const t = useTranslations("home");
    const locale = useLocale();
    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);

    useEffect(() => {
        getGlobalStats()
            .then(setGlobalStats)
            .catch(() => setGlobalStats(null));
    }, []);

    const targetCount = globalStats ? getRoundedCount(globalStats.gamesPlayed) : 0;
    const animatedCount = useCountUp(targetCount, COUNT_UP_DURATION_MS, !!globalStats);

    if (!globalStats) {
        return null;
    }

    const gamesPlayed = animatedCount.toLocaleString(locale);

    return (
        <div className="flex w-full items-center gap-2 sm:gap-3" role="status">
            <span className="h-px min-w-0 flex-1 bg-border" aria-hidden />
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
            <span className="h-px min-w-0 flex-1 bg-border" aria-hidden />
        </div>
    );
}
