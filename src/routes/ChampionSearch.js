import { useState, useEffect } from "react";
import { ALL_CHAMPION_DATA } from "../constants";
import { Link } from "react-router-dom";
import ChampionQueryField from "../components/ChampionQueryField";
import ChampionList from "../components/ChampionList";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addQuery, removeQuery } from "../redux/slices/QuerySlice";

function ChampionSearch() {
  const dispatch = useDispatch();
  const { queries } = useSelector((state) => state.query);

  return (
    <div className=" flex flex-col space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">
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

      <button
        className="bg-red-300 h-10 w-full text-black"
        // onClick={queryCheck}
      >
        show query
      </button>

      <div className="bg-slate-100 w-full">
        <ChampionList />
      </div>
    </div>
  );
}

export default ChampionSearch;

// const queryCheck = () => {
//   const q = {
//     categoryType: "legacy",
//     categoryName: "all",
//   };

//   const q2 = {
//     categoryType: "Tfsdfsdfop",
//     categoryName: "all",
//   };

//   const filtered1 = ALL_CHAMPION_DATA.filter((champion) => {
//     const { categoryType, categoryName } = q;
//     if (categoryType === "all" || categoryName === "all") {
//       return champion;
//     }
//     return champion[categoryType].includes(`${categoryName}`);
//   });

//   const filtered2 = ALL_CHAMPION_DATA.filter((champion) => {
//     const { categoryType, categoryName } = q2;
//     if (categoryType === "all" || categoryName === "all") {
//       return champion;
//     }
//     return champion[categoryType].includes(`${categoryName}`);
//   });

//   const championsInBothFilters = ALL_CHAMPION_DATA.filter((champion) => {
//     return filtered1.includes(champion) && filtered2.includes(champion);
//   });

//   console.log(championsInBothFilters);
// };

// useEffect(() => {
//   if (
//     queryField.categoryType === "all" ||
//     queryField.categoryName === "all"
//   ) {
//     // setChampions(ALL_CHAMPION_DATA);
//   }
//   if (queryField.categoryName !== "all") {
//     const filtered = ALL_CHAMPION_DATA.filter((champion) => {
//       return champion[queryField.categoryType].includes(
//         `${queryField.categoryName}`
//       );
//     });
//     console.log(filtered)
//     // setChampions(filtered);
//   }
// }, [queryField]);
