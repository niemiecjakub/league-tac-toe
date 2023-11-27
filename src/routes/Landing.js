import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'

const generateCode = (length) => {
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

function Landing() {
  const [roomCode, setRoomCode] = useState('')

  useEffect(() => {
    const userCode = localStorage.getItem("uid")
    if (!userCode) {
      const userCode = generateCode(20)
      localStorage.setItem("uid", userCode)
    }
  },[])

  return (
    <div className="App">
        <div>
            <Link to="/champion-list">Champion list</Link> 
        </div>
        <h1>Game options</h1>
        <div>
            <Link to="/game">
              <h2>Same screen game</h2>
              </Link> 
        </div>
        <div>
            <h2>Play agains friend</h2> 
            <button onClick={() => setRoomCode(generateCode(5))}> Generate code</button>
            <h2>Room code: {roomCode}</h2>
            <Link to={`/game/room/${roomCode}`}>
              <button>Join room</button>
            </Link>
        </div>
        <div>
            <Link to={`/game/room/${roomCode}`}>
              <h2>Find random opponent</h2> 
            </Link> 
        </div>
    </div>
  );
}

export default Landing;
