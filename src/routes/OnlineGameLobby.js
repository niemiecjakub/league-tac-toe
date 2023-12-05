import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom, createRoom } from "../utility/roomFunctions";

function OnlineGameLobby() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);

  const handleJoinRoom = () => {
    joinRoom(roomId, navigate);
  };

  const handleCreateNewRoom = async () => {
    createRoom(navigate);
  };

  return (
    <>
      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex justify-between">
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
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-r-lg"
            onClick={handleJoinRoom}
          >
            CONNECT
          </button>
        </div>
        {error && <p>Name and room code cannot be empty</p>}
      </div>

      <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col">
        <div className="flex items-center text-xl">
          <h1 className="ml-3 uppercase">Compete against friend</h1>
        </div>
        <div className="flex mt-2 justify-end mx-3 C">
          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 mr-4 rounded-lg"
            onClick={handleCreateNewRoom}
          >
            WITH STEALS
          </button>

          <button
            className="bg-league-gold-300 hover:bg-league-gold-400 py-3 px-2 rounded-lg"
            onClick={handleCreateNewRoom}
          >
            WITHOUT STEALS
          </button>
        </div>
        {error && <p>Name and room code cannot be empty</p>}
      </div>
    </>
  );
}

export default OnlineGameLobby;
