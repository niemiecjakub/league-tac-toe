"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { ChampionMetaFilter } from "@/models/ChampionMeta";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filter: ChampionMetaFilter | null;
}

export function DataTableToolbar<TData>({ table, filter }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap w-full">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Input
                    placeholder="Filter champions..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="h-8 w-full sm:w-[150px] lg:w-[250px]"
                />
                {filter != null && filter.filters.map((f) => table.getColumn(f.value) && <DataTableFacetedFilter key={f.value} column={table.getColumn(f.value)} title={f.name} options={f.options} />)}

                {isFiltered && (
                    <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()} className="flex items-center gap-1">
                        Reset
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
