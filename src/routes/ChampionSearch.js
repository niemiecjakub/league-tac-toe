import { useState, useEffect } from "react";
import { CATEGORY_LIST, ALL_CHAMPION_DATA } from "../constants";
import { Link } from "react-router-dom";

const categoryType = "legacy";
const categoryName = "Support";

const filtered = ALL_CHAMPION_DATA.filter((champion) => {
  return champion[categoryType].includes(`${categoryName}`);
});

console.log(filtered);

function ChampionSearch() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className=" flex flex-col space-y-4 my-4 w-full md:w-2/3 lg:w-1/5">
      <div className="flex justify-between">
        <select
          id="myInput"
          className="uppercase p-2"
          value={selectedValue}
          onChange={handleSelectChange}
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

        <select
          id="myInput"
          className="uppercase p-2"
          value={selectedValue}
          onChange={handleSelectChange}
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
      </div>
      <div className="flex justify-between">
        <input placeholder="categoryType2" type="select" />
        <input placeholder="categoryName2" />
      </div>

      <div className="bg-slate-100 w-full">
        {ALL_CHAMPION_DATA.map((champion) => (
          // <Link to="/" key={champion.id}>
          <div className="my-2 flex items-center">
            <img
              src={`${window.location.origin}/icons/${champion.key}.PNG`}
              className="h-10 mr-2"
            />
            <h1 className="">
              {champion.name}, {champion.title}
            </h1>
          </div>
          // </Link>
        ))}
      </div>
      {/* 
      <div>
        <ul>
          {Object.entries(CATEGORY_LIST).map(
            ([categoryType, categoryNames]) => (
              <div>
                <h1 className="text-xl text-white">{categoryType}</h1>
                {categoryNames.map((name, i) => (
                  <p key={i}>{name}</p>
                ))}
              </div>
            )
          )}
        </ul>
      </div> */}
    </div>
  );
}

export default ChampionSearch;
