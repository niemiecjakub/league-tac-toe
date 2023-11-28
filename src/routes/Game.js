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
    <>
      {
        isLoadingGame ? (
          <Loading />
        )
        :
        (
          <div className='font-league h-full'>
            <GameInfo />
            <Board />
          </div>
        )
      }
    </>
  )
}

export default Game;
