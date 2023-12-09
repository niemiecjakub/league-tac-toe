import { CATEGORY_LIST } from "../constants";
import { useDispatch } from "react-redux";
import { updateQuery } from "../redux/slices/QuerySlice";

function ChampionQueryField({ data }) {
  const dispatch = useDispatch();
  const { id } = data;

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    dispatch(updateQuery({ id, field, value }));
  };

  return (
    <div className="flex justify-between">
      <label for="category-type-select-1" className="text-white">
        Category type:
      </label>
      <select
        id="category-type-select-1"
        className="uppercase p-2"
        value={data.categoryType}
        onChange={(e) => handleSelectChange(e, "categoryType")}
      >
        <option value="all">ALL</option>
        {Object.entries(CATEGORY_LIST).map(([categoryType, categoryNames]) => (
          <option className="uppercase" value={categoryType}>
            {categoryType}
          </option>
        ))}
      </select>

      <label for="category-name-select-1" className="text-white">
        Category name:
      </label>
      <select
        id="category-name-select-1"
        className="uppercase p-2"
        value={data.categoryName}
        onChange={(e) => handleSelectChange(e, "categoryName")}
      >
        <option value="all">ALL</option>
        {data.categoryType != "all" &&
          Object.entries(CATEGORY_LIST[data.categoryType]).map(
            ([i, categoryName]) => (
              <option className="uppercase" value={categoryName}>
                {categoryName}
              </option>
            )
          )}
      </select>
    </div>
  );
}

export default ChampionQueryField;
