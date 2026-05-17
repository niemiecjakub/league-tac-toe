export interface MetaFilterItem {
    id: string;
    name: string;
}

export interface MetaFilter {
    name: string;
    value: string;
    options: MetaFilterItem[];
}

export interface ChampionMetaFilter {
    filters: MetaFilter[];
}
