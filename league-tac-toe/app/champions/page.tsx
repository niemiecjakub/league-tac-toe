import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getChampions, getMetaFilters } from "@/services/championService";
import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/ChampionMeta";

export const metadata: Metadata = {
    title: "League Of Legends Champions",
    description: "A list of all League of Legends champions.",
};

export default async function ChampionsPage() {
    const champions: Champion[] = await getChampions();
    const filter: ChampionMetaFilter = await getMetaFilters();

    return (
        <div className="lg:w-2/3 sm:w-screen w-full h-full flex-1 flex-col p-4 flex">
            <DataTable data={champions} columns={columns} filter={filter} />
        </div>
    );
}
