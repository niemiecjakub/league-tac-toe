import { Game, GameSlot } from "./Game";
import { Score } from "./Score";

export interface Room extends RoomInfo {
    game: Game;
    slot: GameSlot;
}

export interface RoomInfo {
    roomGuid: string;
    turnTime: number | null;
    stealsEnabled: boolean;
    isPublic: boolean;
    score: Score;
}

export interface RoomOptions {
    turnTime: number | null;
    stealsEnabled: boolean;
    isPublic: boolean;
}
