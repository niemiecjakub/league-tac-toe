import { useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import { handleRandomGame } from "../utility/roomFunctions";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full ">
      <PageCard
        to="/lobby"
        title="Play against friend"
        subtitle="Create game room"
        showButton="true"
        imageSrc={`${window.location.origin}/other/online.jpg`}
      />
      <PageCard
        to="/lobby/local"
        title="Same screen game"
        subtitle="Same screen game"
        showButton="true"
        imageSrc={`${window.location.origin}/other/samescreen.jpg`}
      />
      <PageCard
        to="/champions"
        title="Champion search"
        subtitle="See all champions"
        imageSrc={`${window.location.origin}/other/champions.jpg`}
      />
      <button
        className="bg-red-400 w-20 h-14"
        onClick={() => handleRandomGame(navigate)}
      >
        RANDOM GAME
      </button>

      <div className="text-white w-full">
        <h1 className="font-bold text-xl  my-2">How to play League-Tac-Toe</h1>
        <p>DESCRIPTION TO BE ADDED</p>
        <h2 className="font-bold text-xl my-2">Here's the rules:</h2> RULES TO
        BE ADDED
      </div>
    </div>
  );
}

export default Landing;
