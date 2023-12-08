import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewGameData,
  clearState,
  startOnlineGame,
  requestPlayAgainOnline,
  setFieldOnline,
  leaveRoomOnline,
} from "../redux/slices/GameSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function EndGamePop({ setOpenEndGame }) {
  const [playAgain, setPlayAgain] = useState(false);
  const [numberPlayersAgreed, setNumberPlayersAgreed] = useState(0);
  const { winner, gameMode, roomId, player1, player2 } = useSelector(
    (state) => state.game
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const playAgainOnline = async () => {
      await dispatch(
        setFieldOnline({
          player1: {
            requestNewGame: false,
          },
          player2: {
            requestNewGame: false,
          },
          isLoadingGame: true,
        })
      );
      await dispatch(startOnlineGame(roomId));
    };

    const nPlayersAgreed = [
      player1.requestNewGame,
      player2.requestNewGame,
    ].filter((value) => value === true).length;
    setNumberPlayersAgreed(nPlayersAgreed);
    if (gameMode === "online" && nPlayersAgreed == 2) {
      if (Cookies.get("player") === "Player 1") {
        playAgainOnline();
      }
      setOpenEndGame(false);
    }
  }, [winner, player1, player2]);

  const handleLeaveGame = () => {
    setOpenEndGame(false);
    if (gameMode === "online") {
      dispatch(leaveRoomOnline());
    } else {
      dispatch(clearState());
    }
    navigate("/");
  };

  const requestPlayAgain = async () => {
    setPlayAgain(true);
    await dispatch(requestPlayAgainOnline());
  };

  const handlePlayAgain = async () => {
    switch (gameMode) {
      case "online":
        setOpenEndGame(false);
        break;
      case "same screen":
        dispatch(getNewGameData());
        setOpenEndGame(false);
        break;
    }
  };

  return (
    <div className="text-xl flex flex-col text-white bg-league-blue-500 w-96 h-44 p-3 rounded-xl font-league justify-center items-center">
      <div>
        <h1 className="text-3xl">{winner} wins!</h1>
      </div>
      <div className="w-full flex my-1">
        {gameMode === "same screen" ? (
          <button
            className="bg-yellow-400 rounded-xl w-full p-3 mx-1"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        ) : (
          <button
            className={` ${
              playAgain ? "bg-green-600" : "bg-yellow-400"
            }  rounded-xl w-full p-3 mx-1`}
            disabled={playAgain ? true : false}
            onClick={requestPlayAgain}
          >
            {!playAgain && "Play Again :"} {numberPlayersAgreed} / 2
          </button>
        )}
        <button
          className="bg-red-500 rounded-xl w-full p-3 mx-1"
          onClick={handleLeaveGame}
        >
          Leave Game
        </button>
      </div>
      <div className="w-full flex my-1">
        <button className="bg-blue-400 rounded-xl w-full p-3 mx-1">
          Reveal champions
        </button>
      </div>
    </div>
  );
}

export default EndGamePop;
