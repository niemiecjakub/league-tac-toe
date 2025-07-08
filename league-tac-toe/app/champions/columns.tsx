"use client";

import { SortableHeader } from "@/components/ui/sortableHeader";
import { Champion } from "@/models/Champion";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Champion>[] = [
    {
        id: "champion",
        accessorKey: "name",
        header: ({ column }) => {
            return <SortableHeader column={column}>Champion</SortableHeader>;
        },
        cell: ({ row }) => {
            const champion: Champion = row.original;
            return (
                <div className="flex items-center">
                    <img src={champion.imageUrl} alt={champion.name} style={{ width: "32px", height: "32px", marginRight: "8px" }} />
                    <span>
                        {champion.name}, {champion.title}
                    </span>
                </div>
            );
        },
    },
    {
        id: "resource",
        accessorKey: "resource",
        header: ({ column }) => {
            return <SortableHeader column={column}>Resource</SortableHeader>;
        },
    },
    {
        accessorKey: "region",
        header: ({ column }) => {
            return <SortableHeader column={column}>Region</SortableHeader>;
        },
    },
    {
        id: "legacy",
        accessorKey: "legacies",
        header: ({ column }) => {
            return <SortableHeader column={column}>Legacy</SortableHeader>;
        },
    },
    {
        id: "position",
        accessorKey: "positions",
        header: ({ column }) => {
            return <SortableHeader column={column}>Position</SortableHeader>;
        },
    },
    {
        id: "rangeType",
        accessorKey: "rangeTypes",
        header: ({ column }) => {
            return <SortableHeader column={column}>Range type</SortableHeader>;
        },
    },
];
