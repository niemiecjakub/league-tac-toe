import axios from "@/lib/axios";
import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/ChampionMeta";

export const getChampions = async (): Promise<Champion[]> => {
    const { data } = await axios.get("/Champion/all");
    return data;
};

export const getChampionNames = async (): Promise<string[]> => {
    const champions = await getChampions();
    return champions.map((c) => c.name);
};

export const getMetaFilters = async (): Promise<ChampionMetaFilter> => {
    const { data } = await axios.get("/Meta");
    return data;
};
