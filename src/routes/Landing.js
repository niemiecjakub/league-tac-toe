import { useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import { handleRandomGame } from "../utility/roomFunctions";

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full md:w-2/3 2xl:w-1/4">
      <PageCard
        to="/lobby"
        title="Play against friend"
        subtext="Create game room"
      />
      <PageCard
        to="/lobby/local"
        title="Same screen game"
        subtext="Same screen game"
      />
      {/* <PageCard
        to="/champion-list"
        title="Champion list"
        subtext="Browse all champions"
      />
      <PageCard
        to="/category-list"
        title="See all categories"
        subtext="See all categories"
      /> */}
      <button className="bg-red-400 w-20 h-14" onClick={() => handleRandomGame(navigate)}>RANDOM GAME</button>


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
