import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameOptions, getNewGameData } from "../redux/slices/GameSlice";

function LocalGameLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGameOptions = async ({ stealsEnabled }) => {
    dispatch(
      setGameOptions({
        gameMode: "same screen",
        stealsEnabled: stealsEnabled,
      })
    );
    navigate("/game/same-screen");
    await dispatch(getNewGameData());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full">
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col md:rounded-xl">
        <div className="flex items-center text-xl">
          <h1 className="ml-3 uppercase">Compete against friend</h1>
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
