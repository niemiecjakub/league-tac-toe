import axios from "@/lib/axios";
import { Champion } from "@/models/Champion";
import { ChampionMetaFilter } from "@/models/ChampionMeta";
import { handleServiceError } from "@/lib/errorHandler";

export const getChampions = async (): Promise<Champion[]> => {
    try {
        const { data } = await axios.get("/Champion/all");
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to fetch champions");
    }
};

export const getMetaFilters = async (): Promise<ChampionMetaFilter> => {
    try {
        const { data } = await axios.get("/MetaFilter");
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to fetch meta filters");
    }
};
