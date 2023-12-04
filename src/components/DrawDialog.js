import { useSelector } from "react-redux";

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
          className="bg-league-blue-400 p-2 rounded-l-xl"
          disabled={isDisabled}
          onClick={requestDraw}
        >
          SEND DRAW REQUEST
        </button>
      ) : (
        <button
          className="bg-league-grey-150 p-2 rounded-l-xl"
          disabled={isDisabled}
          onClick={handleOpenDrawRequest}
        >
          REQUEST DRAW{" "}
        </button>
      )}
    </>
  );

  return (
    <>
      {gameMode === "online" &&
      localStorage.getItem("player") === currentPlayer.name ? (
        drawButton
      ) : (
        <></>
      )}
      {gameMode === "same screen" && drawButton}
    </>
  );
}

export default DrawDialog;
