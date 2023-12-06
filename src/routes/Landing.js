import PageCard from "../components/PageCard";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-full m-auto space-y-4 my-4 w-full md:w-2/3 lg:w-1/4">
      <PageCard
        to="/lobby"
        title="Play against friend"
        subtext="Create game room"
      />
      <PageCard
        to="/game/same-screen"
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

      <div className="text-white w-full">
        <h1 className="font-bold text-xl  my-2">How to play League-Tac-Toe</h1>
        <p>
          DESCRIPTION TO BE ADDED
        </p>
        <h2 className="font-bold text-xl my-2">Here's the rules:</h2> RULES TO BE ADDED
      </div>

    </div>
  );
}

export default Landing;
