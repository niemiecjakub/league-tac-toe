"use client";

import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useChampionStore } from "@/store/championStore";
import { useTranslations } from "next-intl";

export default function ChampionsPage() {
    const { champions, championFilter, setChampions, setChampionFilters } = useChampionStore();
    const t = useTranslations("navbar");
    useEffect(() => {
        setChampions();
        setChampionFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-screen lg:w-2/3 h-full flex-1 flex-col p-4 flex">
            <h1 className="text-2xl font-bold mb-4">{t("champions")}</h1>
            <DataTable data={champions} columns={columns} filter={championFilter} />
        </div>
    );
}
