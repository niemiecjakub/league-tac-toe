import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom, createRoom } from "../utility/roomFunctions";
import { useDispatch } from "react-redux";
import { setGameOptions, startOnlineGame } from "../redux/slices/GameSlice";
import { TURN_TIME_OPTIONS } from "../constants";

function OnlineGameLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);
  const [turnTime, setTurnTime] = useState(TURN_TIME_OPTIONS[0].value);

  const handleTurnTimeChange = (e) => {
    const value = e.target.value;
    setTurnTime(value);
  };

  const handleJoinRoom = async () => {
    if (roomId.length === 5) {
      const { status } = await joinRoom(roomId, navigate);
      if (status) {
        navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
      }
    }
    setError("Room id has to be 5 character long");
  };

  const handleCreateNewRoom = async ({ stealsEnabled }) => {
    const { roomId } = await createRoom({
      stealsEnabled,
      turnTime,
      isOpenForRandom: false,
    });
    await dispatch(
      setGameOptions({
        roomId,
        stealsEnabled: stealsEnabled,
        gameMode: "online",
        turnTime: turnTime,
      })
    );
    navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
    await dispatch(startOnlineGame(roomId));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full">
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex justify-between md:rounded-xl px-3 ">
        <div className="flex items-center">
          <h1 className="uppercase text-xl">join Room</h1>
        </div>
        <div className="flex w-2/3 border-2 border-league-gold-300 rounded-lg">
          <input
            className="bg-white text-black w-2/3 py-3 rounded-l-lg px-3"
            type="text"
            value={roomId}
            name="code"
            placeholder="ENTER CODE"
            onChange={(e) => {
              setError("");
              setRoomId(e.target.value);
            }}
          />
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-r-lg w-1/3"
            onClick={handleJoinRoom}
          >
            CONNECT
          </button>
        </div>
      </div>

      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col md:rounded-xl px-3 ">
        <h1 className="uppercase text-xl mb-2 divide-x-2 divide-slate-800">
          Create room
        </h1>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-end w-full">
            <h1 className="uppercase text-xl mr-2">time per turn</h1>
            <select
              id="category-type-select-1"
              className="uppercase py-3 px-2 rounded-lg"
              value={turnTime}
              onChange={handleTurnTimeChange}
            >
              {TURN_TIME_OPTIONS.map(({ value, display }, i) => (
                <option value={value} key={i}>
                  {display}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex mt-2 justify-end">
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 mr-4 rounded-lg"
            onClick={() => handleCreateNewRoom({ stealsEnabled: true })}
          >
            WITH STEALS
          </button>

          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-lg"
            onClick={() => handleCreateNewRoom({ stealsEnabled: false })}
          >
            WITHOUT STEALS
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-500 py-2 w-full">
          <p className="uppercase font-bold text-center">{error}</p>
        </div>
      )}
    </div>
  );
}

export default OnlineGameLobby;
