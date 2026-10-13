import React, { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Subscriptions from "./pages/Subscriptions";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import UsageAnalytics from "./pages/UsageAnalytics";
import RevenueAnalytics from "./pages/RevenueAnalytics";

import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";


const App = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Topbar
          user={user}
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          onLogout={logout}
        />

        <div className="theme-floating-control">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
          >
            <i
              className={`fa-solid ${
                theme === "dark"
                  ? "fa-sun"
                  : "fa-moon"
              }`}
            ></i>
          </button>
        </div>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/users"
              element={<Users />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/subscriptions"
              element={<Subscriptions />}
            />

            <Route
              path="/plans"
              element={<Plans />}
            />

            <Route
              path="/plans/:id"
              element={<PlanDetails />}
            />

            <Route
              path="/usage"
              element={<UsageAnalytics />}
            />

            <Route
              path="/revenue"
              element={<RevenueAnalytics />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;