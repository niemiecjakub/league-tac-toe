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

export interface GameSlot {
    playerType: PlayerType;
}

export interface Game {
    id: number;
    roomUid: string;
    boardState: Player[][];
    categories: string;
    currentPlayerTurn: PlayerType;
    gameStatus: GameStateType;
}
