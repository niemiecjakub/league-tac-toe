export interface Room {
    roomGuid: string;
    turnTime: number | null;
    stealsEnabled: boolean;
}

export interface RoomOptions {
    turnTime: number | null;
    stealsEnabled: boolean;
}
