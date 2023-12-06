import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function DrawDialog({
  openDrawRequest,
  isDisabled,
  requestDraw,
  handleOpenDrawRequest,
}) {
  const { gameMode, currentPlayer } = useSelector((state) => state.game);
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
          {gameMode==="online" ? "SEND DRAW REQUEST" : "END AS DRAW" }
        </button>
      )}
    </>
  );

  return (
    <>
      {gameMode === "online" &&
      Cookies.get("player") === currentPlayer.name ? (
        drawButton
      ) : (
        <></>
      )}
      {gameMode === "same screen" && drawButton}
    </>
  );
}

export default DrawDialog;
