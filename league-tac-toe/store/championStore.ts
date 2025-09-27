import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/ChampionMeta";
import { getChampionNames, getChampions, getMetaFilters } from "@/services/championService";
import { create } from "zustand";

type ChampionStore = {
    champions: Champion[];
    championNames: string[];
    championFilter: ChampionMetaFilter | null;

    setChampions: () => Promise<void>;
    setChampionNames: () => Promise<void>;
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

    setChampionNames: async () => {
        const names = await getChampionNames();
        set({ championNames: names });
    },

    setChampionFilters: async () => {
        const filters = await getMetaFilters();
        set({ championFilter: filters });
    },
}));
