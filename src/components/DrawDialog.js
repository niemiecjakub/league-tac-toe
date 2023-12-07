import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import { playAgainOnline, startOnlineGame } from "../redux/slices/GameSlice";
import {
  endAsDraw,
  getNewGameData,
  requestDrawOnline,
  skipTurnOnline,
} from "../redux/slices/GameSlice";
import { useEffect } from "react";

function DrawDialog({ openDrawRequest, isDisabled, handleOpenDrawRequest }) {
  const [isDrawRequested, setIsDrawRequested] = useState(false)
  const { gameMode, currentPlayer, player1, player2 } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameMode === "online") {
      const player = Cookies.get("player");
      const {requestDraw} = player === "Player 1" ? player2 : player1;
      setIsDrawRequested(requestDraw)
    }
  }, [currentPlayer]);

  //handling draw request
  const requestDraw = async () => {
    switch (gameMode) {
      case "same screen":
        dispatch(endAsDraw());
        dispatch(getNewGameData());
        break;
      case "online":
        await dispatch(requestDrawOnline());
        await dispatch(skipTurnOnline());
        break;
    }
  };

  const handleDrawRequestOnline = async () => {
    await dispatch(playAgainOnline());
    await dispatch(startOnlineGame());
  };

  const drawButton = (
    <>
      {openDrawRequest ? (
        <button
          className="bg-league-blue-400 p-2 rounded-l-xl pr-4"
          disabled={isDisabled}
          onClick={requestDraw}
        >
          ARE YOU SURE?
        </button>
      ) : (
        <button
          className="bg-league-grey-150 p-2 rounded-l-xl pr-4"
          disabled={isDisabled}
          onClick={handleOpenDrawRequest}
        >
          {gameMode === "online" ? "SEND DRAW REQUEST" : "END AS DRAW"}
        </button>
      )}
    </>
  );

  return (
    <>
      {gameMode === "online" && Cookies.get("player") === currentPlayer.name ? (
        <>
          {isDrawRequested ? (
            <div className="flex justify-end items-center bg-slate-50 w-full">
              <h1 className="text-black uppercase text-sm">
                Your opponent requested to draw
              </h1>
              <button
                onClick={handleDrawRequestOnline}
                className="uppercase bg-red-600 text-white p-2 ml-2 rounded-l-xl pr-4"
              >
                Accept draw
              </button>
            </div>
          ) : (
            drawButton
          )}
        </>
      ) : (
        <></>
      )}
      {gameMode === "same screen" && drawButton}
    </>
  );
}

export default DrawDialog;
