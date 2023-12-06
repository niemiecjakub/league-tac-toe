import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewGameData,
  clearState,
  playAgainOnline,
} from "../redux/slices/GameSlice";
import { useEffect } from "react";

function EndGamePop({ setOpenEndGame }) {
  const { winner, gameMode } = useSelector((state) => state.game);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [winner]);

  const handleLeaveGame = () => {
    switch (gameMode) {
      case "online":
        navigate("/");
        setOpenEndGame(false);
        break;
      case "same screen":
        dispatch(clearState());
        setOpenEndGame(false);
        navigate("/");
        break;
    }
  };

  const handlePlayAgain = async () => {
    switch (gameMode) {
      case "online":
        await dispatch(playAgainOnline());
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
        <button
          className="bg-yellow-400 rounded-xl w-full p-3 mx-1"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
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
