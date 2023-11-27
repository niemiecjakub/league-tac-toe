import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from './InputAutofill'
import '../styles/App.css'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayer, setPlayerField, checkWin } from '../redux/slices/GameSlice';

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function GameField({id, cat : [category, othercategory]}) {
  const [open, setOpen] = useState(false);
  const [currentChampion, setCurrentChampion] = useState('');
  const [championHistory, setChampionHistory] = useState(['']);
  const closeModal = () => setOpen(false);
  const dispatch = useDispatch()

  const {championNamesList, currentPlayer, player1, player2, possibleFields} = useSelector(state => state.GameReducer)

  const getSelectedVal = async (value) => {
    const {data: {name}} = await axios(`${BASE_URL}champion/name/${value}`);
    console.log(name, possibleFields[id])
    if (possibleFields[id].includes(name) && !championHistory.includes(name)) {
      setCurrentChampion(name)
      setChampionHistory(history => [...history, name])
      dispatch(setPlayerField({
        fieldId: id,
      }))
      dispatch(checkWin())
    }

    dispatch(setCurrentPlayer())
    setOpen(o => !o)
  };

  const isFieldDisabled = () => {
    const player = currentPlayer.name === "Player 1" ? player1 : player2
    if (player.fields.includes(id)) {
      return true
    }
    return false
  }

  return (
    <>
      <div className="square" 
        onClick={() => setOpen(o => !o)} 
        style={{backgroundImage: currentChampion ? `url(icons/${currentChampion}.png)` :`url(icons/default.png)` , backgroundSize: "cover" }}
      >
        <button onClick={() => setOpen(o => !o)} disabled={isFieldDisabled()}>
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
