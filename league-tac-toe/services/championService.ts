import axios from "@/lib/axios";
import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/MetaItem";

export const getChampions = async (): Promise<Champion[]> => {
    const { data } = await axios.get("/Champion/all");
    return data;
};

export const getMetaItems = async (): Promise<ChampionMetaFilter> => {
    const { data } = await axios.get("/Meta");
    return data;
};
