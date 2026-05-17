"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryBadge } from "@/components/custom/category-badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Champion } from "@/models/Champion";
import { CHAMPION_COLUMN_CATEGORY_GROUP } from "@/lib/categoryIcon";
import Image from "next/image";

export const columns: ColumnDef<Champion>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Champion" />,
        cell: ({ row }) => {
            const champion: Champion = row.original;
            return (
                <div className="flex items-center">
                    <Image src={`/champion/${champion.imageResourceKey}.png`} alt={champion.name} height={32} width={32} className="mr-[8px]" />
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
            const resource = row.getValue("resource") as string;
            return (
                <div className="flex items-center gap-2">
                    <CategoryBadge categoryGroup={CHAMPION_COLUMN_CATEGORY_GROUP.resource} label={resource} />
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
            const region = row.getValue("region") as string;
            return (
                <div className="flex items-center gap-2">
                    <CategoryBadge categoryGroup={CHAMPION_COLUMN_CATEGORY_GROUP.region} label={region} />
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
                        <CategoryBadge categoryGroup={CHAMPION_COLUMN_CATEGORY_GROUP.legacies} label={legacy} key={index} />
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
                        <CategoryBadge categoryGroup={CHAMPION_COLUMN_CATEGORY_GROUP.positions} label={position} key={index} />
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
                <div className="flex items-center gap-2">
                    {rangeTypes.map((rangeType, index) => (
                        <CategoryBadge categoryGroup={CHAMPION_COLUMN_CATEGORY_GROUP.rangeTypes} label={rangeType} key={index} />
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
