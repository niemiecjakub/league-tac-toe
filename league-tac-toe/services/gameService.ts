import axios from "@/lib/axios";
import { Game, GameSlot, Player } from "@/models/Game";
import { Room, RoomOptions } from "@/models/Room";

export const createRoom = async (roomOptions: RoomOptions): Promise<Room> => {
    const params = new URLSearchParams({
        turnTime: roomOptions.turnTime.toString(),
        stealsEnabled: roomOptions.stealsEnabled.toString(),
    });

    const { data } = await axios.post(`Game/CreateRoom?${params.toString()}`);
    return data;
};

export const getRoom = async (roomGuid: string): Promise<Room> => {
    const { data } = await axios.get(`Game/GetRoom/${roomGuid}`);
    return data;
};

export const joinRoom = async (roomGuid: string): Promise<GameSlot> => {
    const { data } = await axios.post(`Game/JoinRoom/${roomGuid}`);
    return data;
};

export const getCurrentGame = async (roomGuid: string): Promise<Game> => {
    const { data } = await axios.get(`Game/GetGame/${roomGuid}`);

    const parsedBoardState: Player[] = typeof data.boardState === "string" ? JSON.parse(data.boardState) : data.boardState;
    return {
        ...data,
        boardState: parsedBoardState,
    };
};

export const move = async (roomGuid: string, fieldId: number): Promise<Game> => {
    const { data } = await axios.post(`Game/Move/${roomGuid}`, null, {
        params: { fieldId },
    });

    const parsedBoardState: Player[] = typeof data.boardState === "string" ? JSON.parse(data.boardState) : data.boardState;
    return {
        ...data,
        boardState: parsedBoardState,
    };
};

export const skipMove = async (roomGuid: string): Promise<Game> => {
    const { data } = await axios.post(`Game/Move/Skip/${roomGuid}`);

    const parsedBoardState: Player[] = typeof data.boardState === "string" ? JSON.parse(data.boardState) : data.boardState;
    return {
        ...data,
        boardState: parsedBoardState,
    };
};
