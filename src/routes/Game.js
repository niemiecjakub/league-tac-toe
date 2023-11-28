import React, { useEffect } from 'react';
import Board from '../components/Board';
import GameInfo from '../components/GameInfo';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { getNewGameData } from '../redux/slices/GameSlice';

function Game() {
  const dispatch = useDispatch()

  const { isLoadingGame, isGameOver } = useSelector(state => state.GameReducer)

  useEffect(() => {
    dispatch(getNewGameData())
  }, [dispatch, isGameOver]);
  
  return (
    <div id="game-container" className='font-league max-h-fit w-screen lg:m-auto lg:w-1/3'>
      {
        isLoadingGame ? (
          <Loading />
        )
        :
        (
          <>
            <GameInfo />
            <Board />
          </>
        )
      }
    </div>
  )
}

export default Game;
