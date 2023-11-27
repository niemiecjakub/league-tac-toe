import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import GameField from '../components/GameField';
import CategoryField from '../components/CategoryField';
import { useDispatch, useSelector } from 'react-redux'
import { setChampionNamesList, setGameFields, setHorizontalFields, setVerticalFields } from '../redux/slices/GameSlice';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  const {categoryFields: {horizontal, vertical}, gameFields, currentPlayer, gameMode, player1, player2} = useSelector(state => state.GameReducer)

  useEffect(() => {
    const fetchData = async () => {
      const {data: {data : {horizontal, vertical}, list}} = await axios(`${BASE_URL}game-start`);
      const {data: {champions}} = await axios(`${BASE_URL}champion/name-list`);

      dispatch(setHorizontalFields(horizontal))
      dispatch(setVerticalFields(vertical))
      dispatch(setGameFields(list))
      dispatch(setChampionNamesList(champions))

      setIsLoading(false)
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
        <div className="App">
            <h1>loading new game</h1>
        </div>
    )
  } else {
    return (
      <div className="App">
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
        <div className='game-board'>
          <div className='game-row'>
            <div className="square"></div>
            <CategoryField cat={horizontal[0]}/>
            <CategoryField cat={horizontal[1]}/>
            <CategoryField cat={horizontal[2]}/>
          </div>
          <div className='game-row'>
            <CategoryField cat={vertical[0]}/>
            <GameField id={0} cat={gameFields[0]} />
            <GameField id={1} cat={gameFields[1]} />
            <GameField id={2} cat={gameFields[2]} />
          </div>
          <div className='game-row'>
            <CategoryField cat={vertical[1]}/>
            <GameField id={3} cat={gameFields[3]} />
            <GameField id={4} cat={gameFields[4]} />
            <GameField id={5} cat={gameFields[5]} />
          </div>
          <div className='game-row'>
            <CategoryField cat={vertical[2]}/>
            <GameField id={6} cat={gameFields[6]} />
            <GameField id={7} cat={gameFields[7]} />
            <GameField id={8} cat={gameFields[8]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
