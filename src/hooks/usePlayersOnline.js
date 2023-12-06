import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function usePlayersOnline() {
  const [player, setPlayer] = useState();
  const [opponent, setOpponent] = useState();
  const { player1, player2, isGameOver } = useSelector((state) => state.game);

  useEffect(() => {
    const storedPlayer = Cookies.get("player");
    const player = storedPlayer === "Player 1" ? player1 : player2;
    const opponent = storedPlayer === "Player 1" ? player2 : player1;
    setPlayer(player);
    setOpponent(opponent);

  }, [isGameOver]);

  return [player, opponent]
}

export default usePlayersOnline;
