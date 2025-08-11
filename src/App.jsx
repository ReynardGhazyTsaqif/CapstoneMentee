import React from "react";
import { Routes, Route } from "react-router-dom";

// Import komponen Layout dan Proteksi
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import semua halaman Anda
import Homepage from "./pages/feat/Homepage";
import Kategori from "./pages/feat/Kategori";
import DetailProduk from "./pages/feat/DetailProduk";
import Wishlist from "./pages/feat/Wishlist";
import ShopCart from "./pages/feat/ShopCart";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ConfirmCode from "./pages/auth/ConfirmCode";
import ResetPassword from "./pages/auth/ResetPassword";

export default function App() {
  return (
    <Routes>
      {/* === RUTE PUBLIK (Bisa diakses tanpa login) === */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/confirmcode" element={<ConfirmCode />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      {/* === RUTE TERPROTEKSI (Wajib login untuk mengakses) === */}
      <Route element={<ProtectedRoute />}>
        {/* Halaman-halaman ini akan menggunakan Layout (Navbar & Footer) */}

        <Route path="/homepage" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/kategori" element={<Kategori />} />
          {/* Path untuk detail produk diperbaiki agar konsisten */}
          <Route path="/kategori/:productId" element={<DetailProduk />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shopcart" element={<ShopCart />} />
        </Route>
      </Route>

      {/* Rute "Catch-All" untuk halaman yang tidak ditemukan */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
