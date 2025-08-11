// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jika tidak login, lempar ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return <Outlet />;
}
