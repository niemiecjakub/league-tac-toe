export interface MetaFilterItem {
    id: string;
    name: string;
    // TODO: Add icon
}

export interface MetaFilter {
    name: string;
    value: string;
    options: MetaFilterItem[];
}

export interface ChampionMetaFilter {
    filters: MetaFilter[];
}
