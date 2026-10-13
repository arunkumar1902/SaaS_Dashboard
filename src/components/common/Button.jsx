import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`app-btn app-btn-${variant} app-btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        icon && <i className={`fa-solid ${icon}`}></i>
      )}

      <span>{loading ? "Please wait..." : children}</span>
    </button>
  );
};

export default Button;