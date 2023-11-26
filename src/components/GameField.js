import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from './InputAutofill'
import '../styles/App.css'

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function GameField({cat : [category, othercategory], championNamesList}) {
  const [open, setOpen] = useState(false);
  const [currentChampion, setCurrentChampion] = useState('');
  const closeModal = () => setOpen(false);
  

  const getSelectedVal = async (value) => {
    const {data: {name}} = await axios(`${BASE_URL}champion/name/${value}`);
    const {data: {champions}} = await axios(`${BASE_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
    console.log(name, champions)
    if (champions.includes(name)) {
      console.log("HIT")
      setCurrentChampion(name)
    } else {
      console.log("MISS")
    }
    setOpen(o => !o)
  };

  return (
    <>
      <div className="square" 
        onClick={() => setOpen(o => !o)} 
        style={{backgroundImage: currentChampion ? `url(icons/${currentChampion}.png)` :`url(icons/default.png)` , backgroundSize: "cover" }}
      >
        <button onClick={() => setOpen(o => !o)}>
            <p>{category.category} : {category.name}</p>
            <p>{othercategory.category} : {othercategory.name}</p>
            <p>{currentChampion}</p>
        </button>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <InputAutofill
            label="Champion"
            pholder="..."
            data={championNamesList}
            onSelected={getSelectedVal}
          />
        </div>
      </Popup>
    </>
  )
}

export default GameField;
