import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from './InputAutofill'
import '../styles/App.css'

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"
const data = ["java", "javascript", "php", "c#", "go", "dart"];


function GameField({cat : [category, othercategory]}) {
  const [open, setOpen] = useState(false);
  const [championInput, setChampionInput] = useState('');
  const [currentChampion, setCurrentChampion] = useState('');
  const closeModal = () => setOpen(false);
  
  const handleClick = async () => {
    const {data: {name}} = await axios(`${BASE_URL}champion/${championInput}`);
    const {data: {champions}} = await axios(`${BASE_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
    console.log(name, champions)
    if (champions.includes(name)) {
      console.log("HIT")
      setCurrentChampion(name)
    } else {
      console.log("MISS")
    }
  }

  const getSelectedVal = value => {
    console.log(value);
    setOpen(o => !o)
  };

  const getChanges = value => {
    setChampionInput(value);
  };

  return (
    <>
      <div className="square" onClick={() => setOpen(o => !o)}>
        <button onClick={() => setOpen(o => !o)}>
            <p>{category.category} : {category.name}</p>
            <p>{othercategory.category} : {othercategory.name}</p>
            <p>{currentChampion}</p>
        </button>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          {/* <label>
            Champion:
            <input type="text" value={championInput}  onChange={e => setChampionInput(e.target.value)} />
          </label>
          <button onClick={handleClick}>submit</button> */}
          <InputAutofill
            label="Champion"
            pholder="..."
            data={data}
            onSelected={getSelectedVal}
            onChange={getChanges}
          />
        </div>
      </Popup>
    </>
  )
}

export default GameField;
