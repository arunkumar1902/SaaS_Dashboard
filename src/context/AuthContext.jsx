import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const defaultUser = {
  id: "USR-001",
  name: "Admin User",
  email: "admin@saasflow.com",
  role: "Administrator",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("saasAuthUser");
      return savedUser ? JSON.parse(savedUser) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("saasAuthUser", JSON.stringify(user));
    }
  }, [user]);

  const login = (email = "admin@saasflow.com") => {
    const loggedInUser = {
      ...defaultUser,
      email,
    };

    setUser(loggedInUser);
    localStorage.setItem(
      "saasAuthUser",
      JSON.stringify(loggedInUser)
    );

    return true;
  };

  const logout = () => {
    // setUser(null);
    navigate("/");
    localStorage.removeItem("saasAuthUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};