"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Champion } from "@/models/Champion";

export const columns: ColumnDef<Champion>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Champion" />,
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
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "resource",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Resource" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{row.getValue("resource")}</Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "region",
        header: ({ column }) => <DataTableColumnHeader column={column} title="region" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{row.getValue("region")}</Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "legacies",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Legacy" />,
        cell: ({ row }) => {
            const legacies: string[] = row.getValue("legacies");

            return (
                <div className="flex items-center gap-2">
                    {legacies.map((legacy, index) => (
                        <Badge variant="outline" key={index}>
                            {legacy}
                        </Badge>
                    ))}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const rowValue: string[] = row.getValue(id);
            if (!value?.length) return true;
            return value.some((filter: string) => rowValue.some((position) => position.toLowerCase().includes(filter.toLowerCase())));
        },
    },
    {
        accessorKey: "positions",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Position" />,
        cell: ({ row }) => {
            const positions: string[] = row.getValue("positions");

            return (
                <div className="flex items-center gap-2">
                    {positions.map((position, index) => (
                        <Badge variant="outline" key={index}>
                            {position}
                        </Badge>
                    ))}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const rowValue: string[] = row.getValue(id);
            if (!value?.length) return true;
            return value.some((filter: string) => rowValue.some((position) => position.toLowerCase().includes(filter.toLowerCase())));
        },
    },
    {
        accessorKey: "rangeTypes",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Rangetype" />,
        cell: ({ row }) => {
            const rangeTypes: string[] = row.getValue("rangeTypes");

            return (
                <div className="flex  items-center gap-2">
                    {rangeTypes.map((rangeType, index) => (
                        <Badge variant="outline" key={index}>
                            {rangeType}
                        </Badge>
                    ))}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const rowValue: string[] = row.getValue(id);
            if (!value?.length) return true;
            return value.some((filter: string) => rowValue.some((position) => position.toLowerCase().includes(filter.toLowerCase())));
        },
    },
];
