import React from "react";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested information.",
  onRetry,
}) => {
  return (
    <div className="error-state">
      <div className="error-icon">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <Button
          variant="secondary"
          icon="fa-rotate-right"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;