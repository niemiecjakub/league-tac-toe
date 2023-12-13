import { useSelector, useDispatch } from "react-redux";
import { useCountdown } from "../hooks/useCountdown";
import { useState, useEffect } from "react";
import { setCurrentPlayer, skipTurnOnline } from "../redux/slices/GameSlice";

const formatTime = (t) => {
  t = t.toString();
  t = t.length === 1 ? "0" + t : t;
  return t;
};

function TimeInfo() {
  const dispatch = useDispatch();
  const { turnTime, currentPlayer, isGameOver, gameMode } = useSelector(
    (state) => state.game
  );
  const [count, setCount] = useState(0);

  const getSeconds = () => {
    const t = turnTime - count;
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t - 60 * minutes);
    return formatTime(seconds);
  };

  const getMinutes = () => {
    const t = turnTime - count;
    const minutes = Math.floor(t / 60);
    return formatTime(minutes);
  };

  useEffect(() => {
    let interval;
    let timeout;
    setCount(0);

    if (!isGameOver) {
      interval = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);

      timeout = setTimeout(() => {
        dispatch(setCurrentPlayer());
      }, turnTime * 1000);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [currentPlayer, isGameOver, gameMode]);

  return (
    <div className="bg-league-grey-200 p-2 rounded-r-xl">
      {turnTime === "unlimited" ? (
        <h1>NO TIME LIMIT</h1>
      ) : (
        <div className="px-2">
          {getMinutes()} : {getSeconds()}
        </div>
      )}
    </div>
  );
}

export default TimeInfo;
