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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/confirmcode" element={<ConfirmCode />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/" element={<Homepage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/homepage" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/:productId" element={<DetailProduk />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shopcart" element={<ShopCart />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
