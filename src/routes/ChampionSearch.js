import ChampionList from "../components/ChampionList";
import ChampionQueryList from "../components/ChampionQueryList";

function ChampionSearch() {
  return (
    <div className=" flex flex-col space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">
      <ChampionQueryList />
      <ChampionList />
    </div>
  );
}

export default ChampionSearch;