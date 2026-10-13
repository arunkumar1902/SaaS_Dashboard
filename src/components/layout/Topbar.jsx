import React from "react";

const Topbar = ({
  onMenuClick,
  onLogout,
  user = {
    name: "Admin User",
    role: "Administrator",
  },
}) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="topbar-page-info">
          <span className="topbar-greeting">
            Welcome back,
          </span>

          <strong>{user.name}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="topbar-icon-button"
          aria-label="Notifications"
        >
          <i className="fa-regular fa-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="topbar-divider"></div>

        <div className="topbar-user">
          <div className="topbar-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div className="topbar-user-info">
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
          title="Logout"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </header>
  );
};

export default Topbar;