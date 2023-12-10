import ChampionList from "../components/ChampionList";
import ChampionQueryList from "../components/ChampionQueryList";
import ChampionSearchByName from "../components/ChampionSearchByName";
function ChampionSearch() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-2 m-auto space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">
      <ChampionSearchByName />
      <ChampionQueryList />
      <ChampionList />
    </div>
  );
}

export default ChampionSearch;
