import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import Champion from '../components/Champion'

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function ChampionList() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}champion/all`);
      setData(result.data);
      setIsLoading(false)
    };

    fetchData();
  }, []);
  
  if (isLoading) {
    return (
        <div className="App">
            <h1>loading champion list</h1>
        </div>
    )
  } else {
    return (
        <div className="App">
            {data.map(champion => <Champion champion={champion} key={champion.key}/>)}
        </div>
    );
  }
}

export default ChampionList;
