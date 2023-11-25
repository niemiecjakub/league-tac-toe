import logo from './logo.svg';
import './styles/App.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Champion from './components/Champion';

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}champion/all`);
      setData(result.data);
    };

    fetchData();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          League-tac-toe!!xd
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        {data.map(champion => <Champion champion={champion} key={champion.key}/>)}
      </header>
    </div>
  );
}

export default App;
