import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import GameField from '../components/GameField';
import CategoryField from '../components/CategoryField';

function Game() {
  const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [championNamesList, setChampionNamesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}game-start`);
      const {data: {champions}} = await axios(`${BASE_URL}champion/name-list`);
      setChampionNamesList(champions);
      setData(result.data);
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
          Game
        </h1>
        <div className='game-board'>
          <div className='game-row'>
            <div className="square"></div>
            <CategoryField name="CAT" cat={data.data.horizontal[0]}/>
            <CategoryField name="CAT"cat={data.data.horizontal[1]}/>
            <CategoryField name="CAT"cat={data.data.horizontal[2]}/>
          </div>
          <div className='game-row'>
            <CategoryField name="CAT" cat={data.data.vertical[0]}/>
            <GameField name="0" cat={data.list[0]} championNamesList={championNamesList}/>
            <GameField name="1" cat={data.list[1]} championNamesList={championNamesList}/>
            <GameField name="2" cat={data.list[2]} championNamesList={championNamesList}/>
          </div>
          <div className='game-row'>
            <CategoryField name="CAT" cat={data.data.vertical[1]}/>
            <GameField name="3" cat={data.list[3]} championNamesList={championNamesList}/>
            <GameField name="4" cat={data.list[4]} championNamesList={championNamesList}/>
            <GameField name="5" cat={data.list[5]} championNamesList={championNamesList}/>
          </div>
          <div className='game-row'>
            <CategoryField name="CAT" cat={data.data.vertical[2]}/>
            <GameField name="6" cat={data.list[6]} championNamesList={championNamesList}/>
            <GameField name="7" cat={data.list[7]} championNamesList={championNamesList}/>
            <GameField name="8" cat={data.list[8]} championNamesList={championNamesList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
