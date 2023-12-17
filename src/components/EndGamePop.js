import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewGameData,
  clearState,
  startOnlineGame,
  requestPlayAgainOnline,
  setFieldOnline,
} from "../redux/slices/GameSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function EndGamePop({ setOpenEndGame }) {
  const [playAgain, setPlayAgain] = useState(false);
  const [revealChampions, setRevealChampions] = useState(false);
  const [numberPlayersAgreed, setNumberPlayersAgreed] = useState(0);
  const {
    winner,
    gameMode,
    roomId,
    player1,
    player2,
    gameFields,
    possibleFields,
  } = useSelector((state) => state.game);
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

  const handleLeaveGame = async () => {
    setOpenEndGame(false);
    if (gameMode === "online") {
      await dispatch(
        setFieldOnline({
          opponentLeft: true,
        })
      );
    }
    dispatch(clearState());
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
    <>
      <div
        className={`uppercase relative  flex flex-col text-white bg-league-blue-500 w-96 md:w-[460px] h-44 p-3  ${
          revealChampions ? "rounded-t-xl" : "rounded-xl"
        }  font-league justify-center items-center`}
      >
        <div>
          <h1 className="text-3xl uppercase font-bold italic">
            {winner} wins!
          </h1>
        </div>
        <div className="w-full flex my-1 uppercase">
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
              }  rounded-xl w-full p-3 mx-1 uppercase`}
              disabled={playAgain ? true : false}
              onClick={requestPlayAgain}
            >
              {!playAgain && "Play Again :"} {numberPlayersAgreed} / 2
            </button>
          )}
          <button
            className="bg-red-500 rounded-xl w-full p-3 mx-1 uppercase"
            onClick={handleLeaveGame}
          >
            Leave Game
          </button>
        </div>
        <div className="w-full flex my-1">
          <button
            className={`${
              revealChampions ? "bg-red-400" : "bg-blue-400"
            }  rounded-xl w-full px-3 py-4 mx-1 uppercase`}
            onClick={() => setRevealChampions((s) => !s)}
          >
            {revealChampions ? "Hide champions" : "Reveal champions"}
          </button>
        </div>
      </div>
      {revealChampions && (
        <div className="px-3 flex flex-col w-full overflow-y-scroll no-scrollbar absolute h-72 text-white bg-league-blue-500 rounded-b-xl ">
          {Object.entries(gameFields).map(([fieldId, categories], i) => (
            <div className="divide-league-blue-200 divide-y-2 my-1">
              <div className="grid grid-cols-2 ">
                {categories.map(({ name, category }) => (
                  <span className="h-6 flex uppercase font-bold">
                    <img
                      className="h-full"
                      src={`${
                        window.process.env.PUBLIC_URL
                      }/${category}/${name.replace(/\s/g, "")}.PNG`}
                    />
                    {category} {name}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 w-full my-3">
                {possibleFields[fieldId].map((champion) => (
                  <span className="uppercase py-1">{champion}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EndGamePop;
