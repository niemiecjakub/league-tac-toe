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
    steals: number | null;
}

export interface CategoryItem {
    Category: string;
    Name: string;
    ResourceKey: string;
}

export interface Categories {
    Vertical: CategoryItem[];
    Horizontal: CategoryItem[];
}

export interface FieldValue {
    championName: string;
    playerType: PlayerType;
}

export interface BoardField {
    Value: FieldValue | null;
    History: FieldValue[];
}

export interface Game {
    id: number;
    roomUid: string;
    boardState: BoardField[][];
    categories: Categories;
    currentPlayerTurn: PlayerType;
    gameStatus: GameStateType;
    winner: PlayerType | null;
}
