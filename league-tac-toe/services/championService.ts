import axios from "@/lib/axios";
import { Champion } from "@/models/Champion";

export const getChampions = async (): Promise<Champion[]> => {
    const { data } = await axios.get("/Champion/all");
    return data;
};
