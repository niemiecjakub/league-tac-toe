import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const connectToGameHub = async () => {
    if (connection) return connection;

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gamehub`) // adjust to your backend URL
        .withAutomaticReconnect()
        .build();

    connection.onreconnecting(() => {
        console.warn("Reconnecting to game hub...");
    });

    connection.onreconnected(() => {
        console.log("Reconnected to game hub.");
    });

    try {
        await connection.start();
        console.log("Connected to SignalR hub.");
    } catch (error) {
        console.error("SignalR connection error: ", error);
    }

    return connection;
};
