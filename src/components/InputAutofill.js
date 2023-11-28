import React, { useState } from "react";

function InputAutofill({label, pholder, data, onSelected}) {
  const [suggestions, setSugesstions] = useState([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");

  const handler = e => {
    setSugesstions(data.filter(i => i.startsWith(e.target.value)));
  };

  const handleChange = e => {
    const input = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
    setIsHideSuggs(false);
    setSelectedVal(input);
  };

  const hideSuggs = value => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  return (
    <div className="block rounded-lg relative">
      <div className="bg-gray-900 flex justify-center items-center rounded w-full">
        <label htmlFor="tag-input" className="uppercase text-gray-600 p-5 text-xl font-bold">{label}</label>
        <input
          className="rounded w-full border-none outline-none text-xl mx-2 p-2"
          placeholder={pholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
        />
      </div>

      <div
        className="absolute left-0 cursor-pointer w-full overflow-auto top-16 z-50 max-h-48"
        style={{ display: isHideSuggs ? "none" : "block" }}
      >
        {suggestions.map((item, idx) => (
          <div
            className=" bg-gray-900 text-white p-3 text-xl border-b-2 border-solid border-cyan-800 hover:bg-gray-400 hover:text-black "
            key={"" + item + idx}
            onClick={() => {
              hideSuggs(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}


export default InputAutofill