import { GameStateType } from "@/models/Game";
import { Room } from "@/models/Room";
import { getRoom, joinRoom, move, skipMove } from "@/services/gameService";
import { create } from "zustand";

type RoomStore = {
    room?: Room;

    joinRoom: (roomGuid: string) => Promise<void>;
    updateRoom: (roomGuid: string) => Promise<void>;
    handleChampionSelect: (cellIndex: number, champion: string) => Promise<void>;
    handleTurnSkip: (roomGuid: string) => Promise<void>;

    // Derived
    isYourTurn: () => boolean;
    isDraw: () => boolean;
    playerWon: () => boolean;
};
export const useRoomStore = create<RoomStore>((set, get) => ({
    room: undefined,

    joinRoom: async (roomGuid) => {
        try {
            if (!roomGuid) return;

            const roomData = await joinRoom(roomGuid);
            set({ room: roomData });
            console.log("Room:", roomData);

            // if (roomData?.turnTime != null) {
            //     setTimer(roomData.turnTime);
            // }
        } catch (error) {
            console.error("Failed to join game:", error);
        }
    },

    updateRoom: async (roomGuid) => {
        try {
            const updatedRoom = await getRoom(roomGuid);
            set({ room: updatedRoom });
            console.log("updatedGame", updatedRoom);

            // if (updatedRoom?.turnTime != null) {
            //     setTimer(updatedRoom.turnTime);
            // }
        } catch (err) {
            console.error("Error during TurnSwitch update:", err);
        }
    },

    handleChampionSelect: async (cellIndex, champion) => {
        const { room } = get();
        if (room && room.game.gameStatus === GameStateType.InProgress) {
            const roomData = await move(room.roomGuid, cellIndex, champion);
            set({ room: roomData });
        }
    },

    handleTurnSkip: async (roomGuid) => {
        const { room } = get();
        if (room && room.game.gameStatus === GameStateType.InProgress) {
            const roomData = await skipMove(roomGuid);
            set({ room: roomData });
        }
    },

    // Derived
    isYourTurn: () => {
        const room = get().room;
        return room?.slot?.playerType === room?.game?.currentPlayerTurn;
    },
    isDraw: () => {
        const room = get().room;
        return room?.game?.gameStatus === GameStateType.Finished && room?.game?.winner === null;
    },
    playerWon: () => {
        const room = get().room;
        return room?.game?.gameStatus === GameStateType.Finished && room?.game?.winner !== null;
    },
}));
