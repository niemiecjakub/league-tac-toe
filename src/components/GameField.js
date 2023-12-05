import React, { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import StealIcon from "./StealIcon";
import PlusIcon from "./PlusIcon";
import InputAutofill from "./InputAutofill";
import { useSelector, useDispatch } from "react-redux";
import {
  CHAMPION_API_URL,
  CHAMPION_NAME_LIST,
  overlayStyle,
} from "../constants";
import {
  setCurrentPlayer,
  setPlayerField,
  checkWin,
  setPlayerFieldOnline,
  skipTurnOnline,
  checkWinOnline,
} from "../redux/slices/GameSlice";
import XMark from "./XMark";
import OMark from "./OMark";
import Cookies from "js-cookie";

function GameField({ fieldId }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { currentPlayer, possibleFields, fields, gameMode } = useSelector(
    (state) => state.game
  );

  const getSelectedVal = async (value) => {
    const {
      data: { name, key },
    } = await axios(`${CHAMPION_API_URL}champion/name/${value}`);
    console.log(name, possibleFields[fieldId]);

    switch (gameMode) {
      case "same screen":
        if (
          possibleFields[fieldId].includes(name) &&
          !fields[fieldId].history.includes(name)
        ) {
          dispatch(setPlayerField({ fieldId, name, key }));
          dispatch(checkWin());
        }
        dispatch(setCurrentPlayer());
        setOpen((o) => !o);
        break;
      case "online":
        if (
          possibleFields[fieldId].includes(name) &&
          !fields[fieldId].history.includes(name)
        ) {
          await dispatch(setPlayerFieldOnline({ fieldId, name, key }));
          await dispatch(checkWinOnline());
        }
        await dispatch(skipTurnOnline());
        setOpen((o) => !o);
        break;
    }
  };

  const isFieldDisabled = () => {
    switch (gameMode) {
      case "same screen":
        if (fields[fieldId].player === currentPlayer.key) return true;
        if (fields[fieldId].name && !currentPlayer.steals) return true;
        return false;
      case "online":
        if (currentPlayer.name !== Cookies.get("player")) return true;
        if (fields[fieldId].player === currentPlayer.key) return true;
        if (fields[fieldId].name && !currentPlayer.steals) return true;
        return false;
    }
  };

  const openPopupField = () => {
    if (!isFieldDisabled()) {
      setOpen((o) => !o);
    }
  };

  return (
    <>
      <div
        className="w-1/4 flex flex-col bg-cover items-center justify-center h-full border-spacing-1 border-solid border-2 border-league-grey-200 relative "
        onClick={openPopupField}
        tabIndex="0"
        role="button"
        style={{
          backgroundImage: fields[fieldId].name
            ? `url(${window.location.origin}/icons/${fields[fieldId].key}.PNG)`
            : `url(${window.location.origin}/icons/default.PNG)`,
        }}
      >
        {fields[fieldId].player === "" ? (
          <></>
        ) : (
          <>
            {fields[fieldId].player === "player1" ? (
              <XMark championName={fields[fieldId].name} />
            ) : (
              <OMark championName={fields[fieldId].name} />
            )}
          </>
        )}

        {gameMode === "online" &&
        Cookies.get("player") === currentPlayer.name &&
        fields[fieldId].player !== currentPlayer.key &&
        fields[fieldId].name !== "" &&
        currentPlayer.steals ? (
          <StealIcon
            className={
              "w-3 md:w-6 bg-white rounded-full absolute right-1 top-1 md:right-2 md:top-2"
            }
          />
        ) : (
          <></>
        )}
        {gameMode === "same screen" &&
        fields[fieldId].player !== currentPlayer.key &&
        fields[fieldId].name !== "" &&
        currentPlayer.steals ? (
          <StealIcon
            className={
              "w-3 md:w-6 bg-white rounded-full absolute right-1 top-1 md:right-2 md:top-2"
            }
          />
        ) : (
          <></>
        )}
        {gameMode === "online" &&
          Cookies.get("player") === currentPlayer.name &&
          !fields[fieldId].name && (
            <PlusIcon className={"absolute right-1 top-1 w-5 md:w-12"} />
          )}
        {gameMode === "same screen" && !fields[fieldId].name && (
          <PlusIcon className={"absolute right-1 top-1 w-5 md:w-12"} />
        )}
      </div>

      <Popup
        open={open}
        closeOnDocumentClick
        onClose={() => setOpen(false)}
        {...{ overlayStyle }}
      >
        <InputAutofill
          label="Champion"
          pholder="search champion"
          data={CHAMPION_NAME_LIST}
          onSelected={getSelectedVal}
        />
      </Popup>
    </>
  );
}

export default GameField;
