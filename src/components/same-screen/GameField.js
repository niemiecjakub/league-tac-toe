import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import InputAutofill from '../InputAutofill'
import { OVERLAY_STYLE, CHAMPION_API_URL, CHAMPION_NAME_LIST, overlayStyle } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayer, setPlayerField, checkWin, setPlayerFieldOnline , skipTurnOnline} from '../../redux/slices/GameSlice';



function GameField({fieldId}) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const [currentChampion, setCurrentChampion] = useState('');
  const [championHistory, setChampionHistory] = useState([]);
  const [fieldMark, setFieldMark] = useState()


  const { currentPlayer, player1, player2, possibleFields } = useSelector(state => state.game)

  const getSelectedVal = async (value) => {
    const {data: {name, key}} = await axios(`${CHAMPION_API_URL}champion/name/${value}`);
    console.log(name, possibleFields[fieldId])
    if (possibleFields[fieldId].includes(name) && !championHistory.includes(key)) {
      setCurrentChampion(key)
      setChampionHistory(history => [...history, key])
      dispatch(setPlayerField(fieldId))
      currentPlayer.name === "Player 1" ? setFieldMark("X") : setFieldMark("O")
      dispatch(checkWin())
    }
    dispatch(setCurrentPlayer())
    setOpen(o => !o)
  };

  const isFieldDisabled = () => {
    const player = currentPlayer.name === "Player 1" ? player1 : player2
    if (player.fields.includes(fieldId)) {
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
      <div
        className='w-1/4 flex flex-col bg-cover items-center justify-center h-full border-spacing-1 border-solid border-2 border-league-grey-200 '
        onClick={openPopupField} 
        disabled={isFieldDisabled()} 
        tabIndex='0'
        role='button'
        style={{
          backgroundImage: currentChampion ? `url(${window.location.origin}/icons/${currentChampion}.PNG)` :`url(${window.location.origin}/icons/default.PNG)` , 
        }}
      >
        <h4 className='h-2/3 z-50 text-white text-6xl font-bold'>{fieldMark}</h4>
        <h4 className='h-1/3 z-50 text-white text-xl uppercase font-bold'>{currentChampion}</h4>
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

export default GameField;
