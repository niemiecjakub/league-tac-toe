import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameOptions, getNewGameData } from "../redux/slices/GameSlice";
import { useState } from "react";

const turnTimeOptions = [
  { display: "unlimited", value: "unlimited" },
  { display: "5 sec", value: 5 },
  { display: "30 sec", value: 30 },
  { display: "45 sec", value: 45 },
  { display: "60 sec", value: 60 },
];

function LocalGameLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [turnTime, setTurnTime] = useState(turnTimeOptions[0]);

  const handleGameOptions = async ({ stealsEnabled }) => {
    dispatch(
      setGameOptions({
        gameMode: "same screen",
        stealsEnabled: stealsEnabled,
        turnTime: turnTime,
      })
    );
    navigate("/game/same-screen");
    await dispatch(getNewGameData());
  };

  const handleTurnTimeChange = (e) => {
    const value = e.target.value;
    setTurnTime(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full">
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col md:rounded-xl">
        <div className="flex items-center text-xl">
          <h1 className="ml-3 uppercase">Compete against friend</h1>
        </div>
        <div>
          <select
            id="category-type-select-1"
            className="uppercase p-2 w-full rounded-xl mx-1"
            value={turnTime}
            onChange={handleTurnTimeChange}
          >
            {turnTimeOptions.map(({ value, display }, i) => (
              <option value={value} key={i}>
                {display}
              </option>
            ))}
          </select>
        </div>
        <div className="flex mt-2 justify-end mx-3 ">
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 mr-4 rounded-lg"
            onClick={() => handleGameOptions({ stealsEnabled: true })}
          >
            WITH STEALS
          </button>

          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-lg"
            onClick={() => handleGameOptions({ stealsEnabled: false })}
          >
            WITHOUT STEALS
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalGameLobby;
