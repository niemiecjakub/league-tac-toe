import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setCurrentPlayer,
  endAsDraw,
  getNewGameData,
  skipTurnOnline } from '../../redux/slices/GameSlice';

  function GameInfo() {
  const dispatch = useDispatch()
  const [openSkipTurn, setOpenSkipTurn] = useState(false)
  const [openDrawRequest, setOpenDrawRequest] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [player,setPlayer] = useState(localStorage.getItem("player"))
  const [turnIndicator,setTurnIndicator] = useState('')
  const {currentPlayer, player1, player2, gameMode} = useSelector(state => state.game)

  useEffect(() => {
    setOpenSkipTurn(false)
    setOpenDrawRequest(false)
    switch(gameMode){
      case "same screen": 
        setIsDisabled(false)
        setTurnIndicator(`${currentPlayer.alias}'s`)
        break
      case "online": 
        setIsDisabled(currentPlayer.name !== player)
        currentPlayer.name === player ? setTurnIndicator("YOUR") : setTurnIndicator("OPPONENT")
        break
    }
  },[currentPlayer, gameMode, player])

  const requestDraw = () => {
    switch(gameMode){
      case "same screen": 
        dispatch(endAsDraw())
        dispatch(getNewGameData())
        break
      case "online": 
    }
  }
  
  const skipTurn = () => {
    switch(gameMode){
      case "same screen": 
        dispatch(setCurrentPlayer())
        break
      case "online": 
        console.log("dispatching")
        dispatch(skipTurnOnline())
        break
    }
  }

  
  return (
    <div className='bg-league-blue-600 flex flex-col py-4 text-white font-leagueheavy text-md'>
      <div className='flex flex-row justify-between items-center'>
        <div className='bg-league-gold-400  rounded-r-xl flex item'>
          <div className='p-2 bg-blue-600'></div>
          <div className='p-2'>
            {player1.alias}
          </div>
          <div className='p-2 bg-league-gold-300'>
            {player1.score} - {player2.score}
          </div>
          <div className='p-2'>
            {player2.alias}
          </div>
          <div className='p-2 bg-green-500 rounded-r-xl'></div>
        </div>
        <div className='flex flex-row justify-between items-center bg-league-gold-300 rounded-l-xl'>
          <h1 className='px-2'>
            {turnIndicator} TURN
          </h1>
          {
            openSkipTurn? (
              <button className='bg-red-500 px-3 py-2' disabled={isDisabled} onClick={skipTurn}>CONFIRM</button>
            ) : (
              <button className='bg-red-700 px-3 py-2' disabled={isDisabled} onClick={() => setOpenSkipTurn(o => !o)}>SKIP TURN</button>
            )
          }
        </div>
      </div>
      <div className='flex flex-row justify-between items-center bg-slate-00 mt-4'>
        <div className='bg-league-grey-200 p-2 rounded-r-xl'>
          <h1>{currentPlayer.steals} STEALS REMAINING</h1>
        </div>
        {
          openDrawRequest? 
          (
            <button className='bg-league-blue-400 p-2 rounded-l-xl' disabled={isDisabled} onClick={requestDraw}>SEND DRAW REQUEST</button>
          ) : (
            <button className='bg-league-grey-150 p-2 rounded-l-xl' disabled={isDisabled} onClick={() => setOpenDrawRequest(o => !o)}> REQUEST DTAW </button>
          )
        }
      </div>
    </div>
  )
}

export default GameInfo;
