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

import AdminDashboard from './pages/admin/AdminDashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Orders from './pages/admin/Orders';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/confirmcode" element={<ConfirmCode />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      

      <Route element={<ProtectedRoute />}>
        <Route path="/homepage" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/:productId" element={<DetailProduk />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shopcart" element={<ShopCart />} />
        </Route>
      </Route>

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/addproduct" element={<AddProduct />} />
      <Route path="/admin/editproduct" element={<EditProduct />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
