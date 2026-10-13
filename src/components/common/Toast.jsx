import React, { useEffect } from "react";

const Toast = ({
  message,
  type = "success",
  visible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info",
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        <i className={`fa-solid ${icons[type] || icons.info}`}></i>
      </div>

      <div className="toast-message">
        <span>{message}</span>
      </div>

      <button className="toast-close" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Toast;