import React from "react";

const SubscriptionStatusBadge = ({ status }) => {
  const statusMap = {
    Active: {
      className: "status-success",
      icon: "fa-circle-check",
    },

    Trial: {
      className: "status-info",
      icon: "fa-clock",
    },

    PastDue: {
      className: "status-warning",
      icon: "fa-triangle-exclamation",
    },

    Cancelled: {
      className: "status-danger",
      icon: "fa-circle-xmark",
    },

    Expired: {
      className: "status-neutral",
      icon: "fa-calendar-xmark",
    },

    Paused: {
      className: "status-warning",
      icon: "fa-pause",
    },
  };

  const config =
    statusMap[status] || {
      className: "status-neutral",
      icon: "fa-circle",
    };

  return (
    <span
      className={`status-badge ${config.className}`}
    >
      <i className={`fa-solid ${config.icon}`}></i>
      {status || "Unknown"}
    </span>
  );
};

export default SubscriptionStatusBadge;