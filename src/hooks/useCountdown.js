import { useEffect, useState } from "react";

const useCountdown = (turnTime) => {
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return getReturnValues(countDown);
};

const formatTime = (t) => {
  t = t.toString();
  t = t.length === 1 ? "0" + t : t;
  return t;
};
const getReturnValues = (countDown) => {
  const minutes = Math.floor(countDown / 60);
  const seconds = Math.floor(countDown - 60 * minutes);
  const timeLeft = minutes * 60 + seconds;

  return [formatTime(minutes), formatTime(seconds), timeLeft];
};

export { useCountdown };
