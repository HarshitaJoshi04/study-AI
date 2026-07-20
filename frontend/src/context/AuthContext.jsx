import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = (token, userData) => {
    saveToken(token);
    setUser(userData);
  };

  // Logout
  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);