"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

interface SortableHeaderProps<T> {
    column: Column<T>;
    children: ReactNode;
}

export function SortableHeader<T>({ column, children }: SortableHeaderProps<T>) {
    const isSorted = column.getIsSorted();

    const handleClick = () => {
        const desc = isSorted === "asc";
        column.toggleSorting(desc);
    };

    return (
        <Button variant="ghost" onClick={handleClick}>
            {children}
            {isSorted === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : isSorted === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
    );
}
