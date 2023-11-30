import React, { useEffect } from 'react';
import Board from '../../components/same-screen/Board';
import GameInfo from '../../components/same-screen/GameInfo';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { getNewGameData } from '../../redux/slices/GameSlice';

function Game() {
  const dispatch = useDispatch()

  const { isLoadingGame, isGameOver } = useSelector(state => state.sameScreen)

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
