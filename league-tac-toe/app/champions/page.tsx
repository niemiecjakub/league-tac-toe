"use client";

import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useChampionStore } from "@/store/championStore";

export default function ChampionsPage() {
    const { champions, championFilter, setChampions, setChampionFilters } = useChampionStore();

    useEffect(() => {
        setChampions();
        setChampionFilters();
    }, []);

    return (
        <div className="lg:w-2/3 sm:w-screen w-full h-full flex-1 flex-col p-4 flex">
            <DataTable data={champions} columns={columns} filter={championFilter} />
        </div>
    );
}
