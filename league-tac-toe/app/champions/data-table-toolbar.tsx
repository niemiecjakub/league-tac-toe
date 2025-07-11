"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { ChampionMetaFilter } from "@/models/MetaItem";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filter: ChampionMetaFilter;
}

export function DataTableToolbar<TData>({ table, filter }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {filter.filters.map((f) => table.getColumn(f.value) && <DataTableFacetedFilter column={table.getColumn(f.value)} title={f.name} options={f.options} />)}

                {isFiltered && (
                    <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
                        Reset
                        <X />
                    </Button>
                )}
            </div>
        </div>
    );
}
