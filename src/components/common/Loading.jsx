import React from "react";

const Loading = ({
  message = "Loading...",
  fullPage = false,
}) => {
  return (
    <div className={`loading-container ${fullPage ? "loading-full" : ""}`}>
      <div className="loading-spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default Loading;