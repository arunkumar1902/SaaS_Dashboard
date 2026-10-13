import React from "react";

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onClear,
}) => {
  return (
    <div className="date-range-filter">
      <div className="date-field">
        <label>From</label>

        <div className="date-input">
          <i className="fa-regular fa-calendar"></i>

          <input
            type="date"
            value={startDate}
            onChange={(event) => onStartChange(event.target.value)}
          />
        </div>
      </div>

      <div className="date-field">
        <label>To</label>

        <div className="date-input">
          <i className="fa-regular fa-calendar"></i>

          <input
            type="date"
            value={endDate}
            onChange={(event) => onEndChange(event.target.value)}
          />
        </div>
      </div>

      {(startDate || endDate) && (
        <button className="date-clear" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default DateRangeFilter;