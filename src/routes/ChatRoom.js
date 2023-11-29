import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

let socket

function ChatRoom() {
    const {roomId} = useParams()
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
      socket = io('http://127.0.0.1:8000/', {
        transports: ["websocket"],
              cors: {
                origin: "http://localhost:3000/",
              },
      });  // Replace with your server URL

      socket.on('connect', () => {
        console.log("User connected")
      })

      socket.on('send_message',chat => {
        setMessages(chat.data)
      })

      console.log("socket set")
    }, [])

    
    const sendMessage = (e) => {
      e.preventDefault()
      socket.emit("send_message", { data: chatInput });
      console.log("sending message")
    };
    

    return (
        <div className='bg-gray-700 w-full min-h-screen text-white text-xl'>
          <h1 className='text-center'>Room code: {roomId}</h1>
          {/* <ul>
            {messages.map((msg, index) => (
              <li className="h-32 w-96" key={index}>{msg}</li>
            ))}
          </ul> */}
          {
            messages
          }
          <input
            className='bg-white text-black'
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button className='px-5 bg-green-500 hover:bg-green-800' onClick={sendMessage}>Send</button>
        </div>
      );
}

export default ChatRoom;
