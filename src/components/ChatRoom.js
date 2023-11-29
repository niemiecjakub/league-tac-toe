import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';

function GameLobby() {
  const {roomId} = useParams()
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);


  const messagesRef = collection(db, "messages")

  const sendMessage = async (e) => {
    e.preventDefault()
    if (chatInput === "") return
    console.log("sending message")

    await addDoc(messagesRef, {
      text: chatInput,
      user: 'xd',
      room: roomId,
      createdAt: serverTimestamp()
    })

    setChatInput('')
  }

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", roomId))
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = []
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id:doc.id})
      })
      setMessages(messages)
    })

    return () => unsubscribe
  },[])
    
  return (
    <div className='flex flex-col items-center  bg-gray-700 h-screen text-xl text-white'>
      <h1 className='text-center'>Room code: {roomId}</h1>
      <div>
        {messages.length >0 && messages.map((message, index) => <h2 key={index}>{message.text}</h2>)}
      </div>
      <div>
        <input
          className='bg-white text-black'
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button className='bg-green-500 hover:bg-green-700' onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
}

export default GameLobby;
