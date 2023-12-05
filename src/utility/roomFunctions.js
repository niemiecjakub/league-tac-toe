import { db } from "../firebase-config";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { GENERATE_CODE, INITIAL_STATE } from "../constants";
import Cookies from "js-cookie";

export const joinRoom = async (roomId, navigate) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);

  if (!room.exists()) return;
  if (room.data().playersJoined.includes(Cookies.get("playerId"))) {
    navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
    return;
  }
  if (room.data().playersJoined.length >= 2) return;

  if (!Cookies.get("playerId")) {
    Cookies.set('playerId', GENERATE_CODE(12), { expires: 7 })

  }
  Cookies.set('player', "Player 2", { expires: 7 })

  await updateDoc(docRef, {
    playersJoined: arrayUnion(Cookies.get("playerId")),
  });

  navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
};

export const createRoom = async (navigate) => {
  const roomCode = GENERATE_CODE(5);

  const docRef = doc(db, "rooms", roomCode);
  const room = await getDoc(docRef);

  if (room.exists()) return;

  if (!Cookies.get("playerId")) {
    Cookies.set('playerId', GENERATE_CODE(12), { expires: 7 })
  }

  const playersJoined = [Cookies.get("playerId")];
  Cookies.set("player", "Player 1", { expires: 7 });

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
  if (room.data().playersJoined.includes(Cookies.get("playerId"))) {
    return;
  }
  if (room.data().playersJoined.length >= 2) return;

  if (!Cookies.get("playerId")) {
    Cookies.set('playerId', GENERATE_CODE(12), { expires: 7 })
  }
  Cookies.set("player", "Player 2", { expires: 7 });

  await updateDoc(docRef, {
    playersJoined: arrayUnion(Cookies.get("playerId")),
  });
};
