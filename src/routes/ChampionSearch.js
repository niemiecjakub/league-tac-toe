import ChampionList from "../components/ChampionList";
import ChampionQueryList from "../components/ChampionQueryList";
import ChampionSearchByName from "../components/ChampionSearchByName";

function ChampionSearch() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-1 m-auto space-y-4 my-4 w-full">
      <ChampionSearchByName />
      <ChampionQueryList />
      <ChampionList />
    </div>
  );
}

export default ChampionSearch;
