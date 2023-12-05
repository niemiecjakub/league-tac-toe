import CopyIcon from "./CopyIcon";

function WaitingRoom({ roomId }) {
  return (
    <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col justify-center items-center text-xl">
      <h1>ROOM CODE: {roomId}</h1>
      <h1 className="mt-4">Share room code or this link with your friend</h1>
      <div className="w-full bg-league-gold-200 flex items-center justify-center my-2 py-2 px-5 text-lg">
        <h1>{window.location.href}</h1>
        <CopyIcon className={`ml-2 w-10`} />
      </div>
      <div>
        <h1>Game will start when other player joins</h1>
      </div>
    </div>
  );
}

export default WaitingRoom;
