import React, { useEffect } from 'react';
import Board from '../../components/same-screen/Board';
import GameInfo from '../../components/same-screen/GameInfo';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { getNewGameData, setGameMode, setRoomId, setDBstate, startOnlineGame } from '../../redux/slices/GameSlice';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';

function Game({gameMode}) {
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const { isLoadingGame, playersJoined } = useSelector(state => state.game)
  
  useEffect(() => {
    dispatch(setGameMode(gameMode))
    let unsubscribe
    
    switch(gameMode) {
      case "same screen":
        dispatch(getNewGameData())
        break
      case "online":
        dispatch(setRoomId(roomId))
        const docRef = doc(db, "rooms", roomId)
        unsubscribe = onSnapshot(docRef, (snapshot) => {
          const currentData = snapshot.data()
          console.log(currentData)
          dispatch(setDBstate(currentData))
          if (currentData.playersJoined.length == 2 && !currentData.isGameStarted) {
            dispatch(startOnlineGame(roomId))
          }
        })
        break
    }
    return () => unsubscribe
  },[dispatch])


  if (gameMode === "online" && playersJoined.length < 2) {
    return (
      <div id="game-container" className='font-league max-h-fit w-screen lg:m-auto lg:w-1/3'>
        <div className="text-white h-96 text-xl flex flex-col justify-center items-center"> 
          <h1>Waiting for others to join</h1>
          <h1>Room code: {roomId}</h1>
        </div>
      </div>
    )
  }
  if (isLoadingGame) {
    return (
      <div id="game-container" className='font-league max-h-fit w-screen lg:m-auto lg:w-1/3'>
        <Loading />
      </div>
    )
  }

  return (
    <div id="game-container" className='font-league max-h-fit w-screen lg:m-auto lg:w-1/3'>
      <GameInfo />
      <Board />
    </div>
  )
}

export default Game;
