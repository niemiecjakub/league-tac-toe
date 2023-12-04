import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';
import { INITIAL_STATE, GENERATE_CODE } from '../constants';

function OnlineGameLobby() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState(false)


  const joinRoom = async () => {

    const docRef = doc(db, "rooms", roomId)
    const room = await getDoc(docRef)

    if(!room.exists()) return
    if (room.data().playersJoined.length >= 2) return

    const playerId = GENERATE_CODE(12)
    localStorage.setItem("playerId", playerId)
    localStorage.setItem("player", "Player 2")

    await updateDoc(docRef, {
      playersJoined: arrayUnion(playerId),
    });

    navigate(`/game/room/${roomId}`)
  }

  const createNewRoom = async () => {
    const roomCode = GENERATE_CODE(5)

    const docRef = doc(db, "rooms", roomCode)
    const room = await getDoc(docRef)

    if(room.exists()) return 
    const playerId = GENERATE_CODE(12)
    const playersJoined = [playerId]

    await setDoc(docRef, {
      ...INITIAL_STATE, 
      roomId: roomCode,
      gameMode: "online",
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
