import * as signalR from "@microsoft/signalr";
import { getUserUid } from "./utils";

let connection: signalR.HubConnection | null = null;

export const connectToGameHub = async (roomUID: string) => {
    if (connection) {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
        }
        return connection;
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/gamehub`, {
            accessTokenFactory: () => getUserUid(),
        })
        .withAutomaticReconnect()
        .build();

    connection.onreconnecting(() => {
        console.warn("Reconnecting to game hub...");
    });

    connection.onreconnected(async () => {
        await connection?.invoke("JoinRoom", roomUID);
    });

    try {
        await connection.start();
        console.log("Connected to SignalR hub.");
    } catch (error) {
        console.error("SignalR connection error: ", error);
    }

    return connection;
};
