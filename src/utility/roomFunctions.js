import { db } from "../firebase-config";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  collection,
  getDocs,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { GENERATE_CODE, INITIAL_STATE } from "../constants";
import Cookies from "js-cookie";

export const joinRoom = async (roomId, navigate) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);
  const { playersJoined, playerCount } = room.data();

  if (!room.exists()) return;
  if (playersJoined.includes(Cookies.get("playerId"))) {
    navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
    return;
  }
  if (playerCount >= 2) return;
  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  Cookies.set("player", "Player 2", { expires: 7 });

  const playerIds = [...playersJoined, Cookies.get("playerId")];
  const nPlayers = playerIds.length;

  await updateDoc(docRef, {
    playersJoined: playerIds,
    playerCount: nPlayers,
  });

  navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
};

export const joinFromLink = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);
  const { playersJoined, playerCount } = room.data();

  if (!room.exists()) return;
  if (playersJoined.includes(Cookies.get("playerId"))) return;
  if (playerCount >= 2) return;

  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  Cookies.set("player", "Player 2", { expires: 7 });

  const playerIds = [...playersJoined, Cookies.get("playerId")];
  const nPlayers = playerIds.length;

  await updateDoc(docRef, {
    playersJoined: playerIds,
    playerCount: nPlayers,
  });
};

export const createRoom = async (stealsEnabled, turnTime) => {
  const roomId = GENERATE_CODE(5);
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);
  if (room.exists()) return;
  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  const playersJoined = [Cookies.get("playerId")];
  Cookies.set("player", "Player 1", { expires: 7 });

  await setDoc(docRef, {
    ...INITIAL_STATE,
    turnTime: turnTime,
    createdAt: serverTimestamp(),
    stealsEnabled: stealsEnabled,
    roomId: roomId,
    gameMode: "online",
    playerCount: 1,
    playersJoined,
  });

  return roomId;
};

export const handleRandomGame = async (navigate) => {
  const roomsRef = await collection(db, "rooms");
  // while (lookingForgame) {
  const q = await query(
    roomsRef,
    where("isOpenForRandom", "==", true),
    where("playerCount", "==", 1),
    orderBy("createdAt"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length) {
    const [doc] = querySnapshot.docs;
    const { roomId } = doc.data();
    joinRoom(roomId, navigate);
  } else {
    const randomInt = Math.floor(Math.random() * 2);
    const stealsEnabled = randomInt === 0 ? false : true;
    createRoom(stealsEnabled, true);
  }
  // }
};
