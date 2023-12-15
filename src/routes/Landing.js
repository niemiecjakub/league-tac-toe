import { useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import Rules from "../components/Rules";
import { handleRandomGame } from "../utility/roomFunctions";
import { useDispatch } from "react-redux";
import { setGameOptions, startOnlineGame } from "../redux/slices/GameSlice";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findRandomGame = async () => {
    const { action, status, roomId } = await handleRandomGame({
      stealsEnabled: true,
      turnTime: 30,
      isOpenForRandom: true,
    });

    console.log(action, status, roomId);

    if (action === "join" && status === true) {
      navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
    }

    if (action === "create" && status === true) {
      await dispatch(
        setGameOptions({
          roomId,
          stealsEnabled: true,
          gameMode: "online",
          turnTime: 30,
          isOpenForRandom: true,
        })
      );
      navigate(`/game/room/${roomId}`, { state: { navigated: "code" } });
      await dispatch(startOnlineGame(roomId));
    }
  };

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
        title="Find random opponent"
        showButton="true"
        subtitle="Play with players around the world"
        imageSrc={`${process.env.PUBLIC_URL}/other/random.jpg`}
        onClick={findRandomGame}
      />
      <PageCard
        to="/champions"
        title="Champion search"
        subtitle="Explore all champions and their categories"
        imageSrc={`${process.env.PUBLIC_URL}/other/champions.jpg`}
      />
      <Rules />
    </div>
  );
}

export default Landing;
