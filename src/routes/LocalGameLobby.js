import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameOptions } from "../redux/slices/GameSlice";
function LocalGameLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWithStealsClick = () => {
    dispatch(
      setGameOptions({
        gameMode: "same screen",
        stealsEnabled: true,
      })
    );
    navigate("/game/same-screen");
  };

  const handleWithoutStealsClick = () => {
    dispatch(
      setGameOptions({
        gameMode: "same screen",
        stealsEnabled: false,
      })
    );
    navigate("/game/same-screen");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col md:rounded-xl">
        <div className="flex items-center text-xl">
          <h1 className="ml-3 uppercase">Compete against friend</h1>
        </div>
        <div className="flex mt-2 justify-end mx-3 C">
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 mr-4 rounded-lg"
            onClick={handleWithStealsClick}
          >
            WITH STEALS
          </button>

          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-lg"
            onClick={handleWithoutStealsClick}
          >
            WITHOUT STEALS
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalGameLobby;
