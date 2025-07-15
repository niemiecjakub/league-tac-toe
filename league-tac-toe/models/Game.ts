export enum PlayerType {
    X = 1,
    O = 2,
}

export enum GameStateType {
    Created = 1,
    InProgress = 2,
    Finished = 3,
}

export type Player = "X" | "O" | null;

export interface Game {
    id: number;
    roomUID: string;
    boardState: Player[][];
    categories: string;
    currentTurnId: PlayerType;
    statusId: GameStateType;
    winnerId?: PlayerType | null;
    createdAt: string;
    updatedAt: string;
}
