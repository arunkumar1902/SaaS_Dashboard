import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  isOpen,
  onClose,
}) => {
  const navigation = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "fa-chart-pie",
    },
    {
      label: "Users",
      path: "/users",
      icon: "fa-users",
    },
    {
      label: "Customers",
      path: "/customers",
      icon: "fa-user-group",
    },
    {
      label: "Subscriptions",
      path: "/subscriptions",
      icon: "fa-repeat",
    },
    {
      label: "Plans",
      path: "/plans",
      icon: "fa-layer-group",
    },
    {
      label: "Usage Analytics",
      path: "/usage",
      icon: "fa-chart-line",
    },
    {
      label: "Revenue Analytics",
      path: "/revenue",
      icon: "fa-dollar-sign",
    },
  ];

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="brand-logo-icon">
              <i className="fa-solid fa-cubes"></i>
            </div>

            <div className="brand-text">
              <strong>SaaSFlow</strong>
              <span>Management</span>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            MAIN MENU
          </span>

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-link-icon">
                  <i className={`fa-solid ${item.icon}`}></i>
                </span>

                <span className="sidebar-link-label">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-help-card">
            <div className="sidebar-help-icon">
              <i className="fa-solid fa-headset"></i>
            </div>

            <div>
              <strong>Need help?</strong>
              <span>Contact support</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;