import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import GameField from '../components/GameField';
import CategoryField from '../components/CategoryField';
import { useDispatch, useSelector } from 'react-redux'
import { 
  setGameFields, 
  setHorizontalFields, 
  setVerticalFields, 
  endAsDraw,
  setCurrentPlayer,
  setPossibleFields } from '../redux/slices/GameSlice';

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  const {categoryFields: {horizontal, vertical}, gameFields, currentPlayer, gameMode, player1, player2} = useSelector(state => state.GameReducer)

  useEffect(() => {
    const fetchData = async () => {
      const {data: {data : {horizontal, vertical}, list}} = await axios(`${BASE_URL}game-start`);

      list.map(async (gameOption, index) => {
        const [category, othercategory] = gameOption
        const {data: {champions}} = await axios(`${BASE_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
        dispatch(setPossibleFields({
          champions,
          fieldId: index
        }))
      });

      dispatch(setHorizontalFields(horizontal))
      dispatch(setVerticalFields(vertical))
      dispatch(setGameFields(list))

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
        <button onClick={() => dispatch(endAsDraw())}> End as draw </button>
        <button onClick={() => dispatch(setCurrentPlayer())}> Skip turn </button>
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
