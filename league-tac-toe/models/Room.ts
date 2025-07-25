export interface Room {
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
