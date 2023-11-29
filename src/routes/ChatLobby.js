import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

function ChatLobby() {
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [error, setError] = useState(false)
    const [joinedRoom, setJoinedRoom] = useState(false)
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function onConnect() {
          console.log("User connected")
          setIsConnected(true);
        }
        function onDisconnect() {
          setIsConnected(false);
        }
        function onSendMessage(messageData) {
          setMessages(msg => [...msg, messageData])
        }
        function onRoomJoin(roomData) {
          console.log("Joined room, ", roomData)
        }
        function onRoomLeave(roomData) {
          console.log("Left room, ", roomData)
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('send_message', onSendMessage);
        socket.on('room_join', onRoomJoin);
        socket.on('room_leave', onRoomLeave);

        console.log("socket set")
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('send_message', onSendMessage);
          socket.off('room_join', onRoomJoin);
          socket.off('room_leave', onRoomLeave);
        };
      }, []);
    

    const joinRoom = () => {
      if (!joinedRoom){
        if (name && roomId) {
            socket.connect() 
            setJoinedRoom(status => !status)
            setIsConnected(true)
            socket.emit('room_join', {name, roomId})
        }
      } else {
        setJoinedRoom(false)
        setIsConnected(false)
        socket.emit('room_leave', {name, roomId})
        socket.disconnect()
      }
    }
    
    const sendMessage = (e) => {
        e.preventDefault()
        console.log("sending message")
        socket.emit("send_message", { 
            message: chatInput, 
            username: name,
            roomId, 
        });
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
                        {messages.length >0 && messages.map((message, index) => <h2 key={index}>{message.username}: {message.message}</h2>)}
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
