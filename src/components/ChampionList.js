import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALL_CHAMPION_DATA } from "../constants";
import { setChampions } from "../redux/slices/QuerySlice";
import { Link } from "react-router-dom";

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

function ChampionList() {
  const { queries, champions } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredChampions = queries.map((query) => {
      return filterChampionByQuery(query);
    });
    const matchingChampions =
      findChampionsMatchingAllQueries(filteredChampions);
    dispatch(setChampions(matchingChampions));
  }, [queries, dispatch]);

  return (
    <div className=" w-full">
      {champions.map((champion) => (
        <Link to={`/champions/${champion.key}`} key={champion.id}>
          <div className="my-2 flex items-center h-10" key={champion.id}>
            <img
              alt={champion.key}
              src={`${window.location.origin}/icons/${champion.key}.PNG`}
              className="h-full mr-2"
            />
            <h1 className="text-white">
              <span className="font-bold">{champion.name}</span>,{" "}
              {champion.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChampionList;
