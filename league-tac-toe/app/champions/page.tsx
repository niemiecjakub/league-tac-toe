import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getChampions, getMetaItems } from "@/services/championService";
import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/MetaItem";

export const metadata: Metadata = {
    title: "league Of Legends champions",
    description: "A list of all League of Legends champions.",
};

export default async function ChampionsPage() {
    const champions: Champion[] = await getChampions();
    const meta: ChampionMetaFilter = await getMetaItems();

    return (
        <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
            <h2 className="text-2xl font-semibold tracking-tight">List of all champions</h2>
            <DataTable data={champions} columns={columns} filter={meta} />
        </div>
    );
}
