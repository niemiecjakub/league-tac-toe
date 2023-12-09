import { useState, useEffect } from "react";
import { CATEGORY_LIST, ALL_CHAMPION_DATA } from "../constants";
import { Link } from "react-router-dom";

const categoryType = "legacy";
const categoryName = "Support";

const filtered = ALL_CHAMPION_DATA.filter((champion) => {
  return champion[categoryType].includes(`${categoryName}`);
});

function ChampionSearch() {
  const [champions, setChampions] = useState(ALL_CHAMPION_DATA);
  const [queryField, setQueryField] = useState({
    categoryType: "all",
    categoryName: "all",
  });

  useEffect(() => {
    console.log(queryField)
    if (queryField.categoryType == "all" || queryField.categoryName == "all") {
      setChampions(ALL_CHAMPION_DATA)
    }
    if (queryField.categoryName != "all") {
      const filtered = ALL_CHAMPION_DATA.filter((champion) => {
        return champion[queryField.categoryType].includes(
          `${queryField.categoryName}`
        );
      });
      setChampions(filtered)
    }
  }, [queryField]);

  const handleSelectChange = (e, categoryField) => {
    console.log(e.target.value)
    if (categoryField === "categoryType") {
      setQueryField((query) => ({
        categoryType: e.target.value,
        categoryName: "all",
      }));
    } else {
      setQueryField((query) => ({
        ...query,
        categoryName: e.target.value,
      }));
    }
  };

  return (
    <div className=" flex flex-col space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">

      <div className="flex justify-between">
        
        <label for="category-type-select-1" className="text-white">
          Category type:
        </label>
        <select
          id="category-type-select-1"
          className="uppercase p-2"
          value={queryField.categoryType}
          onChange={(e) => handleSelectChange(e, "categoryType")}
        >
          <option value="all">ALL</option>
          {Object.entries(CATEGORY_LIST).map(
            ([categoryType, categoryNames]) => (
              <option className="uppercase" value={categoryType}>
                {categoryType}
              </option>
            )
          )}
        </select>

        <label for="category-name-select-1" className="text-white">
          Category name:
        </label>
        <select
          id="category-name-select-1"
          className="uppercase p-2"
          value={queryField.categoryName}
          onChange={(e) => handleSelectChange(e, "categoryName")}
        >
          <option value="all">ALL</option>
          {queryField.categoryType != "all" &&
            Object.entries(CATEGORY_LIST[queryField.categoryType]).map(
              ([i, categoryName]) => (
                <option className="uppercase" value={categoryName}>
                  {categoryName}
                </option>
              )
            )}
        </select>
      </div> 

      <div>
        <button
          className="bg-red-300 h-10 w-full text-black"
          onClick={() => console.log(queryField)}
        >
          show query
        </button>
      </div>
 
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
    </div>
  );
}

export default ChampionSearch;
