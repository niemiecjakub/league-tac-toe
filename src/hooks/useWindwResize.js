import { useState, useEffect } from "react";

function getWindowDimensions() {
  const gameContainer = document.getElementById("game-container");
  if (gameContainer) {
    return {
      width: gameContainer.offsetWidth,
      height: gameContainer.offsetHeight,
    };
  }
  return {
    width: 300,
    height: 300,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
