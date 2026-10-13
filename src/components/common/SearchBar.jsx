import React from "react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
}) => {
  return (
    <div className="search-bar">
      <i className="fa-solid fa-magnifying-glass"></i>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          className="search-clear"
          onClick={onClear || (() => onChange(""))}
          aria-label="Clear search"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;