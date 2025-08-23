import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Ambil token & user dari localStorage saat inisialisasi
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Validasi token dan ambil profile user
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get("/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Update user jika fullName tersedia
          const fetchedUser = response.data.user || response.data;
          if (fetchedUser?.fullName) {
            setUser(fetchedUser);
            localStorage.setItem("userData", JSON.stringify(fetchedUser));
          }
        } catch (error) {
          console.error("Gagal memvalidasi token, logout...", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
