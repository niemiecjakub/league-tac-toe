// import { getChampions } from "@/services/championService";
// import { columns } from "./columns";
// import { DataTable } from "./data-table";

// export default async function ChampionDataTable() {
//     const data = await getChampions();

//     return (
//         <div className="container mx-auto py-10">
//             <DataTable columns={columns} data={data} />
//         </div>
//     );
// }

import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { taskSchema } from "@/constants/schema";

export const metadata: Metadata = {
    title: "league Of Legends champions",
    description: "A list of all League of Legends champions.",
};

async function getTasks() {
    const data = await fs.readFile(path.join(process.cwd(), "/constants/tasks.json"));
    const tasks = JSON.parse(data.toString());
    return z.array(taskSchema).parse(tasks);
}

export default async function ChampionsPage() {
    const tasks = await getTasks();

    return (
        <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
            <h2 className="text-2xl font-semibold tracking-tight">List of all champions</h2>
            <DataTable data={tasks} columns={columns} />
        </div>
    );
}
