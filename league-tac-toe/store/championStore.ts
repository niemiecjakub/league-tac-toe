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
};
export const useChampionStore = create<ChampionStore>((set) => ({
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
}));
