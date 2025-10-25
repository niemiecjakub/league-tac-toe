import axios from "@/lib/axios";
import { BoardField, Categories } from "@/models/Game";
import { Room, RoomInfo, RoomOptions } from "@/models/Room";
import { handleServiceError } from "@/lib/errorHandler";

const parseGameData = (data: any) => {
    const parsedBoardState: BoardField[][] = typeof data.game.boardState === "string" ? JSON.parse(data.game.boardState) : data.game.boardState;
    const parsedCategories: Categories = typeof data.game.categories === "string" ? JSON.parse(data.game.categories) : data.game.categories;

    return {
        ...data.game,
        boardState: parsedBoardState,
        categories: parsedCategories,
    };
};

export const createRoom = async (roomOptions: RoomOptions): Promise<RoomInfo> => {
    try {
        const params = new URLSearchParams({
            turnTime: roomOptions.turnTime === null ? "-1" : roomOptions.turnTime.toString(),
            stealsEnabled: roomOptions.stealsEnabled.toString(),
        });

        const { data } = await axios.post(`Game/CreateRoom?${params.toString()}`);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to create room");
    }
};

export const joinRoom = async (roomGuid: string): Promise<Room> => {
    try {
        const { data } = await axios.post(`Game/JoinRoom/${roomGuid}`);
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to join room");
    }
};

export const getRoom = async (roomGuid: string): Promise<Room> => {
    try {
        console.log("Fetching room data for roomGuid:", roomGuid);
        const { data } = await axios.get(`Game`, { params: { roomGuid } });
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to get room");
    }
};

export const findRandomOpponent = async (): Promise<RoomInfo> => {
    try {
        const { data } = await axios.get("Game/FindRandomOpponent");
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to find random opponent");
    }
};

export const move = async (roomGuid: string, fieldId: number, championName: string): Promise<Room> => {
    try {
        const { data } = await axios.post(`Game/Move/${roomGuid}`, null, { params: { fieldId, championName } });
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to make move");
    }
};

export const skipMove = async (roomGuid: string): Promise<Room> => {
    try {
        const { data } = await axios.post(`Game/Move/Skip/${roomGuid}`);
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to skip move");
    }
};

export const sendDrawRequest = async (roomGuid: string): Promise<Room> => {
    try {
        const { data } = await axios.post(`Game/Move/RequestDraw/${roomGuid}`);
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to send draw request");
    }
};

export const respondDrawRequest = async (roomGuid: string): Promise<Room> => {
    try {
        const { data } = await axios.post(`Game/Move/RespondDrawRequest/${roomGuid}`);
        data.game = parseGameData(data);
        return data;
    } catch (error) {
        return handleServiceError(error, "Failed to respond to draw request");
    }
};
