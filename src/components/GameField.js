import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from './InputAutofill'
import '../styles/App.css'
import { CHAMPION_API_URL, CHAMPION_NAME_LIST } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayer, setPlayerField, checkWin } from '../redux/slices/GameSlice';

function GameField({id, cat : [category, othercategory]}) {

  const [open, setOpen] = useState(false);
  const [currentChampion, setCurrentChampion] = useState('');
  const [championHistory, setChampionHistory] = useState([]);
  const [belongsTo, setBelongsTo] = useState()

  const closeModal = () => setOpen(false);
  const dispatch = useDispatch()

  const { currentPlayer, player1, player2, possibleFields } = useSelector(state => state.GameReducer)

  const getSelectedVal = async (value) => {
    const {data: {name}} = await axios(`${CHAMPION_API_URL}champion/name/${value}`);
    console.log(name, possibleFields[id])
    if (possibleFields[id].includes(name) && !championHistory.includes(name)) {
      setBelongsTo(currentPlayer.name)
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

  const openPopupField = () => {
    if (!isFieldDisabled()) {
      setOpen(o => !o)
    }
  }

  return (
    <>
      <div className="square" 
        onClick={openPopupField} 
        disabled={isFieldDisabled()} 
        tabIndex='0'
        role='button'
        style={{
          backgroundImage: currentChampion ? `url(icons/${currentChampion}.png)` :`url(icons/default.png)` , 
          backgroundSize: 'cover' ,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
            <h4 style={{color:'white'}}>{belongsTo}</h4>
            <h4 style={{color:'white'}}>{currentChampion}</h4>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <InputAutofill
            label="Champion"
            pholder="..."
            data={CHAMPION_NAME_LIST}
            onSelected={getSelectedVal}
          />
        </div>
      </Popup>
    </>
  )
}

export default GameField;
