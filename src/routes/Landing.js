import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageCard from '../components/PageCard'

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
    <div className="flex flex-col items-center justify-center  font-sans ">
      <div className="flex flex-col items-center justify-center h-full space-y-4 my-4 w-full lg:w-1/4">

        <PageCard to="/champion-list" title="Champion list" subtext="Browse all champions"/>

        <PageCard to="/game" title="Same screen game" subtext="Same screen game"/>

        <PageCard to={`/game/room/${roomCode}`} title="Play agains friend" subtext="Play agains friend"/>

        <PageCard to={`/game/room/${roomCode}`} title="Find random opponent" subtext="Find random opponent"/>
    
        <div>
          <h1 className='font-bold text-xl my-2'>How to play League-Tac-Toe</h1>
          <p>
            Tiki-Taka-Toe is a game of tic tac toe or noughts and crosses with a football twist. 
            Play with your mates on the same device or challenge them to a game online. 
            If your mates are unavailable, don't worry, you can play against thousands of football fans around the world by finding an opponent or you can play against the clock to complete the football grid in our daily Box2Box game. 
            Choose to play Tiki-Taka-Toe using European leagues, featuring the continent’s biggest names or if you’re an aficionado of an individual league, you can choose to play within that division.
          </p>
          
          <h2 className='font-bold text-xl my-2'>
            Here's the rules:
          </h2>

          A three by 3 square grid is lined up with criteria like football clubs, nations, trophies and awards.
          Place your marker, an X or O, in one of the squares if you can name a football player that matches the criteria across the top row and left hand side.
          The footballer can be a current of former player, remember you can use the same player more than once on the same grid.
          The first to get three in a row, vertically, horizontally or diagonally, is the winner.
          If you find normal tic tac toe rules too easy, Tiki-Taka-Toe gives you the option to play with steals.
          With steal mode enabled, each player has 3 steals in total, where a square can be stolen that is occupied by the opposing player.
          Infuriate your opponent and steal a square by naming a different player to the footballer already in the position on the grid.
        </div>


        {/* <div className="bg-slate-500 h-56 w-full flex place-items-center m-5">
            <h2>Play agains friend</h2> 
            <button onClick={() => setRoomCode(generateCode(5))}> Generate code</button>
            <h2>Room code: {roomCode}</h2>
            <Link to={`/game/room/${roomCode}`}>
              <button>Join room</button>
            </Link>
        </div> */}

      </div>
    </div>
  );
}

export default Landing;
