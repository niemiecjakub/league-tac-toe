import { CATEGORY_LIST } from "../utility/jsonData";
import { useDispatch } from "react-redux";
import { updateQuery } from "../redux/slices/QuerySlice";

function ChampionQueryField({ data : {id, categoryName, categoryType } }) {
  const dispatch = useDispatch();

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    dispatch(updateQuery({ id, field, value }));
  };

  return (
    <div className="flex w-full items-center mr-4">
      <select
        id="category-type-select-1"
        className="uppercase p-2 w-full rounded-xl mx-1"
        value={categoryType}
        onChange={(e) => handleSelectChange(e, "categoryType")}
      >
        <option value="all">ALL</option>
        {Object.entries(CATEGORY_LIST).map(([categoryType, categoryNames]) => (
          <option className="uppercase" value={categoryType} key={categoryType}>
            {categoryType}
          </option>
        ))}
      </select>
      
      <select
        id="category-name-select-1"
        className="uppercase p-2 w-full rounded-xl mx-1"
        value={categoryName}
        onChange={(e) => handleSelectChange(e, "categoryName")}
      >
        <option value="all">ALL</option>
        {categoryType !== "all" &&
          Object.entries(CATEGORY_LIST[categoryType]).map(
            ([i, categoryName]) => (
              <option
                className="uppercase"
                key={categoryName}
                value={categoryName}
              >
                {categoryName}
              </option>
            )
          )}
      </select>
    </div>
  );
}

export default ChampionQueryField;
