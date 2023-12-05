import { useSelector } from "react-redux";
import StealIcon from "./StealIcon";

function StealInfo() {
  const { currentPlayer } = useSelector((state) => state.game);

  return (
    <div className="bg-league-gold-300 p-2 rounded-b-xl">
      <StealIcon className={"w-6 bg-white rounded-full"} />
      <h1 className="font-leagueheavy text-white uppercase text-sm">
        Means that you can steal your opponent's square. You have {currentPlayer.steals} steals
        remaining
      </h1>
    </div>
  );
}

export default StealInfo;
