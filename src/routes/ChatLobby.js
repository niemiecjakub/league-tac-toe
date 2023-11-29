import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// const joinRoom = (roomId) => {
//     console.log("Joining room: ", roomId)
//     if (roomId && name) {
//         navigate(`/chat/${roomId}`)
//     } else {
//         setError(true)
//     }
// }

let socket

function ChatLobby() {
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [error, setError] = useState(false)
    const [joinedRoom, setJoinedRoom] = useState(false)

    const joinRoom = () => {
        if (name && roomId) {
            socket.connect() 
            setJoinedRoom(status => !status)
            console.log("Joined room, ", roomId)
        }
    }

    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        socket = io('http://127.0.0.1:8000/', {
            autoConnect: false,
          transports: ["websocket"],
                cors: {
                  origin: "http://localhost:3000/",
                },
        });  // Replace with your server URL
  
        socket.on('connect', () => {
          console.log("User connected")
        })
  
        socket.on('send_message',chat => {
            console.log(chat)
          setMessages(msg => [...msg, chat.data])
        })
  
        console.log("socket set")

      }, [])


      const sendMessage = (e) => {
        e.preventDefault()
        socket.emit("send_message", { data: chatInput });
        console.log("sending message")
        setChatInput('')
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
            <button className='m-5 bg-red-300 hover:bg-red-500 w-full h-16' onClick={joinRoom}>{joinedRoom? "disconnect" : "connect"}</button>
            {error && <p>Name and room code cannot be empty</p>}
            {joinedRoom ? 
            (
                <>
                    <h1 className='text-center'>Room code: {roomId}</h1>
                    <div>
                        {messages.length >0 && messages.map(message => <h2>{message}</h2>)}
                    </div>
                    <div>
                        <input
                            className='bg-white text-black'
                            type="text"
                            value={chatInput}
                            name="chat"
                            onChange={(e) => setChatInput(e.target.value)}
                        />
                        <button className='bg-green-500 hover:bg-green-700' onClick={sendMessage}>Send message</button>

                    </div>
                </>

            ) : 
            (
                <h1 className='text-center'>No room</h1>
            )
            }
        </div>
      );
}

export default ChatLobby;
