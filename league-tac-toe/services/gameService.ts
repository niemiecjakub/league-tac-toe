import axios from "@/lib/axios";
import { BoardField, Categories } from "@/models/Game";
import { Room, RoomInfo, RoomOptions } from "@/models/Room";

const parseGameData = (data: any) => {
    const parsedBoardState: BoardField[][] = typeof data.game.boardState === "string" ? JSON.parse(data.game.boardState) : data.game.boardState;
    const parsedCategories: Categories = typeof data.game.categories === "string" ? JSON.parse(data.game.categories) : data.game.categories;

    console.log(parsedCategories);
    return {
        ...data.game,
        boardState: parsedBoardState,
        categories: parsedCategories,
    };
};

export const createRoom = async (roomOptions: RoomOptions): Promise<RoomInfo> => {
    const params = new URLSearchParams({
        turnTime: roomOptions.turnTime === null ? "-1" : roomOptions.turnTime.toString(),
        stealsEnabled: roomOptions.stealsEnabled.toString(),
        includeEsportCategories: roomOptions.includeEsportCategories.toString(),
    });

    const { data } = await axios.post(`Game/CreateRoom?${params.toString()}`);
    return data;
};

export const joinRoom = async (roomGuid: string): Promise<Room> => {
    const { data } = await axios.post(`Game/JoinRoom/${roomGuid}`);
    data.game = parseGameData(data);
    return data;
};

export const getRoom = async (roomGuid: string): Promise<Room> => {
    console.log("Fetching room data for roomGuid:", roomGuid);
    const { data } = await axios.get(`Game`, { params: { roomGuid } });
    data.game = parseGameData(data);
    return data;
};

export const findRandomOpponent = async (): Promise<RoomInfo> => {
    const { data } = await axios.get("Game/FindRandomOpponent");
    return data;
};

export const move = async (roomGuid: string, fieldId: number, championName: string): Promise<Room> => {
    const { data } = await axios.post(`Game/Move/${roomGuid}`, null, { params: { fieldId, championName } });
    data.game = parseGameData(data);
    return data;
};

export const skipMove = async (roomGuid: string): Promise<Room> => {
    const { data } = await axios.post(`Game/Move/Skip/${roomGuid}`);
    data.game = parseGameData(data);
    return data;
};

export const sendDrawRequest = async (roomGuid: string): Promise<Room> => {
    const { data } = await axios.post(`Game/Move/RequestDraw/${roomGuid}`);
    data.game = parseGameData(data);
    return data;
};

export const respondDrawRequest = async (roomGuid: string): Promise<Room> => {
    const { data } = await axios.post(`Game/Move/RespondDrawRequest/${roomGuid}`);
    data.game = parseGameData(data);
    return data;
};
