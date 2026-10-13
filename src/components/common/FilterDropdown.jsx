import React from "react";

const FilterDropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "All",
}) => {
  return (
    <div className="filter-dropdown">
      {label && <label>{label}</label>}

      <div className="filter-select-wrapper">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>

          {options.map((option) => {
            const optionValue =
              typeof option === "object" ? option.value : option;

            const optionLabel =
              typeof option === "object" ? option.label : option;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default FilterDropdown;