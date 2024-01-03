import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALL_CHAMPION_DATA } from "../utility/jsonData";
import { setChampions } from "../redux/slices/QuerySlice";
import { Link } from "react-router-dom";

const filterChampionByQuery = ({ categoryType, categoryName }) => {
  return ALL_CHAMPION_DATA.filter((champion) => 
    categoryType === "all" || categoryName === "all" ? champion : champion[categoryType].includes(categoryName)
  );
};

const findChampionsMatchingAllQueries = (filteredChampions) => {
  if (filteredChampions.length === 0) {
    return ALL_CHAMPION_DATA;
  }

  const [firstQueryResult, ...restQueryResults] = filteredChampions;

  return firstQueryResult.filter(({id}) =>
    restQueryResults.every((queryResult) =>
      queryResult.some(({id: resultId}) => resultId === id)
    )
  );
};

function ChampionList() {
  const { queries, champions } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  useEffect(() => {
    const matchingChampions =
      findChampionsMatchingAllQueries(queries.map((query) => {
      return filterChampionByQuery(query);
    }));
    dispatch(setChampions(matchingChampions));
  }, [queries, dispatch]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
      {champions.map(({key, id, name}) => (
        <Link to={`/champions/${key}`} key={id}>
          <div
            className="my-2 h-64 w-full relative rounded-t-xl hover:animate-zoom"
            key={id}
          >
            <img
              alt={key}
              src={`${process.env.PUBLIC_URL}/champion/${key}.JPG`}
              className="object-cover h-full w-full rounded-t-xl"
            />
            <h1 className="pl-2 text-black font-bold uppercase bg-league-gold-200 absolute bottom-0 w-full h-1/6 text-md border-t-league-blue-300 border-t-4">
              {name}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChampionList;
