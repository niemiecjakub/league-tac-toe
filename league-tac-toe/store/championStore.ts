import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/ChampionMeta";
import { getChampions, getMetaFilters } from "@/services/championService";
import { create } from "zustand";

type ChampionStore = {
    champions: Champion[];
    championNames: string[];
    championFilter: ChampionMetaFilter | null;

    setChampions: () => Promise<void>;
    setChampionFilters: () => Promise<void>;

    getChampionImageResourceKey: (championName: string | undefined | null) => string;
};
export const useChampionStore = create<ChampionStore>((set, get) => ({
    champions: [],
    championNames: [],
    championFilter: null,

    setChampions: async () => {
        const champions = await getChampions();
        set({ champions: champions });
    },

    setChampionFilters: async () => {
        const filters = await getMetaFilters();
        set({ championFilter: filters });
    },

    getChampionImageResourceKey: (championName: string | undefined | null): string => {
        const { champions } = get();
        if (championName === null || championName === undefined){
            return "url(/default.png)";
        }
        const champion = champions.find((c) => c.name.toLowerCase() === championName.toLowerCase());
        return champion ? `url(/champion/${champion.imageResourceKey}.png)` : "url(/default.png)";
    },
}));
