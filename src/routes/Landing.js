import { useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import { handleRandomGame } from "../utility/roomFunctions";
import Rules from "../components/Rules";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full ">
      <PageCard
        to="/lobby"
        title="Play against a friend"
        subtitle="Challenge a friend to an online game of League-Tac-Toe"
        showButton="true"
        imageSrc={`${window.location.origin}/other/online.jpg`}
      />
      <PageCard
        to="/lobby/local"
        title="Same screen"
        subtitle="Play League-Tac-Toe against a friend on the same device"
        showButton="true"
        imageSrc={`${window.location.origin}/other/samescreen.jpg`}
      />
      <PageCard
        to="/champions"
        title="Champion search"
        subtitle="Explore all champions and their categories"
        imageSrc={`${window.location.origin}/other/champions.jpg`}
      />
      {/* <button
        className="bg-red-400 w-20 h-14"
        onClick={() => handleRandomGame(navigate)}
      >
        RANDOM GAME
      </button> */}

      <Rules />
    </div>
  );
}

export default Landing;
