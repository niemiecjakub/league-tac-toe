import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import Board from '../components/Board';
import GameInfo from '../components/GameInfo';
import { useDispatch } from 'react-redux'
import { CHAMPION_API_URL } from '../constants';
import { 
  setGameFields, 
  setHorizontalFields, 
  setVerticalFields, 
  setPossibleFields} from '../redux/slices/GameSlice';


function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      const {data: {data : {horizontal, vertical}, list}} = await axios(`${CHAMPION_API_URL}game-start`);

      list.map(async (gameOption, index) => {
        const [category, othercategory] = gameOption
        const {data: {champions}} = await axios(`${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
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
        <GameInfo />
        <Board />
      </div>
    );
  }
}

export default Game;
