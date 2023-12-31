import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import StealIcon from "./svgIcons/StealIcon";
import PlusIcon from "./svgIcons/PlusIcon";
import InputAutofill from "./InputAutofill";
import { useSelector, useDispatch } from "react-redux";
import { CHAMPION_API_URL, overlayStyle  } from "../utility/constants";
import { CHAMPION_NAME_LIST } from "../utility/jsonData";
import {
  setCurrentPlayer,
  setPlayerField,
  checkWin,
  setPlayerFieldOnline,
  skipTurnOnline,
  checkWinOnline,
} from "../redux/slices/GameSlice";
import Cookies from "js-cookie";
import FieldMark from "./FieldMark";

function GameField({ fieldId }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { currentPlayer, possibleFields, fields, gameMode, stealsEnabled } =
    useSelector((state) => state.game);

  const getSelectedVal = async (value) => {
    const {
      data: { name, key },
    } = await axios(`${CHAMPION_API_URL}champion/name/${value}`);
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
        setOpen(false);
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
        setOpen(false);
        break;
    }
  };

  const isFieldDisabled = () => {
    if (fields[fieldId].player === currentPlayer.key) return true;
    if (fields[fieldId].name && (!currentPlayer.steals || !stealsEnabled))
      return true;
    switch (gameMode) {
      case "same screen":
        return false;
      case "online":
        if (currentPlayer.name !== Cookies.get("player")) return true;
        if (fields[fieldId].player === currentPlayer.key) return true;
        if (fields[fieldId].name && (!currentPlayer.steals || !stealsEnabled))
          return true;
        return false;
    }
  };

  const openPopupField = () => {
    if (!isFieldDisabled()) {
      setOpen((o) => !o);
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [currentPlayer]);

  return (
    <>
      <div
        className="w-1/4 flex flex-col bg-cover items-center justify-center h-full border-spacing-1 border-solid border-2 border-league-grey-200 relative "
        onClick={openPopupField}
        tabIndex="0"
        role="button"
        style={{
          backgroundImage: fields[fieldId].name
            ? `url(${process.env.PUBLIC_URL}/icons/${fields[fieldId].key}.PNG)`
            : `url(${process.env.PUBLIC_URL}/icons/default.PNG)`,
        }}
      >
        {fields[fieldId].player === "" ? null : (
          <FieldMark
            championName={fields[fieldId].name}
            mark={fields[fieldId].player === "player1" ? "X" : "O"}
          />
        )}

        {gameMode === "online" &&
          stealsEnabled &&
          Cookies.get("player") === currentPlayer.name &&
          fields[fieldId].player !== currentPlayer.key &&
          fields[fieldId].name !== "" &&
          currentPlayer.steals && (
            <StealIcon
              className={
                "w-3 md:w-4 bg-white rounded-full absolute right-1 top-1 md:right-2 md:top-2"
              }
            />
          )}
        {gameMode === "same screen" &&
          stealsEnabled &&
          fields[fieldId].player !== currentPlayer.key &&
          fields[fieldId].name !== "" &&
          currentPlayer.steals && (
            <StealIcon
              className={
                "w-3 md:w-4 bg-white rounded-full absolute right-1 top-1 md:right-2 md:top-2"
              }
            />
          )}
        {gameMode === "online" &&
          Cookies.get("player") === currentPlayer.name &&
          !fields[fieldId].name && (
            <PlusIcon className={"absolute right-0 top-0 w-5 md:w-8 "} />
          )}

        {gameMode === "same screen" && !fields[fieldId].name && (
          <PlusIcon className={"absolute right-0 top-0 w-5 md:w-8"} />
        )}
      </div>

      <Popup
        open={open}
        closeOnDocumentClick
        onClose={() => setOpen(false)}
        {...{ overlayStyle  }}
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
