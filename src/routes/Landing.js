import PageCard from "../components/PageCard";
import Rules from "../components/Rules";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center px-1 h-full m-auto space-y-4 my-4 w-full ">
      <PageCard
        to="/lobby"
        title="Play against a friend"
        subtitle="Challenge a friend to an online game"
        showButton="true"
        imageSrc={`${process.env.PUBLIC_URL}/other/online.jpg`}
      />
      <PageCard
        to="/lobby/local"
        title="Same screen"
        subtitle="Play League-Tac-Toe on the same device"
        showButton="true"
        imageSrc={`${process.env.PUBLIC_URL}/other/samescreen.jpg`}
      />
      <PageCard
        to="/champions"
        title="Champion search"
        subtitle="Explore all champions and their categories"
        imageSrc={`${process.env.PUBLIC_URL}/other/champions.jpg`}
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
