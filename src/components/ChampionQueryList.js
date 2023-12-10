import ChampionQueryField from "../components/ChampionQueryField";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addQuery, removeQuery, resetQuery } from "../redux/slices/QuerySlice";

function ChampionQueryList() {
  const dispatch = useDispatch();
  const { queries } = useSelector((state) => state.query);

  return (
    <div className="flex flex-col justify-between w-full">
      <h1 className="text-center text-white uppercase text-xl">
        Explore champions by query
      </h1>
      {queries.map((query, index) => {
        return (
          <div className="flex my-2" key={query.id}>
            <ChampionQueryField key={query.id} data={query} />
            {index === queries.length - 1 ? (
              <button
                onClick={() => dispatch(addQuery())}
                className="bg-green-200 w-10 px-5 flex items-center justify-center rounded-xl"
              >
                +
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(removeQuery(query.id));
                }}
                className="bg-red-200 w-10 px-5 flex items-center justify-center rounded-xl"
              >
                -
              </button>
            )}
          </div>
        );
      })}
      <button
        onClick={() => dispatch(resetQuery())}
        className="bg-league-gold-400 p-2 muppercase rounded-xl"
      >
        Clear search
      </button>
    </div>
  );
}

export default ChampionQueryList;
