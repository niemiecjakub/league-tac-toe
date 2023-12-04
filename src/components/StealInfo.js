import { useSelector } from "react-redux";

function StealInfo({currentPlayer}) {
  return (
    <div className="bg-league-grey-200 p-2 rounded-r-xl">
      {/* <h1>{currentPlayer.steals} STEALS REMAINING</h1> */}
      <h1>3 STEALS REMAINING</h1>
    </div>
  );
}

export default StealInfo;
