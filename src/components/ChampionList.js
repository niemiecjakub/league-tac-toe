import { ALL_CHAMPION_DATA } from "../constants";

function ChampionList() {

  return (
    <>
      {ALL_CHAMPION_DATA.map((champion) => (
          // <Link to="/" key={champion.id}>
          <div className="my-2 flex items-center h-10" key={champion.id}>
            <img
              src={`${window.location.origin}/icons/${champion.key}.PNG`}
              className="h-full mr-2"
            />
            <h1 className="">
              {champion.name}, {champion.title}
            </h1>
          </div>
          // </Link>
        ))}
    </>
  );
}

export default ChampionList;
