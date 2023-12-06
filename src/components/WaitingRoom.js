import CopyIcon from "./svgIcons/CopyIcon";
import copy from "clipboard-copy";
import { useState } from "react";
import { useSelector } from "react-redux";

const nImage = Array(5).fill(0);

function WaitingRoom({ roomId }) {
  const [isCopied, setIsCopied] = useState(false);
  const { isOpenForRandom } = useSelector((state) => state.game);

  const handleCopyClick = async () => {
    try {
      await copy(window.location.href);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  return (
    <>
      {isOpenForRandom ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            {nImage.map((element, index) => (
              <img
                className="animate-pulse"
                key={index}
                src="/other/ahri.png"
              />
            ))}
          </div>
          <h1 className="text-white text-xl font-leagueheavy uppercase">
            searching for opponent
          </h1>
        </div>
      ) : (
        <>
          <div className="bg-slate-400 font-bold py-4 w-full shadow-xl drop-shadow-md flex flex-col justify-center items-center text-xl md:rounded-xl">
            <h1>ROOM CODE: {roomId}</h1>
            <h1 className="mt-4">
              Share room code or this link with your friend
            </h1>
            <div
              onClick={handleCopyClick}
              className="w-full bg-league-gold-200 flex items-center justify-center my-2 py-2 px-5 text-sm"
            >
              <h1>{window.location.href}</h1>
              <CopyIcon className={`ml-2 w-6`} />
            </div>
            <h1>{isCopied ? "Link copied!" : "Click to copy link"}</h1>
            <div>
              <h1>Game will start when other player joins</h1>
            </div>
          </div>
          <div className="flex items-center justify-between m-5">
            {nImage.map((element, index) => (
              <img
                className="animate-pulse"
                key={index}
                src="/other/ahri.png"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default WaitingRoom;
