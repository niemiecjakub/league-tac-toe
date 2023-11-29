import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatLobby() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [error, setError] = useState(false)

    const joinRoom = (roomId) => {
        console.log("Joining room: ", roomId)
        if (roomId && name) {
            navigate(`/chat/${roomId}`)
        } else {
            setError(true)
        }
    }
    return (
        <div className='flex flex-col items-center  bg-gray-700 h-screen text-xl text-white'>
            <h1>Name</h1> 
            <input
                className='bg-white text-black'
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
            />
            <h1>Room code</h1>
            <input
                className='bg-white text-black'
                type="text"
                value={roomId}
                name="code"
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button className='m-5 bg-red-300 hover:bg-red-500 w-full h-16' onClick={() => joinRoom(roomId)}>Send</button>
            {error && <p>Name and room code cannot be empty</p>}
        </div>
      );
}

export default ChatLobby;
