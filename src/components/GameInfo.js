import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPlayer,
  endAsDraw,
  getNewGameData,
  skipTurnOnline,
  requestDrawOnline,
} from "../redux/slices/GameSlice";
import ScoreBoard from "./ScoreBoard";
import TurnIndicator from "./TurnIndicator";
import DrawDialog from "./DrawDialog";
import TimeInfo from "./TimeInfo";
import Cookies from "js-cookie";

function GameInfo() {
  const dispatch = useDispatch();
  const [openSkipTurn, setOpenSkipTurn] = useState(false);
  const [openDrawRequest, setOpenDrawRequest] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [turnIndicator, setTurnIndicator] = useState("");
  const { currentPlayer, gameMode } = useSelector((state) => state.game);

  useEffect(() => { 
    setOpenSkipTurn(false);
    setOpenDrawRequest(false);
    switch (gameMode) {
      case "same screen":
        setIsDisabled(false);
        setTurnIndicator(`${currentPlayer.alias}'s TURN`);
        break;
      case "online":
        setIsDisabled(currentPlayer.name !== Cookies.get("player"));
        currentPlayer.name === Cookies.get("player")
          ? setTurnIndicator("YOUR TURN")
          : setTurnIndicator("OPPONENT's TURN");
        break;
    }
  }, [currentPlayer, gameMode, Cookies.get("player")]);

  const requestDraw = () => {
    switch (gameMode) {
      case "same screen":
        dispatch(endAsDraw());
        dispatch(getNewGameData());
        break;
      case "online":
        dispatch(requestDrawOnline());
        dispatch(skipTurnOnline());
        break;
    }
  };

  const skipTurn = () => {
    switch (gameMode) {
      case "same screen":
        dispatch(setCurrentPlayer());
        break;
      case "online":
        dispatch(skipTurnOnline());
        break;
    }
  };

  const handleOpenSkipTurn = () => {
    setOpenSkipTurn((o) => !o);
  };
  const handleOpenDrawRequest = () => {
    setOpenDrawRequest((o) => !o);
  };
  return (
    <div className="bg-league-blue-600 flex flex-col py-4 text-white font-leagueheavy text-md">
      {gameMode === "online" && <h1>You are {Cookies.get("player")}</h1>}
      <div className="flex flex-row justify-between items-center">
        <ScoreBoard />
        <TurnIndicator
          isDisabled={isDisabled}
          skipTurn={skipTurn}
          turnIndicator={turnIndicator}
          openSkipTurn={openSkipTurn}
          handleOpenSkipTurn={handleOpenSkipTurn}
        />
      </div>
      <div className="flex flex-row justify-end items-center mt-4">
        {/* <TimeInfo /> */}
        <DrawDialog
          requestDraw={requestDraw}
          isDisabled={isDisabled}
          openDrawRequest={openDrawRequest}
          handleOpenDrawRequest={handleOpenDrawRequest}
        />
      </div>
    </div>
  );
}

export default GameInfo;
