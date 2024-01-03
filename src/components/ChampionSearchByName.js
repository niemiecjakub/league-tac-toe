import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_CHAMPION_DATA } from "../utility/jsonData";

function ChampionSearchByName() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filteredChampions = ALL_CHAMPION_DATA.filter(({name}) =>
      name.toLowerCase().startsWith(value)
    );

    if (value){ 
      setSuggestions(filteredChampions)
    } 
    setSuggestions([]);
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setSuggestions([]);
    navigate(`/champions/${value.key}`);
  };

  return (
    <div className=" w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search champion by name"
        className={`uppercase p-2 w-full ${
          suggestions.length ? "rounded-t-xl" : "rounded-xl"
        } mx-1`}
      />
      <div
        className={`bg-league-gold-200 uppercase w-full mx-1 rounded-b-xl ${
          suggestions.length ? "visible" : "hidden"
        }`}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="w-full px-2 py-1 hover:bg-league-gold-400"
            onClick={() => handleSelect({suggestion})}
          >
            {suggestion.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChampionSearchByName;
