import { useDispatch, useSelector } from 'react-redux'
import { 
  setCurrentPlayer,
  endAsDraw,
  getNewGameData } from '../redux/slices/GameSlice';

function GameInfo() {
  const dispatch = useDispatch()
  const {currentPlayer, gameMode, player1, player2} = useSelector(state => state.GameReducer)

  const endDraw = () => {
    dispatch(endAsDraw())
    dispatch(getNewGameData())
  }
  
  return (
    <>
      <h1>
        Game mode: {gameMode}
      </h1>
      <h1>Player 1 ({player1.score}) - ({player2.score}) Player 2</h1>
      <div>
        <h1>Player 1 ({player1.fields})</h1>
        <h1>Player 2 ({player2.fields})</h1>
      </div>
      <div>
        <h1>Player 1 remaining steams ({player1.steals})</h1>
        <h1>Player 2 remaining steams ({player2.steals})</h1>
      </div>
      <h1>
        Current Player: {currentPlayer.name}
      </h1>
      <button onClick={endDraw}> End as draw </button>
      <button onClick={() => dispatch(setCurrentPlayer())}> Skip turn </button>
    </>
  )
}

export default GameInfo;
