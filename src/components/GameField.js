import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function GameField({cat : [category, othercategory]}) {

  const [possibleChampionList, setPossibleChampionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
      setPossibleChampionList(result.data.champions);
    };
    fetchData();
  }, []);
  
  const handleClick = async () => {
    console.log(possibleChampionList);
    const champion = "pyke"
    const result = await axios(`${BASE_URL}champion/${champion}`);
    const championName = result.data.name
    if (possibleChampionList.includes(championName)) {
      console.log("HIT")
    } else {
      console.log("MISS")
    }
  }

  return (
    <div className="square">
      <button onClick={handleClick}>
          <p>{category.category} : {category.name}</p>
          <p>{othercategory.category} : {othercategory.name}</p>
      </button>
    </div>
  )
}

export default GameField;
