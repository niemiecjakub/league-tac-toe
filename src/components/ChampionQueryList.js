import ChampionQueryField from "../components/ChampionQueryField";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addQuery, removeQuery } from "../redux/slices/QuerySlice";

function ChampionQueryList() {
  const dispatch = useDispatch();
  const { queries } = useSelector((state) => state.query);

  return (
    <div className="flex flex-col">
      {queries.map((query, index) => {
        return (
          <div className="flex my-2" key={query.id}>
            <ChampionQueryField key={query.id} data={query} />
            {index === queries.length - 1 ? (
              <button
                onClick={() => dispatch(addQuery())}
                className="bg-green-200 w-10 px-5 mx-1 text-center"
              >
                +
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log(queries);
                  dispatch(removeQuery(query.id));
                }}
                className="bg-red-200 w-10 px-5 mx-1 text-center"
              >
                -
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChampionQueryList;
