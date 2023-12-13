import { useSelector, useDispatch } from "react-redux";
import { useCountdown } from "../hooks/useCountdown";
import { useState, useEffect } from "react";
import { setCurrentPlayer, skipTurnOnline } from "../redux/slices/GameSlice";

function TimeInfo() {
  const dispatch = useDispatch();
  const { turnTime, currentPlayer, isGameOver, gameMode } = useSelector(
    (state) => state.game
  );
  const [minutes, seconds, timeLeft] = useCountdown(5);

  const [turnDuration, setTurnDuration] = useState(5); // in seconds

  useEffect(() => {
    if (!isGameOver) {
      const turnTimer = setTimeout(async () => {
        dispatch(setCurrentPlayer());
      }, turnDuration * 1000);
      return () => clearTimeout(turnTimer);
    }
  }, [currentPlayer, isGameOver, turnDuration, dispatch, gameMode]);

  return (
    <div className="bg-league-grey-200 p-2 rounded-r-xl">
      {turnDuration === "unlimited" ? (
        <h1>NO TIME LIMIT</h1>
      ) : (
        <h1>
          REMAINING TIME {minutes} : {seconds}
        </h1>
      )}
    </div>
  );
}

export default TimeInfo;
