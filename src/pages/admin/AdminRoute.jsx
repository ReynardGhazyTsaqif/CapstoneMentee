import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>; // optional: loading state

  if (!isAuthenticated) {
    // Belum login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Bukan admin
    return <Navigate to="/homepage" replace />;
  }

  // Admin, boleh akses
  return <Outlet />;
}
