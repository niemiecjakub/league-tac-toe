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
  increment,
} from "firebase/firestore";
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
  if (room.data().playerCount >= 2) return;
  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  Cookies.set("player", "Player 2", { expires: 7 });

  await updateDoc(docRef, {
    playersJoined: arrayUnion(Cookies.get("playerId")),
    playerCount: increment(1),
  });

  navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
};

export const joinFromLink = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  const room = await getDoc(docRef);

  if (!room.exists()) return;
  if (room.data().playersJoined.includes(Cookies.get("playerId"))) return;
  if (room.data().playerCount >= 2) return;

  if (!Cookies.get("playerId"))
    Cookies.set("playerId", GENERATE_CODE(12), { expires: 7 });

  Cookies.set("player", "Player 2", { expires: 7 });

  await updateDoc(docRef, {
    playersJoined: arrayUnion(Cookies.get("playerId")),
    playerCount: increment(1),
  });
};

export const createRoom = async (stealsEnabled) => {
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
