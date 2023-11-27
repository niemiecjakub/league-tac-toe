import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import Board from '../components/Board';
import { useDispatch, useSelector } from 'react-redux'
import { 
  setGameFields, 
  setHorizontalFields, 
  setVerticalFields, 
  setPossibleFields,
  setCurrentPlayer,
  endAsDraw } from '../redux/slices/GameSlice';

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const {currentPlayer, gameMode, player1, player2} = useSelector(state => state.GameReducer)
  
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
        <Board />
      </div>
    );
  }
}

export default Game;
