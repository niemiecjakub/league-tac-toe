import { useSelector } from "react-redux";
import StealIcon from "./StealIcon";

function StealInfo() {
  const { currentPlayer, gameMode, player1, player2 } = useSelector((state) => state.game);
  
  let steals
  
  switch (gameMode) {
    case "same screen":
      steals = currentPlayer.steals
      break
    case "online":
      const player = localStorage.getItem("player");
      steals = player === "Player 1" ? player1.steals : player2.steals
  }
  

  return (
    <div className="bg-league-gold-300 p-2 rounded-b-xl">
      <StealIcon className={"w-6 bg-white rounded-full"} />
      <h1 className="font-leagueheavy text-white uppercase text-sm">
        Means that you can steal your opponent's square. You have {steals} steals
        remaining
      </h1>
    </div>
  );
}

export default StealInfo;
