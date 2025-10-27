import { GameStateType } from "@/models/Game";
import { Room } from "@/models/Room";
import { getRoom, joinRoom, move, respondDrawRequest, sendDrawRequest, skipMove } from "@/services/gameService";
import { create } from "zustand";

type RoomStore = {
    room?: Room;
    turnTimeLeft: number | null;

    joinRoom: (roomGuid: string) => Promise<void>;
    updateRoom: (roomGuid: string) => Promise<void>;
    handleChampionSelect: (cellIndex: number, champion: string) => Promise<void>;
    handleTurnSkip: () => Promise<void>;
    handleSendDrawRequest: () => Promise<void>;
    handleRespondDrawRequest: () => Promise<void>;
    handleRoomLeave: () => Promise<void>;
    handleTimeLeftUpdate: (timeLeft: number | null) => void;

    // Derived
    isYourTurn: () => boolean;
    gameFinishedWithDraw: () => boolean;
    gameFinishedWithPlayerWin: () => boolean;
    youWon: () => boolean;
    opponentDrawRequested: () => boolean;
};
export const useRoomStore = create<RoomStore>((set, get) => ({
    room: undefined,
    turnTimeLeft: null,

    joinRoom: async (roomGuid) => {
        if (!roomGuid) return;
        const roomData = await joinRoom(roomGuid);
        set({ room: roomData });
    },

    updateRoom: async (roomGuid) => {
        const updatedRoom = await getRoom(roomGuid);
        set({ room: updatedRoom });
    },

    handleChampionSelect: async (cellIndex, champion) => {
        const { room, isYourTurn } = get();
        if (isYourTurn() && room?.game.gameStatus === GameStateType.InProgress) {
            const roomData = await move(room.roomGuid, cellIndex, champion);
            set({ room: roomData });
        }
    },

    handleTurnSkip: async () => {
        const { room, isYourTurn } = get();
        if (isYourTurn() && room?.game.gameStatus === GameStateType.InProgress) {
            const roomData = await skipMove(room.roomGuid);
            set({ room: roomData });
        }
    },

    handleSendDrawRequest: async () => {
        const { room, isYourTurn } = get();
        if (isYourTurn() && room?.game.gameStatus === GameStateType.InProgress) {
            const roomData = await sendDrawRequest(room.roomGuid);
            set({ room: roomData });
        }
    },

    handleRespondDrawRequest: async () => {
        const { room } = get();
        if (room?.game.gameStatus === GameStateType.InProgress) {
            const roomData = await respondDrawRequest(room.roomGuid);
            set({ room: roomData });
        }
    },
    handleRoomLeave: async () => {
        set({ room: undefined });
    },
    handleTimeLeftUpdate: (timeLeft) => {
        set({ turnTimeLeft: timeLeft });
    },

    // Derived
    isYourTurn: () => {
        const room = get().room;
        return room?.slot?.playerType === room?.game?.currentPlayerTurn;
    },
    gameFinishedWithDraw: () => {
        const room = get().room;
        return room?.game?.gameStatus === GameStateType.Finished && room?.game?.winner === null;
    },
    gameFinishedWithPlayerWin: () => {
        const room = get().room;
        return room?.game?.gameStatus === GameStateType.Finished && room?.game?.winner !== null;
    },
    youWon: () => {
        const room = get().room;
        return room?.game?.winner === room?.slot?.playerType;
    },
    opponentDrawRequested: () => {
        const room = get().room;
        const slot = room?.slot;
        return room?.game?.drawRequestedId != null && room?.game?.drawRequestedId !== slot?.playerType;
    },
}));
