"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/sortableHeader";
import { Champion } from "@/models/Champion";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Champion>[] = [
    {
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
        accessorKey: "legacies",
        header: ({ column }) => {
            return <SortableHeader column={column}>Legacy</SortableHeader>;
        },
    },
    {
        accessorKey: "positions",
        header: ({ column }) => {
            return <SortableHeader column={column}>Position</SortableHeader>;
        },
    },
    {
        accessorKey: "rangeTypes",
        header: ({ column }) => {
            return <SortableHeader column={column}>Range type</SortableHeader>;
        },
    },
];
