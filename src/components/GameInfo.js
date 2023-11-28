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
    <div className='bg-league-blue-600 flex flex-col py-4 text-white font-leagueheavy text-md'>
      <div className='flex flex-row justify-between items-center'>
        <div className='bg-league-gold-400 py-2 px-3 rounded-r-xl'>
          P1({player1.score})-({player2.score})P2
        </div>
        <div className='flex flex-row justify-between items-center bg-league-gold-300 rounded-l-xl'>
          <h1 className='px-2'>
            {currentPlayer.name} TURN
          </h1>
          <button className='bg-red-600 px-3 py-2' onClick={() => dispatch(setCurrentPlayer())}> SKIP TURN</button>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center bg-slate-00 mt-4'>
        <div className='bg-league-grey-200 p-2 rounded-r-xl'>
          <h1>{currentPlayer.steals} STEALS REMAINING</h1>
        </div>
        <button className='bg-league-grey-150 p-2 rounded-l-xl' onClick={endDraw}> REQUEST DTAW </button>
      </div>
    </div>
  )
}

export default GameInfo;
