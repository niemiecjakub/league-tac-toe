import { db } from "../firebase-config";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { GENERATE_CODE, GAME_INITIAL_STATE } from "../utility/constants";
import Cookies from "js-cookie";

export const joinRoom = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);
  const { playersJoined, playerCount } = room.data();

  if (!room.exists()) return { action: "join", status: false };
  if (playersJoined.includes(Cookies.get("playerId"))) {
    return { action: "join", status: true };
  }
  if (playerCount >= 2) return { action: "join", status: false };
  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  Cookies.set("player", "Player 2", { expires: 7 });

  const playerIds = [...playersJoined, Cookies.get("playerId")];
  const nPlayers = playerIds.length;

  await updateDoc(docRef, {
    playersJoined: playerIds,
    playerCount: nPlayers,
  });

  return { action: "join", status: true, roomId };
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

export const createRoom = async ({
  stealsEnabled,
  turnTime,
  isOpenForRandom,
}) => {
  const roomId = GENERATE_CODE(5);
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);
  if (room.exists()) return { action: "create", status: false };
  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  const playersJoined = [Cookies.get("playerId")];
  Cookies.set("player", "Player 1", { expires: 7 });

  await setDoc(docRef, {
    ...GAME_INITIAL_STATE,
    turnTime: turnTime,
    createdAt: serverTimestamp(),
    stealsEnabled: stealsEnabled,
    isOpenForRandom: isOpenForRandom,
    roomId: roomId,
    gameMode: "online",
    playerCount: 1,
    playersJoined,
  });

  return { action: "create", status: true, roomId: roomId };
};

//potential add
export const handleRandomGame = async (options) => {
  let status;
  while (!status) {
    const roomsRef = await collection(db, "rooms");
    // while (lookingForgame) {
    const q = await query(
      roomsRef,
      where("isOpenForRandom", "==", true),
      where("playerCount", "==", 1),
      orderBy("createdAt"),
      limit(1)
    );

    let response;

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
      const [doc] = querySnapshot.docs;
      const { roomId } = doc.data();
      response = await joinRoom(roomId);
    } else {
      response = await createRoom(options);
    }
    status = response.status;

    return response;
  }
};
