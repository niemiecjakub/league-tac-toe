import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase-config';

function generateRoomCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const initialState = {
  roomId: "",
  isGameOver : false,
  isLoadingGame : true,
  playersJoined: [],
  player1: {
      name: "Player 1",
      alias: "P 1",
      fields: [],
      steals:3,
      score: 0
  },
  player2 : {
      name: "Player 2",
      alias: "P 2",
      fields: [],
      steals:3,
      score: 0
  },
  currentPlayer: {
      name: "Player 1",
      alias: "P 1",
      fields: [],
      steals:3,
      score: 0
  },
  gameFields: [],
  possibleFields: [1,2,3,4,5,6,7,8],
  categoryFields: {
      horizontal: [],
      vertical: []
  }
}

function OnlineGameLobby() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState(false)


  const joinRoom = async () => {

    const docRef = doc(db, "rooms", roomId)
    const room = await getDoc(docRef)

    if(!room.exists()) return
    if (room.data().playersJoined.length >= 2) return

    const playerId = generateRoomCode(12)
    localStorage.setItem("playerId", playerId)
    localStorage.setItem("player", "Player 2")

    await updateDoc(docRef, {
      playersJoined: arrayUnion(playerId)
    });

    navigate(`/game/room/${roomId}`)
  }

  const createNewRoom = async () => {
    const roomCode = generateRoomCode(5)

    const docRef = doc(db, "rooms", roomCode)
    const room = await getDoc(docRef)

    if(room.exists()) return 
    const playerId = generateRoomCode(12)
    const playersJoined = [playerId]

    await setDoc(docRef, {
      ...initialState, 
      roomId: roomCode,
      playersJoined, 
    });

    localStorage.setItem("player", "Player 1")
    localStorage.setItem("playerId", playerId)
    navigate(`/game/room/${roomCode}`)
  }


  return (
    <div className="bg-slate-400 w-full flex flex-col rounded-lg shadow-xl drop-shadow-md text-xl">
      <div className='flex h-16'>
        <h1 className='w-1/4'>Room code</h1>
        <input
          className='bg-white text-black w-2/4'
          type="text"
          value={roomId}
          name="code"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className=' bg-red-300 hover:bg-red-500 w-1/4' onClick={joinRoom}>connect</button>

      </div>
      <button className=' bg-green-300 hover:bg-green-500 m-5 h-16' onClick={createNewRoom}>Create new game</button>
      {error && <p>Name and room code cannot be empty</p>}
    </div>
  );
}

export default OnlineGameLobby;
