import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'

function Game() {
  const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}game-start`);
      setData(result.data.list);
      console.log(result.data.list)
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
        <div>
          {data.map(gameoption => 
          <p>{gameoption[0].category}: {gameoption[0].name} // {gameoption[1].category}: {gameoption[1].name}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
