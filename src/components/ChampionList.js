import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALL_CHAMPION_DATA } from "../constants";
import { setChampions } from "../redux/slices/QuerySlice";

function ChampionList() {
  const { queries, champions } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const filterChampionByQuery = (query) => {
    const { categoryType, categoryName } = query;
    return ALL_CHAMPION_DATA.filter((champion) => {
      if (categoryType === "all" || categoryName === "all") {
        return champion;
      }
      return champion[categoryType].includes(`${categoryName}`);
    });
  };

  const findChampionsMatchingAllQueries = (filteredChampions) => {
    if (filteredChampions.length === 0) {
      return ALL_CHAMPION_DATA;
    }

    const [firstQueryResult, ...restQueryResults] = filteredChampions;

    const commonElements = firstQueryResult.filter((champion) =>
      restQueryResults.every((queryResult) =>
        queryResult.some((e) => e.id === champion.id)
      )
    );

    return commonElements;
  };

  useEffect(() => {
    const filteredChampions = queries.map((query) => {
      return filterChampionByQuery(query);
    });
    const matchingChampions =
      findChampionsMatchingAllQueries(filteredChampions);
    dispatch(setChampions(matchingChampions));
  }, [queries]);

  return (
    <div className="bg-slate-100 w-full">
      {champions.map((champion) => (
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
    </div>
  );
}

export default ChampionList;
