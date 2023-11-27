import React, { useEffect } from 'react';
import '../styles/App.css'
import Board from '../components/Board';
import GameInfo from '../components/GameInfo';
import { useDispatch, useSelector } from 'react-redux'
import { getNewGameData } from '../redux/slices/GameSlice';

function Game() {
  const dispatch = useDispatch()

  const { isLoadingGame, isGameOver } = useSelector(state => state.GameReducer)

  useEffect(() => {
    dispatch(getNewGameData())
  }, [dispatch, isGameOver]);

  const startNewGame = () => {
    dispatch(getNewGameData())
  }

  return (
    <div className="App">
      {
        isLoadingGame ? (
          <h1>loading new game</h1>
        )
        :
        (
          <>
            <button onClick={startNewGame}> start new game </button>
            <GameInfo />
            <Board />
          </>
        )
      }
    </div>
  )
}

export default Game;
