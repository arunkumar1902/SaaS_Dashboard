import React from "react";
import Button from "./Button";

const EmptyState = ({
  icon = "fa-folder-open",
  title = "No data found",
  message = "There are no records to display.",
  actionText,
  onAction,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionText && onAction && (
        <Button
          variant="primary"
          icon="fa-plus"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;