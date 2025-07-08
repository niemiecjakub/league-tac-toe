"use client";

import * as React from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, VisibilityState, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetaFilter } from "@/components/ui/meta-filter";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnVisibility,
            columnFilters,
        },
    });

    console.log(table.getState().columnFilters);

    return (
        <div>
            <div className="flex items-center py-4">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Filter champions..."
                        value={table.getColumn("champion")?.getFilterValue() as string}
                        onChange={(event) => table.getColumn("champion")?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <MetaFilter
                        title="Resource"
                        column={table.getColumn("resource")!}
                        items={[
                            { id: "1", name: "Top" },
                            { id: "2", name: "Jungle" },
                            { id: "3", name: "Middle" },
                            { id: "4", name: "Bot" },
                            { id: "5", name: "Support" },
                        ]}
                    />
                    <MetaFilter
                        title="Region"
                        column={table.getColumn("region")!}
                        items={[
                            { id: "1", name: "Top" },
                            { id: "2", name: "Jungle" },
                            { id: "3", name: "Middle" },
                            { id: "4", name: "Bot" },
                            { id: "5", name: "Support" },
                        ]}
                    />
                    <MetaFilter
                        title="Legacy"
                        column={table.getColumn("legacy")!}
                        items={[
                            { id: "1", name: "Top" },
                            { id: "2", name: "Jungle" },
                            { id: "3", name: "Middle" },
                            { id: "4", name: "Bot" },
                            { id: "5", name: "Support" },
                        ]}
                    />
                    <MetaFilter
                        title="Position"
                        column={table.getColumn("position")!}
                        items={[
                            { id: "1", name: "Top" },
                            { id: "2", name: "Jungle" },
                            { id: "3", name: "Middle" },
                            { id: "4", name: "Bot" },
                            { id: "5", name: "Support" },
                        ]}
                    />
                    <MetaFilter
                        title="Range type"
                        column={table.getColumn("rangeType")!}
                        items={[
                            { id: "1", name: "Top" },
                            { id: "2", name: "Jungle" },
                            { id: "3", name: "Middle" },
                            { id: "4", name: "Bot" },
                            { id: "5", name: "Support" },
                        ]}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
