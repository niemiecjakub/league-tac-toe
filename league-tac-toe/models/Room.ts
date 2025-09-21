import { Game, GameSlot } from "./Game";

export interface Room extends RoomInfo {
    game: Game;
    slot: GameSlot;
}

export interface RoomInfo {
    roomGuid: string;
    turnTime: number | null;
    stealsEnabled: boolean;
    isPublic: boolean;
}

export interface RoomOptions {
    turnTime: number | null;
    stealsEnabled: boolean;
    isPublic: boolean;
}
