import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from '../InputAutofill'
import { CHAMPION_API_URL, CHAMPION_NAME_LIST } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayer, setPlayerField, checkWinOnline, setPlayerFieldOnline , skipTurnOnline} from '../../redux/slices/GameSlice';


const overlayStyle = { background: 'rgba(0,0,0,0.5)' };


function CategoryFieldOnline({fieldId}) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [player,setPlayer] = useState(localStorage.getItem("player"))

  const { currentPlayer, possibleFields, fields } = useSelector(state => state.game)

  const getSelectedVal = async (value) => {
    const {data: {name, key}} = await axios(`${CHAMPION_API_URL}champion/name/${value}`);
    console.log(name, possibleFields[fieldId])

    if (possibleFields[fieldId].includes(name) && !fields[fieldId].history.includes(name)) {
      dispatch(setPlayerFieldOnline({fieldId, name}))
      dispatch(checkWinOnline())
    }
    dispatch(skipTurnOnline())
    setOpen(o => !o)
  };

  const isFieldDisabled = () => {
    if (currentPlayer.name !== player) return true
    if (fields[fieldId].player === currentPlayer.key) return true
    return false
  }

  const openPopupField = () => {
    if (!isFieldDisabled()) {
      setOpen(o => !o)
    }
  }

  return (
    <>
      <div
        className='w-1/4 flex flex-col bg-cover items-center justify-center h-full border-spacing-1 border-solid border-2 border-league-grey-200 '
        onClick={openPopupField} 
        tabIndex='0'
        role='button'
        style={{
          backgroundImage: fields[fieldId].name ? `url(${window.location.origin}/icons/${fields[fieldId].name}.PNG)` :`url(${window.location.origin}/icons/default.PNG)` , 
        }}
      >
        {fields[fieldId].player === "" ? (
        <></>
        ) : (
        <h4 className='h-2/3 z-50 text-white text-6xl font-bold'>{fields[fieldId].player === "player1" ? "X" : "O"}</h4>
        )}
        <h4 className='h-1/3 z-50 text-white text-xl uppercase font-bold'>{fields[fieldId].name}</h4>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)} {...{overlayStyle }}>
          <InputAutofill
            label="Champion"
            pholder="..."
            data={CHAMPION_NAME_LIST}
            onSelected={getSelectedVal}
          />
      </Popup>
    </>
  )
}

export default CategoryFieldOnline;
