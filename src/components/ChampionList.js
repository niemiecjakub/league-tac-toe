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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
      {champions.map((champion) => (
        <Link to={`/champions/${champion.key}`} key={champion.id}>
          <div
            className="my-2 h-64 w-full relative rounded-t-xl hover:animate-zoom"
            key={champion.id}
          >
            <img
              alt={champion.key}
              src={`${window.location.origin}/champion/${champion.key}.JPG`}
              className="object-cover h-full w-full rounded-t-xl"
            />

            <h1 className="pl-2 text-black font-bold uppercase bg-league-gold-200 absolute bottom-0 w-full h-1/6 text-md border-t-league-blue-300 border-t-4">
              {champion.name}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChampionList;
