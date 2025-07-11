import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { MetaFilterItem } from "@/models/MetaItem";

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    options: MetaFilterItem[];
}

function normalizeFacetsMap(map: Map<any, number>): Map<string, number> {
    const result = new Map<string, number>();

    for (const [key, count] of map.entries()) {
        if (typeof key === "string") {
            // Direct string key — add as-is
            result.set(key, (result.get(key) ?? 0) + count);
        } else if (Array.isArray(key)) {
            // Array key — add count for each string
            for (const item of key) {
                if (typeof item === "string") {
                    result.set(item, (result.get(item) ?? 0) + count);
                }
            }
        }
    }

    return result;
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>) {
    const rawFacets = column?.getFacetedUniqueValues();
    const facets = rawFacets ? normalizeFacetsMap(rawFacets) : new Map();

    console.log("facets", facets);
    const selectedValues = new Set(column?.getFilterValue() as string[]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircle />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden gap-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.name))
                                        .map((option) => (
                                            <Badge variant="secondary" key={option.name} className="rounded-sm px-1 font-normal">
                                                {option.name}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.name);
                                return (
                                    <CommandItem
                                        key={option.name}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(option.name);
                                            } else {
                                                selectedValues.add(option.name);
                                            }
                                            const filterValues = Array.from(selectedValues);
                                            column?.setFilterValue(filterValues.length ? filterValues : undefined);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "flex size-4 items-center justify-center rounded-[4px] border",
                                                isSelected ? "bg-primary border-primary text-primary-foreground" : "border-input [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className="text-primary-foreground size-3.5" />
                                        </div>
                                        {/* {option.icon && <option.icon className="text-muted-foreground size-4" />} */}
                                        <span>{option.name}</span>
                                        {facets?.get(option.name) && (
                                            <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">{facets.get(option.name)}</span>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center text-center">
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
