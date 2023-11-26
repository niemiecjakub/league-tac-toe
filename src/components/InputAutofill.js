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
    <div className="sugesstion-auto">
      <div className="form-control-auto">
        <label htmlFor="tag-input">{label}</label>
        <input
          placeholder={pholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
        />
      </div>

      <div
        className="suggestions"
        style={{ display: isHideSuggs ? "none" : "block" }}
      >
        {suggestions.map((item, idx) => (
          <div
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