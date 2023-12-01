
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getNewGameData, clearState } from "../redux/slices/GameSlice"

function EndGamePop ({setOpenEndGame}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLeaveGame = () => {
        dispatch(clearState())
        setOpenEndGame(false)
        navigate("/")
    }

    const handlePlayAgain = () => {
        dispatch(getNewGameData())
        setOpenEndGame(false)
    }

    return (
        <div className='text-xl flex flex-col text-white bg-league-blue-500 w-96 h-44 p-3 rounded-xl font-league justify-center items-center'>
        <div>
          <h1 className='text-3xl'>Player 1 wins!</h1>
        </div>
        <div className='w-full flex my-1'>
          <button className='bg-yellow-400 rounded-xl w-full p-3 mx-1' onClick={handlePlayAgain}>Play Again</button>
          <button className='bg-red-500 rounded-xl w-full p-3 mx-1' onClick={handleLeaveGame}>Leave Game</button>
        </div>
        <div className='w-full flex my-1'>
          <button className='bg-blue-400 rounded-xl w-full p-3 mx-1'>Reveal champions</button>
        </div>
      </div>
    )
}

export default EndGamePop