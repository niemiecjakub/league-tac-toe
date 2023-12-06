import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { playAgainOnline } from "../redux/slices/GameSlice";

function DrawDialog({
  openDrawRequest,
  isDisabled,
  requestDraw,
  handleOpenDrawRequest,
}) {
  const { gameMode, currentPlayer, player1, player2 } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch()

  let opponent;
  if (gameMode === "online") {
    const player = Cookies.get("player");
    opponent = player === "Player 1" ? player2 : player1;
  }

  const handleDrawRequestOnline = async () => {
    dispatch(playAgainOnline());
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
          {opponent.requestDraw ? (
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
