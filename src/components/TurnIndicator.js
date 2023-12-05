import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function TurnIndicator({
  isDisabled,
  skipTurn,
  turnIndicator,
  handleOpenSkipTurn,
  openSkipTurn,
}) {
  const { gameMode, currentPlayer } = useSelector((state) => state.game);

  const skipButton = (
    <>
      {openSkipTurn ? (
        <button
          className="bg-red-500 px-3 py-2 pr-4"
          disabled={isDisabled}
          onClick={skipTurn}
        >
          CONFIRM
        </button>
      ) : (
        <button
          className="bg-red-700 px-3 py-2 pr-4"
          disabled={isDisabled}
          onClick={handleOpenSkipTurn}
        >
          SKIP TURN
        </button>
      )}
    </>
  );

  return (
    <div className="flex flex-row justify-between items-center bg-league-gold-300 rounded-l-xl">
      <h1 className="px-2 py-2">{turnIndicator}</h1>
      {gameMode === "online" &&
      Cookies.get("player") === currentPlayer.name ? (
        skipButton
      ) : (
        <></>
      )}
      {gameMode === "same screen" && skipButton}
    </div>
  );
}

export default TurnIndicator;
