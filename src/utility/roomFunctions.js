import { db } from "../firebase-config";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { GENERATE_CODE, INITIAL_STATE } from "../constants";

export const joinRoom = async (roomId, navigate) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);

  if (!room.exists()) return;
  if (room.data().playersJoined.includes(localStorage.getItem("playerId"))) {
    navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
    return;
  }
  if (room.data().playersJoined.length >= 2) return;

  if (!localStorage.getItem("playerId")) {
    localStorage.setItem("playerId", GENERATE_CODE(12));
  }
  localStorage.setItem("player", "Player 2");

  await updateDoc(docRef, {
    playersJoined: arrayUnion(localStorage.getItem("playerId")),
  });

  navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
};

export const createRoom = async (navigate) => {
  const roomCode = GENERATE_CODE(5);

  const docRef = doc(db, "rooms", roomCode);
  const room = await getDoc(docRef);

  if (room.exists()) return;

  if (!localStorage.getItem("playerId")) {
    localStorage.setItem("playerId", GENERATE_CODE(12));
  }

  const playersJoined = [localStorage.getItem("playerId")];
  localStorage.setItem("player", "Player 1");

  await setDoc(docRef, {
    ...INITIAL_STATE,
    roomId: roomCode,
    gameMode: "online",
    playersJoined,
  });

  navigate(`/game/room/${roomCode}`, { state: { navigated: "code" } });
};

export const joinFromLink = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);

  if (!room.exists()) return;
  if (room.data().playersJoined.includes(localStorage.getItem("playerId"))) {
    return;
  }
  if (room.data().playersJoined.length >= 2) return;

  if (!localStorage.getItem("playerId")) {
    localStorage.setItem("playerId", GENERATE_CODE(12));
  }
  localStorage.setItem("player", "Player 2");

  await updateDoc(docRef, {
    playersJoined: arrayUnion(localStorage.getItem("playerId")),
  });
};
