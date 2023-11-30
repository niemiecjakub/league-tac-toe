import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setCurrentPlayer,
  endAsDraw,
  getNewGameData } from '../../redux/slices/GameSlice';

import { skipTurnOnline} from '../../redux/slices/OnlineSlice'

function GameInfoOnline() {
  const [skipTurn, setSkipTurn] = useState(false)
  const [drawRequest, setDrawRequest] = useState(false)
  const dispatch = useDispatch()
  const {currentPlayer, player1, player2} = useSelector(state => state.online)

  const endDraw = () => {
    dispatch(endAsDraw())
    dispatch(getNewGameData())
  }

  useEffect(() => {
    setSkipTurn(false)
    setDrawRequest(false)
  },[currentPlayer])
  
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
            {currentPlayer.name == localStorage.getItem("player") ? "YOUR TURN" : "WAITING FOR OPPONENT MOVE"}
          </h1>
          {
            skipTurn? (
              <button className='bg-red-500 px-3 py-2' onClick={() => dispatch(skipTurnOnline())}>CONFIRM</button>
            ) : (
              <button className='bg-red-700 px-3 py-2' onClick={() => setSkipTurn(s => !s)}>SKIP TURN</button>
            )
          }
        </div>
      </div>
      <div className='flex flex-row justify-between items-center bg-slate-00 mt-4'>
        <div className='bg-league-grey-200 p-2 rounded-r-xl'>
          <h1>{currentPlayer.steals} STEALS REMAINING</h1>
        </div>
        {
          drawRequest? 
          (
            <button className='bg-league-blue-400 p-2 rounded-l-xl' onClick={endDraw}>SEND DRAW REQUEST</button>
          ) : (
            <button className='bg-league-grey-150 p-2 rounded-l-xl' onClick={() => setDrawRequest(s => !s)}> REQUEST DTAW </button>
          )
        }
      </div>
    </div>
  )
}

export default GameInfoOnline;
