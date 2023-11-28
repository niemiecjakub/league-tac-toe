import { useDispatch, useSelector } from 'react-redux'
import { 
  setCurrentPlayer,
  endAsDraw,
  getNewGameData } from '../redux/slices/GameSlice';

function GameInfo() {
  const dispatch = useDispatch()
  const {currentPlayer, player1, player2} = useSelector(state => state.GameReducer)

  const endDraw = () => {
    dispatch(endAsDraw())
    dispatch(getNewGameData())
  }
  
  return (
    <div className='bg-orange-400 flex flex-col py-4'>
      <div className='flex flex-row justify-between items-center bg-slate-300'>
        <div className='bg-slate-200 p-2'>
          P1({player1.score})-({player2.score})P2
        </div>
        <div className='flex flex-row bg-gray-200 justify-between items-center'>
          <h1>
            {currentPlayer.name} TURN
          </h1>
          <button className='bg-red-600 p-2' onClick={() => dispatch(setCurrentPlayer())}> SKIP TURN</button>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center bg-slate-00'>
        <div className='bg-slate-200 p-2'>
          <h1>{currentPlayer.steals} STEALS REMAINING  </h1>
        </div>
        <button className='p-2' onClick={endDraw}> REQUEST DTAW </button>
      </div>
    </div>
  )
}

export default GameInfo;
