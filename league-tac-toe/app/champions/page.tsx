import { getChampions } from "@/services/championService";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ChampionDataTable() {
    const data = await getChampions();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
