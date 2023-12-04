import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPlayer,
  endAsDraw,
  getNewGameData,
  skipTurnOnline,
} from "../redux/slices/GameSlice";
import ScoreBoard from "./ScoreBoard";
import TurnIndicator from "./TurnIndicator";
import DrawDialog from "./DrawDialog";
import TimeInfo from "./TimeInfo";

function GameInfo() {
  const dispatch = useDispatch();
  const [openSkipTurn, setOpenSkipTurn] = useState(false);
  const [openDrawRequest, setOpenDrawRequest] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [player, setPlayer] = useState(localStorage.getItem("player"));
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
        setIsDisabled(currentPlayer.name !== player);
        currentPlayer.name === player
          ? setTurnIndicator("YOUR TURN")
          : setTurnIndicator("OPPONENT's TURN");
        break;
    }
  }, [currentPlayer, gameMode, player]);

  const requestDraw = () => {
    switch (gameMode) {
      case "same screen":
        dispatch(endAsDraw());
        dispatch(getNewGameData());
        break;
      case "online":
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
      <div className="flex flex-row justify-between items-center bg-slate-00 mt-4">
        <TimeInfo />
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
