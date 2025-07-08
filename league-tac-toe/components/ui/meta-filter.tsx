"use client";

import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput, CommandList } from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetaItem {
    id: string;
    name: string;
}

interface MetaFilterProps<TData> {
    title: string;
    column: Column<TData, unknown>;
    items: MetaItem[];
    placeholder?: string;
}

export function MetaFilter<TData>({ title, column, items, placeholder = "Search..." }: MetaFilterProps<TData>) {
    const selectedValues = (column.getFilterValue() as string[]) ?? [];

    const toggleValue = (value: string) => {
        const updated = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];

        column.setFilterValue(updated.length ? updated : undefined);
    };

    const clearAll = () => column.setFilterValue(undefined);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    {selectedValues.length > 0 ? `${title}: ${selectedValues.join(", ")}` : title}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[200px]">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandGroup heading={title}>
                            {items.map((item) => {
                                const isSelected = selectedValues.includes(item.name);
                                return (
                                    <CommandItem key={item.id} onSelect={() => toggleValue(item.name)}>
                                        <div className={cn("flex items-center gap-2", isSelected ? "font-medium" : "")}>
                                            {isSelected ? <Check size={16} /> : <span className="w-4" />}
                                            {item.name}
                                        </div>
                                    </CommandItem>
                                );
                            })}
                            {selectedValues.length > 0 && (
                                <CommandItem onSelect={clearAll}>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <X size={16} /> Clear All
                                    </div>
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
