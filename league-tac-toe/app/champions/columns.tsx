// "use client";

// import { SortableHeader } from "@/components/ui/sortable-table-header";
// import { Champion } from "@/models/Champion";
// import { ColumnDef } from "@tanstack/react-table";

// export const columns: ColumnDef<Champion>[] = [
//     {
//         id: "champion",
//         accessorKey: "name",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Champion</SortableHeader>;
//         },
//         cell: ({ row }) => {
//             const champion: Champion = row.original;
//             return (
//                 <div className="flex items-center">
//                     <img src={champion.imageUrl} alt={champion.name} style={{ width: "32px", height: "32px", marginRight: "8px" }} />
//                     <span>
//                         {champion.name}, {champion.title}
//                     </span>
//                 </div>
//             );
//         },
//     },
//     {
//         id: "resource",
//         accessorKey: "resource",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Resource</SortableHeader>;
//         },
//     },
//     {
//         id: "region",
//         accessorKey: "region",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Region</SortableHeader>;
//         },
//     },
//     {
//         id: "legacy",
//         accessorKey: "legacies",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Legacy</SortableHeader>;
//         },
//         cell: ({ row }) => row.original.legacies.join(" / "),
//     },
//     {
//         id: "position",
//         accessorKey: "positions",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Position</SortableHeader>;
//         },
//         cell: ({ row }) => row.original.positions.join(" / "),
//         filterFn: (row, columnId, filterValue) => {
//             const values: string[] = row.getValue(columnId);
//             return (filterValue as string[]).some((val) => values.includes(val));
//         },
//     },
//     {
//         id: "rangeType",
//         accessorKey: "rangeTypes",
//         header: ({ column }) => {
//             return <SortableHeader column={column}>Range type</SortableHeader>;
//         },
//         cell: ({ row }) => row.original.rangeTypes.join(" / "),
//     },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { priorities, statuses } from "@/constants/data";
import { Task } from "@/constants/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center gap-2">
                    {status.icon && <status.icon className="text-muted-foreground size-4" />}
                    <Badge variant="outline">{status.label}</Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
        cell: ({ row }) => {
            const priority = priorities.find((priority) => priority.value === row.getValue("priority"));

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center gap-2">
                    {priority.icon && <priority.icon className="text-muted-foreground size-4" />}
                    <Badge variant="outline">{priority.label}</Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
];
