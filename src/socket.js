import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:8000/';

export const socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000/",
    },
  });

  
  


