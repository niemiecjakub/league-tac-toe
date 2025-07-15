import axios from "@/lib/axios";
import { Game, Player } from "@/models/Game";

export const createRoom = async (): Promise<Game> => {
    const { data } = await axios.post(`Game/Create`);
    return data;
};

export const joinRoom = async (roomGuid: string): Promise<Game> => {
    const { data } = await axios.get(`Game/${roomGuid}`);

    const parsedBoardState: Player[] = typeof data.boardState === "string" ? JSON.parse(data.boardState) : data.boardState;
    return {
        ...data,
        boardState: parsedBoardState,
    };
};

export const move = async (roomGuid: string, fieldId: number): Promise<Game> => {
    const { data } = await axios.post(`Game/${roomGuid}/Move`, null, {
        params: { fieldId },
    });

    const parsedBoardState: Player[] = typeof data.boardState === "string" ? JSON.parse(data.boardState) : data.boardState;
    return {
        ...data,
        boardState: parsedBoardState,
    };
};
