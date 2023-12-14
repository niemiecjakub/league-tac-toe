import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom, createRoom } from "../utility/roomFunctions";
import { useDispatch } from "react-redux";
import { setGameOptions, startOnlineGame } from "../redux/slices/GameSlice";

const turnTimeOptions = [
  { display: "unlimited", value: "unlimited" },
  { display: "5 sec", value: 5 },
  { display: "30 sec", value: 30 },
  { display: "45 sec", value: 45 },
  { display: "60 sec", value: 60 },
];

function OnlineGameLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);
  const [turnTime, setTurnTime] = useState(turnTimeOptions[0]);

  const handleTurnTimeChange = (e) => {
    const value = e.target.value;
    setTurnTime(value);
  };

  const handleJoinRoom = () => {
    roomId.length === 5
      ? joinRoom(roomId, navigate)
      : setError("Room id has to be 5 character long");
  };

  const handleCreateNewRoom = async ({ stealsEnabled }) => {
    const roomId = await createRoom(stealsEnabled, turnTime);
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
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex justify-between md:rounded-xl">
        <div className="flex items-center">
          <h1 className="ml-3 uppercase text-xl">Room</h1>
        </div>
        <div className="flex w-2/3 mx-3 border-2 border-league-gold-300 rounded-lg">
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

      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col md:rounded-xl">
        <div className="flex items-center text-xl">
          <h1 className="ml-3 uppercase">Compete against friend</h1>
        </div>
        <div className="mx-3 flex justify-end w-full">
          <h1>Time per found</h1>
          <select
            id="category-type-select-1"
            className="uppercase p-2 w-1/2 rounded-xl mx-1"
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

        <div className="flex mt-2 justify-end mx-3">
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
        {error && <p>Name and room code cannot be empty</p>}
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
